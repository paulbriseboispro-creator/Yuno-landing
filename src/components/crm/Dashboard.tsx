import { useEffect, useMemo, useRef, useState, type CSSProperties, type ReactNode } from "react";
import { useReducedMotion } from "motion/react";
import {
  ArrowRight,
  BarChart3,
  Bell,
  CalendarDays,
  ChevronDown,
  ChevronRight,
  ChevronsUpDown,
  CircleHelp,
  Clock3,
  House,
  PanelLeft,
  Plug,
  Plus,
  Search,
  Send,
  SlidersHorizontal,
  Users,
} from "lucide-react";
import { cn } from "@/lib/utils";
import appIcon from "@/assets/crm/yuno-app-icon.webp";
import { useCrm } from "./content";
import { Count, Rich, YunitFace, useFmt } from "./ui";

// The Yuno CRM Console home ("Dashboard Accueil" of the design project), rebuilt
// as a live product shot for the landing: same sidebar, top bar, sales hero with
// its period switch and hover tooltip, four numbers, next night (dark card),
// who's buying and today's actions. Rendered at the design width and scaled to
// its frame, like the design's iframes (data-frame).

const W = 1440;

// Deterministic pseudo-random series (same chart on server and client).
function rng(seed: number) {
  let s = seed;
  return () => {
    s = (s * 16807) % 2147483647;
    return (s - 1) / 2147483646;
  };
}

type Period = { k: string; label: string; vs: string; tot: number; d: number; n: number };

function series(p: Period) {
  const r = rng(p.n * 31 + 7);
  const sendAgo = [3, 5, 7, 14, 21, 28, 35, 41].filter((a) => a < p.n);
  const raw = Array.from({ length: p.n }, (_, i) => {
    const ago = p.n - 1 - i;
    const dow = (6 - (ago % 7) + 7) % 7; // 6 = today is Saturday
    const weekend = dow === 5 || dow === 6 ? 1.15 : dow === 4 ? 0.55 : 0;
    const boost = sendAgo.some((a) => ago <= a && ago >= a - 2) ? 0.8 : 0;
    return 0.55 + weekend + boost + r() * 0.45;
  });
  const prevRaw = raw.map(() => 0.7 + r() * 0.9);
  const sum = raw.reduce((a, b) => a + b, 0);
  const psum = prevRaw.reduce((a, b) => a + b, 0);
  const prevTot = p.tot / (1 + p.d);
  return {
    vals: raw.map((v) => (v / sum) * p.tot),
    prev: prevRaw.map((v) => (v / psum) * prevTot),
    sends: sendAgo.map((a) => p.n - 1 - a),
  };
}

function useScaled(cw: number) {
  const ref = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(0.5);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const ro = new ResizeObserver(() => setScale(el.clientWidth / cw));
    ro.observe(el);
    setScale(el.clientWidth / cw);
    return () => ro.disconnect();
  }, [cw]);
  return { ref, scale };
}

// Scaled wrapper: children are laid out at `cw` px and shrunk to the box width.
export function Scaled({
  cw = W,
  height,
  children,
  className,
  innerStyle,
}: {
  cw?: number;
  height: number; // visible height at design size
  children: ReactNode;
  className?: string;
  innerStyle?: CSSProperties;
}) {
  const { ref, scale } = useScaled(cw);
  return (
    <div
      ref={ref}
      className={cn("relative overflow-hidden", className)}
      style={{ height: height * scale }}
    >
      <div
        style={{ width: cw, transform: `scale(${scale})`, transformOrigin: "0 0", ...innerStyle }}
      >
        {children}
      </div>
    </div>
  );
}

const NAV_ICON = "size-5 flex-none";

