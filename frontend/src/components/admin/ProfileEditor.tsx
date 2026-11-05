"use client";

import { useEffect, useState } from "react";
import { AlertCircle } from "lucide-react";
import { authFetch } from "@/lib/adminApi";
import type { Profile } from "@/lib/api";
import ImageUploader from "./ImageUploader";

export default function ProfileEditor() {
  const [form, setForm] = useState<Profile | null>(null);
  const [status, setStatus] = useState<"idle" | "saving" | "saved" | "error">("idle");
  const [error, setError] = useState("");

  useEffect(() => {
    authFetch("/api/profile")
      .then(async (r) => {
        if (!r.ok) {
          const body = await r.json().catch(() => ({}));
          throw new Error(body.error || `Server error (${r.status})`);
        }
        return r.json();
      })
      .then((data) => {
        if (data && typeof data === "object" && !data.error && data.name) {
          setForm(data);
          setError("");
        } else {
          throw new Error("Data profile kosong atau tidak valid");
        }
      })
      .catch((err) => {
        setError(
          err instanceof Error
            ? err.message
            : "Gagal memuat profile. Pastikan backend Express dan MySQL aktif."
        );
      });
  }, []);

  function update<K extends keyof Profile>(key: K, value: Profile[K]) {
    setForm((f) => (f ? { ...f, [key]: value } : f));
  }

  async function handleSave(e: React.FormEvent) {
    e.preventDefault();
    if (!form) return;
    setStatus("saving");
    setError("");
    try {
      const res = await authFetch("/api/profile", {
        method: "PUT",
        body: JSON.stringify(form),
      });
      if (!res.ok) {
        const body = await res.json().catch(() => ({}));
        throw new Error(body.error || "Gagal menyimpan");
      }
      setStatus("saved");
      setTimeout(() => setStatus("idle"), 2000);
    } catch (err) {
      setStatus("error");
      setError(err instanceof Error ? err.message : "Gagal menyimpan");
    }
  }

  if (!form) {
    return (
      <div className="space-y-4 max-w-2xl">
        {error ? (
          <div className="flex items-center gap-2 rounded-xl bg-warm/10 border border-warm/25 px-4 py-3 text-xs text-warm">
            <AlertCircle className="size-4 shrink-0" />
            <span>{error}</span>
          </div>
        ) : (
          <p className="text-sm text-fog-muted">Memuat profile...</p>
        )}
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSave}
      className="space-y-4 max-w-2xl rounded-2xl border border-ink-border bg-ink-panel/40 p-6"
    >
      <Field label="Nama" value={form.name || ""} onChange={(v) => update("name", v)} />
      <Field label="Role" value={form.role || ""} onChange={(v) => update("role", v)} />
      <Field label="Lokasi" value={form.location || ""} onChange={(v) => update("location", v)} />
      <Field label="Tagline" value={form.tagline || ""} onChange={(v) => update("tagline", v)} textarea />
      <Field label="Summary" value={form.summary || ""} onChange={(v) => update("summary", v)} textarea />
      <Field label="Email" value={form.email || ""} onChange={(v) => update("email", v)} />
      <Field label="Telepon / WhatsApp" value={form.phone || ""} onChange={(v) => update("phone", v)} />
      <Field label="GitHub URL" value={form.github || ""} onChange={(v) => update("github", v)} />
      <Field label="LinkedIn URL" value={form.linkedin || ""} onChange={(v) => update("linkedin", v)} />
      <Field label="CV URL" value={form.cvUrl || ""} onChange={(v) => update("cvUrl", v)} />

      <div>
        <label className="block text-xs font-semibold text-fog-muted mb-1.5">Foto profil</label>
        <ImageUploader value={form.photo} onChange={(path) => update("photo", path)} folder="profile" />
      </div>

      <label className="flex items-center gap-2 text-sm text-fog cursor-pointer">
        <input
          type="checkbox"
          checked={Boolean(form.availableForWork)}
          onChange={(e) => update("availableForWork", e.target.checked)}
          className="rounded border-white/20 bg-white/5 text-accent focus:ring-accent"
        />
        Tersedia untuk proyek baru
      </label>

      {error && (
        <div className="flex items-center gap-2 rounded-xl bg-warm/10 border border-warm/25 px-4 py-3 text-xs text-warm">
          <AlertCircle className="size-4 shrink-0" />
          <span>{error}</span>
        </div>
      )}

      <button
        type="submit"
        disabled={status === "saving"}
        className="rounded-full bg-gradient-to-r from-accent to-accent-soft px-6 py-2.5 text-sm font-semibold text-ink disabled:opacity-70 shadow-md shadow-accent/20 hover:scale-[1.02] transition-transform"
      >
        {status === "saving" ? "Menyimpan..." : status === "saved" ? "Tersimpan ✓" : "Simpan"}
      </button>
    </form>
  );
}

function Field({
  label,
  value,
  onChange,
  textarea,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  textarea?: boolean;
}) {
  return (
    <div>
      <label className="block text-xs font-semibold text-fog-muted mb-1.5">{label}</label>
      {textarea ? (
        <textarea
          value={value}
          onChange={(e) => onChange(e.target.value)}
          rows={3}
          className="w-full rounded-xl bg-white/[0.03] border border-white/[0.08] px-4 py-2.5 text-sm text-fog outline-none focus:border-accent/50 transition-colors resize-none"
        />
      ) : (
        <input
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="w-full rounded-xl bg-white/[0.03] border border-white/[0.08] px-4 py-2.5 text-sm text-fog outline-none focus:border-accent/50 transition-colors"
        />
      )}
    </div>
  );
}
