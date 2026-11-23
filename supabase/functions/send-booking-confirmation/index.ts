// LIVO — send-booking-confirmation (2026-11-23: estimates, location and preparation in confirmations)
// Stores a booking OR a quote request, saves the customer's details when they
// asked for it, and sends text + email confirmations (customer) and a new-job
// alert with photo links (LIVO).
// Deployment is handled separately by Claude after review.
//
// Secrets: TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN, TWILIO_FROM, RESEND_API_KEY, RESEND_FROM,
//          LIVO_ALERT_PHONE, LIVO_ALERT_EMAIL (where new-job alerts go)
//          SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY (auto-injected)

import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const cors = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
};
const money = (n: number) => "$" + Math.round(n);
const clip = (s: unknown, n = 500) => (typeof s === "string" ? s.trim().slice(0, n) : "");
const esc = (s: string) => s.replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" })[c]!);

interface Item { svcName: string; group: string; size: string; freq: string; price: number }
interface Payload {
  kind?: "booking" | "quote"; segment?: "residential" | "commercial";
  name: string; email: string; phone: string; business?: string;
  address?: string; access?: string; date: string; time: string;
  div?: string; sub?: string; tier?: string; service?: string;
  items: Item[]; total: number; firstTime: boolean;
  description?: string; notes?: string;
  photos?: string[]; save?: boolean; placeId?: string; session?: string;
  prep?: string[]; estimate?: number | null; location?: string;
}
// "Get ready for your crew" lines sent by the website (src/data/services.ts PREP); max 6, short text only
const prepOf = (p: Payload) => (Array.isArray(p.prep) ? p.prep : []).map((x) => clip(x, 140)).filter(Boolean).slice(0, 6);

const estimateOf = (p: Payload): number | null => typeof p.estimate === "number" && Number.isFinite(p.estimate) && p.estimate >= 0 ? Math.round(p.estimate) : null;
const estimateText = (p: Payload, estimate: number) => money(estimate) + (p.segment === "commercial" ? " + tax" : "");
const locationOf = (p: Payload) => clip(p.location, 160);
const serviceOf = (p: Payload) => clip(p.service, 120) || clip(p.items[0]?.group, 120);

function customerSms(kind: string, ref: string, when: string, p: Payload) {
  const service = serviceOf(p), estimate = estimateOf(p);
  if (kind === "quote") return [
    `LIVO: quote request received #${ref} for ${service}.`,
    estimate != null ? `Rough price from ${estimateText(p, estimate)}. Final price confirmed on site.` : "",
    "We'll text your quote, usually the same day. Questions? 888-802-LIVO",
  ].filter(Boolean).join("\n");
  return [
    `LIVO: booking received #${ref}`,
    when,
    `${service} · ${money(p.total)}, pay after the job`,
    "We'll text you to confirm your crew.",
    prepOf(p).length ? `Get ready: ${prepOf(p).slice(0, 2).join(" ")}` : "",
    "Full list in your email. Questions? 888-802-LIVO",
  ].filter(Boolean).join("\n");
}

function alertSms(kind: string, ref: string, when: string, p: Payload, photoCount: number) {
  const estimate = estimateOf(p);
  return [
    `NEW ${kind.toUpperCase()} #${ref} · ${p.segment === "commercial" ? "commercial" : "residential"}`,
    serviceOf(p),
    `${clip(p.business, 60) || p.name} · ${p.phone}`,
    when,
    locationOf(p) ? `Location: ${locationOf(p)}` : "",
    kind === "quote" && estimate != null ? `Rough price from ${estimateText(p, estimate)}` : "",
    photoCount ? `${photoCount} photos — see email` : "",
  ].filter(Boolean).join("\n");
}

