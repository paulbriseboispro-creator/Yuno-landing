import { landingContent } from "@/content/landing";
import { LANDING_LANGS, landingUrl, type LandingLang } from "@/i18n/landing-lang";

const OG_LOCALE: Record<LandingLang, string> = { en: "en_GB", fr: "fr_FR", es: "es_ES" };

// head() for the landing routes: title/description/OG, a self canonical and
// hreflang alternates for all three languages, plus FAQPage structured data.
export function landingHead(lang: LandingLang) {
  const t = landingContent[lang];
  const self = landingUrl(lang);
  return {
    meta: [
      { title: t.meta.title },
      { name: "description", content: t.meta.description },
      { property: "og:title", content: t.meta.title },
      { property: "og:description", content: t.meta.description },
      { property: "og:url", content: self },
      { property: "og:locale", content: OG_LOCALE[lang] },
      { name: "twitter:title", content: t.meta.title },
      { name: "twitter:description", content: t.meta.description },
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
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: t.faq.items.map((it) => ({
            "@type": "Question",
            name: it.q,
            acceptedAnswer: { "@type": "Answer", text: it.a },
          })),
        }),
      },
    ],
  };
}
