// ─────────────────────────────────────────────────────────────
//  LIVO — browser data layer (bookings, quotes, photos, sign-in)
//
//  TEST MODE: on any address that is not livoland.com (the v1.0 test
//  site, Netlify previews, localhost) NOTHING is sent or saved on a
//  server. Bookings, photo uploads and sign-in are simulated and kept
//  in this browser only, so the whole journey can be tried for free.
//
//  LIVE MODE (livoland.com): talks to the Supabase project `livo`.
//  Before the first live push these must be deployed there:
//    migration supabase/migrations/0002_quotes_customers.sql
//    edge functions send-booking-confirmation (v2) and customer-auth
// ─────────────────────────────────────────────────────────────

const SUPABASE_URL = 'https://dlzmkkmnmrbvxoazzbpi.supabase.co';
// public anon key — safe in the browser (row-level security protects the data)
const ANON = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRsem1ra21ubXJidnhvYXp6YnBpIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Nzc5NDkwNDEsImV4cCI6MjA5MzUyNTA0MX0.c0GlQn81n0Y_J-amOo24D4lmVih95qXWDy9Y20fkSYg';

export const LIVE = typeof location !== 'undefined' && ['livoland.com', 'www.livoland.com'].includes(location.hostname);
export const TEST = !LIVE;

export type Place = { id: string; label: string; address: string; segment: 'residential' | 'commercial'; business?: string; size?: string; access?: string };
export type Customer = { name: string; phone: string; email: string; company?: string };
export type PastJob = { ref: string; date: string; service: string; div: string; sub: string; tier: string; total: number | null; kind: 'booking' | 'quote'; placeId?: string };
export type Profile = { customer: Customer; places: Place[]; history: PastJob[] };

export type RequestPayload = {
  kind: 'booking' | 'quote';
  segment: 'residential' | 'commercial';
  name: string; email: string; phone: string;
  business?: string;
  address: string; access?: string;
  date: string; time: string;
  div: string; sub: string; tier: string; service: string;
  items: { svcName: string; group: string; size: string; freq: string; price: number }[];
  total: number; firstTime: boolean;
  description?: string;
  notes?: string;
  save: boolean;           // customer ticked "Save my details"
  placeId?: string;        // existing saved place used
};

const SESSION_KEY = 'livo-session';
const DEMO_KEY = 'livo-test-account';

const store = {
  get<T>(k: string): T | null { try { const v = localStorage.getItem(k); return v ? (JSON.parse(v) as T) : null; } catch { return null; } },
  set(k: string, v: unknown) { try { localStorage.setItem(k, JSON.stringify(v)); } catch { /* private mode */ } },
  del(k: string) { try { localStorage.removeItem(k); } catch { /* ignore */ } },
};

const wait = (ms: number) => new Promise((r) => setTimeout(r, ms));
const rid = () => (crypto.randomUUID?.() ?? String(Math.random()).slice(2)).replace(/-/g, '');
export const normPhone = (p: string) => {
  const d = p.replace(/\D/g, '');
  if (d.length === 10) return '+1' + d;
  if (d.length === 11 && d[0] === '1') return '+' + d;
  return '';
};

async function fn<T>(name: string, body: unknown): Promise<T> {
  const r = await fetch(`${SUPABASE_URL}/functions/v1/${name}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${ANON}`, apikey: ANON },
    body: JSON.stringify(body),
  });
  const j = await r.json().catch(() => ({}));
  if (!r.ok || j.error) throw new Error(j.error || 'request-failed');
  return j as T;
}

// ───────── photos ─────────
// Shrinks a phone photo to max 1600 px JPEG before upload (fast on mobile data).
export async function shrink(file: File): Promise<Blob> {
  try {
    const bmp = await createImageBitmap(file);
    const k = Math.min(1, 1600 / Math.max(bmp.width, bmp.height));
    const c = document.createElement('canvas');
    c.width = Math.round(bmp.width * k); c.height = Math.round(bmp.height * k);
    c.getContext('2d')!.drawImage(bmp, 0, 0, c.width, c.height);
    return await new Promise((res) => c.toBlob((b) => res(b ?? file), 'image/jpeg', 0.82));
  } catch { return file; } // format the browser can't draw (e.g. HEIC on desktop) → send as is
}

