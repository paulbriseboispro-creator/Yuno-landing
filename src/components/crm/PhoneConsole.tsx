import { useEffect, useMemo, useRef, useState, type CSSProperties } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { ArrowRight, Lock } from "lucide-react";
import { cn } from "@/lib/utils";
import appIcon from "@/assets/crm/yuno-app-icon.webp";
import { useCrm } from "./content";
import { CONSOLE_BG } from "./Dashboard";
import { series } from "./salesSeries";
import { Avatar, Count, EASE, Rich, YunitFace, useFmt } from "./ui";

// The hero's product shot on a phone. The desktop frame is the 1440 px Console
// scaled down, which turns into 4 px text on a phone: here the same Console
// home (same demo club, same numbers, same copy) is laid out at phone width and
// at its real size, then tours itself inside its frame like the desktop one.
// Notifications drop in over the top like on a lock screen.

const VISIBLE = 468;

function Sales({ start }: { start: boolean }) {
  const d = useCrm().dash;
  const { money, pct } = useFmt();
  const reduce = useReducedMotion();
  const p = d.sales.periods[1];
  const s = useMemo(() => series(p), [p]);
  const max = Math.max(...s.vals, ...s.prev) * 1.1;
  const n = s.vals.length;
  const [grow, setGrow] = useState(false);
  useEffect(() => {
    if (!start) return;
    const t = setTimeout(() => setGrow(true), reduce ? 0 : 60);
    return () => clearTimeout(t);
  }, [start, reduce]);
  const line = s.prev.map((v, i) => `${((i + 0.5) / n) * 100},${100 - (v / max) * 100}`).join(" ");
  return (
    <section
      className="flex flex-col gap-3 rounded-[20px] p-4"
      style={{
        background: "radial-gradient(60% 50% at 100% 0%,rgba(255,107,53,.08),transparent 70%),#fff",
        boxShadow: "inset 0 0 0 1px var(--color-yc-sand-200),var(--shadow-xs)",
      }}
    >
      <div className="flex items-start justify-between gap-2">
        <div className="min-w-0">
          <div className="font-yc-display text-[16px] font-semibold tracking-[-0.02em]">
            {d.sales.title}
          </div>
          <div className="text-[11.5px] text-yc-sand-500">{p.label}</div>
        </div>
        <div className="flex flex-none gap-0.5 rounded-full bg-yc-sand-100 p-[2px]">
          {d.sales.periods.map((pp, i) => (
            <span
              key={pp.k}
              className={cn(
                "rounded-full px-2 py-0.5 text-[11px] font-semibold",
                i === 1 ? "bg-white text-yc-ink shadow-[var(--shadow-xs)]" : "text-yc-sand-500",
              )}
            >
              {pp.k}
            </span>
          ))}
        </div>
      </div>
      <div>
        <Count
          to={p.tot}
          start={start}
          duration={1.1}
          format={(v) => money(Math.round(v))}
          className="block font-yc-display text-[44px] font-semibold leading-[0.95] tracking-[-0.05em]"
        />
        <span className="mt-1.5 block text-[12.5px] font-semibold text-yc-green-700">
          ▲ {pct(Math.round(p.d * 100))} vs {p.vs}
        </span>
      </div>
      <div className="relative h-[78px]">
        <div className="absolute inset-0 flex items-end gap-[2px]">
          {s.vals.map((v, i) => (
            <div
              key={i}
              className="w-full origin-bottom rounded-t-[2px]"
              style={{
                height: `${(v / max) * 100}%`,
                background: "linear-gradient(180deg,#FF6B35,#E3141B)",
                transform: grow ? "scaleY(1)" : "scaleY(0)",
                transition: `transform 700ms cubic-bezier(.22,1,.36,1) ${i * 14}ms`,
              }}
            />
          ))}
        </div>
        <svg
          viewBox="0 0 100 100"
          preserveAspectRatio="none"
          className="pointer-events-none absolute inset-0 size-full overflow-visible"
        >
          <polyline
            points={line}
            fill="none"
            stroke="var(--color-yc-ink)"
            strokeWidth="1.5"
            vectorEffect="non-scaling-stroke"
            strokeLinejoin="round"
            pathLength={1}
            style={{
              strokeDasharray: 1,
              strokeDashoffset: grow ? 0 : 1,
              transition: "stroke-dashoffset 1.2s cubic-bezier(.22,1,.36,1) .25s",
            }}
          />
        </svg>
      </div>
      <div className="flex items-start gap-2 rounded-[12px] bg-yc-red-50 px-3 py-2.5">
        <span className="mt-[5px] size-1.5 flex-none rounded-full bg-yc-red-500" />
        <span className="text-[12.5px] font-medium leading-[1.4]">{d.sales.insight}</span>
      </div>
    </section>
  );
}

