import { Link } from "@tanstack/react-router";
import { cn } from "@/lib/utils";
import { usePricing } from "@/content/pricing";
import * as PricingCard from "@/components/pricing-card";
import { CheckCircle2 } from "lucide-react";

export function PricingGrid({ showFees = true }: { showFees?: boolean }) {
  const t = usePricing();
  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {t.plans.map((p) => (
          <PricingCard.Card
            key={p.name}
            className={cn(
              "w-full max-w-full",
              p.popular && "md:scale-[1.03] z-10"
            )}
          >
            <PricingCard.Header isPopular={p.popular}>
              <PricingCard.Plan>
                <PricingCard.PlanName>
                  <span>{p.name}</span>
                </PricingCard.PlanName>
                {p.popular && (
                  <PricingCard.Badge className="bg-accent text-accent-foreground border-accent/40">
                    {t.mostPopular}
                  </PricingCard.Badge>
                )}
                {p.comingSoon && (
                  <PricingCard.Badge className="bg-surface-2 text-muted-foreground border-border">
                    {t.comingSoonLabel}
                  </PricingCard.Badge>
                )}
              </PricingCard.Plan>
              <PricingCard.Price>
                <PricingCard.MainPrice className="font-medium">
                  {p.price}
                </PricingCard.MainPrice>
                <PricingCard.Period>{p.suffix}</PricingCard.Period>
              </PricingCard.Price>
              {p.annual && !p.comingSoon && (
                <p className="mb-3 text-[11px] font-medium text-accent">
                  {p.annual}
                </p>
              )}
              {p.comingSoon ? (
                <div
                  aria-disabled="true"
                  className="inline-flex h-9 w-full items-center justify-center rounded-lg px-4 py-2 text-sm font-medium bg-surface-2 text-muted-foreground cursor-not-allowed select-none"
                >
                  {t.comingSoonLabel}
                </div>
              ) : (
                <Link
                  to="/contact"
                  className={cn(
                    "inline-flex h-9 w-full items-center justify-center rounded-lg px-4 py-2 text-sm font-medium transition-colors",
                    p.popular
                      ? "bg-primary text-primary-foreground hover:bg-primary/90"
                      : "bg-surface-2 text-foreground hover:bg-surface-2/70"
                  )}
                >
                  {p.cta}
                </Link>
              )}
              <p className="mt-2 text-[11px] text-muted-foreground text-center">
                {t.cardNote}
              </p>
            </PricingCard.Header>

            <PricingCard.Body>
              <div className="space-y-5">
                {p.featureGroups.map((group) => (
                  <div key={group.label}>
                    <p className="text-[10px] font-medium uppercase tracking-[0.18em] text-muted-foreground mb-2.5">
                      {group.label}
                    </p>
                    <PricingCard.List>
                      {group.items.map((f) => (
                        <PricingCard.ListItem className="text-xs" key={f}>
                          <CheckCircle2 aria-hidden="true" className="size-4 text-accent shrink-0" />
                          <span>{f}</span>
                        </PricingCard.ListItem>
                      ))}
                    </PricingCard.List>
                  </div>
                ))}
              </div>
            </PricingCard.Body>
          </PricingCard.Card>
        ))}
      </div>
      {showFees && (
        <div className="mt-8 space-y-2 text-center text-xs text-muted-foreground">
          <p className="text-foreground/80">{t.annualLine}</p>
          <p>{t.fees}</p>
        </div>
      )}
    </>
  );
}
