// Link-preview image tags (WhatsApp, iMessage, LinkedIn, Slack, X…). The PNGs
// live in public/og/ and are rendered from the landing hero copy by
// scripts/og/render.ts (`bun run og`). Kept out of the landing copy module so
// the root route can use it on every page without pulling in landing.ts.
import type { LandingLang } from "@/i18n/landing-lang";
import { SITE_ORIGIN } from "@/i18n/seo";

// Bump after re-rendering the images: WhatsApp, LinkedIn and Facebook cache
// previews per image URL, so a new query string forces a refetch.
const OG_VERSION = "2";

const OG_IMAGE_ALT: Record<LandingLang, string> = {
  en: "Yuno — Sell your nights. Keep your customers. The Yuno club dashboard.",
  fr: "Yuno — Vendez vos soirées. Gardez vos clients. Le tableau de bord club de Yuno.",
  es: "Yuno — Vende tus noches. Quédate con tus clientes. El panel de discoteca de Yuno.",
};

export function ogImageUrl(lang: LandingLang): string {
  return `${SITE_ORIGIN}/og/landing-${lang}.png?v=${OG_VERSION}`;
}

// Order matters for strict Open Graph parsers: og:image first, then its
// structured properties.
export function ogImageMeta(lang: LandingLang) {
  const url = ogImageUrl(lang);
  const alt = OG_IMAGE_ALT[lang];
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
