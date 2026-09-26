import { useEffect, useMemo, useRef, useState, type CSSProperties } from "react";
import { AnimatePresence, motion, useInView, useReducedMotion } from "motion/react";
import {
  AlarmClock,
  ArrowRight,
  CalendarPlus,
  Crown,
  Heart,
  Mail,
  RotateCcw,
  ShieldCheck,
  ShoppingCart,
  Sparkles,
  Ticket,
  TrendingUp,
  UserX,
  Users,
  Zap,
  type LucideIcon,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { INTL_LOCALE } from "@/i18n/landing-lang";
import { useLanding } from "./context";
import { CountUp } from "./Stats";
import { EASE, Eyebrow, FadeIn } from "./ui";

type Automation = ReturnType<typeof useLanding>["t"]["email"]["automations"][number];

const AUTO_META: Record<string, { Icon: LucideIcon; color: string; sales: number }> = {
  new: { Icon: CalendarPlus, color: "#E8192C", sales: 23 },
  cart: { Icon: ShoppingCart, color: "#F97316", sales: 12 },
  price: { Icon: TrendingUp, color: "#F59E0B", sales: 17 },
  last: { Icon: AlarmClock, color: "#EF4444", sales: 19 },
  upgrade: { Icon: Crown, color: "#D97706", sales: 6 },
  thanks: { Icon: Heart, color: "#EC4899", sales: 4 },
  missed: { Icon: UserX, color: "#8B5CF6", sales: 8 },
  welcome: { Icon: Sparkles, color: "#0EA5E9", sales: 5 },
  winback: { Icon: RotateCcw, color: "#10B981", sales: 11 },
};
const AVG_BASKET = 22; // € net per attributed sale, for the mock only
const AUTOPLAY_MS = 3800;

export function Email() {
  const { t } = useLanding();
  const e = t.email;
  const [selected, setSelected] = useState(0);
  const [pinned, setPinned] = useState(false); // stops autoplay once the visitor clicks
  const [enabled, setEnabled] = useState<boolean[]>(() => e.automations.map(() => true));
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { margin: "-120px" });
  const reduce = useReducedMotion();

  useEffect(() => {
    if (pinned || !inView || reduce) return;
    const id = window.setTimeout(
      () => setSelected((v) => (v + 1) % e.automations.length),
      AUTOPLAY_MS,
    );
    return () => window.clearTimeout(id);
  }, [selected, pinned, inView, reduce, e.automations.length]);

  const pick = (i: number) => {
    setPinned(true);
    setSelected(i);
  };
  const toggle = (i: number) => {
    setPinned(true);
    setSelected(i);
    setEnabled((arr) => arr.map((v, j) => (j === i ? !v : v)));
  };

  return (
    <section
      data-ph-section="email"
      id="email"
      className="relative scroll-mt-20 overflow-hidden px-4 py-16 sm:px-6 sm:py-24 md:py-32"
    >
      <div className="mx-auto grid max-w-6xl grid-cols-1 items-center gap-14 lg:grid-cols-[1fr_1.05fr] lg:gap-16">
        <FadeIn>
          <Eyebrow>{e.eyebrow}</Eyebrow>
          <h2 className="yl-h2 mt-4 text-balance">{e.title}</h2>
          <p className="mt-4 max-w-lg text-pretty text-[15px] leading-relaxed text-zinc-500 md:text-base">
            {e.body}
          </p>

          <div className="mt-8 grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-zinc-100 bg-zinc-100 sm:mt-10">
            {e.stats.map((s) => (
              <div key={s.label} className="bg-white p-4 sm:p-5">
                <CountUp
                  value={s.value}
                  className="block text-[28px] font-semibold tabular-nums tracking-[-0.03em] text-zinc-950"
                />
                <span className="mt-1 block text-[13px] leading-snug text-zinc-500">{s.label}</span>
              </div>
            ))}
          </div>
          <p className="mt-4 text-[13px] leading-relaxed text-zinc-400">{e.proof}</p>
          <p className="mt-6 inline-flex items-start gap-2 rounded-2xl bg-zinc-100 px-3.5 py-2 text-[13px] font-medium leading-snug text-zinc-700 sm:items-center sm:rounded-full sm:py-1.5">
            <Mail className="mt-0.5 size-3.5 shrink-0 text-[var(--yuno-red)] sm:mt-0" />{" "}
            {e.included}
          </p>
        </FadeIn>

        <FadeIn delay={0.1} className="relative">
          <div
            aria-hidden
            className="absolute -inset-12 -z-10 bg-[radial-gradient(closest-side,rgba(232,25,44,0.08),transparent)]"
          />
          {/* One column, one width: the email and its automations share edges. */}
          <div ref={ref} className="mx-auto w-full max-w-[480px] space-y-4">
            <EmailClient
              auto={e.automations[selected]}
              enabled={enabled[selected]}
              inView={inView}
            />
            <AutomationPanel
              selected={selected}
              enabled={enabled}
              autoplay={!pinned && inView && !reduce}
              onPick={pick}
              onToggle={toggle}
            />
          </div>
        </FadeIn>
      </div>
    </section>
  );
}