function Sidebar() {
  const d = useCrm().dash;
  const row = (
    label: string,
    icon: ReactNode,
    opts: { on?: boolean; group?: boolean; badge?: string; badgeRed?: boolean } = {},
  ) => (
    <div
      className={cn(
        "flex h-[42px] items-center gap-3 rounded-[12px] px-3 text-[15px]",
        opts.on ? "bg-yc-red-50 font-semibold text-yc-red-600" : "font-medium text-yc-sand-600",
      )}
    >
      {icon}
      <span className="flex-1">{label}</span>
      {opts.badge && (
        <span
          className={cn(
            "grid h-5 min-w-5 place-items-center rounded-full px-1.5 text-[12px] font-semibold",
            opts.badgeRed ? "bg-yc-red-500 text-white" : "bg-yc-sand-100 text-yc-sand-700",
          )}
        >
          {opts.badge}
        </span>
      )}
      {opts.group && <ChevronDown className="size-4 text-yc-sand-400" strokeWidth={2.2} />}
    </div>
  );
  const label = (t: string) => (
    <span className="px-3 pb-1 pt-3.5 font-yc-mono text-[11px] uppercase tracking-[0.08em] text-yc-sand-400">
      {t}
    </span>
  );
  return (
    <aside className="flex w-[264px] flex-none flex-col gap-0.5 overflow-hidden border-r border-yc-sand-100 bg-white px-3 py-3.5">
      <div className="flex items-center gap-2.5 p-1 pb-3">
        <img src={appIcon} alt="" className="size-9 rounded-[10px]" />
        <span className="flex min-w-0 flex-col">
          <span className="text-[15px] font-semibold leading-[18px] text-yc-ink">{d.venue}</span>
          <span className="text-[12px] leading-[15px] text-yc-sand-500">{d.venueSub}</span>
        </span>
        <ChevronsUpDown className="ml-1 size-3.5 text-yc-sand-400" />
      </div>
      {label(d.nav.groups[0])}
      {row(d.nav.home, <House className={NAV_ICON} strokeWidth={2} />, { on: true })}
      {row(d.nav.analyses, <BarChart3 className={NAV_ICON} strokeWidth={2} />, { group: true })}
      {label(d.nav.groups[1])}
      {row(d.nav.campaigns, <Send className={NAV_ICON} strokeWidth={2} />, {
        group: true,
        badge: "2",
        badgeRed: true,
      })}
      {row(d.nav.nights, <CalendarDays className={NAV_ICON} strokeWidth={2} />, { group: true })}
      {label(d.nav.groups[2])}
      {row(d.nav.clients, <Users className={NAV_ICON} strokeWidth={2} />, {
        group: true,
        badge: "38",
      })}
      <div className="min-h-3 flex-1" />
      <div className="flex flex-col gap-0.5 border-t border-yc-sand-100 pt-2">
        <div className="mb-1.5 flex h-[52px] items-center gap-3 rounded-[14px] bg-yc-sand-50 px-2.5">
          <YunitFace size={30} />
          <span className="flex min-w-0 flex-1 flex-col">
            <span className="text-[14.5px] font-semibold leading-[18px]">{d.nav.yunits}</span>
            <span className="text-[12.5px] leading-[15px] text-yc-sand-500">{d.nav.yunitsSub}</span>
          </span>
          <ChevronRight className="size-4 text-yc-sand-400" />
        </div>
        {[
          [d.nav.connectors, <Plug key="p" className={NAV_ICON} strokeWidth={2} />],
          [d.nav.settings, <SlidersHorizontal key="s" className={NAV_ICON} strokeWidth={2} />],
          [d.nav.help, <CircleHelp key="h" className={NAV_ICON} strokeWidth={2} />],
        ].map(([t, ic]) => (
          <div
            key={t as string}
            className="flex h-10 items-center gap-3 rounded-[12px] px-3 text-[14.5px] font-medium text-yc-sand-600"
          >
            {ic}
            <span>{t}</span>
          </div>
        ))}
        <div className="flex h-10 items-center gap-3 px-3 text-[14.5px] font-medium text-yc-sand-500">
          <PanelLeft className={NAV_ICON} strokeWidth={2} />
        </div>
      </div>
    </aside>
  );
}

function TopBar() {
  const d = useCrm().dash;
  const { num } = useFmt();
  return (
    <header className="sticky top-0 z-10 flex h-16 items-center justify-between gap-4 border-b border-yc-sand-100 bg-[rgba(252,250,249,.92)] px-10">
      <label className="flex h-10 w-[380px] items-center gap-2.5 rounded-full border border-yc-sand-200 bg-white pl-3.5 pr-2">
        <Search className="size-4 text-yc-sand-400" strokeWidth={2.2} />
        <span className="flex-1 text-[14px] text-yc-sand-400">{d.search}</span>
        <span className="h-[22px] rounded-[7px] bg-yc-sand-100 px-[7px] font-yc-mono text-[12px] leading-[22px] text-yc-sand-500">
          ⌘K
        </span>
      </label>
      <div className="flex items-center gap-2.5">
        <span className="flex h-9 items-center gap-2 rounded-full px-3.5 text-[13px] font-medium text-yc-sand-600">
          <span className="size-[7px] rounded-full bg-yc-green-500" />
          {d.sync}
        </span>
        <span className="flex h-9 items-center gap-2 rounded-full border border-yc-sand-200 bg-white pl-1.5 pr-2.5 text-[14px] font-semibold">
          <YunitFace size={24} blink={false} />
          {num(8940)}
          <span className="font-normal text-yc-sand-500">{d.yunitsWord}</span>
          <ChevronDown className="size-3.5 text-yc-sand-400" strokeWidth={2.4} />
        </span>
        <span className="relative grid size-9 place-items-center rounded-full border border-yc-sand-200 bg-white">
          <Bell className="size-[17px] text-yc-ink" strokeWidth={2} />
          <span className="absolute right-[7px] top-[7px] size-2 rounded-full border-2 border-white bg-yc-red-500" />
        </span>
        <span className="grid size-9 place-items-center rounded-full bg-yc-sand-100 text-[13px] font-semibold text-yc-sand-700">
          NS
        </span>
      </div>
    </header>
  );
}

