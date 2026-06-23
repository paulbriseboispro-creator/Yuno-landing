import { motion, AnimatePresence } from "motion/react";
import { useState } from "react";
import { en } from "@/content/en";
import { CheckCircle2 } from "lucide-react";

type Key = "clubs" | "organizers" | "promoters";

export function SegmentSwitcher() {
  const [active, setActive] = useState<Key>("clubs");
  const content = en.segmentContent[active === "promoters" ? "promoters" : active];
  const segs: Key[] = ["clubs", "organizers", "promoters"];

  return (
    <div className="flex flex-col items-center">
      <div
        role="tablist"
        className="relative inline-flex items-center p-1 bg-surface ring-1 ring-border rounded-full"
      >
        {segs.map((k) => (
          <button
            key={k}
            role="tab"
            aria-selected={active === k}
            onClick={() => setActive(k)}
            className="relative px-6 py-2 text-sm font-medium rounded-full transition-colors"
          >
            {active === k && (
              <motion.span
                layoutId="segment-pill"
                className="absolute inset-0 bg-surface-2 rounded-full"
                transition={{ type: "spring", stiffness: 380, damping: 32 }}
              />
            )}
            <span className={["relative z-10", active === k ? "text-foreground" : "text-muted-foreground"].join(" ")}>
              {en.segments[k]}
            </span>
          </button>
        ))}
      </div>

      <div className="mt-12 w-full max-w-3xl">
        <AnimatePresence mode="wait">
          <motion.div
            key={active}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="rounded-2xl bg-surface ring-1 ring-border p-8"
          >
            <h3 className="text-2xl md:text-3xl font-medium tracking-tight mb-6 text-balance">
              {content.title}
            </h3>
            <ul className="grid sm:grid-cols-2 gap-x-8 gap-y-3">
              {content.bullets.map((b) => (
                <li key={b} className="flex items-start gap-3 text-sm text-muted-foreground">
                  <CheckCircle2 className="size-4 mt-0.5 text-accent shrink-0" strokeWidth={1.75} />
                  <span>{b}</span>
                </li>
              ))}
            </ul>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
