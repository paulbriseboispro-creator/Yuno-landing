import { ArrowRight, Check, ChevronRight } from "lucide-react";
import { motion } from "motion/react";
import type { TopicPageContent } from "@/content/topic-types";
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

// Topic pages (/fr/reservation-table-vip-discotheque, /pricing, /es/software-rrpp-discoteca…).
// Same light chrome as the landing. Everything a crawler needs is in the server
// HTML (no tab, no accordion hiding text): h1 → direct answer → keyword-bearing
// h2/h3 → table → steps → proof → FAQ → related links.
export function TopicPage({ page }: { page: TopicPageContent }) {
  return (
    <LandingProvider lang={page.lang} langHrefs={page.twins}>
      <div className="yl min-h-screen overflow-x-clip">
        <LandingNav />
        <main>
          <Hero page={page} />
          <Features page={page} />
          {page.table && <DataTable page={page} />}
          <Steps page={page} />
          {page.proof && <Proof page={page} />}
          <Faq eyebrow={page.faq.eyebrow} title={page.faq.title} items={page.faq.items} />
          <Related page={page} />
          <FinalCta />
        </main>
        <LandingFooter />
        <MobileCta />
        <SignupModal />
      </div>
    </LandingProvider>
  );
}

function Hero({ page }: { page: TopicPageContent }) {
  const h = page.hero;
  const a = page.answer;
  return (
    <section
      data-ph-section="topic_hero"
      className="relative isolate overflow-hidden px-4 pb-16 pt-8 sm:px-6 md:pb-24 md:pt-12"
    >
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
          <span className="mx-auto mb-4 block max-w-[38rem] text-balance text-[13.5px] font-medium leading-snug tracking-normal text-zinc-500 md:mb-5 md:text-[15px]">
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
        {h.note && (
          <ul className="mt-5 flex flex-wrap items-center justify-center gap-x-5 gap-y-1 text-[12.5px] text-zinc-500">
            {h.note.map((n) => (
              <li key={n} className="inline-flex items-center gap-1.5">
                <Check className="size-3.5 text-emerald-600" strokeWidth={3} />
                {n}
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* Direct answer: the passage a snippet or an AI answer keeps. */}
      <FadeIn className="mx-auto mt-14 max-w-3xl">
        <div className="yl-card p-6 md:p-8">
          <h2 className="text-[13px] font-semibold uppercase tracking-[0.14em] text-zinc-400">
            {a.title}
          </h2>
          <div className="mt-4 space-y-3 text-pretty text-[15.5px] leading-relaxed text-zinc-800">
            {a.paragraphs.map((p) => (
              <p key={p}>{p}</p>
            ))}
          </div>
          {a.bullets && (
            <ul className="mt-5 space-y-3">
              {a.bullets.map((it) => (
                <li key={it} className="flex gap-3 text-[15px] leading-relaxed text-zinc-800">
                  <span className="mt-1 flex size-5 shrink-0 items-center justify-center rounded-full bg-[var(--yuno-red)]">
                    <Check className="size-3 text-[#fff]" strokeWidth={3} />
                  </span>
                  <span>{it}</span>
                </li>
              ))}
            </ul>
          )}
        </div>
      </FadeIn>
    </section>
  );
}

function Features({ page }: { page: TopicPageContent }) {
  const f = page.features;
  return (
    <section
      data-ph-section="topic_features"
      className="relative scroll-mt-20 bg-zinc-50 px-4 py-24 sm:px-6 md:py-32"
    >
      <SectionHeader eyebrow={f.eyebrow} title={f.title} sub={f.sub} />
      <div className="mx-auto mt-14 grid max-w-6xl gap-5 md:grid-cols-2 lg:grid-cols-3">
        {f.items.map((it, i) => (
          <motion.div
            key={it.title}
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.7, ease: EASE, delay: (i % 3) * 0.06 }}
            className="yl-card h-full p-6 md:p-7"
          >
            <h3 className="yl-h3 text-[17px] text-zinc-950">{it.title}</h3>
            <p className="mt-2 text-pretty text-[14.5px] leading-relaxed text-zinc-500">
              {it.body}
            </p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

function DataTable({ page }: { page: TopicPageContent }) {
  const tb = page.table!;
  return (
    <section data-ph-section="topic_table" className="scroll-mt-20 px-4 py-24 sm:px-6 md:py-32">
      <SectionHeader eyebrow={tb.eyebrow} title={tb.title} sub={tb.sub} />
      <FadeIn className="mx-auto mt-14 max-w-5xl">
        <div className="yl-card overflow-x-auto">
          <table className="w-full min-w-[34rem] border-collapse text-left">
            <caption className="sr-only">{tb.title}</caption>
            <thead className="border-b border-zinc-100 text-[12px] font-semibold uppercase tracking-[0.12em] text-zinc-400">
              <tr>
                {tb.head.map((h, i) => (
                  <th
                    key={h}
                    scope="col"
                    className={
                      i === 1 ? "px-5 py-4 text-[var(--yuno-red)] md:px-6" : "px-5 py-4 md:px-6"
                    }
                  >
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {tb.rows.map((r, ri) => (
                <tr key={r[0]} className={ri > 0 ? "border-t border-zinc-100" : undefined}>
                  {r.map((c, ci) =>
                    ci === 0 ? (
                      <th
                        key={ci}
                        scope="row"
                        className="px-5 py-4 text-left align-top text-[14.5px] font-semibold tracking-tight text-zinc-950 md:px-6"
                      >
                        {c}
                      </th>
                    ) : (
                      <td
                        key={ci}
                        className={
                          ci === 1
                            ? "px-5 py-4 align-top text-[14px] font-medium leading-relaxed text-zinc-900 md:px-6"
                            : "px-5 py-4 align-top text-[14px] leading-relaxed text-zinc-500 md:px-6"
                        }
                      >
                        {c}
                      </td>
                    ),
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {tb.footnote && (
          <p className="mt-4 text-[12px] leading-relaxed text-zinc-400">{tb.footnote}</p>
        )}
      </FadeIn>
    </section>
  );
}

function Steps({ page }: { page: TopicPageContent }) {
  const s = page.steps;
  return (
    <section data-ph-section="topic_steps" className="bg-zinc-50 px-4 py-24 sm:px-6 md:py-32">
      <SectionHeader eyebrow={s.eyebrow} title={s.title} sub={s.sub} />
      <ol className="mx-auto mt-14 grid max-w-5xl gap-5 md:grid-cols-3">
        {s.items.map((st, i) => (
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

function Proof({ page }: { page: TopicPageContent }) {
  const p = page.proof!;
  return (
    <section data-ph-section="topic_proof" className="px-4 py-24 sm:px-6 md:py-32">
      <SectionHeader eyebrow={p.eyebrow} title={p.title} sub={p.sub} />
      <FadeIn className="mx-auto mt-14 max-w-5xl">
        <dl className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {p.stats.map((s) => (
            <div key={s.label} className="yl-card flex flex-col p-6 text-center">
              <dt className="order-2 mt-2 text-[13.5px] leading-snug text-zinc-500">{s.label}</dt>
              <dd className="yl-h2 text-[clamp(1.6rem,3vw,2.25rem)] text-zinc-950">{s.value}</dd>
            </div>
          ))}
        </dl>
        {p.note && (
          <p className="mx-auto mt-6 max-w-3xl text-center text-[12.5px] leading-relaxed text-zinc-400">
            {p.note}
          </p>
        )}
        <div className="mt-10 flex justify-center">
          <PrimaryCta size="lg">{page.hero.primary}</PrimaryCta>
        </div>
      </FadeIn>
    </section>
  );
}

function Related({ page }: { page: TopicPageContent }) {
  return (
    <section data-ph-area="topic_related" className="px-4 pb-24 sm:px-6 md:pb-32">
      <div className="mx-auto grid max-w-5xl gap-10 border-t border-zinc-100 pt-12 md:grid-cols-2">
        <div>
          <Eyebrow>{page.related.title}</Eyebrow>
          <ul className="mt-5 space-y-2.5">
            {page.related.links.map((l) => (
              <li key={l.href}>
                <a
                  href={l.href}
                  className="group inline-flex items-center gap-1.5 text-[14.5px] text-zinc-700 transition-colors hover:text-zinc-950"
                >
                  {l.label}
                  <ArrowRight className="size-3.5 transition-transform group-hover:translate-x-0.5" />
                </a>
              </li>
            ))}
          </ul>
        </div>
        {page.sources && (
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
            {page.sources.disclaimer && (
              <p className="mt-4 text-[12px] leading-relaxed text-zinc-400">
                {page.sources.disclaimer}
              </p>
            )}
          </div>
        )}
      </div>
    </section>
  );
}
