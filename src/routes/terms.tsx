import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/terms")({
  head: () => ({
    meta: [
      { title: "Terms of Service — Yuno" },
      {
        name: "description",
        content:
          "The terms governing use of the Yuno platform by clubs, organizers, promoters and their guests.",
      },
      { property: "og:title", content: "Terms of Service — Yuno" },
      {
        property: "og:description",
        content: "Terms governing use of the Yuno platform.",
      },
      { property: "og:url", content: "/terms" },
    ],
    links: [{ rel: "canonical", href: "/terms" }],
  }),
  component: TermsPage,
});

function TermsPage() {
  return (
    <section className="pt-24 pb-24 px-6">
      <div className="mx-auto max-w-3xl">
        <span className="inline-block text-xs font-medium uppercase tracking-[0.18em] text-accent border border-accent/40 rounded-full px-3 py-1 mb-6">
          Legal
        </span>
        <h1 className="text-4xl md:text-5xl font-medium tracking-tight text-balance mb-4">
          Terms of Service
        </h1>
        <p className="text-sm text-muted-foreground mb-10">
          Last updated: June 9, 2026
        </p>

        <div className="rounded-2xl bg-surface ring-1 ring-border p-6 md:p-8 mb-10">
          <p className="text-sm text-muted-foreground leading-relaxed">
            <strong className="text-foreground">This is a placeholder document.</strong>{" "}
            The final, lawyer-reviewed Terms of Service are on the way. For any question
            in the meantime, contact{" "}
            <a className="text-accent hover:underline" href="mailto:contact@yunoapp.eu">
              contact@yunoapp.eu
            </a>
            .
          </p>
        </div>

        <div className="space-y-8 text-sm text-muted-foreground leading-relaxed">
          <div>
            <h2 className="text-xl font-medium text-foreground tracking-tight mb-2">
              Using Yuno
            </h2>
            <p>
              By creating an account you agree to operate within the platform's intended
              use: hosting and operating nightlife events, processing ticket sales and
              bar / VIP transactions in compliance with local law.
            </p>
          </div>
          <div>
            <h2 className="text-xl font-medium text-foreground tracking-tight mb-2">
              Fees & payments
            </h2>
            <p>
              Plan and transactional fees are described on the{" "}
              <a className="text-accent hover:underline" href="/pricing">
                Pricing page
              </a>
              . Payments are processed through Stripe Connect; each connected account is
              bound by Stripe's own terms.
            </p>
          </div>
          <div>
            <h2 className="text-xl font-medium text-foreground tracking-tight mb-2">
              Liability
            </h2>
            <p>
              Yuno provides the platform "as is" while we finalize service-level
              commitments. Operators remain responsible for ticket validity, capacity
              enforcement and on-site decisions.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
