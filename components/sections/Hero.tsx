'use client';

import { useEffect, useLayoutEffect, useRef } from 'react';
import Image from 'next/image';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useReducedMotion } from '@/hooks/useReducedMotion';
import { BRAND, HERO } from '@/lib/data';

const MARK_LEADING = 0.78;
const MARK_FILL = 0.72;

export function Hero() {
  const rootRef = useRef<HTMLDivElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const markRef = useRef<HTMLAnchorElement>(null);
  const markInnerRef = useRef<HTMLSpanElement>(null);
  const reducedMotion = useReducedMotion();

  useLayoutEffect(() => {
    const root = rootRef.current;
    const mark = markRef.current;
    const inner = markInnerRef.current;
    if (!root || !mark || !inner) return;

    const measure = () => {
      const padX = mark.getBoundingClientRect().left;
      const available = window.innerWidth - padX * 2;
      inner.style.fontSize = '100px';
      const naturalWidth = inner.getBoundingClientRect().width;
      inner.style.fontSize = '';

      if (naturalWidth <= 0 || available <= 0) return;

      const widthFit = ((available * MARK_FILL) / naturalWidth) * 100;
      const heightCap = (window.innerHeight * 0.22) / MARK_LEADING;
      root.style.setProperty('--mark-giant', `${Math.min(widthFit, heightCap)}px`);
    };

    measure();
    document.fonts?.ready.then(measure).catch(() => {});
    window.addEventListener('resize', measure);
    return () => window.removeEventListener('resize', measure);
  }, []);

  useEffect(() => {
    const root = rootRef.current;
    const stage = stageRef.current;
    if (!root || !stage) return;

    const setT = (value: number) => {
      root.style.setProperty('--hero-t', String(value));
      document.documentElement.style.setProperty(
        '--sm-logo-opacity',
        String(gsap.utils.clamp(0, 1, 1 - value * 6)),
      );
    };

    if (reducedMotion) {
      setT(0);
      return () => {
        document.documentElement.style.removeProperty('--sm-logo-opacity');
      };
    }

    gsap.registerPlugin(ScrollTrigger);
    setT(1);

    const trigger = ScrollTrigger.create({
      trigger: stage,
      start: 'top top',
      end: 'bottom top',
      scrub: 0.5,
      onUpdate: (self) => setT(1 - self.progress),
      onRefresh: (self) => setT(1 - self.progress),
    });

    return () => {
      trigger.kill();
      document.documentElement.style.removeProperty('--sm-logo-opacity');
    };
  }, [reducedMotion]);

  return (
    <div ref={rootRef} id="hero" data-name="Hero" className="hero-root">
      <div ref={stageRef} className="hero-stage">
        <div className="hero-pin">
          <div className="hero-backdrop">
            <Image
              src={HERO.image}
              alt={BRAND.name}
              fill
              priority
              sizes="100vw"
              className="hero-media object-cover object-[center_20%]"
            />
            <div className="hero-vignette" aria-hidden />
          </div>

          <a ref={markRef} href="#hero" className="hero-mark" aria-label={BRAND.name}>
            <span ref={markInnerRef} className="hero-mark-inner">
              {BRAND.wordmark}
            </span>
          </a>

          <div className="hero-content">
            <h1 className="hero-headline">
              <span className="block">{BRAND.headlineTop}</span>
              <span className="block text-accent">{BRAND.headlineBottom}</span>
            </h1>

            <p className="hero-statement">
              <span className="hero-statement-strong">{HERO.statementStrong}</span>{' '}
              <span className="hero-statement-muted">{HERO.statementMuted}</span>
            </p>

            <p className="mt-6 text-xs uppercase tracking-widest text-muted">{BRAND.title}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
