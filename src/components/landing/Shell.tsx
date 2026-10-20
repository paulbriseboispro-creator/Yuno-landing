import type { ReactNode } from "react";
import type { LandingLang } from "@/i18n/landing-lang";
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
  path: string;
  children: ReactNode;
}) {
  const langHrefs: Partial<Record<LandingLang, string>> = { en: path, fr: `/fr${path}` };
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
