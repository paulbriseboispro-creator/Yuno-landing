// Locale state for the bilingual (EN/FR) landing site.
//
// SSR-correct: the active locale is read from a cookie on the server during the
// initial render (via `detectLocale`), threaded through the root route context,
// and handed to <LocaleProvider> so the first paint already matches the visitor's
// language — no flash, no hydration mismatch. Switching language updates the
// cookie + React state instantly and invalidates the router so each route's
// head()/meta is recomputed for the new locale.
import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { useRouter } from "@tanstack/react-router";
import { createIsomorphicFn } from "@tanstack/react-start";
import { getCookie, getRequestHeader } from "@tanstack/react-start/server";

export const LOCALES = ["en", "fr"] as const;
export type Locale = (typeof LOCALES)[number];

export const DEFAULT_LOCALE: Locale = "en";
export const LOCALE_COOKIE = "yuno_locale";
const ONE_YEAR_SECONDS = 60 * 60 * 24 * 365;

export const LOCALE_LABELS: Record<Locale, string> = {
  en: "English",
  fr: "Français",
};

export function normalizeLocale(value: string | null | undefined): Locale {
  return value === "fr" ? "fr" : value === "en" ? "en" : DEFAULT_LOCALE;
}

function readCookieFromDocument(name: string): string | undefined {
  if (typeof document === "undefined") return undefined;
  const match = document.cookie.match(new RegExp("(?:^|; )" + name + "=([^;]*)"));
  return match ? decodeURIComponent(match[1]) : undefined;
}

// Picks our best-supported locale from an Accept-Language header
// (e.g. "fr-FR,fr;q=0.9,en;q=0.8"). Returns null when the header expresses no
// preference for a language we support, so the caller can fall back to the default.
function localeFromAcceptLanguage(header: string | null | undefined): Locale | null {
  if (!header) return null;
  const ranked = header
    .split(",")
    .map((part) => {
      const [tag, ...params] = part.trim().split(";");
      const qParam = params.find((p) => p.trim().startsWith("q="));
      const q = qParam ? Number.parseFloat(qParam.trim().slice(2)) : 1;
      return { lang: tag.trim().toLowerCase().split("-")[0], q: Number.isNaN(q) ? 1 : q };
    })
    .filter((p): p is { lang: Locale; q: number } => p.lang === "fr" || p.lang === "en")
    .sort((a, b) => b.q - a.q);
  return ranked.length ? ranked[0].lang : null;
}

// Resolves the active locale on both sides of the wire: the server reads the
// request cookie, the client (during client-side navigations) reads document.cookie.
// The `.server()` branch — and its server-only import — is stripped from the
// client bundle by the TanStack Start compiler.
export const detectLocale = createIsomorphicFn()
  .server(() => {
    // An explicit choice (cookie) always wins; otherwise honor the browser's
    // Accept-Language so a French visitor isn't greeted in English by default.
    const cookie = getCookie(LOCALE_COOKIE);
    if (cookie) return normalizeLocale(cookie);
    return localeFromAcceptLanguage(getRequestHeader("accept-language")) ?? DEFAULT_LOCALE;
  })
  .client(() => normalizeLocale(readCookieFromDocument(LOCALE_COOKIE)));

type LocaleContextValue = {
  locale: Locale;
  setLocale: (locale: Locale) => void;
};

const LocaleContext = createContext<LocaleContextValue>({
  locale: DEFAULT_LOCALE,
  setLocale: () => {},
});

export function LocaleProvider({
  initialLocale,
  children,
}: {
  initialLocale: Locale;
  children: ReactNode;
}) {
  const [locale, setLocaleState] = useState<Locale>(initialLocale);
  const router = useRouter();

  const setLocale = useCallback(
    (next: Locale) => {
      if (next === locale) return;
      setLocaleState(next);
      if (typeof document !== "undefined") {
        document.cookie = `${LOCALE_COOKIE}=${next}; path=/; max-age=${ONE_YEAR_SECONDS}; samesite=lax`;
        document.documentElement.lang = next;
      }
      // Re-run every route's head() so titles/meta/SEO follow the new language.
      void router.invalidate();
    },
    [locale, router],
  );

  const value = useMemo(() => ({ locale, setLocale }), [locale, setLocale]);

  return <LocaleContext.Provider value={value}>{children}</LocaleContext.Provider>;
}

export function useLocale(): Locale {
  return useContext(LocaleContext).locale;
}

export function useSetLocale(): (locale: Locale) => void {
  return useContext(LocaleContext).setLocale;
}

// Locale outside of the React tree (root error boundary, 404 shell). SSR-safe:
// returns the default on the server, the cookie value once on the client.
export function getStandaloneLocale(): Locale {
  return normalizeLocale(readCookieFromDocument(LOCALE_COOKIE));
}
