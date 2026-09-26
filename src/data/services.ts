// ─────────────────────────────────────────────────────────────
//  LIVO — SINGLE SOURCE OF TRUTH FOR SERVICES AND PRICES
//  Every price on the website AND in the booking page comes from
//  this file. To change a price: edit the number here, save, push.
//  price: null  → shown as "Custom quote"
//  draft: true  → price not yet approved by Ali (shows a small tag)
// ─────────────────────────────────────────────────────────────
import type { ImageMetadata } from 'astro';

import interiorKitchen from '../assets/photos/interior-kitchen.jpg';
import interiorVacuum from '../assets/photos/interior-vacuum.png';
import interiorBefore from '../assets/photos/interior-before.jpg';
import interiorAfter from '../assets/photos/interior-after.jpg';
import airbnbBefore from '../assets/photos/airbnb-before.jpg';
import airbnbAfter from '../assets/photos/airbnb-after.jpg';
import powerDriveway from '../assets/photos/power-driveway.jpg';
import powerBefore from '../assets/photos/power-before.jpg';
import powerAfter from '../assets/photos/power-after.jpg';
import junkTruck from '../assets/photos/junk-truck.jpg';
import junkBefore from '../assets/photos/junk-before.png';
import junkAfter from '../assets/photos/junk-after.png';
import teamVan from '../assets/photos/team-van.jpg';

export const PHONE = '888-802-LIVO';
export const PHONE_TEL = '+18888025486';
export const FIRST_TIME_DISCOUNT = 0.3; // 30% off first booking

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
  unit: string;           // "per visit", "flat rate" …
  tierLabel: string;      // "Home size", "Area", "Load size" …
  tiers: Tier[];
  included: string[];
  goodFor: string[];
  draft?: boolean;
  quoteNote?: string;
  recurring?: boolean;    // page shows weekly / bi-weekly / monthly price table
};
export type Division = {
  id: string;
  name: string;
  short: string;
  tagline: string;
  icon: string;           // key in components/Icon.astro
  image: ImageMetadata;
  subs: Sub[];
  addons: Addon[];
  freqs: Freq[];
  times: { id: string; sub: string }[];
  faqs: Faq[];
};

const HOME_SIZES = (p: [number, number, number, number], popular = 2): Tier[] => [
  { id: 'studio', name: 'Studio', sub: 'Bachelor · 1 bath', price: p[0] },
  { id: '1bed', name: '1 Bedroom', sub: '1 bed · 1 bath', price: p[1] },
  { id: '2-3bed', name: '2–3 Bedroom', sub: 'Up to 1,800 sq ft', price: p[2] },
  { id: '4bed', name: '4+ Bedroom', sub: '1,800+ sq ft', price: p[3] },
].map((t, i) => ({ ...t, popular: i === popular }));

const DAY_TIMES = [
  { id: 'Morning', sub: '8:00 – 10:30 am' },
  { id: 'Midday', sub: '11:00 am – 1:30 pm' },
  { id: 'Afternoon', sub: '2:00 – 4:30 pm' },
];

