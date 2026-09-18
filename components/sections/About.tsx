import { Reveal } from '@/components/ui/Reveal';
import { SectionLabel } from '@/components/ui/SectionLabel';
import { ABOUT } from '@/lib/data';

export function About() {
  return (
    <section id="about" data-name="About" className="relative overflow-hidden bg-ink">
      <div
        className="pointer-events-none absolute inset-0 opacity-40"
        style={{
          background:
            'radial-gradient(ellipse 70% 50% at 85% 20%, rgba(168,137,98,0.18), transparent 60%), linear-gradient(135deg, #f5f2eb 0%, #ebe4d8 45%, #f5f2eb 100%)',
        }}
        aria-hidden
      />
      <div
        className="pointer-events-none absolute inset-x-0 bottom-0 h-1/3"
        style={{
          background: 'linear-gradient(to bottom, transparent, #f5f2eb)',
        }}
        aria-hidden
      />

      <div className="shell relative z-10 py-28 lg:py-40">
        <Reveal variant="fade">
          <SectionLabel>{ABOUT.label}</SectionLabel>
        </Reveal>

        <Reveal variant="up" className="mt-10 block">
          <p className="max-w-5xl font-display text-display-sm uppercase leading-[1.05] tracking-display">
            <span className="text-paper">{ABOUT.statementStrong}</span>
            <span className="text-muted">{ABOUT.statementMuted}</span>
          </p>
        </Reveal>
      </div>
    </section>
  );
}
