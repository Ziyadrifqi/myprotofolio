import { experience } from "@/data/content";
import { SectionHeading } from "./About";

export default function Experience() {
  return (
    <section
      id="experience"
      className="px-5 sm:px-8 py-20 sm:py-28 bg-ink-panel/40"
    >
      <div className="mx-auto max-w-6xl">
        <SectionHeading
          tag="~/experience"
          title="Pengalaman kerja"
          subtitle="Perjalanan karier saya sejauh ini, disusun dari yang terbaru."
        />

        <div className="mt-12 relative">
          <div className="absolute left-[7px] top-2 bottom-2 w-px bg-ink-border sm:left-[7px]" />

          <ol className="space-y-10">
            {experience.map((exp) => (
              <li key={exp.id} className="relative pl-8">
                <span className="absolute left-0 top-1.5 size-3.5 rounded-full bg-ink border-2 border-accent" />

                <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-1">
                  <h3 className="font-display text-lg font-semibold text-fog">
                    {exp.role}{" "}
                    <span className="text-fog-muted font-normal">
                      — {exp.company}
                    </span>
                  </h3>
                  <span className="font-mono text-xs text-mint shrink-0">
                    {exp.period}
                  </span>
                </div>

                <p className="mt-2 text-sm text-fog-muted leading-relaxed max-w-2xl">
                  {exp.description}
                </p>

                <ul className="mt-3 space-y-1.5">
                  {exp.highlights.map((h) => (
                    <li
                      key={h}
                      className="text-sm text-fog-muted flex gap-2 max-w-2xl"
                    >
                      <span className="text-accent font-mono mt-0.5">›</span>
                      <span>{h}</span>
                    </li>
                  ))}
                </ul>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
