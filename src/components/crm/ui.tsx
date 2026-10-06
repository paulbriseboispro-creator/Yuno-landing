import {
  Fragment,
  useEffect,
  useId,
  useRef,
  useState,
  type CSSProperties,
  type ReactNode,
} from "react";
import { motion, useInView, useReducedMotion } from "motion/react";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { crmStartHref } from "@/i18n/start";
import { useLanding, type SignupRole } from "@/components/landing/context";
import appIcon from "@/assets/crm/yuno-app-icon.webp";

// Shared pieces of the Yuno CRM landing, built on the Yuno design system
// (src/styles/crm.css): the pill CTA with its white arrow disc, the scroll
// reveal (800 ms ease-out, 18 px rise + 8 px blur, 80 ms stagger), the accent
// word, the Yunit mascot and the marquee.

export const EASE = [0.22, 1, 0.36, 1] as const;

const LOCALES = { en: "en-GB", fr: "fr-FR", es: "es-ES" } as const;

const MONTHS = {
  en: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sept", "Oct", "Nov", "Dec"],
  fr: [
    "janv.",
    "févr.",
    "mars",
    "avr.",
    "mai",
    "juin",
    "juil.",
    "août",
    "sept.",
    "oct.",
    "nov.",
    "déc.",
  ],
  es: ["ene", "feb", "mar", "abr", "may", "jun", "jul", "ago", "sept", "oct", "nov", "dic"],
} as const;

// Numbers the way each language writes them; French keeps a plain space as
// thousands separator (the design never shows narrow no-break spaces).
export function useFmt() {
  const { lang } = useLanding();
  const locale = LOCALES[lang];
  const num = (n: number, digits = 0) =>
    n
      .toLocaleString(locale, { maximumFractionDigits: digits, minimumFractionDigits: digits })
      .replace(/\u202f|\u00a0/g, " ");
  const money = (n: number, digits = 0) =>
    lang === "en" ? `€${num(n, digits)}` : `${num(n, digits)} €`;
  const pct = (n: number, digits = 0) =>
    lang === "en" ? `${num(n, digits)}%` : `${num(n, digits)} %`;
  // Fixed month names: the server's and the browser's Intl data disagree on
  // short months ("4 Sept" vs "4 Sep" in en-GB), which broke hydration.
  const day = (d: Date) => `${d.getDate()} ${MONTHS[lang][d.getMonth()]}`;
  return { num, money, pct, day, lang, locale };
}

// "Know who comes. And bring them back." → the accent part wears the gradient.
export function Accent({
  text,
  accent,
  className,
}: {
  text: string;
  accent: string;
  className?: string;
}) {
  const i = accent ? text.indexOf(accent) : -1;
  if (i < 0) return <>{text}</>;
  return (
    <>
      {text.slice(0, i)}
      <span className={cn("yc-accent", className)}>{accent}</span>
      {text.slice(i + accent.length)}
    </>
  );
}

// "**bold**" inside a copy line.
export function Rich({ text }: { text: string }) {
  return (
    <>
      {text.split(/(\*\*[^*]+\*\*)/).map((part, i) =>
        part.startsWith("**") ? (
          <b key={i} className="font-semibold">
            {part.slice(2, -2)}
          </b>
        ) : (
          <Fragment key={i}>{part}</Fragment>
        ),
      )}
    </>
  );
}

export function Eyebrow({
  children,
  night,
  className,
}: {
  children: ReactNode;
  night?: boolean;
  className?: string;
}) {
  return (
    <span className={cn("yc-chip", night && "yc-chip--night", className)}>
      <span className="size-1.5 rounded-full" style={{ background: "var(--gradient-brand)" }} />
      {children}
    </span>
  );
}

// Every CTA leads to the CRM signup funnel (/start?product=crm, the Claude Design
// "Inscription" screens). `cta` is the tracking id read by the delegated PostHog
// listener (src/lib/posthog-dom.ts).
export function CtaButton({
  children,
  cta = "signup_crm",
  role,
  size = "md",
  variant = "primary",
  ring = false,
  block = false,
  className,
}: {
  children: ReactNode;
  cta?: string;
  role?: SignupRole;
  size?: "sm" | "md" | "lg";
  variant?: "primary" | "dark" | "white";
  ring?: boolean;
  block?: boolean;
  className?: string;
}) {
  const { lang } = useLanding();
  return (
    <a
      href={crmStartHref(lang)}
      data-ph-cta={cta}
      data-ph-role={role}
      className={cn(
        "yc-btn has-disc no-underline",
        size === "sm" && "yc-btn--sm",
        size === "lg" && "yc-btn--lg",
        variant === "primary" && "yc-btn--primary",
        variant === "dark" && "yc-btn--dark",
        variant === "white" && "yc-btn--white",
        ring && "yc-btn--ring",
        block && "yc-btn--block",
        className,
      )}
    >
      <span>{children}</span>
      <span className="yc-btn__disc" aria-hidden>
        <ArrowRight strokeWidth={2.6} />
      </span>
    </a>
  );
}

