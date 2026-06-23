import { useMemo, useState } from "react";
import { Banknote } from "lucide-react";

type PlanKey = "essential" | "pro" | "elite";

const PLANS: Record<PlanKey, { label: string; monthly: number }> = {
  essential: { label: "Essential — €39/mo", monthly: 39 },
  pro: { label: "Pro — €69/mo", monthly: 69 },
  elite: { label: "Elite — €99/mo", monthly: 99 },
};

function fmt(n: number) {
  return `€${Math.round(n).toLocaleString("en-US")}`;
}

type Row = {
  key: string;
  name: string;
  sub: string;
  color: string; // tailwind text color
  dotColor: string; // bg color
  cost: number | null;
  costLabel?: string;
  note?: string;
};

export function SavingsCalculator() {
  const [ticketPrice, setTicketPrice] = useState(25);
  const [tickets, setTickets] = useState(5000);
  const [plan, setPlan] = useState<PlanKey>("pro");

  const yunoCost = PLANS[plan].monthly * 12;
  const gmv = ticketPrice * tickets;

  const rows = useMemo<Row[]>(() => {
    const shotgun = gmv * 0.1;
    const weezevent = tickets * (ticketPrice * 0.025 + 0.99);
    const xceed = gmv * 0.15;
    return [
      {
        key: "yuno",
        name: "Yuno",
        sub: "0% commission — subscription only",
        color: "text-accent",
        dotColor: "bg-accent",
        cost: yunoCost,
        costLabel: "subscription only",
      },
      {
        key: "shotgun",
        name: "Shotgun",
        sub: "10% commission — paid by you",
        color: "text-red-400",
        dotColor: "bg-red-400",
        cost: shotgun,
      },
      {
        key: "weezevent",
        name: "Weezevent",
        sub: "2.5% + €0.99 / ticket — paid by you",
        color: "text-purple-400",
        dotColor: "bg-purple-400",
        cost: weezevent,
      },
      {
        key: "xceed",
        name: "Xceed Marketplace",
        sub: "15% marketplace commission — paid by you",
        color: "text-blue-400",
        dotColor: "bg-blue-400",
        cost: xceed,
      },
      {
        key: "dice",
        name: "DICE",
        sub: "~12% added on top of your price",
        color: "text-muted-foreground",
        dotColor: "bg-muted-foreground",
        cost: null,
        costLabel: "not organizer-side",
        note: "n/a",
      },
    ];
  }, [ticketPrice, tickets, yunoCost, gmv]);

  const maxCost = Math.max(
    ...rows.map((r) => r.cost ?? 0),
    yunoCost
  );

  return (
    <div className="rounded-3xl bg-surface ring-1 ring-border p-6 md:p-8">
      <div className="flex items-start gap-3 mb-6">
        <div className="size-10 rounded-xl bg-accent/15 ring-1 ring-accent/40 flex items-center justify-center shrink-0">
          <Banknote className="size-5 text-accent" strokeWidth={1.75} />
        </div>
        <div>
          <h3 className="text-xl md:text-2xl font-medium tracking-tight">
            Simulate your savings
          </h3>
          <p className="text-sm text-muted-foreground">
            What you actually pay with each platform — from your pocket.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        <Field label="Ticket price">
          <div className="relative">
            <input
              type="number"
              min={1}
              value={ticketPrice}
              onChange={(e) => setTicketPrice(Math.max(1, Number(e.target.value) || 0))}
              className="w-full bg-background ring-1 ring-border rounded-xl px-4 py-3 text-lg font-medium focus:outline-none focus:ring-accent/60"
            />
            <span className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground text-sm">€</span>
          </div>
        </Field>
        <Field label="Tickets / year">
          <input
            type="number"
            min={1}
            step={100}
            value={tickets}
            onChange={(e) => setTickets(Math.max(1, Number(e.target.value) || 0))}
            className="w-full bg-background ring-1 ring-border rounded-xl px-4 py-3 text-lg font-medium focus:outline-none focus:ring-accent/60"
          />
        </Field>
        <Field label="Your Yuno plan">
          <select
            value={plan}
            onChange={(e) => setPlan(e.target.value as PlanKey)}
            className="w-full bg-background ring-1 ring-border rounded-xl px-4 py-3 text-lg font-medium focus:outline-none focus:ring-accent/60 appearance-none"
          >
            {Object.entries(PLANS).map(([k, v]) => (
              <option key={k} value={k}>{v.label}</option>
            ))}
          </select>
        </Field>
      </div>

      <div className="border-t border-border pt-6">
        <div className="grid grid-cols-12 text-[10px] font-medium uppercase tracking-[0.18em] text-muted-foreground mb-4 px-1">
          <span className="col-span-6">Platform</span>
          <span className="col-span-4 text-right">Cost to you / year</span>
          <span className="col-span-2 text-right">You save</span>
        </div>

        <div className="space-y-3">
          {rows.map((r) => {
            const isYuno = r.key === "yuno";
            const savings = r.cost != null ? r.cost - yunoCost : null;
            const pct = r.cost != null && maxCost > 0 ? (r.cost / maxCost) * 100 : 0;
            return (
              <div
                key={r.key}
                className={`grid grid-cols-12 items-center gap-3 rounded-2xl px-4 py-4 ${
                  isYuno
                    ? "ring-1 ring-accent/50 bg-accent/[0.06]"
                    : "ring-1 ring-border/60"
                }`}
              >
                <div className="col-span-6 min-w-0">
                  <div className="flex items-center gap-2.5">
                    <span className={`size-2 rounded-full ${r.dotColor}`} />
                    <span className="font-medium text-sm md:text-base">{r.name}</span>
                    {isYuno && (
                      <span className="text-[10px] font-medium uppercase tracking-[0.14em] bg-accent text-accent-foreground rounded px-1.5 py-0.5">
                        Your platform
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-muted-foreground mt-1 ml-4">{r.sub}</p>
                  <div className="mt-2 ml-4 h-1 rounded-full bg-border/60 overflow-hidden">
                    <div
                      className={`h-full ${r.dotColor}`}
                      style={{ width: `${pct}%` }}
                    />
                  </div>
                </div>
                <div className="col-span-4 text-right">
                  {r.cost != null ? (
                    <>
                      <div className={`text-xl md:text-2xl font-semibold ${r.color}`}>
                        {fmt(r.cost)}
                      </div>
                      <div className="text-[11px] text-muted-foreground">
                        {r.costLabel ?? "per year"}
                      </div>
                    </>
                  ) : (
                    <>
                      <div className="text-xl text-muted-foreground">—</div>
                      <div className="text-[11px] text-muted-foreground">{r.costLabel}</div>
                    </>
                  )}
                </div>
                <div className="col-span-2 text-right">
                  {isYuno ? (
                    <span className="text-[11px] text-muted-foreground bg-surface-2 rounded-full px-2.5 py-1">baseline</span>
                  ) : savings != null && savings > 0 ? (
                    <span className="inline-block text-sm font-semibold text-emerald-400 bg-emerald-500/10 rounded-full px-2.5 py-1">
                      +{fmt(savings)}
                    </span>
                  ) : (
                    <span className="text-[11px] text-muted-foreground bg-surface-2 rounded-full px-2.5 py-1">{r.note ?? "n/a"}</span>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        <p className="text-[11px] text-muted-foreground leading-relaxed mt-6">
          <span className="text-foreground font-medium">How it's calculated:</span>{" "}
          Shotgun 10% organizer commission · Weezevent 2.5% + €0.99/ticket organizer-side · Xceed Marketplace 15% organizer commission · Yuno: 0% organizer commission, subscription only. DICE adds fees on top of your price for buyers — not comparable on organizer cost. Estimate only; actual fees vary by payment method and event.
        </p>
      </div>
    </div>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <label className="block text-[10px] font-medium uppercase tracking-[0.18em] text-muted-foreground mb-2">
        {label}
      </label>
      {children}
    </div>
  );
}
