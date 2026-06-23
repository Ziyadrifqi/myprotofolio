import { stack } from "@/data/content";
import { SectionHeading } from "./About";

export default function Stack() {
  return (
    <section id="stack" className="px-5 sm:px-8 py-20 sm:py-28 bg-ink-panel/40">
      <div className="mx-auto max-w-6xl">
        <SectionHeading
          tag="~/stack"
          title="Tools & teknologi"
          subtitle="Kombinasi yang biasa saya pakai untuk membangun aplikasi dari ujung ke ujung."
        />

        <div className="mt-10 grid sm:grid-cols-2 gap-5">
          {stack.map((s) => (
            <div
              key={s.group}
              className="rounded-xl border border-ink-border bg-ink-panel p-6"
            >
              <div className="flex items-center justify-between">
                <h3 className="font-display font-semibold text-fog">
                  {s.group}
                </h3>
                <span className="font-mono text-xs text-mint">
                  {s.proficiency}%
                </span>
              </div>

              <div className="mt-3 h-1.5 w-full rounded-full bg-ink-border overflow-hidden">
                <div
                  className="h-full rounded-full bg-gradient-to-r from-accent to-mint"
                  style={{ width: `${s.proficiency}%` }}
                />
              </div>

              <div className="mt-4 flex flex-wrap gap-2">
                {s.tools.map((tool) => (
                  <span
                    key={tool}
                    className="rounded-md border border-ink-border bg-ink px-2.5 py-1 font-mono text-xs text-fog-muted"
                  >
                    {tool}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
