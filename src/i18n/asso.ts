import { assoContent } from "@/content/asso";
import { ASSO_PATHS, LANDING_LANGS, type LandingLang } from "@/i18n/landing-lang";
import { ORG_ID, organizationLd } from "@/i18n/landing-seo";
import { SITE_ORIGIN } from "@/i18n/seo";

// The student-association landing, in the landing's three languages. A page of
// its own (own nav, own signup journey) that the main landing never links to.

export { ASSO_PATHS };

// Last meaningful copy update of the association page (sitemap, dateModified).
export const ASSO_UPDATED = "2026-09-26";

const OG_LOCALE: Record<LandingLang, string> = { en: "en_GB", fr: "fr_FR", es: "es_ES" };
// Bump after re-rendering public/og/asso-*.png (scripts/og/render.ts).
const OG_VERSION = "1";

export function assoUrl(lang: LandingLang): string {
  return SITE_ORIGIN + ASSO_PATHS[lang];
}

export function assoOgImage(lang: LandingLang): string {
  return `${SITE_ORIGIN}/og/asso-${lang}.png?v=${OG_VERSION}`;
}

// head() of the association page: meta/OG, self canonical, hreflang across the
// three languages, and one JSON-LD @graph (Organization, WebPage, the €0 offer
// for associations, FAQPage from the visible FAQ).
export function assoHead(lang: LandingLang) {
  const c = assoContent[lang];
  const self = assoUrl(lang);
  const image = assoOgImage(lang);

  const graph = [
    organizationLd(lang),
    {
      "@type": "WebPage",
      "@id": `${self}#webpage`,
      url: self,
      name: c.meta.title,
      description: c.meta.description,
      inLanguage: lang,
      dateModified: ASSO_UPDATED,
      publisher: { "@id": ORG_ID },
      primaryImageOfPage: { "@type": "ImageObject", url: image, width: 1200, height: 630 },
    },
    {
      "@type": "Service",
      "@id": `${self}#service`,
      name: c.meta.shareTitle,
      serviceType: c.hero.kicker,
      description: c.meta.description,
      provider: { "@id": ORG_ID },
      audience: { "@type": "Audience", audienceType: c.hero.chip },
      offers: {
        "@type": "Offer",
        name: c.pricing.cardTitle,
        price: "0",
        priceCurrency: "EUR",
        description: c.pricing.rows
          .map((r) => `${r.item}: ${r.amount}${r.who === "—" ? "" : ` (${r.who})`}`)
          .join(" · "),
        availability: "https://schema.org/InStock",
        url: `${self}#pricing`,
      },
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
      {
        name: "robots",
        content: "index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1",
      },
      { property: "og:type", content: "website" },
      { property: "og:site_name", content: "Yuno" },
      { property: "og:title", content: c.meta.shareTitle },
      { property: "og:description", content: c.meta.shareDescription },
      { property: "og:url", content: self },
      { property: "og:locale", content: OG_LOCALE[lang] },
      { property: "og:image", content: image },
      { property: "og:image:secure_url", content: image },
      { property: "og:image:type", content: "image/png" },
      { property: "og:image:width", content: "1200" },
      { property: "og:image:height", content: "630" },
      { property: "og:image:alt", content: c.meta.ogAlt },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: c.meta.shareTitle },
      { name: "twitter:description", content: c.meta.shareDescription },
      { name: "twitter:image", content: image },
      { name: "twitter:image:alt", content: c.meta.ogAlt },
      { name: "theme-color", content: "#ffffff" },
    ],
    links: [
      { rel: "canonical", href: self },
      ...LANDING_LANGS.map((l) => ({ rel: "alternate", hrefLang: l, href: assoUrl(l) })),
      // "/associations" sends French and Spanish browsers to their page.
      { rel: "alternate", hrefLang: "x-default", href: assoUrl("en") },
    ],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({ "@context": "https://schema.org", "@graph": graph }),
      },
    ],
  };
}