function useLiveInventory(inView: boolean) {
  const reduce = useReducedMotion();
  const [tables, setTables] = useState(24);
  const [guest, setGuest] = useState(41);
  useEffect(() => {
    if (reduce) {
      setTables(21);
      setGuest(38);
      return;
    }
    if (!inView) return;
    let n = 0;
    const id = window.setInterval(() => {
      n += 1;
      setTables((v) => Math.max(21, v - 1));
      setGuest((v) => Math.max(38, v - 1));
      if (n >= 3) window.clearInterval(id);
    }, 900);
    return () => window.clearInterval(id);
  }, [inView, reduce]);
  return { tables, guest };
}

function EmailClient({
  auto,
  enabled,
  inView,
}: {
  auto: Automation;
  enabled: boolean;
  inView: boolean;
}) {
  const { t, lang } = useLanding();
  const m = t.email.mock;
  const meta = AUTO_META[auto.id] ?? AUTO_META.new;
  const eur = useMemo(
    () =>
      new Intl.NumberFormat(INTL_LOCALE[lang], {
        style: "currency",
        currency: "EUR",
        maximumFractionDigits: 0,
      }),
    [lang],
  );
  const { tables, guest } = useLiveInventory(inView);
  const sales = meta.sales;

  return (
    <div className="yl-card overflow-hidden">
      {/* window chrome */}
      <div className="flex h-9 items-center gap-3 border-b border-zinc-100 bg-zinc-50/80 px-3.5">
        <div className="flex gap-1.5">
          <span className="size-2.5 rounded-full bg-[#ff5f57]" />
          <span className="size-2.5 rounded-full bg-[#febc2e]" />
          <span className="size-2.5 rounded-full bg-[#28c840]" />
        </div>
        <span className="mx-auto text-[11.5px] font-medium text-zinc-400">{m.inbox}</span>
        <span className="w-10 text-right text-[11px] tabular-nums text-zinc-400">{m.time}</span>
      </div>

      {/* message header */}
      <div className="flex items-start gap-3 px-5 pb-3.5 pt-4">
        <span className="yl-keep relative flex size-10 shrink-0 items-center justify-center overflow-hidden rounded-xl bg-zinc-950 text-[12px] font-black tracking-tight text-white">
          <span
            aria-hidden
            className="absolute inset-0 bg-[radial-gradient(120%_120%_at_100%_0%,rgba(232,25,44,0.85),transparent_60%)]"
          />
          <span className="relative">EB</span>
        </span>
        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-2">
            <span className="truncate text-[13.5px] font-semibold text-zinc-950">{m.from}</span>
            <span className="shrink-0 rounded-full bg-zinc-100 px-1.5 py-px text-[10px] font-medium text-zinc-500">
              via Yuno
            </span>
            <span className="ml-auto shrink-0 text-[11px] text-zinc-400">{m.to}</span>
          </div>
          <AnimatePresence mode="wait" initial={false}>
            <motion.p
              key={auto.id}
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.25, ease: EASE }}
              className={cn(
                "mt-0.5 truncate text-[14px] font-semibold tracking-tight text-zinc-800",
                !enabled && "text-zinc-400 line-through",
              )}
            >
              {auto.subject}
            </motion.p>
          </AnimatePresence>
          <AnimatePresence mode="wait" initial={false}>
            <motion.span
              key={auto.id + String(enabled)}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="mt-1.5 inline-flex max-w-full items-center gap-1 rounded-md px-1.5 py-0.5 text-[10.5px] font-medium"
              style={{ background: `${meta.color}14`, color: meta.color }}
            >
              <Zap className="size-3 shrink-0" />
              <span className="truncate">
                {m.trigger} · {auto.when}
              </span>
            </motion.span>
          </AnimatePresence>
        </div>
      </div>

      {/* the email itself */}
      <div className="border-t border-zinc-100 bg-zinc-100/70 p-3 sm:p-4">
        <div className="relative overflow-hidden rounded-xl bg-white shadow-[0_1px_2px_rgba(10,10,11,0.06),0_10px_30px_-18px_rgba(10,10,11,0.3)] ring-1 ring-zinc-900/5">
          <Poster date={m.date} city={m.city} />

          <div className="px-5 pb-5 pt-4">
            <AnimatePresence mode="wait" initial={false}>
              <motion.div
                key={auto.id}
                initial={{ opacity: 0, y: 8, filter: "blur(4px)" }}
                animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                exit={{ opacity: 0, y: -6, filter: "blur(4px)" }}
                transition={{ duration: 0.3, ease: EASE }}
              >
                <p className="text-[12px] text-zinc-400">Léa,</p>
                <h4 className="mt-0.5 text-[18px] font-semibold leading-snug tracking-[-0.02em] text-zinc-950">
                  {auto.headline}
                </h4>
                <p className="mt-1 text-[13px] leading-relaxed text-zinc-500">{auto.body}</p>
              </motion.div>
            </AnimatePresence>

            {/* blocks filled from the night at send time */}
            <div className="mt-4 rounded-xl border border-zinc-100">
              <div className="flex items-center gap-1.5 border-b border-zinc-100 px-3 py-1.5 text-[9.5px] font-semibold uppercase tracking-[0.14em] text-[var(--yuno-red)]">
                <span className="relative flex size-1.5">
                  <span className="yl-pulse-ring absolute inset-0 rounded-full bg-[var(--yuno-red)]" />
                  <span className="relative size-1.5 rounded-full bg-[var(--yuno-red)]" />
                </span>
                {m.live}
              </div>
              <div className="grid grid-cols-3 divide-x divide-zinc-100">
                <LiveCell Icon={Ticket} label={m.tier} value={eur.format(15)}>
                  <div className="mt-1.5 h-1 overflow-hidden rounded-full bg-zinc-100">
                    <motion.div
                      className="h-full rounded-full bg-[var(--yuno-red)]"
                      initial={{ width: "40%" }}
                      animate={{ width: inView ? "64%" : "40%" }}
                      transition={{ duration: 1.6, ease: EASE }}
                    />
                  </div>
                  <span className="mt-1 block text-[9.5px] text-zinc-400">64% {m.sold}</span>
                </LiveCell>
                <LiveCell Icon={Crown} label={m.tables} value={String(tables)} tick />
                <LiveCell Icon={Users} label={m.guest} value={String(guest)} tick />
              </div>
            </div>

            <AnimatePresence mode="wait" initial={false}>
              <motion.div
                key={auto.id}
                initial={{ opacity: 0, scale: 0.97 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.97 }}
                transition={{ duration: 0.25 }}
                className="mt-4 flex items-center justify-center gap-1.5 rounded-full bg-zinc-950 py-2.5 text-[13px] font-semibold text-white"
              >
                {auto.cta}
                <ArrowRight className="size-3.5" />
              </motion.div>
            </AnimatePresence>
            <p className="mt-3.5 text-center text-[10px] leading-snug text-zinc-400">{m.footer}</p>
          </div>

          <AnimatePresence>
            {!enabled && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="absolute inset-0 flex items-center justify-center bg-white/60 backdrop-blur-[2px]"
              >
                <span className="rounded-full bg-zinc-950 px-3 py-1.5 text-[12px] font-semibold text-white shadow-lg">
                  Off
                </span>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* attribution: what this email sold */}
      <div className="flex items-center gap-2 border-t border-zinc-100 bg-emerald-50/70 px-5 py-3 text-[12.5px] text-emerald-800">
        <TrendingUp className="size-4 shrink-0" />
        <AnimatePresence mode="wait" initial={false}>
          <motion.span
            key={auto.id + String(enabled)}
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.25 }}
            className="min-w-0 truncate"
          >
            <span className="font-semibold tabular-nums">{enabled ? sales : 0}</span> {m.sales}
          </motion.span>
        </AnimatePresence>
        <span className="ml-auto shrink-0 font-semibold tabular-nums">
          {eur.format(enabled ? sales * AVG_BASKET : 0)}
        </span>
      </div>
    </div>
  );
}

