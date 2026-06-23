import { useEffect, useState } from "react";
import { Link } from "@tanstack/react-router";
import { ArrowRight, X } from "lucide-react";
import { useCommon } from "@/content/common";

const STORAGE_KEY = "yuno_founding_banner_dismissed_v2";

export function FoundingBanner() {
  const [visible, setVisible] = useState(false);
  const t = useCommon();

  useEffect(() => {
    try {
      const dismissed = localStorage.getItem(STORAGE_KEY);
      if (!dismissed) setVisible(true);
    } catch {
      setVisible(true);
    }
  }, []);

  if (!visible) return null;

  return (
    <div className="sticky top-0 z-[60] bg-accent text-accent-foreground">
      <div className="mx-auto max-w-7xl px-4 py-2 flex items-center justify-center gap-3 text-xs md:text-sm">
        <span className="inline-flex size-1.5 rounded-full bg-current animate-pulse" />
        <span className="text-center">
          <span className="font-semibold">{t.banner.label}</span>
          <span className="opacity-80">{t.banner.rest}</span>
        </span>
        <Link
          to="/contact"
          className="hidden sm:inline-flex items-center gap-1 font-semibold underline underline-offset-2 hover:no-underline"
        >
          {t.banner.cta}
          <ArrowRight className="size-3.5" />
        </Link>
        <button
          aria-label="Dismiss"
          onClick={() => {
            try { localStorage.setItem(STORAGE_KEY, "1"); } catch { /* noop */ }
            setVisible(false);
          }}
          className="ml-2 opacity-70 hover:opacity-100"
        >
          <X className="size-4" />
        </button>
      </div>
    </div>
  );
}