async function sha256(s: string) {
  const b = await crypto.subtle.digest("SHA-256", new TextEncoder().encode(s));
  return [...new Uint8Array(b)].map((x) => x.toString(16).padStart(2, "0")).join("");
}

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response("ok", { headers: cors });
  try {
    const body = (await req.json()) as Payload;
    if (!body?.name || !body?.email || !/^\+1\d{10}$/.test(body?.phone ?? "")) return json({ error: "Missing name, email, or phone." }, 400);
    if (!Array.isArray(body.items) || body.items.length === 0 || body.items.length > 20) return json({ error: "No services in order." }, 400);
    const kind = body.kind === "quote" ? "quote" : "booking";
    const segment = body.segment === "commercial" ? "commercial" : "residential";
    const photos = (body.photos ?? []).filter((p) => /^incoming\/\d{4}-\d{2}-\d{2}\/[a-f0-9]{8,64}\.jpg$/.test(p)).slice(0, 10);

    const db = createClient(Deno.env.get("SUPABASE_URL")!, Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!);

    // ---- saved customer (only if asked, or already signed in) ----
    let customerId: string | null = null; let placeId: string | null = null;
    if (body.session) {
      const { data: s } = await db.from("customer_sessions").select("customer_id").eq("token_hash", await sha256(body.session)).gt("expires_at", new Date().toISOString()).maybeSingle();
      customerId = s?.customer_id ?? null;
    }
    if (body.save || customerId) {
      if (!customerId) {
        const { data: existing } = await db.from("customers").select("id").eq("phone", body.phone).maybeSingle();
        if (existing) customerId = existing.id; // not signed in: never overwrite an existing profile, only add the place
        else {
          const { data: c } = await db.from("customers").insert({ phone: body.phone, name: clip(body.name, 120), email: clip(body.email, 200), company: clip(body.business, 120) || null }).select("id").single();
          customerId = c?.id ?? null;
        }
      } else {
        await db.from("customers").update({ name: clip(body.name, 120), email: clip(body.email, 200), company: clip(body.business, 120) || undefined, updated_at: new Date().toISOString() }).eq("id", customerId);
      }
      if (customerId) {
        const addr = clip(body.address, 300);
        const { data: own } = body.placeId ? await db.from("places").select("id").eq("id", body.placeId).eq("customer_id", customerId).maybeSingle() : { data: null };
        const { data: same } = own ? { data: own } : await db.from("places").select("id").eq("customer_id", customerId).ilike("address", addr).maybeSingle();
        if (same) { placeId = same.id; if (body.access && body.session) await db.from("places").update({ access_notes: clip(body.access, 300) }).eq("id", placeId); }
        else if (addr) {
          const { count } = await db.from("places").select("id", { count: "exact", head: true }).eq("customer_id", customerId);
          const label = clip(body.business, 60) || (segment === "commercial" ? "Business" : (count ?? 0) ? `Home ${(count ?? 0) + 1}` : "Home");
          const { data: p } = await db.from("places").insert({ customer_id: customerId, label, address: addr, segment, business: clip(body.business, 120) || null, access_notes: clip(body.access, 300) || null }).select("id").single();
          placeId = p?.id ?? null;
        }
      }
    }

    // ---- store the booking / quote ----
    const { data: booking, error: dbErr } = await db.from("bookings").insert({
      kind, segment, division: clip(body.div, 60), sub_service: clip(body.sub, 80), tier: clip(body.tier, 40),
      customer_name: clip(body.name, 120), customer_email: clip(body.email, 200), customer_phone: body.phone,
      business_name: clip(body.business, 120) || null,
      address: clip(body.address, 300) || null, access_notes: clip(body.access, 300) || null,
      visit_date: body.date, visit_time: clip(body.time, 40),
      items: body.items, total: kind === "quote" ? 0 : Math.max(0, Math.round(body.total)),
      first_time_discount: kind === "booking" && !!body.firstTime,
      description: clip(body.description, 2000) || null, notes: clip(body.notes, 1000) || null,
      photos, customer_id: customerId, place_id: placeId, status: "pending",
    }).select().single();
    if (dbErr) return json({ error: "Could not save request.", detail: dbErr.message }, 500);

    const ref = booking.id.slice(0, 8).toUpperCase();
    const nice = /^\d{4}-\d{2}-\d{2}$/.test(body.date) ? new Date(body.date + "T12:00:00Z").toLocaleDateString("en-CA", { weekday: "short", month: "short", day: "numeric", timeZone: "UTC" }) : body.date;
    const when = `${nice} · ${body.time}`;
    const service = clip(body.service, 120) || body.items[0].group;

    // ---- customer confirmation ----
    const sms = customerSms(kind, ref, when, body);
    const smsResult = await sendSms(body.phone, sms);
    const emailResult = await sendEmail(body.email, kind === "quote" ? `We got your LIVO quote request — #${ref}` : `Your LIVO booking — #${ref}`, customerHtml(kind, ref, when, { ...body, photos }));

    // ---- alert LIVO (with 7-day photo links) ----
    const links: string[] = [];
    for (const p of photos) {
      const { data } = await db.storage.from("quote-photos").createSignedUrl(p, 60 * 60 * 24 * 7);
      if (data?.signedUrl) links.push(data.signedUrl);
    }
    const alertTo = Deno.env.get("LIVO_ALERT_PHONE");
    if (alertTo) await sendSms(alertTo, alertSms(kind, ref, when, body, photos.length));
    const alertMail = Deno.env.get("LIVO_ALERT_EMAIL");
    if (alertMail) await sendEmail(alertMail, `New ${kind} #${ref} — ${service}`, alertHtml(kind, ref, when, { ...body, photos }, links));

    return json({ ok: true, ref, booking_id: booking.id, sms: smsResult, email: emailResult });
  } catch (e) {
    return json({ error: "Unexpected error.", detail: String(e) }, 500);
  }
});

