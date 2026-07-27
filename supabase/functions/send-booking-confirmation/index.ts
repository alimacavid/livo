// LIVO — send-booking-confirmation
// Stores a booking and sends a confirmation SMS (Twilio) + email (Resend).
// Deploy:  supabase functions deploy send-booking-confirmation --project-ref dlzmkkmnmrbvxoazzbpi
//
// Required secrets (set with `supabase secrets set ...`):
//   TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN, TWILIO_FROM   (e.g. +16045551234)
//   RESEND_API_KEY, RESEND_FROM   (e.g. "LIVO <bookings@livoland.com>")
//   SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY  (auto-injected by Supabase)

import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const cors = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
};

const money = (n: number) => "$" + Math.round(n);

interface Item { svcName: string; group: string; size: string; freq: string; price: number; }
interface Payload {
  name: string; email: string; phone: string;
  date: string; time: string;
  items: Item[]; total: number; firstTime: boolean;
  notes?: string;
}

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response("ok", { headers: cors });

  try {
    const body = (await req.json()) as Payload;

    // ---- basic validation ----
    if (!body?.name || !body?.email || !body?.phone) {
      return json({ error: "Missing name, email, or phone." }, 400);
    }
    if (!Array.isArray(body.items) || body.items.length === 0) {
      return json({ error: "No services in order." }, 400);
    }

    // ---- store booking ----
    const supabase = createClient(
      Deno.env.get("SUPABASE_URL")!,
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!,
    );
    const { data: booking, error: dbErr } = await supabase
      .from("bookings")
      .insert({
        customer_name: body.name,
        customer_email: body.email,
        customer_phone: body.phone,
        visit_date: body.date,
        visit_time: body.time,
        items: body.items,
        total: body.total,
        first_time_discount: body.firstTime,
        notes: body.notes ?? null,
        status: "pending",
      })
      .select()
      .single();

    if (dbErr) return json({ error: "Could not save booking.", detail: dbErr.message }, 500);

    const ref = booking.id.slice(0, 8).toUpperCase();
    const lines = body.items
      .map((i) => `• ${i.svcName} (${i.size}, ${i.freq}) — ${money(i.price)}`)
      .join("\n");
    const when = `${body.date} · ${body.time}`;

    // ---- send SMS (Twilio) ----
    const smsBody =
      `LIVO booking confirmed! Ref ${ref}\n${when}\nTotal ${money(body.total)}. ` +
      `We'll call to finalize. Questions? 888-802-LIVO`;
    const smsResult = await sendSms(body.phone, smsBody);

    // ---- send email (Resend) ----
    const emailResult = await sendEmail(body.email, ref, when, lines, body);

    return json({
      ok: true,
      ref,
      booking_id: booking.id,
      sms: smsResult,
      email: emailResult,
    });
  } catch (e) {
    return json({ error: "Unexpected error.", detail: String(e) }, 500);
  }
});

function json(obj: unknown, status = 200) {
  return new Response(JSON.stringify(obj), {
    status,
    headers: { ...cors, "Content-Type": "application/json" },
  });
}

async function sendSms(to: string, bodyText: string) {
  const sid = Deno.env.get("TWILIO_ACCOUNT_SID");
  const token = Deno.env.get("TWILIO_AUTH_TOKEN");
  const from = Deno.env.get("TWILIO_FROM");
  if (!sid || !token || !from) return { sent: false, reason: "twilio-not-configured" };

  const url = `https://api.twilio.com/2010-04-01/Accounts/${sid}/Messages.json`;
  const form = new URLSearchParams({ To: to, From: from, Body: bodyText });
  const resp = await fetch(url, {
    method: "POST",
    headers: {
      Authorization: "Basic " + btoa(`${sid}:${token}`),
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: form,
  });
  const data = await resp.json();
  return resp.ok ? { sent: true, sid: data.sid } : { sent: false, reason: data.message };
}

async function sendEmail(
  to: string, ref: string, when: string, lines: string, p: Payload,
) {
  const key = Deno.env.get("RESEND_API_KEY");
  const from = Deno.env.get("RESEND_FROM");
  if (!key || !from) return { sent: false, reason: "resend-not-configured" };

  const itemsHtml = p.items
    .map(
      (i) =>
        `<tr><td style="padding:8px 0;border-bottom:1px solid #eee">${i.svcName}<br><span style="color:#777;font-size:13px">${i.size} · ${i.freq}</span></td>` +
        `<td align="right" style="padding:8px 0;border-bottom:1px solid #eee;font-weight:700;color:#5F2491">${money(i.price)}</td></tr>`,
    )
    .join("");

  const html = `
  <div style="font-family:Arial,Helvetica,sans-serif;max-width:520px;margin:0 auto;color:#2C2C2C">
    <div style="background:linear-gradient(135deg,#8E3AAC,#5F2491);padding:24px;border-radius:14px 14px 0 0">
      <h1 style="color:#fff;margin:0;font-size:22px">Booking Confirmed 🎉</h1>
      <p style="color:#e9dcf3;margin:6px 0 0">Reference #${ref}</p>
    </div>
    <div style="border:1px solid #eee;border-top:none;padding:24px;border-radius:0 0 14px 14px">
      <p>Hi ${p.name}, thanks for booking with LIVO! Here are your details:</p>
      <p style="background:#f5f2f8;border-radius:10px;padding:12px 14px;font-weight:700">📅 ${when}</p>
      <table style="width:100%;border-collapse:collapse;margin:12px 0">${itemsHtml}</table>
      <table style="width:100%;border-collapse:collapse">
        <tr><td style="font-weight:800;font-size:18px;padding-top:10px">Total${p.firstTime ? " (30% off applied)" : ""}</td>
        <td align="right" style="font-weight:800;font-size:18px;padding-top:10px">${money(p.total)}</td></tr>
      </table>
      <p style="color:#777;font-size:13px">No payment now — we'll call to finalize your appointment. Need to change anything? Call <b>888-802-LIVO</b>.</p>
    </div>
  </div>`;

  const resp = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: { Authorization: `Bearer ${key}`, "Content-Type": "application/json" },
    body: JSON.stringify({
      from,
      to,
      subject: `Your LIVO booking is confirmed — #${ref}`,
      html,
    }),
  });
  const data = await resp.json();
  return resp.ok ? { sent: true, id: data.id } : { sent: false, reason: data.message };
}
