import { useEffect } from "react";
import { crmContent } from "@/content/crm";
import type { LandingLang } from "@/i18n/landing-lang";
import { CRM_PATHS } from "@/i18n/crm";
import { LandingProvider, useLanding } from "@/components/landing/context";
import { LandingNav } from "@/components/landing/Nav";
import { Problem } from "@/components/landing/Stats";
import { Faq } from "@/components/landing/Pricing";
import { LandingFooter, MobileCta } from "@/components/landing/Closing";
import { SignupModal } from "@/components/landing/SignupModal";
import { CrmHero } from "@/components/crm/Hero";
import { CrmFeatures, CrmHow, CrmStats } from "@/components/crm/Sections";
import { CrmPricing } from "@/components/crm/Pricing";
import { CrmFinal } from "@/components/crm/Closing";

// Yuno CRM ("/crm", "/fr/crm", "/es/crm"): for organizers and clubs who keep
// their ticketing (Shotgun first). The main landing's look, its own story and
// its own paid pricing; every CTA opens the CRM signup (SignupFlow
// product="crm"), which opens a CRM Console with a 14-day Pro trial.
// Section order: promise → facts → problem → how → features → pricing → FAQ → close.
export function CrmPage({ lang }: { lang: LandingLang }) {
  const c = crmContent[lang];
  return (
    <LandingProvider
      lang={lang}
      langHrefs={CRM_PATHS}
      home={CRM_PATHS[lang]}
      whatsappMessage={c.whatsappMessage}
    >
      <div className="yl min-h-screen overflow-x-clip">
        <LandingNav links={c.nav.links} cta={c.nav.cta} />
        <main>
          <CrmHero />
          <CrmStats />
          <Problem content={c.problem} />
          <CrmHow />
          <CrmFeatures />
          <CrmPricing />
          <Faq eyebrow={c.faq.eyebrow} title={c.faq.title} items={c.faq.items} />
          <CrmFinal />
        </main>
        <LandingFooter />
        <MobileCta label={c.mobileCta} />
        <SignupModal product="crm" source="crm" crmCopy={c.signup} />
        <OpenFromHash />
      </div>
    </LandingProvider>
  );
}

// "…/crm#signup" opens the signup straight away (bio, DM, email signature).
function OpenFromHash() {
  const { openSignup } = useLanding();
  useEffect(() => {
    if (window.location.hash === "#signup") openSignup();
  }, [openSignup]);
  return null;
}
