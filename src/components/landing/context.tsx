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
import type { LandingLang } from "@/i18n/landing-lang";

export type SignupRole = "club" | "organizer" | "promoter" | "other";

type SignupState = { open: boolean; role?: SignupRole; email?: string };

export type LandingTheme = "light" | "dark";

type LandingCtx = {
  lang: LandingLang;
  theme: LandingTheme;
  /** Switches theme; `origin` (viewport px) centres the circular reveal. */
  toggleTheme: (origin?: { x: number; y: number }) => void;
  t: LandingContent;
  signup: SignupState;
  openSignup: (opts?: { role?: SignupRole; email?: string }) => void;
  closeSignup: () => void;
};

const Ctx = createContext<LandingCtx | null>(null);

// WhatsApp is the "talk to the founder" channel: instant, no form.
export const WHATSAPP_NUMBER = "33644216689";
export const APP_URL = "https://yunoapp.eu";
// "Log in" goes to the app's login screen, not its consumer home.
export const LOGIN_URL = `${APP_URL}/auth`;

export function LandingProvider({ lang, children }: { lang: LandingLang; children: ReactNode }) {
  const [signup, setSignup] = useState<SignupState>({ open: false });
  const openSignup = useCallback(
    (opts?: { role?: SignupRole; email?: string }) => setSignup({ open: true, ...opts }),
    [],
  );
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
      signup,
      openSignup,
      closeSignup,
    }),
    [lang, theme, toggleTheme, signup, openSignup, closeSignup],
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
