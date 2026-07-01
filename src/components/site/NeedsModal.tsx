"use client";
import { useEffect, useState } from "react";
import { Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { useLocale } from "@/i18n/locale";
import type { RolePain } from "@/content/role-landing";

const SESSION_KEY = "yuno-needs-answered";

// A small, easily-closable popup that asks the visitor their one need and routes
// to ?besoin= so the page collapses to just what's relevant. Auto-opens on every
// arrival at a role landing that has NO chosen need yet, and stops nagging only
// once the visitor has actually picked one (the URL carries a besoin). Skipping
// ("see the whole platform") is a soft dismiss: it closes for this view but the
// prompt can return on the next visit. Closes on pick, X, Esc, or backdrop.
export function NeedsModal({
  pains,
  basePath,
  hasBesoin,
}: {
  pains: RolePain[];
  basePath: "/clubs" | "/organizers";
  hasBesoin: boolean;
}) {
  const locale = useLocale();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    // The visitor picked a need (deep link or a prior pick): remember it and
    // never prompt again this session.
    if (hasBesoin) {
      try {
        sessionStorage.setItem(SESSION_KEY, "1");
      } catch {
        /* ignore */
      }
      return;
    }
    // Already answered earlier this session — don't prompt again.
    let answered = false;
    try {
      answered = sessionStorage.getItem(SESSION_KEY) === "1";
    } catch {
      /* sessionStorage unavailable — just show it */
    }
    if (answered) return;
    // Fresh arrival with no chosen need — prompt. The flag is set on pick
    // (via ?besoin=), not here, so it re-shows on each needless arrival.
    const id = setTimeout(() => setOpen(true), 600);
    return () => clearTimeout(id);
  }, [hasBesoin]);

  const copy =
    locale === "fr"
      ? {
          title: "Quel est votre principal casse-tête ?",
          desc: "Dites-le-nous et on vous montre juste ce qu'il faut, pas tout le catalogue.",
          skip: "Voir toute la plateforme",
        }
      : {
          title: "What's your main headache?",
          desc: "Tell us and we'll show you just what matters, not the whole catalogue.",
          skip: "See the whole platform",
        };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="max-h-[85vh] max-w-md overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-xl">{copy.title}</DialogTitle>
          <DialogDescription>{copy.desc}</DialogDescription>
        </DialogHeader>
        <div className="grid max-h-[52vh] gap-2 overflow-y-auto">
          {pains.map((p) => (
            <Link
              key={p.id}
              to={basePath}
              search={{ besoin: p.id }}
              onClick={() => setOpen(false)}
              className="group flex items-center justify-between gap-3 rounded-xl bg-surface px-4 py-3 text-left ring-1 ring-border transition-colors hover:ring-accent/50"
            >
              <span>
                <span className="block text-sm font-medium">{p.chipLabel}</span>
                <span className="block text-xs text-muted-foreground">{p.focus.title}</span>
              </span>
              <ArrowRight className="size-4 shrink-0 text-muted-foreground transition-transform group-hover:translate-x-0.5 group-hover:text-accent" />
            </Link>
          ))}
        </div>
        <button
          type="button"
          onClick={() => setOpen(false)}
          className="text-center text-xs text-muted-foreground underline-offset-4 hover:text-foreground hover:underline"
        >
          {copy.skip}
        </button>
      </DialogContent>
    </Dialog>
  );
}
