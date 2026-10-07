import { Fragment, useEffect, useLayoutEffect, useRef, useState, type CSSProperties } from "react";
import { AnimatePresence, motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import { Clock3, CreditCard, Lock, ShieldCheck } from "lucide-react";
import shotgunLogo from "@/assets/crm/shotgun-logo.webp";
import { useCrm } from "./content";
import { ConsoleHome } from "./Dashboard";
import { PhoneConsole } from "./PhoneConsole";
import { useIsPhone } from "./media";
import { Avatar, CtaButton, EASE, YunitFace } from "./ui";

// Opening sequence (≈1.4 s, CSS from the first paint, never blocks the page):
//   0.00 nav drops in (Nav.tsx) · aura blooms behind the fold
//   0.15 eyebrow chip
//   0.25 headline, word by word, out of a blur (accent word in the brand gradient)
//   0.40 sub (the LCP element: kept early) · 0.55 CTA springs in · 0.70 trust row
//   1.00 the live Console rises in a tilted frame, and flattens as you scroll
// The frame then plays like the reference's video: the Console tours itself
// (pauses on hover) while notifications pop on its edges.

const START = 0.25;

function Headline({ text, accent }: { text: string; accent: string }) {
  const a0 = text.indexOf(accent);
  const a1 = a0 + accent.length;
  let pos = 0;
  const words = text.split(" ").map((w) => {
    const start = pos;
    pos += w.length + 1;
    return { w, accent: a0 >= 0 && start >= a0 && start < a1 };
  });
  // Word by word out of a blur, in CSS (see .yc-rise in crm.css): visible from
  // the first paint, without waiting for the JavaScript.
  return (
    <h1 className="yc-display mx-auto max-w-[15ch] text-yc-ink md:max-w-[17ch]">
      {words.map((x, i) => (
        <Fragment key={i}>
          <span
            className={x.accent ? "yc-accent yc-rise inline-block" : "yc-rise inline-block"}
            style={rise(START + i * 0.045, "0.45em", "10px")}
          >
            {x.w}
          </span>
          {i < words.length - 1 ? " " : null}
        </Fragment>
      ))}
    </h1>
  );
}

// Inline variables of the CSS entrance (.yc-rise): delay, travel and blur.
function rise(d: number, y?: string, blur?: string, dur?: number): CSSProperties {
  return {
    "--d": `${d}s`,
    ...(y ? { "--rise-y": y } : {}),
    ...(blur ? { "--rise-blur": blur } : {}),
    ...(dur ? { "--dur": `${dur}s` } : {}),
  } as CSSProperties;
}

function Toasts({ run }: { run: boolean }) {
  const t = useCrm().hero.toasts;
  const [i, setI] = useState(-1);
  useEffect(() => {
    if (!run) return;
    let k = 0;
    const first = setTimeout(() => setI(0), 900);
    const iv = setInterval(() => {
      k = (k + 1) % t.length;
      setI(k);
    }, 3400);
    return () => {
      clearTimeout(first);
      clearInterval(iv);
    };
  }, [run, t.length]);
  const pos = ["right-[-28px] top-[18%]", "left-[-34px] top-[46%]", "right-[-22px] top-[70%]"];
  const icon = [
    <Avatar key="a" ini="CR" tone="hot" size={36} />,
    <YunitFace key="y" size={36} mood="content" blink={false} />,
    <span
      key="s"
      className="grid size-9 place-items-center rounded-full bg-yc-green-50 text-[15px] font-bold text-yc-green-700"
    >
      ▲
    </span>,
  ];
  return (
    <div className="pointer-events-none absolute inset-0 z-20 hidden lg:block">
      <AnimatePresence>
        {i >= 0 && (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 14, scale: 0.92, filter: "blur(6px)" }}
            animate={{ opacity: 1, y: 0, scale: 1, filter: "blur(0px)" }}
            exit={{ opacity: 0, y: -8, scale: 0.96, filter: "blur(4px)" }}
            transition={{ duration: 0.55, ease: EASE }}
            className={`absolute flex items-center gap-3 rounded-[18px] bg-white/95 py-2.5 pl-2.5 pr-4 shadow-[0_2px_4px_rgba(28,21,23,.06),0_22px_44px_-14px_rgba(28,21,23,.32)] ring-1 ring-yc-sand-200 backdrop-blur ${pos[i]}`}
          >
            {icon[i]}
            <span className="flex flex-col">
              <span className="text-[14px] font-semibold leading-[18px] text-yc-ink">
                {t[i].title}
              </span>
              <span className="text-[12.5px] leading-4 text-yc-sand-500">{t[i].sub}</span>
            </span>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// The Console rendered at its design width, scaled to the frame, touring itself.
function LiveConsole({ start }: { start: boolean }) {
  const box = useRef<HTMLDivElement>(null);
  const [wide, setWide] = useState(true);
  const [scale, setScale] = useState(0.6);
  const cw = wide ? 1440 : 1176;
  const visible = wide ? 860 : 1180;

  useLayoutEffect(() => {
    const el = box.current;
    if (!el) return;
    const measure = () => {
      const w = el.clientWidth;
      const isWide = w >= 720;
      setWide(isWide);
      setScale(w / (isWide ? 1440 : 1176));
    };
    const ro = new ResizeObserver(measure);
    ro.observe(el);
    measure();
    return () => ro.disconnect();
  }, []);

  return (
    <div
      ref={box}
      className="relative overflow-hidden"
      style={{ aspectRatio: `${cw} / ${visible}` }}
    >
      <div style={{ width: cw, transform: `scale(${scale})`, transformOrigin: "0 0" }}>
        <ConsoleHome start={start} sidebar={wide} height={visible} tour={start} />
      </div>
    </div>
  );
}

export function CrmHero() {
  const h = useCrm().hero;
  const reduce = useReducedMotion();
  const frameRef = useRef<HTMLDivElement>(null);
  const [started, setStarted] = useState(false);
  // Phones get the Console laid out at phone width (PhoneConsole); both are in
  // the server HTML, the one not shown never mounts its live content.
  const phone = useIsPhone();

  // The frame flattens as it reaches the middle of the screen.
  const { scrollYProgress } = useScroll({ target: frameRef, offset: ["start end", "start 0.25"] });
  const rotateX = useTransform(scrollYProgress, [0, 1], [reduce ? 0 : 20, 0]);
  const scale = useTransform(scrollYProgress, [0, 1], [reduce ? 1 : 0.9, 1]);
  const glow = useTransform(scrollYProgress, [0, 1], [0.55, 1]);

  useEffect(() => {
    const t = setTimeout(() => setStarted(true), reduce ? 0 : 1500);
    return () => clearTimeout(t);
  }, [reduce]);

  return (
    <section
      data-ph-section="hero"
      className="relative isolate overflow-x-clip pb-6 pt-8 sm:pb-10 sm:pt-16 md:pt-20"
    >
      {/* aura blooming behind the fold, like the reference's pink glow */}
      <motion.div
        aria-hidden
        initial={{ opacity: 0, scale: 0.7 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.6, ease: EASE }}
        className="pointer-events-none absolute left-1/2 top-[380px] -z-10 h-[900px] w-[1300px] -translate-x-1/2 rounded-full"
        style={{
          background:
            "radial-gradient(closest-side, rgba(255,107,53,.22), rgba(227,20,27,.12) 45%, rgba(255,255,255,0) 72%)",
          filter: "blur(10px)",
        }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 opacity-60"
        style={{ background: "var(--noise)" }}
      />

      <div className="relative mx-auto max-w-[1180px] px-4 text-center sm:px-6">
        <div
          style={rise(0.15, "10px", "6px", 0.7)}
          className="yc-rise mb-5 inline-flex max-w-full items-center gap-2 whitespace-nowrap rounded-full border border-yc-sand-200 bg-white/90 py-1 pl-1 pr-3 text-[12.5px] font-semibold text-yc-sand-700 shadow-[var(--shadow-xs)] backdrop-blur sm:mb-6 sm:pr-3.5 sm:text-[13.5px]"
        >
          <span className="inline-flex h-[26px] flex-none items-center rounded-full bg-yc-ink px-2.5 text-[12px] font-semibold text-white">
            {h.eyebrowTag}
          </span>
          <img src={shotgunLogo} alt="" className="size-[18px] rounded-[5px]" />
          {h.eyebrow}
        </div>

        <Headline text={h.title} accent={h.accent} />

        <p style={rise(0.4)} className="yc-rise yc-lead mx-auto mt-6 max-w-[40rem]">
          {h.sub}
        </p>

        <div style={rise(0.55)} className="yc-pop relative z-10 mt-9 flex justify-center">
          <CtaButton size="lg" ring cta="hero_crm">
            {h.cta}
          </CtaButton>
        </div>

        <ul
          style={rise(0.7, "8px", "0px", 0.7)}
          className="yc-rise mx-auto mt-7 grid max-w-[24rem] grid-cols-3 text-[12.5px] font-medium leading-[1.3] text-yc-sand-700 sm:mt-8 sm:flex sm:max-w-none sm:flex-wrap sm:items-center sm:justify-center sm:gap-y-2 sm:text-[14.5px] sm:leading-normal"
        >
          {h.trust.map((t, i) => {
            const Icon = [ShieldCheck, Clock3, CreditCard][i] ?? ShieldCheck;
            return (
              <li
                key={t}
                className={
                  i > 0
                    ? "flex items-start justify-center border-l border-yc-sand-200 sm:items-center sm:border-0"
                    : "flex items-start justify-center sm:items-center"
                }
              >
                {i > 0 && (
                  <span aria-hidden className="mx-4 hidden h-5 w-px bg-yc-sand-200 sm:block" />
                )}
                <span className="flex flex-col items-center gap-1.5 px-2 text-center sm:inline-flex sm:flex-row sm:gap-2 sm:px-0 sm:text-left">
                  <Icon
                    className={
                      i === 0 ? "size-[17px] text-yc-green-500" : "size-[17px] text-yc-sand-500"
                    }
                    strokeWidth={2.2}
                  />
                  {t}
                </span>
              </li>
            );
          })}
        </ul>
      </div>

      {/* Phone: the Console at phone width */}
      <motion.div
        initial={reduce ? false : { opacity: 0, y: 80 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.1, ease: EASE, delay: 1.0 }}
        className="relative mt-10 px-4 sm:hidden"
      >
        {phone !== false && <PhoneConsole start={started} />}
      </motion.div>

      {/* Live product frame */}
      <div
        className="relative mx-auto mt-14 hidden max-w-[1220px] px-3 sm:mt-16 sm:block sm:px-6"
        style={{ perspective: 1600 }}
      >
        <motion.div
          ref={frameRef}
          initial={reduce ? false : { opacity: 0, y: 120 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, ease: EASE, delay: 1.0 }}
          style={{ rotateX, scale, transformOrigin: "50% 0%" }}
          className="relative"
        >
          <motion.div
            aria-hidden
            style={{ opacity: glow }}
            className="pointer-events-none absolute -inset-x-10 -bottom-16 top-24 -z-10 rounded-[60px]"
          >
            <div
              className="size-full rounded-[60px]"
              style={{
                background:
                  "radial-gradient(60% 55% at 50% 60%, rgba(227,20,27,.30), rgba(255,107,53,.12) 50%, transparent 75%)",
                filter: "blur(24px)",
              }}
            />
          </motion.div>
          <div
            className="yc-frame group relative ring-1 ring-yc-sand-200"
            style={{
              boxShadow: "0 2px 4px rgba(28,21,23,.04), 0 40px 90px -30px rgba(157,11,18,.35)",
            }}
          >
            <div className="flex h-11 items-center gap-3 border-b border-yc-sand-100 bg-white px-4">
              <span className="flex gap-1.5">
                <i className="size-2.5 rounded-full bg-yc-sand-200" />
                <i className="size-2.5 rounded-full bg-yc-sand-200" />
                <i className="size-2.5 rounded-full bg-yc-sand-200" />
              </span>
              <span className="mx-auto flex h-7 items-center gap-1.5 rounded-full bg-yc-sand-50 px-3 font-yc-mono text-[11.5px] text-yc-sand-500">
                <Lock className="size-3" />
                {h.frameUrl}
              </span>
              <span className="hidden items-center gap-1.5 rounded-full bg-yc-ink px-2.5 py-1 text-[11.5px] font-semibold text-white sm:inline-flex">
                <span className="yc-live size-1.5 rounded-full bg-yc-red-400" />
                {h.live}
              </span>
            </div>
            {phone !== true && <LiveConsole start={started} />}
          </div>
          <Toasts run={started} />
        </motion.div>
      </div>
    </section>
  );
}
