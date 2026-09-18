'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { BRAND } from '@/lib/data';

const links = [
  ['about', 'The story'], ['journey', 'The journey'], ['work', 'Ventures'],
  ['expertise', 'Expertise'], ['yalaride', 'YalaRide'], ['leadership', 'Leadership'], ['contact', 'Let’s talk'],
] as const;

export function PortfolioHeader() {
  const [open, setOpen] = useState(false);
  const toggle = useRef<HTMLButtonElement>(null);
  const nav = useRef<HTMLElement>(null);
  const progress = useRef<HTMLDivElement>(null);
  const chapter = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    let frame = 0;
    const update = () => {
      frame = 0;
      const max = document.documentElement.scrollHeight - innerHeight;
      if (progress.current) progress.current.style.transform = `scaleX(${max > 0 ? Math.min(1, Math.max(0, scrollY / max)) : 0})`;
    };
    const schedule = () => { if (!frame) frame = requestAnimationFrame(update); };
    const observer = new IntersectionObserver(entries => {
      for (const entry of entries) {
        if (entry.isIntersecting && chapter.current) {
          chapter.current.textContent = links.find(([id]) => id === entry.target.id)?.[1] ?? 'A life in motion';
        }
      }
    }, { rootMargin: '-15% 0px -65% 0px' });
    document.querySelectorAll('main section[id]').forEach(section => observer.observe(section));
    const resize = new ResizeObserver(schedule);
    resize.observe(document.body);
    addEventListener('scroll', schedule, { passive: true });
    addEventListener('resize', schedule);
    update();
    return () => { cancelAnimationFrame(frame); observer.disconnect(); resize.disconnect(); removeEventListener('scroll', schedule); removeEventListener('resize', schedule); };
  }, []);

  useEffect(() => {
    if (!open) return;
    nav.current?.querySelector<HTMLAnchorElement>('a')?.focus();
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') { setOpen(false); toggle.current?.focus(); }
      if (event.key === 'Tab') {
        const items = [toggle.current, ...Array.from(nav.current?.querySelectorAll<HTMLAnchorElement>('a') ?? [])].filter(Boolean) as HTMLElement[];
        const first = items[0];
        const last = items[items.length - 1];
        if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last.focus(); }
        else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first.focus(); }
      }
    };
    const media = matchMedia('(min-width: 701px)');
    const closeOnDesktop = () => { if (media.matches) setOpen(false); };
    document.addEventListener('keydown', onKey);
    media.addEventListener('change', closeOnDesktop);
    return () => { document.removeEventListener('keydown', onKey); media.removeEventListener('change', closeOnDesktop); };
  }, [open]);

  return <>
    <header className="editorial-header">
      <a href="#hero" className="brand-lockup" aria-label={`${BRAND.name} home`}><Image src="/brand-mark.svg" alt="" width={50} height={50}/><span>MOHAMMED<br/>RIZWAN</span></a>
      <nav className="desktop-nav" aria-label="Main navigation"><a href="#about">The story</a><a href="#work">Selected ventures</a><a href="#expertise">Expertise</a><a href="#yalaride">YalaRide ↗</a></nav>
      <a className="header-contact" href="#contact">Let’s talk <span aria-hidden="true">↗</span></a>
      <button ref={toggle} className="mobile-toggle" aria-expanded={open} aria-controls="mobile-navigation" onClick={() => setOpen(!open)}>{open ? 'Close −' : 'Menu +'}</button>
      <nav ref={nav} id="mobile-navigation" className="mobile-navigation" aria-label="Mobile navigation" hidden={!open}>{links.map(([id, label]) => <a key={id} href={`#${id}`} onClick={() => setOpen(false)}>{label}<span aria-hidden="true">↗</span></a>)}</nav>
      <div className="reading-progress" ref={progress} aria-hidden="true"/>
    </header>
    <div className="chapter-indicator" aria-hidden="true"><span className="status-dot"/><span ref={chapter}>A life in motion</span></div>
  </>;
}
