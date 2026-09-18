# CINEMATIC BIOGRAPHY SITE — MANDATORY QUALITY BAR
Paste this WHOLE file into Cursor Agent. Stop the heritage/editorial redesign. Rebuild motion + layout to match the user's OWN shipped portfolios.

## Quality bar (open these and MATCH the craft — do not invent a weaker version)
1. https://usman-farooqi.vercel.app/  ← primary bar: chaptered scroll narrative, “step inside”, work collection that FEELS cinematic
2. https://waseeq-nauman.vercel.app/  ← premium founder presence, big stats, polished section rhythm
3. http://mohammed-kashan.vercel.app/ ← brand roster energy, motion, modern creative portfolio
4. https://arrowheaddigitech-portfolio.com/ ← GSAP + Lenis: pinned sections, horizontal scroll tracks, marquees, mask reveals

Local reference code the user already built (STUDY patterns, do not copy personal content):
- `D:\Projects\Arrowhead Portfolio Website` → `Services.tsx` horizontal pin track, `Hero.tsx` sticky morph, `Work.tsx` clip reveals, Lenis, marquees
- `D:\Projects\usman-farooqi-portfolio` → Framer Motion cinematic sections / project carousel energy
- `D:\Projects\Mohammed-kashan-portfolio-v2` → Lenis + GSAP ScrollTrigger pins
- `D:\Projects\waseeq-nauman-portfolio` → premium founder layout / motion polish

If Rizwan’s site still feels like a static brochure with mild fades, you FAILED.

## What the user is angry about (fix these)
- Sticky sections not really working / not impressive
- No real carousels
- No sticky carousels / horizontal pinned tracks
- Not movie-like; biography should MOVE like a film as you scroll
- Previous “Priority 1 complete” output was useless polish on an old layout

## Product goal
A **cinematic biography website** for Mohammed Rizwan (YalaRide founder): scroll = scenes in a movie. Smooth Lenis. Big pinned acts. Horizontal sticky carousels for ventures/media. YalaRide as climax reel. Bright modern premium (not dusty heritage magazine). US tech-forward founder energy.

## Motion stack (required)
- Lenis smooth scroll wired to ScrollTrigger.update
- GSAP ScrollTrigger with real `pin: true` acts (desktop)
- At least TWO horizontal pinned tracks (ventures carousel + one more: journey beats OR media/proof)
- Sticky split scenes (copy pinned / visual scrubs OR visual pinned / copy scrolls)
- Section curtain / mask reveals, staggered scene titles, progress chrome (act numbers)
- Mobile: no broken pins — snap carousels / stacked film stills that still feel premium
- `prefers-reduced-motion`: disable pins; keep readable stacked layout

## Required acts (film structure)
ACT 0 — Preloader / cold open (short, tasteful)
ACT 1 — Hero cold open (cinematic title + portrait stage + scroll cue)
ACT 2 — Origin thesis (short pinned statement)
ACT 3 — Journey film (PK → QA → US) sticky chapter morph OR horizontal chapter track
ACT 4 — Ventures sticky HORIZONTAL carousel (Cards Compound, Priceless, VIP Cars, atmospheric A&P / Tourism, YalaRide) — drag + scroll scrub + dots; this MUST work
ACT 5 — Operating principles (sticky principle cards or scrubbed statements)
ACT 6 — YalaRide climax reel (pinned product theatre + dual CTAs → https://yalaride.com/)
ACT 7 — Contact close + minimal footer

## Visual system
- Modern bright futuristic: white/soft gray, graphite, one electric accent
- Kill Italiana heritage look, paper seals, scrapbook flag museum vibe as primary identity
- Sharp frames, product photography treatment for real assets in `public/`
- Typography: modern sans (Geist/Inter/Plus Jakarta). Display can be bold geometric — not wedding serif

## Content rules
- Biography facts only (existing content + Word handoff). No invented awards/brands.
- USA = 30+ years. YalaRide spelling/link consistent.
- Stay in `D:\Projects\rizwan porfolio` only.

## Acceptance tests (you must perform before saying done)
1. Desktop: scroll Journey — a PINNED act clearly holds while content morphs or track moves.
2. Desktop: Ventures — HORIZONTAL sticky/pinned carousel scrub works with mouse wheel while pinned; dots/drag work.
3. YalaRide pinned theatre feels like a climax, not a static block.
4. Mobile: carousels swipe; no stuck pin / broken scroll.
5. `npm run typecheck` && `npm run build` green.
6. Record mentally: if it doesn’t feel as intentional as Usman Farooqi + Arrowhead motion, keep going.

## Implementation order
1. Study Arrowhead `Services.tsx` / `Hero.tsx` / `Work.tsx` pin+horizontal patterns (structure only).
2. Replace design tokens + fonts.
3. Rebuild page as cinematic acts with Lenis + ScrollTrigger.
4. Ship ventures sticky horizontal carousel next (user’s #1 missing feature).
5. Journey sticky film + YalaRide climax.
6. QA acceptance tests above.
7. Report which acts use pin / horizontal / sticky-split — with honesty.

START NOW. Do not claim “complete” unless acceptance tests pass on http://127.0.0.1:3001.
