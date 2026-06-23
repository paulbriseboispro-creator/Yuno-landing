import { useMemo, useState } from "react";
import { Link } from "@tanstack/react-router";
import { AnimatePresence, motion } from "motion/react";
import { ArrowUpRight } from "lucide-react";
import { GooeyInput } from "@/components/ui/gooey-input";
import { useCommon } from "@/content/common";

type Entry = {
  title: string;
  category: "Product" | "Pricing" | "Audience" | "FAQ" | "Company";
  to: string;
  keywords: string[];
};

function score(entry: Entry, q: string) {
  const needle = q.toLowerCase().trim();
  if (!needle) return 0;
  const hay = (entry.title + " " + entry.keywords.join(" ") + " " + entry.category).toLowerCase();
  if (hay.includes(needle)) return needle.length / hay.length + (entry.title.toLowerCase().startsWith(needle) ? 1 : 0);
  // token-prefix match
  const tokens = needle.split(/\s+/);
  const hits = tokens.filter((t) => hay.includes(t)).length;
  return hits ? hits / tokens.length : 0;
}

export function SmartSearch({ compact = false, onOpenChange }: { compact?: boolean; onOpenChange?: (open: boolean) => void } = {}) {
  const t = useCommon();
  const index = t.search.index;
  const [query, setQuery] = useState("");
  const [open, setOpenState] = useState(false);
  const setOpen = (v: boolean) => {
    setOpenState(v);
    onOpenChange?.(v);
  };


  const results = useMemo(() => {
    if (!query.trim()) {
      return index.slice(0, 5).map((e) => ({ entry: e, score: 1 }));
    }
    return index.map((entry) => ({ entry, score: score(entry, query) }))
      .filter((r) => r.score > 0)
      .sort((a, b) => b.score - a.score)
      .slice(0, 6);
  }, [query, index]);

  const showDropdown = open;

  return (
    <div className="relative inline-block">
      <GooeyInput
        placeholder={t.search.placeholder}
        collapsedWidth={compact ? 90 : 140}
        expandedWidth={compact ? 220 : 320}
        expandedOffset={0}
        height={compact ? 30 : 40}
        gooeyBlur={compact ? 3 : 5}
        value={query}
        onValueChange={setQuery}
        onOpenChange={setOpen}
      />


      <AnimatePresence>
        {showDropdown && (
          <motion.div
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 6 }}
            transition={{ duration: 0.15 }}
            className="absolute left-1/2 top-[calc(100%+12px)] z-50 w-[min(420px,90vw)] -translate-x-1/2 rounded-2xl border border-border bg-background/95 backdrop-blur p-1.5 shadow-2xl"
          >
            {results.length === 0 ? (
              <p className="px-4 py-6 text-center text-xs text-muted-foreground">
                {t.search.noMatches}
              </p>
            ) : (
              <>
                <p className="px-3 py-2 text-[10px] font-medium uppercase tracking-[0.18em] text-muted-foreground">
                  {query.trim() ? t.search.results : t.search.popular}
                </p>
                <ul className="space-y-0.5">
                  {results.map(({ entry }) => (
                    <li key={entry.title}>
                      <Link
                        to={entry.to}
                        onClick={() => {
                          setOpen(false);
                          setQuery("");
                        }}
                        className="group flex items-center justify-between gap-3 rounded-xl px-3 py-2.5 text-left hover:bg-surface transition-colors"
                      >
                        <div className="min-w-0">
                          <p className="truncate text-sm font-medium">{entry.title}</p>
                          <p className="text-[11px] text-muted-foreground">{t.search.categories[entry.category]}</p>
                        </div>
                        <ArrowUpRight className="size-4 text-muted-foreground group-hover:text-accent transition-colors shrink-0" />
                      </Link>
                    </li>
                  ))}
                </ul>
              </>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