function SalesHero({ start }: { start: boolean }) {
  const d = useCrm().dash;
  const { num, money, pct, day } = useFmt();
  const reduce = useReducedMotion();
  const [pi, setPi] = useState(1);
  const [hover, setHover] = useState<number | null>(null);
  const [grow, setGrow] = useState(false);
  const p = d.sales.periods[pi];
  const s = useMemo(() => series(p), [p]);
  const max = Math.max(...s.vals, ...s.prev) * 1.12;
  const step = max > 4000 ? 2000 : max > 2000 ? 1000 : 500;
  const grid = [1, 2, 3].map((k) => k * step).filter((v) => v < max);
  const n = s.vals.length;

  useEffect(() => {
    if (!start) return;
    setGrow(false);
    const t = setTimeout(() => setGrow(true), reduce ? 0 : 60);
    return () => clearTimeout(t);
  }, [start, pi, reduce]);

  const today = new Date(2026, 9, 3);
  const dayLabel = (i: number) => {
    const days = p.n === 45 ? 2 : 1;
    const dt = new Date(today);
    dt.setDate(today.getDate() - (n - 1 - i) * days);
    return day(dt);
  };
  const linePts = s.prev
    .map((v, i) => `${((i + 0.5) / n) * 100},${100 - (v / max) * 100}`)
    .join(" ");
  const xl = [0, 0.25, 0.5, 0.75, 1].map((r) => dayLabel(Math.min(n - 1, Math.round(r * (n - 1)))));

  return (
    <section
      className="flex flex-col gap-[18px] rounded-[28px] p-8"
      style={{
        background: "radial-gradient(60% 50% at 100% 0%,rgba(255,107,53,.07),transparent 70%),#fff",
        boxShadow: "inset 0 0 0 1px var(--color-yc-sand-200),var(--shadow-sm)",
      }}
    >
      <div className="flex items-start justify-between gap-5">
        <div>
          <div className="font-yc-display text-[22px] font-semibold tracking-[-0.02em]">
            {d.sales.title}
          </div>
          <div className="mt-0.5 text-[13.5px] text-yc-sand-500">
            {d.sales.unit} · {p.label}
          </div>
        </div>
        <div className="inline-flex gap-0.5 rounded-full bg-yc-sand-100 p-[3px]" role="group">
          {d.sales.periods.map((pp, i) => (
            <button
              key={pp.k}
              type="button"
              onClick={() => setPi(i)}
              aria-pressed={pi === i}
              className={cn(
                "h-[34px] rounded-full px-4 text-[14px] font-semibold transition-colors",
                pi === i
                  ? "bg-white text-yc-ink shadow-[var(--shadow-xs)]"
                  : "text-yc-sand-600 hover:text-yc-ink",
              )}
            >
              {pp.k}
            </button>
          ))}
        </div>
      </div>

      <div className="flex items-end gap-6">
        <Count
          key={pi}
          to={p.tot}
          start={start}
          duration={1.1}
          format={(v) => money(Math.round(v))}
          className="font-yc-display text-[118px] font-semibold leading-[0.92] tracking-[-0.055em]"
        />
        <div className="flex flex-col gap-1 pb-2.5">
          <span className="text-[17px] font-semibold text-yc-green-700">
            ▲ {pct(Math.round(p.d * 100))} vs {p.vs}
          </span>
          <span className="text-[14px] text-yc-sand-500">
            {d.sales.moreSub.replace("{n}", money(Math.round(p.tot - p.tot / (1 + p.d))))}
          </span>
        </div>
      </div>

      <div className="flex gap-[22px] text-[13px] text-yc-sand-600">
        <span className="inline-flex items-center gap-2">
          <i
            className="inline-block h-3.5 w-2.5 rounded-t-[3px]"
            style={{ background: "linear-gradient(180deg,#FF6B35,#E3141B)" }}
          />
          {d.sales.legend[0]}
        </span>
        <span className="inline-flex items-center gap-2">
          <i className="inline-block w-[18px] border-t-2 border-yc-ink" />
          {d.sales.legend[1]}
        </span>
        <span className="inline-flex items-center gap-2">
          <i className="inline-block size-[9px] rounded-full bg-yc-ink" />
          {d.sales.legend[2]}
        </span>
      </div>

      <div className="flex flex-col gap-2">
        <div className="relative ml-[60px] h-[280px]" onMouseLeave={() => setHover(null)}>
          {grid.map((g) => (
            <div
              key={g}
              className="pointer-events-none absolute -left-[60px] right-0 h-0 border-t border-yc-sand-100"
              style={{ bottom: `${(g / max) * 100}%` }}
            >
              <span className="absolute -top-[9px] left-0 w-[52px] bg-white pr-1 text-right font-yc-mono text-[11px] text-yc-sand-400">
                {num(g)}
              </span>
            </div>
          ))}
          <div className="absolute inset-0 flex items-end" style={{ gap: n > 40 ? 3 : 5 }}>
            {s.vals.map((v, i) => (
              <div
                key={`${pi}-${i}`}
                className="flex h-full min-w-0 flex-1 cursor-crosshair items-end"
                onMouseEnter={() => setHover(i)}
              >
                <div
                  className="w-full origin-bottom rounded-t-[3px]"
                  style={{
                    height: `${(v / max) * 100}%`,
                    background:
                      hover === i
                        ? "linear-gradient(180deg,#F5524B,#9D0B12)"
                        : "linear-gradient(180deg,#FF6B35,#E3141B)",
                    opacity: hover !== null && hover !== i ? 0.45 : 1,
                    transform: grow ? "scaleY(1)" : "scaleY(0)",
                    transition: `transform 700ms cubic-bezier(.22,1,.36,1) ${i * 14}ms, opacity 140ms, background 120ms`,
                  }}
                />
              </div>
            ))}
          </div>
          <svg
            viewBox="0 0 100 100"
            preserveAspectRatio="none"
            className="pointer-events-none absolute inset-0 size-full overflow-visible"
          >
            <polyline
              points={linePts}
              fill="none"
              stroke="var(--color-yc-ink)"
              strokeWidth="2"
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
          {s.sends.map((si, k) => (
            <div
              key={`${pi}-s${si}`}
              className="pointer-events-none absolute bottom-0 top-0 w-0 border-l-[1.5px] border-dashed border-yc-sand-400"
              style={{
                left: `${((si + 0.5) / n) * 100}%`,
                opacity: grow ? 1 : 0,
                transition: `opacity 400ms ${600 + k * 80}ms`,
              }}
            >
              <span className="absolute -left-[6px] -top-[5px] size-2.5 rounded-full bg-yc-ink shadow-[0_0_0_3px_#fff]" />
            </div>
          ))}
          {hover !== null && (
            <div
              className="pointer-events-none absolute top-1.5 z-[3] flex flex-col gap-0.5 whitespace-nowrap rounded-[14px] bg-yc-ink px-3.5 py-2.5 text-white shadow-[var(--shadow-md)]"
              style={{
                left: `${((hover + 0.5) / n) * 100}%`,
                transform: hover > n * 0.6 ? "translateX(calc(-100% - 12px))" : "translateX(12px)",
              }}
            >
              <span className="text-[12px] text-yc-on-night-2">{dayLabel(hover)}</span>
              <span className="font-yc-display text-[22px] font-semibold tracking-[-0.02em]">
                {money(Math.round(s.vals[hover]))}
              </span>
              <span className="text-[12px] text-yc-on-night-2">
                {d.sales.tipPrev.replace("{n}", money(Math.round(s.prev[hover])))}
              </span>
              {s.sends.includes(hover) && (
                <span className="mt-1 text-[12px] font-semibold text-yc-red-300">
                  ● {d.sales.sends[s.sends.indexOf(hover) % 3]}
                </span>
              )}
            </div>
          )}
        </div>
        <div className="ml-[60px] flex justify-between font-yc-mono text-[11.5px] text-yc-sand-500">
          {xl.map((x, i) => (
            <span key={i}>{x}</span>
          ))}
        </div>
      </div>
      <div className="flex items-center gap-3 rounded-[16px] bg-yc-red-50 px-[18px] py-3.5">
        <span className="size-2 flex-none rounded-full bg-yc-red-500" />
        <span className="text-[15px] font-medium leading-[1.45]">{d.sales.insight}</span>
      </div>
    </section>
  );
}

