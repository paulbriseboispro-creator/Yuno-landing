import { Fragment, type CSSProperties, type ReactNode } from "react";
import { ArrowRight, ChevronRight, ExternalLink } from "lucide-react";
import { crmContent } from "@/content/crm";
import type { CrmPageBlock, CrmPageContent } from "@/content/crm-pages/types";
import { CRM_PAGES, crmPageParent } from "@/content/crm-pages";
import { CRM_PAGE } from "@/i18n/crm-pages";
import { crmPagePaths } from "@/i18n/hosts";
import { LandingProvider, useLanding, whatsappHref } from "@/components/landing/context";
import { CrmNav } from "@/components/crm/Nav";
import { CrmFinal, CrmMobileBar } from "@/components/crm/Closing";
import { Accent, CtaButton, Eyebrow, Reveal } from "@/components/crm/ui";
import { ShotgunLinksTool } from "@/components/crm/pages/ShotgunLinksTool";

// A Yuno CRM content page (crm.yunoapp.eu/fr/…, copy in src/content/crm-pages):
// the CRM page's nav, footer and design system, answer first, every word in the
// server HTML (FAQ included, never folded), breadcrumb and dates visible.

const DATE_FR = new Intl.DateTimeFormat("fr-FR", {
  day: "numeric",
  month: "long",
  year: "numeric",
  timeZone: "Europe/Paris",
});

function fmtDate(iso: string): string {
  return DATE_FR.format(new Date(`${iso}T12:00:00Z`));
}

// `**bold**` and `[label](page:id | home | home#anchor | https://…)`.
function Inline({ text }: { text: string }) {
  const home = useLanding().home;
  const out: ReactNode[] = [];
  const re = /\*\*(.+?)\*\*|\[([^\]]+)\]\(([^)]+)\)/g;
  let last = 0;
  let m: RegExpExecArray | null;
  while ((m = re.exec(text))) {
    if (m.index > last) out.push(text.slice(last, m.index));
    if (m[1]) {
      out.push(
        <strong key={m.index} className="font-semibold text-yc-ink">
          {m[1]}
        </strong>,
      );
    } else {
      const target = m[3];
      const external = /^https?:\/\//.test(target);
      const href = target.startsWith("page:")
        ? CRM_PAGE[target.slice(5) as keyof typeof CRM_PAGE]
        : target.startsWith("home")
          ? home + target.slice(4)
          : target;
      out.push(
        <a
          key={m.index}
          href={href}
          {...(external ? { target: "_blank", rel: "noopener" } : {})}
          className="font-semibold text-yc-red-600 underline decoration-yc-red-200 underline-offset-[3px] transition-colors hover:decoration-yc-red-500"
        >
          {m[2]}
        </a>,
      );
    }
    last = m.index + m[0].length;
  }
  if (last < text.length) out.push(text.slice(last));
  return <>{out}</>;
}

function Heading({
  eyebrow,
  title,
  accent,
  sub,
  center,
}: {
  eyebrow?: string;
  title: string;
  accent?: string;
  sub?: string;
  center?: boolean;
}) {
  return (
    <div className={center ? "mx-auto max-w-[46rem] text-center" : "max-w-[46rem]"}>
      {eyebrow && (
        <Reveal>
          <Eyebrow>{eyebrow}</Eyebrow>
        </Reveal>
      )}
      <Reveal delay={0.05}>
        <h2 className="yc-h3 mt-5 text-[clamp(1.75rem,3.6vw,2.6rem)] text-yc-ink">
          {accent ? <Accent text={title} accent={accent} /> : title}
        </h2>
      </Reveal>
      {sub && (
        <Reveal delay={0.1}>
          <p className="yc-lead mt-4">
            <Inline text={sub} />
          </p>
        </Reveal>
      )}
    </div>
  );
}

function Section({ id, children, tint }: { id?: string; children: ReactNode; tint?: boolean }) {
  return (
    <section
      id={id}
      data-ph-section={id ? `page_${id}` : undefined}
      className={tint ? "bg-yc-sand-50 px-4 py-16 sm:px-6 sm:py-24" : "px-4 py-16 sm:px-6 sm:py-24"}
    >
      <div className="mx-auto max-w-[1100px]">{children}</div>
    </section>
  );
}

