import type { Profile } from "@/lib/api";

export default function Footer({ profile }: { profile: Profile }) {
  return (
    <footer className="px-5 sm:px-8 py-8">
      <div className="mx-auto max-w-6xl glass rounded-2xl px-6 py-5 flex flex-col sm:flex-row items-center justify-between gap-3">
        <p className="text-xs text-fog-muted">
          © {new Date().getFullYear()} {profile.name}.
        </p>
        <p className="text-xs text-fog-muted flex items-center gap-1.5">
          <span className="size-1.5 rounded-full bg-accent" />
          Dibuat dengan semangat
        </p>
      </div>
    </footer>
  );
}
