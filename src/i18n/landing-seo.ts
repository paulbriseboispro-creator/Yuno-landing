import { landingContent } from "@/content/landing";
import { LANDING_LANGS, landingUrl, type LandingLang } from "@/i18n/landing-lang";
import { ogImageMeta, ogImageUrl } from "@/i18n/og";
import { SITE_ORIGIN } from "@/i18n/seo";
import { APP_URL, WHATSAPP_NUMBER } from "@/components/landing/context";

// Last meaningful copy update of the landing: sitemap <lastmod>, WebPage
// dateModified and the llms.txt stamp. Bump it when the landing copy changes.
export const LANDING_UPDATED = "2026-09-24";

const OG_LOCALE: Record<LandingLang, string> = { en: "en_GB", fr: "fr_FR", es: "es_ES" };

// Stable @ids so every page's JSON-LD points at the same Organization / WebSite
// entities (search engines and AI assistants merge them into one brand entity).
export const ORG_ID = `${SITE_ORIGIN}/#organization`;
const SITE_ID = `${SITE_ORIGIN}/#website`;
const APP_ID = `${SITE_ORIGIN}/#software`;

// Public profiles of the brand — keep in sync with the footer/social links.
export const SAME_AS = ["https://www.instagram.com/yunoapp.eu/", APP_URL];

// The Organization node, also emitted by the root route on the non-landing pages.
export function organizationLd(lang: LandingLang) {
  const t = landingContent[lang];
  return {
    "@type": "Organization",
    "@id": ORG_ID,
    name: "Yuno",
    // "Yuno" is also a payments company (y.uno): spell out which one this is so
    // search engines and AI assistants don't merge the two entities.
    alternateName: ["Yuno App", "yunoapp.eu"],
    disambiguatingDescription: t.footer.tagline,
    url: SITE_ORIGIN + "/",
    logo: {
      "@type": "ImageObject",
      url: `${SITE_ORIGIN}/yuno-logo.png`,
      width: 914,
      height: 309,
    },
    description: t.meta.entity,
    slogan: `${t.hero.titleA} ${t.hero.titleB}`,
    sameAs: SAME_AS,
    founder: { "@type": "Person", name: "Paul Brisebois", jobTitle: "Founder" },
    areaServed: [
      { "@type": "Country", name: "France" },
      { "@type": "Country", name: "Spain" },
    ],
    knowsLanguage: ["en", "fr", "es"],
    contactPoint: {
      "@type": "ContactPoint",
      contactType: "sales",
      telephone: `+${WHATSAPP_NUMBER}`,
      availableLanguage: ["English", "French", "Spanish"],
    },
  };
}

// head() for the landing routes: title/description, link-preview tags (share
// title + per-language preview image from og.ts), a self canonical
// and hreflang alternates for all three languages, plus one JSON-LD @graph
// (Organization, WebSite, WebPage, SoftwareApplication with its €0 offer, and
// the FAQPage built from the visible FAQ).
export function landingHead(lang: LandingLang) {
  const t = landingContent[lang];
  const self = landingUrl(lang);
  const image = ogImageUrl(lang);

  const graph = [
    organizationLd(lang),
    {
      "@type": "WebSite",
      "@id": SITE_ID,
      url: SITE_ORIGIN + "/",
      name: "Yuno",
      publisher: { "@id": ORG_ID },
      inLanguage: [...LANDING_LANGS],
    },
    {
      "@type": "WebPage",
      "@id": `${self}#webpage`,
      url: self,
      name: t.meta.title,
      description: t.meta.description,
      inLanguage: lang,
      dateModified: LANDING_UPDATED,
      isPartOf: { "@id": SITE_ID },
      about: { "@id": APP_ID },
      publisher: { "@id": ORG_ID },
      primaryImageOfPage: { "@type": "ImageObject", url: image, width: 1200, height: 630 },
    },
    {
      "@type": "SoftwareApplication",
      "@id": APP_ID,
      name: "Yuno",
      url: SITE_ORIGIN + "/",
      description: t.meta.entity,
      applicationCategory: "BusinessApplication",
      applicationSubCategory: "Nightclub ticketing and management software",
      operatingSystem: "Web, iOS",
      inLanguage: [...LANDING_LANGS],
      image,
      publisher: { "@id": ORG_ID },
      featureList: t.pricing.included,
      audience: {
        "@type": "BusinessAudience",
        audienceType: t.solutions.tabs.map((x) => x.label).join(", "),
      },
      offers: {
        "@type": "Offer",
        name: t.pricing.cardTitle,
        price: "0",
        priceCurrency: "EUR",
        description: t.pricing.rows
          .map((r) => `${r.item}: ${r.amount}${r.who === "—" ? "" : ` (${r.who})`}`)
          .join(" · "),
        availability: "https://schema.org/InStock",
        url: `${self}#pricing`,
      },
    },
    {
      "@type": "FAQPage",
      "@id": `${self}#faq`,
      url: `${self}#faq`,
      inLanguage: lang,
      isPartOf: { "@id": `${self}#webpage` },
      mainEntity: t.faq.items.map((it) => ({
        "@type": "Question",
        name: it.q,
        acceptedAnswer: { "@type": "Answer", text: it.a },
      })),
    },
  ];

  return {
    meta: [
      { title: t.meta.title },
      { name: "description", content: t.meta.description },
      {
        name: "robots",
        content: "index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1",
      },
      { property: "og:type", content: "website" },
      { property: "og:site_name", content: "Yuno" },
      // Link previews use the shorter share title (see og.ts / landing copy).
      { property: "og:title", content: t.meta.shareTitle },
      { property: "og:description", content: t.meta.shareDescription },
      { property: "og:url", content: self },
      { property: "og:locale", content: OG_LOCALE[lang] },
      ...ogImageMeta(lang),
      { name: "twitter:title", content: t.meta.shareTitle },
      { name: "twitter:description", content: t.meta.shareDescription },
      { name: "theme-color", content: "#ffffff" },
    ],
    links: [
      { rel: "canonical", href: self },
      ...LANDING_LANGS.map((l) => ({ rel: "alternate", hrefLang: l, href: landingUrl(l) })),
      { rel: "alternate", hrefLang: "x-default", href: landingUrl("en") },
    ],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({ "@context": "https://schema.org", "@graph": graph }),
      },
    ],
  };
}
