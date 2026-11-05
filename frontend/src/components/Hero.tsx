"use client";

import { useState } from "react";
import Image from "next/image";
import { ArrowRight, Check, Copy, Sparkles } from "lucide-react";
import type { Profile } from "@/lib/api";
import { GithubIcon, LinkedinIcon, WhatsAppIcon } from "./icons";
import { useSpotlight } from "./useSpotlight";

export default function Hero({ profile }: { profile: Profile }) {
  const { onMouseMove } = useSpotlight();
  const [copiedEmail, setCopiedEmail] = useState(false);

  function handleCopyEmail() {
    navigator.clipboard.writeText(profile.email);
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2000);
  }

  const waPhone = (profile.phone || "6281200000000").replace(/[^0-9]/g, "");
  const waUrl = `https://wa.me/${waPhone}?text=${encodeURIComponent(
    "Halo Ziyad, saya melihat portofolio Anda dan tertarik untuk berdiskusi tentang peluang proyek/kerja sama."
  )}`;

  return (
    <section
      id="home"
      className="relative pt-36 pb-20 sm:pt-44 sm:pb-28 px-5 sm:px-8 overflow-hidden"
    >
      <div className="mx-auto max-w-6xl grid lg:grid-cols-[1.05fr_0.95fr] gap-12 lg:gap-16 items-center">
        {/* Left: copy */}
        <div className="animate-fade-up">
          <div className="pill-border inline-flex items-center gap-2 rounded-full bg-ink-panel/60 px-4 py-1.5 text-xs font-semibold text-fog mb-6">
            <Sparkles className="size-3.5 text-warm" />
            {profile.availableForWork ? "Tersedia untuk proyek baru" : profile.role}
          </div>

          <h1 className="font-display text-[2.6rem] sm:text-5xl lg:text-[3.6rem] font-extrabold leading-[1.05] tracking-tight text-fog">
            Halo, saya{" "}
            <span className="gradient-text">{profile.name.split(" ")[0]}</span>
          </h1>

          <p className="mt-4 text-xl sm:text-2xl text-fog-muted font-semibold">
            {profile.role}
          </p>

          <p className="mt-5 max-w-xl text-[15px] sm:text-base text-fog-muted leading-relaxed">
            {profile.tagline}
          </p>

          <div className="mt-9 flex flex-wrap items-center gap-3">
            <a
              href="#projects"
              className="group inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-accent to-accent-soft px-6 py-3.5 text-sm font-semibold text-ink shadow-lg shadow-accent/20 hover:shadow-accent/35 hover:scale-[1.02] transition-all"
            >
              Lihat proyek
              <ArrowRight className="size-4 group-hover:translate-x-0.5 transition-transform" />
            </a>
            <a
              href={profile.cvUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full glass px-6 py-3.5 text-sm font-semibold text-fog hover:border-accent/40 transition-colors"
            >
              Unduh CV
            </a>
          </div>

          <div className="mt-8 flex flex-wrap items-center gap-3">
            <a
              href={profile.github}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub"
              title="Kunjungi GitHub"
              className="size-10 rounded-full glass flex items-center justify-center text-fog-muted hover:text-accent hover:border-accent/40 transition-colors"
            >
              <GithubIcon className="size-4.5" />
            </a>
            <a
              href={profile.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
              title="Kunjungi LinkedIn"
              className="size-10 rounded-full glass flex items-center justify-center text-fog-muted hover:text-accent hover:border-accent/40 transition-colors"
            >
              <LinkedinIcon className="size-4.5" />
            </a>
            <a
              href={waUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="WhatsApp"
              title="Hubungi di WhatsApp"
              className="size-10 rounded-full glass flex items-center justify-center text-fog-muted hover:text-[#25D366] hover:border-[#25D366]/40 transition-colors"
            >
              <WhatsAppIcon className="size-4.5" />
            </a>

            <button
              type="button"
              onClick={handleCopyEmail}
              aria-label="Salin email"
              title={copiedEmail ? "Email tersalin!" : "Salin email ke clipboard"}
              className={`h-10 px-4 rounded-full glass flex items-center gap-2 text-xs font-semibold transition-all ${
                copiedEmail
                  ? "bg-accent/20 border-accent/40 text-accent"
                  : "text-fog-muted hover:text-fog hover:border-accent/40"
              }`}
            >
              {copiedEmail ? (
                <>
                  <Check className="size-3.5 text-accent" />
                  <span>Email tersalin!</span>
                </>
              ) : (
                <>
                  <Copy className="size-3.5" />
                  <span>Salin email</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* Right: glass spotlight card with photo */}
        <div className="animate-float-slow">
          <div
            onMouseMove={onMouseMove}
            className="spotlight glass rounded-[2rem] p-8 sm:p-10 shadow-2xl shadow-black/40"
          >
            <div className="relative mx-auto size-40 sm:size-48">
              <div className="absolute -inset-3 rounded-full bg-gradient-to-br from-accent via-accent-soft to-warm opacity-50 blur-xl" />
              <Image
                src={profile.photo}
                alt={profile.name}
                fill
                sizes="192px"
                className="relative rounded-full object-cover border-2 border-white/10"
                priority
              />
            </div>

            <div className="mt-7 text-center">
              <p className="font-display text-lg font-bold text-fog">
                {profile.name}
              </p>
              <p className="mt-1 text-sm text-fog-muted">{profile.location}</p>
            </div>

            <div className="mt-4 grid grid-cols-2 gap-2 text-center">
              <Stat label="Fokus" value="Full Stack" />
              <Stat label="Status" value="Available" accent />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Stat({
  label,
  value,
  accent,
}: {
  label: string;
  value: string;
  accent?: boolean;
}) {
  return (
    <div className="rounded-xl bg-white/[0.03] border border-white/[0.06] px-2 py-2.5">
      <p className="text-[10px] uppercase tracking-wide text-fog-muted">
        {label}
      </p>
      <p
        className={`mt-0.5 text-xs font-semibold ${
          accent ? "text-accent" : "text-fog"
        }`}
      >
        {value}
      </p>
    </div>
  );
}
