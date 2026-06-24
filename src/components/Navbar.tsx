"use client";

import { useEffect, useState } from "react";
import { Menu, Sparkles, X } from "lucide-react";
import { navLinks, profile } from "@/data/content";
import { usePreloader } from "./PreloaderContext";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { trigger } = usePreloader();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  function navigateTo(hash: string) {
    return (e: React.MouseEvent) => {
      e.preventDefault();
      setOpen(false);
      trigger(() => {
        const target = document.querySelector(hash);
        target?.scrollIntoView({ behavior: "smooth", block: "start" });
      });
    };
  }

  return (
    <header className="fixed top-4 inset-x-0 z-50 px-4 sm:px-6">
      <nav
        className={`mx-auto max-w-4xl flex items-center justify-between rounded-full px-4 sm:px-5 h-14 transition-all duration-300 ${
          scrolled
            ? "glass shadow-lg shadow-black/20"
            : "bg-ink-panel/40 border border-ink-border backdrop-blur-md"
        }`}
      >
        <a
          href="#home"
          onClick={navigateTo("#home")}
          className="flex items-center gap-2 font-display font-bold text-fog tracking-tight shrink-0"
        >
          <span className="size-8 rounded-full bg-gradient-to-br from-accent to-warm flex items-center justify-center">
            <Sparkles className="size-4 text-ink" strokeWidth={2.5} />
          </span>
          <span className="text-[15px] hidden sm:inline">
            {profile.name.split(" ")[0]}
          </span>
        </a>

        <ul className="hidden md:flex items-center gap-1 text-sm font-medium">
          {navLinks.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                onClick={navigateTo(link.href)}
                className="px-3.5 py-2 rounded-full text-fog-muted hover:text-fog hover:bg-white/5 transition-colors"
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        <a
          href="#contact"
          onClick={navigateTo("#contact")}
          className="hidden md:inline-flex items-center gap-1.5 rounded-full bg-gradient-to-r from-accent to-accent-soft px-4 py-2 text-sm font-semibold text-ink hover:opacity-90 transition-opacity"
        >
          Hubungi saya
        </a>

        <button
          aria-label={open ? "Tutup menu" : "Buka menu"}
          onClick={() => setOpen((v) => !v)}
          className="md:hidden text-fog p-2 -mr-1"
        >
          {open ? <X className="size-5" /> : <Menu className="size-5" />}
        </button>
      </nav>

      {open && (
        <div className="md:hidden mx-auto max-w-4xl mt-2 rounded-2xl glass px-5 py-4 shadow-xl shadow-black/30">
          <ul className="flex flex-col gap-1 text-sm font-medium">
            {navLinks.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  onClick={navigateTo(link.href)}
                  className="block py-2.5 px-2 rounded-lg text-fog-muted hover:text-fog hover:bg-white/5 transition-colors"
                >
                  {link.label}
                </a>
              </li>
            ))}
            <li className="pt-2">
              <a
                href="#contact"
                onClick={navigateTo("#contact")}
                className="block text-center rounded-full bg-gradient-to-r from-accent to-accent-soft px-4 py-2.5 font-semibold text-ink"
              >
                Hubungi saya
              </a>
            </li>
          </ul>
        </div>
      )}
    </header>
  );
}
