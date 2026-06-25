// Per-page SEO for the bilingual site. English lives at the root path
// ("/clubs"), French under a "/fr" prefix ("/fr/clubs"). Each page emits an
// absolute self-referencing canonical plus hreflang alternates (en, fr and
// x-default → en) so Google can index both languages as distinct URLs instead
// of a single cookie-switched one.
import type { Locale } from "@/i18n/locale";

export const SITE_ORIGIN = "https://landing.yunoapp.eu";

// Maps a canonical (English) base path to the URL path for a given locale.
// base is always the English path: "/" , "/clubs", "/pricing"…
export function localePath(base: string, locale: Locale): string {
  if (locale !== "fr") return base;
  return base === "/" ? "/fr" : `/fr${base}`;
}

export function localeUrl(base: string, locale: Locale): string {
  return SITE_ORIGIN + localePath(base, locale);
}

type PageMeta = {
  title: string;
  description: string;
  ogTitle?: string;
  ogDescription?: string;
};

// The key is React's camelCase `hrefLang` (React 19 manages the <head> on the
// client and rejects the lowercase `hreflang` as an invalid DOM property).
// HTML attribute names are case-insensitive, so crawlers read it as `hreflang`.
type HeadLink =
  | { rel: "canonical"; href: string }
  | { rel: "alternate"; hrefLang: string; href: string };

type HeadMeta =
  | { title: string }
  | { name: string; content: string }
  | { property: string; content: string };

// Builds the title/description/og + canonical + hreflang block shared by every
// page route (the same call works for the EN route and its /fr twin — the URLs
// are derived from `base` and the active `locale`).
export function pageSeo(
  base: string,
  locale: Locale,
  m: PageMeta,
): { meta: HeadMeta[]; links: HeadLink[] } {
  const self = localeUrl(base, locale);
  return {
    meta: [
      { title: m.title },
      { name: "description", content: m.description },
      { property: "og:title", content: m.ogTitle ?? m.title },
      { property: "og:description", content: m.ogDescription ?? m.description },
      { property: "og:url", content: self },
    ],
    links: [
      { rel: "canonical", href: self },
      { rel: "alternate", hrefLang: "en", href: localeUrl(base, "en") },
      { rel: "alternate", hrefLang: "fr", href: localeUrl(base, "fr") },
      { rel: "alternate", hrefLang: "x-default", href: localeUrl(base, "en") },
    ],
  };
}
