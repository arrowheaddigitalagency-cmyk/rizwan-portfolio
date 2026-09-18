# Cinematic portfolio — implementation and asset handoff

## Implemented

The supplied reference is the primary art direction. The active route remains one page. It now comprises the architectural doorway opening, an oversized name/portrait hero, three photographic country scenes, a dark automotive overture, five separately composed business chapters, a YalaRide product scene, a typographic leadership chapter, a single 3D global scene, and the final contact chapter.

Desktop: GSAP/ScrollTrigger provide 11 short scene pins, image masks, slow zoom, title movement, and the Tourism-to-YalaRide white transition. On tablet/mobile and short viewports, chapters scroll naturally. Reduced motion removes pinning and skips the intro. The intro is skippable, keyboard accessible, capped by a timeout, and shown once per browser-tab session.

Three.js/R3F is lazy-loaded only near the global chapter. The earth has a fixed orientation and renders on demand; it does not continuously spin. A static fallback is included.

## Content and fact boundaries

The original Word biography was extracted directly to verify the content against the existing biography-source.txt. Current user instructions take precedence over the old document's card/grid and vertical-timeline implementation notes.

- Cars Compound: first major entrepreneurial turning point; auto body shop in Marietta.
- Priceless: acquired franchise; rental operations, fleets, pricing, bookings.
- VIP Kars: established dealership; vehicle sales, sourcing, inventory and customer confidence.
- Automotive Operations: hands-on services, auctions, parts and junkyard experience.
- Tourism: industry participation and travel exhibitions; not an invented named company.
- YalaRide: founder/CEO; approximately eighteen months of development; worldwide reach is framed as ambition, not a claim of operating in named countries.
- The hero's six business chapters include the five physical-industry chapters plus YalaRide; this is not a claim of six separately incorporated companies.

No invented awards, clients, dates, expansion milestones, testimonials, videos or case-study results were added. No Watch Video controls are shown because no video was supplied.

## Asset provenance

Original portrait, business photography, automotive overture and existing world map were reused. The portrait is unchanged on disk; an SVG clip path and CSS provide compositional masking. The built-in image-edit attempt could not read the local portrait because of the environment's filesystem-helper error; no generated portrait was used. An optional CLI image-generation route exists but requires an OPENAI_API_KEY and was not invoked.

- Pakistan: MuhammadYassal, Sunset at Badshahi Mosque Lahore. https://commons.wikimedia.org/wiki/File:Sunset_at_Badshahi_Mosque_Lahore.jpg — CC BY-SA 4.0. Resized/re-encoded and visually cropped; the photo adaptation remains under that license.
- Qatar: Thameur Belghith, Doha West Bay Skyline Qatar Jan 2020. https://commons.wikimedia.org/wiki/File:Doha_West_Bay_Skyline_Qatar_Jan_2020.jpg — CC BY-SA 4.0. Resized/re-encoded and visually cropped; the photo adaptation remains under that license.
- United States: Ypsilonatshared, Liberty enlightening the world. https://commons.wikimedia.org/wiki/File:Liberty_enlightening_the_world.JPG — public domain.
- Tourism: Marcreation, tropical coastline. https://unsplash.com/photos/fV_qtB_sTV8 — Unsplash License. Illustrative travel photography, not an asserted personal visit.
- Earth: https://threejs.org/examples/textures/planets/earth_atmos_2048.jpg — Three.js example texture, used for the geographic globe.
- Actual mobile product screen: captured from https://yalaride.com/ in this session. The supplied file named yalaride-app.webp is lifestyle artwork, not app UI, so it was not presented as a product screen.

Visible source attribution is included in the footer's Image credits disclosure. Country photographs are establishing imagery, not personal archival material.

## Remaining ideal replacements

- A professionally prepared transparent portrait would improve fine hair edges beyond the current vector mask.
- High-resolution, clean VIP Kars photography without embedded promotional text. Current supplied image is only 480 × 360.
- High-resolution authentic automotive/auction/junkyard photos. Existing operations photo is 535 × 418 and represents hands-on service work.
- Personal archival photos from Pakistan, Qatar and the United States, plus approved exhibition photographs, would make the story more personal.
- Approved video footage can be integrated when supplied.

No deployment was performed. The implementation and assets are local.