function json(obj: unknown, status = 200) {
  return new Response(JSON.stringify(obj), { status, headers: { ...cors, "Content-Type": "application/json" } });
}

async function sendSms(to: string, bodyText: string) {
  const sid = Deno.env.get("TWILIO_ACCOUNT_SID"), token = Deno.env.get("TWILIO_AUTH_TOKEN"), from = Deno.env.get("TWILIO_FROM");
  if (!sid || !token || !from) return { sent: false, reason: "twilio-not-configured" };
  const resp = await fetch(`https://api.twilio.com/2010-04-01/Accounts/${sid}/Messages.json`, {
    method: "POST",
    headers: { Authorization: "Basic " + btoa(`${sid}:${token}`), "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({ To: to, From: from, Body: bodyText }),
  });
  const data = await resp.json();
  return resp.ok ? { sent: true, sid: data.sid } : { sent: false, reason: data.message };
}

async function sendEmail(to: string, subject: string, html: string) {
  const key = Deno.env.get("RESEND_API_KEY"), from = Deno.env.get("RESEND_FROM");
  if (!key || !from) return { sent: false, reason: "resend-not-configured" };
  const resp = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: { Authorization: `Bearer ${key}`, "Content-Type": "application/json" },
    body: JSON.stringify({ from, to, subject, html }),
  });
  const data = await resp.json();
  return resp.ok ? { sent: true, id: data.id } : { sent: false, reason: data.message };
}

const frame = (title: string, sub: string, inner: string) => `
  <div style="font-family:Arial,Helvetica,sans-serif;max-width:520px;margin:0 auto;color:#2C2C2C">
    <div style="background-color:#6B3FA0;background-image:linear-gradient(135deg,#6B3FA0,#4A2A73);padding:24px;border-radius:14px 14px 0 0">
      <h1 style="color:#fff;margin:0;font-size:22px">${title}</h1><p style="color:#e9dcf3;margin:6px 0 0">${sub}</p>
    </div>
    <div style="border:1px solid #eee;border-top:none;padding:24px;border-radius:0 0 14px 14px">${inner}</div>
  </div>`;

const emailLine = (label: string, value?: string) => value ? `<tr><th scope="row" align="left" style="vertical-align:top;color:#666;font-weight:400;padding:5px 12px 5px 0;white-space:nowrap">${esc(label)}</th><td style="padding:5px 0;overflow-wrap:anywhere">${esc(value).replace(/\n/g, "<br>")}</td></tr>` : "";

function requestDetails(kind: string, when: string, p: Payload) {
  return `<table style="width:100%;border-collapse:collapse;font-size:14px;margin:12px 0">
    ${emailLine("Service", serviceOf(p))}${emailLine(kind === "quote" ? "Preferred date" : "Date", when)}${emailLine("Address", clip(p.address, 300) || "Not provided")}${emailLine("Access notes", clip(p.access, 300))}${emailLine("Location", locationOf(p))}${emailLine("Photos sent", String(Array.isArray(p.photos) ? p.photos.length : 0))}
  </table>`;
}

