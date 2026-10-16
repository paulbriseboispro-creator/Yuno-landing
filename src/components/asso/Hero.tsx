import { useEffect, useState, type FormEvent } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import {
  ArrowRight,
  BadgeCheck,
  Check,
  GraduationCap,
  Lock,
  Mail,
  ScanLine,
  Ticket,
  Wallet,
  type LucideIcon,
} from "lucide-react";
import { useLanding } from "@/components/landing/context";
import { EASE, FounderCta } from "@/components/landing/ui";
import { useAsso } from "./content";
import phoneEvent from "@/assets/asso/phone-event.webp";

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

// The real event page of the client app (Amoris night, framed iPhone): what a
// student sees when they open the link from the association's Instagram.
function PhoneMock() {
  const alt = useAsso().hero.phone.alt;
  return (
    <img
      src={phoneEvent}
      alt={alt}
      width={988}
      height={2000}
      fetchPriority="high"
      decoding="async"
      className="yl-keep relative mx-auto h-auto w-full drop-shadow-[0_40px_60px_rgba(10,10,11,0.35)]"
    />
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
