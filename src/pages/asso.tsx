import { useEffect } from "react";
import { assoContent } from "@/content/asso";
import type { LandingLang } from "@/i18n/landing-lang";
import { ASSO_PATHS } from "@/i18n/asso";
import { LandingProvider, useLanding } from "@/components/landing/context";
import { LandingNav } from "@/components/landing/Nav";
import { Problem } from "@/components/landing/Stats";
import { Faq } from "@/components/landing/Pricing";
import { MobileCta } from "@/components/landing/Closing";
import { SignupModal } from "@/components/landing/SignupModal";
import { AssoHero } from "@/components/asso/Hero";
import {
  AssoClub,
  AssoFeatures,
  AssoHow,
  AssoShowcase,
  AssoStats,
} from "@/components/asso/Sections";
import { AssoPricing, AssoSwitch } from "@/components/asso/Pricing";
import { AssoFinal, AssoFooter } from "@/components/asso/Closing";

// The student-association landing ("/fr/associations", "/associations",
// "/es/asociaciones"): the main landing's look, a story of its own (price for
// students, private nights, the club deal, the committee handover) and a
// self-serve account — every CTA opens the association signup (SignupFlow with
// audience="asso"). Never linked from the main landing, which stays club /
// organizer only. Section order: promise → numbers → problem → features →
// club nights → how → back-office → pricing → vs tools → FAQ → close.
export function AssoPage({ lang }: { lang: LandingLang }) {
  const c = assoContent[lang];
  return (
    <LandingProvider
      lang={lang}
      langHrefs={ASSO_PATHS}
      home={ASSO_PATHS[lang]}
      whatsappMessage={c.whatsappMessage}
    >
      <div className="yl min-h-screen overflow-x-clip">
        <LandingNav links={c.nav.links} cta={c.nav.cta} />
        <main>
          <AssoHero />
          <AssoStats />
          <Problem content={c.problem} />
          <AssoFeatures />
          <AssoClub />
          <AssoHow />
          <AssoShowcase />
          <AssoPricing />
          <AssoSwitch />
          <Faq eyebrow={c.faq.eyebrow} title={c.faq.title} items={c.faq.items} />
          <AssoFinal />
        </main>
        <AssoFooter />
        <MobileCta label={c.mobileCta} />
        <SignupModal audience="asso" source="asso" assoCopy={c.signup} />
        <OpenFromHash />
      </div>
    </LandingProvider>
  );
}

// "…/associations#signup" opens the signup straight away: the link to drop in
// a DM, a group chat or an Instagram bio.
function OpenFromHash() {
  const { openSignup } = useLanding();
  useEffect(() => {
    if (window.location.hash === "#signup") openSignup();
  }, [openSignup]);
  return null;
}
