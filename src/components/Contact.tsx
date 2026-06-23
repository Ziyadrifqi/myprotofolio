"use client";

import { useState } from "react";
import { Loader2, Mail, MapPin, Send } from "lucide-react";
import { profile } from "@/data/content";
import { SectionHeading } from "./About";
import { GithubIcon, LinkedinIcon } from "./icons";

type Status = "idle" | "sending" | "sent";

export default function Contact() {
  const [status, setStatus] = useState<Status>("idle");
  const [form, setForm] = useState({ name: "", email: "", message: "" });

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) {
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("sending");

    const subject = encodeURIComponent(`Pesan dari ${form.name || "Pengunjung Portofolio"}`);
    const body = encodeURIComponent(
      `${form.message}\n\n— ${form.name} (${form.email})`
    );

    setTimeout(() => {
      window.location.href = `mailto:${profile.email}?subject=${subject}&body=${body}`;
      setStatus("sent");
    }, 600);
  }

  return (
    <section id="contact" className="px-5 sm:px-8 py-20 sm:py-28">
      <div className="mx-auto max-w-6xl">
        <SectionHeading
          tag="~/contact"
          title="Mari berdiskusi"
          subtitle="Punya proyek atau peluang kolaborasi? Kirim pesan, saya akan balas secepatnya."
        />

        <div className="mt-10 grid lg:grid-cols-[0.8fr_1.2fr] gap-8">
          {/* Contact info */}
          <div className="space-y-5">
            <InfoRow icon={Mail} label="Email" value={profile.email} href={`mailto:${profile.email}`} />
            <InfoRow icon={MapPin} label="Lokasi" value={profile.location} />
            <InfoRow icon={GithubIcon} label="GitHub" value="@ziyadrifqi" href={profile.github} />
            <InfoRow icon={LinkedinIcon} label="LinkedIn" value="ziyadrifqi" href={profile.linkedin} />
          </div>

          {/* Form */}
          <form
            onSubmit={handleSubmit}
            className="rounded-xl border border-ink-border bg-ink-panel p-6 sm:p-8 space-y-5"
          >
            <div className="grid sm:grid-cols-2 gap-5">
              <Field
                label="Nama"
                name="name"
                value={form.name}
                onChange={handleChange}
                placeholder="Nama Anda"
                required
              />
              <Field
                label="Email"
                name="email"
                type="email"
                value={form.email}
                onChange={handleChange}
                placeholder="email@anda.com"
                required
              />
            </div>

            <div>
              <label
                htmlFor="message"
                className="block font-mono text-xs text-fog-muted mb-2"
              >
                Pesan
              </label>
              <textarea
                id="message"
                name="message"
                value={form.message}
                onChange={handleChange}
                required
                rows={5}
                placeholder="Ceritakan tentang proyek Anda..."
                className="w-full rounded-md border border-ink-border bg-ink px-4 py-3 text-sm text-fog placeholder:text-fog-muted/60 focus:border-accent outline-none transition-colors resize-none"
              />
            </div>

            <button
              type="submit"
              disabled={status !== "idle"}
              className="inline-flex items-center gap-2 rounded-md bg-accent px-5 py-3 font-mono text-sm font-medium text-ink hover:bg-accent/90 transition-colors disabled:opacity-70"
            >
              {status === "idle" && (
                <>
                  Kirim pesan <Send className="size-4" />
                </>
              )}
              {status === "sending" && (
                <>
                  Menyiapkan email <Loader2 className="size-4 animate-spin" />
                </>
              )}
              {status === "sent" && "Terkirim ✓"}
            </button>

            {status === "sent" && (
              <p className="font-mono text-xs text-mint">
                Aplikasi email Anda terbuka dengan pesan ini siap dikirim.
              </p>
            )}
          </form>
        </div>
      </div>
    </section>
  );
}

function InfoRow({
  icon: Icon,
  label,
  value,
  href,
}: {
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  value: string;
  href?: string;
}) {
  const content = (
    <div className="flex items-center gap-4 rounded-lg border border-ink-border bg-ink-panel p-4 hover:border-accent/40 transition-colors">
      <div className="shrink-0 size-10 rounded-lg bg-accent/10 border border-accent/20 flex items-center justify-center">
        <Icon className="size-4.5 text-accent" />
      </div>
      <div>
        <p className="font-mono text-[11px] text-fog-muted">{label}</p>
        <p className="text-sm text-fog">{value}</p>
      </div>
    </div>
  );

  if (href) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" className="block">
        {content}
      </a>
    );
  }
  return content;
}

function Field({
  label,
  name,
  value,
  onChange,
  placeholder,
  type = "text",
  required,
}: {
  label: string;
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder: string;
  type?: string;
  required?: boolean;
}) {
  return (
    <div>
      <label htmlFor={name} className="block font-mono text-xs text-fog-muted mb-2">
        {label}
      </label>
      <input
        id={name}
        name={name}
        type={type}
        value={value}
        onChange={onChange}
        required={required}
        placeholder={placeholder}
        className="w-full rounded-md border border-ink-border bg-ink px-4 py-3 text-sm text-fog placeholder:text-fog-muted/60 focus:border-accent outline-none transition-colors"
      />
    </div>
  );
}
