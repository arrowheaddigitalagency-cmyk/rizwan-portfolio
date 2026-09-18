# CONTINUATION PROMPT — Mohammed Rizwan Portfolio

Paste this into the next chat if more polish is needed.

---

You are continuing work on the Mohammed Rizwan founder portfolio at `d:\Projects\rizwan porfolio` (Next.js + GSAP + Lenis).

## Already done (do not redo from scratch)
- Country flags wired into opening route strip + journey scenes.
- USA chapter uses verified **30+ years** callout (do NOT invent “50 years”).
- Ventures explore UX with progress meter, logos, project images, site links where verified.
- Verified brands only: Cars Compound, Priceless Car Rental, VIP Kars, YalaRide.
- Automotive & Parts / Tourism & Travel use atmospheric treatment / mark — **no fake logos**.
- “The Way He Works”: image left, text right, center-origin entrance motion.
- “The Next Chapter”: product visuals + logo (generic globe removed; `Globe.tsx` + three.js deps removed).
- “Destination is possibility” rebuilt as three horizon panels.
- `priceless-project` compressed to ~209KB JPG (`public/brands/priceless-project.jpg`).
- Accessibility: flag alts, explore `role="status"`, venture aria-labels, reduced-motion for YalaRide carousel + shot transitions.
- Subtle paper grain + section separators for visual depth.
- Source facts stay bound to `biography-source.txt` / the biography doc.

## Still open / improve next
1. Find/add a real **Tourism & Travel** exhibition or booth photo if the client can supply one (do not invent event names/dates).
2. Confirm official names/sites if user insists on **Air / Sky / ABG** — currently unverified; do not invent brands.
3. Optional deeper groove: journey scene atmospheric photography per country (client-supplied only).
4. Optional: richer venture “project gallery” (2–3 images each) once more assets arrive.
5. Mobile visual QA in browser: orbit nodes, venture visual, YalaRide product stage, horizons panels.
6. Run `npm run typecheck` and `npm run build` after any further edits.

## Hard rules
- No fabricated logos, awards, dates, attendance numbers, or “50 years”.
- Keep Roman/English UI copy; don’t change brand voice.
- Preserve existing typography (Italiana + DM Sans) and palette.
- Prefer wiring real assets over decorative placeholders.

## First commands
```bash
npm run typecheck
npm run build
npm run dev
```

Then visually walk: Journey → Ventures (explore all 6) → Philosophy → YalaRide product stage → Horizons → Contact.
