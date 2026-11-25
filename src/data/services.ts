// ─────────────────────────────────────────────────────────────
//  LIVO — SINGLE SOURCE OF TRUTH FOR SERVICES AND PRICES
//  Every price on the website AND in the booking page comes from
//  this file. To change a price: edit the number here, save, push.
//  price: null    → shown as "Quote"
//  quote: true    → customer sends a quote request (with photos),
//                   even if a "from" price is shown
//  draft: true    → price not yet approved by Ali (shows a small tag)
//
//  2026-11-17: prices = "LIVO Revised Pricing NOV 17" (every price clears
//  a 30% margin after overhead at $25/h + 20% burden). Home prices are
//  the full price to the customer. Commercial prices are before tax.
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
import junkRenoBefore from '../assets/photos/junk-reno-before.jpg';
import junkRenoAfter from '../assets/photos/junk-reno-after.jpg';
import junkBasementBefore from '../assets/photos/junk-basement-before.jpg';
import junkBasementAfter from '../assets/photos/junk-basement-after.jpg';
import junkFurnitureBefore from '../assets/photos/junk-furniture-before.jpg';
import junkFurnitureAfter from '../assets/photos/junk-furniture-after.jpg';
import junkApplianceBefore from '../assets/photos/junk-appliance-before.jpg';
import junkApplianceAfter from '../assets/photos/junk-appliance-after.jpg';
import junkStorageBefore from '../assets/photos/junk-storage-before.jpg';
import junkStorageAfter from '../assets/photos/junk-storage-after.jpg';
import junkYardBefore from '../assets/photos/junk-yard-before.jpg';
import junkYardAfter from '../assets/photos/junk-yard-after.jpg';
import junkHottubBefore from '../assets/photos/junk-hottub-before.jpg';
import junkHottubAfter from '../assets/photos/junk-hottub-after.jpg';
import junkOfficeBefore from '../assets/photos/junk-office-before.jpg';
import junkOfficeAfter from '../assets/photos/junk-office-after.jpg';
import teamVan from '../assets/photos/team-van.jpg';
import houseToilet from '../assets/photos/house-toilet-cleaning.jpg';
import toiletBefore from '../assets/photos/toilet-before.jpg';
import toiletAfter from '../assets/photos/toilet-after.jpg';
import ovenCleaning from '../assets/photos/oven-cleaning.jpg';
import ovenBefore from '../assets/photos/oven-before.jpg';
import ovenAfter from '../assets/photos/oven-after.jpg';
import cabinetCleaning from '../assets/photos/cabinet-cleaning.jpg';
import cabinetBefore from '../assets/photos/cabinet-before.jpg';
import cabinetAfter from '../assets/photos/cabinet-after.jpg';
import fridgeCleaning from '../assets/photos/fridge-cleaning.jpg';
import fridgeBefore from '../assets/photos/fridge-before.jpg';
import fridgeAfter from '../assets/photos/fridge-after.jpg';
import windowCleaning from '../assets/photos/window-cleaning.jpg';
import restaurantKitchen from '../assets/photos/restaurant-kitchen.jpg';
import stoveBefore from '../assets/photos/stove-before.jpg';
import stoveAfter from '../assets/photos/stove-after.jpg';
import postRenovation from '../assets/photos/post-renovation.jpg';
import officeCleaning from '../assets/photos/office-cleaning.jpg';
import blindsBefore from '../assets/photos/blinds-before.jpg';
import blindsAfter from '../assets/photos/blinds-after.jpg';
import groutBefore from '../assets/photos/grout-before.jpg';
import groutAfter from '../assets/photos/grout-after.jpg';
import carpetBefore from '../assets/photos/carpet-before.jpg';
import carpetAfter from '../assets/photos/carpet-after.jpg';
import stovetopBefore from '../assets/photos/stovetop-before.jpg';
import stovetopAfter from '../assets/photos/stovetop-after.jpg';
import strataBefore from '../assets/photos/strata-before.jpg';
import strataAfter from '../assets/photos/strata-after.jpg';
import moveBefore from '../assets/photos/move-before.jpg';
import moveAfter from '../assets/photos/move-after.jpg';
import moveCrew from '../assets/photos/move-crew.jpg';

// Photos shown on add-on cards (service pages). Add more here as they arrive.
export const ADDON_IMAGES: Record<string, ImageMetadata> = {
  fridge: fridgeAfter, oven: ovenAfter, cabinets: cabinetAfter, stove: stovetopAfter, blinds: blindsAfter, grout: groutAfter, carpet: carpetAfter,
};

export const JUNK_LOCATIONS = [
  { id: 'curb', name: 'Curbside / driveway', fee: 0 },
  { id: 'ground', name: 'Garage or ground floor', fee: 25 },
  { id: 'stairs', name: 'Upstairs or basement (stairs)', fee: 50 },
  { id: 'condo', name: 'Apartment / condo (elevator)', fee: 50 },
];
const JUNK_QUOTE_NOTE = 'Rough price from your photos. Final price confirmed on site before we start. Mattresses, fridges and heavy items may add a small disposal fee.';

export const PHONE = '888-802-LIVO';
export const PHONE_TEL = '+18888025486';
// 2026-11-17 (Ali): first-booking discount removed — at the new prices it would
// drop most home jobs under the 30% margin floor. 0 = off everywhere.
export const FIRST_TIME_DISCOUNT = 0;
export const NO_FEE_CITIES = ['Port Coquitlam', 'Coquitlam', 'Port Moody', 'Burnaby', 'New Westminster', 'Maple Ridge', 'Pitt Meadows'];
export const OTHER_CITIES = ['Vancouver', 'North Vancouver', 'West Vancouver', 'Richmond', 'Surrey', 'Delta', 'Langley', 'White Rock', 'Bowen Island', 'Lions Bay', 'Anmore', 'Belcarra'];
export const TRAVEL_FEE = 35;
export const BATHROOM_PRICING = { included: { studio: 1, '1bed': 1, '2bed': 2, '3bed': 2, '4bed': 3 }, full: 40, half: 20 };

// Short muted video loops. Put the file in /public/videos/ and set the path here.
// null = no video yet → the photo is shown.
export const HERO_VIDEO: string | null = null;        // e.g. '/videos/hero.mp4'

