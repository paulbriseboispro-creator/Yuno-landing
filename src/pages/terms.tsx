import { useLegal } from "@/content/legal";

// Shared by /terms and /fr/terms (see pages/privacy.tsx for why it lives here).
export function TermsPage() {
  const t = useLegal().terms;
  // The "Fees & payments" body links to the pricing page. Split its body around
  // the localized link label so the <a> can be wired inline.
  const [feesBefore, feesAfter] = t.sections[1].body.split(t.pricingLink);
  return (
    <section className="pt-24 pb-24 px-6">
      <div className="mx-auto max-w-3xl">
        <span className="inline-block text-xs font-medium uppercase tracking-[0.18em] text-accent border border-accent/40 rounded-full px-3 py-1 mb-6">
          {t.badge}
        </span>
        <h1 className="text-4xl md:text-5xl font-medium tracking-tight text-balance mb-4">
          {t.heading}
        </h1>
        <p className="text-sm text-muted-foreground mb-10">
          {t.lastUpdated}
        </p>

        <div className="rounded-2xl bg-surface ring-1 ring-border p-6 md:p-8 mb-10">
          <p className="text-sm text-muted-foreground leading-relaxed">
            <strong className="text-foreground">{t.placeholder}</strong>{" "}
            {t.notice}{" "}
            <a className="text-accent hover:underline" href="mailto:contact@yunoapp.eu">
              contact@yunoapp.eu
            </a>
            .
          </p>
        </div>

        <div className="space-y-8 text-sm text-muted-foreground leading-relaxed">
          <div>
            <h2 className="text-xl font-medium text-foreground tracking-tight mb-2">
              {t.sections[0].title}
            </h2>
            <p>{t.sections[0].body}</p>
          </div>
          <div>
            <h2 className="text-xl font-medium text-foreground tracking-tight mb-2">
              {t.sections[1].title}
            </h2>
            <p>
              {feesBefore}
              <a className="text-accent hover:underline" href="/pricing">
                {t.pricingLink}
              </a>
              {feesAfter}
            </p>
          </div>
          <div>
            <h2 className="text-xl font-medium text-foreground tracking-tight mb-2">
              {t.sections[2].title}
            </h2>
            <p>{t.sections[2].body}</p>
          </div>
        </div>
      </div>
    </section>
  );
}