function prepHtml(p: Payload) {
  const prep = prepOf(p);
  return prep.length ? `<div style="background:#F6F9D9;border-radius:10px;padding:14px 16px;margin:16px 0"><b style="font-size:15px">Get ready for your crew</b>
    <ul style="margin:8px 0 0;padding-left:18px;line-height:1.6">${prep.map((x) => `<li>${esc(x)}</li>`).join("")}</ul></div>` : "";
}

function customerHtml(kind: string, ref: string, when: string, p: Payload) {
  const details = requestDetails(kind, when, p);
  const footer = `<p style="color:#666;font-size:13px">${kind === "quote" ? "We text you your quote, usually the same day." : "We text you to confirm your crew."} Questions? Call <b>888-802-LIVO</b>.</p>`;
  if (kind === "quote") {
    const estimate = estimateOf(p);
    return frame("Quote request received", `Reference #${esc(ref)}`, `<p>Hi ${esc(p.name)}, thanks for asking LIVO for a quote.</p>
      ${details}
      <p style="background:#F3EEFA;border-radius:10px;padding:12px 14px">${estimate != null ? `<b>Rough price from ${estimateText(p, estimate)}</b> (final price confirmed on site)` : "<b>Price:</b> in your quote"}</p>
      <p style="background:#F6F9D9;border-radius:10px;padding:12px 14px"><b>What happens next</b><br>1. We look at your photos and details.<br>2. You get your quote by text and email, usually the same day.<br>3. Say yes and we lock in your date.</p>
      ${prepHtml(p)}${footer}`);
  }
  const rows = p.items.map((i) => `<tr><td style="padding:8px 0;border-bottom:1px solid #eee">${esc(i.group)}<br><span style="color:#777;font-size:13px">${esc(i.size)} · ${esc(i.freq)}</span></td>` +
    `<td align="right" style="padding:8px 0;border-bottom:1px solid #eee;font-weight:700;color:#6B3FA0">${money(i.price)}</td></tr>`).join("");
  return frame("Booking received", `Reference #${esc(ref)}`, `<p>Hi ${esc(p.name)}, thanks for booking with LIVO.</p>
    ${details}
    <table style="width:100%;border-collapse:collapse;margin:12px 0">${rows}</table>
    <table style="width:100%;border-collapse:collapse"><tr><td style="font-weight:800;font-size:18px;padding-top:10px">Total${p.firstTime ? " (first-booking discount applied)" : ""}</td><td align="right" style="font-weight:800;font-size:18px;padding-top:10px">${money(p.total)}</td></tr></table>
    ${p.notes ? `<p style="font-size:13px;line-height:1.5"><b>Notes:</b> ${esc(clip(p.notes, 1000))}</p>` : ""}
    ${prepHtml(p)}
    <p style="color:#666;font-size:13px">No payment now. <b>Pay after the job.</b></p>${footer}`);
}

function alertHtml(kind: string, ref: string, when: string, p: Payload, links: string[]) {
  const estimate = estimateOf(p);
  return frame(`New ${esc(kind)} #${esc(ref)}`, `${esc(p.segment ?? "")} · ${esc(serviceOf(p))}`, `
    <table style="font-size:14px">${emailLine("Name", p.name)}${emailLine("Business", p.business)}${emailLine("Phone", p.phone)}${emailLine("Email", p.email)}${emailLine("Address", p.address)}${emailLine("Access", p.access)}${emailLine("Location", locationOf(p))}${emailLine("When", when)}${emailLine("Size / quote", p.items[0].size)}${emailLine("How often", p.items[0].freq)}${kind === "booking" ? emailLine("Total", money(p.total)) : ""}${kind === "quote" && estimate != null ? emailLine("Rough price", `from ${estimateText(p, estimate)} (final price confirmed on site)`) : ""}${emailLine("Photos sent", String(Array.isArray(p.photos) ? p.photos.length : 0))}${emailLine("Description", p.description)}${emailLine("Notes", p.notes)}</table>
    ${links.length ? `<p style="margin-top:16px;font-weight:700">Photos (links work for 7 days)</p>${links.map((u, i) => `<a href="${esc(u)}" style="display:inline-block;margin:0 8px 8px 0">Photo ${i + 1}</a>`).join("")}` : ""}`);
}
