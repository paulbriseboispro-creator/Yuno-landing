import { useLegal } from "@/content/legal";
import { useLocale } from "@/i18n/locale";
import { LegalLayout } from "@/pages/legal-layout";

// Shared by /terms and /fr/terms (see pages/privacy.tsx for why it lives here).
export function TermsPage() {
  const t = useLegal().terms;
  const lang = useLocale();
  // The "Fees & payments" body links to the pricing page. Split its body around
  // the localized link label so the <a> can be wired inline.
  const [feesBefore, feesAfter] = t.sections[1].body.split(t.pricingLink);
  return (
    <LegalLayout lang={lang} path="/terms" t={t}>
      <div>
        <h2 className="yl-h3 mb-2 text-xl text-zinc-950">{t.sections[0].title}</h2>
        <p>{t.sections[0].body}</p>
      </div>
      <div>
        <h2 className="yl-h3 mb-2 text-xl text-zinc-950">{t.sections[1].title}</h2>
        <p>
          {feesBefore}
          <a
            className="text-zinc-950 underline decoration-zinc-300 underline-offset-4 hover:decoration-zinc-950"
            href={lang === "fr" ? "/fr/pricing" : "/pricing"}
          >
            {t.pricingLink}
          </a>
          {feesAfter}
        </p>
      </div>
      <div>
        <h2 className="yl-h3 mb-2 text-xl text-zinc-950">{t.sections[2].title}</h2>
        <p>{t.sections[2].body}</p>
      </div>
    </LegalLayout>
  );
}
