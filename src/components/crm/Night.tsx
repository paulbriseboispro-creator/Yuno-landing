import { useRef, useState } from "react";
import {
  AnimatePresence,
  motion,
  useInView,
  useReducedMotion,
  useScroll,
  useTransform,
} from "motion/react";
import { Download, Search, Send } from "lucide-react";
import { cn } from "@/lib/utils";
import { useCrm } from "./content";
import { Accent, Avatar, CtaButton, Marquee, Reveal, StatusTag, useFmt } from "./ui";

// The reference's big night block: "Instagram already knows who will buy" →
// "Your tickets already know who comes back. Now you do too." A live customer
// file on a red halo, the crosshair frame lines, then three rows of feature
// chips drifting in opposite directions and the CTA.

const DOTS = ["#E3141B", "#FF6B35", "#17A34A", "#E59A0B", "#FF948D", "#F7F2F1"];

function ClientsTable() {
  const t = useCrm().night.table;
  const { num } = useFmt();
  const [f, setF] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.35 });
  const tones: (null | string[])[] = [null, ["hot"], ["new"], ["cold"]];
  const rows = t.rows.filter((r) => !tones[f] || tones[f]!.includes(r.tone));
  return (
    <div ref={ref} className="relative bg-white p-6 text-left sm:p-8 sm:pb-24">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <div className="font-yc-display text-[24px] font-semibold tracking-[-0.025em] text-yc-ink">
            {t.title}
          </div>
          <div className="mt-0.5 text-[13.5px] text-yc-sand-500">{t.sub}</div>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <span className="flex h-9 w-[220px] items-center gap-2 rounded-full border border-yc-sand-200 bg-white px-3 text-[13.5px] text-yc-sand-400">
            <Search className="size-4" />
            {t.search}
          </span>
          <div className="inline-flex gap-0.5 rounded-full bg-yc-sand-100 p-[3px]">
            {t.filters.map((x, i) => (
              <button
                key={x}
                type="button"
                onClick={() => setF(i)}
                className={cn(
                  "h-[30px] rounded-full px-3.5 text-[13px] font-semibold transition-colors",
                  f === i ? "bg-yc-ink text-white" : "text-yc-sand-600 hover:text-yc-ink",
                )}
              >
                {x}
              </button>
            ))}
          </div>
          <span className="hidden h-9 items-center gap-1.5 rounded-full border border-yc-sand-200 px-3.5 text-[13.5px] font-semibold text-yc-ink sm:flex">
            <Download className="size-4" />
            {t.export}
          </span>
        </div>
      </div>
      <div className="mt-5 overflow-x-auto">
        <table className="w-full min-w-[760px] border-separate border-spacing-0 text-[14px]">
          <thead>
            <tr>
              {t.cols.map((c, i) => (
                <th
                  key={c}
                  className={cn(
                    "whitespace-nowrap border-b border-yc-sand-200 px-3.5 py-2.5 text-left font-yc-mono text-[11.5px] font-medium uppercase tracking-[0.05em] text-yc-sand-500",
                    (i === 1 || i === 2) && "text-right",
                  )}
                >
                  {c}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            <AnimatePresence initial={false}>
              {rows.map((r, i) => (
                <motion.tr
                  key={r.name}
                  layout
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: inView ? 1 : 0, y: inView ? 0 : 8 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.45, delay: inView ? i * 0.05 : 0 }}
                  className={cn(
                    "transition-colors hover:bg-yc-paper",
                    i === 1 && f === 0 && "bg-yc-red-50 hover:bg-yc-red-50",
                  )}
                >
                  <td className="border-b border-yc-sand-100 px-3.5 py-3">
                    <span className="flex items-center gap-2.5">
                      <Avatar ini={r.ini} tone={r.tone as "hot"} size={34} />
                      <span className="flex flex-col">
                        <span className="whitespace-nowrap font-semibold leading-[18px] text-yc-ink">
                          {r.name}
                        </span>
                        <span className="text-[12.5px] leading-4 text-yc-red-600">{r.sub}</span>
                      </span>
                    </span>
                  </td>
                  <td className="border-b border-yc-sand-100 px-3.5 py-3 text-right font-medium tabular-nums text-yc-ink">
                    {num(r.nights)}
                  </td>
                  <td className="whitespace-nowrap border-b border-yc-sand-100 px-3.5 py-3 text-right text-yc-sand-700">
                    {r.last}
                  </td>
                  <td className="border-b border-yc-sand-100 px-3.5 py-3">
                    <span className="flex min-w-[130px] items-center gap-2.5">
                      <span className="h-1.5 flex-1 overflow-hidden rounded-full bg-yc-sand-100">
                        <span
                          className="block h-full rounded-full"
                          style={{
                            width: inView ? `${r.score}%` : "0%",
                            background: "var(--gradient-brand)",
                            transition: `width 1s cubic-bezier(.22,1,.36,1) ${0.2 + i * 0.06}s`,
                          }}
                        />
                      </span>
                      <span className="w-6 text-right text-[13px] font-semibold tabular-nums text-yc-ink">
                        {r.score}
                      </span>
                    </span>
                  </td>
                  <td className="whitespace-nowrap border-b border-yc-sand-100 px-3.5 py-3 text-[13px] text-yc-sand-600">
                    {r.reach}
                  </td>
                  <td className="border-b border-yc-sand-100 px-3.5 py-3">
                    <StatusTag tone={r.tone as "hot"}>{r.tag}</StatusTag>
                  </td>
                </motion.tr>
              ))}
            </AnimatePresence>
          </tbody>
        </table>
      </div>
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6, delay: 1.1 }}
        className="pointer-events-none absolute bottom-5 left-1/2 hidden -translate-x-1/2 items-center gap-3 rounded-full bg-yc-ink py-2 pl-5 pr-2 text-[14px] font-medium text-white shadow-[var(--shadow-md)] sm:flex"
      >
        <span className="whitespace-nowrap">
          {t.filters[1]} · {num(1284)}
        </span>
        <span
          className="inline-flex h-8 items-center gap-1.5 rounded-full px-3.5 text-[13px] font-semibold"
          style={{ background: "var(--gradient-brand)" }}
        >
          <Send className="size-3.5" />
          E-mail
        </span>
      </motion.div>
    </div>
  );
}