function Kpis() {
  const k = useCrm().dash.kpis;
  return (
    <div className="grid grid-cols-2 gap-2">
      {k.map((x, i) => (
        <div
          key={x.label}
          className="flex min-w-0 flex-col gap-0.5 rounded-[16px] border border-yc-sand-200 bg-white px-3 py-2.5"
        >
          <span className="truncate text-[11.5px] font-medium text-yc-sand-600">{x.label}</span>
          <span className="font-yc-display text-[24px] font-semibold leading-[1.05] tracking-[-0.03em] yc-num">
            {x.value}
          </span>
          <span
            className={cn(
              "truncate text-[11px] font-semibold",
              i === 3 ? "text-yc-sand-500" : "text-yc-green-700",
            )}
          >
            {x.delta}
          </span>
        </div>
      ))}
    </div>
  );
}

function Night({ start }: { start: boolean }) {
  const n = useCrm().dash.night;
  const { num } = useFmt();
  return (
    <section
      className="relative isolate flex flex-col gap-3 overflow-hidden rounded-[20px] p-4 text-yc-on-night"
      style={{
        background:
          "radial-gradient(90% 70% at 100% 110%,rgba(227,20,27,.42),transparent 65%),radial-gradient(60% 45% at 0% 0%,rgba(255,107,53,.14),transparent 70%),var(--noise-night),var(--color-yc-night)",
      }}
    >
      <div className="flex items-center gap-2">
        <span className="font-yc-mono text-[10.5px] uppercase tracking-[0.08em] text-yc-on-night-2">
          {n.label}
        </span>
        <span className="flex h-[22px] items-center gap-1.5 rounded-full bg-white/[.08] px-2.5 text-[11.5px] font-semibold">
          <span className="yc-live size-1.5 rounded-full bg-yc-tangerine-500" />
          {n.when}
        </span>
      </div>
      <div>
        <div className="font-yc-display text-[22px] font-semibold leading-[1.05] tracking-[-0.03em]">
          {n.name}
        </div>
        <div className="text-[12px] text-yc-on-night-2">{n.place}</div>
      </div>
      <div className="flex items-baseline gap-2">
        <Count
          to={842}
          start={start}
          format={(v) => num(Math.round(v))}
          className="font-yc-display text-[40px] font-semibold leading-none tracking-[-0.05em]"
        />
        <span className="text-[13px] text-yc-on-night-2">{n.of}</span>
      </div>
      <div className="h-1.5 overflow-hidden rounded-full bg-white/[.12]">
        <div
          className="h-full rounded-full"
          style={{
            width: start ? "84.2%" : "0%",
            background: "var(--gradient-brand)",
            transition: "width 1.3s cubic-bezier(.22,1,.36,1) .2s",
          }}
        />
      </div>
      <span className="text-[12px] font-semibold text-yc-mint">{n.today}</span>
      <p className="rounded-[12px] bg-white/[.07] px-3 py-2.5 text-[12.5px] leading-[1.45] shadow-[inset_0_0_0_1px_rgba(255,255,255,.1)]">
        <Rich text={n.insight} />
      </p>
    </section>
  );
}

