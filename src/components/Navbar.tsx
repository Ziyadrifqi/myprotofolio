"use client";

import { useEffect, useState } from "react";
import { Menu, X, TerminalSquare } from "lucide-react";
import { navLinks, profile } from "@/data/content";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-ink/90 backdrop-blur-md border-b border-ink-border"
          : "bg-transparent border-b border-transparent"
      }`}
    >
      <nav className="mx-auto max-w-6xl px-5 sm:px-8 h-16 flex items-center justify-between">
        <a
          href="#home"
          className="flex items-center gap-2 font-display font-semibold text-fog tracking-tight"
        >
          <TerminalSquare className="size-5 text-accent" strokeWidth={2} />
          <span className="text-[15px]">
            {profile.name.split(" ")[0]}
            <span className="text-accent">.</span>
            {profile.name.split(" ")[1]}
          </span>
        </a>

        <ul className="hidden md:flex items-center gap-1 font-mono text-[13px]">
          {navLinks.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                className="group relative px-3 py-2 text-fog-muted hover:text-fog transition-colors"
              >
                <span className="text-accent/70 group-hover:text-accent">
                  {link.tag}
                </span>
              </a>
            </li>
          ))}
        </ul>

        <a
          href="#contact"
          className="hidden md:inline-flex items-center gap-2 rounded-md border border-accent/40 bg-accent/10 px-4 py-2 font-mono text-[13px] text-accent hover:bg-accent/20 transition-colors"
        >
          Hubungi saya
        </a>

        <button
          aria-label={open ? "Tutup menu" : "Buka menu"}
          onClick={() => setOpen((v) => !v)}
          className="md:hidden text-fog p-2 -mr-2"
        >
          {open ? <X className="size-5" /> : <Menu className="size-5" />}
        </button>
      </nav>

      {open && (
        <div className="md:hidden border-t border-ink-border bg-ink px-5 pb-5 pt-2">
          <ul className="flex flex-col gap-1 font-mono text-sm">
            {navLinks.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className="block py-2.5 text-fog-muted hover:text-fog transition-colors"
                >
                  <span className="text-accent">{link.tag}</span>
                </a>
              </li>
            ))}
            <li className="pt-2">
              <a
                href="#contact"
                onClick={() => setOpen(false)}
                className="block text-center rounded-md border border-accent/40 bg-accent/10 px-4 py-2.5 text-accent"
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
