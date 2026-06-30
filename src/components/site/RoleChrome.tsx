// Focused chrome for the role landings (/clubs = Owner de club, /organizers =
// Orga) and the role-selection gate (/). Modelled on the BDE chrome: the main
// site nav (Product, Pricing, Clubs, Organizers, Affiliates) is deliberately
// dropped so a visitor who picked a role stays in that role's clean funnel
// instead of drowning in the full-site menu — the exact "trop d'éléments"
// problem we're solving. Bilingual: nav labels come from the role's content map,
// and the language switcher is kept so EN/FR both work and stay indexed.
import { Link } from "@tanstack/react-router";
import { ArrowRight, Instagram } from "lucide-react";
import { useScroll } from "@/hooks/use-scroll";
import { cn } from "@/lib/utils";
import { LanguageSwitcher } from "@/components/site/LanguageSwitcher";
import { useClubs } from "@/content/clubs";
import { useOrganizers } from "@/content/organizers";
import { useCommon } from "@/content/common";
import yunoLogo from "@/assets/yuno-logo.png";

export type Role = "club" | "orga";

// Shrink-on-scroll pill, same treatment as the main + BDE headers.
function HeaderShell({ children }: { children: React.ReactNode }) {
  const scrolled = useScroll(10);
  return (
    <header
      className={cn(
        "relative z-[70] mx-auto w-full max-w-4xl border-transparent border-b md:rounded-md md:border md:transition-all md:ease-out",
        {
          "border-border bg-background/95 backdrop-blur-sm supports-backdrop-filter:bg-background/50 md:top-2 md:shadow":
            scrolled,
          "md:w-fit": scrolled,
        },
      )}
    >
      <nav
        className={cn(
          "flex h-14 w-full items-center justify-between px-4 md:h-12 md:gap-6 md:transition-all md:ease-out",
          { "md:px-2": scrolled },
        )}
      >
        {children}
      </nav>
    </header>
  );
}

function Logo() {
  // Logo returns to the role-selection gate (the new home).
  return (
    <Link
      to="/"
      aria-label="Yuno"
      className="flex shrink-0 items-center rounded-md p-2 hover:bg-muted/50"
    >
      <img src={yunoLogo} alt="Yuno" className="h-[15px] w-auto md:h-[18px]" />
    </Link>
  );
}

export function RoleHeader({ role }: { role: Role }) {
  // Both hooks are called unconditionally (rules of hooks); we pick by role.
  const club = useClubs();
  const orga = useOrganizers();
  const t = role === "club" ? club : orga;

  return (
    <HeaderShell>
      <Logo />

      <div className="hidden items-center gap-1 md:flex">
        {t.nav.map((item) => (
          <a
            key={item.href}
            href={item.href}
            className="rounded-md px-3 py-1.5 text-sm font-medium text-muted-foreground transition-colors hover:bg-muted/50 hover:text-foreground"
          >
            {item.label}
          </a>
        ))}
      </div>

      <div className="flex shrink-0 items-center gap-2">
        <LanguageSwitcher compact />
        <Link
          to="/contact"
          className="inline-flex items-center gap-2 rounded-full bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
        >
          {t.hero.primaryCta}
          <ArrowRight className="size-4" />
        </Link>
      </div>
    </HeaderShell>
  );
}

// Minimal header for the role-selection gate (/): just the logo and the language
// switcher. No nav, no CTA — the page is the choice.
export function GateHeader() {
  return (
    <HeaderShell>
      <Logo />
      <LanguageSwitcher compact />
    </HeaderShell>
  );
}

// Shared footer for the gate + role landings. Lighter than the full SiteFooter
// (no sitemap columns) but keeps language + contact reachable.
export function RoleFooter() {
  const t = useCommon();
  return (
    <footer className="mx-auto mt-24 max-w-5xl border-t border-border px-4 md:px-6">
      <div className="flex flex-col gap-6 py-8 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-3">
          <img src={yunoLogo} alt="Yuno" className="h-[20px] w-auto" />
          <span className="text-sm text-muted-foreground">{t.footer.tagline}</span>
        </div>
        <div className="flex items-center gap-4">
          <LanguageSwitcher />
          <a
            href="https://www.instagram.com/yunoapp.eu/"
            aria-label="Instagram"
            className="inline-flex h-9 w-9 items-center justify-center rounded-md text-muted-foreground transition-colors hover:bg-accent hover:text-accent-foreground"
          >
            <Instagram className="size-4" />
          </a>
          <Link
            to="/contact"
            className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
          >
            {t.nav.contact}
          </Link>
        </div>
      </div>
      <div className="border-t border-border py-4 text-sm text-muted-foreground">
        <p>
          &copy; {new Date().getFullYear()} {t.footer.rights}
        </p>
      </div>
    </footer>
  );
}
