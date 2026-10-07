// Link-preview image tags (WhatsApp, iMessage, LinkedIn, Slack, X…). The PNGs
// live in public/og/ and are rendered from the landing hero copy by
// scripts/og/render.ts (`bun run og`). Kept out of the landing copy module so
// the root route can use it on every page without pulling in landing.ts.
import type { LandingLang } from "@/i18n/landing-lang";
import { SITE_ORIGIN } from "@/i18n/seo";
import { CRM_ORIGIN } from "@/i18n/hosts";

// Bump after re-rendering the images: WhatsApp, LinkedIn and Facebook cache
// previews per image URL, so a new query string forces a refetch.
const OG_VERSION = "3";

const OG_IMAGE_ALT: Record<LandingLang, string> = {
  en: "Yuno — Sell your nights. Run them end to end. The Yuno club dashboard.",
  fr: "Yuno — Vendez vos soirées. Pilotez-les de A à Z. Le tableau de bord club de Yuno.",
  es: "Yuno — Vende tus noches. Gestiónalas de la A a la Z. El panel de discoteca de Yuno.",
};

export function ogImageUrl(lang: LandingLang): string {
  return `${SITE_ORIGIN}/og/landing-${lang}.png?v=${OG_VERSION}`;
}

// Order matters for strict Open Graph parsers: og:image first, then its
// structured properties.
export function ogImageMeta(lang: LandingLang) {
  return imageTags(ogImageUrl(lang), OG_IMAGE_ALT[lang]);
}

// Yuno CRM (crm.yunoapp.eu: the page and its signup) has its own previews,
// rendered by scripts/og/crm.ts. Bump after re-rendering them.
const CRM_OG_VERSION = "1";

const CRM_OG_IMAGE_ALT: Record<LandingLang, string> = {
  en: "Yuno CRM — Know who comes to your nights, and bring them back. Plugged into Shotgun, 14-day trial, no card needed.",
  fr: "Yuno CRM — Sachez qui vient à vos soirées, et faites-les revenir. Branché à Shotgun, 14 jours d’essai sans carte.",
  es: "Yuno CRM — Sabe quién viene a tus fiestas, y haz que vuelvan. Conectado a Shotgun, 14 días de prueba sin tarjeta.",
};

// The full set: each tag replaces the root route's (the landing's preview),
// which otherwise leaks its secure_url and alt into the CRM pages.
export function crmOgImageUrl(lang: LandingLang): string {
  return `${CRM_ORIGIN}/og/crm-${lang}.png?v=${CRM_OG_VERSION}`;
}

export function crmOgImageMeta(lang: LandingLang) {
  return imageTags(crmOgImageUrl(lang), CRM_OG_IMAGE_ALT[lang]);
}

function imageTags(url: string, alt: string) {
  return [
    { property: "og:image", content: url },
    { property: "og:image:secure_url", content: url },
    { property: "og:image:type", content: "image/png" },
    { property: "og:image:width", content: "1200" },
    { property: "og:image:height", content: "630" },
    { property: "og:image:alt", content: alt },
    { name: "twitter:card", content: "summary_large_image" },
    { name: "twitter:image", content: url },
    { name: "twitter:image:alt", content: alt },
  ];
}
