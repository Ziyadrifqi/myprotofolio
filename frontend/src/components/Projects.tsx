"use client";

import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { projects } from "@/data/content";
import { SectionHeading } from "./About";
import { GithubIcon } from "./icons";
import { useSpotlight } from "./useSpotlight";

export default function Projects() {
  return (
    <section id="projects" className="px-5 sm:px-8 py-20 sm:py-28">
      <div className="mx-auto max-w-6xl">
        <SectionHeading
          eyebrow="Proyek"
          title="Proyek pilihan"
          subtitle="Sebagian proyek yang pernah saya kerjakan, dari sistem internal sampai eksperimen pribadi."
        />

        <div className="mt-10 grid sm:grid-cols-2 gap-6">
          {projects.map((p) => (
            <ProjectCard key={p.id} {...p} />
          ))}
        </div>
      </div>
    </section>
  );
}

function ProjectCard({
  title,
  description,
  tech,
  image,
  href,
  repo,
}: {
  title: string;
  description: string;
  tech: string[];
  image: string;
  href?: string | null;
  repo?: string | null;
}) {
  const spotlight = useSpotlight<HTMLDivElement>();
  const hasLinks = Boolean(href || repo);

  return (
    <article
      ref={spotlight.ref}
      onMouseMove={spotlight.onMouseMove}
      className="spotlight glass glass-hover rounded-2xl overflow-hidden"
    >
      <div className="relative aspect-[16/10] w-full overflow-hidden">
        <Image
          src={image}
          alt={`Tampilan proyek ${title}`}
          fill
          sizes="(max-width: 640px) 100vw, 50vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-ink-panel/80 via-transparent to-transparent" />
      </div>

      <div className="p-6">
        <div className="flex items-start justify-between gap-3">
          <h3 className="font-display text-lg font-bold text-fog">
            {title}
          </h3>

          {hasLinks && (
            <div className="flex items-center gap-2.5 shrink-0">
              {repo && (
                <a
                  href={repo}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`Repository ${title}`}
                  className="size-8 rounded-full bg-white/[0.04] border border-white/[0.08] flex items-center justify-center text-fog-muted hover:text-accent hover:border-accent/30 transition-colors"
                >
                  <GithubIcon className="size-3.5" />
                </a>
              )}
              {href && (
                <a
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`Buka ${title}`}
                  className="size-8 rounded-full bg-white/[0.04] border border-white/[0.08] flex items-center justify-center text-fog-muted hover:text-accent hover:border-accent/30 transition-colors"
                >
                  <ArrowUpRight className="size-3.5" />
                </a>
              )}
            </div>
          )}
        </div>

        <p className="mt-2 text-sm text-fog-muted leading-relaxed text-justify">
          {description}
        </p>

        <div className="mt-4 flex flex-wrap gap-2">
          {tech.map((t) => (
            <span
              key={t}
              className="text-[11px] font-medium text-fog-muted bg-white/[0.04] border border-white/[0.08] rounded-full px-2.5 py-1"
            >
              {t}
            </span>
          ))}
        </div>
      </div>
    </article>
  );
}
