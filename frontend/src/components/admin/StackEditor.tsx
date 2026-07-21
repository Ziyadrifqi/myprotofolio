"use client";

import { useEffect, useState } from "react";
import { Pencil, Plus, Trash2 } from "lucide-react";
import { authFetch } from "@/lib/adminApi";
import Modal from "./Modal";

type StackRow = {
  id: number;
  group: string;
  proficiency: number;
  tools: string[];
};

type FormState = { group: string; proficiency: number; tools: string };

const EMPTY_FORM: FormState = { group: "", proficiency: 50, tools: "" };

export default function StackEditor() {
  const [rows, setRows] = useState<StackRow[] | null>(null);
  const [error, setError] = useState("");
  const [editing, setEditing] = useState<StackRow | null>(null);
  const [creating, setCreating] = useState(false);
  const [form, setForm] = useState<FormState>(EMPTY_FORM);
  const [saving, setSaving] = useState(false);

  function load() {
    authFetch("/api/stack")
      .then((r) => r.json())
      .then(setRows)
      .catch(() => setError("Gagal memuat data stack"));
  }

  useEffect(load, []);

  function openEdit(row: StackRow) {
    setEditing(row);
    setForm({ group: row.group, proficiency: row.proficiency, tools: row.tools.join(", ") });
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
    const payload = {
      group: form.group,
      proficiency: Number(form.proficiency),
      tools: form.tools.split(",").map((t) => t.trim()).filter(Boolean),
    };
    try {
      const res = editing
        ? await authFetch(`/api/stack/${editing.id}`, { method: "PUT", body: JSON.stringify(payload) })
        : await authFetch("/api/stack", { method: "POST", body: JSON.stringify(payload) });

      if (!res.ok) throw new Error((await res.json()).error || "Gagal menyimpan");
      closeModal();
      load();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Gagal menyimpan");
    } finally {
      setSaving(false);
    }
  }

  async function handleDelete(id: number) {
    if (!confirm("Hapus grup ini?")) return;
    const res = await authFetch(`/api/stack/${id}`, { method: "DELETE" });
    if (res.ok) setRows((r) => r && r.filter((x) => x.id !== id));
    else setError("Gagal menghapus grup");
  }

  if (!rows) return <p className="text-sm text-fog-muted">Memuat...</p>;

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <p className="text-sm text-fog-muted">{rows.length} grup skill</p>
        <button
          onClick={openCreate}
          className="inline-flex items-center gap-1.5 rounded-full bg-gradient-to-r from-accent to-accent-soft px-4 py-2 text-xs font-semibold text-ink"
        >
          <Plus className="size-3.5" /> Tambah grup
        </button>
      </div>

      {error && !editing && !creating && <p className="text-xs text-warm font-medium mb-3">{error}</p>}

      <div className="rounded-2xl border border-ink-border overflow-hidden">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-ink-panel-light/50 text-left text-xs text-fog-muted uppercase tracking-wide">
              <th className="px-4 py-3 font-semibold">Grup</th>
              <th className="px-4 py-3 font-semibold">Proficiency</th>
              <th className="px-4 py-3 font-semibold">Tools</th>
              <th className="px-4 py-3 font-semibold text-right">Aksi</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row) => (
              <tr key={row.id} className="border-t border-ink-border hover:bg-white/[0.02]">
                <td className="px-4 py-3 font-medium text-fog">{row.group}</td>
                <td className="px-4 py-3 text-fog-muted">{row.proficiency}%</td>
                <td className="px-4 py-3 text-fog-muted">{row.tools.join(", ")}</td>
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
                      onClick={() => handleDelete(row.id)}
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
        <Modal title={editing ? "Edit grup" : "Tambah grup"} onClose={closeModal}>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-fog-muted mb-1.5">Nama grup</label>
              <input
                value={form.group}
                onChange={(e) => setForm((f) => ({ ...f, group: e.target.value }))}
                placeholder="mis. Frontend"
                required
                className="w-full rounded-xl bg-white/[0.03] border border-white/[0.08] px-4 py-2.5 text-sm text-fog outline-none focus:border-accent/50"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-fog-muted mb-1.5">Proficiency (%)</label>
              <input
                type="number"
                min={0}
                max={100}
                value={form.proficiency}
                onChange={(e) => setForm((f) => ({ ...f, proficiency: Number(e.target.value) }))}
                className="w-28 rounded-xl bg-white/[0.03] border border-white/[0.08] px-3 py-2 text-sm text-fog outline-none focus:border-accent/50"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-fog-muted mb-1.5">
                Tools (pisahkan dengan koma)
              </label>
              <input
                value={form.tools}
                onChange={(e) => setForm((f) => ({ ...f, tools: e.target.value }))}
                placeholder="React, Next.js, Tailwind CSS"
                className="w-full rounded-xl bg-white/[0.03] border border-white/[0.08] px-4 py-2.5 text-sm text-fog outline-none focus:border-accent/50"
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