export const DIVISIONS: Division[] = [
  // ───────────────────────── INTERIOR ─────────────────────────
  {
    id: 'interior',
    name: 'Interior Cleaning',
    short: 'Interior',
    tagline: 'Homes and condos, top to bottom.',
    icon: 'home',
    image: interiorKitchen,
    subs: [
      {
        slug: 'standard-cleaning',
        name: 'Standard Cleaning',
        short: 'Regular upkeep for a fresh, tidy home.',
        desc: 'Our routine clean keeps your home consistently fresh. Kitchens, bathrooms, floors and dusting — done properly, every visit, by a uniformed LIVO crew.',
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
        short: 'A full top-to-bottom reset.',
        desc: 'Everything in a standard clean, plus the places that get skipped: baseboards, vents, window tracks, behind and under furniture. The right first visit for any home.',
        image: interiorVacuum,
        before: interiorBefore,
        after: interiorAfter,
        unit: 'per visit',
        tierLabel: 'Home size',
        tiers: HOME_SIZES([175, 220, 360, 495]),
        included: [
          'Everything in Standard Cleaning',
          'Baseboards, door frames and light switches',
          'Vents, window sills and tracks',
          'Behind and under movable furniture',
          'Cabinet fronts and handles degreased',
          'Bathroom tile and grout scrubbed',
        ],
        goodFor: ['First-time clients', 'Seasonal reset', 'Before hosting guests'],
      },
      {
        slug: 'move-in-move-out',
        name: 'Move-In / Move-Out',
        short: 'Landlord-ready. Get your deposit back.',
        desc: 'An empty-home clean built for inspections. Inside every cabinet, closet and appliance so the next person walks into a spotless space — and you get your deposit back.',
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
      {
        slug: 'post-construction-cleaning',
        name: 'After-Construction Clean-Up',
        short: 'Dust, debris and paint spots — gone.',
        desc: 'Renovations leave fine dust on every surface. We remove construction dust, debris, stickers and paint spots, then detail the space so it is ready to live in.',
        image: interiorVacuum,
        unit: 'starting at',
        tierLabel: 'Home size',
        draft: true,
        tiers: [
          { id: '1bed', name: 'Studio / 1 Bed', sub: 'Up to 700 sq ft', price: 349 },
          { id: '2bed', name: '2 Bedroom', sub: 'Up to 1,200 sq ft', price: 499, popular: true },
          { id: '3bed', name: '3 Bedroom', sub: 'Up to 1,800 sq ft', price: 649 },
          { id: '4bed', name: '4+ Bedroom', sub: '1,800+ sq ft', price: null },
        ],
        quoteNote: 'Final price confirmed after photos or a free site visit — every site is different.',
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
      {
        slug: 'recurring-cleaning',
        name: 'Recurring Cleaning',
        short: 'Weekly, bi-weekly or monthly — save up to 15%.',
        desc: 'Same crew, same day, same standard. Put your home on a schedule and save on every visit.',
        image: interiorKitchen,
        unit: 'per visit',
        tierLabel: 'Home size',
        recurring: true,
        tiers: HOME_SIZES([120, 150, 230, 310]),
        included: [
          'Everything in Standard Cleaning',
          'Same crew whenever possible',
          'Skip or reschedule with 48 hours notice',
          'No contracts — cancel anytime',
        ],
        goodFor: ['Busy professionals', 'Families', 'Pet owners'],
      },
    ],
    addons: [
      { id: 'fridge', name: 'Inside Fridge', sub: 'Shelves + drawers', price: 40, unit: 'each' },
      { id: 'oven', name: 'Inside Oven', sub: 'Racks + door glass', price: 45, unit: 'each' },
      { id: 'kitchen', name: 'Kitchen Deep Clean', sub: 'Cabinets + degrease', price: 95, unit: 'each' },
      { id: 'bath', name: 'Extra Bathroom Detail', sub: 'Tile, grout, glass', price: 75, unit: 'per bathroom', qty: true },
      { id: 'windows', name: 'Interior Windows', sub: 'Glass, sills, tracks', price: 40, unit: 'per 5 windows', qty: true },
      { id: 'deodorize', name: 'Deodorize & Sanitize', sub: 'Whole home', price: 79, unit: 'each' },
    ],
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
  },

  // ───────────────────────── AIRBNB ─────────────────────────
  {
    id: 'airbnb',
    name: 'Airbnb Turnover',
    short: 'Airbnb',
    tagline: 'Guest-ready between every stay.',
    icon: 'key',
    image: airbnbAfter,
    subs: [
      {
        slug: 'turnover-cleaning',
        name: 'Standard Turnover',
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
        desc: 'Everything in a standard turnover plus a full detail: baseboards, inside appliances, under furniture. Keeps your reviews at five stars.',
        image: airbnbAfter,
        before: airbnbBefore,
        after: airbnbAfter,
        unit: 'per visit',
        tierLabel: 'Unit size',
        tiers: HOME_SIZES([129, 159, 219, 299]),
        included: [
          'Everything in Standard Turnover',
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
  },

  // ─────────────────── POWER WASHING & WINDOWS ───────────────────
  {
    id: 'power',
    name: 'Power Washing & Windows',
    short: 'Exterior',
    tagline: 'Driveways, siding, windows, gutters.',
    icon: 'spray',
    image: powerDriveway,
    subs: [
      {
        slug: 'driveway-cleaning',
        name: 'Driveway & Walkway',
        short: 'Oil, moss and grime lifted off concrete.',
        desc: 'High-pressure surface cleaning that lifts oil stains, moss and years of grime from concrete, pavers and walkways.',
        image: powerDriveway,
        before: powerBefore,
        after: powerAfter,
        unit: 'flat rate',
        tierLabel: 'Area',
        tiers: [
          { id: 'small', name: 'Small', sub: 'Up to 500 sq ft', price: 99 },
          { id: 'medium', name: 'Medium', sub: '500–1,000 sq ft', price: 149, popular: true },
          { id: 'large', name: 'Large', sub: '1,000+ sq ft', price: 219 },
        ],
        included: ['Surface cleaner for streak-free results', 'Moss and weed lines cleared', 'Oil and rust spots pre-treated', 'Final rinse of surrounding areas'],
        goodFor: ['Before selling', 'Spring clean-up', 'Moss and slip hazards'],
      },
      {
        slug: 'house-washing',
        name: 'House Washing',
        short: 'Soft-wash siding — mildew and algae gone.',
        desc: 'A safe soft wash that removes dirt, mildew and green algae from siding without damaging paint or seals.',
        image: powerDriveway,
        before: powerBefore,
        after: powerAfter,
        unit: 'flat rate',
        tierLabel: 'Home height',
        tiers: [
          { id: '1-2', name: '1–2 Storey', sub: 'Standard home', price: 249, popular: true },
          { id: '3', name: '3+ Storey', sub: 'Large home', price: 349 },
        ],
        included: ['Low-pressure soft wash on all siding', 'Soffits and fascia rinsed', 'Doors and trim wiped', 'Plants pre-wet and protected'],
        goodFor: ['Vinyl and Hardie siding', 'Before painting', 'Before listing'],
      },
      {
        slug: 'window-cleaning',
        name: 'Window Cleaning',
        short: 'Streak-free glass, sills and screens.',
        desc: 'Exterior glass, frames, sills and screens cleaned by hand for a streak-free finish. Add interior windows in the booking.',
        image: powerDriveway,
        unit: 'flat rate',
        tierLabel: 'Number of windows',
        tiers: [
          { id: '10', name: 'Up to 10', sub: 'Condo / townhouse', price: 59 },
          { id: '20', name: 'Up to 20', sub: 'Standard home', price: 118, popular: true },
          { id: '30', name: 'Up to 30', sub: 'Large home', price: 177 },
        ],
        included: ['Exterior glass hand-cleaned', 'Frames and sills wiped', 'Screens brushed and rinsed', 'Ladder work up to 3 storeys'],
        goodFor: ['Spring and fall', 'Before selling', 'After construction'],
      },
      {
        slug: 'gutter-cleaning',
        name: 'Gutter Cleaning',
        short: 'Cleared and flow-tested.',
        desc: 'Gutters cleared by hand, downspouts flushed and flow-tested to prevent overflow and water damage.',
        image: powerDriveway,
        unit: 'flat rate',
        tierLabel: 'Home size',
        tiers: [{ id: 'standard', name: 'Standard Home', sub: 'Up to 2 storeys', price: 89, popular: true }],
        included: ['Debris removed by hand', 'Downspouts flushed', 'Flow test', 'Debris bagged and removed'],
        goodFor: ['Every fall', 'Homes near trees', 'Overflowing gutters'],
      },
      {
        slug: 'deck-fence-washing',
        name: 'Deck & Fence Washing',
        short: 'Grey, weathered wood brought back.',
        desc: 'Removes grime, mildew and grey weathering from wood and composite decks and fences.',
        image: powerDriveway,
        unit: 'flat rate',
        tierLabel: 'Size',
        tiers: [{ id: 'standard', name: 'Standard Size', sub: 'Deck or fence', price: 149, popular: true }],
        included: ['Pressure adjusted for wood or composite', 'Mildew treated', 'Railings and steps', 'Surrounding area rinsed'],
        goodFor: ['Before staining', 'Spring prep', 'Slippery decks'],
      },
      {
        slug: 'roof-soft-wash',
        name: 'Roof Soft Wash',
        short: 'Moss and black streaks removed safely.',
        desc: 'A low-pressure treatment that kills moss and removes black streaks without damaging shingles.',
        image: powerDriveway,
        unit: 'flat rate',
        tierLabel: 'Roof size',
        tiers: [{ id: 'standard', name: 'Standard Roof', sub: 'Up to 2 storeys', price: 249, popular: true }],
        included: ['Moss treatment', 'Low-pressure soft wash', 'Gutters rinsed after', 'Shingle-safe method'],
        goodFor: ['Mossy roofs', 'Before selling', 'Extending roof life'],
      },
      {
        slug: 'full-exterior-package',
        name: 'Full Exterior Package',
        short: 'Driveway + siding + windows in one visit.',
        desc: 'Our most popular bundle: driveway, house wash and exterior windows done in one visit, for less than booking them separately.',
        image: powerDriveway,
        before: powerBefore,
        after: powerAfter,
        unit: 'flat rate',
        tierLabel: 'Home size',
        tiers: [
          { id: 'standard', name: 'Standard Home', sub: 'Up to 2 storeys', price: 379, popular: true },
          { id: 'large', name: 'Large Home', sub: '3+ storeys', price: 499 },
        ],
        included: ['Driveway and walkways', 'Full house soft wash', 'Exterior windows', 'One crew, one visit'],
        goodFor: ['Selling your home', 'Annual refresh', 'Best value'],
      },
    ],
    addons: [
      { id: 'gutters', name: 'Gutter Cleaning', sub: 'Cleared + flushed', price: 89, unit: 'each' },
      { id: 'windows', name: 'Exterior Windows', sub: 'Glass, sills, screens', price: 59, unit: 'per 10 windows', qty: true },
      { id: 'deck', name: 'Deck or Fence Wash', sub: 'Wood or composite', price: 149, unit: 'each' },
      { id: 'roof', name: 'Roof Soft Wash', sub: 'Moss treatment', price: 249, unit: 'each' },
    ],
    freqs: [
      { id: 'onetime', name: 'One-Time', sub: 'Just this once', discount: 0 },
      { id: 'seasonal', name: 'Spring & Fall', sub: 'Twice a year', discount: 0.1 },
      { id: 'yearly', name: 'Yearly', sub: 'Every spring', discount: 0.05 },
    ],
    times: DAY_TIMES,
    faqs: [
      { q: 'Do I need to be home?', a: 'No. We only need access to an outdoor water tap.' },
      { q: 'Is it safe for my siding and plants?', a: 'Yes. We soft-wash siding at low pressure and pre-wet and protect plants.' },
      { q: 'What if it rains?', a: 'Light rain is fine. In heavy rain we reschedule at no charge.' },
    ],
  },

  // ───────────────────────── JUNK ─────────────────────────
  {
    id: 'junk',
    name: 'Junk Removal',
    short: 'Junk',
    tagline: 'We lift, load and haul it away.',
    icon: 'truck',
    image: junkTruck,
    subs: [
      {
        slug: 'junk-removal',
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
        desc: 'Post-renovation debris removal: drywall, flooring, cabinets, fixtures and packaging. Send photos for a same-day quote.',
        image: junkTruck,
        before: junkBefore,
        after: junkAfter,
        unit: 'custom quote',
        tierLabel: 'Job',
        tiers: [
          { id: 'photos', name: 'Send Photos', sub: 'Quote back same day', price: null, popular: true },
          { id: 'visit', name: 'Site Visit', sub: 'Free on-site assessment', price: null },
        ],
        quoteNote: 'Every job is different — we quote from photos or a free visit.',
        included: ['Loading and hauling', 'Sorting for recycling', 'Site swept after', 'Disposal fees included'],
        goodFor: ['Homeowners after a reno', 'Contractors', 'Landlords'],
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
      { q: 'What do you not take?', a: 'Hazardous materials such as paint, chemicals, propane tanks and asbestos-containing materials.' },
      { q: 'Do I need to carry things outside?', a: 'No. We remove items from anywhere on the property.' },
      { q: 'What if I have more than I thought?', a: 'We confirm the load size on site before we start. No surprises.' },
    ],
  },
];

export const heroImage = teamVan;

export const getDivision = (id: string) => DIVISIONS.find((d) => d.id === id)!;
export const minPrice = (d: Division) =>
  Math.min(...d.subs.flatMap((s) => s.tiers.map((t) => t.price ?? Infinity)));
export const subMin = (s: Sub) => {
  const p = s.tiers.map((t) => t.price).filter((x): x is number => x != null);
  return p.length ? Math.min(...p) : null;
};

export const AREAS = [
  'Port Coquitlam', 'Coquitlam', 'Port Moody', 'Burnaby', 'New Westminster', 'Maple Ridge',
  'Pitt Meadows', 'Surrey', 'Vancouver', 'North Vancouver', 'West Vancouver', 'Richmond',
  'Langley', 'Delta', 'Abbotsford',
];
