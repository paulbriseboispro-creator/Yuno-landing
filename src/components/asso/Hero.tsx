import { useEffect, useState, type FormEvent } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import {
  ArrowLeft,
  ArrowRight,
  BadgeCheck,
  Check,
  Clock,
  GraduationCap,
  Lock,
  Mail,
  Minus,
  Plus,
  ScanLine,
  Ticket,
  Users,
  Wallet,
  type LucideIcon,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useLanding } from "@/components/landing/context";
import { EASE, FounderCta } from "@/components/landing/ui";
import { useAsso } from "./content";

const NOTIF_ICONS: Record<string, { Icon: LucideIcon; bg: string; fg: string }> = {
  ticket: { Icon: Ticket, bg: "#E8192C26", fg: "#E8192C" },
  wallet: { Icon: Wallet, bg: "#7C3AED26", fg: "#7C3AED" },
  scan: { Icon: ScanLine, bg: "#05966926", fg: "#059669" },
  mail: { Icon: Mail, bg: "#0284C726", fg: "#0284C7" },
};

// The association landing's hero: the promise on the left with the first
// signup question inline (the association's name opens the signup dialog on
// the next question), and on the right the ticket page students actually see.
export function AssoHero() {
  const c = useAsso();
  const h = c.hero;
  const { openSignup } = useLanding();
  const [name, setName] = useState("");

  function onSubmit(e: FormEvent) {
    e.preventDefault();
    openSignup({ orgName: name.trim() || undefined });
  }

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
            className="inline-flex items-center gap-3 rounded-full border border-zinc-200 bg-white/80 px-3.5 py-1.5 text-[12.5px] font-medium text-zinc-600 shadow-[0_1px_2px_rgba(10,10,11,0.04)] backdrop-blur"
          >
            <span className="inline-flex items-center gap-1.5 whitespace-nowrap">
              <GraduationCap className="size-3.5 text-[var(--yuno-red)]" />
              {h.chip}
            </span>
            <span className="hidden h-3.5 w-px bg-zinc-200 sm:block" />
            <span className="hidden items-center gap-1.5 whitespace-nowrap sm:inline-flex">
              <BadgeCheck className="size-3.5 text-emerald-500" />
              {h.chipBadge}
            </span>
          </motion.div>

          <h1 className="yl-h1 mt-6 text-balance text-zinc-950 lg:text-[3.6rem] xl:text-[4rem]">
            <motion.span
              className="mx-auto mb-4 block max-w-[34rem] text-balance text-[13.5px] font-medium leading-snug tracking-normal text-zinc-500 md:mb-5 md:text-[15px] lg:mx-0"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.04, ease: EASE }}
            >
              {h.kicker}
            </motion.span>
            <motion.span
              className="block"
              initial={{ opacity: 0, y: 24, filter: "blur(8px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              transition={{ duration: 0.8, delay: 0.08, ease: EASE }}
            >
              {h.titleA}
            </motion.span>
            <motion.span
              className="block bg-gradient-to-b from-zinc-950 to-zinc-600 bg-clip-text text-transparent"
              initial={{ opacity: 0, y: 24, filter: "blur(8px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              transition={{ duration: 0.8, delay: 0.18, ease: EASE }}
            >
              {h.titleB}
            </motion.span>
          </h1>

          <motion.p
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3, ease: EASE }}
            className="mx-auto mt-5 max-w-[34rem] text-pretty text-[15px] leading-relaxed text-zinc-500 md:text-[17px] lg:mx-0"
          >
            {h.sub}
          </motion.p>

          {/* First question of the signup, right in the hero. */}
          <motion.form
            onSubmit={onSubmit}
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.4, ease: EASE }}
            className="mx-auto mt-8 flex max-w-[34rem] flex-col gap-2 sm:flex-row sm:rounded-full sm:border sm:border-zinc-200 sm:bg-white sm:p-1.5 sm:shadow-[0_1px_2px_rgba(10,10,11,0.04),0_16px_36px_-20px_rgba(10,10,11,0.25)] lg:mx-0"
          >
            <label className="sr-only" htmlFor="asso-hero-name">
              {h.inputLabel}
            </label>
            <input
              id="asso-hero-name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder={h.inputPh}
              autoComplete="organization"
              maxLength={120}
              className="h-12 w-full min-w-0 rounded-full border border-zinc-200 bg-white px-5 text-[16px] text-zinc-950 outline-none placeholder:text-zinc-400 focus:border-zinc-950 sm:h-11 sm:flex-1 sm:border-0 sm:text-[15px]"
            />
            <button
              type="submit"
              data-ph-cta="signup"
              className="yl-btn-primary group h-12 shrink-0 px-5 text-[15px] sm:h-11 sm:text-[14px]"
            >
              {h.primary}
              <ArrowRight className="size-4 transition-transform duration-300 group-hover:translate-x-0.5" />
            </button>
          </motion.form>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.7, delay: 0.55 }}
            className="mt-5 flex flex-col items-center gap-4 lg:flex-row lg:items-center lg:gap-6"
          >
            <ul className="flex flex-wrap items-center justify-center gap-x-5 gap-y-2 text-[12.5px] text-zinc-500 lg:justify-start">
              {h.note.map((n) => (
                <li key={n} className="inline-flex items-center gap-1.5">
                  <Check className="size-3.5 text-emerald-500" strokeWidth={2.5} />
                  {n}
                </li>
              ))}
            </ul>
          </motion.div>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.7, delay: 0.65 }}
            className="mt-6 flex justify-center lg:justify-start"
          >
            <FounderCta size="sm">{h.secondary}</FounderCta>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.35, ease: EASE }}
          className="relative mx-auto w-full max-w-[330px]"
        >
          <PhoneMock />
          <div className="yl-float-card absolute -right-3 top-10 hidden items-center gap-2 px-3 py-2 text-[12px] font-medium text-zinc-700 sm:flex lg:-right-10">
            <Lock className="size-3.5 text-[var(--yuno-red)]" />
            {c.features.items.find((f) => f.id === "private")?.title}
          </div>
          <div className="relative z-10 mx-auto -mt-6 w-[92%] sm:w-[300px] lg:-ml-20">
            <NotificationStack />
          </div>
        </motion.div>
      </div>

      <div className="mx-auto mt-14 max-w-4xl px-4 sm:px-6 md:mt-20">
        <ul className="flex flex-wrap items-center justify-center gap-2">
          {h.types.map((ty, i) => (
            <motion.li
              key={ty}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.7 + i * 0.05, ease: EASE }}
              className="rounded-full border border-zinc-200 bg-white px-3.5 py-1.5 text-[13px] font-medium text-zinc-600"
            >
              {ty}
            </motion.li>
          ))}
        </ul>
      </div>
    </section>
  );
}