export function CrmNight() {
  const n = useCrm().night;
  const frame = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: frame, offset: ["start end", "start 0.3"] });
  const scale = useTransform(scrollYProgress, [0, 1], [reduce ? 1 : 0.9, 1]);
  const y = useTransform(scrollYProgress, [0, 1], [reduce ? 0 : 60, 0]);

  return (
    <section id="fonctionnalites" data-ph-section="night" className="relative px-2 sm:px-4">
      <div className="yc-aura--night relative isolate overflow-hidden rounded-[32px] px-4 pb-20 pt-56 sm:rounded-[40px] sm:px-6 sm:pt-64">
        {/* the reference's crosshair frame lines */}
        <div aria-hidden className="yc-gridlines hidden md:block">
          <i className="bottom-0 left-[20%] top-0 w-px" />
          <i className="bottom-0 right-[20%] top-0 w-px" />
          <i className="inset-x-0 top-[96px] h-px" />
          <i className="inset-x-0 bottom-[96px] h-px" />
          <span className="yc-plus" style={{ left: "20%", top: 96 }} />
          <span className="yc-plus" style={{ left: "80%", top: 96 }} />
          <span className="yc-plus" style={{ left: "20%", top: "calc(100% - 96px)" }} />
          <span className="yc-plus" style={{ left: "80%", top: "calc(100% - 96px)" }} />
        </div>
        <div
          aria-hidden
          className="pointer-events-none absolute left-1/2 top-[38%] -z-10 h-[560px] w-[900px] -translate-x-1/2 rounded-full bg-[radial-gradient(closest-side,rgba(227,20,27,.45),rgba(255,107,53,.12)_55%,transparent)] blur-2xl"
        />

        <div className="mx-auto max-w-[840px] text-center">
          <Reveal>
            <h2 className="yc-h2 text-yc-on-night">
              <Accent text={n.title} accent={n.accent} />
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="mx-auto mt-6 max-w-[38rem] text-pretty text-[17px] leading-[1.6] text-yc-on-night-2">
              {n.sub}
            </p>
          </Reveal>
        </div>

        <motion.div
          ref={frame}
          style={{ scale, y }}
          className="relative mx-auto mt-14 max-w-[1080px]"
        >
          <div
            className="overflow-hidden rounded-[28px]"
            style={{ boxShadow: "var(--shadow-halo)" }}
          >
            <ClientsTable />
          </div>
        </motion.div>

        <div className="mt-20 text-center">
          <Reveal>
            <span className="text-[17px] font-medium text-yc-on-night">{n.chipsTitle}</span>
          </Reveal>
          <div className="mx-auto mt-7 flex max-w-[1000px] flex-col gap-3">
            {n.chips.map((row, r) => (
              <Marquee key={r} reverse={r % 2 === 1} duration={44 + r * 8} gap={12}>
                {row.map((chip, i) => (
                  <span
                    key={chip}
                    className="inline-flex flex-none items-center gap-2.5 whitespace-nowrap rounded-[12px] border border-white/10 bg-white/[.06] px-4 py-2.5 text-[15px] font-medium text-yc-on-night"
                  >
                    <span
                      className="size-2.5 rounded-full"
                      style={{ background: DOTS[(i + r * 2) % DOTS.length] }}
                    />
                    {chip}
                  </span>
                ))}
              </Marquee>
            ))}
          </div>
          <Reveal delay={0.1} className="mt-12 flex justify-center">
            <CtaButton size="lg" ring cta="night_crm">
              {n.cta}
            </CtaButton>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
