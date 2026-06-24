"use client";

import { Sparkles } from "lucide-react";
import { usePreloader } from "./PreloaderContext";

export default function Preloader() {
  const { visible, fading } = usePreloader();

  if (!visible) return null;

  return (
    <div
      aria-hidden="true"
      className={`fixed inset-0 z-[999] flex items-center justify-center bg-ink transition-opacity duration-300 ${
        fading ? "opacity-0" : "opacity-100"
      }`}
    >
      <div className="flex flex-col items-center gap-4">
        <span className="size-14 rounded-full bg-gradient-to-br from-accent to-warm flex items-center justify-center animate-pulse">
          <Sparkles className="size-6 text-ink" strokeWidth={2.5} />
        </span>
        <div className="h-1 w-32 rounded-full bg-white/5 overflow-hidden">
          <div className="h-full w-full bg-gradient-to-r from-accent to-warm animate-[loadbar_1.1s_ease-in-out_infinite]" />
        </div>
      </div>
    </div>
  );
}
