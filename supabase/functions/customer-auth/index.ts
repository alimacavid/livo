// LIVO — customer-auth (2026-10-12) — sign in with a text code, read saved details
// NOT DEPLOYED YET — deploy with migration 0002 when Ali approves go-live:
//   supabase functions deploy customer-auth --project-ref dlzmkkmnmrbvxoazzbpi --no-verify-jwt
//
// actions: send {phone} · verify {phone, code} → {token} · me {token} → profile
//          remove-place {token, placeId} · signout {token}
// Safety: only hashes of codes and tokens are stored; codes last 10 minutes,
// 5 tries per code, max 5 codes per phone per hour; sessions last 90 days.
// The same answer is given whether or not a phone has an account.
// Secrets: TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN, TWILIO_FROM (+ auto SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY)

import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const cors = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
};
const json = (o: unknown, status = 200) => new Response(JSON.stringify(o), { status, headers: { ...cors, "Content-Type": "application/json" } });
const sha256 = async (s: string) => [...new Uint8Array(await crypto.subtle.digest("SHA-256", new TextEncoder().encode(s)))].map((x) => x.toString(16).padStart(2, "0")).join("");
const PEPPER = () => Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!.slice(-24);

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response("ok", { headers: cors });
  try {
    const b = await req.json();
    const db = createClient(Deno.env.get("SUPABASE_URL")!, Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!);
    const phone = typeof b.phone === "string" && /^\+1\d{10}$/.test(b.phone) ? b.phone : "";

    if (b.action === "send") {
      if (!phone) return json({ error: "bad-phone" }, 400);
      const hourAgo = new Date(Date.now() - 3600_000).toISOString();
      const { count } = await db.from("login_codes").select("id", { count: "exact", head: true }).eq("phone", phone).gt("created_at", hourAgo);
      if ((count ?? 0) >= 5) return json({ error: "too-many" }, 429);
      const code = String(crypto.getRandomValues(new Uint32Array(1))[0] % 1_000_000).padStart(6, "0");
      await db.from("login_codes").insert({ phone, code_hash: await sha256(phone + code + PEPPER()), expires_at: new Date(Date.now() + 600_000).toISOString() });
      // only text people who have saved details (but answer the same either way)
      const { data: c } = await db.from("customers").select("id").eq("phone", phone).maybeSingle();
      if (c) await sendSms(phone, `Your LIVO sign-in code is ${code}. It expires in 10 minutes. Didn't ask for it? Ignore this text.`);
      return json({ ok: true });
    }

    if (b.action === "verify") {
      const code = typeof b.code === "string" ? b.code.replace(/\D/g, "") : "";
      if (!phone || code.length !== 6) return json({ error: "bad-code" }, 400);
      const { data: row } = await db.from("login_codes").select("*").eq("phone", phone).gt("expires_at", new Date().toISOString()).order("created_at", { ascending: false }).limit(1).maybeSingle();
      if (!row || row.attempts >= 5) return json({ error: "bad-code" }, 400);
      if (row.code_hash !== await sha256(phone + code + PEPPER())) {
        await db.from("login_codes").update({ attempts: row.attempts + 1 }).eq("id", row.id);
        return json({ error: "bad-code" }, 400);
      }
      await db.from("login_codes").delete().eq("phone", phone);
      const { data: c } = await db.from("customers").select("id").eq("phone", phone).maybeSingle();
      if (!c) return json({ error: "bad-code" }, 400); // no saved details for this phone
      const token = [...crypto.getRandomValues(new Uint8Array(32))].map((x) => x.toString(16).padStart(2, "0")).join("");
      await db.from("customer_sessions").insert({ customer_id: c.id, token_hash: await sha256(token), expires_at: new Date(Date.now() + 90 * 86400_000).toISOString() });
      return json({ token });
    }

    // everything below needs a valid session
    const tok = typeof b.token === "string" ? b.token : "";
    const { data: s } = tok ? await db.from("customer_sessions").select("id, customer_id").eq("token_hash", await sha256(tok)).gt("expires_at", new Date().toISOString()).maybeSingle() : { data: null };
    if (!s) return json({ error: "signed-out" }, 401);

    if (b.action === "me") {
      const [{ data: c }, { data: places }, { data: jobs }] = await Promise.all([
        db.from("customers").select("name, phone, email, company").eq("id", s.customer_id).single(),
        db.from("places").select("id, label, address, segment, business, access_notes").eq("customer_id", s.customer_id).order("created_at"),
        db.from("bookings").select("id, kind, visit_date, items, total, division, sub_service, tier, place_id").eq("customer_id", s.customer_id).order("created_at", { ascending: false }).limit(20),
      ]);
      return json({
        customer: c,
        places: (places ?? []).map((p) => ({ id: p.id, label: p.label, address: p.address, segment: p.segment, business: p.business ?? undefined, access: p.access_notes ?? undefined })),
        history: (jobs ?? []).map((j) => ({ ref: j.id.slice(0, 8).toUpperCase(), date: j.visit_date, service: j.items?.[0]?.group ?? "", div: j.division, sub: j.sub_service, tier: j.tier, total: j.kind === "quote" ? null : j.total, kind: j.kind, placeId: j.place_id ?? undefined })),
      });
    }
    if (b.action === "remove-place") {
      await db.from("places").delete().eq("id", b.placeId).eq("customer_id", s.customer_id);
      return json({ ok: true });
    }
    if (b.action === "signout") {
      await db.from("customer_sessions").delete().eq("id", s.id);
      return json({ ok: true });
    }
    return json({ error: "unknown-action" }, 400);
  } catch (e) {
    return json({ error: "Unexpected error.", detail: String(e) }, 500);
  }
});

async function sendSms(to: string, body: string) {
  const sid = Deno.env.get("TWILIO_ACCOUNT_SID"), token = Deno.env.get("TWILIO_AUTH_TOKEN"), from = Deno.env.get("TWILIO_FROM");
  if (!sid || !token || !from) return;
  await fetch(`https://api.twilio.com/2010-04-01/Accounts/${sid}/Messages.json`, {
    method: "POST",
    headers: { Authorization: "Basic " + btoa(`${sid}:${token}`), "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({ To: to, From: from, Body: body }),
  });
}
