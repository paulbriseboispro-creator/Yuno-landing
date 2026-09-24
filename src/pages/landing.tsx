import type { LandingLang } from "@/i18n/landing-lang";
import { LandingProvider } from "@/components/landing/context";
import { LandingNav } from "@/components/landing/Nav";
import { Hero } from "@/components/landing/Hero";
import { Problem, Stats } from "@/components/landing/Stats";
import { Pillars } from "@/components/landing/Pillars";
import { Solutions } from "@/components/landing/Solutions";
import { Timeline } from "@/components/landing/Timeline";
import { Money } from "@/components/landing/Money";
import { Compare } from "@/components/landing/Compare";
import { Email } from "@/components/landing/Email";
import { Showcase } from "@/components/landing/Showcase";
import { Faq, Pricing } from "@/components/landing/Pricing";
import { FinalCta, LandingFooter, MobileCta } from "@/components/landing/Closing";
import { SignupModal } from "@/components/landing/SignupModal";

// The main landing ("/", "/fr", "/es"): one page that explains what Yuno is in
// five seconds and converts straight into a pro-account request. Section order
// follows the sales story: promise → why → problem → product → who it's for →
// how a night runs → money → vs competitors → CRM proof → back-office →
// pricing → FAQ → close.
export function LandingPage({ lang }: { lang: LandingLang }) {
  return (
    <LandingProvider lang={lang}>
      <div className="yl min-h-screen overflow-x-clip">
        <LandingNav />
        <main>
          <Hero />
          <Stats />
          <Problem />
          <Pillars />
          <Solutions />
          <Timeline />
          <Money />
          <Compare />
          <Email />
          <Showcase />
          <Pricing />
          <Faq />
          <FinalCta />
        </main>
        <LandingFooter />
        <MobileCta />
        <SignupModal />
      </div>
    </LandingProvider>
  );
}
