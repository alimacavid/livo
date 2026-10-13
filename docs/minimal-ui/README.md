# LIVO minimal UI — TEST ONLY

Branch: `codex/minimal-ui`, based on `v1.0`. Target: `v1.0`. Date: October 12, 2026.

Screenshots use the local production build in test mode. Each image is a full-page capture taken with the indicated browser viewport. Fixed bars appear at the viewport's bottom in full-page captures.

| Page/state | 375 × 667 | 390 × 844 | 1280 × 800 |
| --- | --- | --- | --- |
| Home | [Screenshot](home-375x667.png) | [Screenshot](home-390x844.png) | [Screenshot](home-1280x800.png) |
| Services | [Screenshot](services-375x667.png) | [Screenshot](services-390x844.png) | [Screenshot](services-1280x800.png) |
| House Cleaning category | [Screenshot](category-375x667.png) | [Screenshot](category-390x844.png) | [Screenshot](category-1280x800.png) |
| Deep Cleaning | [Screenshot](fixed-375x667.png) | [Screenshot](fixed-390x844.png) | [Screenshot](fixed-1280x800.png) |
| Kitchen Deep Clean | [Screenshot](quote-375x667.png) | [Screenshot](quote-390x844.png) | [Screenshot](quote-1280x800.png) |
| Booking step 1 | [Screenshot](book-375x667.png) | [Screenshot](book-390x844.png) | [Screenshot](book-1280x800.png) |
| Booking photo step | [Screenshot](book-photos-375x667.png) | [Screenshot](book-photos-390x844.png) | [Screenshot](book-photos-1280x800.png) |
| My LIVO | [Screenshot](my-livo-375x667.png) | [Screenshot](my-livo-390x844.png) | [Screenshot](my-livo-1280x800.png) |
| Privacy | [Screenshot](privacy-375x667.png) | [Screenshot](privacy-390x844.png) | [Screenshot](privacy-1280x800.png) |

Machine-readable evidence: [results.json](results.json).

Validation uses the existing system Playwright/Chrome and a temporary axe-core 4.10.3 script; no npm packages were added. Automated WCAG scans complement the visual checks and test journeys; they are not a full manual accessibility certification.

The existing hosted `v1.0` test site is the baseline, so the new UI was verified against the local production build rather than claiming these changes are already deployed there. `main`, live infrastructure, prices and service data are unchanged.

Existing gaps: the homepage before/after still shows different locations; commercial and restaurant imagery is reused; the static legacy Careers page is outside the requested Astro page changes. `npm ci` reports 3 existing high-severity advisories; dependencies remain locked and unchanged as requested.

Hosted verification: [PR preview](https://deploy-preview-5--darling-marigold-ff0def.netlify.app), **12 axe scans / 0 violations**, **3/3 journeys**, **8 reduced-motion entry states / 0 running animations or hidden reveals**. [Deployed evidence](deployed-preview-results.json). Netlify’s injected review drawer was hidden in the test browser because it intercepted mobile controls; no app or Netlify configuration was changed.
