import { ArrowRight, Check, ChevronRight, Equal, Minus } from "lucide-react";
import { motion } from "motion/react";
import { cn } from "@/lib/utils";
import type { ComparePageContent, CompareVerdict } from "@/content/compare-types";
import { LANDING_PATHS } from "@/i18n/landing-lang";
import { LandingProvider } from "@/components/landing/context";
import { LandingNav } from "@/components/landing/Nav";
import { Faq } from "@/components/landing/Pricing";
import { FinalCta, LandingFooter, MobileCta } from "@/components/landing/Closing";
import { SignupModal } from "@/components/landing/SignupModal";
import {
  EASE,
  Eyebrow,
  FadeIn,
  FounderCta,
  PrimaryCta,
  SectionHeader,
} from "@/components/landing/ui";

// "Yuno vs <competitor>" pages (/alternative-shotgun, /fr/alternative-shotgun,
// /es/alternativa-fourvenues). Same light chrome as the landing; the structure
// is answer-first so search engines and AI assistants can lift it: a one-line
// verdict, a sourced comparison table, a fair description of the competitor,
// when to pick which, how to switch, FAQ, sources.
export function ComparePage({ page }: { page: ComparePageContent }) {
  return (
    <LandingProvider lang={page.lang} langHrefs={page.twins}>
      <div className="yl min-h-screen overflow-x-clip">
        <LandingNav />
        <main>
          <Hero page={page} />
          <Table page={page} />
          <About page={page} />
          <Choose page={page} />
          <Switch page={page} />
          <Faq eyebrow={page.faq.eyebrow} title={page.faq.title} items={page.faq.items} />
          <Sources page={page} />
          <FinalCta />
        </main>
        <LandingFooter />
        <MobileCta />
        <SignupModal />
      </div>
    </LandingProvider>
  );
}

