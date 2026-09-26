// Languages of the main landing ("/", "/fr", "/es"). The rest of the site is
// EN/FR only (see locale.tsx); the landing adds Spanish for the Madrid market.
// The URL is the source of truth; the shared `yuno_locale` cookie only remembers
// an explicit pick so "/" can send a returning visitor to their language.
import { createIsomorphicFn } from "@tanstack/react-start";
import { getCookie, getRequestHeader } from "@tanstack/react-start/server";
import { LOCALE_COOKIE } from "@/i18n/locale";
import { SITE_ORIGIN } from "@/i18n/seo";

export const LANDING_LANGS = ["en", "fr", "es"] as const;
export type LandingLang = (typeof LANDING_LANGS)[number];

export const LANDING_PATHS: Record<LandingLang, string> = {
  en: "/",
  fr: "/fr",
  es: "/es",
};

export const LANDING_LANG_LABELS: Record<LandingLang, string> = {
  en: "English",
  fr: "Français",
  es: "Español",
};

export const INTL_LOCALE: Record<LandingLang, string> = {
  en: "en-IE",
  fr: "fr-FR",
  es: "es-ES",
};

function isLang(v: string | undefined | null): v is LandingLang {
  return v === "en" || v === "fr" || v === "es";
}

function fromAcceptLanguage(header: string | null | undefined): LandingLang | null {
  if (!header) return null;
  const ranked = header
    .split(",")
    .map((part) => {
      const [tag, ...params] = part.trim().split(";");
      const qParam = params.find((p) => p.trim().startsWith("q="));
      const q = qParam ? Number.parseFloat(qParam.trim().slice(2)) : 1;
      return { lang: tag.trim().toLowerCase().split("-")[0], q: Number.isNaN(q) ? 1 : q };
    })
    .filter((p): p is { lang: LandingLang; q: number } => isLang(p.lang))
    .sort((a, b) => b.q - a.q);
  return ranked.length ? ranked[0].lang : null;
}

// Preferred landing language for a visitor hitting "/": explicit cookie first,
// then the browser's Accept-Language, else English.
export const detectLandingLang = createIsomorphicFn()
  .server((): LandingLang => {
    const cookie = getCookie(LOCALE_COOKIE);
    if (isLang(cookie)) return cookie;
    return fromAcceptLanguage(getRequestHeader("accept-language")) ?? "en";
  })
  .client((): LandingLang => {
    const match = document.cookie.match(new RegExp("(?:^|; )" + LOCALE_COOKIE + "=([^;]*)"));
    const v = match ? decodeURIComponent(match[1]) : undefined;
    return isLang(v) ? v : "en";
  });

export function rememberLandingLang(lang: LandingLang) {
  if (typeof document === "undefined") return;
  document.cookie = `${LOCALE_COOKIE}=${lang}; path=/; max-age=${60 * 60 * 24 * 365}; samesite=lax`;
}

// The student-association landing (src/pages/asso.tsx), one path per language.
export const ASSO_PATHS: Record<LandingLang, string> = {
  en: "/associations",
  fr: "/fr/associations",
  es: "/es/asociaciones",
};

// The landing surface: light, chrome-less (it brings its own nav and footer).
// Includes the pro signup pages ("/start", "/fr/start", "/es/start") and the
// student-association landing.
export function isLandingPath(pathname: string): boolean {
  const p = pathname.length > 1 ? pathname.replace(/\/$/, "") : pathname;
  if (p === "/start" || p === "/fr/start" || p === "/es/start") return true;
  if (LANDING_LANGS.some((l) => ASSO_PATHS[l] === p)) return true;
  return (
    pathname === "/" ||
    pathname === "/fr" ||
    pathname === "/fr/" ||
    pathname === "/es" ||
    pathname === "/es/"
  );
}

export function landingUrl(lang: LandingLang): string {
  return SITE_ORIGIN + (lang === "en" ? "/" : LANDING_PATHS[lang]);
}
