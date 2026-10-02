import { crmContent } from "@/content/crm";
import { CRM_PATHS, LANDING_LANGS, type LandingLang } from "@/i18n/landing-lang";
import { ORG_ID, organizationLd } from "@/i18n/landing-seo";
import { SITE_ORIGIN } from "@/i18n/seo";

// The Yuno CRM page (EN / FR / ES): a product of its own for organizers and
// clubs who keep their ticketing. Its pricing is paid (unlike the ticketing
// Suite), so it never shares the Suite's "€0" claims.

export { CRM_PATHS };

// Last meaningful copy update of the CRM page (sitemap, dateModified).
export const CRM_UPDATED = "2026-10-02";

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
      offers: c.pricing.plans.map((p) => ({
        "@type": "Offer",
        name: p.name,
        price: String(p.month),
        priceCurrency: "EUR",
        url: `${self}#pricing`,
      })),
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
