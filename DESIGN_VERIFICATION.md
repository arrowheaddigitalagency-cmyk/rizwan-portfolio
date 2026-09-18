# Cinematic portfolio verification

Verified on 18 September 2026 using headless Chrome against the local Next.js preview.

- Production build completed successfully, including TypeScript validation and static export. Home route: 16.2 kB; first-load JavaScript: 164 kB. The WebGL globe loads separately.
- Fourteen content sections: portrait hero, three country scenes, automotive introduction, five business chapters, YalaRide, leadership, global vision and contact finale.
- Fresh-page checks at 320x640, 390x844, 768x1024, 1024x768, 1440x900 and 1920x1080 found no horizontal page overflow or clipped heading/body text.
- Opening: automatic completion, Skip, keyboard focus loop, Escape, scroll/inert cleanup and repeat-visit suppression verified. Replay opening is available in the footer.
- Desktop motion: eleven short pinned scenes; mobile and reduced-motion modes: zero pins. Anchor destinations settle below the fixed header (92px desktop offset).
- Mobile menu: first-link focus, Escape restores toggle focus, and selection closes the menu. Business story disclosures expand correctly.
- Images decoded without broken assets and browser checks found no JavaScript page errors. Lazy globe rendered after entering its loading range.
- Visually inspected desktop/mobile hero, all section compositions, globe and sharing artwork. OG image is a static 1200x630 capture of the cinematic hero.

The first immediate post-resize bounds check read stale animation positions; all widths were subsequently verified from fresh pages with fonts loaded. Real-device touch performance and social-platform cache refresh have not been tested. No deployment was performed.

Repeatable checks: scripts/verify-cinematic-final.cjs, scripts/verify-cinematic-motion.cjs and scripts/review-cinematic.cjs. Asset provenance and recommended photo replacements are in CINEMATIC_HANDOFF.md.

## Mobile readability follow-up

Reviewed six representative frames from the user's 63-second recording. Increased primary body copy to 16px across desktop/mobile and enlarged supporting labels and controls. Replaced absolute mobile hero/leadership positioning with normal flow; stacked the YalaRide relationship on phones. Extended the mobile intro hold/reveal and allowed first visits to #hero to see the opening.

Fresh-page bounds checks again passed at 320, 390, 768, 1024, 1440 and 1920 pixels. Visually reviewed the new 390px hero. A dedicated phone check passed: first-visit #hero intro, automatic completion, scroll/inert cleanup, visible hero, computed 16px business body, zero pins, menu Escape focus and no JavaScript page errors. Real-device touch performance remains unverified. Remaining visual refinements and a ready-to-use continuation brief are in CONTINUE_MOBILE_POLISH.md.

## Permanent opening and contrast follow-up

The former modal preloader is now #opening, the first section in main, and remains in document flow. Session gating, timers, inert state and focus trapping were removed. Begin the journey links to #hero; Home and Return to opening link to #opening. Reduced-motion users also see the static opening. Country labels now use local SVG flags. Text overlays have stronger light/dark reading surfaces; mobile business text sits on opaque section backgrounds. Removed partial-opacity entrances on body copy. TypeScript check passed. Prior intro-specific test scripts describe the superseded modal; use verify-permanent-opening.cjs for the current behavior. Replacement photo specifications are in IMAGE_REQUIREMENTS.md.

Visual review also identified the desktop leadership values crossing the portrait. Their text now has its own opaque ivory reading surface and a smaller responsive type scale.

## Reversible door reveal

The opening and actual hero now share an opening-sequence stage. With normal motion, scrolling through 95% of a viewport opens the two door panels over the hero; scrolling back reverses the same timeline and restores the closed introduction. One short opening pin applies on mobile; later mobile sections remain unpinned. Removed the previous separate desktop hero pin to avoid nested pins. Begin the journey targets the reveal endpoint. No session/timer dismissal. Reduced motion retains two readable natural-flow sections. Browser checks passed at 390x844 and 1440x900 for partial/full reveal, reverse closure, CTA navigation, horizontal overflow and JavaScript errors; reduced-motion cleanup passed. Visually reviewed the phone halfway-open frame. Current behavior test: scripts/verify-reversible-opening.cjs.