function Kpis({ start }: { start: boolean }) {
  const d = useCrm().dash;
  const card =
    "flex min-w-0 flex-col gap-1.5 rounded-[20px] border border-yc-sand-200 bg-white px-[22px] py-5";
  const big = "font-yc-display text-[44px] font-semibold leading-[1.05] tracking-[-0.035em] yc-num";
  const delta = "text-[13px] font-semibold text-yc-green-700";
  const note = "text-[13px] leading-[18px] text-yc-sand-500";
  const label = "text-[14px] font-medium text-yc-sand-600";
  const anim = (delay: number): CSSProperties => ({
    clipPath: start ? "inset(0 0 0 0)" : "inset(0 100% 0 0)",
    transition: `clip-path 1.1s cubic-bezier(.22,1,.36,1) ${delay}ms`,
  });
  const k = d.kpis;
  return (
    <div className="grid grid-cols-4 gap-4">
      <div className={card}>
        <span className={label}>{k[0].label}</span>
        <span className={big}>{k[0].value}</span>
        <span className={delta}>{k[0].delta}</span>
        <svg viewBox="0 0 200 48" className="mt-2 h-12 w-full" style={anim(200)}>
          <defs>
            <linearGradient id="yc-spark" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0" stopColor="#E3141B" stopOpacity=".22" />
              <stop offset="1" stopColor="#E3141B" stopOpacity="0" />
            </linearGradient>
          </defs>
          <path
            d="M0 40 C 30 38, 45 34, 70 30 S 110 26, 130 20 S 170 10, 200 6 L200 48 L0 48 Z"
            fill="url(#yc-spark)"
          />
          <path
            d="M0 40 C 30 38, 45 34, 70 30 S 110 26, 130 20 S 170 10, 200 6"
            fill="none"
            stroke="#E3141B"
            strokeWidth="2.5"
            strokeLinecap="round"
          />
        </svg>
        <span className={note}>{k[0].note}</span>
      </div>
      <div className={card}>
        <span className={label}>{k[1].label}</span>
        <span className={big}>{k[1].value}</span>
        <span className={delta}>{k[1].delta}</span>
        <div className="mt-2 flex h-12 items-end gap-1.5">
          {[38, 52, 46, 64, 72, 100].map((h, i) => (
            <div
              key={i}
              className="flex-1 origin-bottom rounded-t-[4px]"
              style={{
                height: `${h}%`,
                background: i === 5 ? "var(--gradient-brand)" : "var(--color-yc-red-100)",
                transform: start ? "scaleY(1)" : "scaleY(0)",
                transition: `transform 700ms cubic-bezier(.22,1,.36,1) ${300 + i * 60}ms`,
              }}
            />
          ))}
        </div>
        <span className={note}>{k[1].note}</span>
      </div>
      <div className={card}>
        <span className={label}>{k[2].label}</span>
        <div className="flex items-center justify-between gap-2.5">
          <span className={big}>{k[2].value}</span>
          <div
            className="relative size-14 flex-none rounded-full"
            style={{
              background: `conic-gradient(#E3141B 0 ${start ? 32 : 0}deg, #FFE1DF 0)`,
              transition: "background 1s",
            }}
          >
            <span className="absolute inset-[9px] rounded-full bg-white" />
          </div>
        </div>
        <span className={delta}>{k[2].delta}</span>
        <span className={cn(note, "mt-2")}>{k[2].note}</span>
      </div>
      <div className={card}>
        <span className={label}>{k[3].label}</span>
        <span className={big}>{k[3].value}</span>
        <span className={cn(delta, "text-yc-sand-600")}>{k[3].delta}</span>
        <div className="mt-2">
          <div className="flex h-3 gap-0.5 overflow-hidden rounded-full" style={anim(450)}>
            <div style={{ width: "71%", background: "var(--gradient-brand)" }} />
            <div style={{ width: "12%", background: "var(--color-yc-red-300)" }} />
            <div style={{ width: "3%", background: "var(--color-yc-red-100)" }} />
            <div style={{ width: "14%", background: "var(--color-yc-sand-200)" }} />
          </div>
          <div className="mt-1.5 flex justify-between gap-2 text-[12px] text-yc-sand-500">
            <span>{d.reach[0]}</span>
            <span>{d.reach[1]}</span>
          </div>
        </div>
        <span className={note}>{k[3].note}</span>
      </div>
    </div>
  );
}

