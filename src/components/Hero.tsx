"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { ArrowDown, Circle, Mail } from "lucide-react";
import { profile } from "@/data/content";
import { GithubIcon, LinkedinIcon } from "./icons";

const COMMAND = "whoami --role --stack";
const TYPE_SPEED = 55;

export default function Hero() {
  const [typed, setTyped] = useState("");
  const [showOutput, setShowOutput] = useState(false);

  useEffect(() => {
    let i = 0;
    const interval = setInterval(() => {
      i += 1;
      setTyped(COMMAND.slice(0, i));
      if (i >= COMMAND.length) {
        clearInterval(interval);
        setTimeout(() => setShowOutput(true), 300);
      }
    }, TYPE_SPEED);
    return () => clearInterval(interval);
  }, []);

  return (
    <section
      id="home"
      className="relative pt-32 pb-20 sm:pt-40 sm:pb-28 px-5 sm:px-8 overflow-hidden"
    >
      {/* Ambient grid backdrop */}
      <div
        className="absolute inset-0 -z-10 opacity-[0.07]"
        style={{
          backgroundImage:
            "linear-gradient(var(--ink-border) 1px, transparent 1px), linear-gradient(90deg, var(--ink-border) 1px, transparent 1px)",
          backgroundSize: "44px 44px",
        }}
      />

      <div className="mx-auto max-w-6xl grid lg:grid-cols-[1.1fr_0.9fr] gap-12 lg:gap-16 items-center">
        {/* Left: copy */}
        <div>
          <div className="mb-6 relative size-20 sm:size-24">
            <div className="absolute inset-0 rounded-full bg-gradient-to-br from-accent to-transparent opacity-40 blur-md" />
            <Image
              src={profile.photo}
              alt={profile.name}
              fill
              sizes="96px"
              className="relative rounded-full object-cover border-2 border-accent/50"
              priority
            />
          </div>

          {profile.availableForWork && (
            <div className="inline-flex items-center gap-2 rounded-full border border-mint/30 bg-mint/10 px-3 py-1 font-mono text-xs text-mint mb-6">
              <Circle className="size-2 fill-mint text-mint animate-pulse" />
              Tersedia untuk proyek baru
            </div>
          )}

          <p className="font-mono text-sm text-accent mb-3">
            ~/portfolio/{profile.role.toLowerCase().replace(/\s+/g, "-")}
          </p>

          <h1 className="font-display text-4xl sm:text-5xl lg:text-[3.4rem] font-semibold leading-[1.08] tracking-tight text-fog">
            {profile.name}
          </h1>

          <p className="mt-4 text-lg sm:text-xl text-fog-muted font-medium">
            {profile.role}
          </p>

          <p className="mt-5 max-w-xl text-[15px] sm:text-base text-fog-muted leading-relaxed">
            {profile.tagline}
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-3">
            <a
              href="#projects"
              className="inline-flex items-center gap-2 rounded-md bg-accent px-5 py-3 font-mono text-sm font-medium text-ink hover:bg-accent/90 transition-colors"
            >
              Lihat proyek
            </a>
            <a
              href={profile.cvUrl}
              className="inline-flex items-center gap-2 rounded-md border border-ink-border px-5 py-3 font-mono text-sm text-fog hover:border-accent/50 hover:text-accent transition-colors"
            >
              Unduh CV
            </a>
          </div>

          <div className="mt-8 flex items-center gap-4">
            <a
              href={profile.github}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub"
              className="text-fog-muted hover:text-accent transition-colors"
            >
              <GithubIcon className="size-5" />
            </a>
            <a
              href={profile.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
              className="text-fog-muted hover:text-accent transition-colors"
            >
              <LinkedinIcon className="size-5" />
            </a>
            <a
              href={`mailto:${profile.email}`}
              aria-label="Email"
              className="text-fog-muted hover:text-accent transition-colors"
            >
              <Mail className="size-5" />
            </a>
          </div>
        </div>

        {/* Right: signature terminal window */}
        <div className="animate-float-slow">
          <div className="rounded-xl border border-ink-border bg-ink-panel shadow-2xl shadow-black/40 overflow-hidden">
            <div className="flex items-center gap-2 px-4 py-3 border-b border-ink-border bg-ink-panel-light">
              <span className="size-3 rounded-full bg-[#ff5f57]" />
              <span className="size-3 rounded-full bg-[#febc2e]" />
              <span className="size-3 rounded-full bg-[#28c840]" />
              <span className="ml-3 font-mono text-xs text-fog-muted">
                ziyad@portfolio — zsh
              </span>
              <div className="ml-auto relative size-6 shrink-0">
                <Image
                  src={profile.photo}
                  alt={profile.name}
                  fill
                  sizes="24px"
                  className="rounded-full object-cover border border-accent/40"
                />
              </div>
            </div>

            <div className="p-5 sm:p-6 font-mono text-[13px] sm:text-sm leading-relaxed min-h-[260px]">
              <p className="text-fog-muted">
                <span className="text-mint">➜</span>{" "}
                <span className="text-accent">~</span> {typed}
                <span className="cursor-blink">▌</span>
              </p>

              {showOutput && (
                <div className="mt-4 space-y-2 animate-[fadeIn_0.4s_ease]">
                  <Row label="name" value={profile.name} />
                  <Row label="role" value={profile.role} />
                  <Row label="location" value={profile.location} />
                  <Row
                    label="stack"
                    value="Next.js · Node.js · PostgreSQL"
                  />
                  <Row
                    label="status"
                    value="available"
                    valueClass="text-mint"
                  />
                  <p className="pt-3 text-fog-muted">
                    <span className="text-mint">➜</span>{" "}
                    <span className="text-accent">~</span>{" "}
                    <span className="cursor-blink">▌</span>
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      <a
        href="#about"
        aria-label="Gulir ke bawah"
        className="hidden sm:flex absolute bottom-8 left-1/2 -translate-x-1/2 flex-col items-center gap-2 text-fog-muted hover:text-accent transition-colors"
      >
        <span className="font-mono text-[11px]">scroll</span>
        <ArrowDown className="size-4 animate-bounce" />
      </a>
    </section>
  );
}

function Row({
  label,
  value,
  valueClass = "text-fog",
}: {
  label: string;
  value: string;
  valueClass?: string;
}) {
  return (
    <p>
      <span className="text-fog-muted">{label}:</span>{" "}
      <span className={valueClass}>{value}</span>
    </p>
  );
}
