import Image from 'next/image';
import Link from 'next/link';
import { Reveal } from '@/components/ui/Reveal';
import { BRAND, CTA as CTA_CONTENT } from '@/lib/data';

export function CTA() {
  return (
    <section
      id="contact"
      data-name="Contact"
      className="relative flex min-h-[80vh] flex-col justify-center overflow-hidden bg-ink py-24 lg:py-36"
    >
      <div className="pointer-events-none absolute inset-y-0 right-0 z-0 w-full overflow-hidden sm:w-[55%] lg:w-[45%]">
        <Image
          src={CTA_CONTENT.image}
          alt={BRAND.name}
          fill
          sizes="(min-width: 1024px) 45vw, 100vw"
          className="object-cover object-[center_15%] opacity-90"
        />
        <div
          className="absolute inset-0"
          style={{
            background:
              'linear-gradient(to right, #f5f2eb 0%, rgba(245,242,235,0.75) 28%, transparent 65%), linear-gradient(to top, #f5f2eb 0%, transparent 22%, transparent 80%, #f5f2eb 100%)',
          }}
          aria-hidden
        />
      </div>

      <div className="shell relative z-10 grid grid-cols-1 gap-12 lg:grid-cols-12 lg:items-center">
        <div className="lg:col-span-7 xl:col-span-8">
          <Reveal variant="up">
            <h2 className="font-display text-[3.5rem] uppercase leading-[0.92] tracking-display text-paper sm:text-[5.5rem] lg:text-[7rem] xl:text-[8.25rem]">
              <div className="mb-2 lg:mb-3">{CTA_CONTENT.headingLine1}</div>
              <div className="text-accent">{CTA_CONTENT.headingLine2}</div>
            </h2>
          </Reveal>
        </div>

        <div className="flex flex-col items-start space-y-8 lg:col-span-4 lg:pl-6">
          <Reveal variant="up" delay={0.1}>
            <p className="max-w-sm font-sans text-sm leading-relaxed text-muted sm:text-base lg:text-lg">
              {CTA_CONTENT.blurb}
            </p>
          </Reveal>

          <Reveal variant="fade" delay={0.2}>
            <div className="flex flex-col gap-3">
              <Link
                href={`mailto:${BRAND.email}`}
                className="group inline-flex items-center justify-center rounded-full border border-accent px-10 py-4 text-xs font-bold uppercase tracking-widest text-accent transition-colors duration-300 hover:bg-accent hover:text-ink"
              >
                {CTA_CONTENT.buttonLabel}
              </Link>
              <a
                href={`tel:${BRAND.phone.replace(/\D/g, '')}`}
                className="text-sm text-muted transition-colors hover:text-accent"
              >
                {BRAND.phone}
              </a>
              <a
                href={`mailto:${BRAND.email}`}
                className="text-sm text-muted transition-colors hover:text-accent"
              >
                {BRAND.email}
              </a>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
