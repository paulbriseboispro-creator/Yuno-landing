import {
  BarChart3,
  Filter,
  Mail,
  Megaphone,
  ShieldCheck,
  UserRoundCheck,
  Users,
  Zap,
  type LucideIcon,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { CountUp } from "@/components/landing/Stats";
import { FadeIn, SectionHeader } from "@/components/landing/ui";
import { useCrm } from "./content";

// Four facts under the hero: what it takes to connect, the trial, what
// changes on the ticketing (nothing), the languages.
export function CrmStats() {
  const items = useCrm().stats.items;
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

// Three steps, from the token to the first email.
export function CrmHow() {
  const h = useCrm().how;
  return (
    <section
      data-ph-section="how"
      id="how"
      className="relative scroll-mt-20 bg-zinc-50 px-4 py-16 sm:px-6 sm:py-24 md:py-32"
    >
      <SectionHeader eyebrow={h.eyebrow} title={h.title} className="max-w-3xl" />
      <ol className="mx-auto mt-10 grid max-w-6xl grid-cols-1 gap-3 sm:mt-14 md:grid-cols-3">
        {h.steps.map((s, i) => (
          <FadeIn key={s.title} delay={i * 0.06} y={12}>
            <li className="yl-card h-full p-6 md:p-7">
              <span className="flex size-9 items-center justify-center rounded-full bg-zinc-950 text-[14px] font-semibold text-white">
                {i + 1}
              </span>
              <h3 className="mt-5 text-[16px] font-semibold tracking-tight text-zinc-950">
                {s.title}
              </h3>
              <p className="mt-1.5 text-pretty text-[14px] leading-relaxed text-zinc-500">
                {s.body}
              </p>
            </li>
          </FadeIn>
        ))}
      </ol>
    </section>
  );
}

const FEATURE_ICONS: Record<string, { Icon: LucideIcon; bg: string; fg: string }> = {
  base: { Icon: Users, bg: "#E8192C1f", fg: "#E8192C" },
  report: { Icon: BarChart3, bg: "#4F46E51f", fg: "#4F46E5" },
  segments: { Icon: Filter, bg: "#0596691f", fg: "#059669" },
  studio: { Icon: Mail, bg: "#0284C71f", fg: "#0284C7" },
  auto: { Icon: Zap, bg: "#F973161f", fg: "#F97316" },
  meta: { Icon: Megaphone, bg: "#635BFF1f", fg: "#635BFF" },
  team: { Icon: UserRoundCheck, bg: "#DB27771f", fg: "#DB2777" },
  consent: { Icon: ShieldCheck, bg: "#0F172A14", fg: "var(--color-zinc-900)" },
};

export function CrmFeatures() {
  const f = useCrm().features;
  return (
    <section
      data-ph-section="features"
      id="features"
      className="relative scroll-mt-20 px-4 py-16 sm:px-6 sm:py-24 md:py-32"
    >
      <SectionHeader eyebrow={f.eyebrow} title={f.title} sub={f.sub} className="max-w-3xl" />
      <div className="mx-auto mt-10 grid max-w-6xl grid-cols-1 gap-3 sm:mt-14 sm:grid-cols-2 lg:grid-cols-4">
        {f.items.map((it, i) => {
          const ic = FEATURE_ICONS[it.id] ?? FEATURE_ICONS.base;
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
