import { crmContent } from "@/content/crm";
import { CRM_PATHS, LANDING_LANGS, type LandingLang } from "@/i18n/landing-lang";
import { ORG_ID, organizationLd } from "@/i18n/landing-seo";
import { SITE_ORIGIN } from "@/i18n/seo";

// The Yuno CRM page (EN / FR / ES): a product of its own for organizers and
// clubs who keep their ticketing. Its pricing is paid (unlike the ticketing
// Suite), so it never shares the Suite's "€0" claims: one subscription
// (monthly or yearly) plus Yunits for the sends.

export { CRM_PATHS };

// Last meaningful copy update of the CRM page (sitemap, dateModified).
export const CRM_UPDATED = "2026-10-04";

const OG_LOCALE: Record<LandingLang, string> = { en: "en_GB", fr: "fr_FR", es: "es_ES" };

export function crmUrl(lang: LandingLang): string {
  return SITE_ORIGIN + CRM_PATHS[lang];
}

// No dedicated preview image yet: the landing's.
function crmOgImage(lang: LandingLang): string {
  return `${SITE_ORIGIN}/og/landing-${lang}.png`;
}

export function crmHead(lang: LandingLang) {
  const c = crmContent[lang];
  const self = crmUrl(lang);
  const image = crmOgImage(lang);
  const graph = [
    organizationLd(lang),
    {
      "@type": "WebPage",
      "@id": `${self}#webpage`,
      url: self,
      name: c.meta.title,
      description: c.meta.description,
      inLanguage: lang,
      dateModified: CRM_UPDATED,
      publisher: { "@id": ORG_ID },
    },
    {
      "@type": "SoftwareApplication",
      "@id": `${self}#app`,
      name: "Yuno CRM",
      applicationCategory: "BusinessApplication",
      operatingSystem: "Web",
      description: c.meta.description,
      publisher: { "@id": ORG_ID },
      offers: [
        {
          "@type": "Offer",
          name: `${c.pricing.plan} · ${c.pricing.monthly}`,
          price: String(c.pricing.month),
          priceCurrency: "EUR",
          priceSpecification: {
            "@type": "UnitPriceSpecification",
            price: c.pricing.month,
            priceCurrency: "EUR",
            unitCode: "MON",
            valueAddedTaxIncluded: false,
          },
          url: `${self}#tarifs`,
        },
        {
          "@type": "Offer",
          name: `${c.pricing.plan} · ${c.pricing.annual}`,
          price: String(c.pricing.year),
          priceCurrency: "EUR",
          priceSpecification: {
            "@type": "UnitPriceSpecification",
            price: c.pricing.year,
            priceCurrency: "EUR",
            unitCode: "ANN",
            valueAddedTaxIncluded: false,
          },
          url: `${self}#tarifs`,
        },
      ],
    },
    {
      "@type": "FAQPage",
      "@id": `${self}#faq`,
      inLanguage: lang,
      isPartOf: { "@id": `${self}#webpage` },
      mainEntity: c.faq.items.map((it) => ({
        "@type": "Question",
        name: it.q,
        acceptedAnswer: { "@type": "Answer", text: it.a },
      })),
    },
  ];
  return {
    meta: [
      { title: c.meta.title },
      { name: "description", content: c.meta.description },
      { name: "robots", content: "index, follow, max-image-preview:large, max-snippet:-1" },
      { property: "og:type", content: "website" },
      { property: "og:site_name", content: "Yuno" },
      { property: "og:title", content: c.meta.title },
      { property: "og:description", content: c.meta.description },
      { property: "og:url", content: self },
      { property: "og:locale", content: OG_LOCALE[lang] },
      { property: "og:image", content: image },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: c.meta.title },
      { name: "twitter:description", content: c.meta.description },
      { name: "twitter:image", content: image },
      { name: "theme-color", content: "#ffffff" },
    ],
    links: [
      { rel: "canonical", href: self },
      // The Yuno design system's faces, only on this page.
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:opsz,wght@12..96,400..800&family=Geist:wght@400..700&family=Geist+Mono:wght@400..600&display=swap",
      },
      ...LANDING_LANGS.map((l) => ({ rel: "alternate", hrefLang: l, href: crmUrl(l) })),
      { rel: "alternate", hrefLang: "x-default", href: crmUrl("en") },
    ],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({ "@context": "https://schema.org", "@graph": graph }),
      },
    ],
  };
}

// One language of the CRM page as markdown, for /llms-full.txt. Built from the
// page's own copy, so what an AI assistant reads matches what visitors see.
export function crmMarkdown(lang: LandingLang): string {
  const c = crmContent[lang];
  const out: string[] = [
    `# ${c.meta.title}`,
    "",
    `> ${c.meta.description}`,
    "",
    `URL: ${crmUrl(lang)}`,
    "",
    c.hero.sub,
    "",
    `## ${c.problem.title}`,
    "",
    c.problem.sub,
    "",
    ...c.problem.cards.map((it) => `- **${it.title}** ${it.body}`),
    "",
    `## ${c.steps.title}`,
    "",
    c.steps.sub,
    "",
    ...c.steps.items.map((it, i) => `${i + 1}. **${it.title}** ${it.body}`),
    "",
    `## ${c.engine.title}`,
    "",
    c.engine.sub,
    "",
    ...c.engine.pillars.map((p) => `- **${p.t}:** ${p.d}`),
    "",
    `${c.engine.autosTitle}: ${c.engine.autos.join(", ")}.`,
    "",
    ...c.engine.rules.map((r) => `- ${r}`),
    "",
    `${c.engine.stats.map((s) => `${s.v} ${s.l}`).join(" · ")}. ${c.engine.statsNote}`,
    "",
    `## ${c.mcp.title}`,
    "",
    c.mcp.sub,
    "",
    `## ${c.channels.title}`,
    "",
    c.channels.sub,
    "",
    ...c.channels.rates.map((r) => `- ${r.name}: ${r.cost}`),
    "",
    `## ${c.pricing.title}`,
    "",
    `${c.pricing.sub} ${c.pricing.plan}: ${c.pricing.month} ${c.pricing.perMonth} (${c.pricing.launch}), ${c.pricing.year} ${c.pricing.perYear}. ${c.pricing.notes.join(". ")}.`,
    "",
    ...c.pricing.feats.map((f) => `- **${f.t}:** ${f.d}`),
    "",
    `## ${c.faq.title}`,
    "",
  ];
  for (const it of c.faq.items) out.push(`### ${it.q}`, "", it.a, "");
  return out.join("\n");
}
