import { ArrowRight, Check, Minus, ShieldCheck } from "lucide-react";
import { motion } from "motion/react";
import { cn } from "@/lib/utils";
import { useLanding } from "./context";
import { EASE, FadeIn, PrimaryCta, SectionHeader } from "./ui";

export function Compare() {
  const { t } = useLanding();
  const c = t.compare;
  return (
    <section
      id="compare"
      className="relative scroll-mt-20 bg-[#fafafa] px-4 py-24 sm:px-6 md:py-32"
    >
      <SectionHeader eyebrow={c.eyebrow} title={c.title} sub={c.sub} />

      <FadeIn className="mx-auto mt-14 max-w-5xl">
        {/* A real <table> (restyled as stacked cards on mobile) so search engines
            and AI assistants can read the comparison as structured data. */}
        <div className="yl-card overflow-hidden">
          <table className="w-full border-collapse text-left">
            <caption className="sr-only">
              {c.title} {c.sub}
            </caption>
            <colgroup>
              <col className="md:w-[170px]" />
              <col className="md:w-[56%]" />
              <col />
            </colgroup>
            <thead className="hidden border-b border-zinc-100 text-[12px] font-semibold uppercase tracking-[0.12em] text-zinc-400 md:table-header-group">
              <tr>
                <th scope="col" className="px-6 py-4 font-semibold">
                  {c.colPlatform}
                </th>
                <th scope="col" className="px-6 py-4 font-semibold">
                  {c.colPays}
                </th>
                <th scope="col" className="px-6 py-4 font-semibold">
                  {c.colKeeps}
                </th>
              </tr>
            </thead>
            <tbody>
              {c.rows.map((r, i) => {
                const yuno = i === 0;
                const youKeep = r.keeps === c.rows[0].keeps;
                return (
                  <motion.tr
                    key={r.name}
                    initial={{ opacity: 0, y: 8 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-60px" }}
                    transition={{ duration: 0.7, ease: EASE, delay: i * 0.05 }}
                    className={cn(
                      "grid grid-cols-1 gap-1 px-5 py-5 md:table-row md:p-0",
                      i > 0 && "border-t border-zinc-100",
                      yuno &&
                        "bg-[linear-gradient(90deg,rgba(232,25,44,0.06),rgba(232,25,44,0.015))]",
                    )}
                  >
                    <th
                      scope="row"
                      className="relative text-left align-top font-normal md:px-6 md:py-5"
                    >
                      {yuno && (
                        <span
                          aria-hidden
                          className="absolute -left-5 -top-5 bottom-[-1.25rem] w-[3px] bg-[var(--yuno-red)] md:inset-y-0 md:left-0"
                        />
                      )}
                      <span
                        className={cn(
                          "text-[15px] font-semibold tracking-tight",
                          yuno ? "text-[var(--yuno-red)]" : "text-zinc-950",
                        )}
                      >
                        {r.name}
                      </span>
                    </th>
                    <td
                      className={cn(
                        "align-top text-[14px] leading-relaxed md:px-6 md:py-5",
                        yuno ? "font-medium text-zinc-900" : "text-zinc-500",
                      )}
                    >
                      {r.pays}
                    </td>
                    <td className="align-top text-[14px] leading-relaxed md:px-6 md:py-5">
                      <span className="flex items-start gap-2">
                        {youKeep ? (
                          <Check
                            className="mt-1 size-3.5 shrink-0 text-emerald-600"
                            strokeWidth={3}
                          />
                        ) : (
                          <Minus className="mt-1 size-3.5 shrink-0 text-zinc-300" strokeWidth={3} />
                        )}
                        <span className={youKeep ? "font-medium text-zinc-900" : "text-zinc-500"}>
                          {r.keeps}
                        </span>
                      </span>
                    </td>
                  </motion.tr>
                );
              })}
            </tbody>
          </table>
        </div>

        <div className="mt-6 flex flex-col items-start gap-5 rounded-2xl bg-zinc-950 p-6 text-white md:flex-row md:items-center md:justify-between md:p-8">
          <div className="flex gap-4">
            <ShieldCheck className="mt-0.5 size-6 shrink-0 text-[var(--yuno-red)]" />
            <p className="max-w-2xl text-pretty text-[15px] leading-relaxed text-zinc-300">
              {c.extra}
            </p>
          </div>
          <PrimaryCta className="shrink-0 bg-white text-zinc-950 hover:bg-zinc-100">
            {t.hero.primary}
          </PrimaryCta>
        </div>
        <p className="mt-4 text-[12px] leading-relaxed text-zinc-400">{c.footnote}</p>
        <ul className="mt-5 flex flex-wrap gap-x-6 gap-y-2">
          {c.more.map((l) => (
            <li key={l.href}>
              <a
                href={l.href}
                className="group inline-flex items-center gap-1.5 text-[13.5px] font-medium text-zinc-900 underline decoration-zinc-300 underline-offset-4 transition-colors hover:decoration-zinc-900"
              >
                {l.label}
                <ArrowRight className="size-3.5 transition-transform group-hover:translate-x-0.5" />
              </a>
            </li>
          ))}
        </ul>
      </FadeIn>
    </section>
  );
}
