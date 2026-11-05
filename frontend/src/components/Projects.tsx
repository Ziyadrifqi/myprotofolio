"use client";

import { useMemo, useState, useRef, useEffect, useCallback } from "react";
import Image from "next/image";
import { ArrowUpRight, ChevronLeft, ChevronRight, ExternalLink, Filter } from "lucide-react";
import type { Project } from "@/lib/api";
import { SectionHeading } from "./About";
import { GithubIcon } from "./icons";
import { useSpotlight } from "./useSpotlight";

export default function Projects({ projects }: { projects: Project[] }) {
  const [activeFilter, setActiveFilter] = useState<string>("Semua");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);
  const sliderRef = useRef<HTMLDivElement>(null);

  // Derive unique tech tags with counts
  const filterOptions = useMemo(() => {
    const techCounts = new Map<string, number>();
    projects.forEach((p) => {
      p.tech.forEach((t) => {
        techCounts.set(t, (techCounts.get(t) || 0) + 1);
      });
    });

    const sortedTechs = Array.from(techCounts.entries())
      .sort((a, b) => b[1] - a[1])
      .map(([tech]) => tech);

    return [
      { label: "Semua", count: projects.length },
      ...sortedTechs.map((tech) => ({
        label: tech,
        count: techCounts.get(tech) || 0,
      })),
    ];
  }, [projects]);

  // Filtered list based on active pill
  const filteredProjects = useMemo(() => {
    if (activeFilter === "Semua") return projects;
    return projects.filter((p) => p.tech.includes(activeFilter));
  }, [projects, activeFilter]);

  // Update scroll status & active dot
  const updateScrollStatus = useCallback(() => {
    const el = sliderRef.current;
    if (!el) return;

    const { scrollLeft, scrollWidth, clientWidth } = el;
    setCanScrollLeft(scrollLeft > 10);
    setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 10);

    // Calculate approximate active card index
    const cardWidth = el.firstElementChild?.clientWidth || clientWidth;
    const gap = 24; // 1.5rem (gap-6)
    const newIndex = Math.round(scrollLeft / (cardWidth + gap));
    setCurrentIndex(Math.min(Math.max(newIndex, 0), filteredProjects.length - 1));
  }, [filteredProjects.length]);

  useEffect(() => {
    const el = sliderRef.current;
    if (!el) return;

    updateScrollStatus();
    el.addEventListener("scroll", updateScrollStatus, { passive: true });
    window.addEventListener("resize", updateScrollStatus);

    return () => {
      el.removeEventListener("scroll", updateScrollStatus);
      window.removeEventListener("resize", updateScrollStatus);
    };
  }, [updateScrollStatus, filteredProjects]);

  function scroll(direction: "left" | "right") {
    const el = sliderRef.current;
    if (!el) return;

    const cardWidth = el.firstElementChild?.clientWidth || el.clientWidth;
    const gap = 24;
    const scrollAmount = cardWidth + gap;

    el.scrollBy({
      left: direction === "left" ? -scrollAmount : scrollAmount,
      behavior: "smooth",
    });
  }

  function scrollToIndex(index: number) {
    const el = sliderRef.current;
    if (!el) return;

    const cardWidth = el.firstElementChild?.clientWidth || el.clientWidth;
    const gap = 24;
    el.scrollTo({
      left: index * (cardWidth + gap),
      behavior: "smooth",
    });
  }

  function handleFilterChange(label: string) {
    setActiveFilter(label);
    if (sliderRef.current) {
      sliderRef.current.scrollTo({ left: 0, behavior: "smooth" });
    }
  }

  return (
    <section id="projects" className="px-5 sm:px-8 py-20 sm:py-28">
      <div className="mx-auto max-w-6xl">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
          <SectionHeading
            eyebrow="Proyek"
            title="Proyek pilihan"
            subtitle="Sebagian produk dan sistem yang pernah saya rancang dan kembangkan dari backend hingga antarmuka."
          />

          {/* Quick filter summary badge & slider buttons on desktop */}
          <div className="flex items-center gap-3 self-start md:self-auto">
            <div className="inline-flex items-center gap-2 rounded-full bg-white/[0.03] border border-white/[0.08] px-3.5 py-1.5 text-xs text-fog-muted">
              <Filter className="size-3.5 text-accent" />
              <span>
                Menampilkan{" "}
                <strong className="text-fog font-semibold">
                  {filteredProjects.length}
                </strong>{" "}
                proyek
              </span>
            </div>

            {/* Slider Navigation Arrows */}
            {filteredProjects.length > 1 && (
              <div className="hidden sm:flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => scroll("left")}
                  disabled={!canScrollLeft}
                  aria-label="Geser ke kiri"
                  className="size-9 rounded-full glass flex items-center justify-center text-fog hover:text-accent hover:border-accent/40 transition-all disabled:opacity-30 disabled:cursor-not-allowed disabled:hover:text-fog disabled:hover:border-white/[0.08]"
                >
                  <ChevronLeft className="size-4" />
                </button>
                <button
                  type="button"
                  onClick={() => scroll("right")}
                  disabled={!canScrollRight}
                  aria-label="Geser ke kanan"
                  className="size-9 rounded-full glass flex items-center justify-center text-fog hover:text-accent hover:border-accent/40 transition-all disabled:opacity-30 disabled:cursor-not-allowed disabled:hover:text-fog disabled:hover:border-white/[0.08]"
                >
                  <ChevronRight className="size-4" />
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Filter Pills Bar */}
        <div className="mt-8 flex flex-wrap items-center gap-2 pb-2">
          {filterOptions.map((opt) => {
            const isActive = activeFilter === opt.label;
            return (
              <button
                key={opt.label}
                type="button"
                onClick={() => handleFilterChange(opt.label)}
                className={`inline-flex items-center gap-1.5 rounded-full px-3.5 py-1.5 text-xs font-medium transition-all ${
                  isActive
                    ? "bg-gradient-to-r from-accent to-accent-soft text-ink font-semibold shadow-lg shadow-accent/25 scale-[1.02]"
                    : "bg-white/[0.04] border border-white/[0.08] text-fog-muted hover:text-fog hover:bg-white/[0.08]"
                }`}
              >
                <span>{opt.label}</span>
                <span
                  className={`text-[10px] rounded-full px-1.5 py-0.2 ${
                    isActive
                      ? "bg-ink/20 text-ink font-bold"
                      : "bg-white/[0.06] text-fog-muted"
                  }`}
                >
                  {opt.count}
                </span>
              </button>
            );
          })}
        </div>

        {/* Interactive Responsive Slider */}
        <div
          ref={sliderRef}
          className="mt-8 flex gap-6 overflow-x-auto pb-4 pt-1 snap-x snap-mandatory scroll-smooth no-scrollbar"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        >
          {filteredProjects.map((p) => (
            <div
              key={p.id}
              className="w-[88vw] sm:w-[calc(50%-12px)] lg:w-[calc(33.333%-16px)] shrink-0 snap-start flex flex-col"
            >
              <ProjectCard
                project={p}
                activeFilter={activeFilter}
                onSelectTag={(tag) => handleFilterChange(tag)}
              />
            </div>
          ))}
        </div>

        {/* Empty State */}
        {filteredProjects.length === 0 && (
          <div className="mt-12 text-center glass rounded-2xl p-10">
            <p className="text-fog font-semibold">
              Tidak ada proyek dengan teknologi &quot;{activeFilter}&quot;
            </p>
            <p className="text-xs text-fog-muted mt-1">
              Coba pilih filter lain atau klik &quot;Semua&quot; untuk melihat seluruh proyek.
            </p>
            <button
              type="button"
              onClick={() => handleFilterChange("Semua")}
              className="mt-4 inline-flex items-center gap-1.5 rounded-full bg-accent/15 border border-accent/30 text-accent px-4 py-2 text-xs font-semibold hover:bg-accent/25 transition-colors"
            >
              Reset ke Semua
            </button>
          </div>
        )}

        {/* Mobile Navigation Controls & Dot Indicators */}
        {filteredProjects.length > 1 && (
          <div className="mt-6 flex items-center justify-between sm:justify-center gap-4">
            {/* Mobile Prev Button */}
            <button
              type="button"
              onClick={() => scroll("left")}
              disabled={!canScrollLeft}
              aria-label="Geser ke kiri"
              className="sm:hidden size-9 rounded-full glass flex items-center justify-center text-fog hover:text-accent transition-all disabled:opacity-30 disabled:cursor-not-allowed"
            >
              <ChevronLeft className="size-4" />
            </button>

            {/* Pagination Dots */}
            <div className="flex items-center justify-center gap-2">
              {filteredProjects.map((p, idx) => (
                <button
                  key={p.id}
                  type="button"
                  onClick={() => scrollToIndex(idx)}
                  aria-label={`Lihat proyek ${idx + 1}`}
                  className={`h-2 rounded-full transition-all duration-300 ${
                    currentIndex === idx
                      ? "w-7 bg-gradient-to-r from-accent to-accent-soft shadow-sm shadow-accent/40"
                      : "w-2 bg-white/20 hover:bg-white/40"
                  }`}
                />
              ))}
            </div>

            {/* Mobile Next Button */}
            <button
              type="button"
              onClick={() => scroll("right")}
              disabled={!canScrollRight}
              aria-label="Geser ke kanan"
              className="sm:hidden size-9 rounded-full glass flex items-center justify-center text-fog hover:text-accent transition-all disabled:opacity-30 disabled:cursor-not-allowed"
            >
              <ChevronRight className="size-4" />
            </button>
          </div>
        )}
      </div>
    </section>
  );
}

