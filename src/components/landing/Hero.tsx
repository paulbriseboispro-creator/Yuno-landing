import { useEffect, useRef, useState, type CSSProperties } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import {
  BadgeCheck,
  BarChart3,
  Check,
  CreditCard,
  Crown,
  Mail,
  MapPin,
  Martini,
  Music2,
  QrCode,
  ScanLine,
  Smartphone,
  Ticket,
  Users,
  Wallet,
  type LucideIcon,
} from "lucide-react";
import { useLanding } from "./context";
import { EASE, FounderCta, PrimaryCta } from "./ui";
import amoris from "@/assets/clubs/mono/amoris.png";
import copernico from "@/assets/clubs/mono/copernico.png";
import fitz from "@/assets/clubs/mono/fitz.png";
import flor from "@/assets/clubs/mono/flor.png";
import gabana from "@/assets/clubs/mono/gabana.png";
import kapital from "@/assets/clubs/mono/kapital.png";
import losamantes from "@/assets/clubs/mono/losamantes.png";
import opium from "@/assets/clubs/mono/opium.png";
import rubicon from "@/assets/clubs/mono/rubicon.png";
import santos from "@/assets/clubs/mono/santos.png";
import verbena from "@/assets/clubs/mono/verbena.png";
import woh from "@/assets/clubs/mono/woh.png";

// Feature icons floating on the concentric arcs around the headline — Yuno's
// equivalent of the reference layout's integration logos. `x` is in px from the
// hero's focal point and scales with the viewport (--s); `y` doesn't, because
// the text block it has to clear doesn't either. `tier` hides the icons that
// would collide with the copy on narrower screens.
type Tier = "md" | "lg" | "xl" | "wide";
const TIER_CLASS: Record<Tier, string> = {
  md: "hidden md:block",
  lg: "hidden lg:block",
  xl: "hidden xl:block",
  wide: "hidden min-[1400px]:block",
};
const ORBIT: {
  Icon: LucideIcon;
  color: string;
  x: number;
  y: number;
  d: number;
  tier: Tier;
  size?: number;
}[] = [
  { Icon: Ticket, color: "#E8192C", x: -470, y: -110, d: 0.9, tier: "xl" },
  { Icon: Crown, color: "#F59E0B", x: -600, y: 30, d: 1.4, tier: "lg", size: 58 },
  { Icon: Martini, color: "#8B5CF6", x: -420, y: 190, d: 1.1, tier: "md" },
  { Icon: Users, color: "#EC4899", x: -330, y: 420, d: 0.8, tier: "md", size: 46 },
  { Icon: Music2, color: "#D946EF", x: -660, y: -230, d: 1.2, tier: "wide", size: 44 },
  { Icon: QrCode, color: "var(--color-zinc-900)", x: -650, y: 300, d: 1.6, tier: "wide" },
  { Icon: CreditCard, color: "#635BFF", x: 470, y: -110, d: 1.0, tier: "xl" },
  { Icon: BarChart3, color: "#F97316", x: 600, y: 30, d: 1.3, tier: "lg", size: 58 },
  { Icon: ScanLine, color: "#10B981", x: 420, y: 190, d: 1.1, tier: "md" },
  { Icon: Wallet, color: "#14B8A6", x: 330, y: 420, d: 0.8, tier: "md", size: 46 },
  { Icon: Smartphone, color: "#3B82F6", x: 660, y: -230, d: 1.2, tier: "wide", size: 44 },
  { Icon: Mail, color: "#0EA5E9", x: 650, y: 300, d: 1.6, tier: "wide" },
];

const NOTIF_ICONS: Record<string, { Icon: LucideIcon; bg: string; fg: string }> = {
  crown: { Icon: Crown, bg: "#D9770626", fg: "#D97706" },
  ticket: { Icon: Ticket, bg: "#E8192C26", fg: "#E8192C" },
  scan: { Icon: ScanLine, bg: "#05966926", fg: "#059669" },
  mail: { Icon: Mail, bg: "#0284C726", fg: "#0284C7" },
  wallet: { Icon: Wallet, bg: "#7C3AED26", fg: "#7C3AED" },
};

const RINGS = [520, 800, 1080, 1360];