export function PhoneTodo() {
  const t = useCrm().dash.todo;
  return (
    <section className="flex flex-col gap-2">
      <div className="flex items-center gap-2">
        <span className="font-yc-display text-[16px] font-semibold tracking-[-0.02em]">
          {t.title}
        </span>
        <span className="grid h-5 min-w-5 place-items-center rounded-full bg-yc-red-500 px-1.5 text-[11px] font-semibold text-white">
          {t.items.length}
        </span>
      </div>
      {t.items.slice(0, 2).map((it, i) => (
        <div
          key={it.title}
          className="flex flex-col gap-1.5 rounded-[16px] border border-yc-sand-200 bg-white p-3.5"
        >
          <span
            className={cn(
              "inline-flex h-[22px] w-fit items-center gap-1.5 rounded-full px-2 text-[11px] font-semibold",
              i === 0 ? "bg-yc-red-50 text-yc-red-700" : "bg-yc-amber-50 text-yc-amber-700",
            )}
          >
            <span className={cn("size-1.5 rounded-full bg-current", i === 0 && "yc-live")} />
            {it.badge}
          </span>
          <span className="font-yc-display text-[15px] font-semibold leading-[1.2] tracking-[-0.01em]">
            {it.title}
          </span>
          <span className="text-[12px] leading-[1.4] text-yc-sand-600">{it.why}</span>
          {it.primary && (
            <span
              className="mt-1 inline-flex h-9 w-fit items-center gap-2 rounded-full pl-3.5 pr-1 text-[13px] font-semibold text-white"
              style={{ background: "var(--gradient-brand)", boxShadow: "var(--shadow-cta)" }}
            >
              {it.cta}
              <span className="grid size-7 place-items-center rounded-full bg-white text-yc-red-500">
                <ArrowRight className="size-3.5" strokeWidth={2.4} />
              </span>
            </span>
          )}
        </div>
      ))}
    </section>
  );
}

