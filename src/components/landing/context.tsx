import { createContext, useCallback, useContext, useMemo, useState, type ReactNode } from "react";
import { landingContent, type LandingContent } from "@/content/landing";
import type { LandingLang } from "@/i18n/landing-lang";

export type SignupRole = "club" | "organizer" | "promoter" | "other";

type SignupState = { open: boolean; role?: SignupRole; email?: string };

type LandingCtx = {
  lang: LandingLang;
  t: LandingContent;
  signup: SignupState;
  openSignup: (opts?: { role?: SignupRole; email?: string }) => void;
  closeSignup: () => void;
};

const Ctx = createContext<LandingCtx | null>(null);

// WhatsApp is the "talk to the founder" channel: instant, no form.
export const WHATSAPP_NUMBER = "33644216689";
export const APP_URL = "https://yunoapp.eu";

export function LandingProvider({ lang, children }: { lang: LandingLang; children: ReactNode }) {
  const [signup, setSignup] = useState<SignupState>({ open: false });
  const openSignup = useCallback(
    (opts?: { role?: SignupRole; email?: string }) => setSignup({ open: true, ...opts }),
    [],
  );
  const closeSignup = useCallback(() => setSignup((s) => ({ ...s, open: false })), []);
  const value = useMemo(
    () => ({ lang, t: landingContent[lang], signup, openSignup, closeSignup }),
    [lang, signup, openSignup, closeSignup],
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