function ProjectCard({
  project,
  activeFilter,
  onSelectTag,
}: {
  project: Project;
  activeFilter: string;
  onSelectTag: (tag: string) => void;
}) {
  const { title, description, tech, image, href, repo } = project;
  const { onMouseMove } = useSpotlight();
  const hasLinks = Boolean(href || repo);
  const primaryTech = tech[0] || "Web";

  return (
    <article
      onMouseMove={onMouseMove}
      className="group spotlight glass glass-hover rounded-2xl overflow-hidden flex flex-col justify-between border border-white/[0.08] hover:border-accent/40 transition-all duration-300 shadow-xl shadow-black/30"
    >
      <div>
        {/* Browser Mockup Top Bar */}
        <div className="flex items-center justify-between px-4 py-2.5 bg-ink-panel/80 border-b border-white/[0.06] backdrop-blur-md">
          {/* macOS 3 dots */}
          <div className="flex items-center gap-1.5">
            <span className="size-2.5 rounded-full bg-[#ff5f56]/80" />
            <span className="size-2.5 rounded-full bg-[#ffbd2e]/80" />
            <span className="size-2.5 rounded-full bg-[#27c93f]/80" />
          </div>

          {/* Mini Mockup Address Bar */}
          <div className="mx-2 max-w-[200px] truncate rounded-md bg-white/[0.03] border border-white/[0.06] px-2.5 py-0.5 text-[10px] font-mono text-fog-muted/70 text-center">
            app://{title.toLowerCase().replace(/[^a-z0-9]/g, "-")}.dev
          </div>

          {/* Header Action Icons */}
          <div className="flex items-center gap-1.5">
            {repo && (
              <a
                href={repo}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`Repository ${title}`}
                title="Lihat Repository GitHub"
                className="size-6 rounded-md flex items-center justify-center text-fog-muted hover:text-accent hover:bg-white/5 transition-colors"
              >
                <GithubIcon className="size-3.5" />
              </a>
            )}
            {href && (
              <a
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`Buka demo ${title}`}
                title="Buka Demo Langsung"
                className="size-6 rounded-md flex items-center justify-center text-fog-muted hover:text-accent hover:bg-white/5 transition-colors"
              >
                <ArrowUpRight className="size-3.5" />
              </a>
            )}
          </div>
        </div>

        {/* Project Image Container with Overlay */}
        <div className="relative aspect-[16/10] w-full overflow-hidden bg-ink-panel">
          <Image
            src={image}
            alt={`Tampilan proyek ${title}`}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
          />

          {/* Gradient Lighting */}
          <div className="absolute inset-0 bg-gradient-to-t from-ink-panel via-ink-panel/20 to-transparent opacity-80" />

          {/* Floating Category Badge */}
          <div className="absolute top-3 left-3">
            <span className="inline-flex items-center rounded-full bg-ink/80 backdrop-blur-md border border-white/10 px-2.5 py-1 text-[10px] font-semibold text-accent shadow-sm">
              {primaryTech}
            </span>
          </div>

          {/* Hover Quick Action Overlay */}
          {hasLinks && (
            <div className="absolute inset-0 bg-ink/60 backdrop-blur-[2px] opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-3">
              {href && (
                <a
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 rounded-full bg-gradient-to-r from-accent to-accent-soft px-4 py-2 text-xs font-semibold text-ink shadow-lg shadow-accent/30 hover:scale-105 transition-transform"
                >
                  <span>Buka Demo</span>
                  <ExternalLink className="size-3.5" />
                </a>
              )}
              {repo && (
                <a
                  href={repo}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 rounded-full glass px-4 py-2 text-xs font-semibold text-fog hover:border-accent/40 hover:text-accent hover:scale-105 transition-all"
                >
                  <GithubIcon className="size-3.5" />
                  <span>Kode Sumber</span>
                </a>
              )}
            </div>
          )}
        </div>

        {/* Project Content */}
        <div className="p-6">
          <h3 className="font-display text-lg sm:text-xl font-bold text-fog group-hover:text-accent transition-colors">
            {title}
          </h3>

          <p className="mt-2.5 text-sm text-fog-muted leading-relaxed line-clamp-3">
            {description}
          </p>
        </div>
      </div>

      {/* Card Footer: Tech Tags & Quick Action */}
      <div className="px-6 pb-6 pt-2">
        <div className="flex flex-wrap items-center gap-1.5 pt-3 border-t border-white/[0.06]">
          {tech.map((t) => {
            const isTagActive = activeFilter === t;
            return (
              <button
                key={t}
                type="button"
                onClick={() => onSelectTag(t)}
                title={`Filter proyek berdasarkan ${t}`}
                className={`text-[11px] font-medium rounded-full px-2.5 py-0.5 transition-all ${isTagActive
                    ? "bg-accent/25 text-accent border border-accent/40 font-semibold"
                    : "bg-white/[0.03] border border-white/[0.08] text-fog-muted hover:text-fog hover:border-accent/30"
                  }`}
              >
                {t}
              </button>
            );
          })}
        </div>
      </div>
    </article>
  );
}
