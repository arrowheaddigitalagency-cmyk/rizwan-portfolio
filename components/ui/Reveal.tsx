'use client';

import { useEffect, useRef, type ReactNode } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useReducedMotion } from '@/hooks/useReducedMotion';

type Variant = 'up' | 'scale' | 'fade';
type TagName = 'div' | 'li' | 'section' | 'span' | 'p' | 'article';

export function Reveal({
  children,
  as: Tag = 'div',
  variant = 'up',
  delay = 0,
  duration = 0.9,
  className,
}: {
  children: ReactNode;
  as?: TagName;
  variant?: Variant;
  delay?: number;
  duration?: number;
  className?: string;
}) {
  const ref = useRef<HTMLElement>(null);
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const el = ref.current;
    if (!el) return;

    if (reducedMotion) {
      gsap.set(el, { opacity: 1, y: 0, scale: 1 });
      return;
    }

    const from =
      variant === 'up'
        ? { opacity: 0.001, y: 48 }
        : variant === 'scale'
          ? { opacity: 0.001, scale: 0.94 }
          : { opacity: 0.001 };

    const tween = gsap.fromTo(el, from, {
      opacity: 1,
      y: 0,
      scale: 1,
      duration,
      delay,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: el,
        start: 'top 90%',
        toggleActions: 'play none none none',
      },
    });

    return () => {
      tween.scrollTrigger?.kill();
      tween.kill();
    };
  }, [variant, delay, duration, reducedMotion]);

  const Component = Tag as 'div';

  return (
    <Component ref={ref as React.RefObject<HTMLDivElement>} className={className}>
      {children}
    </Component>
  );
}
