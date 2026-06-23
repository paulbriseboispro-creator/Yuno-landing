import { motion } from "motion/react";

// Stylized product preview rendered in CSS — avoids stock-screenshot AI slop.
export function HeroMockup() {
  return (
    <div className="relative w-full max-w-5xl mx-auto">
      <motion.div
        aria-hidden
        className="absolute -inset-8 rounded-[32px] bg-accent/20 blur-3xl"
        initial={{ opacity: 0 }}
        animate={{ opacity: [0.15, 0.3, 0.15] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
        className="relative z-10 rounded-2xl bg-surface ring-1 ring-border overflow-hidden shadow-2xl"
      >
        {/* Window chrome */}
        <div className="flex items-center justify-between px-4 h-9 border-b border-border bg-surface/80">
          <div className="flex items-center gap-1.5">
            <span className="size-2.5 rounded-full bg-zinc-700" />
            <span className="size-2.5 rounded-full bg-zinc-700" />
            <span className="size-2.5 rounded-full bg-zinc-700" />
          </div>
          <span className="text-[10px] font-medium uppercase tracking-[0.18em] text-muted-foreground">
            Yuno · Live Night · Sat 02:14
          </span>
          <div className="flex items-center gap-2">
            <span className="size-1.5 rounded-full bg-accent animate-pulse" />
            <span className="text-[10px] font-medium uppercase text-muted-foreground">Live</span>
          </div>
        </div>

        <div className="grid grid-cols-12 gap-px bg-border">
          {/* Sidebar */}
          <aside className="col-span-2 bg-surface p-3 space-y-1.5 hidden md:block">
            {["Live Night", "Floor plan", "Bar queue", "Tickets", "Promoters", "CRM"].map((label, i) => (
              <div
                key={label}
                className={[
                  "px-2 py-1.5 rounded text-[11px] font-medium",
                  i === 0
                    ? "bg-surface-2 text-foreground"
                    : "text-muted-foreground",
                ].join(" ")}
              >
                {label}
              </div>
            ))}
          </aside>

          {/* Main */}
          <div className="col-span-12 md:col-span-7 bg-background p-5 space-y-4">
            {/* KPIs */}
            <div className="grid grid-cols-3 gap-3">
              {[
                { k: "Entries", v: "1,284", d: "+18%" },
                { k: "Bar revenue", v: "€9,420", d: "+24%" },
                { k: "VIP spend", v: "€14,780", d: "+11%" },
              ].map((kpi) => (
                <div key={kpi.k} className="rounded-lg ring-1 ring-border bg-surface p-3">
                  <div className="text-[10px] uppercase tracking-wider text-muted-foreground">{kpi.k}</div>
                  <div className="mt-1 text-lg font-medium">{kpi.v}</div>
                  <div className="text-[10px] text-accent">{kpi.d}</div>
                </div>
              ))}
            </div>

            {/* Floor plan */}
            <div className="rounded-lg ring-1 ring-border bg-surface p-4 relative overflow-hidden">
              <div className="flex items-center justify-between mb-3">
                <div className="text-[10px] uppercase tracking-wider text-muted-foreground">Main room — VIP plan</div>
                <div className="text-[10px] text-muted-foreground">8/12 booked</div>
              </div>
              <div className="relative aspect-[16/7]">
                {/* DJ booth */}
                <div className="absolute left-1/2 top-2 -translate-x-1/2 w-24 h-4 rounded-sm bg-surface-2 ring-1 ring-border" />
                {/* Tables */}
                {[
                  { x: "8%", y: "30%", booked: true },
                  { x: "22%", y: "55%", booked: true },
                  { x: "36%", y: "30%", booked: false },
                  { x: "50%", y: "60%", booked: true },
                  { x: "64%", y: "30%", booked: true },
                  { x: "78%", y: "55%", booked: false },
                  { x: "92%", y: "30%", booked: true, hot: true },
                ].map((t, i) => (
                  <motion.div
                    key={i}
                    className={[
                      "absolute size-6 rounded-full ring-1",
                      t.hot
                        ? "bg-accent ring-accent"
                        : t.booked
                          ? "bg-surface-2 ring-border"
                          : "bg-transparent ring-border",
                    ].join(" ")}
                    style={{ left: t.x, top: t.y }}
                    animate={t.hot ? { boxShadow: ["0 0 0 0 #E8192C66", "0 0 0 8px #E8192C00"] } : undefined}
                    transition={{ duration: 1.6, repeat: Infinity }}
                  />
                ))}
              </div>
            </div>
          </div>

          {/* Right panel — bar queue */}
          <div className="col-span-12 md:col-span-3 bg-surface p-4 space-y-2">
            <div className="text-[10px] uppercase tracking-wider text-muted-foreground">Bar queue</div>
            {[
              { id: "#A214", item: "2× Mojito", status: "ready", color: "accent" },
              { id: "#A215", item: "Bottle Belvedere", status: "prep", color: "muted-foreground" },
              { id: "#A216", item: "4× Shot", status: "queue", color: "muted-foreground" },
              { id: "#A217", item: "Champagne ice", status: "queue", color: "muted-foreground" },
            ].map((o) => (
              <div key={o.id} className="rounded-md ring-1 ring-border bg-background p-2.5">
                <div className="flex justify-between text-[10px]">
                  <span className="text-muted-foreground">{o.id}</span>
                  <span
                    className={[
                      "uppercase tracking-wider",
                      o.color === "accent" ? "text-accent" : "text-muted-foreground",
                    ].join(" ")}
                  >
                    {o.status}
                  </span>
                </div>
                <div className="text-xs mt-0.5">{o.item}</div>
              </div>
            ))}
          </div>
        </div>
      </motion.div>
    </div>
  );
}
