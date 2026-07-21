"use client";

import { X } from "lucide-react";
import { useEffect } from "react";

export default function Modal({
  title,
  onClose,
  children,
}: {
  title: string;
  onClose: () => void;
  children: React.ReactNode;
}) {
  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  return (
    <div className="fixed inset-0 z-[200] flex items-start sm:items-center justify-center bg-black/60 backdrop-blur-sm px-4 py-8 overflow-y-auto">
      <div className="w-full max-w-lg rounded-2xl bg-ink-panel border border-ink-border shadow-2xl">
        <div className="flex items-center justify-between px-6 py-4 border-b border-ink-border">
          <h2 className="font-display font-bold text-fog">{title}</h2>
          <button
            onClick={onClose}
            aria-label="Tutup"
            className="size-8 rounded-full flex items-center justify-center text-fog-muted hover:text-fog hover:bg-white/5 transition-colors"
          >
            <X className="size-4" />
          </button>
        </div>
        <div className="px-6 py-5">{children}</div>
      </div>
    </div>
  );
}