"use client";

import Image from "next/image";
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
      <Image
  src="/images/foto.png"
  alt="Ziyad Rifqi"
  width={78}
  height={50}
  className="rounded-full border border-white/10"
/>
        <div className="h-1 w-32 rounded-full bg-white/5 overflow-hidden">
          <div className="h-full w-full bg-gradient-to-r from-accent to-warm animate-[loadbar_1.1s_ease-in-out_infinite]" />
        </div>
      </div>
    </div>
  );
}