function Toasts({ run }: { run: boolean }) {
  const t = useCrm().hero.toasts;
  const reduce = useReducedMotion();
  const [i, setI] = useState(-1);
  useEffect(() => {
    if (!run || reduce) return;
    let k = -1;
    let hide: ReturnType<typeof setTimeout>;
    const show = () => {
      k = (k + 1) % t.length;
      setI(k);
      hide = setTimeout(() => setI(-1), 2900);
    };
    const first = setTimeout(show, 1600);
    const iv = setInterval(show, 4300);
    return () => {
      clearTimeout(first);
      clearTimeout(hide);
      clearInterval(iv);
    };
  }, [run, reduce, t.length]);
  const icon = [
    <Avatar key="a" ini="CR" tone="hot" size={32} />,
    <YunitFace key="y" size={32} mood="content" blink={false} />,
    <span
      key="s"
      className="grid size-8 place-items-center rounded-full bg-yc-green-50 text-[13px] font-bold text-yc-green-700"
    >
      ▲
    </span>,
  ];
  return (
    <div className="pointer-events-none absolute inset-x-2.5 top-[50px] z-20" aria-hidden>
      <AnimatePresence>
        {i >= 0 && (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: -18, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -12, scale: 0.97 }}
            transition={{ duration: 0.45, ease: EASE }}
            className="flex items-center gap-2.5 rounded-[18px] bg-white/[.88] py-2 pl-2 pr-3 shadow-[0_2px_4px_rgba(28,21,23,.06),0_18px_36px_-14px_rgba(28,21,23,.4)] ring-1 ring-black/[.06] backdrop-blur-xl"
          >
            {icon[i]}
            <span className="flex min-w-0 flex-col">
              <span className="truncate text-[13px] font-semibold leading-[17px] text-yc-ink">
                {t[i].title}
              </span>
              <span className="truncate text-[11.5px] leading-[15px] text-yc-sand-500">
                {t[i].sub}
              </span>
            </span>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export function PhoneConsole({ start }: { start: boolean }) {
  const c = useCrm();
  const h = c.hero;
  const d = c.dash;
  const { num } = useFmt();
  const vp = useRef<HTMLDivElement>(null);
  const content = useRef<HTMLDivElement>(null);
  const [dist, setDist] = useState(0);
  useEffect(() => {
    if (!vp.current || !content.current) return;
    const measure = () =>
      setDist(Math.max(0, (content.current?.offsetHeight ?? 0) - (vp.current?.clientHeight ?? 0)));
    const ro = new ResizeObserver(measure);
    ro.observe(content.current);
    ro.observe(vp.current);
    measure();
    return () => ro.disconnect();
  }, []);

  return (
    <div className="relative mx-auto w-full max-w-[380px]">
      <div
        aria-hidden
        className="pointer-events-none absolute -inset-x-6 -bottom-10 top-16 -z-10 rounded-[60px]"
        style={{
          background:
            "radial-gradient(60% 55% at 50% 60%, rgba(227,20,27,.32), rgba(255,107,53,.12) 50%, transparent 75%)",
          filter: "blur(22px)",
        }}
      />
      <div
        className="yc-frame relative rounded-[30px] ring-1 ring-yc-sand-200"
        style={{
          boxShadow: "0 2px 4px rgba(28,21,23,.05), 0 36px 70px -26px rgba(157,11,18,.42)",
        }}
      >
        <div className="flex h-10 items-center justify-between gap-2 border-b border-yc-sand-100 bg-white px-3.5">
          <span className="flex min-w-0 items-center gap-1.5 rounded-full bg-yc-sand-50 px-2.5 py-1 font-yc-mono text-[10.5px] text-yc-sand-500">
            <Lock className="size-3 flex-none" />
            <span className="truncate">{h.frameUrl}</span>
          </span>
          <span className="inline-flex flex-none items-center gap-1.5 rounded-full bg-yc-ink px-2.5 py-1 text-[11px] font-semibold text-white">
            <span className="yc-live size-1.5 rounded-full bg-yc-red-400" />
            {h.live}
          </span>
        </div>
        <div
          ref={vp}
          className="relative overflow-hidden"
          style={{ height: VISIBLE, background: CONSOLE_BG }}
        >
          <div
            ref={content}
            className={start && dist ? "yc-tour" : undefined}
            style={{ "--tour": `${-dist}px` } as CSSProperties}
          >
            <div className="flex flex-col gap-3 px-3.5 pb-5 pt-3.5 text-left text-yc-ink">
              <div className="flex items-center gap-2.5">
                <img src={appIcon} alt="" className="size-8 rounded-[9px]" />
                <span className="flex min-w-0 flex-1 flex-col">
                  <span className="truncate text-[13.5px] font-semibold leading-4">{d.venue}</span>
                  <span className="truncate text-[11px] leading-[14px] text-yc-sand-500">
                    {d.venueSub}
                  </span>
                </span>
                <span className="flex h-7 flex-none items-center gap-1.5 rounded-full bg-white pl-1 pr-2.5 text-[12px] font-semibold shadow-[inset_0_0_0_1px_var(--color-yc-sand-200)]">
                  <YunitFace size={20} blink={false} />
                  {num(c.channels.composer.balance)}
                </span>
              </div>
              <div className="pt-1">
                <span className="font-yc-mono text-[10.5px] uppercase tracking-[0.08em] text-yc-sand-500">
                  {d.date}
                </span>
                <div className="font-yc-display text-[26px] font-semibold leading-[1.1] tracking-[-0.035em]">
                  {d.hello}
                </div>
                <p className="mt-0.5 text-[13px] font-medium leading-[1.4] text-yc-sand-600">
                  {d.subtitle}
                </p>
              </div>
              <Sales start={start} />
              <Kpis />
              <Night start={start} />
              <PhoneTodo />
            </div>
          </div>
          <div
            aria-hidden
            className="pointer-events-none absolute inset-x-0 bottom-0 h-14 bg-gradient-to-t from-white/90 to-transparent"
          />
        </div>
      </div>
      <Toasts run={start} />
    </div>
  );
}
