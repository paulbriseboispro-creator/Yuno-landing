import { useEffect } from "react";
import { crmContent } from "@/content/crm";
import type { LandingLang } from "@/i18n/landing-lang";
import { CRM_PATHS } from "@/i18n/landing-lang";
import { crmStartHref } from "@/i18n/start";
import { LandingProvider } from "@/components/landing/context";
import { CrmNav } from "@/components/crm/Nav";
import { CrmHero } from "@/components/crm/Hero";
import { CrmProof } from "@/components/crm/Proof";
import { CrmProblem } from "@/components/crm/Problem";
import { CrmNight } from "@/components/crm/Night";
import { CrmSteps } from "@/components/crm/Steps";
import { CrmEngine } from "@/components/crm/Engine";
import { CrmChannels } from "@/components/crm/Channels";
import { CrmMcp } from "@/components/crm/Mcp";
import { CrmCompare } from "@/components/crm/Compare";
import { CrmBento } from "@/components/crm/Bento";
import { CrmPricing } from "@/components/crm/Pricing";
import { CrmFaq, CrmFinal, CrmMobileBar } from "@/components/crm/Closing";

// Yuno CRM ("/crm", "/fr/crm", "/es/crm"): for clubs and organizers who keep
// their ticketing (Shotgun first). The Insyder landing grammar rebuilt on the
// Yuno design system (src/styles/crm.css, Claude Design "Design system Yuno
// créé"); every CTA leads to the CRM signup funnel (/start?product=crm, see
// components/crm/signup/CrmSignup.tsx), which opens a CRM Console with its 14-day trial.
// Order: hero + live Console → profiles → problem → night block (features) →
// 2-minute steps → smart marketing (automations, channels, analytics) → your AI through MCP → ticketing vs Yuno → bento → sending
// (one counter) → pricing → FAQ → close.
export function CrmPage({ lang }: { lang: LandingLang }) {
  const c = crmContent[lang];
  return (
    <LandingProvider
      lang={lang}
      langHrefs={CRM_PATHS}
      home={CRM_PATHS[lang]}
      whatsappMessage={c.whatsappMessage}
    >
      <div className="ycrm min-h-screen overflow-x-clip">
        <CrmNav />
        <main>
          <CrmHero />
          <CrmProof />
          <CrmProblem />
          <CrmNight />
          <CrmSteps />
          <CrmEngine />
          <CrmMcp />
          <CrmCompare />
          <CrmBento />
          <CrmChannels />
          <CrmPricing />
          <CrmFaq />
        </main>
        <CrmFinal />
        <CrmMobileBar />
        <OpenFromHash lang={lang} />
      </div>
    </LandingProvider>
  );
}

// "…/crm#signup" (bio, DM, email signature) goes straight to the signup funnel.
function OpenFromHash({ lang }: { lang: LandingLang }) {
  useEffect(() => {
    if (window.location.hash === "#signup") window.location.replace(crmStartHref(lang));
  }, [lang]);
  return null;
}