function LiveCell({
  Icon,
  label,
  value,
  tick,
  children,
}: {
  Icon: LucideIcon;
  label: string;
  value: string;
  tick?: boolean;
  children?: React.ReactNode;
}) {
  return (
    <div className="min-w-0 px-3 py-2.5">
      <span className="flex items-center gap-1 text-[9.5px] font-medium text-zinc-400">
        <Icon className="size-3 shrink-0" />
        <span className="truncate">{label}</span>
      </span>
      {tick ? (
        <motion.span
          key={value}
          initial={{ scale: 1.3 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.45 }}
          className="yl-flash mt-0.5 block origin-left text-[17px] font-bold tabular-nums tracking-tight text-zinc-950"
        >
          {value}
        </motion.span>
      ) : (
        <span className="mt-0.5 block text-[17px] font-bold tabular-nums tracking-tight text-zinc-950">
          {value}
        </span>
      )}
      {children}
    </div>
  );
}

// The event artwork at the top of the email — dark in both themes, like a
// real flyer.
function Poster({ date, city }: { date: string; city: string }) {
  const reduce = useReducedMotion();
  return (
    <div className="yl-keep relative h-[132px] overflow-hidden bg-zinc-950">
      <div
        aria-hidden
        className="absolute inset-0 bg-[radial-gradient(90%_120%_at_85%_10%,rgba(232,25,44,0.75),transparent_55%),radial-gradient(70%_90%_at_0%_100%,rgba(124,58,237,0.35),transparent_60%)]"
      />
      {/* concentric rings, like a speaker cone */}
      <div aria-hidden className="absolute -right-10 -top-16">
        {[80, 130, 180, 230].map((d) => (
          <span
            key={d}
            className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/10"
            style={{ width: d, height: d }}
          />
        ))}
      </div>
      {/* Always rendered (hidden by CSS for reduced motion) so the server and
          client trees match. */}
      <motion.div
        aria-hidden
        className="absolute inset-y-0 w-24 -skew-x-12 bg-gradient-to-r from-transparent via-white/10 to-transparent motion-reduce:hidden"
        initial={{ left: "-30%" }}
        animate={reduce ? { left: "-30%" } : { left: "130%" }}
        transition={{ duration: 2.6, repeat: Infinity, repeatDelay: 2.2, ease: "easeInOut" }}
      />
      <div
        aria-hidden
        className="absolute inset-0 opacity-[0.18] mix-blend-overlay"
        style={
          {
            backgroundImage:
              "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='120' height='120'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
          } as CSSProperties
        }
      />
      <span className="absolute right-3 top-3 rounded-full bg-white/10 px-2 py-0.5 text-[9.5px] font-semibold tracking-wide text-white/85 ring-1 ring-white/15 backdrop-blur">
        {city}
      </span>
      <div className="absolute bottom-3.5 left-4 right-4">
        <span className="block text-[9.5px] font-semibold uppercase tracking-[0.22em] text-white/60">
          {date}
        </span>
        <span className="relative mt-1 block text-[30px] font-black uppercase leading-[0.9] tracking-[-0.04em] text-white">
          Electronic
          <br />
          <span className="text-transparent [-webkit-text-stroke:1px_rgba(255,255,255,0.85)]">
            Body
          </span>
        </span>
      </div>
    </div>
  );
}

