import { Fragment, useEffect, useLayoutEffect, useRef, useState, type CSSProperties } from "react";
import {
  AnimatePresence,
  motion,
  useMotionValue,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from "motion/react";
import { Clock3, CreditCard, Lock, ShieldCheck } from "lucide-react";
import yunitStack from "@/assets/crm/yunit-stack.webp";
import yunitCoin from "@/assets/crm/yunit-coin.webp";
import shotgunLogo from "@/assets/crm/shotgun-logo.webp";
import { useCrm } from "./content";
import { ConsoleHome } from "./Dashboard";
import { Avatar, CtaButton, EASE, YunitFace } from "./ui";

// Opening sequence (≈1.4 s, never blocks the page):
//   0.00 nav drops in (Nav.tsx) · aura blooms behind the fold
//   0.15 eyebrow chip
//   0.25 headline, word by word, out of a blur (accent word in the brand gradient)
//   0.75 sub · 0.90 CTA springs in with its glow · 1.05 trust row
//   0.65 / 0.85 the two Yunit coins pop in, then float and follow the pointer
//   1.00 the live Console rises in a tilted frame, and flattens as you scroll
// The frame then plays like the reference's video: the Console tours itself
// (pauses on hover) while notifications pop on its edges.

const START = 0.25;

function Headline({ text, accent }: { text: string; accent: string }) {
  const reduce = useReducedMotion();
  const a0 = text.indexOf(accent);
  const a1 = a0 + accent.length;
  let pos = 0;
  const words = text.split(" ").map((w) => {
    const start = pos;
    pos += w.length + 1;
    return { w, accent: a0 >= 0 && start >= a0 && start < a1 };
  });
  return (
    <h1 className="yc-display mx-auto max-w-[15ch] text-yc-ink md:max-w-[17ch]">
      {words.map((x, i) => (
        <Fragment key={i}>
          <motion.span
            className={x.accent ? "yc-accent inline-block" : "inline-block"}
            initial={reduce ? false : { opacity: 0, y: "0.45em", filter: "blur(10px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            transition={{ duration: 0.8, ease: EASE, delay: START + i * 0.045 }}
          >
            {x.w}
          </motion.span>
          {i < words.length - 1 ? " " : null}
        </Fragment>
      ))}
    </h1>
  );
}

function Sticker({
  src,
  className,
  rotate,
  delay,
  depth,
  mx,
  my,
}: {
  src: string;
  className: string;
  rotate: number;
  delay: number;
  depth: number;
  mx: ReturnType<typeof useSpring>;
  my: ReturnType<typeof useSpring>;
}) {
  const x = useTransform(mx, (v) => v * depth);
  const y = useTransform(my, (v) => v * depth);
  return (
    <motion.div
      aria-hidden
      className={`pointer-events-none absolute hidden md:block ${className}`}
      style={{ x, y }}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.4, rotate: rotate - 28 }}
        animate={{ opacity: 1, scale: 1, rotate }}
        transition={{ type: "spring", stiffness: 160, damping: 14, delay }}
      >
        <div
          className="yc-float"
          style={{ "--r": "0deg", "--fd": `${5.5 + depth}s` } as CSSProperties}
        >
          <img
            src={src}
            alt=""
            className="w-full select-none drop-shadow-[0_24px_30px_rgba(157,11,18,.28)]"
            draggable={false}
          />
        </div>
      </motion.div>
    </motion.div>
  );
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

  // Pointer parallax for the coins.
  const px = useMotionValue(0);
  const py = useMotionValue(0);
  const mx = useSpring(px, { stiffness: 60, damping: 18 });
  const my = useSpring(py, { stiffness: 60, damping: 18 });
  useEffect(() => {
    if (reduce) return;
    const onMove = (e: PointerEvent) => {
      px.set((e.clientX / window.innerWidth - 0.5) * -24);
      py.set((e.clientY / window.innerHeight - 0.5) * -18);
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    return () => window.removeEventListener("pointermove", onMove);
  }, [px, py, reduce]);

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
      className="relative isolate overflow-x-clip pb-10 pt-12 sm:pt-16 md:pt-20"
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
        <Sticker
          src={yunitStack}
          className="-left-2 top-[92px] w-[150px] lg:left-[2%] lg:w-[178px] xl:left-[5%]"
          rotate={-10}
          delay={0.65}
          depth={1.1}
          mx={mx}
          my={my}
        />
        <Sticker
          src={yunitCoin}
          className="right-0 top-[150px] w-[112px] lg:right-[4%] lg:w-[132px] xl:right-[7%]"
          rotate={14}
          delay={0.85}
          depth={0.7}
          mx={mx}
          my={my}
        />

        <motion.div
          initial={reduce ? false : { opacity: 0, y: 10, filter: "blur(6px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{ duration: 0.7, ease: EASE, delay: 0.15 }}
          className="mb-6 inline-flex items-center gap-2 rounded-full border border-yc-sand-200 bg-white/90 py-1 pl-1 pr-3.5 text-[13.5px] font-semibold text-yc-sand-700 shadow-[var(--shadow-xs)] backdrop-blur"
        >
          <span className="inline-flex h-[26px] items-center rounded-full bg-yc-ink px-2.5 text-[12px] font-semibold text-white">
            {h.eyebrowTag}
          </span>
          <img src={shotgunLogo} alt="" className="size-[18px] rounded-[5px]" />
          {h.eyebrow}
        </motion.div>

        <Headline text={h.title} accent={h.accent} />

        <motion.p
          initial={reduce ? false : { opacity: 0, y: 14, filter: "blur(6px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{ duration: 0.8, ease: EASE, delay: 0.75 }}
          className="yc-lead mx-auto mt-6 max-w-[40rem]"
        >
          {h.sub}
        </motion.p>

        <motion.div
          initial={reduce ? false : { opacity: 0, scale: 0.94, y: 8 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ type: "spring", stiffness: 260, damping: 20, delay: 0.9 }}
          className="relative z-10 mt-9 flex justify-center"
        >
          <CtaButton size="lg" ring cta="hero_crm">
            {h.cta}
          </CtaButton>
        </motion.div>

        <motion.ul
          initial={reduce ? false : { opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: EASE, delay: 1.05 }}
          className="mt-8 flex flex-wrap items-center justify-center gap-x-0 gap-y-2 text-[14.5px] font-medium text-yc-sand-700"
        >
          {h.trust.map((t, i) => {
            const Icon = [ShieldCheck, Clock3, CreditCard][i] ?? ShieldCheck;
            return (
              <li key={t} className="flex items-center">
                {i > 0 && (
                  <span aria-hidden className="mx-4 hidden h-5 w-px bg-yc-sand-200 sm:block" />
                )}
                <span className="inline-flex items-center gap-2 px-2 sm:px-0">
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
        </motion.ul>
      </div>

      {/* Live product frame */}
      <div
        className="relative mx-auto mt-14 max-w-[1220px] px-3 sm:mt-16 sm:px-6"
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
            <LiveConsole start={started} />
          </div>
          <Toasts run={started} />
        </motion.div>
      </div>
    </section>
  );
}