// The student's ticket page, drawn in the app's dark UI (same layout as the
// real checkout: tiers, guest list, service fee shown before paying).
function PhoneMock() {
  const p = useAsso().hero.phone;
  return (
    <div className="yl-keep relative rounded-[2.6rem] bg-zinc-950 p-2.5 shadow-[0_0_0_1px_rgba(10,10,11,0.9),0_50px_100px_-30px_rgba(10,10,11,0.55),0_18px_40px_-18px_rgba(232,25,44,0.35)]">
      <div className="relative overflow-hidden rounded-[2.1rem] bg-[#0b0b0c] text-white">
        <div className="absolute left-1/2 top-2.5 z-10 h-[22px] w-[88px] -translate-x-1/2 rounded-full bg-black" />
        <div className="bg-[radial-gradient(120%_90%_at_50%_0%,rgba(232,25,44,0.45),transparent_70%)] px-5 pb-5 pt-12">
          <span className="flex size-8 items-center justify-center rounded-lg bg-white/10">
            <ArrowLeft className="size-4" />
          </span>
          <p className="mt-5 text-[22px] font-extrabold uppercase tracking-tight">{p.heading}</p>
          <p className="text-[13px] text-white/60">{p.event}</p>
        </div>

        <div className="px-5">
          <div className="flex items-center justify-between">
            {p.steps.map((st, i) => (
              <div key={st} className="flex flex-1 items-center">
                <div className="flex flex-col items-center gap-1">
                  <span
                    className={cn(
                      "flex size-6 items-center justify-center rounded-full border text-[10px] font-semibold",
                      i === 0
                        ? "border-[#E8192C] bg-[#E8192C]/15 text-[#ff4d5e]"
                        : "border-white/15 text-white/35",
                    )}
                  >
                    {i + 1}
                  </span>
                  <span
                    className={cn(
                      "font-mono text-[8.5px] uppercase tracking-[0.14em]",
                      i === 0 ? "text-white" : "text-white/30",
                    )}
                  >
                    {st}
                  </span>
                </div>
                {i < p.steps.length - 1 && <span className="mx-1.5 mb-4 h-px flex-1 bg-white/10" />}
              </div>
            ))}
          </div>

          <div className="mt-4 space-y-2">
            {p.tiers.map((tier, i) => {
              const soldOut = !!tier.status;
              return (
                <div
                  key={tier.name}
                  className={cn(
                    "flex items-center justify-between rounded-xl border px-3.5 py-3",
                    soldOut ? "border-white/5 bg-white/[0.03]" : "border-white/15 bg-white/[0.06]",
                  )}
                >
                  <div>
                    <p
                      className={cn(
                        "text-[12.5px] font-bold uppercase tracking-wide",
                        soldOut && "text-white/40 line-through",
                      )}
                    >
                      {tier.name}
                    </p>
                    <p className={cn("text-[15px] font-bold", soldOut && "text-white/40")}>
                      {tier.price}
                    </p>
                  </div>
                  {soldOut ? (
                    <span className="rounded-md bg-white/10 px-2 py-1 text-[10px] font-semibold uppercase tracking-wide text-white/60">
                      {tier.status}
                    </span>
                  ) : (
                    <div className="flex items-center gap-2">
                      <span className="flex size-7 items-center justify-center rounded-md bg-white/5 text-white/40">
                        <Minus className="size-3.5" />
                      </span>
                      <span className="w-3 text-center text-[14px] font-semibold">{i}</span>
                      <span className="flex size-7 items-center justify-center rounded-md bg-[#E8192C]">
                        <Plus className="size-3.5" />
                      </span>
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          <div className="my-3 flex items-center gap-2 text-[9.5px] font-semibold uppercase tracking-[0.16em] text-white/35">
            <span className="h-px flex-1 bg-white/10" />
            <Users className="size-3" />
            Guest list
            <span className="h-px flex-1 bg-white/10" />
          </div>
          <div className="flex items-center justify-between rounded-xl border border-emerald-500/30 bg-emerald-500/[0.06] px-3.5 py-3">
            <div className="min-w-0">
              <p className="flex items-center gap-2 text-[13px] font-semibold">
                <span className="truncate">{p.guest}</span>
                <span className="rounded bg-emerald-500/15 px-1.5 py-0.5 text-[9px] font-bold uppercase text-emerald-400">
                  {p.free}
                </span>
              </p>
              <p className="mt-1 flex items-center gap-1 text-[10.5px] text-white/50">
                <Clock className="size-3" />
                {p.guestMeta}
              </p>
            </div>
            <div className="shrink-0 text-right">
              <p className="text-[18px] font-bold text-emerald-400">0 €</p>
              <p className="text-[9.5px] text-white/40">{p.guestLeft}</p>
            </div>
          </div>
        </div>

        <div className="mt-4 border-t border-white/10 px-5 pb-6 pt-3">
          <div className="flex items-center justify-between text-[11.5px] text-white/55">
            <span>{p.fee}</span>
            <span className="font-semibold text-white/80">{p.feeValue}</span>
          </div>
          <div className="mt-3 flex h-11 items-center justify-center rounded-xl bg-[#E8192C] text-[14px] font-semibold">
            {p.pay}
          </div>
        </div>
      </div>
    </div>
  );
}

function NotificationStack() {
  const items = useAsso().hero.notifications;
  const [i, setI] = useState(0);
  const reduce = useReducedMotion();

  useEffect(() => {
    if (reduce) return;
    const id = window.setInterval(() => setI((v) => (v + 1) % items.length), 2800);
    return () => window.clearInterval(id);
  }, [items.length, reduce]);

  const visible = [0, 1, 2].map((k) => (i + k) % items.length);

  return (
    <div className="relative h-[92px]">
      <AnimatePresence initial={false}>
        {visible
          .map((idx, pos) => ({ idx, pos }))
          .reverse()
          .map(({ idx, pos }) => {
            const n = items[idx];
            const ic = NOTIF_ICONS[n.icon] ?? NOTIF_ICONS.ticket;
            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 34, scale: 0.88 }}
                animate={{
                  opacity: pos === 0 ? 1 : pos === 1 ? 0.8 : 0.5,
                  y: pos * 12,
                  scale: 1 - pos * 0.06,
                  zIndex: 3 - pos,
                }}
                exit={{ opacity: 0, y: -18, scale: 1.02, transition: { duration: 0.35 } }}
                transition={{ duration: 0.55, ease: EASE }}
                className="yl-float-card absolute inset-x-0 top-0 !bg-white p-3 text-left"
              >
                <motion.div
                  animate={{ opacity: pos === 0 ? 1 : 0 }}
                  transition={{ duration: 0.3 }}
                  className="flex items-center gap-3"
                >
                  <span
                    className="flex size-10 shrink-0 items-center justify-center rounded-full"
                    style={{ background: ic.bg }}
                  >
                    <ic.Icon className="size-[18px]" style={{ color: ic.fg }} />
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="block truncate text-[13.5px] font-semibold tracking-tight text-zinc-900">
                      {n.title}
                    </span>
                    <span className="block truncate text-[12px] text-zinc-500">{n.meta}</span>
                  </span>
                  <span className="size-2 shrink-0 rounded-full bg-[var(--yuno-red)]" />
                </motion.div>
              </motion.div>
            );
          })}
      </AnimatePresence>
    </div>
  );
}
