import { motion } from "motion/react";
import { en } from "@/content/en";
import { ArrowDown } from "lucide-react";

export function SplitVisual() {
  return (
    <div className="p-6 md:p-8 bg-background rounded-3xl ring-1 ring-border relative overflow-hidden">
      <div className="absolute -top-32 -right-32 size-64 rounded-full bg-accent/10 blur-3xl pointer-events-none" />
      <div className="relative z-10 flex flex-col gap-5">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="flex justify-between items-center bg-surface p-4 rounded-xl ring-1 ring-border"
        >
          <span className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
            {en.split.ticketLabel}
          </span>
          <span className="text-lg font-medium">{en.split.ticketAmount}</span>
        </motion.div>

        <div className="flex justify-center">
          <motion.div
            initial={{ height: 0 }}
            whileInView={{ height: 32 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="w-px bg-gradient-to-b from-accent to-transparent relative"
          >
            <ArrowDown className="absolute -bottom-1 left-1/2 -translate-x-1/2 size-3 text-accent" />
          </motion.div>
        </div>

        <div className="grid grid-cols-3 gap-3">
          {en.split.rows.map((r, i) => (
            <motion.div
              key={r.label}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: 0.35 + i * 0.1 }}
              className={[
                "p-4 rounded-xl text-center ring-1",
                r.accent ? "bg-accent/10 ring-accent/40" : "bg-surface ring-border",
              ].join(" ")}
            >
              <span className="block text-[10px] text-muted-foreground uppercase tracking-wider mb-1">
                {r.label}
              </span>
              <span className={["text-base font-medium", r.accent ? "text-accent" : ""].join(" ")}>
                {r.value}
              </span>
              <span className="block text-[10px] text-muted-foreground mt-1">{r.pct}</span>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
