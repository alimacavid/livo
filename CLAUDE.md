# LIVO Property Services — CLAUDE.md

## Last updated
2026-07-23

## What changed (this session)
Redesigned the pricing/configure step of `book.html` (the booking flow):
- Reordered sections: Pricing (size/scope cards) now shown before "How often?" (frequency), matching the natural decision order.
- Removed the marketing header block (eyebrow + big headline + subtitle) from the pricing step — was creating excess empty space and redundant wording ("Pricing" appeared twice).
- Replaced it with a minimal, clean single-line title showing the service name (e.g. "Interior Cleaning Plan"), bold, centered, no eyebrow/subtitle — new `.page-head.minimal` CSS variant.
- Simplified overall copy across the booking flow to be more minimal and straightforward per user request.

## Current branch state
- Active branch: `v1.0` (7+ commits ahead of `main`)
- `book.html` and `index.html` both live on `v1.0`, deployed to `v1-0--darling-marigold-ff0def.netlify.app`
- Not yet merged to `main` — pending Ali's explicit approval

## Pending / not yet done
- Real confirmation emails: needs EmailJS account (Service ID, Template ID, Public Key)
- Carpet & Upholstery service page exists but isn't wired into the booking system yet
- Remaining service page hero photos (real photography replacing gradients)

## Known workflow notes
- GitHub web editor works fine for `book.html` (~51KB) via direct CodeMirror content injection + commit button — no need for the drag-and-drop workaround required for the much larger `index.html` (~1.2MB, base64 images).
- `index.html` still requires the Python readlines/writelines + drag-and-drop upload method — do not use the GitHub web editor on it (renders blank).

## Workflow
All changes made directly to `v1.0` branch (per Ali's existing workflow — `v1.0` serves as the staging branch). Awaiting Ali's approval before merging to `main`/production.
