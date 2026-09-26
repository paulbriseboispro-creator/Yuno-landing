import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { landingContent, type LandingContent } from "@/content/landing";
import { LANDING_PATHS, type LandingLang } from "@/i18n/landing-lang";

export type SignupRole = "club" | "organizer" | "promoter" | "other";

type SignupState = { open: boolean; role?: SignupRole; email?: string; orgName?: string };
type SignupOpts = { role?: SignupRole; email?: string; orgName?: string };

export type LandingTheme = "light" | "dark";

type LandingCtx = {
  lang: LandingLang;
  theme: LandingTheme;
  /** Switches theme; `origin` (viewport px) centres the circular reveal. */
  toggleTheme: (origin?: { x: number; y: number }) => void;
  t: LandingContent;
  // Where each language switcher entry points. The landing uses the landing
  // paths; a page that exists in fewer languages (the comparison pages) maps
  // its own twins and falls back to the landing for the rest.
  langHref: (l: LandingLang) => string;
  // Resolves an in-page anchor ("#pricing") from the landing's nav/footer copy
  // to a link that works on any page using this chrome.
  anchor: (href: string) => string;
  // Where the logo leads: the landing, or the page itself for a standalone
  // landing (the student-association page keeps visitors in its own funnel).
  home: string;
  // Prefilled "talk to the founder" WhatsApp message of this page.
  whatsappMessage: string;
  signup: SignupState;
  openSignup: (opts?: SignupOpts) => void;
  closeSignup: () => void;
};

const Ctx = createContext<LandingCtx | null>(null);

// WhatsApp is the "talk to the founder" channel: instant, no form.
export const WHATSAPP_NUMBER = "33644216689";
export const APP_URL = "https://yunoapp.eu";
// "Log in" goes to the app's login screen, not its consumer home.
export const LOGIN_URL = `${APP_URL}/auth`;

export function LandingProvider({
  lang,
  langHrefs,
  home,
  whatsappMessage,
  children,
}: {
  lang: LandingLang;
  // Set on pages other than the landing itself.
  langHrefs?: Partial<Record<LandingLang, string>>;
  // Set on a standalone landing: its own path, so the logo and the "#section"
  // links of its nav/footer stay on the page.
  home?: string;
  whatsappMessage?: string;
  children: ReactNode;
}) {
  const [signup, setSignup] = useState<SignupState>({ open: false });
  const openSignup = useCallback((opts?: SignupOpts) => setSignup({ open: true, ...opts }), []);
  const closeSignup = useCallback(() => setSignup((s) => ({ ...s, open: false })), []);

  // Light by default; the pre-paint script in __root applies a saved "dark".
  const [theme, setTheme] = useState<LandingTheme>("light");
  useEffect(() => {
    if (document.documentElement.getAttribute("data-yl-theme") === "dark") setTheme("dark");
  }, []);
  const toggleTheme = useCallback(
    (origin?: { x: number; y: number }) => {
      const next: LandingTheme = theme === "dark" ? "light" : "dark";
      const apply = () => {
        const root = document.documentElement;
        if (next === "dark") root.setAttribute("data-yl-theme", "dark");
        else root.removeAttribute("data-yl-theme");
        setTheme(next);
      };
      try {
        localStorage.setItem("yl-theme", next);
      } catch {
        // private mode: the choice just won't persist
      }
      const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      const doc = document as Document & {
        startViewTransition?: (cb: () => void) => { ready: Promise<void> };
      };
      if (!doc.startViewTransition || reduce) {
        apply();
        return;
      }
      const x = origin?.x ?? window.innerWidth / 2;
      const y = origin?.y ?? 0;
      const r = Math.hypot(Math.max(x, window.innerWidth - x), Math.max(y, window.innerHeight - y));
      doc.startViewTransition(apply).ready.then(() => {
        document.documentElement.animate(
          { clipPath: [`circle(0px at ${x}px ${y}px)`, `circle(${r}px at ${x}px ${y}px)`] },
          {
            duration: 550,
            easing: "cubic-bezier(0.22, 1, 0.36, 1)",
            pseudoElement: "::view-transition-new(root)",
          },
        );
      });
    },
    [theme],
  );

  const value = useMemo(
    () => ({
      lang,
      t: landingContent[lang],
      theme,
      toggleTheme,
      langHref: (l: LandingLang) => langHrefs?.[l] ?? LANDING_PATHS[l],
      anchor: (href: string) =>
        langHrefs && !home && href.startsWith("#") ? LANDING_PATHS[lang] + href : href,
      home: home ?? LANDING_PATHS[lang],
      whatsappMessage: whatsappMessage ?? landingContent[lang].whatsappMessage,
      signup,
      openSignup,
      closeSignup,
    }),
    [lang, theme, toggleTheme, langHrefs, home, whatsappMessage, signup, openSignup, closeSignup],
  );
  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}

export function useLanding(): LandingCtx {
  const v = useContext(Ctx);
  if (!v) throw new Error("useLanding must be used inside <LandingProvider>");
  return v;
}

export function whatsappHref(message: string): string {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}
