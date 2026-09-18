import Image from 'next/image';
import Link from 'next/link';
import { Reveal } from '@/components/ui/Reveal';
import { SectionLabel } from '@/components/ui/SectionLabel';
import { ArrowButton } from '@/components/ui/ArrowButton';
import { YALA } from '@/lib/data';

export function YalaRide() {
  return (
    <section id="yalaride" data-name="YalaRide" className="relative overflow-hidden bg-dark text-ink">
      <div
        className="pointer-events-none absolute inset-0 opacity-30"
        style={{
          background:
            'radial-gradient(ellipse 60% 50% at 20% 30%, rgba(27,79,216,0.45), transparent 55%), radial-gradient(ellipse 40% 40% at 90% 80%, rgba(168,137,98,0.2), transparent 50%)',
        }}
        aria-hidden
      />

      <div className="shell relative z-10 py-28 lg:py-40">
        <Reveal variant="fade">
          <SectionLabel className="!text-line-soft [&_span]:!bg-yala">{YALA.label}</SectionLabel>
        </Reveal>

        <Reveal variant="up" className="mt-8 block">
          <h2 className="max-w-4xl font-display text-display-sm uppercase tracking-display text-ink">
            {YALA.heading[0]}
            <br />
            <span className="text-yala">{YALA.heading[1]}</span>
          </h2>
        </Reveal>

        <div className="mt-16 grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          <Reveal variant="up">
            <p className="text-base leading-relaxed text-line-soft lg:text-lg">{YALA.lead}</p>
            <p className="mt-6 text-sm leading-relaxed text-muted-light">{YALA.built}</p>
            <div className="mt-10">
              <ArrowButton href={YALA.url} variant="yala" external>
                Visit YalaRide
              </ArrowButton>
            </div>
          </Reveal>

          <Reveal variant="scale" delay={0.1}>
            <Link
              href={YALA.url}
              target="_blank"
              rel="noreferrer"
              className="relative block aspect-[4/5] overflow-hidden rounded-2xl"
            >
              <Image
                src={YALA.image}
                alt="YalaRide app"
                fill
                sizes="(min-width: 1200px) 40vw, 100vw"
                className="object-cover"
              />
            </Link>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
