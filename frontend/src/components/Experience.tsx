"use client";

import { experience } from "@/data/content";
import { SectionHeading } from "./About";
import { useSpotlight } from "./useSpotlight";

export default function Experience() {
  return (
    <section id="experience" className="px-5 sm:px-8 py-20 sm:py-28">
      <div className="mx-auto max-w-6xl">
        <SectionHeading
          eyebrow="Pengalaman"
          title="Perjalanan karier"
          subtitle="Disusun dari posisi terbaru ke yang paling lama."
        />

        <div className="mt-12 space-y-5">
          {experience.map((exp) => (
            <ExperienceCard key={exp.id} {...exp} />
          ))}
        </div>
      </div>
    </section>
  );
}

function ExperienceCard({
  role,
  company,
  period,
  description,
  highlights,
}: {
  role: string;
  company: string;
  period: string;
  description: string;
  highlights: string[];
}) {
  const spotlight = useSpotlight<HTMLDivElement>();
  return (
    <div
      ref={spotlight.ref}
      onMouseMove={spotlight.onMouseMove}
      className="spotlight glass glass-hover rounded-2xl p-6 sm:p-7"
    >
      <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-1">
        <h3 className="font-display text-lg font-bold text-fog">
          {role}{" "}
          <span className="text-fog-muted font-medium">— {company}</span>
        </h3>
        <span className="inline-flex items-center rounded-full bg-accent/10 border border-accent/25 px-3 py-1 text-xs font-semibold text-accent shrink-0">
          {period}
        </span>
      </div>

      <p className="mt-3 text-sm text-fog-muted leading-relaxed max-w-2xl text-justify">
        {description}
      </p>

      <ul className="mt-3 space-y-1.5">
        {highlights.map((h) => (
          <li key={h} className="text-sm text-fog-muted flex gap-2 max-w-2xl">
            <span className="text-warm mt-1 shrink-0">▸</span>
            <span>{h}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