function Hero({ page }: { page: ComparePageContent }) {
  const h = page.hero;
  return (
    <section className="relative isolate overflow-hidden px-4 pb-16 pt-8 sm:px-6 md:pb-24 md:pt-12">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-[620px] bg-[radial-gradient(60%_60%_at_50%_0%,#f4f4f6_0%,rgba(255,255,255,0)_70%)]"
      />
      <div className="mx-auto max-w-4xl text-center">
        <nav aria-label="Breadcrumb" className="flex justify-center">
          <ol className="flex items-center gap-1 text-[12.5px] text-zinc-500">
            <li>
              <a href={LANDING_PATHS[page.lang]} className="hover:text-zinc-900">
                {page.breadcrumb.home}
              </a>
            </li>
            <li aria-hidden>
              <ChevronRight className="size-3.5 text-zinc-300" />
            </li>
            <li aria-current="page" className="font-medium text-zinc-800">
              {page.breadcrumb.current}
            </li>
          </ol>
        </nav>

        <h1 className="yl-h1 mx-auto mt-8 max-w-4xl text-balance text-[clamp(2rem,4.8vw,3.5rem)] text-zinc-950">
          <span className="mx-auto mb-4 block max-w-[36rem] text-balance text-[13.5px] font-medium leading-snug tracking-normal text-zinc-500 md:mb-5 md:text-[15px]">
            {h.kicker}
          </span>
          <span className="block bg-gradient-to-b from-zinc-950 to-zinc-600 bg-clip-text text-transparent">
            {h.title}
          </span>
        </h1>
        <p className="mx-auto mt-6 max-w-2xl text-pretty text-[15px] leading-relaxed text-zinc-500 md:text-[17px]">
          {h.sub}
        </p>
        <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <PrimaryCta size="lg" className="w-full sm:w-auto">
            {h.primary}
          </PrimaryCta>
          <FounderCta size="lg" className="w-full sm:w-auto">
            {h.secondary}
          </FounderCta>
        </div>
        <p className="mt-5 text-[12.5px] text-zinc-400">
          <time dateTime={page.updated}>{h.updatedLabel}</time>
        </p>
      </div>

      {/* Answer-first summary: the part an AI answer or a skimming reader keeps. */}
      <FadeIn className="mx-auto mt-14 max-w-3xl">
        <div className="yl-card p-6 md:p-8">
          <h2 className="text-[13px] font-semibold uppercase tracking-[0.14em] text-zinc-400">
            {page.tldr.title}
          </h2>
          <ul className="mt-4 space-y-3">
            {page.tldr.items.map((it) => (
              <li key={it} className="flex gap-3 text-[15px] leading-relaxed text-zinc-800">
                <span className="mt-1 flex size-5 shrink-0 items-center justify-center rounded-full bg-[var(--yuno-red)]">
                  <Check className="size-3 text-[#fff]" strokeWidth={3} />
                </span>
                <span>{it}</span>
              </li>
            ))}
          </ul>
        </div>
      </FadeIn>
    </section>
  );
}

const VERDICT_ICON: Record<CompareVerdict, typeof Check> = {
  yuno: Check,
  other: Minus,
  tie: Equal,
};

function Table({ page }: { page: ComparePageContent }) {
  const tb = page.table;
  return (
    <section
      id="comparison"
      className="relative scroll-mt-20 bg-zinc-50 px-4 py-24 sm:px-6 md:py-32"
    >
      <SectionHeader eyebrow={tb.eyebrow} title={tb.title} sub={tb.sub} />
      <FadeIn className="mx-auto mt-14 max-w-5xl">
        <div className="yl-card overflow-hidden">
          <table className="w-full border-collapse text-left">
            <caption className="sr-only">{tb.title}</caption>
            <colgroup>
              <col className="md:w-[26%]" />
              <col className="md:w-[37%]" />
              <col />
            </colgroup>
            <thead className="hidden border-b border-zinc-100 text-[12px] font-semibold uppercase tracking-[0.12em] text-zinc-400 md:table-header-group">
              <tr>
                <th scope="col" className="px-6 py-4 font-semibold">
                  {tb.colCriterion}
                </th>
                <th scope="col" className="px-6 py-4 font-semibold text-[var(--yuno-red)]">
                  {tb.colYuno}
                </th>
                <th scope="col" className="px-6 py-4 font-semibold">
                  {tb.colOther}
                </th>
              </tr>
            </thead>
            <tbody>
              {tb.rows.map((r, i) => {
                const Icon = VERDICT_ICON[r.verdict];
                return (
                  <tr
                    key={r.criterion}
                    className={cn(
                      "grid grid-cols-1 gap-2 px-5 py-5 md:table-row md:p-0",
                      i > 0 && "border-t border-zinc-100",
                    )}
                  >
                    <th
                      scope="row"
                      className="text-left align-top text-[14.5px] font-semibold tracking-tight text-zinc-950 md:px-6 md:py-5"
                    >
                      {r.criterion}
                    </th>
                    <td className="align-top text-[14px] leading-relaxed md:bg-[linear-gradient(90deg,rgba(232,25,44,0.05),rgba(232,25,44,0.01))] md:px-6 md:py-5">
                      <span className="mb-1 block text-[11px] font-semibold uppercase tracking-[0.12em] text-[var(--yuno-red)] md:hidden">
                        {tb.colYuno}
                      </span>
                      <span className="flex items-start gap-2">
                        <Icon
                          aria-hidden
                          className={cn(
                            "mt-1 size-3.5 shrink-0",
                            r.verdict === "yuno" ? "text-emerald-600" : "text-zinc-300",
                          )}
                          strokeWidth={3}
                        />
                        <span
                          className={
                            r.verdict === "yuno" ? "font-medium text-zinc-900" : "text-zinc-600"
                          }
                        >
                          {r.yuno}
                        </span>
                      </span>
                    </td>
                    <td className="align-top text-[14px] leading-relaxed text-zinc-500 md:px-6 md:py-5">
                      <span className="mb-1 block text-[11px] font-semibold uppercase tracking-[0.12em] text-zinc-400 md:hidden">
                        {tb.colOther}
                      </span>
                      <span className={cn(r.verdict === "other" && "font-medium text-zinc-900")}>
                        {r.other}
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
        <p className="mt-4 text-[12px] leading-relaxed text-zinc-400">{tb.footnote}</p>
      </FadeIn>
    </section>
  );
}

function About({ page }: { page: ComparePageContent }) {
  const a = page.about;
  return (
    <section className="px-4 py-24 sm:px-6 md:py-32">
      <FadeIn className="mx-auto max-w-3xl">
        <Eyebrow>{a.eyebrow}</Eyebrow>
        <h2 className="yl-h2 mt-4 text-balance">{a.title}</h2>
        <div className="mt-6 space-y-4 text-pretty text-[15.5px] leading-relaxed text-zinc-600">
          {a.paragraphs.map((p) => (
            <p key={p}>{p}</p>
          ))}
        </div>
      </FadeIn>
    </section>
  );
}

function Choose({ page }: { page: ComparePageContent }) {
  const c = page.choose;
  return (
    <section className="bg-zinc-50 px-4 py-24 sm:px-6 md:py-32">
      <SectionHeader eyebrow={c.eyebrow} title={c.title} />
      <div className="mx-auto mt-14 grid max-w-5xl gap-5 md:grid-cols-2">
        {[
          { block: c.other, yuno: false },
          { block: c.yuno, yuno: true },
        ].map(({ block, yuno }) => (
          <FadeIn key={block.title}>
            <div
              className={cn(
                "h-full rounded-[1.5rem] p-7 md:p-8",
                yuno
                  ? // yl-keep + yl-edge: stays a black card in the dark theme too.
                    "yl-keep yl-edge bg-zinc-950 text-white shadow-[0_30px_60px_-24px_rgba(10,10,11,0.5)]"
                  : "yl-card",
              )}
            >
              <h3
                className={cn(
                  "yl-h3 text-[20px] md:text-[22px]",
                  yuno ? "text-white" : "text-zinc-950",
                )}
              >
                {block.title}
              </h3>
              <ul className="mt-5 space-y-3">
                {block.items.map((it) => (
                  <li
                    key={it}
                    className={cn(
                      "flex gap-3 text-[14.5px] leading-relaxed",
                      yuno ? "text-zinc-200" : "text-zinc-600",
                    )}
                  >
                    <Check
                      className={cn(
                        "mt-1 size-4 shrink-0",
                        yuno ? "text-[var(--yuno-red)]" : "text-zinc-400",
                      )}
                      strokeWidth={2.5}
                    />
                    {it}
                  </li>
                ))}
              </ul>
              {yuno && (
                <PrimaryCta size="lg" className="mt-8 bg-white text-zinc-950 hover:bg-zinc-100">
                  {page.hero.primary}
                </PrimaryCta>
              )}
            </div>
          </FadeIn>
        ))}
      </div>
    </section>
  );
}

function Switch({ page }: { page: ComparePageContent }) {
  const s = page.switch;
  return (
    <section className="px-4 py-24 sm:px-6 md:py-32">
      <SectionHeader eyebrow={s.eyebrow} title={s.title} sub={s.sub} />
      <ol className="mx-auto mt-14 grid max-w-5xl gap-5 md:grid-cols-3">
        {s.steps.map((st, i) => (
          <motion.li
            key={st.title}
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.7, ease: EASE, delay: i * 0.06 }}
            className="yl-card h-full p-6 md:p-7"
          >
            <span className="flex size-9 items-center justify-center rounded-full bg-zinc-950 text-[14px] font-semibold text-white">
              {i + 1}
            </span>
            <h3 className="yl-h3 mt-5 text-[17px] text-zinc-950">{st.title}</h3>
            <p className="mt-2 text-pretty text-[14.5px] leading-relaxed text-zinc-500">
              {st.body}
            </p>
          </motion.li>
        ))}
      </ol>
    </section>
  );
}

function Sources({ page }: { page: ComparePageContent }) {
  return (
    <section className="px-4 pb-24 sm:px-6 md:pb-32">
      <div className="mx-auto grid max-w-5xl gap-10 border-t border-zinc-100 pt-12 md:grid-cols-2">
        <div>
          <h2 className="text-[15px] font-semibold text-zinc-950">{page.related.title}</h2>
          <ul className="mt-4 space-y-2.5">
            {page.related.links.map((l) => (
              <li key={l.href}>
                <a
                  href={l.href}
                  className="group inline-flex items-center gap-1.5 text-[14px] text-zinc-600 transition-colors hover:text-zinc-950"
                >
                  {l.label}
                  <ArrowRight className="size-3.5 transition-transform group-hover:translate-x-0.5" />
                </a>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h2 className="text-[15px] font-semibold text-zinc-950">{page.sources.title}</h2>
          <ul className="mt-4 space-y-2">
            {page.sources.items.map((s) => (
              <li key={s.url} className="text-[13px] leading-relaxed text-zinc-500">
                <a
                  href={s.url}
                  target="_blank"
                  rel="noopener noreferrer nofollow"
                  className="underline decoration-zinc-300 underline-offset-2 hover:text-zinc-900"
                >
                  {s.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
        <p className="text-[12px] leading-relaxed text-zinc-400 md:col-span-2">{page.disclaimer}</p>
      </div>
    </section>
  );
}