// Scroll reveal of the design system: rises 18 px out of an 8 px blur.
export function Reveal({
  children,
  delay = 0,
  y = 18,
  className,
  style,
  amount = 0.25,
}: {
  children: ReactNode;
  delay?: number;
  y?: number;
  className?: string;
  style?: CSSProperties;
  amount?: number;
}) {
  return (
    <motion.div
      className={className}
      style={style}
      initial={{ opacity: 0, y, filter: "blur(8px)" }}
      whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      viewport={{ once: true, amount }}
      transition={{ duration: 0.8, ease: EASE, delay }}
    >
      {children}
    </motion.div>
  );
}

// Animated number: counts up the first time it enters the viewport.
export function Count({
  to,
  format,
  duration = 1.4,
  className,
  start = true,
}: {
  to: number;
  format: (n: number) => string;
  duration?: number;
  className?: string;
  start?: boolean;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  const reduce = useReducedMotion();
  const [v, setV] = useState(reduce ? to : 0);
  useEffect(() => {
    if (!inView || !start) return;
    if (reduce) {
      setV(to);
      return;
    }
    let raf = 0;
    const from = 0;
    const t0 = performance.now();
    const tick = (now: number) => {
      const p = Math.min(1, (now - t0) / (duration * 1000));
      const e = 1 - Math.pow(1 - p, 4);
      setV(from + (to - from) * e);
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, start, to, duration, reduce]);
  return (
    <span ref={ref} className={cn("yc-num", className)}>
      {format(v)}
    </span>
  );
}

export function Marquee({
  children,
  reverse,
  duration = 40,
  gap = 14,
  className,
}: {
  children: ReactNode;
  reverse?: boolean;
  duration?: number;
  gap?: number;
  className?: string;
}) {
  return (
    <div
      className={cn("yc-marquee", reverse && "yc-marquee--rev", className)}
      style={{ "--dur": `${duration}s`, "--gap": `${gap}px` } as CSSProperties}
    >
      <div className="yc-marquee__track">
        {children}
        <span aria-hidden className="contents">
          {children}
        </span>
      </div>
    </div>
  );
}

// The Yuno app icon + the "yuno" wordmark set in Bricolage 700 (the design's
// stand-in: never redraw the glass).
export function Wordmark({ className, size = 30 }: { className?: string; size?: number }) {
  return (
    <span className={cn("inline-flex items-center gap-2.5", className)}>
      <img
        src={appIcon}
        alt=""
        width={size}
        height={size}
        className="block rounded-[9px] shadow-[0_1px_2px_rgba(28,21,23,.12)]"
        style={{ width: size, height: size }}
        draggable={false}
      />
      <span className="font-yc-display text-[22px] font-bold leading-none tracking-[-0.03em] text-yc-ink">
        yuno
      </span>
    </span>
  );
}

export type YunitMood = "content" | "ravi" | "endormi" | "inquiet" | "surpris";

// The Yunit, mascot of the Yuno CRM currency (YunitFace of the design / the app):
// a brand-gradient disc with a pixel face cut out of a mask. Blinks now and then.
export function YunitFace({
  mood = "content",
  size = 48,
  blink = true,
}: {
  mood?: YunitMood;
  size?: number;
  blink?: boolean;
}) {
  const uid = useId().replace(/[^a-zA-Z0-9]/g, "");
  const reduce = useReducedMotion();
  const [closed, setClosed] = useState(false);

  useEffect(() => {
    if (!blink || reduce) return;
    let t1: ReturnType<typeof setTimeout>;
    let t2: ReturnType<typeof setTimeout>;
    const loop = () => {
      t1 = setTimeout(
        () => {
          setClosed(true);
          t2 = setTimeout(() => {
            setClosed(false);
            loop();
          }, 140);
        },
        2600 + Math.random() * 2600,
      );
    };
    loop();
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, [blink, reduce]);

  const tall = mood === "ravi";
  const y0 = tall ? 430 : 458;
  const h0 = tall ? 170 : 136;
  const eyeY = closed ? y0 + h0 / 2 - 8 : y0;
  const eyeH = closed ? 16 : h0;
  const mid = `ym${uid}`;

  return (
    <span
      className="block flex-none overflow-hidden rounded-full leading-none"
      style={{
        width: size,
        height: size,
        background: "linear-gradient(65deg,#E3141B 8%,#FF6B35 96%)",
      }}
    >
      <svg
        viewBox="38 38 1175 1175"
        width="100%"
        height="100%"
        aria-hidden="true"
        className="block"
      >
        <mask id={mid} maskUnits="userSpaceOnUse" x="0" y="0" width="1250" height="1250">
          <rect x="0" y="0" width="1250" height="1250" fill="#fff" />
          {mood === "content" && (
            <>
              <g fill="#000">
                <rect x="451" y={eyeY} width="110" height={eyeH} rx="12" />
                <rect x="692" y={eyeY} width="111" height={eyeH} rx="12" />
                <rect x="375" y="665" width="86" height="88" rx="12" />
                <rect x="787" y="665" width="90" height="88" rx="12" />
              </g>
              <path
                d="M455 722 C 540 790, 710 790, 795 722"
                fill="none"
                stroke="#000"
                strokeWidth="32"
              />
            </>
          )}
          {mood === "ravi" && (
            <g fill="#000">
              <rect x="451" y={eyeY} width="110" height={eyeH} rx="12" />
              <rect x="692" y={eyeY} width="111" height={eyeH} rx="12" />
              <rect x="410" y="662" width="430" height="150" rx="26" />
            </g>
          )}
          {mood === "endormi" && (
            <g fill="#000">
              <rect x="451" y="545" width="110" height="34" rx="10" />
              <rect x="692" y="545" width="111" height="34" rx="10" />
              <rect x="570" y="725" width="110" height="32" rx="10" />
            </g>
          )}
          {mood === "inquiet" && (
            <>
              <g fill="#000">
                <rect x="451" y={eyeY} width="110" height={eyeH} rx="12" />
                <rect x="692" y={eyeY} width="111" height={eyeH} rx="12" />
                <rect x="375" y="722" width="86" height="88" rx="12" />
                <rect x="787" y="722" width="90" height="88" rx="12" />
              </g>
              <path
                d="M455 764 C 540 687, 710 687, 795 764"
                fill="none"
                stroke="#000"
                strokeWidth="32"
              />
            </>
          )}
          {mood === "surpris" && (
            <g fill="#000">
              <rect x="451" y="440" width="110" height="150" rx="12" />
              <rect x="692" y="440" width="111" height="150" rx="12" />
              <rect x="570" y="690" width="110" height="120" rx="14" />
            </g>
          )}
        </mask>
        <g mask={`url(#${mid})`} fill="#fff" stroke="#fff" strokeWidth="22" strokeLinejoin="round">
          <rect x="471" y="273" width="313" height="78" />
          <rect x="329" y="369" width="595" height="113" />
          <rect x="211" y="499" width="831" height="246" />
          <rect x="325" y="763" width="602" height="100" />
          <rect x="466" y="879" width="320" height="74" />
          <rect x="471" y="340" width="313" height="40" />
          <rect x="329" y="470" width="595" height="40" />
          <rect x="325" y="735" width="602" height="40" />
          <rect x="466" y="851" width="320" height="40" />
        </g>
      </svg>
    </span>
  );
}

// Initials avatar with the design's warm tints.
export function Avatar({
  ini,
  tone = "warm",
  size = 34,
}: {
  ini: string;
  tone?: "hot" | "warm" | "new" | "cold";
  size?: number;
}) {
  const bg = {
    hot: "linear-gradient(135deg,#FFE1DF,#FFC4C0)",
    warm: "linear-gradient(135deg,#FFF0E6,#FFD9C2)",
    new: "linear-gradient(135deg,#F0EBEA,#E6DFDD)",
    cold: "linear-gradient(135deg,#F7F4F3,#E6DFDD)",
  }[tone];
  const fg = { hot: "#9D0B12", warm: "#9A4A1C", new: "#3D3437", cold: "#5E5457" }[tone];
  return (
    <span
      className="grid flex-none place-items-center rounded-full font-semibold"
      style={{
        width: size,
        height: size,
        background: bg,
        color: fg,
        fontSize: Math.round(size * 0.36),
      }}
    >
      {ini}
    </span>
  );
}

// Status pill: colour = status only (red to do, green done, grey waiting, amber warning).
export function StatusTag({
  tone,
  children,
  className,
}: {
  tone: "hot" | "warm" | "new" | "cold";
  children: ReactNode;
  className?: string;
}) {
  const s = {
    hot: "bg-yc-red-50 text-yc-red-700",
    warm: "bg-yc-amber-50 text-yc-amber-700",
    new: "bg-yc-green-50 text-yc-green-700",
    cold: "bg-yc-sand-100 text-yc-sand-600",
  }[tone];
  return (
    <span
      className={cn(
        "inline-flex h-6 items-center gap-1.5 whitespace-nowrap rounded-full px-2.5 text-[12px] font-semibold",
        s,
        className,
      )}
    >
      <span className="size-1.5 rounded-full bg-current" />
      {children}
    </span>
  );
}
