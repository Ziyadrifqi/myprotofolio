import { profile } from "@/data/content";

export default function Footer() {
  return (
    <footer className="border-t border-ink-border px-5 sm:px-8 py-8">
      <div className="mx-auto max-w-6xl flex flex-col sm:flex-row items-center justify-between gap-3">
        <p className="font-mono text-xs text-fog-muted">
          © {new Date().getFullYear()} {profile.name}. Dibangun dengan Next.js & Tailwind CSS.
        </p>
        <p className="font-mono text-xs text-fog-muted">
          <span className="text-mint">●</span> exit code 0
        </p>
      </div>
    </footer>
  );
}