// Current vs previous night (design: GP lead, X = i·40, YM = 160 − (v − 380)/490·150).
const CV = [455, 520, 585, 640, 700, 752, 800, 842];
const GP = [29, 33, 36, 38, 39, 40, 40, 40];
const PV = CV.map((v, i) => v - GP[i]);
const X = (i: number) => i * 40;
const YM = (v: number) => 160 - ((v - 380) / 490) * 150;
const path = (arr: number[]) =>
  arr.map((v, i) => `${i ? "L" : "M"}${X(i)} ${YM(v).toFixed(1)}`).join(" ");
const area = `${path(CV)} ${PV.map((v, i) => `L${X(PV.length - 1 - i)} ${YM(PV[PV.length - 1 - i]).toFixed(1)}`).join(" ")} Z`;

function NextNight({ start }: { start: boolean }) {
  const n = useCrm().dash.night;
  const { num } = useFmt();
  return (
    <section
      className="relative isolate flex min-w-0 flex-[1.6_1_640px] flex-wrap gap-x-9 gap-y-6 overflow-hidden rounded-[28px] p-7 text-yc-on-night"
      style={{
        background:
          "radial-gradient(90% 70% at 100% 110%,rgba(227,20,27,.4),transparent 65%),radial-gradient(60% 45% at 0% 0%,rgba(255,107,53,.14),transparent 70%),var(--noise-night),var(--color-yc-night)",
        boxShadow: "inset 0 0 0 1px rgba(255,255,255,.06)",
      }}
    >
      <div className="flex min-w-0 flex-[1_1_240px] flex-col gap-[18px]">
        <div className="flex flex-wrap items-center gap-2.5">
          <span className="font-yc-mono text-[12px] uppercase tracking-[0.08em] text-yc-on-night-2">
            {n.label}
          </span>
          <span className="flex h-[26px] items-center gap-[7px] rounded-full bg-white/[.08] px-3 text-[13px] font-semibold shadow-[inset_0_0_0_1px_rgba(255,255,255,.1)]">
            <span className="yc-live size-1.5 rounded-full bg-yc-tangerine-500" />
            {n.when}
          </span>
        </div>
        <div className="flex flex-col gap-0.5">
          <span className="font-yc-display text-[30px] font-semibold leading-[1.05] tracking-[-0.03em]">
            {n.name}
          </span>
          <span className="text-[14.5px] text-yc-on-night-2">{n.place}</span>
        </div>
        <div className="mt-2.5 flex flex-col gap-2.5">
          <div className="flex flex-wrap items-baseline gap-x-2.5 gap-y-1">
            <Count
              to={842}
              start={start}
              format={(v) => num(Math.round(v))}
              className="font-yc-display text-[80px] font-semibold leading-[0.95] tracking-[-0.05em]"
            />
            <span className="text-[16px] text-yc-on-night-2">{n.of}</span>
          </div>
          <div className="h-2 overflow-hidden rounded-full bg-white/[.12]">
            <div
              className="h-full rounded-full"
              style={{
                width: start ? "84.2%" : "0%",
                background: "var(--gradient-brand)",
                transition: "width 1.3s cubic-bezier(.22,1,.36,1) .2s",
              }}
            />
          </div>
          <span className="text-[14px] font-semibold text-yc-mint">{n.today}</span>
        </div>
      </div>
      <div className="flex min-w-0 flex-[1.2_1_280px] flex-col justify-end gap-3">
        <div className="relative h-[170px] pl-8 pr-[52px]">
          <svg
            viewBox="0 0 280 170"
            preserveAspectRatio="none"
            className="h-[170px] w-full overflow-visible"
          >
            <path
              d={area}
              fill="rgba(124,224,162,.28)"
              style={{ opacity: start ? 1 : 0, transition: "opacity .6s 1s" }}
            />
            <path
              d={path(PV)}
              fill="none"
              stroke="rgba(255,255,255,.5)"
              strokeWidth="2"
              strokeDasharray="5 5"
              vectorEffect="non-scaling-stroke"
            />
            <path
              d={path(CV)}
              fill="none"
              stroke="#fff"
              strokeWidth="3"
              strokeLinecap="round"
              vectorEffect="non-scaling-stroke"
              pathLength={1}
              style={{
                strokeDasharray: 1,
                strokeDashoffset: start ? 0 : 1,
                transition: "stroke-dashoffset 1.4s cubic-bezier(.22,1,.36,1) .2s",
              }}
            />
          </svg>
          {[
            [400, 147],
            [600, 86],
            [800, 24],
          ].map(([v, t]) => (
            <span
              key={v}
              className="absolute left-0 text-[11px] text-yc-on-night-2"
              style={{ top: t }}
            >
              {v}
            </span>
          ))}
          <i
            className="absolute right-[47px] size-2.5 rounded-full bg-white shadow-[0_0_0_5px_rgba(255,255,255,.22)]"
            style={{ top: YM(842) - 5, opacity: start ? 1 : 0, transition: "opacity .4s 1.5s" }}
          />
          <span
            className="absolute right-0 text-[15px] font-bold leading-4 text-yc-mint"
            style={{ top: YM(842) - 6, opacity: start ? 1 : 0, transition: "opacity .4s 1.6s" }}
          >
            +40
          </span>
        </div>
        <div className="flex justify-between pl-8 pr-[52px] text-[11.5px] text-yc-on-night-2">
          <span>{n.axis[0]}</span>
          <span>{n.axis[1]}</span>
        </div>
        <div className="flex flex-wrap gap-x-4 gap-y-1 text-[12px] text-yc-on-night-2">
          <span className="inline-flex items-center gap-1.5">
            <i className="inline-block h-[3px] w-3.5 rounded-[2px] bg-white" />
            {n.legend[0]}
          </span>
          <span className="inline-flex items-center gap-1.5">
            <i className="inline-block w-3.5 border-t-2 border-dashed border-white/50" />
            {n.legend[1]}
          </span>
          <span className="inline-flex items-center gap-1.5">
            <i className="inline-block h-2 w-3.5 rounded-[2px] bg-[rgba(124,224,162,.45)]" />
            {n.legend[2]}
          </span>
        </div>
      </div>
      <div className="flex flex-[1_1_100%] items-center rounded-[16px] bg-white/[.07] px-[18px] py-3.5 shadow-[inset_0_0_0_1px_rgba(255,255,255,.1)]">
        <p className="text-[15px] leading-normal">
          <Rich text={n.insight} />
        </p>
      </div>
    </section>
  );
}

