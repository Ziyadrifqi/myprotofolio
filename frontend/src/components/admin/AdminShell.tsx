"use client";

import { LayoutDashboard, Layers, FolderKanban, Briefcase, LogOut } from "lucide-react";

export type AdminTabKey = "profile" | "stack" | "projects" | "experience";

const NAV_ITEMS: { key: AdminTabKey; label: string; icon: typeof LayoutDashboard }[] = [
  { key: "profile", label: "Profile", icon: LayoutDashboard },
  { key: "stack", label: "Stack", icon: Layers },
  { key: "projects", label: "Projects", icon: FolderKanban },
  { key: "experience", label: "Experience", icon: Briefcase },
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
  const activeItem = NAV_ITEMS.find((i) => i.key === active);

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

        <div className="px-3 py-4 border-t border-ink-border">
          <button
            onClick={onLogout}
            className="w-full flex items-center gap-3 rounded-xl px-3.5 py-2.5 text-sm font-medium text-fog-muted hover:text-warm hover:bg-white/5 transition-colors"
          >
            <LogOut className="size-4" />
            Keluar
          </button>
        </div>
      </aside>

      {/* Main content */}
      <div className="flex-1 min-w-0">
        {/* Topbar (also holds nav on mobile) */}
        <header className="sticky top-0 z-40 border-b border-ink-border bg-ink/90 backdrop-blur-md px-5 sm:px-8 py-4">
          <div className="flex items-center justify-between gap-4">
            <div>
              <p className="text-xs text-fog-muted">Admin</p>
              <h1 className="font-display text-lg font-bold text-fog">{activeItem?.label}</h1>
            </div>
            <button
              onClick={onLogout}
              className="sm:hidden text-xs font-semibold text-fog-muted hover:text-warm"
            >
              Keluar
            </button>
          </div>

          <div className="sm:hidden flex gap-2 mt-4 overflow-x-auto">
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
    </div>
  );
}