import { Check, X } from "lucide-react";
import { Reveal } from "@/components/site/Reveal";

const rows = [
  { label: "Ticket commission", shotgun: "10% — paid by you", yuno: "0% — paid by the customer" },
  { label: "200 tickets at €20", shotgun: "You lose €400", yuno: "You receive €4,000", highlight: true },
  { label: "Bank transfer fees", shotgun: "+3%", yuno: "Included" },
  { label: "Funds recovery", shotgun: "72h after the event", yuno: "Automatic at checkout" },
  { label: "Bar, floor plan, CRM", shotgun: false, yuno: true },
];

export function ShotgunComparison() {
  return (
    <section className="px-6 py-24 border-t border-border">
      <div className="mx-auto max-w-5xl">
        <Reveal className="mb-10 text-center">
          <span className="inline-block text-[10px] font-medium uppercase tracking-[0.18em] text-accent border border-accent/40 rounded-full px-3 py-1 mb-5">
            Industry reality check
          </span>
          <h2 className="text-3xl md:text-4xl font-medium tracking-tight text-balance max-w-[28ch] mx-auto leading-[1.1]">
            Your ticketing platform is your highest operating cost.{" "}
            <span className="serif italic text-muted-foreground">You just don't see it on an invoice.</span>
          </h2>
        </Reveal>

        <Reveal>
          <div className="rounded-3xl bg-surface ring-1 ring-border overflow-hidden">
            <div className="grid grid-cols-[1.2fr_1fr_1fr] text-sm">
              <div className="p-5 border-b border-border" />
              <div className="p-5 border-b border-l border-border text-center">
                <div className="text-[10px] uppercase tracking-[0.18em] text-muted-foreground mb-1">Industry standard</div>
                <div className="text-lg font-medium">Shotgun</div>
              </div>
              <div className="p-5 border-b border-l border-border text-center bg-accent/5">
                <div className="text-[10px] uppercase tracking-[0.18em] text-accent mb-1">Yuno</div>
                <div className="text-lg font-medium">Subscription only</div>
              </div>

              {rows.map((r) => (
                <div key={r.label} className="contents">
                  <div className={`p-5 border-t border-border ${r.highlight ? "font-medium" : "text-muted-foreground"}`}>
                    {r.label}
                  </div>
                  <div className="p-5 border-t border-l border-border text-center">
                    {typeof r.shotgun === "boolean" ? (
                      r.shotgun ? <Check className="inline size-5 text-muted-foreground" /> : <X className="inline size-5 text-muted-foreground/60" />
                    ) : (
                      <span className={r.highlight ? "text-foreground" : "text-muted-foreground"}>{r.shotgun}</span>
                    )}
                  </div>
                  <div className="p-5 border-t border-l border-border text-center bg-accent/5">
                    {typeof r.yuno === "boolean" ? (
                      r.yuno ? <Check className="inline size-5 text-accent" /> : <X className="inline size-5 text-muted-foreground/60" />
                    ) : (
                      <span className={r.highlight ? "text-accent font-medium" : "text-foreground"}>{r.yuno}</span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Reveal>

        <Reveal delay={0.1}>
          <p className="mt-8 text-center text-base md:text-lg text-muted-foreground max-w-[60ch] mx-auto text-pretty">
            Over a 20-night season: <span className="text-foreground font-medium">€8,000</span> paid to Shotgun in commission.{" "}
            <span className="text-foreground">A full year of Yuno Pro costs €828.</span>
          </p>
        </Reveal>
      </div>
    </section>
  );
}