async function uploadPhoto(blob: Blob): Promise<string> {
  const path = `incoming/${new Date().toISOString().slice(0, 10)}/${rid()}.jpg`;
  const r = await fetch(`${SUPABASE_URL}/storage/v1/object/quote-photos/${path}`, {
    method: 'POST',
    headers: { Authorization: `Bearer ${ANON}`, apikey: ANON, 'Content-Type': blob.type || 'image/jpeg', 'x-upsert': 'false' },
    body: blob,
  });
  if (!r.ok) throw new Error('photo-upload-failed');
  return path;
}

// ───────── booking / quote ─────────
export async function sendRequest(p: RequestPayload, photos: File[], onProgress?: (done: number, all: number) => void): Promise<{ ref: string; test: boolean }> {
  const token = store.get<string>(SESSION_KEY) ?? undefined;
  if (TEST) {
    for (let i = 0; i < photos.length; i++) { await wait(250); onProgress?.(i + 1, photos.length); }
    await wait(500);
    const ref = 'TEST-' + rid().slice(0, 6).toUpperCase();
    if (p.save || token) saveDemo(p, ref);
    return { ref, test: true };
  }
  const paths: string[] = [];
  for (let i = 0; i < photos.length; i++) { paths.push(await uploadPhoto(await shrink(photos[i]))); onProgress?.(i + 1, photos.length); }
  const j = await fn<{ ref: string }>('send-booking-confirmation', { ...p, photos: paths, session: token });
  return { ref: j.ref, test: false };
}

function saveDemo(p: RequestPayload, ref: string) {
  const acc = store.get<Profile>(DEMO_KEY) ?? { customer: { name: '', phone: '', email: '' }, places: [], history: [] };
  acc.customer = { name: p.name, phone: p.phone, email: p.email, company: p.business || acc.customer.company };
  let place = acc.places.find((x) => x.id === p.placeId) ?? acc.places.find((x) => x.address.toLowerCase() === p.address.toLowerCase());
  if (!place) {
    place = { id: rid().slice(0, 10), label: p.business || (p.segment === 'commercial' ? 'Business' : acc.places.length ? `Home ${acc.places.length + 1}` : 'Home'), address: p.address, segment: p.segment, business: p.business, access: p.access };
    acc.places.push(place);
  } else if (p.access) place.access = p.access;
  acc.history.unshift({ ref, date: p.date, service: p.service, div: p.div, sub: p.sub, tier: p.tier, total: p.kind === 'quote' ? null : p.total, kind: p.kind, placeId: place.id });
  store.set(DEMO_KEY, acc);
  store.set(SESSION_KEY, 'test-session');
}

// ───────── sign-in with a text code ─────────
export async function sendCode(phone: string): Promise<{ testCode?: string }> {
  if (TEST) { await wait(500); return { testCode: '123456' }; }
  await fn('customer-auth', { action: 'send', phone });
  return {};
}

export async function verifyCode(phone: string, code: string): Promise<boolean> {
  if (TEST) {
    await wait(400);
    if (code.trim() !== '123456') return false;
    const acc = store.get<Profile>(DEMO_KEY);
    if (!acc || acc.customer.phone !== phone) store.set(DEMO_KEY, { customer: { name: '', phone, email: '' }, places: [], history: [] });
    store.set(SESSION_KEY, 'test-session');
    return true;
  }
  try { const j = await fn<{ token: string }>('customer-auth', { action: 'verify', phone, code }); store.set(SESSION_KEY, j.token); return true; }
  catch { return false; }
}

export const signedIn = () => !!store.get<string>(SESSION_KEY);

export async function getProfile(): Promise<Profile | null> {
  const token = store.get<string>(SESSION_KEY);
  if (!token) return null;
  if (TEST) return store.get<Profile>(DEMO_KEY);
  try { return await fn<Profile>('customer-auth', { action: 'me', token }); }
  catch { store.del(SESSION_KEY); return null; }
}

export async function removePlace(id: string) {
  const token = store.get<string>(SESSION_KEY);
  if (TEST) { const acc = store.get<Profile>(DEMO_KEY); if (acc) { acc.places = acc.places.filter((p) => p.id !== id); store.set(DEMO_KEY, acc); } return; }
  await fn('customer-auth', { action: 'remove-place', token, placeId: id });
}

export async function signOut() {
  const token = store.get<string>(SESSION_KEY);
  store.del(SESSION_KEY);
  if (LIVE && token) fn('customer-auth', { action: 'signout', token }).catch(() => {});
}

// Test mode only: wipe the pretend account in this browser
export const clearTestData = () => { store.del(DEMO_KEY); store.del(SESSION_KEY); };
