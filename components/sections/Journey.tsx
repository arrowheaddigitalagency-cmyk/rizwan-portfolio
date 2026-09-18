import { Reveal } from '@/components/ui/Reveal';
import { SectionLabel } from '@/components/ui/SectionLabel';
import { SplitText } from '@/components/ui/SplitText';
import { JOURNEY } from '@/lib/data';

export function Journey() {
  return (
    <section id="journey" data-name="Journey" className="border-t border-line bg-surface">
      <div className="shell py-28 lg:py-40">
        <Reveal variant="fade">
          <SectionLabel>(JOURNEY)</SectionLabel>
        </Reveal>
        <SplitText
          as="h2"
          text="Three chapters. One path."
          className="mt-8 text-display-sm tracking-wide"
        />

        <ol className="mt-16 grid gap-12 lg:grid-cols-3 lg:gap-10">
          {JOURNEY.map((step, i) => (
            <Reveal key={step.index} variant="up" delay={i * 0.08} as="li" className="relative">
              <span className="font-display text-5xl text-accent/40">{step.index}</span>
              <p className="mt-4 text-xs uppercase tracking-widest text-accent">{step.place}</p>
              <h3 className="mt-2 font-display text-2xl uppercase tracking-display text-paper">
                {step.title}
              </h3>
              <p className="mt-4 text-sm leading-relaxed text-muted">{step.body}</p>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  );
}
