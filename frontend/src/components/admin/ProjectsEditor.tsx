"use client";

import { useEffect, useState } from "react";
import { Pencil, Plus, Trash2 } from "lucide-react";
import { authFetch } from "@/lib/adminApi";
import Modal from "./Modal";
import ImageUploader from "./ImageUploader";

type ProjectRow = {
  dbId: number;
  id: string;
  title: string;
  description: string;
  tech: string[];
  image: string;
  href: string | null;
  repo: string | null;
};

type FormState = {
  title: string;
  description: string;
  tech: string;
  image: string;
  href: string;
  repo: string;
};

const EMPTY_FORM: FormState = { title: "", description: "", tech: "", image: "", href: "", repo: "" };

export default function ProjectsEditor() {
  const [rows, setRows] = useState<ProjectRow[] | null>(null);
  const [error, setError] = useState("");
  const [editing, setEditing] = useState<ProjectRow | null>(null);
  const [creating, setCreating] = useState(false);
  const [form, setForm] = useState<FormState>(EMPTY_FORM);
  const [saving, setSaving] = useState(false);

  function load() {
    authFetch("/api/projects")
      .then((r) => r.json())
      .then(setRows)
      .catch(() => setError("Gagal memuat data projects"));
  }

  useEffect(load, []);

  function openEdit(row: ProjectRow) {
    setEditing(row);
    setForm({
      title: row.title,
      description: row.description,
      tech: row.tech.join(", "),
      image: row.image,
      href: row.href || "",
      repo: row.repo || "",
    });
  }

  function openCreate() {
    setCreating(true);
    setForm({ ...EMPTY_FORM, image: "/images/projects/placeholder-4.jpg" });
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
    const tech = form.tech.split(",").map((t) => t.trim()).filter(Boolean);

    try {
      let res: Response;
      if (editing) {
        res = await authFetch(`/api/projects/${editing.dbId}`, {
          method: "PUT",
          body: JSON.stringify({
            title: form.title,
            description: form.description,
            tech,
            image: form.image,
            href: form.href || null,
            repo: form.repo || null,
          }),
        });
      } else {
        res = await authFetch("/api/projects", {
          method: "POST",
          body: JSON.stringify({
            projectKey: `proj-${Date.now()}`,
            title: form.title,
            description: form.description,
            tech,
            image: form.image,
            href: form.href || null,
            repo: form.repo || null,
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
    if (!confirm("Hapus proyek ini?")) return;
    const res = await authFetch(`/api/projects/${dbId}`, { method: "DELETE" });
    if (res.ok) setRows((r) => r && r.filter((x) => x.dbId !== dbId));
    else setError("Gagal menghapus proyek");
  }

  if (!rows) return <p className="text-sm text-fog-muted">Memuat...</p>;

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <p className="text-sm text-fog-muted">{rows.length} proyek</p>
        <button
          onClick={openCreate}
          className="inline-flex items-center gap-1.5 rounded-full bg-gradient-to-r from-accent to-accent-soft px-4 py-2 text-xs font-semibold text-ink"
        >
          <Plus className="size-3.5" /> Tambah proyek
        </button>
      </div>

      {error && !editing && !creating && <p className="text-xs text-warm font-medium mb-3">{error}</p>}

      <div className="rounded-2xl border border-ink-border overflow-hidden">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-ink-panel-light/50 text-left text-xs text-fog-muted uppercase tracking-wide">
              <th className="px-4 py-3 font-semibold">Judul</th>
              <th className="px-4 py-3 font-semibold">Tech</th>
              <th className="px-4 py-3 font-semibold">Link</th>
              <th className="px-4 py-3 font-semibold text-right">Aksi</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row) => (
              <tr key={row.dbId} className="border-t border-ink-border hover:bg-white/[0.02]">
                <td className="px-4 py-3 font-medium text-fog max-w-[260px]">
                  <p className="truncate">{row.title}</p>
                </td>
                <td className="px-4 py-3 text-fog-muted max-w-[200px]">
                  <p className="truncate">{row.tech.join(", ")}</p>
                </td>
                <td className="px-4 py-3 text-fog-muted">
                  {row.href || row.repo ? "Ada" : "—"}
                </td>
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
        <Modal title={editing ? "Edit proyek" : "Tambah proyek"} onClose={closeModal}>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-fog-muted mb-1.5">Judul</label>
              <input
                value={form.title}
                onChange={(e) => setForm((f) => ({ ...f, title: e.target.value }))}
                required
                className="w-full rounded-xl bg-white/[0.03] border border-white/[0.08] px-4 py-2.5 text-sm text-fog outline-none focus:border-accent/50"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-fog-muted mb-1.5">Deskripsi</label>
              <textarea
                value={form.description}
                onChange={(e) => setForm((f) => ({ ...f, description: e.target.value }))}
                rows={3}
                className="w-full rounded-xl bg-white/[0.03] border border-white/[0.08] px-4 py-2.5 text-sm text-fog outline-none focus:border-accent/50 resize-none"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-fog-muted mb-1.5">
                Tech (pisahkan dengan koma)
              </label>
              <input
                value={form.tech}
                onChange={(e) => setForm((f) => ({ ...f, tech: e.target.value }))}
                className="w-full rounded-xl bg-white/[0.03] border border-white/[0.08] px-4 py-2.5 text-sm text-fog outline-none focus:border-accent/50"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-fog-muted mb-1.5">Gambar proyek</label>
              <ImageUploader
                value={form.image}
                onChange={(path) => setForm((f) => ({ ...f, image: path }))}
                folder="projects"
              />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold text-fog-muted mb-1.5">Link demo</label>
                <input
                  value={form.href}
                  onChange={(e) => setForm((f) => ({ ...f, href: e.target.value }))}
                  className="w-full rounded-xl bg-white/[0.03] border border-white/[0.08] px-4 py-2.5 text-sm text-fog outline-none focus:border-accent/50"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-fog-muted mb-1.5">Link repo</label>
                <input
                  value={form.repo}
                  onChange={(e) => setForm((f) => ({ ...f, repo: e.target.value }))}
                  className="w-full rounded-xl bg-white/[0.03] border border-white/[0.08] px-4 py-2.5 text-sm text-fog outline-none focus:border-accent/50"
                />
              </div>
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