import type { ReactNode } from "react";
import { LANDING_PATHS, type LandingLang } from "@/i18n/landing-lang";
import { LandingProvider } from "./context";
import { LandingNav } from "./Nav";
import { LandingFooter, MobileCta } from "./Closing";
import { SignupModal } from "./SignupModal";

// The landing's light chrome (nav, footer, signup dialog) around a plain page:
// contact and the legal pages. These exist in English and French only, so the
// Spanish entry of the language switcher falls back to the Spanish landing.
export function LandingShell({
  lang,
  path,
  children,
}: {
  lang: "en" | "fr";
  // The page's English path ("/contact"); the French one is "/fr" + path.
  // Without it (404), the language switcher points to the landing.
  path?: string;
  children: ReactNode;
}) {
  // Passing hrefs also points the nav's and footer's "#section" anchors to the
  // landing (they would go nowhere on this page).
  const langHrefs: Partial<Record<LandingLang, string>> = path
    ? { en: path, fr: `/fr${path}` }
    : { ...LANDING_PATHS };
  return (
    <LandingProvider lang={lang} langHrefs={langHrefs}>
      <div className="yl min-h-screen overflow-x-clip">
        <LandingNav />
        <main>{children}</main>
        <LandingFooter />
        <MobileCta />
        <SignupModal />
      </div>
    </LandingProvider>
  );
}
