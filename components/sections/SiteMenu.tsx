'use client';

import { StaggeredMenu } from '@/components/ui/StaggeredMenu';
import { BRAND, NAV_LINKS, SOCIALS } from '@/lib/data';

export function SiteMenu() {
  const items = NAV_LINKS.map((link) => ({
    label: link.label,
    ariaLabel: link.ariaLabel,
    link: link.href,
  }));

  const socialItems = SOCIALS.map((social) => ({
    label: social.label,
    link: social.href,
  }));

  return (
    <StaggeredMenu
      position="right"
      isFixed
      items={items}
      socialItems={socialItems}
      displaySocials
      displayItemNumbering
      logoText={BRAND.wordmark}
      logoHref="#hero"
      ctaLabel="Let's connect"
      ctaHref="#contact"
      colors={['#e8dfd0', '#a88962']}
      accentColor="#a88962"
      menuButtonColor="#16140f"
      openMenuButtonColor="#a88962"
      changeMenuColorOnOpen
    />
  );
}
