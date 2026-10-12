// ─────────────────────────────────────────────────────────────
//  LIVO — SINGLE SOURCE OF TRUTH FOR SERVICES AND PRICES
//  Every price on the website AND in the booking page comes from
//  this file. To change a price: edit the number here, save, push.
//  price: null    → shown as "Quote"
//  quote: true    → customer sends a quote request (with photos),
//                   even if a "from" price is shown
//  draft: true    → price not yet approved by Ali (shows a small tag)
// ─────────────────────────────────────────────────────────────
import type { ImageMetadata } from 'astro';

import interiorKitchen from '../assets/photos/interior-kitchen.jpg';
import interiorVacuum from '../assets/photos/interior-vacuum.png';
import interiorBefore from '../assets/photos/interior-before.jpg';
import interiorAfter from '../assets/photos/interior-after.jpg';
import airbnbBefore from '../assets/photos/airbnb-before.jpg';
import airbnbAfter from '../assets/photos/airbnb-after.jpg';
import junkTruck from '../assets/photos/junk-truck.jpg';
import junkBefore from '../assets/photos/junk-before.png';
import junkAfter from '../assets/photos/junk-after.png';
import teamVan from '../assets/photos/team-van.jpg';

export const PHONE = '888-802-LIVO';
export const PHONE_TEL = '+18888025486';
// 2026-10-12 (Ali): 15% off the first booking, residential fixed-price services only
export const FIRST_TIME_DISCOUNT = 0.15;

// Short muted video loops. Put the file in /public/videos/ and set the path here.
// null = no video yet → the photo is shown.
export const HERO_VIDEO: string | null = null;        // e.g. '/videos/hero.mp4'

export type Segment = 'residential' | 'commercial';
export type Tier = { id: string; name: string; sub?: string; price: number | null; popular?: boolean };
export type Addon = { id: string; name: string; sub: string; price: number; unit: string; qty?: boolean };
export type Freq = { id: string; name: string; sub: string; discount: number };
export type Faq = { q: string; a: string };
export type Sub = {
  slug: string;
  name: string;
  short: string;          // one line for cards
  desc: string;           // intro paragraph on the page
  image: ImageMetadata;
  before?: ImageMetadata;
  after?: ImageMetadata;
  realPhotos?: boolean;   // true only when before/after are real LIVO jobs
  unit: string;           // "per visit", "flat rate" …
  tierLabel: string;      // "Home size", "Area", "Load size" …
  tiers: Tier[];
  included: string[];
  goodFor: string[];
  draft?: boolean;
  quote?: boolean;        // request a quote (photos) instead of booking
  quoteNote?: string;
  recurring?: boolean;    // page shows weekly / bi-weekly / monthly price table
};
export type Division = {
  id: string;             // also the URL: /services/<id>
  name: string;
  short: string;
  tagline: string;
  intro: string;          // first sentence on the page — carries the SEO phrase
  seoTitle: string;
  keyword: string;
  segment: Segment;
  icon: string;           // key in components/Icon.astro
  image: ImageMetadata;
  video?: string;         // optional banner loop in /public/videos/
  subs: Sub[];
  addons: Addon[];
  freqs: Freq[];
  times: { id: string; sub: string }[];
  faqs: Faq[];
  notIncluded: string[];
  crossSell?: { div: string; sub: string; title: string; line: string };
};

const HOME_SIZES = (p: [number, number, number, number], popular = 2): Tier[] => [
  { id: 'studio', name: 'Studio', sub: 'Bachelor · 1 bath', price: p[0] },
  { id: '1bed', name: '1 Bedroom', sub: '1 bed · 1 bath', price: p[1] },
  { id: '2-3bed', name: '2–3 Bedroom', sub: 'Up to 1,800 sq ft', price: p[2] },
  { id: '4bed', name: '4+ Bedroom', sub: '1,800+ sq ft', price: p[3] },
].map((t, i) => ({ ...t, popular: i === popular }));

const QUOTE_TIERS: Tier[] = [
  { id: 'photos', name: 'Send Photos', sub: 'Quote back same day', price: null, popular: true },
  { id: 'visit', name: 'Free Site Visit', sub: 'We come and assess', price: null },
];
const QUOTE_NOTE = 'Every site is different. Final pricing is confirmed after reviewing your photos or a free site visit.';

const DAY_TIMES = [
  { id: 'Morning', sub: '8:00 – 10:30 am' },
  { id: 'Midday', sub: '11:00 am – 1:30 pm' },
  { id: 'Afternoon', sub: '2:00 – 4:30 pm' },
];