function PageCard({ id, body }: { id: keyof typeof CRM_PAGES; body?: string }) {
  const p = CRM_PAGES[id];
  return (
    <a
      href={CRM_PAGE[id]}
      className="group flex h-full flex-col justify-between gap-4 rounded-[22px] border border-yc-sand-200 bg-white p-5 shadow-[var(--shadow-xs)] transition-[border-color,box-shadow] hover:border-yc-sand-300 hover:shadow-[var(--shadow-md)] sm:p-6"
    >
      <span>
        <span className="yc-h3 block text-[19px] text-yc-ink">{p.card.title}</span>
        <span className="mt-2 block text-[15px] leading-[1.55] text-yc-sand-600">
          {body ?? p.card.body}
        </span>
      </span>
      <span className="inline-flex items-center gap-1.5 text-[14.5px] font-semibold text-yc-red-600">
        Lire
        <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" />
      </span>
    </a>
  );
}

function Block({ b, i }: { b: CrmPageBlock; i: number }) {
  const tint = i % 2 === 0;
  switch (b.type) {
    case "text":
      return (
        <Section id={b.id} tint={tint}>
          <Heading eyebrow={b.eyebrow} title={b.title} accent={b.accent} />
          <div className="mt-8 max-w-[46rem] space-y-5 text-[17px] leading-[1.7] text-yc-sand-700">
            {b.paragraphs.map((p) => (
              <p key={p}>
                <Inline text={p} />
              </p>
            ))}
            {b.bullets && (
              <ul className="space-y-3 pt-1">
                {b.bullets.map((x) => (
                  <li key={x} className="flex gap-3">
                    <span
                      aria-hidden
                      className="mt-[0.7em] size-1.5 flex-none rounded-full"
                      style={{ background: "var(--gradient-brand)" }}
                    />
                    <span>
                      <Inline text={x} />
                    </span>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </Section>
      );
    case "cards":
      return (
        <Section id={b.id} tint={tint}>
          <Heading eyebrow={b.eyebrow} title={b.title} accent={b.accent} sub={b.sub} />
          <div className="mt-10 grid gap-3.5 sm:grid-cols-2 lg:grid-cols-3">
            {b.items.map((it, k) => (
              <Reveal key={it.title} delay={Math.min(k, 5) * 0.04} amount={0.1}>
                <div className="h-full rounded-[22px] border border-yc-sand-200 bg-white p-5 shadow-[var(--shadow-xs)] sm:p-6">
                  <h3 className="yc-h3 text-[19px] text-yc-ink">{it.title}</h3>
                  <p className="mt-2.5 text-[15.5px] leading-[1.6] text-yc-sand-600">
                    <Inline text={it.body} />
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </Section>
      );
    case "steps":
      return (
        <Section id={b.id} tint={tint}>
          <Heading eyebrow={b.eyebrow} title={b.title} accent={b.accent} sub={b.sub} />
          <ol className="mt-10 grid gap-3.5 md:grid-cols-2 lg:grid-cols-3">
            {b.items.map((it, k) => (
              <li key={it.title}>
                <Reveal delay={Math.min(k, 5) * 0.04} amount={0.1} className="h-full">
                  <div className="h-full rounded-[22px] border border-yc-sand-200 bg-white p-5 shadow-[var(--shadow-xs)] sm:p-6">
                    <span className="grid size-9 place-items-center rounded-full bg-yc-ink font-yc-mono text-[13px] font-semibold text-white">
                      {k + 1}
                    </span>
                    <h3 className="yc-h3 mt-4 text-[19px] text-yc-ink">{it.title}</h3>
                    <p className="mt-2.5 text-[15.5px] leading-[1.6] text-yc-sand-600">
                      <Inline text={it.body} />
                    </p>
                  </div>
                </Reveal>
              </li>
            ))}
          </ol>
        </Section>
      );
    case "table":
      return (
        <Section id={b.id} tint={tint}>
          <Heading eyebrow={b.eyebrow} title={b.title} accent={b.accent} sub={b.sub} />
          <div
            className="mt-10 overflow-x-auto rounded-[22px] border border-yc-sand-200 bg-white shadow-[var(--shadow-xs)]"
            role="region"
            aria-label={b.title}
            tabIndex={0}
          >
            <table className="w-full min-w-[640px] border-collapse text-left text-[15px]">
              <caption className="sr-only">{b.title}</caption>
              <thead>
                <tr className="border-b border-yc-sand-200 bg-yc-sand-50">
                  {b.head.map((h, k) => (
                    <th
                      key={`${h}-${k}`}
                      scope="col"
                      className="px-5 py-3.5 align-bottom text-[13px] font-semibold uppercase tracking-[0.06em] text-yc-sand-600"
                    >
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {b.rows.map((r) => (
                  <tr key={r.join("|")} className="border-b border-yc-sand-100 last:border-0">
                    {r.map((cell, k) =>
                      k === 0 ? (
                        <th
                          key={k}
                          scope="row"
                          className="px-5 py-4 align-top font-semibold text-yc-ink"
                        >
                          {cell}
                        </th>
                      ) : (
                        <td key={k} className="px-5 py-4 align-top leading-[1.55] text-yc-sand-700">
                          <Inline text={cell} />
                        </td>
                      ),
                    )}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {b.footnote && (
            <p className="mt-4 max-w-[52rem] text-[13.5px] leading-[1.55] text-yc-sand-500">
              <Inline text={b.footnote} />
            </p>
          )}
        </Section>
      );
    case "callout":
      return (
        <section className="px-4 py-6 sm:px-6" data-ph-section="page_callout">
          <div className="mx-auto flex max-w-[1100px] flex-col items-start gap-6 rounded-[28px] bg-yc-ink p-7 text-white sm:p-10 md:flex-row md:items-center md:justify-between">
            <div>
              <p className="yc-h3 text-[clamp(1.5rem,3vw,2.1rem)] text-white">{b.title}</p>
              <p className="mt-2 text-[16px] leading-[1.55] text-white/70">{b.body}</p>
            </div>
            <CtaButton variant="white" cta="page_callout_crm" className="flex-none">
              {b.cta}
            </CtaButton>
          </div>
        </section>
      );
    case "tool":
      return (
        <Section id={b.id} tint={tint}>
          <Heading eyebrow={b.eyebrow} title={b.title} accent={b.accent} sub={b.sub} />
          <div className="mt-10">
            <ShotgunLinksTool />
          </div>
        </Section>
      );
    case "links":
      return (
        <Section id={b.id} tint={tint}>
          <Heading eyebrow={b.eyebrow} title={b.title} accent={b.accent} sub={b.sub} />
          <div className="mt-10 grid gap-3.5 sm:grid-cols-2">
            {b.pages.map((id) => (
              <PageCard key={id} id={id} />
            ))}
          </div>
        </Section>
      );
  }
}

function Breadcrumb({ page }: { page: CrmPageContent }) {
  const { home } = useLanding();
  const parent = crmPageParent(page);
  const items: { label: string; href?: string }[] = [
    { label: "Yuno CRM", href: home },
    ...(parent ? [{ label: CRM_PAGES[parent].crumb, href: CRM_PAGE[parent] }] : []),
    { label: page.crumb },
  ];
  return (
    <nav aria-label="Fil d’Ariane" className="mb-6 flex justify-center">
      <ol className="flex flex-wrap items-center justify-center gap-1 text-[13.5px] text-yc-sand-500">
        {items.map((it, k) => (
          <li key={it.label} className="flex items-center gap-1">
            {k > 0 && <ChevronRight aria-hidden className="size-3.5" />}
            {it.href ? (
              <a href={it.href} className="transition-colors hover:text-yc-ink">
                {it.label}
              </a>
            ) : (
              <span aria-current="page" className="font-medium text-yc-sand-700">
                {it.label}
              </span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}

function rise(d: number): CSSProperties {
  return { "--d": `${d}s` } as CSSProperties;
}

function Hero({ page }: { page: CrmPageContent }) {
  const { whatsappMessage } = useLanding();
  const h = page.hero;
  return (
    <section
      data-ph-section="page_hero"
      className="relative isolate px-4 pb-14 pt-10 sm:px-6 sm:pb-20 sm:pt-16"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-[120px] -z-10 h-[620px] w-[1100px] -translate-x-1/2 rounded-full"
        style={{
          background:
            "radial-gradient(closest-side, rgba(255,107,53,.18), rgba(227,20,27,.08) 45%, rgba(255,255,255,0) 72%)",
          filter: "blur(10px)",
        }}
      />
      <div className="mx-auto max-w-[920px] text-center">
        <Breadcrumb page={page} />
        <div className="yc-rise" style={rise(0.05)}>
          <Eyebrow>{h.kicker}</Eyebrow>
        </div>
        <h1 className="yc-rise yc-h2 mx-auto mt-6 max-w-[20ch] text-yc-ink" style={rise(0.12)}>
          <Accent text={h.title} accent={h.accent} />
        </h1>
        <p className="yc-rise yc-lead mx-auto mt-6 max-w-[42rem]" style={rise(0.25)}>
          {h.sub}
        </p>
        <div
          className="yc-pop mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row"
          style={rise(0.35)}
        >
          <CtaButton size="lg" ring cta="hero_crm">
            {h.cta}
          </CtaButton>
          <a
            href={whatsappHref(whatsappMessage)}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex h-12 items-center rounded-full px-5 text-[15px] font-semibold text-yc-sand-700 transition-colors hover:text-yc-ink"
          >
            Parler au fondateur
          </a>
        </div>
        {h.note && (
          <ul
            className="yc-rise mt-7 flex flex-wrap items-center justify-center gap-2"
            style={rise(0.45)}
          >
            {h.note.map((n) => (
              <li key={n} className="yc-chip">
                {n}
              </li>
            ))}
          </ul>
        )}
        <p className="mt-7 text-[13px] text-yc-sand-500">
          Par Paul Brisebois, fondateur de Yuno · Mis à jour le{" "}
          <time dateTime={page.updated}>{fmtDate(page.updated)}</time>
        </p>
      </div>
    </section>
  );
}

function Answer({ page }: { page: CrmPageContent }) {
  const a = page.answer;
  if (!a) return null;
  return (
    <section data-ph-section="page_answer" className="px-4 pb-6 sm:px-6">
      <div className="mx-auto max-w-[920px] rounded-[28px] border border-yc-sand-200 bg-white p-6 shadow-[var(--shadow-md)] sm:p-10">
        <h2 className="yc-h3 text-[clamp(1.4rem,2.6vw,1.9rem)] text-yc-ink">{a.title}</h2>
        <div className="mt-5 space-y-4 text-[17px] leading-[1.7] text-yc-sand-700">
          {a.paragraphs.map((p) => (
            <p key={p}>
              <Inline text={p} />
            </p>
          ))}
        </div>
        {a.bullets && (
          <ul className="mt-6 grid gap-2.5 sm:grid-cols-2">
            {a.bullets.map((x) => (
              <li
                key={x}
                className="flex gap-2.5 rounded-[14px] bg-yc-sand-50 px-4 py-3 text-[15px] leading-[1.5] text-yc-sand-700"
              >
                <span aria-hidden className="font-bold text-yc-red-500">
                  ✓
                </span>
                {x}
              </li>
            ))}
          </ul>
        )}
      </div>
    </section>
  );
}

function Faq({ page }: { page: CrmPageContent }) {
  const f = page.faq;
  if (!f) return null;
  return (
    <Section id="faq">
      <Heading eyebrow="FAQ" title={f.title} accent={f.accent} />
      <div className="mt-10 grid gap-3 md:grid-cols-2">
        {f.items.map((it) => (
          <div
            key={it.q}
            className="rounded-[22px] border border-yc-sand-200 bg-white p-5 shadow-[var(--shadow-xs)] sm:p-6"
          >
            <h3 className="text-[17px] font-semibold leading-[1.35] text-yc-ink">{it.q}</h3>
            <p className="mt-2.5 text-[15.5px] leading-[1.6] text-yc-sand-600">
              <Inline text={it.a} />
            </p>
          </div>
        ))}
      </div>
    </Section>
  );
}

function Sources({ page }: { page: CrmPageContent }) {
  const s = page.sources;
  if (!s) return null;
  return (
    <section data-ph-section="page_sources" className="px-4 pb-10 sm:px-6">
      <div className="mx-auto max-w-[1100px] border-t border-yc-sand-200 pt-8">
        <h2 className="text-[15px] font-semibold text-yc-ink">{s.title}</h2>
        {s.note && <p className="mt-1 text-[13.5px] text-yc-sand-500">{s.note}</p>}
        <ul className="mt-3 space-y-1.5">
          {s.items.map((it) => (
            <li key={it.url}>
              <a
                href={it.url}
                target="_blank"
                rel="noopener"
                className="inline-flex items-center gap-1.5 text-[14px] text-yc-sand-600 underline decoration-yc-sand-300 underline-offset-[3px] hover:text-yc-ink"
              >
                {it.label}
                <ExternalLink aria-hidden className="size-3.5" />
              </a>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

function Related({ page }: { page: CrmPageContent }) {
  if (!page.related.length) return null;
  return (
    <Section id="a-lire">
      <Heading eyebrow="Pour aller plus loin" title="À lire ensuite." accent="ensuite" />
      <div className="mt-10 grid gap-3.5 sm:grid-cols-2 lg:grid-cols-4">
        {page.related.map((id) => (
          <PageCard key={id} id={id} />
        ))}
      </div>
    </Section>
  );
}

export function CrmContentPage({ page }: { page: CrmPageContent }) {
  const paths = crmPagePaths();
  return (
    <LandingProvider
      lang="fr"
      langHrefs={paths}
      home={paths.fr}
      whatsappMessage={crmContent.fr.whatsappMessage}
    >
      <div className="ycrm min-h-screen overflow-x-clip">
        <CrmNav onHome={false} />
        <main>
          <Hero page={page} />
          <Answer page={page} />
          {page.blocks.map((b, i) => (
            <Fragment key={i}>
              <Block b={b} i={i} />
            </Fragment>
          ))}
          <Faq page={page} />
          <Related page={page} />
          <Sources page={page} />
        </main>
        <CrmFinal onHome={false} />
        <CrmMobileBar />
      </div>
    </LandingProvider>
  );
}
