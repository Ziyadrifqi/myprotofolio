import Image from "next/image";
import { Code2, Layers, Rocket } from "lucide-react";
import { profile } from "@/data/content";

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

export default function About() {
  return (
    <section id="about" className="px-5 sm:px-8 py-20 sm:py-28">
      <div className="mx-auto max-w-6xl">
        <SectionHeading tag="~/about" title="Tentang saya" />

        <div className="mt-10 grid lg:grid-cols-[auto_1fr_1fr] gap-10 lg:gap-12 items-start">
          <div className="relative size-40 sm:size-48 mx-auto lg:mx-0">
            <div className="absolute inset-0 rounded-full bg-gradient-to-br from-accent to-transparent opacity-30 blur-xl" />
            <Image
              src={profile.photo}
              alt={profile.name}
              fill
              sizes="192px"
              className="relative rounded-full object-cover border-2 border-accent/40"
            />
          </div>

          <p className="text-lg sm:text-xl text-fog leading-relaxed font-medium">
            {profile.summary}
          </p>

          <div className="space-y-6">
            {pillars.map((p) => (
              <div key={p.title} className="flex gap-4">
                <div className="shrink-0 size-10 rounded-lg bg-accent/10 border border-accent/20 flex items-center justify-center">
                  <p.icon className="size-5 text-accent" strokeWidth={1.8} />
                </div>
                <div>
                  <h3 className="font-display font-semibold text-fog">
                    {p.title}
                  </h3>
                  <p className="mt-1 text-sm text-fog-muted leading-relaxed">
                    {p.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export function SectionHeading({
  tag,
  title,
  subtitle,
}: {
  tag: string;
  title: string;
  subtitle?: string;
}) {
  return (
    <div>
      <p className="font-mono text-sm text-accent mb-2">{tag}</p>
      <h2 className="font-display text-2xl sm:text-3xl font-semibold text-fog tracking-tight">
        {title}
      </h2>
      {subtitle && (
        <p className="mt-2 text-fog-muted max-w-2xl">{subtitle}</p>
      )}
    </div>
  );
}