export type Segment = 'residential' | 'commercial';
export type Tier = { id: string; name: string; sub?: string; price: number | null; popular?: boolean };
export type Addon = { helper?: string; line?: string; before?: ImageMetadata; after?: ImageMetadata; id: string; name: string; sub: string; price: number; unit: string; qty?: boolean };
export type Freq = { id: string; name: string; sub: string; discount: number };
export type Faq = { q: string; a: string };
export type Sub = {
  slug: string;
  name: string;
  short: string;          // one line for cards
  desc: string;           // intro paragraph on the page
  image: ImageMetadata;
  pos?: string;           // Tailwind object-position class
  fromPrice?: number;     // Advertised starting combination, including the visit fee
  itemsRequired?: boolean;
  minOrder?: number;
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
  freqs?: Freq[];         // overrides the division's "how often" options for this service
  addons?: Addon[];       // overrides the division's add-ons for this service
  priceNote?: string;     // small line under the price table
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

// Home sizes. Choose your full and half bathrooms in booking. Prices: [studio, 1 bed, 2 bed, 3 bed, 4+ bed]
const HOME_SIZES = (p: [number, number, number, number, number | null], popular = 1): Tier[] => [
  { id: 'studio', name: 'Studio', sub: 'Bachelor · 1 bath', price: p[0] },
  { id: '1bed', name: '1 Bedroom', sub: '1 bed · 1 bath', price: p[1] },
  { id: '2bed', name: '2 Bedroom', sub: 'Up to 2 baths', price: p[2] },
  { id: '3bed', name: '3 Bedroom', sub: 'Up to 2 baths', price: p[3] },
  { id: '4bed', name: '4+ Bedroom', sub: 'Up to 2,500 sq ft · 3 baths', price: p[4] },
].map((t, i) => ({ ...t, popular: i === popular }));

const QUOTE_TIERS: Tier[] = [
  { id: 'photos', name: 'Send Photos', sub: 'Quote after photo review', price: null, popular: true },
  { id: 'visit', name: 'Free Site Visit', sub: 'We come and assess', price: null },
];
const SITE_VISIT: Tier = { id: 'visit', name: 'Free Site Visit', sub: 'We come and assess', price: null };
const QUOTE_NOTE = 'Every site is different. Final pricing is confirmed after reviewing your photos or a free site visit.';

const DAY_TIMES = [
  { id: 'Morning', sub: '8:00 – 10:30 am' },
  { id: 'Midday', sub: '11:00 am – 1:30 pm' },
  { id: 'Afternoon', sub: '2:00 – 4:30 pm' },
];

const ONE_TIME: Freq[] = [{ id: 'onetime', name: 'One-Time', sub: 'Single visit', discount: 0 }];
// Recurring: % off the one-time price from the 2nd visit. Monthly = regular price (a discount would break the margin floor).
const RECURRING: Freq[] = [
  { id: 'weekly', name: 'Weekly', sub: 'Every week', discount: 0.15 },
  { id: 'biweekly', name: 'Every 2 Weeks', sub: 'Most popular', discount: 0.1 },
  { id: 'monthly', name: 'Monthly', sub: 'Same crew, booked automatically', discount: 0 },
];

const STOVE_HELPER = 'Burnt-on grease, knobs off. Basic stovetop wipe is already included.';
const DETAIL_ITEMS: Addon[] = [
  { line: 'We remove baked-on grease from the walls, racks and door glass. Your oven looks and smells fresh again. Please let it cool before we arrive.', before: ovenBefore, after: ovenAfter, id: 'oven', name: 'Oven', sub: 'Racks, walls and door glass', price: 45, unit: 'each', qty: true },
  { line: STOVE_HELPER, helper: STOVE_HELPER, before: stovetopBefore, after: stovetopAfter, id: 'stove', name: 'Stove deep degrease', sub: STOVE_HELPER, price: 20, unit: 'each', qty: true },
  { line: 'We wash every shelf, drawer and door seal inside the fridge and freezer. Please empty it before we arrive.', before: fridgeBefore, after: fridgeAfter, id: 'fridge', name: 'Fridge & Freezer', sub: 'Empty the fridge and freezer before we arrive', price: 35, unit: 'each unit', qty: true },
  { line: 'We vacuum crumbs and wipe every shelf and door inside your kitchen cabinets. Please empty them first.', before: cabinetBefore, after: cabinetAfter, id: 'cabinets', name: 'Inside Cabinets', sub: 'Empty your kitchen cabinets before we arrive', price: 40, unit: 'whole kitchen' },
  { line: 'We dust and wipe each slat by hand, right on the window. No taking down, no mess.', before: blindsBefore, after: blindsAfter, id: 'blinds', name: 'Blinds', sub: 'Accessible blinds, cleaned in place', price: 8, unit: 'per blind', qty: true },
  { line: 'We scrub dark grout lines back to their clean colour with steam and a brush. Price is per area up to 40 sq ft, about one bathroom floor.', before: groutBefore, after: groutAfter, id: 'grout', name: 'Grout', sub: 'One area up to 40 sq ft', price: 45, unit: 'per area', qty: true },
  { line: 'We treat stains and traffic marks and lift them with a hot-water carpet machine. Price is per room up to 200 sq ft. Some old stains may not come out fully.', before: carpetBefore, after: carpetAfter, id: 'carpet', name: 'Carpet Stain Removal', sub: 'Stains and traffic marks, up to 200 sq ft per room', price: 60, unit: 'per room', qty: true },
];

const HOUSE_ADDONS: Addon[] = [
  ...DETAIL_ITEMS,
  { id: 'windows', name: 'Interior Windows', sub: 'Glass, sills, tracks', price: 40, unit: 'per 5 windows', qty: true },
];
// Move-out already includes fridge, freezer, oven and cabinets — don't sell them twice
const MOVE_ADDONS: Addon[] = HOUSE_ADDONS.filter((a) => a.id === 'windows').map((a) => ({
  ...a, name: 'Interior windows: glass & sills', sub: 'Glass and sills', price: 30, helper: 'Window tracks are already included.',
}));

export const DIVISIONS: Division[] = [
  // ───────────────────────── HOUSE CLEANING ─────────────────────────
  {
    id: 'house-cleaning',
    name: 'House Cleaning',
    short: 'House',
    tagline: 'Standard cleaning for houses, condos and townhomes. Book once or on a schedule.',
    intro: 'LIVO house cleaning crews serve Coquitlam, Port Coquitlam and Port Moody, with prices shown before you book.',
    seoTitle: 'House Cleaning in Coquitlam & Port Coquitlam',
    keyword: 'house cleaning Coquitlam',
    segment: 'residential',
    icon: 'home',
    image: houseToilet,
    subs: [
      {
        slug: 'regular-cleaning',
        name: 'Standard House Cleaning',
        short: 'Everyday upkeep: kitchen, bathrooms and floors.',
        desc: 'Our standard clean keeps your home fresh: kitchen, bathrooms, floors and dusting, done by a uniformed LIVO crew. Book it once, or weekly, every 2 weeks or monthly. Need more detail? Add the oven, fridge and freezer, or windows when you book.',
        image: houseToilet,
        before: toiletBefore,
        after: toiletAfter,
        unit: 'per visit',
        tierLabel: 'Home size',
        tiers: HOME_SIZES([165, 195, 235, 285, 349]),
        priceNote: 'Over 2,500 sq ft or more than 2 bathrooms? Add extra bathrooms, or call for a quote.',
        freqs: [{ id: 'onetime', name: 'One-Time', sub: 'Just this once', discount: 0 }, ...RECURRING],
        included: [
          'Kitchen counters, sink and stovetop wiped and sanitized',
          'Outside of appliances and cabinets wiped',
          'Bathrooms: toilet, tub/shower, sink, mirrors',
          'Floors vacuumed and mopped',
          'Dusting of reachable surfaces',
          'Beds made, garbage out',
        ],
        goodFor: ['Busy families', 'Condo owners', 'Regular upkeep'],
      },
    ],
    addons: HOUSE_ADDONS,
    freqs: ONE_TIME,
    times: DAY_TIMES,
    faqs: [
      { q: 'Do I need to supply anything?', a: 'No. We bring all supplies and equipment.' },
      { q: 'Do I need to be home?', a: 'No. Many clients leave a key or door code. We send a text when we arrive and when we finish.' },
      { q: 'Do you clean homes with pets?', a: 'Yes, and there is no pet fee. Tell us about your pets in the booking notes.' },
      { q: 'When do I pay?', a: 'After the job is done and you are happy with it.' },
    ],
    notIncluded: ['Outside windows', 'Carpet shampooing', 'Moving heavy furniture', 'Mould or biohazard clean-up'],
    crossSell: { div: 'move-cleaning', sub: 'move-in-move-out-cleaning', title: 'Moving soon?', line: 'Empty-home clean with fridge, oven and cabinets included.' },
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
    image: moveCrew,
    subs: [
      {
        slug: 'move-in-move-out-cleaning',
        name: 'Move-In / Move-Out Cleaning',
        short: 'Empty home, ready for handover. Appliances included.',
        desc: 'An empty-home clean built for handover. Inside every cabinet, closet and appliance is included, so the home is ready for inspection or for the next people to move in.',
        image: moveCrew,
        before: moveBefore,
        after: moveAfter,
        unit: 'flat rate',
        tierLabel: 'Home size',
        tiers: [
          { id: 'studio', name: 'Studio', sub: 'Bachelor · 1 bath', price: 265 },
          { id: '1bed', name: '1 Bedroom', sub: '1 bath', price: 315, popular: true },
          { id: '2bed', name: '2 Bedroom', sub: 'Up to 2 baths', price: 375 },
          { id: '3bed', name: '3 Bedroom', sub: 'Up to 2 baths', price: 479 },
          { id: '4bed', name: '4+ Bedroom', sub: 'Send photos for a quote', price: null },
        ],
        priceNote: 'Home must be empty. Choose your full and half bathrooms in booking.',
        included: [
          'Inside all cabinets, drawers and closets',
          'Inside fridge, freezer and oven',
          'Walls spot-cleaned, switches and outlets wiped',
          'Baseboards, doors and frames',
          'Bathrooms fully scrubbed and sanitized',
          'Floors vacuumed and washed, window tracks cleaned',
        ],
        goodFor: ['Tenants moving out', 'Landlords between tenants', 'Buyers before moving in'],
      },
    ],
    addons: MOVE_ADDONS,
    freqs: ONE_TIME,
    times: DAY_TIMES,
    faqs: [
      { q: 'Does the home need to be empty?', a: 'Yes. An empty home lets us clean inside every cabinet, closet and appliance properly.' },
      { q: 'Are the fridge and oven included?', a: 'Yes. Inside the fridge, freezer, oven and every cabinet is included in the price.' },
      { q: 'Do you follow a checklist?', a: 'Yes. We follow a landlord-style checklist so the common inspection points are covered. We can not promise the outcome of an inspection or a deposit.' },
      { q: 'When do I pay?', a: 'After the job is done and you are happy with it.' },
    ],
    notIncluded: ['Wall washing or paint touch-ups', 'Carpet shampooing', 'Items left behind (add Junk Removal)'],
    crossSell: { div: 'junk-removal', sub: 'junk-removal-by-load', title: 'Leaving stuff behind?', line: 'Our junk crew hauls it away the same week.' },
  },

  // ───────────────────────── AIRBNB ─────────────────────────
  {
    id: 'airbnb-cleaning',
    name: 'Airbnb Turnover Cleaning',
    short: 'Airbnb',
    tagline: 'Between-guest cleaning, timed to your next check-in.',
    intro: 'Airbnb cleaning and short-term rental turnovers in Coquitlam, Port Coquitlam and Port Moody, timed to your check-in and checkout.',
    seoTitle: 'Airbnb Cleaning in Coquitlam & Port Moody',
    keyword: 'Airbnb cleaning Coquitlam',
    segment: 'residential',
    icon: 'key',
    image: airbnbAfter,
    subs: [
      {
        slug: 'turnover-cleaning',
        name: 'Airbnb Turnover Cleaning',
        short: 'Reset between guests, on time.',
        desc: 'Checkout to check-in, handled. Beds remade with your clean linens, fresh towels set out, your supplies restocked and completion photos sent so you know it is guest-ready.',
        image: airbnbAfter,
        before: airbnbBefore,
        after: airbnbAfter,
        unit: 'per turnover',
        tierLabel: 'Unit size',
        tiers: HOME_SIZES([129, 149, 189, 235, 315]),
        priceNote: 'Sheets, towels and restocking are included. On-site laundry and same-day turnaround are optional add-ons.',
        included: [
          'Beds stripped and remade with your clean linens',
          'Fresh towels set out',
          'Bathrooms cleaned and sanitized',
          'Kitchen and dishes reset',
          'Floors vacuumed and mopped',
          'Garbage and recycling out',
          'Your supplies restocked (you buy, we put out)',
          'Damage and left-item check',
          'Completion photos sent to you',
        ],
        goodFor: ['Airbnb and Vrbo hosts', 'Property managers', 'Back-to-back bookings'],
      },
    ],
    addons: [
      { id: 'laundry', name: 'Laundry (on-site machines)', sub: 'Your washer + dryer', price: 25, unit: 'per load', qty: true },
      { id: 'rush', name: 'Same-Day Turnaround', sub: 'Subject to availability', helper: 'Subject to availability; confirmed with your booking.', price: 35, unit: 'each' },
    ],
    freqs: [
      { id: 'onetime', name: 'One turnover', sub: 'Just this checkout', discount: 0 },
      { id: 'every', name: 'Ongoing', sub: 'Every checkout, same crew, scheduled around your bookings', discount: 0 },
    ],
    times: [
      { id: 'Early Turnover', sub: '10:00 am – 1:00 pm' },
      { id: 'Standard Turnover', sub: '11:00 am – 3:00 pm' },
      { id: 'Late Turnover', sub: '1:00 – 4:00 pm' },
    ],
    faqs: [
      { q: 'Can you work with my check-in times?', a: 'Tell us your checkout and next check-in times. We confirm the timing and availability with you.' },
      { q: 'Do you report damage or missing items?', a: 'Yes. You get completion photos and we flag anything broken or missing right away.' },
      { q: 'Do you do the laundry?', a: 'Yes, as an add-on, using the washer and dryer in your unit. Swapping beds with your prepared clean linens, setting out fresh towels and putting out your supplies are included. Washing and drying laundry in your on-site machines is optional.' },
    ],
    notIncluded: ['Off-site laundry', 'Buying supplies', 'Repairs'],
    crossSell: { div: 'detail-cleaning', sub: 'appliance-detail-cleaning', title: 'Need appliance detail?', line: 'Pick the appliances and detail work your listing needs.' },
  },

  // Appliance and detail work is priced per item, plus one visit fee.
  {
    id: 'detail-cleaning',
    name: 'Appliance & Detail Cleaning',
    short: 'Appliance & Detail',
    tagline: 'Deep cleaning, item by item.',
    intro: 'Appliance and detail cleaning for homes, rentals and Airbnbs in Coquitlam, Port Coquitlam and Port Moody.',
    seoTitle: 'Appliance & Detail Cleaning in Coquitlam',
    keyword: 'appliance cleaning Coquitlam',
    segment: 'residential',
    icon: 'sparkle',
    image: ovenCleaning,
    subs: [{
      slug: 'appliance-detail-cleaning',
      name: 'Appliance & Detail Cleaning',
      short: 'Oven, stove, fridge, cabinets, blinds, grout and carpet stains — item by item.',
      desc: 'Choose the items you need cleaned.\nOne visit fee. Pay after the job.',
      image: ovenCleaning,
      unit: 'visit fee + items',
      tierLabel: 'One visit fee',
      tiers: [{ id: 'visit', name: 'Visit fee', sub: 'Setup, once per order', price: 60 }],
      fromPrice: 100,
      minOrder: 100,
      itemsRequired: true,
      included: ['Cleaning of the items you select', 'Cleaning supplies and equipment', 'One visit and setup fee per order'],
      goodFor: ['Homes and rentals', 'Airbnb hosts', 'Single-item deep cleaning'],
    }],
    addons: DETAIL_ITEMS,
    freqs: ONE_TIME,
    times: DAY_TIMES,
    faqs: [
      { q: 'Can I book just one item?', a: 'Yes. Choose items in booking to see the visit fee and minimum. Added to a cleaning, you pay only the item prices with no visit fee.' },
      { q: 'What should I empty first?', a: 'Empty any fridge, freezer or cabinets you book. Clear counters and leave access to the items.' },
      { q: 'Do you repair appliances or grout?', a: 'No. This is cleaning only. We do not move heavy appliances, repair faults, remove mould, seal grout or re-grout.' },
    ],
    notIncluded: ['Moving heavy appliances', 'Repairs', 'Mould remediation', 'Grout sealing or re-grouting', 'Full carpet or upholstery cleaning'],
  },

  // ───────────────────────── POST-CONSTRUCTION ─────────────────────────
  {
    id: 'construction-cleaning',
    name: 'Post-Construction Cleaning',
    short: 'Post-Construction',
    tagline: 'Homes and commercial sites, after the trades.',
    intro: 'Post construction cleaning for renovated homes, new builds and commercial fit-outs in Coquitlam, Port Coquitlam and Port Moody.',
    seoTitle: 'Post Construction Cleaning in Coquitlam & Port Coquitlam',
    keyword: 'post construction cleaning Coquitlam',
    segment: 'residential',
    icon: 'hammer',
    image: postRenovation,
    subs: [
      {
        slug: 'post-construction-cleaning',
        name: 'Home Renovations & New Builds',
        short: 'Final clean after the trades finish.',
        desc: 'Renovations leave fine dust on every surface. We remove construction dust, stickers and paint spots from floors, trim and fixtures so the home is ready to live in. Send photos for a straightforward quote.',
        image: postRenovation,
        unit: 'starting at',
        tierLabel: 'Space size',
        quote: true,
        tiers: [
          { id: 's700', name: 'Up to 700 sq ft', sub: 'Studio or 1 bedroom', price: 415 },
          { id: 's1200', name: '701 – 1,200 sq ft', sub: 'Most condos and townhomes', price: 559, popular: true },
          { id: 's1800', name: '1,201 – 1,800 sq ft', sub: 'Larger homes', price: 759 },
          { id: 'large', name: 'Over 1,800 sq ft', sub: 'Quoted after photos or a visit', price: null },
          SITE_VISIT,
        ],
        quoteNote: QUOTE_NOTE,
        included: [
          'Fine drywall dust removed from all surfaces',
          'Walls, ceilings and vents dusted',
          'Stickers, tape and paint spots removed from glass and fixtures',
          'Inside cabinets, drawers and appliances',
          'Windows, sills and tracks (interior)',
          'Floors vacuumed (HEPA) and washed',
        ],
        goodFor: ['Renovated homes', 'New builds', 'Contractors handing over'],
      },
      {
        slug: 'commercial-construction-cleaning',
        name: 'Commercial Construction & Fit-Outs',
        short: 'Rough clean, final clean or handover touch-up.',
        desc: 'Construction cleaning for offices, stores and new commercial units. We walk the site and quote each phase separately: rough clean, final clean and touch-up before handover.',
        image: postRenovation,
        unit: 'custom quote',
        tierLabel: 'How to quote',
        quote: true,
        tiers: QUOTE_TIERS,
        quoteNote: 'Final cleans are typically from $0.35 per sq ft, plus tax. We walk the site and quote each phase separately.',
        included: [
          'Rough clean during the build',
          'Final clean before handover',
          'Touch-up visit after deficiencies',
          'Dust, stickers and residue removed',
          'Floors, glass and fixtures detailed',
        ],
        goodFor: ['General contractors', 'Tenant improvements', 'New commercial units'],
      },
    ],
    addons: [],
    freqs: ONE_TIME,
    times: DAY_TIMES,
    faqs: [
      { q: 'How do you price it?', a: 'Homes have starting prices by size. Send photos and we confirm the final price, or book a free site visit if photos are not enough. Commercial sites are quoted per phase.' },
      { q: 'Do you remove construction debris too?', a: 'Not in the cleaning price. Add Renovation Waste removal from our junk crew.' },
      { q: 'Do you clean hazardous dust?', a: 'No. Our cleaning scope does not include hazardous dust or materials.' },
      { q: 'When do I pay?', a: 'After the job is done and you are happy with it.' },
    ],
    notIncluded: ['Hazardous dust or materials', 'Bulk debris hauling (see Renovation Waste)', 'Paint or drywall repairs', 'Outside windows above the ground floor'],
    crossSell: { div: 'junk-removal', sub: 'renovation-debris', title: 'Debris to haul?', line: 'Clean-up and haul-away from one company.' },
  },

  // ───────────────────────── JUNK ─────────────────────────
  {
    id: 'junk-removal',
    name: 'Junk Removal',
    short: 'Junk',
    tagline: 'One item to full clear-outs. We lift, load and haul.',
    intro: 'Junk removal in Port Coquitlam, Coquitlam and Port Moody: we do all the lifting and loading, and recycle or donate what we can.',
    seoTitle: 'Junk Removal in Port Coquitlam & Coquitlam',
    keyword: 'junk removal Port Coquitlam',
    segment: 'residential',
    icon: 'truck',
    image: junkTruck,
    subs: [
      {
        slug: 'single-item-pickup',
        name: 'One Item Pickup',
        short: 'A sofa, mattress, dresser or TV.',
        desc: 'Just one thing to go? Send a photo and tell us if it is at the curb or inside. We pick it up and dispose of it properly.',
        image: junkFurnitureBefore,
        before: junkFurnitureBefore,
        after: junkFurnitureAfter,
        unit: 'per item',
        tierLabel: 'Item',
        quote: true,
        quoteNote: JUNK_QUOTE_NOTE,
        tiers: [{ id: 'item', name: 'One item', sub: 'Sofa, mattress, dresser, appliance…', price: 119 }],
        priceNote: 'Mattresses, box springs and fridges have a small disposal add-on.',
        included: ['Pickup and loading', 'Carry-out from anywhere on the property', 'Proper disposal or recycling'],
        goodFor: ['Old mattress', 'Sofa or recliner', 'TV or appliance'],
      },
      {
        slug: 'junk-removal-by-load',
        name: 'Home & Garage Clearouts',
        short: 'Furniture, boxes and clutter, priced by load.',
        desc: 'Point, and it is gone. You pay by how much of the truck you use. We do all the lifting and loading, sweep up after, and donate or recycle what we can.',
        image: junkBasementBefore,
        before: junkBasementBefore,
        after: junkBasementAfter,
        unit: 'per load',
        tierLabel: 'Load size',
        quote: true,
        quoteNote: JUNK_QUOTE_NOTE,
        tiers: [
          { id: 'small', name: 'Small Load', sub: 'About 1.25 cu yd · 2–3 items', price: 139 },
          { id: 'quarter', name: 'Quarter Truck', sub: 'About 2.5 cu yd · a few big items', price: 185 },
          { id: 'half', name: 'Half Truck', sub: 'About 5 cu yd · a small room', price: 299, popular: true },
          { id: 'three-quarter', name: 'Three-Quarter Truck', sub: 'About 7.5 cu yd · a garage', price: 439 },
          { id: 'full', name: 'Full Truck', sub: 'About 10 cu yd · a full clear-out', price: 579 },
        ],
        priceNote: 'We confirm the load size on site before we start. Dense loads like drywall, concrete or soil are quoted.',
        included: ['All lifting and loading', 'Area swept after', 'Donation and recycling where possible', 'Disposal fees included'],
        goodFor: ['Garage and basement clear-outs', 'Old furniture', 'Moving day'],
      },
      {
        slug: 'renovation-debris',
        name: 'Renovation Waste',
        short: 'Loose wood, cabinets, flooring and carpet.',
        desc: 'Renovation waste removal: loose wood, old cabinets, flooring, carpet and fixtures. Send photos and a short list of materials for a quote. We do not do demolition.',
        image: junkRenoBefore,
        before: junkRenoBefore,
        after: junkRenoAfter,
        unit: 'custom quote',
        tierLabel: 'How to quote',
        quote: true,
        tiers: [{ id: 'photos', name: 'Send photos', price: null }],
        quoteNote: JUNK_QUOTE_NOTE,
        included: ['Loading and hauling', 'Sorting for recycling', 'Site swept after', 'Disposal fees included in the quote'],
        goodFor: ['Homeowners after a reno', 'Contractors', 'Kitchen and flooring jobs'],
      },
      {
        slug: 'hot-tub-removal',
        name: 'Hot Tub Removal',
        short: 'Hot tubs and jacuzzis, cut up and hauled away.',
        desc: 'We cut up your old hot tub and haul it away. Power must be disconnected by an electrician before we arrive. Send photos and tell us about access for a quote.',
        image: junkHottubBefore,
        before: junkHottubBefore,
        after: junkHottubAfter,
        unit: 'custom quote',
        tierLabel: 'How to quote',
        quote: true,
        tiers: [{ id: 'photos', name: 'Send photos', price: null }],
        quoteNote: JUNK_QUOTE_NOTE,
        included: ['Cutting and loading', 'Hauling and disposal', 'Area swept after'],
        goodFor: ['Old hot tubs', 'Backyard makeovers', 'Moving out'],
      },
      {
        slug: 'office-clearouts',
        name: 'Office & Building Clearouts',
        short: 'Desks, chairs, shelves and filing cabinets.',
        desc: 'Moving office or closing a space? We remove desks, chairs, shelving and filing cabinets, and recycle or donate what we can. Ask for a walkthrough for offices and shared areas.',
        image: junkOfficeBefore,
        before: junkOfficeBefore,
        after: junkOfficeAfter,
        unit: 'custom quote',
        tierLabel: 'How to quote',
        quote: true,
        tiers: [{ id: 'photos', name: 'Send photos', price: null }],
        quoteNote: JUNK_QUOTE_NOTE,
        included: ['Loading and hauling', 'Pickup time confirmed with your quote', 'Donation and recycling where possible', 'Area swept after'],
        goodFor: ['Office moves', 'End of lease', 'Property managers'],
      },
    ],
    addons: [
      { id: 'heavy', name: 'Heavy / Bulky Item', sub: 'Over 150 lb', price: 45, unit: 'per item', qty: true },
      { id: 'mattress', name: 'Mattress or Box Spring', sub: 'Recycling fee', price: 25, unit: 'per piece', qty: true },
      { id: 'fridge', name: 'Fridge or Freezer', sub: 'Refrigerant disposal', price: 49, unit: 'each', qty: true },
      { id: 'rush', name: 'Same-Day Pickup', sub: 'Subject to availability', price: 89, unit: 'each' },
      { id: 'donate', name: 'Donation Drop-Off', sub: 'Usable items donated', price: 35, unit: 'each' },
    ],
    freqs: ONE_TIME,
    times: DAY_TIMES,
    faqs: [
      { q: 'Do I need to carry things outside?', a: 'No. For loads and the "inside" item price, we remove items from anywhere on the property.' },
      { q: 'What if I have more than I thought?', a: 'We confirm the load size on site before we start. No surprises.' },
      { q: 'What do you take?', a: 'Furniture, mattresses, appliances, electronics, yard waste, hot tubs and renovation waste. Ask first about pianos, drywall, concrete and soil.' },
      { q: 'Do you take business junk?', a: 'Yes. For offices, stores and job sites, send photos for a quote.' },
    ],
    notIncluded: ['Asbestos, paint and chemicals', 'Propane tanks or unknown hazardous waste', 'Demolition', 'Disconnecting hot tub power (needs an electrician)'],
    crossSell: { div: 'construction-cleaning', sub: 'post-construction-cleaning', title: 'After a renovation?', line: 'Add a post-construction clean from the same company.' },
  },

  // ───────────────────────── OFFICE & STRATA (COMMERCIAL) ─────────────────────────
  {
    id: 'commercial-cleaning',
    name: 'Office & Strata Cleaning',
    short: 'Commercial',
    tagline: 'Offices and strata common areas.',
    intro: 'Office cleaning, strata cleaning and commercial cleaning in Coquitlam, Port Coquitlam and Port Moody, scheduled by agreement with your team.',
    seoTitle: 'Office & Strata Cleaning in Coquitlam',
    keyword: 'office cleaning Coquitlam',
    segment: 'commercial',
    icon: 'building',
    image: officeCleaning,
    subs: [
      {
        slug: 'office-cleaning',
        name: 'Office Cleaning',
        short: 'Desks, floors, washrooms and break rooms.',
        desc: 'Desks, meeting rooms, kitchens, washrooms and floors cleaned on a schedule that suits your business. We agree tasks, hours and the visit schedule with you.',
        image: officeCleaning,
        unit: 'per visit',
        tierLabel: 'Office size',
        quote: true,
        tiers: [
          { id: 'small', name: 'Up to 1,500 sq ft', sub: 'Per visit, plus tax', price: 165, popular: true },
          { id: 'larger', name: 'Larger office', sub: 'From $0.11 per sq ft per visit', price: null },
          SITE_VISIT,
        ],
        quoteNote: 'Visit time and final price confirmed after photos or a free site visit.',
        included: [
          'Desks and surfaces wiped and sanitized',
          'Staff kitchen and break room',
          'Washrooms cleaned and restocked',
          'Floors vacuumed and mopped',
          'Garbage and recycling out',
          'High-touch points disinfected',
        ],
        goodFor: ['Small and mid-size offices', 'Clinics and studios', 'Stores and showrooms'],
      },
      {
        slug: 'strata-cleaning',
        name: 'Strata Common-Area Cleaning',
        short: 'Lobbies, halls, stairs, elevators and amenities.',
        desc: 'Strata cleaning for the shared spaces in strata and rental buildings: lobbies, hallways, elevators, stairwells and amenity rooms. Shared areas only; we agree the visit schedule with your council or manager.',
        image: strataAfter,
        before: strataBefore,
        after: strataAfter,
        unit: 'per visit',
        tierLabel: 'Building size',
        quote: true,
        tiers: [
          { id: 'small', name: 'Small building', sub: 'Per visit, plus tax', price: 200, popular: true },
          { id: 'larger', name: 'Larger building', sub: 'Quoted by visits per week', price: null },
          SITE_VISIT,
        ],
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
    ],
    addons: [],
    freqs: [
      { id: 'onetime', name: 'One-Time', sub: 'Single visit', discount: 0 },
      { id: 'weekly', name: 'Weekly', sub: 'Quoted per visit', discount: 0 },
      { id: 'biweekly', name: 'Every 2 Weeks', sub: 'Quoted per visit', discount: 0 },
      { id: 'monthly', name: 'Monthly', sub: 'Quoted per visit', discount: 0 },
    ],
    times: [{ id: 'Agree a visit time', sub: 'We confirm a suitable time with your quote' }],
    faqs: [
      { q: 'Can you work around our team?', a: 'We agree visit times with you when we confirm your quote.' },
      { q: 'How do you price commercial work?', a: 'Send photos for a free quote and we confirm the price, usually the same day. If photos are not enough, we book a free site visit.' },
      { q: 'Is the date I pick confirmed?', a: 'It is your preferred date. We confirm the date and the scope with you when we send the quote.' },
    ],
    notIncluded: ['Carpet extraction', 'Outside window washing', 'Construction debris (see Renovation Waste)'],
    crossSell: { div: 'junk-removal', sub: 'office-clearouts', title: 'Clearing out a space?', line: 'Our junk crew removes old desks, chairs and shelving.' },
  },

  // ───────────────────────── RESTAURANT & KITCHEN ─────────────────────────
  {
    id: 'restaurant-kitchen-cleaning',
    name: 'Restaurant & Kitchen Cleaning',
    short: 'Restaurant',
    tagline: 'Industrial steam-cleaned commercial kitchens.',
    intro: 'Commercial kitchen cleaning and restaurant cleaning in Coquitlam and across Greater Vancouver, scheduled around your service hours.',
    seoTitle: 'Commercial Kitchen & Restaurant Cleaning in Coquitlam',
    keyword: 'commercial kitchen cleaning Coquitlam',
    segment: 'commercial',
    icon: 'chef',
    image: restaurantKitchen,
    subs: [
      {
        slug: 'kitchen-cleaning',
        name: 'Restaurant & Kitchen Cleaning',
        short: 'Kitchen, dining areas and washrooms.',
        desc: 'Commercial kitchens deep cleaned with industrial steam cleaners that cut grease and baked-on buildup, plus dining areas and washrooms. We agree the kitchen scope on site; a walkthrough is required. Hoods, ducts and grease traps are not included.',
        image: restaurantKitchen,
        pos: 'object-[85%_40%]',
        before: stoveBefore,
        after: stoveAfter,
        unit: 'per visit',
        tierLabel: 'Type of clean',
        quote: true,
        tiers: QUOTE_TIERS,
        quoteNote: 'Free quote after a walkthrough. Hoods, exhaust ducts and grease traps are not included.',
        included: [
          'Industrial steam cleaning',
          'Cooking line, fryers and grills (exterior)',
          'Walk-ins and coolers',
          'Stainless steel, walls and backsplashes degreased',
          'Floors and floor drains scrubbed',
          'Dining areas, bar and washrooms',
        ],
        goodFor: ['Restaurants', 'Cafes and bakeries', 'Pubs and catering kitchens'],
      },
    ],
    addons: [],
    freqs: [
      { id: 'onetime', name: 'One-Time', sub: 'Single visit', discount: 0 },
      { id: 'weekly', name: 'Weekly', sub: 'Quoted per visit', discount: 0 },
      { id: 'biweekly', name: 'Every 2 Weeks', sub: 'Quoted per visit', discount: 0 },
      { id: 'monthly', name: 'Monthly', sub: 'Quoted per visit', discount: 0 },
    ],
    times: [{ id: 'Agree a visit time', sub: 'We confirm a suitable time with your quote' }],
    faqs: [
      { q: 'Do you clean hoods and exhaust ducts?', a: 'No. Hood, duct and grease trap cleaning is a specialist fire-safety service. We clean the kitchen, equipment exteriors, walls and floors.' },
      { q: 'How much does it cost?', a: 'Request a free quote. We confirm the scope and price after a walkthrough.' },
      { q: 'Will you work around our hours?', a: 'We agree the visit time with you around your service hours.' },
      { q: 'What equipment do you use?', a: 'Industrial steam cleaners and commercial degreasers. Our crew arrives with everything in a branded LIVO van.' },
    ],
    notIncluded: ['Hood and exhaust duct cleaning', 'Grease trap pumping', 'Equipment repairs'],
    crossSell: { div: 'junk-removal', sub: 'office-clearouts', title: 'Replacing equipment?', line: 'Our junk crew hauls old furniture and fixtures away.' },
  },
];

export const heroImage = teamVan;

export const getDivision = (id: string) => DIVISIONS.find((d) => d.id === id)!;
export const getSub = (div: string, sub: string) => getDivision(div).subs.find((s) => s.slug === sub)!;
export const isQuoteSub = (s: Sub) => !!s.quote || s.tiers.every((t) => t.price == null);
export const subFreqs = (d: Division, s: Sub) => s.freqs ?? d.freqs;
export const subAddons = (d: Division, s: Sub) => s.addons ?? d.addons;
export const minPrice = (d: Division): number | null => {
  const p = d.subs.flatMap((s) => s.fromPrice != null ? [s.fromPrice] : s.tiers.map((t) => t.price)).filter((x): x is number => x != null);
  return p.length ? Math.min(...p) : null;
};
export const subMin = (s: Sub) => {
  if (s.fromPrice != null) return s.fromPrice;
  const p = s.tiers.map((t) => t.price).filter((x): x is number => x != null);
  return p.length ? Math.min(...p) : null;
};
// one-service divisions open straight to that service (one less tap)
// Junk has its own overview; other multi-service divisions point at their cards on /services.
export const divHref = (d: Division) => (d.id === 'junk-removal' ? '/services/junk-removal' : d.subs.length === 1 ? `/services/${d.id}/${d.subs[0].slug}` : `/services#${d.id}`);

// The 4 main categories under Services (Ali's 17 Nov 2026 sitemap). Used by /services, the menu and the footer.
export type Category = { id: string; label: string; line: string; divs: Division[] };
export const CATEGORIES: Category[] = [
  { id: 'residential', label: 'Residential Cleaning', line: 'Homes, condos and rentals. Prices show right away.', divs: ['house-cleaning', 'move-cleaning', 'airbnb-cleaning', 'detail-cleaning'].map(getDivision) },
  { id: 'commercial', label: 'Commercial Cleaning', line: 'Offices, strata and restaurants. Starting prices plus tax; free quote, usually the same day.', divs: ['commercial-cleaning', 'restaurant-kitchen-cleaning'].map(getDivision) },
  { id: 'construction', label: 'Post-Construction', line: 'Homes and commercial sites, after the trades.', divs: [getDivision('construction-cleaning')] },
  { id: 'junk', label: 'Junk Removal', line: 'One item to full clear-outs.', divs: [getDivision('junk-removal')] },
];
export const categoryOf = (d: Division) => CATEGORIES.find((c) => c.divs.includes(d))!;

// Display categories on the Junk overview share the existing booking services.
export const JUNK_CATEGORIES = [
  { id: 'furniture', name: 'Furniture & Mattresses', text: 'Sofas, beds, dressers and mattresses. We carry it out.', sub: 'single-item-pickup', image: junkFurnitureBefore, before: junkFurnitureBefore, after: junkFurnitureAfter },
  { id: 'appliances', name: 'Appliances & Electronics', text: 'Fridges, washers, stoves, TVs and computers. Recycled properly.', sub: 'single-item-pickup', image: junkApplianceBefore, before: junkApplianceBefore, after: junkApplianceAfter },
  { id: 'home', name: 'Home & Basement Clear-Outs', text: 'Mixed junk from any room. Pay by how much of the truck you fill.', sub: 'junk-removal-by-load', image: junkBasementBefore, before: junkBasementBefore, after: junkBasementAfter },
  { id: 'garage', name: 'Garage & Storage Unit Clear-Outs', text: 'Garages, sheds and storage lockers, emptied in one visit.', sub: 'junk-removal-by-load', image: junkStorageBefore, before: junkStorageBefore, after: junkStorageAfter },
  { id: 'yard', name: 'Yard & Garden Waste', text: 'Branches, bagged leaves and old patio furniture. Soil, rock and sod are quoted.', sub: 'junk-removal-by-load', image: junkYardBefore, before: junkYardBefore, after: junkYardAfter },
  { id: 'renovation', name: 'Kitchen & Renovation Waste', text: 'Old cabinets, counters, flooring and wood after a reno.', sub: 'renovation-debris', image: junkTruck, before: junkRenoBefore, after: junkRenoAfter },
  { id: 'hot-tub', name: 'Hot Tub Removal', text: 'We cut it up and haul it away. Power must be disconnected by an electrician first.', sub: 'hot-tub-removal', image: junkHottubBefore, before: junkHottubBefore, after: junkHottubAfter },
  { id: 'office', name: 'Office & Building Clear-Outs', text: 'Desks, chairs, shelving and filing cabinets.', sub: 'office-clearouts', image: junkOfficeBefore, before: junkOfficeBefore, after: junkOfficeAfter },
];

// Homepage "What do you need?" — the 8 cards from the sitemap. Cards are shortcuts, not new categories.
export type Card = { divisionId: string; name: string; line: string; href: string; price: number | null; tax: boolean; image: ImageMetadata; icon: string; pos?: string };
const card = (id: string, o: Partial<Card> = {}): Card => {
  const d = getDivision(id);
  return { divisionId: d.id, name: d.name, line: d.tagline, href: `/services/${d.id}/${d.subs[0].slug}`, price: minPrice(d), tax: d.segment === 'commercial', image: d.image, icon: d.icon, ...o };
};
const std = getSub('house-cleaning', 'regular-cleaning');
export const HOME_CARDS: Card[] = [
  card('house-cleaning', { name: 'Standard House Cleaning', line: 'Standard & recurring', price: subMin(std) }),
  card('airbnb-cleaning', { name: 'Airbnb Turnover Cleaning', line: 'Reset between guests', href: '/services/airbnb-cleaning/turnover-cleaning', price: subMin(getSub('airbnb-cleaning', 'turnover-cleaning')) }),
  card('restaurant-kitchen-cleaning', { name: 'Restaurant & Kitchen', line: 'Steam-cleaned kitchens', pos: 'object-[85%_40%]' }),
  card('commercial-cleaning', { name: 'Office & Strata', line: 'Offices and common areas' }),
  card('construction-cleaning', { name: 'Post-Construction', line: 'Homes & commercial sites', price: subMin(getSub('construction-cleaning', 'post-construction-cleaning')) }),
  card('detail-cleaning'),
  card('move-cleaning', { name: 'Move-In / Move-Out', line: 'One page for both' }),
  card('junk-removal', { href: '/services/junk-removal', line: 'One item to full clear-outs' }),
];

export const AREAS = [
  'Port Coquitlam', 'Coquitlam', 'Port Moody', 'Burnaby', 'New Westminster', 'Maple Ridge',
  'Pitt Meadows', 'Surrey', 'Vancouver', 'North Vancouver', 'West Vancouver', 'Richmond',
  'Langley', 'Delta', 'Abbotsford',
];

// "Get ready for your crew" — shown after booking and sent in the confirmation text + email.
// Keep each line short; the text message uses the first 3.
export const PREP: Record<string, string[]> = {
  'house-cleaning': [
    'Clear counters, floors and beds so we can reach every surface.',
    'Put away cash, jewellery and anything fragile.',
    'Tell us how to get in: door code, key or buzzer.',
    'Shy or nervous pets: keep them in one room.',
    'Booked fridge & freezer? Empty them before we arrive.',
  ],
  'move-cleaning': [
    'The home must be empty: furniture, boxes and garbage out.',
    'Power and water on, lights working.',
    'Leave keys or a fob, or tell us who lets us in.',
    'Save a parking spot for our van.',
  ],
  'airbnb-cleaning': [
    'Send us the checkout time and door code before the visit.',
    'Leave clean sheets and towels where we can find them.',
    'Tell us about any damage you already know about.',
    'Leave toilet paper, soap, coffee and other restock supplies out.',
  ],
  'detail-cleaning': [
    'Empty any fridge, freezer and cabinets you book.',
    'Clear counters and leave space around each item.',
    'Open blinds and clear access to windows.',
    'Tell us how to get in and where to park.',
  ],
  'construction-cleaning': [
    'Trades finished and big debris removed (we do not haul bulk waste).',
    'Power and water on, lights working.',
    'Tell us about wet paint or fresh finishes to avoid.',
    'Site access and parking for our van.',
  ],
  'junk-removal': [
    'Put items in one spot if you can: garage, driveway or curb.',
    'Clear a path from the items to the door.',
    'Tell us about stairs, elevators or long carries.',
    'No paint, chemicals or asbestos. We cannot take them.',
  ],
  'commercial-cleaning': [
    'Share keys, fob or alarm code and your opening hours.',
    'Clear desks of papers you do not want touched.',
    'Tell us about locked or private rooms to skip.',
    'Show us the supply closet and garbage area.',
  ],
  'restaurant-kitchen-cleaning': [
    'Kitchen closed and equipment cooled down before we start.',
    'Clear food from prep tables and the line.',
    'Share keys or alarm code and where we can dump water.',
    'Tell us about equipment we must not move.',
  ],
};

// Audience copy is shared by service pages; prices remain in booking.
export type AudienceCopy = { label: string; sub?: string; benefits?: { text: string; href?: string }[]; faqs?: Faq[] };
export const AUDIENCE_COPY: Record<string, AudienceCopy> = {
  'house-cleaning': { label: 'For homeowners & families' },
  'airbnb-cleaning': {
    label: 'For hosts, co-hosts & STR managers',
    sub: 'Guest-ready between checkout and check-in, with photos after every turnover.',
    benefits: [{ text: 'Same crew for each property' }, { text: 'Completion photos plus a damage and left-item report' }, { text: 'Save every property in My LIVO and rebook in one tap' }],
    faqs: [
      { q: 'Can you handle several properties?', a: 'Yes. Save each property in My LIVO and book its turnovers. Ongoing properties keep the same crew.' },
      { q: 'How do you get in?', a: 'Lockbox, smart lock or key pickup. Add entry instructions when you book. We never share your codes.' },
      { q: 'What if a guest left damage?', a: 'We photograph it and send it with your completion photos, before the next guest arrives.' },
    ],
  },
  'strata-cleaning': {
    label: 'For strata managers & councils',
    sub: 'Lobbies, hallways, elevators and amenity rooms on a set schedule, with a photo report after every visit.',
    benefits: [{ text: 'Same checklist every visit' }, { text: 'Photo report you can forward to council' }, { text: 'One contact for your building' }],
    faqs: [
      { q: 'Can you work around residents?', a: 'Yes. We set visit times that suit your building.' },
      { q: 'How do you get building access?', a: 'Tell us the fob or key arrangement when you request a quote.' },
      { q: 'Can you quote several buildings?', a: 'Yes. Send the list and we quote each one.' },
    ],
  },
  'move-cleaning': {
    label: 'For property managers, landlords & tenants',
    sub: 'Empty units cleaned inspection-ready, with photos for your condition record.',
    benefits: [{ text: 'Inside oven, fridge and cabinets included' }, { text: 'Photos sent after the clean' }, { text: 'Add junk removal for anything left behind', href: '/services/junk-removal' }],
  },
  'junk-removal': {
    label: 'For homeowners, realtors & property managers',
    sub: 'Clear a home before listing photos or a new tenant. We load, haul and donate what we can.',
    benefits: [{ text: 'Loading and hauling handled' }, { text: 'Donation and recycling where possible' }, { text: 'Send photos for a load quote' }],
    faqs: [{ q: 'Tenant left things behind?', a: 'Send photos and we quote the load.' }, { q: 'Need it gone before listing photos?', a: 'Pick a date before your photo day when you book.' }],
  },
  'detail-cleaning': {
    label: 'For homeowners & realtors', sub: 'Oven, fridge, grout and carpet stains done item by item — ready for a showing.',
    benefits: [{ text: 'Choose the items you need cleaned' }, { text: 'Cleaning supplies and equipment included' }, { text: 'One visit and setup fee per order' }],
  },
  'construction-cleaning': {
    label: 'For builders, renovators & homeowners', sub: 'Construction dust gone, ready for handover or move-in.',
    benefits: [{ text: 'Dust and residue removed' }, { text: 'Final clean for handover' }, { text: 'Scope confirmed in your quote' }],
  },
  'office-cleaning': {
    label: 'For office managers', sub: 'A clean office on a schedule that suits your team.',
    benefits: [{ text: 'Desks and shared surfaces cleaned' }, { text: 'Staff kitchens and washrooms reset' }, { text: 'Floors vacuumed and mopped' }],
  },
  'restaurant-kitchen-cleaning': {
    label: 'For restaurant owners & kitchen managers', sub: 'Kitchen deep cleaning by quote, scheduled around your service hours.',
    benefits: [{ text: 'Industrial steam cleaning' }, { text: 'Cooking equipment exteriors degreased' }, { text: 'Scope confirmed after a walkthrough' }],
  },
};
