import { Link } from "@tanstack/react-router";
import { usePricing } from "@/content/pricing";
import { CheckCircle2, Sparkles } from "lucide-react";

// Launch-period pricing card. Replaces <PricingGrid /> while club subscriptions
// are switched off in the app (SUBSCRIPTIONS_ENABLED=false): one offer, every
// feature, €0. The paid plan grid stays in the codebase for when billing returns.
export function LaunchOfferCard({ showFees = true }: { showFees?: boolean }) {
  const t = usePricing();
  const l = t.page.launch;
  return (
    <>
      <div className="mx-auto max-w-3xl rounded-3xl bg-surface ring-1 ring-accent/40 p-8 md:p-10 relative overflow-hidden">
        <div className="absolute -inset-x-20 -top-32 h-64 bg-[radial-gradient(ellipse_at_center,color-mix(in_oklab,var(--accent)_18%,transparent),transparent_70%)] pointer-events-none" />
        <div className="relative z-10">
          <div className="flex items-center gap-2 mb-4">
            <Sparkles className="size-4 text-accent" />
            <span className="text-[10px] font-medium uppercase tracking-[0.18em] text-accent border border-accent/40 rounded-full px-2 py-0.5">
              {l.badge}
            </span>
          </div>
          <div className="flex flex-wrap items-baseline gap-x-4 gap-y-1 mb-3">
            <h2 className="text-2xl md:text-3xl font-medium tracking-tight">{l.title}</h2>
            <span className="text-3xl md:text-4xl font-semibold text-accent">€0</span>
          </div>
          <p className="text-sm text-muted-foreground max-w-[62ch] text-pretty mb-6">
            {l.body}
          </p>
          <ul className="grid sm:grid-cols-2 gap-x-6 gap-y-2 mb-7">
            {l.included.map((f) => (
              <li key={f} className="flex items-start gap-2 text-sm text-muted-foreground">
                <CheckCircle2 aria-hidden="true" className="size-4 text-accent shrink-0 mt-0.5" />
                <span>{f}</span>
              </li>
            ))}
          </ul>
          <Link
            to="/contact"
            className="inline-flex h-10 items-center justify-center rounded-full px-6 text-sm font-semibold bg-accent text-accent-foreground hover:brightness-110 transition-all"
          >
            {l.cta}
          </Link>
          <p className="mt-3 text-[11px] text-muted-foreground">{l.note}</p>
        </div>
      </div>
      {showFees && (
        <div className="mt-8 text-center text-xs text-muted-foreground">
          <p>{t.fees}</p>
        </div>
      )}
    </>
  );
}
