"use client";

import { Briefcase } from "lucide-react";
import type { Experience as ExperienceItem } from "@/lib/api";
import { SectionHeading } from "./About";
import { useSpotlight } from "./useSpotlight";

export default function Experience({ experience }: { experience: ExperienceItem[] }) {
  return (
    <section id="experience" className="px-5 sm:px-8 py-20 sm:py-28">
      <div className="mx-auto max-w-6xl">
        <SectionHeading
          eyebrow="Pengalaman"
          title="Perjalanan karier"
          subtitle="Disusun dari posisi terbaru ke yang paling lama."
        />

        {/* Timeline Container */}
        <div className="relative mt-14">
          {/* Continuous vertical line */}
          <div className="absolute left-4 top-4 bottom-0 w-px bg-gradient-to-b from-accent/50 via-accent/20 to-transparent" />

          <div className="space-y-12 sm:space-y-14">
            {experience.map((exp) => (
              <TimelineItem key={exp.id} exp={exp} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function TimelineItem({ exp }: { exp: ExperienceItem }) {
  const { onMouseMove } = useSpotlight();
  const { role, company, period, description, highlights } = exp;

  return (
    <div className="relative pl-12 sm:pl-14">
      {/* Timeline Dot with Glow */}
      <div className="absolute left-0 top-0">
        {/* Glow ring */}
        <div className="absolute -inset-1.5 rounded-full bg-accent/20 blur-md" />
        {/* Dot circle */}
        <div className="relative size-8 rounded-full bg-ink border-2 border-accent flex items-center justify-center shadow-lg shadow-accent/25">
          <Briefcase className="size-3.5 text-accent" />
        </div>
      </div>

      {/* Period Badge */}
      <div className="mb-3 pt-0.5">
        <span className="inline-flex items-center rounded-full bg-accent/10 border border-accent/25 px-3 py-1 text-xs font-semibold text-accent">
          {period}
        </span>
      </div>

      {/* Experience Card */}
      <div
        onMouseMove={onMouseMove}
        className="spotlight glass glass-hover rounded-2xl p-6 sm:p-7"
      >
        <h3 className="font-display text-lg font-bold text-fog">
          {role}
        </h3>
        <p className="mt-1.5 text-sm font-medium text-accent/80">
          {company}
        </p>

        <p className="mt-3 text-sm text-fog-muted leading-relaxed max-w-2xl text-justify">
          {description}
        </p>

        <ul className="mt-4 space-y-2">
          {highlights.map((h) => (
            <li key={h} className="text-sm text-fog-muted flex gap-2.5 max-w-2xl">
              <span className="text-accent mt-0.5 shrink-0">▸</span>
              <span>{h}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
