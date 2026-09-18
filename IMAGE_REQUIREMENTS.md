# Photography for the portfolio

The current images remain in place until approved replacements are supplied.

- Hero portrait: original high-resolution vertical portrait, ideally 2000 × 2600 px or larger, with space above the head. Natural light and a neutral background work best. No baked-in text.
- Cars Compound: authentic workshop/exterior or founder-at-work photograph, landscape, 2400 × 1400 px or larger.
- Priceless Car Rental: fleet, rental location, or customer handover, landscape, at least 1600 × 1100 px.
- VIP Kars: showroom or dealership photograph, landscape, at least 1600 × 1100 px.
- Automotive operations: an authentic auction, repair, parts, or operations photograph, landscape, at least 1600 × 1100 px.
- Tourism: founder at a travel exhibition or relevant travel/mobility photograph, landscape, at least 1600 × 1100 px.
- YalaRide: current clean product screenshot or app mockup in PNG/WebP, at least 1200 px wide, plus the official transparent logo if updated.
- Optional: personal photographs from Pakistan, Qatar, and the United States to enrich the journey later.

Use originals where possible. Avoid WhatsApp-compressed versions, watermarks, and embedded captions. Supply only photographs approved for publication.

## Brand assets now included

- `public/brand-mark.svg`: scalable MR monogram used in the header and footer.
- `public/icon.svg`: vector favicon, with a 32px PNG fallback and 180px Apple touch icon.
- `public/og-image.png`: 1200 × 630 branded social sharing card using the current portrait.
- Run `node scripts/generate-brand-assets.cjs` after replacing the portrait or modifying the vector identity to rebuild raster brand assets.

The YalaRide section currently uses the supplied travel/rental artwork. A genuine product screenshot is still requested for the final content pass.

## Cinematic update

The active design now follows the supplied reference. The latest detailed asset handoff is CINEMATIC_HANDOFF.md. The original portrait is integrated using a code-based vector mask; a professionally prepared transparent portrait is still welcome for fine hair edges.

Use `node scripts/generate-brand-assets.cjs` for icons. To rebuild the current 1200 × 630 sharing card, run the local preview and then `node scripts/capture-cinematic-og.cjs`; it captures the actual cinematic hero.

## Current replacement image specifications

- VIP Kars: 1920 x 1440 px (4:3), JPG or WebP. Clean dealership/vehicle photo without embedded captions or logos. Keep the vehicle near the center with generous space around it for responsive cropping.
- Priceless Car Rental: 2400 x 1600 px (3:2), JPG or WebP. Rental fleet/vehicle or road image, subject in the center-right and room around the edges. Current road photo remains until a replacement is supplied.
- YalaRide phone screen: 780 x 1688 px (195:422), PNG. This is twice the rendered source viewport of 390 x 844. Supply the app/website screen only, without a phone frame or browser chrome; the site renders the device shell.
- Tourism, only if changing it later: 2400 x 1600 px (3:2), JPG or WebP. Existing travel photo retained.

Desktop and mobile crop photography differently; dimensions describe the source file rather than one fixed rendered box.
