import { Link } from "@tanstack/react-router";
import type { RolePain } from "@/content/role-landing";

// The needs selector. A horizontal row of chips under the hero: each chip is the
// one pain a visitor might feel. Clicking sets ?besoin= on the same route, which
// re-leads the hero and hoists that pain's grounded proof block. The click IS the
// qualification — no quiz, no gate (the audit's "open doors intelligently").
export function PainChips({
  pains,
  active,
  basePath,
  label,
}: {
  pains: RolePain[];
  active: string;
  basePath: "/clubs" | "/organizers";
  label: string;
}) {
  return (
    <section className="px-6 pt-2 pb-2">
      <div className="mx-auto max-w-5xl">
        <p className="mb-3 text-center text-xs font-medium uppercase tracking-[0.18em] text-muted-foreground">
          {label}
        </p>
        <div className="flex snap-x gap-2 overflow-x-auto pb-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden sm:flex-wrap sm:justify-center sm:overflow-visible">
          {pains.map((p) => {
            const isActive = p.id === active;
            return (
              <Link
                key={p.id}
                to={basePath}
                search={{ besoin: p.id }}
                aria-current={isActive ? "true" : undefined}
                className={
                  "shrink-0 snap-start rounded-full px-4 py-2 text-sm font-medium ring-1 transition-colors " +
                  (isActive
                    ? "bg-accent/15 text-accent ring-accent/40"
                    : "bg-surface text-muted-foreground ring-border hover:text-foreground hover:ring-accent/30")
                }
              >
                {p.chipLabel}
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