export function Hero() {
  const { t } = useLanding();
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();

  // Subtle mouse parallax on the orbit icons (desktop only).
  useEffect(() => {
    const el = ref.current;
    if (!el || reduce) return;
    let raf = 0;
    const onMove = (e: PointerEvent) => {
      if (e.pointerType !== "mouse") return;
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const r = el.getBoundingClientRect();
        el.style.setProperty("--mx", String((e.clientX - r.left) / r.width - 0.5));
        el.style.setProperty("--my", String((e.clientY - r.top) / r.height - 0.5));
      });
    };
    el.addEventListener("pointermove", onMove);
    return () => {
      el.removeEventListener("pointermove", onMove);
      cancelAnimationFrame(raf);
    };
  }, [reduce]);

  return (
    <section
      ref={ref}
      className="relative isolate overflow-hidden pb-10 pt-10 [--mx:0] [--my:0] [--s:0.74] md:pt-16 lg:[--s:0.8] xl:[--s:1]"
    >
      {/* Soft top wash, like the reference */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-[720px] bg-[radial-gradient(60%_60%_at_50%_0%,var(--color-zinc-100)_0%,transparent_70%)]"
      />

      {/* Concentric arcs + orbit icons, centred on the headline */}
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-[250px] -z-10 md:top-[290px]"
      >
        {RINGS.map((d, i) => (
          <div
            key={d}
            className="absolute left-1/2 top-1/2 rounded-full border border-zinc-200/80 [mask-image:linear-gradient(to_bottom,black_40%,transparent_85%)]"
            style={{
              width: `calc(${d}px * var(--s))`,
              height: `calc(${d}px * var(--s))`,
              transform: "translate(-50%, -50%)",
            }}
          >
            {/* a tiny light travelling on each ring */}
            <div
              className="yl-spin-slow absolute inset-0"
              style={
                {
                  "--dur": `${40 + i * 18}s`,
                  animationDirection: i % 2 ? "reverse" : "normal",
                } as CSSProperties
              }
            >
              <span className="absolute left-1/2 top-0 size-1.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[var(--yuno-red)] shadow-[0_0_12px_3px_rgba(232,25,44,0.35)]" />
            </div>
          </div>
        ))}

        {ORBIT.map(({ Icon, color, x, y, d, tier, size = 52 }, i) => (
          <div
            key={i}
            className={`absolute ${TIER_CLASS[tier]}`}
            style={{
              left: `calc(${x}px * var(--s))`,
              top: `${y}px`,
              transform: `translate(-50%, -50%) translate(calc(var(--mx) * ${d * -22}px), calc(var(--my) * ${d * -22}px))`,
              transition: "transform 0.6s cubic-bezier(0.22,1,0.36,1)",
            }}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.4 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.35 + i * 0.05, ease: EASE }}
            >
              <div
                className="yl-float flex items-center justify-center rounded-full bg-white shadow-[0_1px_2px_rgba(10,10,11,0.06),0_12px_28px_-10px_rgba(10,10,11,0.22)] ring-1 ring-zinc-900/5"
                style={
                  {
                    width: size,
                    height: size,
                    "--dur": `${5 + (i % 4)}s`,
                    "--delay": `${-(i * 0.7)}s`,
                  } as CSSProperties
                }
              >
                <Icon style={{ color }} className="size-[42%]" strokeWidth={2} />
              </div>
            </motion.div>
          </div>
        ))}
      </div>

      <div className="relative mx-auto max-w-6xl px-4 text-center sm:px-6">
        {/* Rating-style chips row (reference: Google / Trustpilot) */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: EASE }}
          className="inline-flex items-center gap-3 rounded-full border border-zinc-200 bg-white/80 px-3.5 py-1.5 text-[12.5px] font-medium text-zinc-600 shadow-[0_1px_2px_rgba(10,10,11,0.04)] backdrop-blur"
        >
          <span className="inline-flex items-center gap-1.5 whitespace-nowrap">
            <span className="relative flex size-2">
              <span className="yl-pulse-ring absolute inset-0 rounded-full bg-emerald-400" />
              <span className="relative size-2 rounded-full bg-emerald-500" />
            </span>
            <MapPin className="hidden size-3.5 text-zinc-400 sm:block" />
            {t.hero.chips[0]}
          </span>
          <span className="hidden h-3.5 w-px bg-zinc-200 sm:block" />
          <span className="hidden items-center gap-1.5 whitespace-nowrap sm:inline-flex">
            <BadgeCheck className="size-3.5 text-[var(--yuno-red)]" />
            {t.hero.chips[1]}
          </span>
        </motion.div>

        <h1 className="yl-h1 mx-auto mt-6 max-w-4xl text-balance text-zinc-950">
          <motion.span
            className="block"
            initial={{ opacity: 0, y: 24, filter: "blur(8px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            transition={{ duration: 0.8, delay: 0.08, ease: EASE }}
          >
            {t.hero.titleA}
          </motion.span>
          <motion.span
            className="block bg-gradient-to-b from-zinc-950 to-zinc-600 bg-clip-text text-transparent"
            initial={{ opacity: 0, y: 24, filter: "blur(8px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            transition={{ duration: 0.8, delay: 0.18, ease: EASE }}
          >
            {t.hero.titleB}
          </motion.span>
        </h1>

        <motion.p
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.3, ease: EASE }}
          className="mx-auto mt-5 max-w-[34rem] text-pretty text-[15px] leading-relaxed text-zinc-500 md:text-[17px]"
        >
          {t.hero.sub}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.4, ease: EASE }}
          className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row"
        >
          <PrimaryCta size="lg" className="w-full sm:w-auto">
            {t.hero.primary}
          </PrimaryCta>
          <FounderCta size="lg" className="w-full sm:w-auto">
            {t.hero.secondary}
          </FounderCta>
        </motion.div>

        <motion.ul
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.7, delay: 0.55 }}
          className="mt-5 flex flex-wrap items-center justify-center gap-x-5 gap-y-2 text-[12.5px] text-zinc-500"
        >
          {t.hero.note.map((n) => (
            <li key={n} className="inline-flex items-center gap-1.5">
              <Check className="size-3.5 text-emerald-500" strokeWidth={2.5} />
              {n}
            </li>
          ))}
        </motion.ul>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.6, ease: EASE }}
          className="mx-auto mt-12 w-full max-w-[340px]"
        >
          <NotificationStack />
        </motion.div>
      </div>

      <ClientLogos />
    </section>
  );
}

