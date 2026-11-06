"use client";

import { useState } from "react";
import { Check, Copy, Loader2, Mail, MapPin, Send } from "lucide-react";
import type { Profile } from "@/lib/api";
import { SectionHeading } from "./About";
import { GithubIcon, LinkedinIcon, WhatsAppIcon } from "./icons";

type Status = "idle" | "sending" | "sent" | "error";

// Web3Forms key is meant to be public (it's a submit-only widget key), so it
// stays as a NEXT_PUBLIC_ env var rather than coming from the backend API.
const WEB3FORMS_ACCESS_KEY = process.env.NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY || "";
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000";

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

    setStatus("sending");
    setErrorMessage("");

    try {
      // 1. Coba kirim langsung ke backend API portofolio (tersimpan di Inbox admin + notifikasi Gmail SMTP)
      const res = await fetch(`${API_BASE_URL}/api/messages`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: form.name,
          email: form.email,
          message: form.message,
        }),
      });

      if (res.ok) {
        setStatus("sent");
        setForm({ name: "", email: "", message: "" });
        return;
      }

      // Jika backend gagal tapi Web3Forms key tersedia, fallback ke Web3Forms
      if (WEB3FORMS_ACCESS_KEY) {
        const fallbackRes = await fetch("https://api.web3forms.com/submit", {
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

        const fallbackData = await fallbackRes.json();
        if (fallbackData.success) {
          setStatus("sent");
          setForm({ name: "", email: "", message: "" });
          return;
        }
      }

      const body = await res.json().catch(() => ({}));
      setStatus("error");
      setErrorMessage(body.error || "Gagal mengirim pesan. Silakan coba lagi nanti.");
    } catch {
      // Fallback jika API backend tidak terjangkau (offline / beda origin belum jalan)
      if (WEB3FORMS_ACCESS_KEY) {
        try {
          const fallbackRes = await fetch("https://api.web3forms.com/submit", {
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
          const fallbackData = await fallbackRes.json();
          if (fallbackData.success) {
            setStatus("sent");
            setForm({ name: "", email: "", message: "" });
            return;
          }
        } catch {
          // ignore
        }
      }

      setStatus("error");
      setErrorMessage("Tidak bisa terhubung ke server. Periksa koneksi Anda.");
    }
  }

  function getHandle(url: string | undefined, defaultHandle: string) {
    if (!url) return defaultHandle;
    try {
      const parsed = new URL(url);
      const pathname = parsed.pathname.replace(/^\/|\/$/g, "");
      if (pathname.startsWith("in/")) {
        return pathname.replace(/^in\//, "");
      }
      return pathname ? `@${pathname}` : defaultHandle;
    } catch {
      return defaultHandle;
    }
  }

  const githubHandle = getHandle(profile.github, "GitHub Profile");
  const linkedinHandle = getHandle(profile.linkedin, "LinkedIn Profile");

  return (
    <section id="contact" className="px-5 sm:px-8 py-20 sm:py-28">
      <div className="mx-auto max-w-6xl">
        <SectionHeading
          eyebrow="Kontak"
          title="Mari berdiskusi"
          subtitle="Punya proyek atau peluang kolaborasi? Kirim pesan, saya akan balas secepatnya."
        />

        <div className="mt-10 grid lg:grid-cols-[0.85fr_1.15fr] gap-6">
          {/* Contact info list */}
          <div className="space-y-3.5">
            <EmailRow email={profile.email} />
            <WhatsAppRow phone={profile.phone} name={profile.name} />
            <InfoRow icon={MapPin} label="Lokasi" value={profile.location} />
            <InfoRow icon={GithubIcon} label="GitHub" value={githubHandle} href={profile.github} />
            <InfoRow icon={LinkedinIcon} label="LinkedIn" value={linkedinHandle} href={profile.linkedin} />
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
                placeholder="Masukkan Nama Anda"
                required
              />
              <Field
                label="Email"
                name="email"
                type="email"
                value={form.email}
                onChange={handleChange}
                placeholder="Masukkan Email Anda"
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
                placeholder="Ceritakan tentang proyek atau tawaran peluang Anda..."
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

function EmailRow({ email }: { email: string }) {
  const [copied, setCopied] = useState(false);

  function handleCopy(e: React.MouseEvent) {
    e.preventDefault();
    e.stopPropagation();
    navigator.clipboard.writeText(email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  return (
    <div className="glass glass-hover rounded-2xl p-4 flex items-center justify-between gap-3 group">
      <a
        href={`mailto:${email}`}
        className="flex items-center gap-4 flex-1 min-w-0"
        title="Kirim email langsung"
      >
        <div className="shrink-0 size-11 rounded-xl bg-gradient-to-br from-accent/20 to-warm/10 flex items-center justify-center">
          <Mail className="size-4.5 text-accent" />
        </div>
        <div className="min-w-0">
          <p className="text-[11px] font-semibold text-fog-muted uppercase tracking-wide">
            Email
          </p>
          <p className="text-sm text-fog truncate group-hover:text-accent transition-colors">
            {email}
          </p>
        </div>
      </a>

      <button
        type="button"
        onClick={handleCopy}
        aria-label="Salin email"
        title={copied ? "Email tersalin!" : "Salin alamat email"}
        className={`shrink-0 inline-flex items-center gap-1.5 rounded-xl px-3 py-1.5 text-xs font-semibold transition-all ${copied
          ? "bg-accent text-ink"
          : "bg-white/[0.04] border border-white/[0.08] text-fog-muted hover:text-fog hover:border-accent/40"
          }`}
      >
        {copied ? (
          <>
            <Check className="size-3.5" />
            <span>Tersalin</span>
          </>
        ) : (
          <>
            <Copy className="size-3.5" />
            <span className="hidden sm:inline">Salin</span>
          </>
        )}
      </button>
    </div>
  );
}

function WhatsAppRow({ phone, name }: { phone?: string; name?: string }) {
  if (!phone) return null;
  const cleanPhone = phone.replace(/[^0-9]/g, "");
  const recipientName = name ? ` ${name.split(" ")[0]}` : "";
  const waUrl = `https://wa.me/${cleanPhone}?text=${encodeURIComponent(
    `Halo${recipientName}, saya tertarik mendiskusikan peluang kerja sama atau proyek dengan Anda.`
  )}`;

  return (
    <a
      href={waUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="glass glass-hover rounded-2xl p-4 flex items-center justify-between gap-3 group block"
    >
      <div className="flex items-center gap-4 min-w-0">
        <div className="shrink-0 size-11 rounded-xl bg-[#25D366]/15 flex items-center justify-center border border-[#25D366]/25">
          <WhatsAppIcon className="size-5 text-[#25D366]" />
        </div>
        <div className="min-w-0">
          <p className="text-[11px] font-semibold text-fog-muted uppercase tracking-wide">
            WhatsApp
          </p>
          <p className="text-sm text-fog group-hover:text-[#25D366] transition-colors">
            Chat Langsung di WhatsApp
          </p>
        </div>
      </div>
      <span className="shrink-0 text-xs font-semibold text-[#25D366] bg-[#25D366]/10 border border-[#25D366]/25 rounded-full px-3 py-1 group-hover:bg-[#25D366]/20 transition-colors">
        Chat ↗
      </span>
    </a>
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