function WhoBuys({ start }: { start: boolean }) {
  const w = useCrm().dash.who;
  const { pct } = useFmt();
  const colors = ["#E3141B", "#FF6B35", "#FFC4C0"];
  const [a, b] = [w.rows[0].p * 3.6, (w.rows[0].p + w.rows[1].p) * 3.6];
  return (
    <section className="flex min-w-0 flex-[1_1_340px] flex-col gap-[18px] rounded-[28px] bg-white p-6 shadow-[inset_0_0_0_1px_var(--color-yc-sand-200)]">
      <div>
        <div className="font-yc-display text-[22px] font-semibold tracking-[-0.02em]">
          {w.title}
        </div>
        <div className="mt-0.5 text-[13.5px] text-yc-sand-500">{w.sub}</div>
      </div>
      <div className="flex items-center gap-6">
        <div
          className="relative size-[148px] flex-none rounded-full"
          style={{
            background: `conic-gradient(${colors[0]} 0 ${a}deg, ${colors[1]} 0 ${b}deg, ${colors[2]} 0 360deg)`,
            clipPath: start ? "circle(50%)" : "circle(0%)",
            transition: "clip-path 900ms cubic-bezier(.22,1,.36,1) .3s",
          }}
        >
          <span className="absolute inset-[22px] flex flex-col items-center justify-center rounded-full bg-white">
            <span className="font-yc-display text-[30px] font-semibold leading-none tracking-[-0.03em]">
              842
            </span>
            <span className="text-[12px] text-yc-sand-500">{w.center}</span>
          </span>
        </div>
        <div className="flex flex-1 flex-col gap-1">
          {w.rows.map((r, i) => (
            <div key={r.l} className="flex items-center gap-2.5 rounded-[12px] px-2 py-1.5">
              <i className="size-2.5 flex-none rounded-[3px]" style={{ background: colors[i] }} />
              <span className="flex min-w-0 flex-1 flex-col">
                <span className="text-[14.5px] font-semibold leading-[18px]">{r.l}</span>
                <span className="text-[12.5px] text-yc-sand-500">{r.sub}</span>
              </span>
              <span className="flex flex-col items-end">
                <b className="text-[15px] font-semibold">{pct(r.p)}</b>
                <span className="text-[12px] text-yc-sand-500">
                  {r.n} {w.buyers}
                </span>
              </span>
            </div>
          ))}
        </div>
      </div>
      <p className="text-[14px] leading-[1.45] text-yc-sand-600">
        <Rich text={w.note} />
      </p>
      <span className="mt-auto inline-flex items-center gap-1.5 text-[14.5px] font-semibold text-yc-red-600">
        {w.link}
        <ArrowRight className="size-4" strokeWidth={2.4} />
      </span>
    </section>
  );
}

