import { Check, X } from "lucide-react";
import { Reveal } from "@/components/site/Reveal";
import { useHome } from "@/content/home";

// A single comparison value: either a yes/no checkmark or a piece of text.
// `accent` styles the Yuno side; `highlight` bolds the standout row.
function CompareValue({
  value,
  accent,
  highlight,
}: {
  value: string | boolean;
  accent: boolean;
  highlight?: boolean;
}) {
  if (typeof value === "boolean") {
    return value ? (
      <Check className={`inline size-5 ${accent ? "text-accent" : "text-muted-foreground"}`} />
    ) : (
      <X className="inline size-5 text-muted-foreground/60" />
    );
  }
  const cls = accent
    ? highlight
      ? "text-accent font-medium"
      : "text-foreground"
    : highlight
      ? "text-foreground"
      : "text-muted-foreground";
  return <span className={cls}>{value}</span>;
}

export function ShotgunComparison() {
  const t = useHome();
  const rows = t.comparison.rows;
  return (
    <section className="px-6 py-16 border-t border-border">
      <div className="mx-auto max-w-5xl">
        <Reveal className="mb-10 text-center">
          <span className="inline-block text-[10px] font-medium uppercase tracking-[0.18em] text-accent border border-accent/40 rounded-full px-3 py-1 mb-5">
            {t.comparison.eyebrow}
          </span>
          <h2 className="text-3xl md:text-4xl font-medium tracking-tight text-balance max-w-[28ch] mx-auto leading-[1.1]">
            {t.comparison.titleA}{" "}
            <span className="serif italic text-muted-foreground">{t.comparison.titleEm}</span>
          </h2>
        </Reveal>

        <Reveal>
          {/* Desktop / tablet — 3-column table */}
          <div className="hidden md:block rounded-3xl bg-surface ring-1 ring-border overflow-hidden">
            <div className="grid grid-cols-[1.2fr_1fr_1fr] text-sm">
              <div className="p-5 border-b border-border" />
              <div className="p-5 border-b border-l border-border text-center">
                <div className="text-[10px] uppercase tracking-[0.18em] text-muted-foreground mb-1">{t.comparison.colStandardLabel}</div>
                <div className="text-lg font-medium">{t.comparison.colStandardName}</div>
              </div>
              <div className="p-5 border-b border-l border-border text-center bg-accent/5">
                <div className="text-[10px] uppercase tracking-[0.18em] text-accent mb-1">{t.comparison.colYunoLabel}</div>
                <div className="text-lg font-medium">{t.comparison.colYunoName}</div>
              </div>

              {rows.map((r) => (
                <div key={r.label} className="contents">
                  <div className={`p-5 border-t border-border ${r.highlight ? "font-medium" : "text-muted-foreground"}`}>
                    {r.label}
                  </div>
                  <div className="p-5 border-t border-l border-border text-center">
                    <CompareValue value={r.shotgun} accent={false} highlight={r.highlight} />
                  </div>
                  <div className="p-5 border-t border-l border-border text-center bg-accent/5">
                    <CompareValue value={r.yuno} accent highlight={r.highlight} />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Mobile — stacked cards so the Yuno column is never clipped */}
          <div className="md:hidden divide-y divide-border rounded-3xl bg-surface ring-1 ring-border overflow-hidden">
            {rows.map((r) => (
              <div key={r.label} className="p-4">
                <div className={`text-sm mb-3 ${r.highlight ? "font-medium" : "text-muted-foreground"}`}>
                  {r.label}
                </div>
                <div className="grid grid-cols-2 gap-2.5 text-sm">
                  <div className="rounded-xl ring-1 ring-border/70 p-3 text-center">
                    <div className="text-[10px] uppercase tracking-[0.16em] text-muted-foreground mb-1.5">{t.comparison.colStandardName}</div>
                    <CompareValue value={r.shotgun} accent={false} highlight={r.highlight} />
                  </div>
                  <div className="rounded-xl ring-1 ring-accent/40 bg-accent/5 p-3 text-center">
                    <div className="text-[10px] uppercase tracking-[0.16em] text-accent mb-1.5">{t.comparison.colYunoName}</div>
                    <CompareValue value={r.yuno} accent highlight={r.highlight} />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Reveal>

        <Reveal delay={0.1}>
          <p className="mt-8 text-center text-base md:text-lg text-muted-foreground max-w-[60ch] mx-auto text-pretty">
            {t.comparison.footerA} <span className="text-foreground font-medium">{t.comparison.footerShotgun}</span>{t.comparison.footerShotgunRest}{" "}
            <span className="text-foreground">{t.comparison.footerYuno}</span>
          </p>
        </Reveal>
      </div>
    </section>
  );
}
