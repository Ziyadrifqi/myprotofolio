"use client";

import { useState } from "react";
import { LayoutDashboard, Layers, FolderKanban, Briefcase, Mail, LogOut, AlertTriangle } from "lucide-react";
import Modal from "./Modal";

export type AdminTabKey = "profile" | "stack" | "projects" | "experience" | "messages";

const NAV_ITEMS: { key: AdminTabKey; label: string; icon: typeof LayoutDashboard }[] = [
  { key: "profile", label: "Profile", icon: LayoutDashboard },
  { key: "stack", label: "Stack", icon: Layers },
  { key: "projects", label: "Projects", icon: FolderKanban },
  { key: "experience", label: "Experience", icon: Briefcase },
  { key: "messages", label: "Pesan Masuk", icon: Mail },
];

export default function AdminShell({
  active,
  onChange,
  onLogout,
  children,
}: {
  active: AdminTabKey;
  onChange: (tab: AdminTabKey) => void;
  onLogout: () => void;
  children: React.ReactNode;
}) {
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const activeItem = NAV_ITEMS.find((i) => i.key === active);

  function confirmLogout() {
    setShowLogoutModal(false);
    onLogout();
  }

  return (
    <div className="min-h-screen flex bg-ink">
      {/* Sidebar */}
      <aside className="hidden sm:flex w-60 shrink-0 flex-col border-r border-ink-border bg-ink-panel/60">
        <div className="px-6 py-6 border-b border-ink-border">
          <span className="font-display font-bold text-fog">Portfolio CMS</span>
        </div>

        <nav className="flex-1 px-3 py-4 space-y-1">
          {NAV_ITEMS.map((item) => {
            const Icon = item.icon;
            const isActive = item.key === active;
            return (
              <button
                key={item.key}
                onClick={() => onChange(item.key)}
                className={`w-full flex items-center gap-3 rounded-xl px-3.5 py-2.5 text-sm font-medium transition-colors ${
                  isActive
                    ? "bg-gradient-to-r from-accent/20 to-accent-soft/10 text-accent border border-accent/25"
                    : "text-fog-muted hover:text-fog hover:bg-white/5"
                }`}
              >
                <Icon className="size-4" strokeWidth={2} />
                {item.label}
              </button>
            );
          })}
        </nav>
      </aside>

      {/* Main content */}
      <div className="flex-1 min-w-0">
        {/* Topbar */}
        <header className="sticky top-0 z-40 border-b border-ink-border bg-ink/90 backdrop-blur-md px-5 sm:px-8 py-3.5">
          <div className="flex items-center justify-between gap-4">
            <div>
              <p className="text-[11px] font-medium uppercase tracking-wider text-fog-muted">Dashboard</p>
              <h1 className="font-display text-lg font-bold text-fog">{activeItem?.label}</h1>
            </div>

            {/* Tombol Keluar di Pojok Kanan Atas */}
            <button
              onClick={() => setShowLogoutModal(true)}
              className="inline-flex items-center gap-2 rounded-xl px-3.5 py-2 text-xs font-semibold text-fog-muted hover:text-warm border border-ink-border bg-white/[0.03] hover:bg-warm/10 hover:border-warm/30 transition-all cursor-pointer"
            >
              <LogOut className="size-4" />
              <span>Keluar</span>
            </button>
          </div>

          {/* Nav Tab untuk tampilan mobile */}
          <div className="sm:hidden flex gap-2 mt-3 overflow-x-auto pb-1">
            {NAV_ITEMS.map((item) => (
              <button
                key={item.key}
                onClick={() => onChange(item.key)}
                className={`shrink-0 rounded-full px-3.5 py-1.5 text-xs font-semibold transition-colors ${
                  item.key === active
                    ? "bg-gradient-to-r from-accent to-accent-soft text-ink"
                    : "glass text-fog-muted"
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>
        </header>

        <main className="px-5 sm:px-8 py-8 max-w-5xl">{children}</main>
      </div>

      {/* Modal Konfirmasi Logout */}
      {showLogoutModal && (
        <Modal title="Konfirmasi Keluar" onClose={() => setShowLogoutModal(false)}>
          <div className="space-y-5">
            <div className="flex items-start gap-4">
              <div className="size-11 rounded-2xl bg-warm/10 border border-warm/25 text-warm flex items-center justify-center shrink-0">
                <AlertTriangle className="size-6" />
              </div>
              <div className="space-y-1">
                <p className="text-sm font-semibold text-fog">Apakah Anda yakin ingin keluar?</p>
                <p className="text-xs text-fog-muted leading-relaxed">
                  Sesi login Anda di perangkat ini akan diakhiri. Pastikan semua perubahan data sudah disimpan sebelum keluar.
                </p>
              </div>
            </div>

            <div className="flex items-center justify-end gap-3 pt-3 border-t border-ink-border">
              <button
                type="button"
                onClick={() => setShowLogoutModal(false)}
                className="px-4 py-2 rounded-xl text-xs font-semibold text-fog-muted hover:text-fog border border-ink-border bg-white/5 hover:bg-white/10 transition-colors"
              >
                Batal
              </button>
              <button
                type="button"
                onClick={confirmLogout}
                className="px-4 py-2 rounded-xl text-xs font-semibold text-white bg-warm hover:bg-warm/90 transition-colors shadow-lg shadow-warm/20"
              >
                Ya, Keluar Sekarang
              </button>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
}