function Todo() {
  const t = useCrm().dash.todo;
  return (
    <section className="flex flex-col gap-4">
      <div className="flex items-center gap-2.5">
        <div className="font-yc-display text-[22px] font-semibold tracking-[-0.02em]">
          {t.title}
        </div>
        <span className="grid h-6 min-w-6 place-items-center rounded-full bg-yc-red-500 px-2 text-[12.5px] font-semibold text-white">
          3
        </span>
      </div>
      <div className="grid grid-cols-3 gap-4">
        {t.items.map((it, i) => (
          <div
            key={it.title}
            className="flex flex-col gap-2 rounded-[20px] border border-yc-sand-200 bg-white p-5"
          >
            <div className="flex items-center justify-between">
              <span
                className={cn(
                  "inline-flex h-6 items-center gap-1.5 rounded-full px-2.5 text-[12px] font-semibold",
                  i === 0
                    ? "bg-yc-red-50 text-yc-red-700"
                    : i === 1
                      ? "bg-yc-amber-50 text-yc-amber-700"
                      : "bg-yc-sand-100 text-yc-sand-600",
                )}
              >
                <span className={cn("size-1.5 rounded-full bg-current", i === 0 && "yc-live")} />
                {it.badge}
              </span>
              <span className="grid size-7 place-items-center rounded-full text-yc-sand-400">
                <Clock3 className="size-4" />
              </span>
            </div>
            <span className="font-yc-display text-[18px] font-semibold leading-[1.2] tracking-[-0.02em]">
              {it.title}
            </span>
            <span className="text-[13.5px] leading-[1.45] text-yc-sand-600">{it.why}</span>
            <div className="mt-auto pt-2">
              {it.primary ? (
                <span
                  className="inline-flex h-10 items-center gap-2.5 rounded-full pl-4 pr-[5px] text-[14px] font-semibold text-white"
                  style={{ background: "var(--gradient-brand)", boxShadow: "var(--shadow-cta)" }}
                >
                  {it.cta}
                  <span className="grid size-[30px] place-items-center rounded-full bg-white text-yc-red-500">
                    <ArrowRight className="size-[15px]" strokeWidth={2.4} />
                  </span>
                </span>
              ) : (
                <span className="inline-flex items-center gap-1.5 text-[14px] font-semibold text-yc-ink">
                  {it.cta}
                  <ArrowRight className="size-4" />
                </span>
              )}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

function HomeMain({ start }: { start: boolean }) {
  const d = useCrm().dash;
  return (
    <main className="mx-auto flex w-full max-w-[1280px] flex-col gap-7 px-10 pb-14 pt-9">
      <div className="flex items-end justify-between gap-6">
        <div className="flex min-w-0 flex-col gap-2">
          <span className="font-yc-mono text-[12px] uppercase tracking-[0.08em] text-yc-sand-500">
            {d.date}
          </span>
          <div className="font-yc-display text-[36px] font-semibold leading-[1.05] tracking-[-0.035em]">
            {d.hello}
          </div>
          <p className="text-[16px] font-medium leading-[1.45] text-yc-sand-600">
            {d.subtitle} <span className="font-semibold text-yc-red-600">{d.see}</span>
          </p>
        </div>
        <span className="flex h-[46px] flex-none items-center gap-2 rounded-full border border-yc-sand-200 bg-white pl-4 pr-5 text-[15px] font-semibold shadow-[var(--shadow-xs)]">
          <Plus className="size-[18px]" strokeWidth={2.4} />
          {d.newCampaign}
        </span>
      </div>
      <section className="flex items-center gap-6 rounded-[24px] bg-white px-[22px] py-[18px] shadow-[inset_0_0_0_1px_var(--color-yc-sand-200),var(--shadow-xs)]">
        <YunitFace mood="ravi" size={56} />
        <div className="flex min-w-0 flex-1 flex-col gap-1">
          <span className="font-yc-mono text-[11.5px] uppercase tracking-[0.08em] text-yc-sand-500">
            {d.mission.label}
          </span>
          <span className="font-yc-display text-[22px] font-semibold leading-[1.15] tracking-[-0.03em]">
            {d.mission.title}
          </span>
          <span className="text-[14px] leading-[1.45] text-yc-sand-600">{d.mission.sub}</span>
        </div>
        <span className="flex flex-none items-center gap-1.5 text-[14.5px] font-semibold">
          {d.mission.link}
          <ChevronRight className="size-4" />
        </span>
      </section>
      <SalesHero start={start} />
      <Kpis start={start} />
      <div className="flex flex-wrap items-stretch gap-5">
        <NextNight start={start} />
        <WhoBuys start={start} />
      </div>
      <Todo />
    </main>
  );
}

const CONSOLE_BG =
  "radial-gradient(55% 40% at 90% -5%,rgba(255,107,53,.08),transparent 70%),radial-gradient(45% 40% at 0% 0%,rgba(227,20,27,.05),transparent 70%),var(--color-yc-paper)";

// The whole home, at its natural height (static shots, the steps monitor).
// With `height`, it becomes a fixed viewport like the real app: sidebar and top
// bar stay put, and with `tour` the content scrolls itself (CSS .yc-tour, paused
// on hover of the surrounding .yc-frame).
export function ConsoleHome({
  start = true,
  sidebar = true,
  height,
  tour = false,
}: {
  start?: boolean;
  sidebar?: boolean;
  height?: number;
  tour?: boolean;
}) {
  const vp = useRef<HTMLDivElement>(null);
  const content = useRef<HTMLDivElement>(null);
  const [dist, setDist] = useState(0);
  useEffect(() => {
    if (!height || !vp.current || !content.current) return;
    const measure = () =>
      setDist(Math.max(0, (content.current?.offsetHeight ?? 0) - (vp.current?.clientHeight ?? 0)));
    const ro = new ResizeObserver(measure);
    ro.observe(content.current);
    ro.observe(vp.current);
    measure();
    return () => ro.disconnect();
  }, [height]);

  if (!height) {
    return (
      <div className="flex text-yc-ink" style={{ background: CONSOLE_BG }}>
        {sidebar && <Sidebar />}
        <div className="flex min-w-0 flex-1 flex-col">
          <TopBar />
          <HomeMain start={start} />
        </div>
      </div>
    );
  }
  return (
    <div className="flex overflow-hidden text-yc-ink" style={{ background: CONSOLE_BG, height }}>
      {sidebar && <Sidebar />}
      <div className="flex min-w-0 flex-1 flex-col">
        <TopBar />
        <div ref={vp} className="min-h-0 flex-1 overflow-hidden">
          <div
            ref={content}
            className={tour && dist ? "yc-tour" : undefined}
            style={{ "--tour": `${-dist}px` } as CSSProperties}
          >
            <HomeMain start={start} />
          </div>
        </div>
      </div>
    </div>
  );
}
