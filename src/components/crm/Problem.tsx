import { useRef } from "react";
import { motion, useReducedMotion, useScroll, useTransform, type MotionValue } from "motion/react";
import { useCrm } from "./content";
import { TicketingPhone } from "./Phone";
import { Eyebrow, Reveal } from "./ui";

// "Your next regular has already come 3 times." The headline lights up word by
// word as you read it (the design's data-words), then the reference's phone
// rises with two cards sliding out from behind it.

function Word({
  children,
  progress,
  range,
  accent,
}: {
  children: string;
  progress: MotionValue<number>;
  range: [number, number];
  accent: boolean;
}) {
  const opacity = useTransform(progress, range, [0.14, 1]);
  return (
    <motion.span style={{ opacity }} className={accent ? "yc-accent" : undefined}>
      {children}
    </motion.span>
  );
}

export function ScrollWords({
  text,
  accent,
  className,
}: {
  text: string;
  accent: string;
  className?: string;
}) {
  const ref = useRef<HTMLHeadingElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 0.88", "start 0.3"] });
  const a0 = text.indexOf(accent);
  const a1 = a0 + accent.length;
  let pos = 0;
  const words = text.split(" ").map((w) => {
    const start = pos;
    pos += w.length + 1;
    return { w, accent: a0 >= 0 && start >= a0 && start < a1 };
  });
  const n = words.length;
  return (
    <h2 ref={ref} className={className}>
      {words.map((x, i) =>
        reduce ? (
          <span key={i} className={x.accent ? "yc-accent" : undefined}>
            {x.w}{" "}
          </span>
        ) : (
          <span key={i}>
            <Word
              progress={scrollYProgress}
              range={[(i / n) * 0.85, (i / n) * 0.85 + 0.15]}
              accent={x.accent}
            >
              {x.w}
            </Word>{" "}
          </span>
        ),
      )}
    </h2>
  );
}

export function CrmProblem() {
  const p = useCrm().problem;
  const stage = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: stage, offset: ["start end", "center 0.55"] });
  const leftX = useTransform(scrollYProgress, [0.25, 1], [reduce ? 0 : 150, 0]);
  const rightX = useTransform(scrollYProgress, [0.25, 1], [reduce ? 0 : -150, 0]);
  const cardOpacity = useTransform(scrollYProgress, [0.2, 0.6], [reduce ? 1 : 0, 1]);
  const leftR = useTransform(scrollYProgress, [0.25, 1], [reduce ? 0 : 6, -2]);
  const rightR = useTransform(scrollYProgress, [0.25, 1], [reduce ? 0 : -6, 2]);
  const phoneY = useTransform(scrollYProgress, [0, 1], [reduce ? 0 : 90, 0]);
  const phoneR = useTransform(scrollYProgress, [0, 1], [reduce ? -6 : 2, -6]);

  return (
    <section data-ph-section="problem" className="relative z-10 px-4 pt-10 sm:px-6 sm:pt-16">
      <div className="mx-auto max-w-[960px] text-center">
        <Reveal>
          <Eyebrow>{p.eyebrow}</Eyebrow>
        </Reveal>
        <ScrollWords
          text={p.title}
          accent={p.accent}
          className="yc-h2 mx-auto mt-5 max-w-[19ch] text-yc-ink"
        />
        <Reveal delay={0.1}>
          <p className="yc-lead mx-auto mt-5 max-w-[36rem]">{p.sub}</p>
        </Reveal>
      </div>

      <div
        ref={stage}
        className="relative mx-auto mt-10 flex max-w-[860px] justify-center sm:mt-16"
      >
        <motion.div
          style={{ y: phoneY, rotate: phoneR }}
          className="relative z-10 -mb-40 sm:-mb-48"
        >
          <TicketingPhone className="w-[228px] sm:w-[280px]" />
        </motion.div>
        {p.cards.map((c, i) => (
          <motion.div
            key={c.title}
            style={{
              x: i === 0 ? leftX : rightX,
              rotate: i === 0 ? leftR : rightR,
              opacity: cardOpacity,
            }}
            className={
              "absolute top-[72px] z-20 hidden w-[290px] rounded-[18px] border border-yc-sand-200 bg-white p-6 text-center shadow-[0_2px_4px_rgba(28,21,23,.05),0_24px_50px_-20px_rgba(28,21,23,.28)] md:block " +
              (i === 0 ? "left-0 lg:-left-6" : "right-0 lg:-right-6")
            }
          >
            <span className="yc-h3 block text-[25px] text-yc-ink">{c.title}</span>
            <span className="mt-3 block text-[14.5px] leading-[1.6] text-yc-sand-600">
              {c.body}
            </span>
          </motion.div>
        ))}
      </div>

      {/* Mobile: the two cards under the phone */}
      <div className="relative z-20 mx-auto mt-44 grid max-w-md gap-2.5 sm:mt-48 md:hidden">
        {p.cards.map((c, i) => (
          <Reveal
            key={c.title}
            delay={i * 0.06}
            className="flex gap-3.5 rounded-[20px] border border-yc-sand-200 bg-white p-5 text-left shadow-[var(--shadow-sm)]"
          >
            <span className="grid size-7 flex-none place-items-center rounded-full bg-yc-red-50 font-yc-mono text-[11.5px] font-medium text-yc-red-700">
              {i + 1}
            </span>
            <span className="flex flex-col">
              <span className="yc-h3 block text-[19px]">{c.title}</span>
              <span className="mt-1.5 block text-[14px] leading-[1.55] text-yc-sand-600">
                {c.body}
              </span>
            </span>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
