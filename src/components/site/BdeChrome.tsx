// Minimal chrome for the standalone /bde landing (shared with its /bde/contact
// page). Deliberately stripped of the main site nav (Clubs, Organizers, Pricing…)
// so a BDE handed the link stays in the BDE space and never wanders into the
// club/organizer funnel. The header mirrors the main site's shrink-on-scroll pill
// (it collapses to fit its content once you scroll). Its links resolve to the
// landing's sections (`/bde#…`): on /bde they're same-document fragment scrolls,
// and from /bde/contact they route back to the landing — so the logo and nav are
// always a way back out of a sub-page. French-only.
import { Link } from "@tanstack/react-router";
import { ArrowRight, Instagram } from "lucide-react";
import { useScroll } from "@/hooks/use-scroll";
import { cn } from "@/lib/utils";
import yunoLogo from "@/assets/yuno-logo.png";

const BDE_NAV = [
  { label: "Gratuit", href: "#gratuit" },
  { label: "Vos soirées", href: "#audience" },
  { label: "Le design", href: "#design" },
  { label: "FAQ", href: "#faq" },
];

export function BdeHeader() {
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
        <a
          href="/bde#top"
          aria-label="Yuno"
          className="flex shrink-0 items-center rounded-md p-2 hover:bg-muted/50"
        >
          <img src={yunoLogo} alt="Yuno" className="h-[15px] w-auto md:h-[18px]" />
        </a>

        <div className="hidden items-center gap-1 md:flex">
          {BDE_NAV.map((item) => (
            <a
              key={item.href}
              href={`/bde${item.href}`}
              className="rounded-md px-3 py-1.5 text-sm font-medium text-muted-foreground transition-colors hover:bg-muted/50 hover:text-foreground"
            >
              {item.label}
            </a>
          ))}
        </div>

        <Link
          to="/bde/contact"
          className="ml-2 inline-flex shrink-0 items-center gap-2 rounded-full bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
        >
          Créer ma soirée
          <ArrowRight className="size-4" />
        </Link>
      </nav>
    </header>
  );
}

export function BdeFooter() {
  return (
    <footer className="mx-auto mt-24 max-w-5xl border-t border-border px-4 md:px-6">
      <div className="flex flex-col gap-6 py-8 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-3">
          <img src={yunoLogo} alt="Yuno" className="h-[20px] w-auto" />
          <span className="text-sm text-muted-foreground">
            La billetterie des soirées étudiantes.
          </span>
        </div>
        <div className="flex items-center gap-4">
          <a
            href="https://www.instagram.com/yunoapp.eu/"
            aria-label="Instagram"
            className="inline-flex h-9 w-9 items-center justify-center rounded-md text-muted-foreground transition-colors hover:bg-accent hover:text-accent-foreground"
          >
            <Instagram className="size-4" />
          </a>
          <Link
            to="/bde/contact"
            className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
          >
            Contact
          </Link>
        </div>
      </div>
      <div className="border-t border-border py-4 text-sm text-muted-foreground">
        <p>&copy; {new Date().getFullYear()} Yuno Technologies. Tous droits réservés.</p>
      </div>
    </footer>
  );
}
