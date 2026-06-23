import { ArrowUpRight } from "lucide-react";
import { projects } from "@/data/content";
import { SectionHeading } from "./About";
import { GithubIcon } from "./icons";

export default function Projects() {
  return (
    <section id="projects" className="px-5 sm:px-8 py-20 sm:py-28">
      <div className="mx-auto max-w-6xl">
        <SectionHeading
          tag="~/projects"
          title="Proyek pilihan"
          subtitle="Sebagian proyek yang pernah saya kerjakan, dari sistem internal sampai produk yang dipakai publik."
        />

        <div className="mt-10 grid sm:grid-cols-2 gap-5">
          {projects.map((p) => (
            <article
              key={p.id}
              className="group rounded-xl border border-ink-border bg-ink-panel p-6 hover:border-accent/40 transition-colors"
            >
              <div className="flex items-start justify-between gap-3">
                <span
                  className={`font-mono text-[11px] px-2 py-1 rounded-full border ${
                    p.status === "Production"
                      ? "border-mint/30 text-mint bg-mint/10"
                      : "border-warn/30 text-warn bg-warn/10"
                  }`}
                >
                  {p.status}
                </span>
                <div className="flex items-center gap-3 shrink-0">
                  <a
                    href={p.repo}
                    aria-label={`Repository ${p.title}`}
                    className="text-fog-muted hover:text-accent transition-colors"
                  >
                    <GithubIcon className="size-4" />
                  </a>
                  <a
                    href={p.href}
                    aria-label={`Buka ${p.title}`}
                    className="text-fog-muted hover:text-accent transition-colors"
                  >
                    <ArrowUpRight className="size-4" />
                  </a>
                </div>
              </div>

              <h3 className="mt-4 font-display text-lg font-semibold text-fog group-hover:text-accent transition-colors">
                {p.title}
              </h3>
              <p className="mt-2 text-sm text-fog-muted leading-relaxed">
                {p.description}
              </p>

              <div className="mt-4 flex flex-wrap gap-2">
                {p.tech.map((t) => (
                  <span
                    key={t}
                    className="font-mono text-[11px] text-accent/80 bg-accent/5 border border-accent/15 rounded px-2 py-0.5"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
