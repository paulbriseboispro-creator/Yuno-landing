import { landingContent } from "@/content/landing";
import { crmSignupContent } from "@/content/crm-signup";
import { LANDING_LANGS, type LandingLang } from "@/i18n/landing-lang";
import { SITE_ORIGIN } from "@/i18n/seo";
import { CRM_ORIGIN } from "@/i18n/hosts";

// "/start" routes: the direct path to a Yuno pro account (EN / FR / ES).

export const START_PATHS: Record<LandingLang, string> = {
  en: "/start",
  fr: "/fr/start",
  es: "/es/start",
};

/** The Yuno CRM signup funnel ("/start?product=crm"), in the page's language. */
export function crmStartHref(lang: LandingLang): string {
  return `${START_PATHS[lang]}?product=crm`;
}

export function startHead(lang: LandingLang, product?: "crm") {
  // Yuno CRM signup: its own title and the design system's faces.
  const t = product === "crm" ? crmSignupContent[lang].meta : landingContent[lang].start;
  // The CRM funnel is published on crm.yunoapp.eu (src/i18n/hosts.ts).
  const url = (l: LandingLang) =>
    product === "crm" ? `${CRM_ORIGIN}${crmStartHref(l)}` : SITE_ORIGIN + START_PATHS[l];
  const self = url(lang);
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
      ...(product === "crm"
        ? [
            {
              rel: "stylesheet",
              href: "https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:opsz,wght@12..96,400..800&family=Geist:wght@400..700&family=Geist+Mono:wght@400..600&display=swap",
            },
          ]
        : []),
      ...LANDING_LANGS.map((l) => ({
        rel: "alternate",
        hrefLang: l,
        href: url(l),
      })),
      { rel: "alternate", hrefLang: "x-default", href: url("en") },
    ],
  };
}

export function parseStartRole(v: unknown): "club" | "organizer" | undefined {
  return v === "club" || v === "organizer" ? v : undefined;
}

/** `?product=crm` : the Yuno CRM signup (the person keeps their ticketing). */
export function parseStartProduct(v: unknown): "crm" | undefined {
  return v === "crm" ? v : undefined;
}
