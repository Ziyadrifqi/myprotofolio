"use client";

import Image from "next/image";
import { Code2, Layers, Rocket } from "lucide-react";
import type { Profile } from "@/lib/api";
import { useSpotlight } from "./useSpotlight";

const pillars = [
  {
    icon: Layers,
    title: "Berpikir sistem",
    desc: "Merancang struktur data dan API sebelum menulis satu baris UI, supaya aplikasi tetap rapi saat tumbuh besar.",
  },
  {
    icon: Code2,
    title: "Kode yang terbaca",
    desc: "Menulis kode yang mudah dipahami orang lain enam bulan dari sekarang — termasuk diri sendiri.",
  },
  {
    icon: Rocket,
    title: "Fokus pada hasil",
    desc: "Produk yang baik diukur dari seberapa lancar dipakai, bukan seberapa rumit dibangun.",
  },
];

export default function About({ profile }: { profile: Profile }) {
  return (
    <section id="about" className="px-5 sm:px-8 py-20 sm:py-28">
      <div className="mx-auto max-w-6xl">
        <SectionHeading eyebrow="Tentang saya" title="Lebih kenal dengan saya" />

        <div className="mt-12 grid lg:grid-cols-[auto_1fr] gap-10 items-start">
          <div className="relative size-36 sm:size-44 mx-auto lg:mx-0 shrink-0">
            <div className="absolute -inset-2 rounded-full bg-gradient-to-br from-accent to-warm opacity-30 blur-lg" />
            <Image
              src={profile.photo}
              alt={profile.name}
              fill
              sizes="176px"
              className="relative rounded-full object-cover border-2 border-white/10"
            />
          </div>

          <div>
            <p className="text-lg sm:text-xl text-fog leading-relaxed font-medium max-w-2xl text-justify">
              {profile.summary}
            </p>

            <div className="mt-8 grid sm:grid-cols-3 gap-4">
              {pillars.map((p) => (
                <PillarCard key={p.title} {...p} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function PillarCard({
  icon: Icon,
  title,
  desc,
}: {
  icon: typeof Code2;
  title: string;
  desc: string;
}) {
  const spotlight = useSpotlight<HTMLDivElement>();
  return (
    <div
      ref={spotlight.ref}
      onMouseMove={spotlight.onMouseMove}
      className="spotlight glass glass-hover rounded-2xl p-5"
    >
      <div className="size-10 rounded-xl bg-gradient-to-br from-accent/20 to-warm/10 flex items-center justify-center">
        <Icon className="size-5 text-accent" strokeWidth={1.8} />
      </div>
      <h3 className="mt-4 font-display font-bold text-fog">{title}</h3>
      <p className="mt-1.5 text-sm text-fog-muted leading-relaxed text-justify">{desc}</p>
    </div>
  );
}

export function SectionHeading({
  eyebrow,
  title,
  subtitle,
}: {
  eyebrow: string;
  title: string;
  subtitle?: string;
}) {
  return (
    <div>
      <span className="pill-border inline-flex items-center rounded-full bg-ink-panel/60 px-3.5 py-1 text-xs font-semibold text-accent">
        {eyebrow}
      </span>
      <h2 className="mt-4 font-display text-2xl sm:text-3xl font-extrabold text-fog tracking-tight ">
        {title}
      </h2>
      {subtitle && (
        <p className="mt-2 text-fog-muted max-w-2xl">{subtitle}</p>
      )}
    </div>
  );
}
