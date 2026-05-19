# LIVO — Master Context File
> This file is the single source of truth for all Claude sessions working in this repo.
> Read this first. Then read the CLAUDE.md in whichever folder you are working in.

---

## 1. What Is LIVO?

**LIVO** is a residential and commercial home services brand serving the **Lower Mainland, BC**.
It is the consumer-facing brand of **LandEx Construction Ltd.**

- **Website:** livoland.com
- **CEO / Founder:** Ali Makki Javid
- **Parent Company:** LandEx Construction Ltd. (hazardous materials abatement — separate operation)
- **Headquarters:** Port Coquitlam, BC, Canada

LIVO exists to provide homeowners, Airbnb hosts, landlords, and businesses with reliable, professional home services under one brand. The goal is a multi-division operation that scales across BC and eventually into Alberta and the US.

---

## 2. The 6 Divisions

| Division                  | Folder                        | Key Market              |
|---------------------------|-------------------------------|-------------------------|
| Power Washing & Windows   | `divisions/power-washing/`    | Homeowners, strata      |
| Carpet & Upholstery       | `divisions/carpet-upholstery/`| Homeowners, Airbnb      |
| Interior Cleaning         | `divisions/interior-cleaning/`| Recurring, move in/out  |
| Junk Removal              | `divisions/junk-removal/`     | Homeowners, landlords   |
| Airbnb Turnover           | `divisions/airbnb-turnover/`  | STR hosts               |
| Commercial Cleanup        | `divisions/commercial-cleanup/`| Offices, retail, strata |

Each division has its own `CLAUDE.md` with scope, SOPs, and target customer details.

---

## 3. How LIVO Works (Business Model)

### Customer Journey
```
Customer visits livoland.com
        ↓
Selects service → Fills booking form
        ↓
Quote generated (instant or manual)
        ↓
Job confirmed → Team dispatched
        ↓
Service completed → Photo report sent
        ↓
Invoice → Payment
        ↓
Follow-up → Recurring booking or review request
```

### Revenue Model
- **One-time jobs:** Single service bookings (most junk removal, deep cleans, power washing)
- **Recurring contracts:** Weekly/bi-weekly cleaning, commercial maintenance
- **Package deals:** Bundle 2+ services at a discount
- **Referral program:** 10% discount for clients referred through LandEx Construction

### Pricing Strategy
- Competitive with Lower Mainland market rates
- Transparent pricing on website where possible
- Custom quotes for large or complex jobs
- All current rates → `docs/pricing.md`

---

## 4. Brand Identity

Full brand details → `brand/CLAUDE.md`

**Quick reference:**
- Background: Dark charcoal `#1C1C1C`
- Accent: Lime green `#C8FF00`
- Text: Soft lavender `#9D7FE8`
- Tone: Clean, confident, friendly. Short sentences. No jargon.

---

## 5. Business Strategy

### Geographic Expansion (in order)
1. ✅ Lower Mainland, BC (current)
2. Fraser Valley, BC
3. Victoria, BC
4. Okanagan, BC
5. Alberta
6. United States

### Growth Strategy
- **Lead with Airbnb Turnover** — fastest growing segment, high repeat frequency
- **Upsell bundles** — combine Interior Cleaning + Carpet + Power Washing
- **LandEx referral pipeline** — LandEx abatement clients often need cleanup after remediation → warm LIVO leads
- **Google reviews** — primary trust signal; request after every completed job
- **Recurring revenue** — push all cleaning clients toward recurring contracts

### Competitive Advantage
- Multi-service under one brand (vs. single-trade operators)
- Professional documentation (photo reports, checklists)
- Fast response and same-day turnaround (especially Airbnb)
- Backed by LandEx (established, licensed, insured)

---

## 6. Repo Structure & Rules

```
livo/
├── CLAUDE.md              ← This file (root bible — always read first)
├── README.md              ← Public-facing repo description
├── CORTEX.html            ← R&D / strategy portal (do not modify unless instructed)
│
├── brand/                 ← Colors, fonts, logo, design tokens
│   └── CLAUDE.md
│
├── content/               ← Website copy, blog posts, marketing text
│   └── CLAUDE.md
│
├── dev/                   ← Tech stack, deploy, code conventions
│   └── CLAUDE.md
│
├── divisions/             ← One folder per service line
│   ├── CLAUDE.md
│   ├── power-washing/
│   ├── carpet-upholstery/
│   ├── interior-cleaning/
│   ├── junk-removal/
│   ├── airbnb-turnover/
│   └── commercial-cleanup/
│
├── docs/                  ← Pricing, contracts, policies
│   └── CLAUDE.md
│
├── livo/                  ← Website / app build files
│   └── CLAUDE.md
│
└── notes/                 ← Internal notes, ideas, research
    └── CLAUDE.md
```

---

## 7. Claude Rules (Read Every Session)

1. **Always read this file first.** Then read the `CLAUDE.md` in the folder you are working in.
2. **Never guess prices.** All rates are in `docs/pricing.md`.
3. **Never change brand colors or fonts** without explicit instruction. See `brand/CLAUDE.md`.
4. **Never modify `CORTEX.html`** unless Ali explicitly says to.
5. **When making any change**, also update the relevant `CLAUDE.md` in the same commit.
6. **Referral discount is 10%** — applies to all services for clients referred by LandEx. Flag in system.
7. **LIVO ≠ LandEx.** LIVO is the consumer services brand. LandEx is hazardous materials abatement. Keep them separate.
8. **Commit both the change AND the CLAUDE.md update together** — one commit, one message.
9. **Git:** Always check `git status` before committing. Push to `origin/main` only after review.
10. **Do not install packages** without confirmation from Ali.