const HOUSE_ADDONS: Addon[] = [
  { id: 'fridge', name: 'Inside Fridge', sub: 'Shelves + drawers', price: 40, unit: 'each' },
  { id: 'oven', name: 'Inside Oven', sub: 'Racks + door glass', price: 45, unit: 'each' },
  { id: 'kitchen', name: 'Kitchen Deep Clean', sub: 'Cabinets + degrease', price: 95, unit: 'each' },
  { id: 'bath', name: 'Extra Bathroom Detail', sub: 'Tile, grout, glass', price: 75, unit: 'per bathroom', qty: true },
  { id: 'windows', name: 'Interior Windows', sub: 'Glass, sills, tracks', price: 40, unit: 'per 5 windows', qty: true },
  { id: 'deodorize', name: 'Deodorize & Sanitize', sub: 'Whole home', price: 79, unit: 'each' },
];
// move-out already includes fridge, oven and cabinets — don't sell them twice
const MOVE_ADDONS = HOUSE_ADDONS.filter((a) => ['bath', 'windows', 'deodorize'].includes(a.id));

export const DIVISIONS: Division[] = [
  // ───────────────────────── HOUSE CLEANING ─────────────────────────
  {
    id: 'house-cleaning',
    name: 'House Cleaning',
    short: 'House',
    tagline: 'Houses, condos and townhomes, top to bottom.',
    intro: 'LIVO house cleaning crews serve Coquitlam, Port Coquitlam and Port Moody, with prices shown before you book.',
    seoTitle: 'House Cleaning in Coquitlam & Port Coquitlam',
    keyword: 'house cleaning Coquitlam',
    segment: 'residential',
    icon: 'home',
    image: interiorKitchen,
    subs: [
      {
        slug: 'regular-cleaning',
        name: 'Regular Cleaning',
        short: 'Everyday upkeep for a fresh, tidy home.',
        desc: 'Our regular clean keeps your home consistently fresh. Kitchens, bathrooms, floors and dusting, done properly every visit by a uniformed LIVO crew.',
        image: interiorKitchen,
        before: interiorBefore,
        after: interiorAfter,
        unit: 'per visit',
        tierLabel: 'Home size',
        tiers: HOME_SIZES([120, 150, 230, 310]),
        included: [
          'Kitchen counters, sink and stovetop wiped and sanitized',
          'Outside of appliances and cabinets wiped',
          'Bathrooms: toilet, tub/shower, sink, mirrors',
          'Floors vacuumed and mopped',
          'Dusting of reachable surfaces',
          'Beds made, garbage out',
        ],
        goodFor: ['Busy families', 'Condo owners', 'Weekly or bi-weekly upkeep'],
      },
      {
        slug: 'deep-cleaning',
        name: 'Deep Cleaning',
        short: 'A detailed clean of buildup and missed spots.',
        desc: 'Everything in a regular clean, plus the places that get skipped: baseboards, vents, window tracks, behind and under furniture. The right first visit for any home.',
        image: interiorVacuum,
        before: interiorBefore,
        after: interiorAfter,
        unit: 'per visit',
        tierLabel: 'Home size',
        tiers: HOME_SIZES([175, 220, 360, 495]),
        included: [
          'Everything in Regular Cleaning',
          'Baseboards, door frames and light switches',
          'Vents, window sills and tracks',
          'Behind and under movable furniture',
          'Cabinet fronts and handles degreased',
          'Bathroom tile and grout scrubbed',
        ],
        goodFor: ['First-time clients', 'Seasonal reset', 'Before hosting guests'],
      },
      {
        slug: 'recurring-cleaning',
        name: 'Weekly & Bi-Weekly Cleaning',
        short: 'Same crew on a schedule. Save up to 15%.',
        desc: 'Same crew, same day, same standard. Put your home on a weekly, bi-weekly or monthly schedule and save on every visit.',
        image: interiorKitchen,
        unit: 'per visit',
        tierLabel: 'Home size',
        recurring: true,
        tiers: HOME_SIZES([120, 150, 230, 310]),
        included: [
          'Everything in Regular Cleaning',
          'Same crew whenever possible',
          'Skip or reschedule with 48 hours notice',
          'No contracts — cancel anytime',
        ],
        goodFor: ['Busy professionals', 'Families', 'Pet owners'],
      },
    ],
    addons: HOUSE_ADDONS,
    freqs: [
      { id: 'onetime', name: 'One-Time', sub: 'Just this once', discount: 0 },
      { id: 'weekly', name: 'Weekly', sub: 'Every week', discount: 0.15 },
      { id: 'biweekly', name: 'Bi-Weekly', sub: 'Every 2 weeks', discount: 0.1 },
      { id: 'monthly', name: 'Monthly', sub: 'Once a month', discount: 0.05 },
    ],
    times: DAY_TIMES,
    faqs: [
      { q: 'Do I need to supply anything?', a: 'No. We bring all supplies and equipment. Eco-friendly products are available on request.' },
      { q: 'Do I need to be home?', a: 'No. Many clients leave a key or door code. We send a text when we arrive and when we finish.' },
      { q: 'When do I pay?', a: 'After the job is done and you are happy with it.' },
    ],
    notIncluded: ['Outside windows', 'Carpet shampooing', 'Moving heavy furniture', 'Mould or biohazard clean-up'],
    crossSell: { div: 'house-cleaning', sub: 'recurring-cleaning', title: 'Make it regular', line: 'Weekly or bi-weekly visits save up to 15%.' },
  },

  // ───────────────────────── MOVE-IN / MOVE-OUT ─────────────────────────
  {
    id: 'move-cleaning',
    name: 'Move-In / Move-Out Cleaning',
    short: 'Moving',
    tagline: 'Empty-home cleans ready for handover.',
    intro: 'Move out cleaning and move in cleaning across Coquitlam, Port Coquitlam and Port Moody, built around a landlord-style checklist.',
    seoTitle: 'Move Out Cleaning in Coquitlam & Port Coquitlam',
    keyword: 'move out cleaning Coquitlam',
    segment: 'residential',
    icon: 'box',
    image: interiorKitchen,
    subs: [
      {
        slug: 'move-in-move-out-cleaning',
        name: 'Move-In / Move-Out Cleaning',
        short: 'Ready for handover and inspection.',
        desc: 'An empty-home clean built for handover. Inside every cabinet, closet and appliance, so the property is ready for inspection or for the next people to move in.',
        image: interiorKitchen,
        before: interiorBefore,
        after: interiorAfter,
        unit: 'flat rate',
        tierLabel: 'Home size',
        tiers: [
          { id: '1bed', name: 'Studio / 1 Bed', sub: '1 bath', price: 320 },
          { id: '2bed', name: '2 Bedroom', sub: '1–2 bath', price: 420, popular: true },
          { id: '3bed', name: '3+ Bedroom', sub: 'Full house', price: 550 },
        ],
        included: [
          'Inside all cabinets, drawers and closets',
          'Inside fridge and oven',
          'Walls spot-cleaned, switches and outlets wiped',
          'Baseboards, doors and frames',
          'Bathrooms fully scrubbed and sanitized',
          'Floors vacuumed and washed, window tracks cleaned',
        ],
        goodFor: ['Tenants moving out', 'Landlords between tenants', 'Buyers before moving in'],
      },
    ],
    addons: MOVE_ADDONS,
    freqs: [
      { id: 'onetime', name: 'One-Time', sub: 'Single visit', discount: 0 },
    ],
    times: DAY_TIMES,
    faqs: [
      { q: 'Does the home need to be empty?', a: 'Yes, ideally. An empty home lets us clean inside every cabinet, closet and appliance properly.' },
      { q: 'Do you follow a checklist?', a: 'Yes. We follow a landlord-style checklist so the common inspection points are covered. We can not promise the outcome of an inspection or a deposit.' },
      { q: 'When do I pay?', a: 'After the job is done and you are happy with it.' },
    ],
    notIncluded: ['Wall washing or paint touch-ups', 'Carpet shampooing', 'Items left behind (add Junk Removal)'],
    crossSell: { div: 'junk-removal', sub: 'junk-removal-by-load', title: 'Leaving stuff behind?', line: 'Our junk crew hauls it away the same week.' },
  },

  // ───────────────────────── POST-CONSTRUCTION ─────────────────────────
  {
    id: 'construction-cleaning',
    name: 'Post-Construction Cleaning',
    short: 'Post-Construction',
    tagline: 'Construction dust and residue, gone.',
    intro: 'Post construction cleaning for renovated homes, new builds and commercial fit-outs in Coquitlam, Port Coquitlam and Port Moody.',
    seoTitle: 'Post Construction Cleaning in Coquitlam & Port Coquitlam',
    keyword: 'post construction cleaning Coquitlam',
    segment: 'residential',
    icon: 'hammer',
    image: interiorVacuum,
    subs: [
      {
        slug: 'post-construction-cleaning',
        name: 'Post-Construction Cleaning',
        short: 'Fine dust, stickers and paint spots removed.',
        desc: 'Renovations leave fine dust on every surface. We remove construction dust, stickers and paint spots, then detail the space so it is ready to live or work in.',
        image: interiorVacuum,
        unit: 'starting at',
        tierLabel: 'Space size',
        quote: true,
        tiers: [
          { id: '1bed', name: 'Studio / 1 Bed', sub: 'Up to 700 sq ft', price: 349 },
          { id: '2bed', name: '2 Bedroom', sub: 'Up to 1,200 sq ft', price: 499, popular: true },
          { id: '3bed', name: '3 Bedroom', sub: 'Up to 1,800 sq ft', price: 649 },
          { id: '4bed', name: 'Larger or commercial', sub: '1,800+ sq ft', price: null },
        ],
        quoteNote: QUOTE_NOTE,
        included: [
          'Fine drywall dust removed from all surfaces',
          'Walls, ceilings and vents dusted',
          'Stickers, tape and paint spots removed from glass and fixtures',
          'Inside cabinets, drawers and appliances',
          'Windows, sills and tracks',
          'Floors vacuumed (HEPA) and washed',
        ],
        goodFor: ['Renovated homes', 'New builds', 'Contractors handing over'],
      },
    ],
    addons: [],
    freqs: [
      { id: 'onetime', name: 'One-Time', sub: 'Single visit', discount: 0 },
    ],
    times: DAY_TIMES,
    faqs: [
      { q: 'How do you price it?', a: 'Starting prices are by size. Send photos and we confirm the final price, or book a free site visit if photos are not enough.' },
      { q: 'Do you remove construction debris too?', a: 'Small debris, yes. For larger loads, add Renovation Debris removal from our junk crew.' },
      { q: 'When do I pay?', a: 'After the job is done and you are happy with it.' },
    ],
    notIncluded: ['Large debris loads (see Renovation Debris)', 'Paint or drywall repairs', 'Outside windows above the ground floor'],
    crossSell: { div: 'junk-removal', sub: 'renovation-debris', title: 'Debris to haul?', line: 'Clean-up and haul-away in one visit.' },
  },

  // ───────────────────────── AIRBNB ─────────────────────────
  {
    id: 'airbnb-cleaning',
    name: 'Airbnb Cleaning',
    short: 'Airbnb',
    tagline: 'Guest-ready between every stay.',
    intro: 'Airbnb cleaning and short-term rental turnovers in Coquitlam, Port Coquitlam and Port Moody, timed to your check-in and checkout.',
    seoTitle: 'Airbnb Cleaning in Coquitlam & Port Moody',
    keyword: 'Airbnb cleaning Coquitlam',
    segment: 'residential',
    icon: 'key',
    image: airbnbAfter,
    subs: [
      {
        slug: 'turnover-cleaning',
        name: 'Turnover Cleaning',
        short: 'Reset between guests, on time, every time.',
        desc: 'Checkout to check-in, handled. Beds made, bathrooms sanitized, kitchen reset, garbage out and photos sent so you know it is guest-ready.',
        image: airbnbAfter,
        before: airbnbBefore,
        after: airbnbAfter,
        unit: 'per turnover',
        tierLabel: 'Unit size',
        tiers: HOME_SIZES([79, 99, 149, 199]),
        included: [
          'Beds stripped and made with fresh linens',
          'Bathrooms cleaned and sanitized',
          'Kitchen and dishes reset',
          'Floors vacuumed and mopped',
          'Garbage and recycling out',
          'Completion photos sent to you',
        ],
        goodFor: ['Airbnb and Vrbo hosts', 'Property managers', 'Back-to-back bookings'],
      },
      {
        slug: 'deep-reset',
        name: 'Deep Reset',
        short: 'Monthly detail clean for busy listings.',
        desc: 'Everything in a turnover plus a full detail: baseboards, inside appliances, under furniture. Keeps a busy listing in top shape.',
        image: airbnbAfter,
        before: airbnbBefore,
        after: airbnbAfter,
        unit: 'per visit',
        tierLabel: 'Unit size',
        tiers: HOME_SIZES([129, 159, 219, 299]),
        included: [
          'Everything in Turnover Cleaning',
          'Baseboards, vents and window tracks',
          'Inside fridge, oven and microwave',
          'Under and behind furniture',
          'Mattress and upholstery vacuumed',
        ],
        goodFor: ['High-turnover listings', 'Between long stays', 'Seasonal refresh'],
      },
    ],
    addons: [
      { id: 'linen', name: 'Linen & Towel Change', sub: 'Fresh set, staged', price: 25, unit: 'per turnover' },
      { id: 'restock', name: 'Guest Essentials Restock', sub: 'Toiletries, paper, coffee', price: 15, unit: 'per turnover' },
      { id: 'rush', name: 'Same-Day Turnaround', sub: 'Priority slot', price: 30, unit: 'each' },
      { id: 'sanitize', name: 'Deep Sanitize', sub: 'Disinfect + deodorize', price: 35, unit: 'each' },
    ],
    freqs: [
      { id: 'onetime', name: 'Single Turnover', sub: 'Just this checkout', discount: 0 },
      { id: 'every', name: 'Every Checkout', sub: 'After each guest', discount: 0.15 },
      { id: 'peak', name: 'Peak Season', sub: 'Busy months', discount: 0.1 },
      { id: 'occasional', name: 'Now & Then', sub: 'A few a month', discount: 0.05 },
    ],
    times: [
      { id: 'Early Turnover', sub: '10:00 am – 1:00 pm' },
      { id: 'Standard Turnover', sub: '11:00 am – 3:00 pm' },
      { id: 'Late Turnover', sub: '1:00 – 4:00 pm' },
    ],
    faqs: [
      { q: 'Can you work with my check-in times?', a: 'Yes. We schedule inside your checkout and check-in window, and offer a same-day priority slot for back-to-back bookings.' },
      { q: 'Do you report damage or missing items?', a: 'Yes. You get completion photos and we flag anything broken or missing right away.' },
      { q: 'Do you supply linens?', a: 'We change and stage your linens. Ask us about a linen supply program.' },
    ],
    notIncluded: ['Off-site laundry (unless you add Linen & Towel Change)', 'Repairs', 'Restocking (unless you add it)'],
    crossSell: { div: 'airbnb-cleaning', sub: 'deep-reset', title: 'Busy listing?', line: 'Add a monthly Deep Reset between turnovers.' },
  },

  // ───────────────────────── JUNK ─────────────────────────
  {
    id: 'junk-removal',
    name: 'Junk Removal',
    short: 'Junk',
    tagline: 'We lift, load and haul it away.',
    intro: 'Junk removal in Port Coquitlam, Coquitlam and Port Moody: we do all the lifting and loading, and recycle or donate what we can.',
    seoTitle: 'Junk Removal in Port Coquitlam & Coquitlam',
    keyword: 'junk removal Port Coquitlam',
    segment: 'residential',
    icon: 'truck',
    image: junkTruck,
    subs: [
      {
        slug: 'junk-removal-by-load',
        name: 'Junk Removal by Load',
        short: 'Pay by how much truck space you use.',
        desc: 'Point, and it is gone. We do all the lifting and loading, sweep up after, and donate or recycle what we can.',
        image: junkTruck,
        before: junkBefore,
        after: junkAfter,
        unit: 'flat rate',
        tierLabel: 'Load size',
        tiers: [
          { id: 'small', name: 'Small Load', sub: 'Up to ¼ truck', price: 99 },
          { id: 'half', name: 'Half Truck', sub: '½ truck load', price: 199, popular: true },
          { id: 'full', name: 'Full Truck', sub: 'Full truck load', price: 349 },
        ],
        included: ['All lifting and loading', 'Area swept after', 'Donation and recycling where possible', 'Disposal fees included'],
        goodFor: ['Garage and basement clean-outs', 'Old furniture', 'Moving day'],
      },
      {
        slug: 'renovation-debris',
        name: 'Renovation Debris',
        short: 'Drywall, flooring, cabinets and more.',
        desc: 'Construction debris removal after a renovation: drywall, flooring, cabinets, fixtures and packaging, for homes and businesses. Send photos for a same-day quote.',
        image: junkTruck,
        before: junkBefore,
        after: junkAfter,
        unit: 'custom quote',
        tierLabel: 'How to quote',
        quote: true,
        tiers: QUOTE_TIERS,
        quoteNote: QUOTE_NOTE,
        included: ['Loading and hauling', 'Sorting for recycling', 'Site swept after', 'Disposal fees included'],
        goodFor: ['Homeowners after a reno', 'Contractors', 'Businesses clearing out'],
      },
    ],
    addons: [
      { id: 'heavy', name: 'Heavy / Bulky Item', sub: 'Appliance, piano, hot tub', price: 40, unit: 'per item', qty: true },
      { id: 'rush', name: 'Same-Day Pickup', sub: 'Booked and gone today', price: 49, unit: 'each' },
      { id: 'donate', name: 'Donation Sort', sub: 'Usable items donated', price: 25, unit: 'each' },
    ],
    freqs: [
      { id: 'onetime', name: 'One-Time', sub: 'Single pickup', discount: 0 },
      { id: 'monthly', name: 'Monthly', sub: 'Regular haul-away', discount: 0.05 },
      { id: 'biweekly', name: 'Bi-Weekly', sub: 'Ongoing site', discount: 0.1 },
    ],
    times: DAY_TIMES,
    faqs: [
      { q: 'Do I need to carry things outside?', a: 'No. We remove items from anywhere on the property.' },
      { q: 'What if I have more than I thought?', a: 'We confirm the load size on site before we start. No surprises.' },
      { q: 'Do you take business junk?', a: 'Yes. For offices, stores and job sites, send photos for a quote.' },
    ],
    notIncluded: ['Paint, chemicals and propane tanks', 'Asbestos-containing materials', 'Anything hazardous'],
    crossSell: { div: 'construction-cleaning', sub: 'post-construction-cleaning', title: 'After a renovation?', line: 'Add a post-construction clean in the same visit.' },
  },

  // ───────────────────────── COMMERCIAL ─────────────────────────
  {
    id: 'commercial-cleaning',
    name: 'Commercial Cleaning',
    short: 'Commercial',
    tagline: 'Offices, stores and shared spaces.',
    intro: 'Office cleaning and commercial cleaning in Coquitlam, Port Coquitlam and Port Moody, scheduled before opening or after hours.',
    seoTitle: 'Office & Commercial Cleaning in Coquitlam',
    keyword: 'office cleaning Coquitlam',
    segment: 'commercial',
    icon: 'building',
    image: teamVan,
    subs: [
      {
        slug: 'office-cleaning',
        name: 'Office Cleaning',
        short: 'Workstations, meeting rooms and kitchens.',
        desc: 'Desks, meeting rooms, kitchens, washrooms and floors cleaned on a schedule that suits your business, including evenings and weekends.',
        image: teamVan,
        unit: 'custom quote',
        tierLabel: 'How to quote',
        quote: true,
        tiers: QUOTE_TIERS,
        quoteNote: QUOTE_NOTE,
        included: [
          'Desks and surfaces wiped and sanitized',
          'Staff kitchen and break room',
          'Washrooms cleaned and restocked',
          'Floors vacuumed and mopped',
          'Garbage and recycling out',
          'High-touch points disinfected',
        ],
        goodFor: ['Small and mid-size offices', 'Clinics and studios', 'Professional services'],
      },
      {
        slug: 'retail-cleaning',
        name: 'Retail & Storefront',
        short: 'Sales floors, glass and fitting rooms.',
        desc: 'A clean store sells better. We clean sales floors, entrance glass, fitting rooms and staff areas before you open or after you close.',
        image: teamVan,
        unit: 'custom quote',
        tierLabel: 'How to quote',
        quote: true,
        tiers: QUOTE_TIERS,
        quoteNote: QUOTE_NOTE,
        included: [
          'Sales floor vacuumed and mopped',
          'Entrance and display glass',
          'Fitting rooms and counters',
          'Washrooms and staff room',
          'Garbage out',
        ],
        goodFor: ['Retail stores', 'Showrooms', 'Salons'],
      },
      {
        slug: 'strata-cleaning',
        name: 'Strata & Common Areas',
        short: 'Lobbies, hallways and amenity rooms.',
        desc: 'Strata cleaning for the shared spaces in strata and rental buildings: lobbies, hallways, elevators, stairwells and amenity rooms.',
        image: teamVan,
        unit: 'custom quote',
        tierLabel: 'How to quote',
        quote: true,
        tiers: QUOTE_TIERS,
        quoteNote: QUOTE_NOTE,
        included: [
          'Lobby and entrance glass',
          'Hallways and stairwells',
          'Elevator interiors',
          'Amenity and garbage rooms',
          'Floors vacuumed and mopped',
        ],
        goodFor: ['Strata councils', 'Property managers', 'Rental buildings'],
      },
      {
        slug: 'commercial-cleanup',
        name: 'Commercial Clean-Up',
        short: 'One-time deep clean or end of lease.',
        desc: 'A one-time top-to-bottom clean for moving in, moving out, opening day or after a fit-out, so the space is ready to hand over or open.',
        image: teamVan,
        unit: 'custom quote',
        tierLabel: 'How to quote',
        quote: true,
        tiers: QUOTE_TIERS,
        quoteNote: QUOTE_NOTE,
        included: [
          'Full top-to-bottom clean',
          'Inside cabinets and appliances',
          'Walls spot-cleaned',
          'Windows, sills and tracks (interior)',
          'Floors detailed',
        ],
        goodFor: ['End of lease', 'After a fit-out', 'Grand openings'],
      },
    ],
    addons: [],
    freqs: [
      { id: 'onetime', name: 'One-Time', sub: 'Single visit', discount: 0 },
      { id: 'weekly', name: 'Weekly', sub: 'Quoted per visit', discount: 0 },
      { id: 'biweekly', name: 'Bi-Weekly', sub: 'Quoted per visit', discount: 0 },
      { id: 'monthly', name: 'Monthly', sub: 'Quoted per visit', discount: 0 },
    ],
    times: [
      { id: 'Before Opening', sub: '6:00 – 9:00 am' },
      { id: 'Daytime', sub: '9:00 am – 5:00 pm' },
      { id: 'After Hours', sub: '6:00 – 10:00 pm' },
    ],
    faqs: [
      { q: 'Can you clean after hours?', a: 'Yes. Most commercial cleaning happens before opening or after closing so your business is not disturbed.' },
      { q: 'How do you price commercial work?', a: 'By the space and how often you need us. Send photos and we quote, usually the same day. If photos are not enough, we book a free site visit.' },
      { q: 'Is the date I pick confirmed?', a: 'It is your preferred date. We confirm the date and the scope with you when we send the quote.' },
    ],
    notIncluded: ['Carpet extraction', 'Outside window washing', 'Construction debris (see Renovation Debris)'],
    crossSell: { div: 'junk-removal', sub: 'renovation-debris', title: 'Clearing out a space?', line: 'Our junk crew removes old furniture and debris.' },
  },

  // ───────────────────────── RESTAURANT & KITCHEN ─────────────────────────
  {
    id: 'restaurant-kitchen-cleaning',
    name: 'Restaurant & Kitchen Cleaning',
    short: 'Restaurant',
    tagline: 'Industrial steam-cleaned commercial kitchens.',
    intro: 'Commercial kitchen cleaning and restaurant cleaning in Coquitlam and across Greater Vancouver, done before opening, after close or on your closed day.',
    seoTitle: 'Commercial Kitchen & Restaurant Cleaning in Coquitlam',
    keyword: 'commercial kitchen cleaning Coquitlam',
    segment: 'commercial',
    icon: 'chef',
    image: interiorKitchen,
    subs: [
      {
        slug: 'kitchen-deep-clean',
        name: 'Kitchen Deep Clean',
        short: 'Industrial steam clean. Grease and buildup gone.',
        desc: 'We deep clean commercial kitchens with industrial steam cleaners that cut through grease and baked-on buildup on equipment exteriors, walls and floors.',
        image: interiorKitchen,
        unit: 'custom quote',
        tierLabel: 'How to quote',
        quote: true,
        tiers: QUOTE_TIERS,
        quoteNote: QUOTE_NOTE,
        included: [
          'Industrial steam cleaning',
          'Cooking line, fryers and grills (exterior)',
          'Walk-ins and coolers',
          'Stainless steel, walls and backsplashes degreased',
          'Floors and floor drains scrubbed',
          'Sinks and prep areas sanitized',
        ],
        goodFor: ['Restaurants', 'Cafes and bakeries', 'Catering kitchens'],
      },
      {
        slug: 'scheduled-kitchen-cleaning',
        name: 'Scheduled Kitchen Cleaning',
        short: 'Weekly or monthly, after close.',
        desc: 'Keep the kitchen inspection-ready all year. Same crew, on a weekly, bi-weekly or monthly schedule, after you close.',
        image: interiorKitchen,
        unit: 'custom quote',
        tierLabel: 'How to quote',
        quote: true,
        tiers: QUOTE_TIERS,
        quoteNote: QUOTE_NOTE,
        included: [
          'Steam clean of cooking line and floors',
          'Degreasing of walls and equipment exteriors',
          'Walk-ins wiped down',
          'Floor drains cleaned',
          'Same crew each visit',
        ],
        goodFor: ['Busy restaurants', 'Food courts', 'Commissary kitchens'],
      },
      {
        slug: 'front-of-house',
        name: 'Front-of-House & Dining',
        short: 'Dining room, bar and washrooms.',
        desc: 'A clean dining room, bar and washrooms for your guests, done after close so you open to a fresh space.',
        image: interiorKitchen,
        unit: 'custom quote',
        tierLabel: 'How to quote',
        quote: true,
        tiers: QUOTE_TIERS,
        quoteNote: QUOTE_NOTE,
        included: [
          'Tables, chairs and booths',
          'Bar top and back bar',
          'Washrooms cleaned and restocked',
          'Floors vacuumed and mopped',
          'Entrance glass',
        ],
        goodFor: ['Restaurants', 'Pubs and bars', 'Cafes'],
      },
    ],
    addons: [],
    freqs: [
      { id: 'onetime', name: 'One-Time', sub: 'Single visit', discount: 0 },
      { id: 'weekly', name: 'Weekly', sub: 'Quoted per visit', discount: 0 },
      { id: 'biweekly', name: 'Bi-Weekly', sub: 'Quoted per visit', discount: 0 },
      { id: 'monthly', name: 'Monthly', sub: 'Quoted per visit', discount: 0 },
    ],
    times: [
      { id: 'Before Opening', sub: '5:00 – 9:00 am' },
      { id: 'After Closing', sub: '10:00 pm – 2:00 am' },
      { id: 'Closed Day', sub: 'Full day' },
    ],
    faqs: [
      { q: 'Do you clean hoods and exhaust ducts?', a: 'No. Hood and duct cleaning is a specialist fire-safety service. We clean the kitchen, equipment exteriors, walls and floors.' },
      { q: 'Will you work around our hours?', a: 'Yes. We clean before opening, after closing or on your closed day.' },
      { q: 'What equipment do you use?', a: 'Industrial steam cleaners and commercial degreasers. Our crew arrives with everything in a branded LIVO van.' },
    ],
    notIncluded: ['Hood and exhaust duct cleaning', 'Grease trap pumping', 'Equipment repairs'],
    crossSell: { div: 'restaurant-kitchen-cleaning', sub: 'scheduled-kitchen-cleaning', title: 'Stay inspection-ready', line: 'Put the kitchen on a weekly or monthly schedule.' },
  },
];

