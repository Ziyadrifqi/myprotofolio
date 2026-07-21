"use client";

import { useState } from "react";
import { Loader2, Mail, MapPin, Send } from "lucide-react";
import type { Profile } from "@/lib/api";
import { SectionHeading } from "./About";
import { GithubIcon, LinkedinIcon } from "./icons";

type Status = "idle" | "sending" | "sent" | "error";

// Web3Forms key is meant to be public (it's a submit-only widget key), so it
// stays as a NEXT_PUBLIC_ env var rather than coming from the backend API.
const WEB3FORMS_ACCESS_KEY = process.env.NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY || "";

export default function Contact({ profile }: { profile: Profile }) {
  const [status, setStatus] = useState<Status>("idle");
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [errorMessage, setErrorMessage] = useState("");

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) {
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    if (!WEB3FORMS_ACCESS_KEY) {
      setStatus("error");
      setErrorMessage(
        "Form belum terhubung ke layanan email. Tambahkan NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY di .env.local."
      );
      return;
    }

    setStatus("sending");
    setErrorMessage("");

    try {
      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          access_key: WEB3FORMS_ACCESS_KEY,
          subject: `Pesan baru dari ${form.name} — Portofolio`,
          name: form.name,
          email: form.email,
          message: form.message,
        }),
      });

      const data = await res.json();

      if (data.success) {
        setStatus("sent");
        setForm({ name: "", email: "", message: "" });
      } else {
        setStatus("error");
        setErrorMessage(data.message || "Gagal mengirim pesan. Coba lagi.");
      }
    } catch {
      setStatus("error");
      setErrorMessage("Tidak bisa terhubung ke server. Periksa koneksi Anda.");
    }
  }

  return (
    <section id="contact" className="px-5 sm:px-8 py-20 sm:py-28">
      <div className="mx-auto max-w-6xl">
        <SectionHeading
          eyebrow="Kontak"
          title="Mari berdiskusi"
          subtitle="Punya proyek atau peluang kolaborasi? Kirim pesan, saya akan balas secepatnya."
        />

        <div className="mt-10 grid lg:grid-cols-[0.8fr_1.2fr] gap-6">
          {/* Contact info */}
          <div className="space-y-4">
            <InfoRow icon={Mail} label="Email" value={profile.email} href={`mailto:${profile.email}`} />
            <InfoRow icon={MapPin} label="Lokasi" value={profile.location} />
            <InfoRow icon={GithubIcon} label="GitHub" value="@ziyadrifqi" href={profile.github} />
            <InfoRow icon={LinkedinIcon} label="LinkedIn" value="ziyadrifqi" href={profile.linkedin} />
          </div>

          {/* Form */}
          <form
            onSubmit={handleSubmit}
            className="glass rounded-2xl p-6 sm:p-8 space-y-5"
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
                className="block text-xs font-semibold text-fog-muted mb-2"
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
                suppressHydrationWarning
                className="w-full rounded-xl bg-white/[0.03] border border-white/[0.08] px-4 py-3 text-sm text-fog placeholder:text-fog-muted/60 focus:border-accent/50 outline-none transition-colors resize-none"
              />
            </div>

            <button
              type="submit"
              disabled={status === "sending" || status === "sent"}
              suppressHydrationWarning
              className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-accent to-accent-soft px-6 py-3.5 text-sm font-semibold text-ink shadow-lg shadow-accent/20 hover:shadow-accent/35 hover:scale-[1.02] transition-all disabled:opacity-70 disabled:hover:scale-100"
            >
              {status === "idle" && (
                <>
                  Kirim pesan <Send className="size-4" />
                </>
              )}
              {status === "sending" && (
                <>
                  Mengirim pesan <Loader2 className="size-4 animate-spin" />
                </>
              )}
              {status === "sent" && "Terkirim ✓"}
              {status === "error" && (
                <>
                  Coba lagi <Send className="size-4" />
                </>
              )}
            </button>

            {status === "sent" && (
              <p className="text-xs text-accent font-medium">
                Pesan berhasil terkirim. Terima kasih, saya akan segera membalas.
              </p>
            )}
            {status === "error" && (
              <p className="text-xs text-warm font-medium">{errorMessage}</p>
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
    <div className="glass glass-hover flex items-center gap-4 rounded-2xl p-4">
      <div className="shrink-0 size-11 rounded-xl bg-gradient-to-br from-accent/20 to-warm/10 flex items-center justify-center">
        <Icon className="size-4.5 text-accent" />
      </div>
      <div>
        <p className="text-[11px] font-semibold text-fog-muted uppercase tracking-wide">{label}</p>
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
      <label htmlFor={name} className="block text-xs font-semibold text-fog-muted mb-2">
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
        suppressHydrationWarning
        className="w-full rounded-xl bg-white/[0.03] border border-white/[0.08] px-4 py-3 text-sm text-fog placeholder:text-fog-muted/60 focus:border-accent/50 outline-none transition-colors"
      />
    </div>
  );
}
