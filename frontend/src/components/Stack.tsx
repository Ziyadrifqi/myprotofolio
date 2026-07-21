"use client";

import type { StackGroup } from "@/lib/api";
import { SectionHeading } from "./About";
import { useSpotlight } from "./useSpotlight";

export default function Stack({ stack }: { stack: StackGroup[] }) {
  return (
    <section id="stack" className="px-5 sm:px-8 py-20 sm:py-28">
      <div className="mx-auto max-w-6xl">
        <SectionHeading
         eyebrow="Keahlian"
title="Teknologi yang saya gunakan"
subtitle="Berbagai tools dan teknologi yang saya manfaatkan untuk mengembangkan aplikasi web modern, mulai dari backend hingga frontend."
        />

        <div className="mt-10 grid sm:grid-cols-2 gap-5">
          {stack.map((s) => (
            <StackCard key={s.group} {...s} />
          ))}
        </div>
      </div>
    </section>
  );
}

function StackCard({
  group,
  tools,
  proficiency,
}: {
  group: string;
  tools: string[];
  proficiency: number;
}) {
  const spotlight = useSpotlight<HTMLDivElement>();
  return (
    <div
      ref={spotlight.ref}
      onMouseMove={spotlight.onMouseMove}
      className="spotlight glass glass-hover rounded-2xl p-6"
    >
      <div className="flex items-center justify-between">
        <h3 className="font-display font-bold text-fog">{group}</h3>
        <span className="text-xs font-bold text-accent">{proficiency}%</span>
      </div>

      <div className="mt-3 h-2 w-full rounded-full bg-white/5 overflow-hidden">
        <div
          className="h-full rounded-full bg-gradient-to-r from-accent to-warm transition-all duration-700"
          style={{ width: `${proficiency}%` }}
        />
      </div>

      <div className="mt-4 flex flex-wrap gap-2">
        {tools.map((tool) => (
          <span
            key={tool}
            className="rounded-full bg-white/[0.04] border border-white/[0.08] px-3 py-1 text-xs text-fog-muted"
          >
            {tool}
          </span>
        ))}
      </div>
    </div>
  );
}
