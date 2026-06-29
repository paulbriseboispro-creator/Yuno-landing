"use client";
import { Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import {
  motion,
  useScroll,
  useTransform,
  useSpring,
  type MotionValue,
} from "motion/react";
import { useRef } from "react";
import { useBde } from "@/content/bde";

import eventFlyer from "@/assets/bde/event-flyer.png";
import soldout from "@/assets/bde/soldout.png";
import agenda from "@/assets/bde/agenda.png";
import guestlist from "@/assets/bde/guestlist.png";
import tickets from "@/assets/bde/tickets.png";

// Portrait phone screens of the public Yuno design. Two rows drift in opposite
// directions on scroll, tilting in 3D — the same scroll-parallax feel as the
// main landing's hero, but in phone format because Yuno is used on a phone and
// these are the screens a BDE's guests actually see.
const rowOne = [eventFlyer, soldout, agenda, guestlist, tickets];
const rowTwo = [agenda, guestlist, tickets, eventFlyer, soldout];

function PhoneCard({
  src,
  translate,
}: {
  src: string;
  translate: MotionValue<number>;
}) {
  return (
    <motion.div
      style={{ x: translate }}
      whileHover={{ y: -16 }}
      className="group/phone relative h-[24rem] w-[13.5rem] shrink-0 md:h-[26rem] md:w-[14.5rem]"
    >
      <img
        src={src}
        alt=""
        aria-hidden
        loading="lazy"
        className="absolute inset-0 h-full w-full rounded-[1.6rem] object-cover object-top ring-1 ring-white/10 shadow-2xl"
      />
      <div className="pointer-events-none absolute inset-0 rounded-[1.6rem] ring-1 ring-inset ring-white/5" />
    </motion.div>
  );
}

function HeroHeader() {
  const t = useBde();
  return (
    <div className="pointer-events-none absolute inset-x-0 top-0 z-20 mx-auto w-full max-w-3xl px-6 pt-16 text-center md:pt-24">
      <span className="pointer-events-auto mb-6 inline-block rounded-full border border-accent/40 bg-background/40 px-3 py-1 text-xs font-medium uppercase tracking-[0.18em] text-accent backdrop-blur-sm">
        {t.hero.badge}
      </span>
      <h1 className="text-balance text-4xl font-medium leading-[1.06] tracking-tight md:text-6xl">
        {t.hero.titleLead}
        <span className="serif italic text-muted-foreground">{t.hero.titleEmphasis}</span>
        {t.hero.titleRest}
      </h1>
      <p className="mx-auto mt-6 max-w-[52ch] text-pretty text-base text-muted-foreground md:text-lg">
        {t.hero.subtitle}
      </p>
      <div className="pointer-events-auto mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row">
        <Link
          to="/contact"
          className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90 sm:w-auto"
        >
          {t.hero.primaryCta} <ArrowRight className="size-4" />
        </Link>
        <a
          href="#gratuit"
          className="inline-flex w-full items-center justify-center rounded-full bg-background/60 px-6 py-3 text-sm font-medium ring-1 ring-border backdrop-blur-sm transition-colors hover:bg-surface sm:w-auto"
        >
          {t.hero.secondaryCta}
        </a>
      </div>
      <p className="mt-5 text-xs text-muted-foreground">{t.hero.note}</p>
    </div>
  );
}

export function BdePhoneParallax() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const spring = { stiffness: 300, damping: 30, bounce: 100 };

  const translateX = useSpring(useTransform(scrollYProgress, [0, 1], [0, 320]), spring);
  const translateXReverse = useSpring(useTransform(scrollYProgress, [0, 1], [0, -320]), spring);
  const rotateX = useSpring(useTransform(scrollYProgress, [0, 0.2], [12, 0]), spring);
  const rotateZ = useSpring(useTransform(scrollYProgress, [0, 0.2], [8, 0]), spring);
  const translateY = useSpring(useTransform(scrollYProgress, [0, 0.3], [40, -80]), spring);
  const opacity = useSpring(useTransform(scrollYProgress, [0, 0.2], [0.4, 1]), spring);

  return (
    <div
      ref={ref}
      id="top"
      className="relative flex h-[150vh] flex-col overflow-hidden [perspective:1000px] [transform-style:preserve-3d]"
    >
      <HeroHeader />

      {/* Fade so the hero text stays readable over the top of the cards */}
      <div className="pointer-events-none absolute inset-x-0 top-0 z-10 h-[60vh] bg-gradient-to-b from-background via-background/85 to-transparent" />

      <motion.div
        style={{ rotateX, rotateZ, translateY, opacity }}
        className="mt-[58vh] flex flex-col gap-6 md:gap-8"
      >
        <motion.div className="flex flex-row-reverse justify-center gap-6 md:gap-8">
          {rowOne.map((src, i) => (
            <PhoneCard key={`r1-${i}`} src={src} translate={translateX} />
          ))}
        </motion.div>
        <motion.div className="flex flex-row justify-center gap-6 md:gap-8">
          {rowTwo.map((src, i) => (
            <PhoneCard key={`r2-${i}`} src={src} translate={translateXReverse} />
          ))}
        </motion.div>
      </motion.div>
    </div>
  );
}
