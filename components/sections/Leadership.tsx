'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Reveal } from '@/components/ui/Reveal';
import { SectionLabel } from '@/components/ui/SectionLabel';
import { SplitText } from '@/components/ui/SplitText';
import { LEADERSHIP, QUOTE_PRIMARY, STATS } from '@/lib/data';
import { useReducedMotion } from '@/hooks/useReducedMotion';

function Stat({ value, suffix, label }: { value: number; suffix: string; label: string }) {
  const numRef = useRef<HTMLSpanElement>(null);
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    const el = numRef.current;
    if (!el) return;

    if (reducedMotion) {
      el.textContent = `${value}${suffix}`;
      return;
    }

    gsap.registerPlugin(ScrollTrigger);
    const obj = { n: 0 };
    const tween = gsap.to(obj, {
      n: value,
      duration: 1.4,
      ease: 'power2.out',
      scrollTrigger: {
        trigger: el,
        start: 'top 90%',
        toggleActions: 'play none none none',
      },
      onUpdate: () => {
        el.textContent = `${Math.round(obj.n)}${suffix}`;
      },
    });

    return () => {
      tween.scrollTrigger?.kill();
      tween.kill();
    };
  }, [value, suffix, reducedMotion]);

  return (
    <div>
      <p className="font-display text-display-sm tracking-display text-paper">
        <span ref={numRef}>0{suffix}</span>
      </p>
      <p className="mt-2 text-xs uppercase tracking-widest text-muted">{label}</p>
    </div>
  );
}

export function Leadership() {
  return (
    <section id="leadership" data-name="Leadership" className="shell py-28 lg:py-40">
      <Reveal variant="fade">
        <SectionLabel>{LEADERSHIP.label}</SectionLabel>
      </Reveal>

      <SplitText as="h2" text={LEADERSHIP.heading} className="mt-8 text-display-sm tracking-wide" />

      <div className="mt-12 grid gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:gap-20">
        <Reveal variant="up">
          <p className="max-w-xl text-base leading-relaxed text-muted lg:text-lg">{LEADERSHIP.body}</p>
          <blockquote className="mt-10 border-l-2 border-accent pl-6 font-display text-xl leading-snug tracking-display text-paper lg:text-2xl">
            “{LEADERSHIP.quote}”
          </blockquote>
        </Reveal>

        <Reveal variant="up" delay={0.1}>
          <ul className="flex flex-wrap gap-3">
            {LEADERSHIP.principles.map((p) => (
              <li
                key={p}
                className="rounded-full border border-line px-5 py-2.5 text-xs uppercase tracking-wider text-paper"
              >
                {p}
              </li>
            ))}
          </ul>
          <p className="mt-10 text-sm leading-relaxed text-muted">{QUOTE_PRIMARY}</p>
        </Reveal>
      </div>

      <div className="mt-20 grid gap-10 border-t border-line pt-16 sm:grid-cols-3">
        {STATS.map((stat) => (
          <Stat key={stat.label} {...stat} />
        ))}
      </div>
    </section>
  );
}
