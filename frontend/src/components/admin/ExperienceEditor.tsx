"use client";

import { useEffect, useState } from "react";
import { Pencil, Plus, Trash2 } from "lucide-react";
import { authFetch } from "@/lib/adminApi";
import Modal from "./Modal";

type ExperienceRow = {
  dbId: number;
  id: string;
  role: string;
  company: string;
  period: string;
  description: string;
  highlights: string[];
};

type FormState = {
  role: string;
  company: string;
  period: string;
  description: string;
  highlights: string;
};

const EMPTY_FORM: FormState = { role: "", company: "", period: "", description: "", highlights: "" };

export default function ExperienceEditor() {
  const [rows, setRows] = useState<ExperienceRow[] | null>(null);
  const [error, setError] = useState("");
  const [editing, setEditing] = useState<ExperienceRow | null>(null);
  const [creating, setCreating] = useState(false);
  const [form, setForm] = useState<FormState>(EMPTY_FORM);
  const [saving, setSaving] = useState(false);

  function load() {
    authFetch("/api/experience")
      .then((r) => r.json())
      .then(setRows)
      .catch(() => setError("Gagal memuat data experience"));
  }

  useEffect(load, []);

  function openEdit(row: ExperienceRow) {
    setEditing(row);
    setForm({
      role: row.role,
      company: row.company,
      period: row.period,
      description: row.description,
      highlights: row.highlights.join("\n"),
    });
  }

  function openCreate() {
    setCreating(true);
    setForm(EMPTY_FORM);
  }

  function closeModal() {
    setEditing(null);
    setCreating(false);
    setError("");
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    setError("");
    const highlights = form.highlights.split("\n").map((h) => h.trim()).filter(Boolean);

    try {
      let res: Response;
      if (editing) {
        res = await authFetch(`/api/experience/${editing.dbId}`, {
          method: "PUT",
          body: JSON.stringify({
            role: form.role,
            company: form.company,
            period: form.period,
            description: form.description,
            highlights,
          }),
        });
      } else {
        res = await authFetch("/api/experience", {
          method: "POST",
          body: JSON.stringify({
            expKey: `exp-${Date.now()}`,
            role: form.role,
            company: form.company,
            period: form.period,
            description: form.description,
            highlights,
          }),
        });
      }
      if (!res.ok) throw new Error((await res.json()).error || "Gagal menyimpan");
      closeModal();
      load();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Gagal menyimpan");
    } finally {
      setSaving(false);
    }
  }

  async function handleDelete(dbId: number) {
    if (!confirm("Hapus pengalaman ini?")) return;
    const res = await authFetch(`/api/experience/${dbId}`, { method: "DELETE" });
    if (res.ok) setRows((r) => r && r.filter((x) => x.dbId !== dbId));
    else setError("Gagal menghapus pengalaman");
  }

  if (!rows) return <p className="text-sm text-fog-muted">Memuat...</p>;

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <p className="text-sm text-fog-muted">{rows.length} pengalaman</p>
        <button
          onClick={openCreate}
          className="inline-flex items-center gap-1.5 rounded-full bg-gradient-to-r from-accent to-accent-soft px-4 py-2 text-xs font-semibold text-ink"
        >
          <Plus className="size-3.5" /> Tambah pengalaman
        </button>
      </div>

      {error && !editing && !creating && <p className="text-xs text-warm font-medium mb-3">{error}</p>}

      <div className="rounded-2xl border border-ink-border overflow-hidden">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-ink-panel-light/50 text-left text-xs text-fog-muted uppercase tracking-wide">
              <th className="px-4 py-3 font-semibold">Posisi</th>
              <th className="px-4 py-3 font-semibold">Perusahaan</th>
              <th className="px-4 py-3 font-semibold">Periode</th>
              <th className="px-4 py-3 font-semibold text-right">Aksi</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row) => (
              <tr key={row.dbId} className="border-t border-ink-border hover:bg-white/[0.02]">
                <td className="px-4 py-3 font-medium text-fog max-w-[220px]">
                  <p className="truncate">{row.role}</p>
                </td>
                <td className="px-4 py-3 text-fog-muted">{row.company}</td>
                <td className="px-4 py-3 text-fog-muted whitespace-nowrap">{row.period}</td>
                <td className="px-4 py-3">
                  <div className="flex items-center justify-end gap-1.5">
                    <button
                      onClick={() => openEdit(row)}
                      aria-label="Edit"
                      className="size-8 rounded-lg flex items-center justify-center text-fog-muted hover:text-accent hover:bg-white/5 transition-colors"
                    >
                      <Pencil className="size-3.5" />
                    </button>
                    <button
                      onClick={() => handleDelete(row.dbId)}
                      aria-label="Hapus"
                      className="size-8 rounded-lg flex items-center justify-center text-fog-muted hover:text-warm hover:bg-white/5 transition-colors"
                    >
                      <Trash2 className="size-3.5" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
            {rows.length === 0 && (
              <tr>
                <td colSpan={4} className="px-4 py-8 text-center text-fog-muted text-sm">
                  Belum ada data.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {(editing || creating) && (
        <Modal title={editing ? "Edit pengalaman" : "Tambah pengalaman"} onClose={closeModal}>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold text-fog-muted mb-1.5">Posisi</label>
                <input
                  value={form.role}
                  onChange={(e) => setForm((f) => ({ ...f, role: e.target.value }))}
                  required
                  className="w-full rounded-xl bg-white/[0.03] border border-white/[0.08] px-4 py-2.5 text-sm text-fog outline-none focus:border-accent/50"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-fog-muted mb-1.5">Perusahaan</label>
                <input
                  value={form.company}
                  onChange={(e) => setForm((f) => ({ ...f, company: e.target.value }))}
                  required
                  className="w-full rounded-xl bg-white/[0.03] border border-white/[0.08] px-4 py-2.5 text-sm text-fog outline-none focus:border-accent/50"
                />
              </div>
            </div>
            <div>
              <label className="block text-xs font-semibold text-fog-muted mb-1.5">Periode</label>
              <input
                value={form.period}
                onChange={(e) => setForm((f) => ({ ...f, period: e.target.value }))}
                placeholder="mis. Nov 2025 — Mei 2026"
                required
                className="w-full rounded-xl bg-white/[0.03] border border-white/[0.08] px-4 py-2.5 text-sm text-fog outline-none focus:border-accent/50"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-fog-muted mb-1.5">Deskripsi</label>
              <textarea
                value={form.description}
                onChange={(e) => setForm((f) => ({ ...f, description: e.target.value }))}
                rows={2}
                className="w-full rounded-xl bg-white/[0.03] border border-white/[0.08] px-4 py-2.5 text-sm text-fog outline-none focus:border-accent/50 resize-none"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-fog-muted mb-1.5">
                Highlights (satu poin per baris)
              </label>
              <textarea
                value={form.highlights}
                onChange={(e) => setForm((f) => ({ ...f, highlights: e.target.value }))}
                rows={4}
                className="w-full rounded-xl bg-white/[0.03] border border-white/[0.08] px-4 py-2.5 text-sm text-fog outline-none focus:border-accent/50 resize-none"
              />
            </div>

            {error && <p className="text-xs text-warm font-medium">{error}</p>}

            <div className="flex justify-end gap-2 pt-2">
              <button
                type="button"
                onClick={closeModal}
                className="rounded-full px-5 py-2 text-xs font-semibold text-fog-muted hover:text-fog"
              >
                Batal
              </button>
              <button
                type="submit"
                disabled={saving}
                className="rounded-full bg-gradient-to-r from-accent to-accent-soft px-5 py-2 text-xs font-semibold text-ink disabled:opacity-70"
              >
                {saving ? "Menyimpan..." : "Simpan"}
              </button>
            </div>
          </form>
        </Modal>
      )}
    </div>
  );
}