export const heroImage = teamVan;

export const getDivision = (id: string) => DIVISIONS.find((d) => d.id === id)!;
export const getSub = (div: string, sub: string) => getDivision(div).subs.find((s) => s.slug === sub)!;
export const isQuoteSub = (s: Sub) => !!s.quote || s.tiers.every((t) => t.price == null);
export const minPrice = (d: Division): number | null => {
  const p = d.subs.flatMap((s) => s.tiers.map((t) => t.price)).filter((x): x is number => x != null);
  return p.length ? Math.min(...p) : null;
};
export const subMin = (s: Sub) => {
  const p = s.tiers.map((t) => t.price).filter((x): x is number => x != null);
  return p.length ? Math.min(...p) : null;
};
// one-service divisions open straight to that service (one less tap)
export const divHref = (d: Division) => (d.subs.length === 1 ? `/services/${d.id}/${d.subs[0].slug}` : `/services/${d.id}`);

// Cards on the homepage / services page, per customer type.
// Commercial also shows Post-Construction and Junk (as a quote) — businesses renovate and clear out too.
export type Card = { div: Division; name: string; line: string; href: string; price: number | null; quote: boolean };
const card = (id: string, o: Partial<Card> = {}): Card => {
  const d = getDivision(id);
  const quote = d.subs.every(isQuoteSub);
  return { div: d, name: d.name, line: d.tagline, href: divHref(d), price: minPrice(d), quote, ...o };
};
export const CARDS: Record<Segment, Card[]> = {
  residential: ['house-cleaning', 'move-cleaning', 'construction-cleaning', 'airbnb-cleaning', 'junk-removal'].map((id) => card(id)),
  commercial: [
    card('commercial-cleaning'),
    card('restaurant-kitchen-cleaning'),
    card('construction-cleaning', { line: 'Fit-outs and renovations, dust-free.', price: null, quote: true }),
    card('junk-removal', { name: 'Junk & Debris Removal', line: 'Old furniture, fixtures and job-site debris.', href: '/services/junk-removal/renovation-debris', price: null, quote: true }),
  ],
};

export const AREAS = [
  'Port Coquitlam', 'Coquitlam', 'Port Moody', 'Burnaby', 'New Westminster', 'Maple Ridge',
  'Pitt Meadows', 'Surrey', 'Vancouver', 'North Vancouver', 'West Vancouver', 'Richmond',
  'Langley', 'Delta', 'Abbotsford',
];
