import { landingContent } from "@/content/landing";
import { LANDING_LANGS, type LandingLang } from "@/i18n/landing-lang";
import { SITE_ORIGIN } from "@/i18n/seo";

// "/start" routes: the direct path to a Yuno pro account (EN / FR / ES).

export const START_PATHS: Record<LandingLang, string> = {
  en: "/start",
  fr: "/fr/start",
  es: "/es/start",
};

export function startHead(lang: LandingLang) {
  const t = landingContent[lang].start;
  const self = SITE_ORIGIN + START_PATHS[lang];
  return {
    meta: [
      { title: t.title },
      { name: "description", content: t.description },
      { property: "og:title", content: t.title },
      { property: "og:description", content: t.description },
      { property: "og:url", content: self },
      { name: "twitter:title", content: t.title },
      { name: "twitter:description", content: t.description },
      { name: "theme-color", content: "#ffffff" },
    ],
    links: [
      { rel: "canonical", href: self },
      ...LANDING_LANGS.map((l) => ({
        rel: "alternate",
        hrefLang: l,
        href: SITE_ORIGIN + START_PATHS[l],
      })),
      { rel: "alternate", hrefLang: "x-default", href: SITE_ORIGIN + START_PATHS.en },
    ],
  };
}

export function parseStartRole(v: unknown): "club" | "organizer" | undefined {
  return v === "club" || v === "organizer" ? v : undefined;
}
