'use client';

import { useEffect, type ReactNode } from 'react';
import Lenis from 'lenis';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useReducedMotion } from '@/hooks/useReducedMotion';

export function SmoothScrollProvider({ children }: { children: ReactNode }) {
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const reduce = reducedMotion || matchMedia('(prefers-reduced-motion: reduce)').matches;
    const lenis = reduce ? null : new Lenis({
      duration: 1.05,
      easing: t => 1 - Math.pow(1 - t, 4),
      smoothWheel: true,
      syncTouch: false,
    });
    const raf = (time: number) => lenis?.raf(time * 1000);
    if (lenis) { lenis.on('scroll', ScrollTrigger.update); gsap.ticker.add(raf); }

    const onAnchorClick = (event: MouseEvent) => {
      if (event.defaultPrevented || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
      const anchor = event.target instanceof Element ? event.target.closest<HTMLAnchorElement>('a[href^="#"]') : null;
      const hash = anchor?.getAttribute('href');
      if (!hash || hash === '#' || anchor?.target === '_blank') return;
      const target = document.getElementById(decodeURIComponent(hash.slice(1)));
      if (!target) return;
      event.preventDefault();
      const finish = () => {
        if (location.hash !== hash) history.pushState(null, '', hash);
        const needsTabIndex = !target.hasAttribute('tabindex');
        if (needsTabIndex) target.setAttribute('tabindex', '-1');
        target.focus({ preventScroll: true });
        if (needsTabIndex) target.addEventListener('blur', () => target.removeAttribute('tabindex'), { once: true });
      };
      const offset = document.querySelector('header')?.getBoundingClientRect().height ?? 80;
      // Hero lives behind the opening; its anchor must finish the reveal first.
      const openingReveal=ScrollTrigger.getById('opening-reveal');
      const destination=hash==='#hero'&&openingReveal ? openingReveal.end+1 : hash==='#opening'&&openingReveal ? openingReveal.start : target.getBoundingClientRect().top+scrollY-offset-16;
      if (lenis) lenis.scrollTo(destination, { onComplete: finish });
      else { window.scrollTo({ top: destination, behavior: 'instant' }); finish(); }
    };
    document.addEventListener('click', onAnchorClick);
    const onIntro = (event: Event) => { if ((event as CustomEvent<boolean>).detail) lenis?.stop(); else lenis?.start(); };
    document.addEventListener('cinematic:intro', onIntro);
    if (document.documentElement.style.overflow === 'hidden') lenis?.stop();
    const refresh = () => ScrollTrigger.refresh();
    let active = true;
    document.fonts.ready.then(() => { if (active) refresh(); });
    refresh();
    return () => {
      active = false;
      document.removeEventListener('click', onAnchorClick);
      document.removeEventListener('cinematic:intro', onIntro);
      gsap.ticker.remove(raf);
      lenis?.destroy();
    };
  }, [reducedMotion]);

  return <>{children}</>;
}
