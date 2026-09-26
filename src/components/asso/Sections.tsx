import {
  BadgeCheck,
  Check,
  Handshake,
  Landmark,
  Lock,
  Mail,
  ScanLine,
  Ticket,
  UserRoundCheck,
  Users,
  type LucideIcon,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { CountUp } from "@/components/landing/Stats";
import { BrowserFrame } from "@/components/landing/Frame";
import { Eyebrow, FadeIn, PrimaryCta, SectionHeader } from "@/components/landing/ui";
import dashboard from "@/assets/asso/dashboard.webp";
import { useAsso } from "./content";

// Four numbers right under the hero: what it costs the association, what the
// student pays, and how fast both sides get going.
export function AssoStats() {
  const items = useAsso().stats.items;
  return (
    <section data-ph-section="stats" className="px-4 pb-6 sm:px-6">
      <FadeIn className="mx-auto max-w-6xl">
        <div className="grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-zinc-200/70 bg-zinc-200/70 lg:grid-cols-4">
          {items.map((it, i) => (
            <div key={it.label} className="bg-white p-4 sm:p-6">
              <CountUp
                value={it.value}
                className={cn(
                  "yl-h3 block text-[26px] tabular-nums sm:text-3xl md:text-[34px]",
                  i === 1 ? "text-[var(--yuno-red)]" : "text-zinc-950",
                )}
              />
              <span className="mt-1 block text-[14px] font-semibold tracking-tight text-zinc-900">
                {it.label}
              </span>
              <span className="mt-1 block text-[13px] leading-snug text-zinc-500">{it.body}</span>
            </div>
          ))}
        </div>
      </FadeIn>
    </section>
  );
}

const FEATURE_ICONS: Record<string, { Icon: LucideIcon; bg: string; fg: string }> = {
  tickets: { Icon: Ticket, bg: "#E8192C1f", fg: "#E8192C" },
  guests: { Icon: Users, bg: "#4F46E51f", fg: "#4F46E5" },
  private: { Icon: Lock, bg: "#0F172A14", fg: "var(--color-zinc-900)" },
  door: { Icon: ScanLine, bg: "#0596691f", fg: "#059669" },
  money: { Icon: Landmark, bg: "#635BFF1f", fg: "#635BFF" },
  club: { Icon: Handshake, bg: "#F973161f", fg: "#F97316" },
  mail: { Icon: Mail, bg: "#0284C71f", fg: "#0284C7" },
  team: { Icon: UserRoundCheck, bg: "#DB27771f", fg: "#DB2777" },
};

export function AssoFeatures() {
  const f = useAsso().features;
  return (
    <section
      data-ph-section="features"
      id="features"
      className="relative scroll-mt-20 px-4 py-16 sm:px-6 sm:py-24 md:py-32"
    >
      <SectionHeader eyebrow={f.eyebrow} title={f.title} sub={f.sub} className="max-w-3xl" />
      <div className="mx-auto mt-10 grid max-w-6xl grid-cols-1 gap-3 sm:mt-14 sm:grid-cols-2 lg:grid-cols-4">
        {f.items.map((it, i) => {
          const ic = FEATURE_ICONS[it.id] ?? FEATURE_ICONS.tickets;
          return (
            <FadeIn key={it.id} delay={(i % 4) * 0.05} y={12}>
              <div className="yl-card group h-full p-5 transition-shadow hover:shadow-[0_1px_2px_rgba(10,10,11,0.04),0_18px_40px_-20px_rgba(10,10,11,0.22)] md:p-6">
                <span
                  className="flex size-10 items-center justify-center rounded-xl transition-transform duration-300 group-hover:-translate-y-0.5"
                  style={{ background: ic.bg }}
                >
                  <ic.Icon className="size-[18px]" style={{ color: ic.fg }} strokeWidth={2.2} />
                </span>
                <h3 className="mt-4 text-[15.5px] font-semibold tracking-tight text-zinc-950">
                  {it.title}
                </h3>
                <p className="mt-1.5 text-pretty text-[13.5px] leading-relaxed text-zinc-500">
                  {it.body}
                </p>
              </div>
            </FadeIn>
          );
        })}
      </div>
    </section>
  );
}

// The edge no ticketing tool has: the association × club deal, signed before
// the night and settled by both sides after it.
export function AssoClub() {
  const cl = useAsso().club;
  const card = cl.card;
  return (
    <section
      data-ph-section="club"
      id="club"
      className="relative scroll-mt-20 bg-zinc-50 px-4 py-16 sm:px-6 sm:py-24 md:py-32"
    >
      <div className="mx-auto grid max-w-6xl items-center gap-12 lg:grid-cols-2 lg:gap-20">
        <FadeIn>
          <Eyebrow>{cl.eyebrow}</Eyebrow>
          <h2 className="yl-h2 mt-4 text-balance">{cl.title}</h2>
          <p className="mt-4 max-w-lg text-pretty text-[15px] leading-relaxed text-zinc-500 md:text-base">
            {cl.body}
          </p>
          <ul className="mt-7 space-y-3">
            {cl.bullets.map((b) => (
              <li key={b} className="flex items-start gap-3 text-[14.5px] text-zinc-800">
                <span className="mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-full bg-zinc-950 text-white">
                  <Check className="size-3" strokeWidth={3} />
                </span>
                {b}
              </li>
            ))}
          </ul>
          <div className="mt-8">
            <PrimaryCta>{cl.cta}</PrimaryCta>
          </div>
        </FadeIn>

        <FadeIn delay={0.1} className="relative">
          <div
            aria-hidden
            className="absolute -inset-10 -z-10 rounded-[3rem] bg-[radial-gradient(closest-side,rgba(249,115,22,0.12),transparent)]"
          />
          <div className="yl-card mx-auto max-w-md p-6 md:p-7">
            <div className="flex items-center justify-between gap-3">
              <div className="flex items-center gap-3">
                <span className="flex size-10 items-center justify-center rounded-xl bg-[#F973161f]">
                  <Handshake className="size-[18px] text-[#F97316]" />
                </span>
                <span className="text-[15px] font-semibold tracking-tight text-zinc-950">
                  {card.title}
                </span>
              </div>
              <span className="inline-flex items-center gap-1 rounded-full bg-emerald-50 px-2.5 py-1 text-[12px] font-semibold text-emerald-700">
                <BadgeCheck className="size-3.5" />
                {card.status}
              </span>
            </div>
            <ul className="mt-5 divide-y divide-zinc-100 rounded-2xl border border-zinc-100">
              {card.rows.map((r) => (
                <li
                  key={r.label}
                  className="flex items-center justify-between gap-4 px-4 py-3 text-[13.5px]"
                >
                  <span className="text-zinc-500">{r.label}</span>
                  <span className="text-right font-semibold text-zinc-900">{r.value}</span>
                </li>
              ))}
            </ul>
            <div className="yl-keep yl-edge mt-5 rounded-2xl bg-zinc-950 p-4 text-white">
              <p className="text-[13.5px] font-semibold">{card.closing}</p>
              <p className="mt-0.5 text-[12px] text-zinc-400">{card.closingMeta}</p>
              <div className="mt-3 flex gap-2">
                {[card.party, card.venue].map((who) => (
                  <span
                    key={who}
                    className="inline-flex items-center gap-1.5 rounded-full bg-white/10 px-2.5 py-1 text-[12px] font-medium"
                  >
                    <Check className="size-3.5 text-emerald-400" strokeWidth={3} />
                    {who}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}

export function AssoHow() {
  const c = useAsso();
  const h = c.how;
  return (
    <section
      data-ph-section="how"
      id="how"
      className="relative scroll-mt-20 px-4 py-16 sm:px-6 sm:py-24 md:py-32"
    >
      <SectionHeader eyebrow={h.eyebrow} title={h.title} sub={h.sub} />
      <ol className="mx-auto mt-10 grid max-w-6xl grid-cols-1 gap-3 sm:mt-14 sm:grid-cols-2 lg:grid-cols-4">
        {h.steps.map((st, i) => (
          <li key={st.title}>
            <FadeIn
              delay={i * 0.06}
              y={12}
              className="yl-card relative h-full overflow-hidden p-5 md:p-6"
            >
              <span className="yl-h3 block text-[44px] leading-none text-zinc-100">{i + 1}</span>
              <h3 className="mt-3 text-[15.5px] font-semibold tracking-tight text-zinc-950">
                {st.title}
              </h3>
              <p className="mt-1.5 text-pretty text-[13.5px] leading-relaxed text-zinc-500">
                {st.body}
              </p>
            </FadeIn>
          </li>
        ))}
      </ol>
      <FadeIn className="mt-10 flex justify-center">
        <PrimaryCta size="lg">{c.nav.cta}</PrimaryCta>
      </FadeIn>
    </section>
  );
}

export function AssoShowcase() {
  const s = useAsso().showcase;
  return (
    <section data-ph-section="showcase" className="relative px-4 pb-16 sm:px-6 sm:pb-24 md:pb-32">
      <SectionHeader eyebrow={s.eyebrow} title={s.title} sub={s.sub} className="max-w-3xl" />
      <FadeIn className="mx-auto mt-10 max-w-5xl sm:mt-14">
        <BrowserFrame url={s.url}>
          <img
            src={dashboard}
            alt={s.alt}
            width={1400}
            height={960}
            loading="lazy"
            decoding="async"
            className="block h-auto w-full"
          />
        </BrowserFrame>
      </FadeIn>
    </section>
  );
}
