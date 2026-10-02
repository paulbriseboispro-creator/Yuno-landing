import { motion } from "motion/react";
import { BarChart3, Check, Mail, Plug, RefreshCw, Users } from "lucide-react";
import { EASE, PrimaryCta } from "@/components/landing/ui";
import { useCrm } from "./content";

// Yuno CRM hero: the promise on the left (keep your ticketing, make your crowd
// come back), and on the right what the Console shows once Shotgun is plugged
// in — the base, the last night, the automation that just left.
export function CrmHero() {
  const h = useCrm().hero;
  return (
    <section
      data-ph-section="hero"
      className="relative isolate overflow-hidden pb-14 pt-6 sm:pb-20 md:pt-14"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-[720px] bg-[radial-gradient(60%_60%_at_30%_0%,var(--color-zinc-100)_0%,transparent_70%)]"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -right-40 top-24 -z-10 size-[560px] rounded-full bg-[radial-gradient(closest-side,rgba(232,25,44,0.12),transparent)]"
      />

      <div className="mx-auto grid max-w-6xl items-center gap-14 px-4 sm:px-6 lg:grid-cols-[1.08fr_0.92fr] lg:gap-8">
        <div className="text-center lg:text-left">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: EASE }}
            className="inline-flex items-center gap-2 rounded-full border border-zinc-200 bg-white/80 px-3.5 py-1.5 text-[12.5px] font-medium text-zinc-600 shadow-[0_1px_2px_rgba(10,10,11,0.04)] backdrop-blur"
          >
            <Plug className="size-3.5 text-[var(--yuno-red)]" />
            {h.eyebrow}
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 24, filter: "blur(8px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            transition={{ duration: 0.8, delay: 0.08, ease: EASE }}
            className="yl-h1 mt-6 text-balance text-zinc-950 lg:text-[3.6rem] xl:text-[4rem]"
          >
            {h.title}
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3, ease: EASE }}
            className="mx-auto mt-5 max-w-[34rem] text-pretty text-[15px] leading-relaxed text-zinc-500 md:text-[17px] lg:mx-0"
          >
            {h.sub}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.4, ease: EASE }}
            className="mt-8 flex flex-col items-center gap-3 sm:flex-row sm:justify-center lg:justify-start"
          >
            <PrimaryCta size="lg" cta="signup_crm">
              {h.cta}
            </PrimaryCta>
            <a href="#pricing" className="yl-btn-secondary h-12 px-6 text-[15px]">
              {h.secondary}
            </a>
          </motion.div>

          <motion.ul
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.7, delay: 0.55, ease: EASE }}
            className="mt-6 flex flex-wrap justify-center gap-x-5 gap-y-2 text-[13px] text-zinc-500 lg:justify-start"
          >
            {h.trust.map((t) => (
              <li key={t} className="inline-flex items-center gap-1.5">
                <Check className="size-3.5 text-emerald-500" strokeWidth={3} />
                {t}
              </li>
            ))}
          </motion.ul>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.25, ease: EASE }}
          className="relative mx-auto w-full max-w-md"
        >
          <div className="yl-card p-5 md:p-6">
            <div className="flex items-center justify-between gap-3">
              <span className="flex items-center gap-2.5">
                <span className="flex size-9 items-center justify-center rounded-xl bg-[#E8192C1f]">
                  <Users className="size-[17px] text-[var(--yuno-red)]" />
                </span>
                <span className="text-[15px] font-semibold tracking-tight text-zinc-950">
                  {h.card.title}
                </span>
              </span>
              <span className="inline-flex items-center gap-1 rounded-full bg-emerald-50 px-2.5 py-1 text-[11.5px] font-semibold text-emerald-700">
                <RefreshCw className="size-3" />
                {h.card.sync}
              </span>
            </div>
            <div className="mt-5 grid grid-cols-3 gap-2">
              {h.card.rows.map((r, i) => (
                <div key={r.label} className="rounded-2xl border border-zinc-100 bg-zinc-50/60 p-3">
                  <span
                    className={`block text-[22px] font-semibold tabular-nums tracking-tight ${i === 0 ? "text-zinc-950" : "text-zinc-800"}`}
                  >
                    {r.value}
                  </span>
                  <span className="mt-0.5 block text-[11.5px] leading-tight text-zinc-500">
                    {r.label}
                  </span>
                </div>
              ))}
            </div>
            <div className="mt-3 rounded-2xl border border-zinc-100 p-3.5">
              <div className="flex items-center gap-2 text-[11.5px] font-semibold uppercase tracking-[0.1em] text-zinc-400">
                <BarChart3 className="size-3.5" />
                {h.card.night}
              </div>
              <p className="mt-1.5 text-[14.5px] font-semibold tracking-tight text-zinc-950">
                {h.card.nightName}
              </p>
              <p className="text-[13px] text-zinc-500">{h.card.nightLine}</p>
              <svg viewBox="0 0 200 48" className="mt-3 h-12 w-full" aria-hidden>
                <path
                  d="M0 46 C30 44 50 40 70 34 S110 26 130 20 S170 10 200 2"
                  fill="none"
                  stroke="#E8192C"
                  strokeWidth="2.5"
                />
                <path
                  d="M0 46 C30 43 50 38 70 33 S110 22 130 17 S170 8 200 6"
                  fill="none"
                  stroke="#a1a1aa"
                  strokeWidth="1.5"
                  strokeDasharray="4 4"
                />
              </svg>
            </div>
            <div className="mt-3 flex items-center gap-2.5 rounded-2xl bg-zinc-950 px-3.5 py-3 text-white">
              <span className="flex size-8 items-center justify-center rounded-xl bg-white/10">
                <Mail className="size-4" />
              </span>
              <span className="text-[13px] font-medium">{h.card.auto}</span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