function AutomationPanel({
  selected,
  enabled,
  autoplay,
  onPick,
  onToggle,
}: {
  selected: number;
  enabled: boolean[];
  autoplay: boolean;
  onPick: (i: number) => void;
  onToggle: (i: number) => void;
}) {
  const { t } = useLanding();
  const e = t.email;
  const on = enabled.filter(Boolean).length;
  return (
    <div className="yl-card p-4 sm:p-5">
      <div className="flex items-center justify-between gap-3">
        <p className="text-[12px] font-semibold uppercase tracking-[0.12em] text-zinc-400">
          {e.automationsTitle}
        </p>
        <span className="shrink-0 rounded-full bg-emerald-50 px-2 py-0.5 text-[11px] font-semibold tabular-nums text-emerald-700">
          {on}/{enabled.length}
        </span>
      </div>
      <p className="mt-1 text-[12px] text-zinc-400">{e.mock.hint}</p>

      <ul className="mt-3.5 grid grid-cols-2 gap-1.5 min-[400px]:grid-cols-3">
        {e.automations.map((a, i) => {
          const meta = AUTO_META[a.id] ?? AUTO_META.new;
          const active = i === selected;
          return (
            <li key={a.id} className="relative">
              <div
                onClick={() => onPick(i)}
                className={cn(
                  "group relative flex h-full cursor-pointer flex-col gap-2 overflow-hidden rounded-xl border p-2.5 transition-colors",
                  active
                    ? "border-zinc-300 bg-zinc-50"
                    : "border-zinc-100 hover:border-zinc-200 hover:bg-zinc-50/60",
                )}
              >
                {active && (
                  <motion.span
                    layoutId="yl-auto-active"
                    className="pointer-events-none absolute inset-0 rounded-xl ring-[1.5px] ring-zinc-950"
                    transition={{ type: "spring", bounce: 0.2, duration: 0.45 }}
                  />
                )}
                <div className="flex items-center justify-between">
                  <span
                    className="flex size-6 items-center justify-center rounded-lg"
                    style={{ background: `${meta.color}1A` }}
                  >
                    <meta.Icon className="size-3.5" style={{ color: meta.color }} />
                  </span>
                  <Switch
                    on={enabled[i]}
                    label={a.name}
                    onClick={(ev) => {
                      ev.stopPropagation();
                      onToggle(i);
                    }}
                  />
                </div>
                <button
                  type="button"
                  onClick={(ev) => {
                    ev.stopPropagation();
                    onPick(i);
                  }}
                  aria-pressed={active}
                  className={cn(
                    "text-left text-[12px] font-medium leading-snug outline-none after:absolute after:inset-0 after:rounded-xl focus-visible:after:ring-2 focus-visible:after:ring-[var(--yuno-red)]",
                    enabled[i] ? "text-zinc-800" : "text-zinc-400",
                  )}
                >
                  {a.name}
                </button>
                {active && autoplay && (
                  <motion.span
                    key={`p-${selected}`}
                    className="absolute inset-x-0 bottom-0 h-[2px] origin-left bg-[var(--yuno-red)]"
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: 1 }}
                    transition={{ duration: AUTOPLAY_MS / 1000, ease: "linear" }}
                  />
                )}
              </div>
            </li>
          );
        })}
      </ul>

      <p className="mt-4 flex items-start gap-2 border-t border-zinc-100 pt-3.5 text-[11.5px] leading-relaxed text-zinc-500">
        <ShieldCheck className="mt-0.5 size-3.5 shrink-0 text-emerald-600" />
        {e.mock.rules}
      </p>
    </div>
  );
}

function Switch({
  on,
  label,
  onClick,
}: {
  on: boolean;
  label: string;
  onClick: (e: React.MouseEvent) => void;
}) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={on}
      aria-label={label}
      onClick={onClick}
      className="relative z-10 inline-flex h-4 w-7 shrink-0 rounded-full outline-none focus-visible:ring-2 focus-visible:ring-[var(--yuno-red)] focus-visible:ring-offset-1"
    >
      <motion.span
        className="absolute inset-0 rounded-full"
        initial={false}
        animate={{ backgroundColor: on ? "#10B981" : "rgba(161,161,170,0.45)" }}
        transition={{ duration: 0.2 }}
      />
      <motion.span
        className="absolute top-0.5 size-3 rounded-full bg-[#fff] shadow"
        initial={false}
        animate={{ left: on ? 14 : 2 }}
        transition={{ type: "spring", stiffness: 500, damping: 30 }}
      />
    </button>
  );
}
