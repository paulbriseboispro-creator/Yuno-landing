import { createContext, useCallback, useContext, useMemo, useState, type ReactNode } from "react";
import { landingContent, type LandingContent } from "@/content/landing";
import { LANDING_PATHS, type LandingLang } from "@/i18n/landing-lang";

export type SignupRole = "club" | "organizer" | "promoter" | "other";

type SignupState = { open: boolean; role?: SignupRole; email?: string };

type LandingCtx = {
  lang: LandingLang;
  t: LandingContent;
  // Where each language switcher entry points. The landing uses the landing
  // paths; a page that exists in fewer languages (the comparison pages) maps
  // its own twins and falls back to the landing for the rest.
  langHref: (l: LandingLang) => string;
  // Resolves an in-page anchor ("#pricing") from the landing's nav/footer copy
  // to a link that works on any page using this chrome.
  anchor: (href: string) => string;
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

export function LandingProvider({
  lang,
  langHrefs,
  children,
}: {
  lang: LandingLang;
  // Set on pages other than the landing itself.
  langHrefs?: Partial<Record<LandingLang, string>>;
  children: ReactNode;
}) {
  const [signup, setSignup] = useState<SignupState>({ open: false });
  const openSignup = useCallback(
    (opts?: { role?: SignupRole; email?: string }) => setSignup({ open: true, ...opts }),
    [],
  );
  const closeSignup = useCallback(() => setSignup((s) => ({ ...s, open: false })), []);
  const value = useMemo(
    () => ({
      lang,
      t: landingContent[lang],
      langHref: (l: LandingLang) => langHrefs?.[l] ?? LANDING_PATHS[l],
      anchor: (href: string) =>
        langHrefs && href.startsWith("#") ? LANDING_PATHS[lang] + href : href,
      signup,
      openSignup,
      closeSignup,
    }),
    [lang, langHrefs, signup, openSignup, closeSignup],
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
