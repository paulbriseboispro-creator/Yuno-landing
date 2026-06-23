import { Globe } from "lucide-react";
import { cn } from "@/lib/utils";
import { LOCALES, LOCALE_LABELS, useLocale, useSetLocale } from "@/i18n/locale";

// Segmented EN/FR toggle. `compact` is the header pill; the default carries a
// globe + label for the footer. Switching is instant (no reload) and persists
// to a cookie so the next server render already matches.
export function LanguageSwitcher({
  compact = false,
  className,
}: {
  compact?: boolean;
  className?: string;
}) {
  const locale = useLocale();
  const setLocale = useSetLocale();

  return (
    <div
      className={cn(
        "inline-flex items-center gap-1 rounded-full border border-border p-0.5",
        className,
      )}
      role="group"
      aria-label={LOCALE_LABELS[locale]}
    >
      {!compact && <Globe className="ml-1.5 size-3.5 text-muted-foreground" aria-hidden />}
      {LOCALES.map((l) => {
        const active = l === locale;
        return (
          <button
            key={l}
            type="button"
            onClick={() => setLocale(l)}
            aria-pressed={active}
            aria-label={LOCALE_LABELS[l]}
            className={cn(
              "rounded-full px-2 py-0.5 text-xs font-medium uppercase tracking-wide transition-colors",
              active
                ? "bg-accent text-accent-foreground"
                : "text-muted-foreground hover:text-foreground",
            )}
          >
            {l}
          </button>
        );
      })}
    </div>
  );
}