function NotificationStack() {
  const { t } = useLanding();
  const items = t.hero.notifications;
  const [i, setI] = useState(0);
  const reduce = useReducedMotion();

  useEffect(() => {
    if (reduce) return;
    const id = window.setInterval(() => setI((v) => (v + 1) % items.length), 2800);
    return () => window.clearInterval(id);
  }, [items.length, reduce]);

  const visible = [0, 1, 2].map((k) => (i + k) % items.length);

  return (
    <div className="relative h-[110px]">
      {/* glow under the stack */}
      <div
        aria-hidden
        className="absolute inset-x-6 -bottom-6 h-16 rounded-full bg-[radial-gradient(closest-side,rgba(232,25,44,0.16),transparent)] blur-xl"
      />
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
                  y: pos * 14,
                  scale: 1 - pos * 0.06,
                  zIndex: 3 - pos,
                }}
                exit={{ opacity: 0, y: -18, scale: 1.02, transition: { duration: 0.35 } }}
                transition={{ duration: 0.55, ease: EASE }}
                className="yl-float-card absolute inset-x-0 top-0 !bg-white p-3 text-left"
              >
                {/* Only the front card shows its content; the ones behind are
                    just the stacked edges, like the reference. */}
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

// Organizers and clubs already on Yuno. The logos are trimmed monochrome ink (generated from
// the originals in src/assets/clubs) so the strip reads as one family; CSS
// turns the ink white in dark mode. Heights follow 1/√aspect so a wide wordmark
// and a round badge carry the same visual weight.
const CLIENTS: { src: string; name: string; aspect: number }[] = [
  { src: amoris, name: "Amoris", aspect: 3.88 },
  { src: kapital, name: "Teatro Kapital", aspect: 2.49 },
  { src: gabana, name: "Gabana", aspect: 1 },
  { src: opium, name: "Opium Madrid", aspect: 3.11 },
  { src: santos, name: "Santos Todos", aspect: 1.04 },
  { src: copernico, name: "Copérnico", aspect: 4.21 },
  { src: fitz, name: "Fitz", aspect: 1.87 },
  { src: woh, name: "WOH", aspect: 2.02 },
  { src: verbena, name: "Verbena", aspect: 1.02 },
  { src: rubicon, name: "Rubicon", aspect: 5.31 },
  { src: losamantes, name: "Los Amantes", aspect: 1.92 },
  { src: flor, name: "La Flor", aspect: 0.75 },
];

function ClientLogos() {
  const { t } = useLanding();
  return (
    <div className="relative mx-auto mt-20 max-w-5xl px-4 sm:px-6 md:mt-24">
      <p className="flex items-center justify-center gap-2 text-center text-[12.5px] text-zinc-400">
        <span className="relative flex size-1.5">
          <span className="yl-pulse-ring absolute inset-0 rounded-full bg-[var(--yuno-red)]" />
          <span className="relative size-1.5 rounded-full bg-[var(--yuno-red)]" />
        </span>
        {t.clients.label}
      </p>
      <div className="group relative mt-7 overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_12%,black_88%,transparent)]">
        <div
          className="yl-marquee flex w-max items-center group-hover:[animation-play-state:paused]"
          style={{ "--dur": "48s" } as CSSProperties}
        >
          {[...CLIENTS, ...CLIENTS].map((c, i) => {
            const h = Math.min(46, Math.round(54 / Math.sqrt(c.aspect)));
            return (
              <div
                key={i}
                aria-hidden={i >= CLIENTS.length}
                className="mx-6 flex h-14 shrink-0 items-center md:mx-9"
              >
                <img
                  src={c.src}
                  alt={i >= CLIENTS.length ? "" : c.name}
                  title={c.name}
                  loading="lazy"
                  decoding="async"
                  draggable={false}
                  className="yl-logo w-auto select-none"
                  style={{ height: h }}
                />
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
