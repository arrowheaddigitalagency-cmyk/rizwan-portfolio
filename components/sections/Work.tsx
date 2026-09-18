'use client';

import { useEffect, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SplitText } from '@/components/ui/SplitText';
import { PROJECTS, type Project } from '@/lib/data';
import { useReducedMotion } from '@/hooks/useReducedMotion';

function ProjectCardItem({ project }: { project: Project }) {
  const cardRef = useRef<HTMLDivElement>(null);
  const frameRef = useRef<HTMLDivElement>(null);
  const imageInnerRef = useRef<HTMLDivElement>(null);
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    if (reducedMotion) return;
    gsap.registerPlugin(ScrollTrigger);

    const frame = frameRef.current;
    const card = cardRef.current;
    const img = imageInnerRef.current;
    if (!frame || !card || !img) return;

    const ctx = gsap.context(() => {
      const isSmallScreen = window.innerWidth < 640;
      gsap.set(frame, {
        clipPath: isSmallScreen
          ? 'inset(6% 4% 6% 4% round 12px)'
          : 'inset(14% 9% 14% 9% round 20px)',
        scale: isSmallScreen ? 0.96 : 0.92,
      });

      gsap.to(frame, {
        clipPath: 'inset(0% 0% 0% 0% round 16px)',
        scale: 1,
        ease: 'power1.inOut',
        scrollTrigger: {
          trigger: card,
          start: 'top 92%',
          end: 'center 30%',
          scrub: 1.8,
          invalidateOnRefresh: true,
        },
      });

      gsap.fromTo(
        img,
        { scale: 1.18 },
        {
          scale: 1,
          ease: 'power1.inOut',
          scrollTrigger: {
            trigger: card,
            start: 'top 92%',
            end: 'center 30%',
            scrub: 1.8,
          },
        },
      );
    }, card);

    return () => ctx.revert();
  }, [reducedMotion]);

  const media = (
    <div className="grid gap-8 lg:grid-cols-[1fr_0.55fr] lg:items-center">
      <div
        ref={frameRef}
        className="relative aspect-[1604/1340] overflow-hidden rounded-2xl bg-surface"
      >
        <div ref={imageInnerRef} className="relative h-full w-full">
          <Image
            src={project.image}
            alt={project.title}
            fill
            sizes="(min-width: 1200px) 65vw, 100vw"
            className="object-cover transition-transform duration-700 ease-framer group-hover:scale-[1.03]"
          />
        </div>
      </div>

      <div>
        <span className="font-display text-5xl text-line-soft transition-colors duration-300 group-hover:text-accent">
          {project.index}
        </span>
        <h3 className="mt-4 font-display text-4xl uppercase tracking-display text-paper transition-colors duration-300 group-hover:text-accent lg:text-5xl">
          {project.title}
        </h3>
        <p className="mt-4 max-w-sm text-sm leading-relaxed text-muted">{project.blurb}</p>
        <div className="mt-6">
          <span className="rounded-full border border-line px-3 py-1 text-[11px] uppercase tracking-wider text-muted-light">
            {project.tag}
          </span>
        </div>
      </div>
    </div>
  );

  return (
    <div ref={cardRef} className="group block">
      {project.href ? (
        <Link href={project.href} target="_blank" rel="noreferrer" className="block">
          {media}
        </Link>
      ) : (
        media
      )}
    </div>
  );
}

export function Work() {
  return (
    <section id="work" data-name="Experience" className="shell py-28 lg:py-40">
      <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
        <SplitText as="h2" text="Experience" className="text-display-md tracking-wide" stagger={0.025} />
        <span className="eyebrow">({String(PROJECTS.length).padStart(2, '0')})</span>
      </div>

      <div className="mt-16 flex flex-col gap-20 lg:gap-28">
        {PROJECTS.map((project) => (
          <ProjectCardItem key={project.title} project={project} />
        ))}
      </div>
    </section>
  );
}
