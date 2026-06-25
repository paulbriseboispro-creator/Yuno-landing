import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { useScroll } from "@/hooks/use-scroll";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { SiteMobileNav } from "./SiteMobileNav";
import { SmartSearch } from "./SmartSearch";
import { MagnifyNav } from "./MagnifyNav";
import { LanguageSwitcher } from "./LanguageSwitcher";
import { useCommon } from "@/content/common";
import yunoLogo from "@/assets/yuno-logo.png";


export function SiteHeader() {
  const scrolled = useScroll(10);
  const [searchOpen, setSearchOpen] = useState(false);
  const t = useCommon();
  const navLinks = [
    { label: t.nav.product, to: "/" },
    { label: t.nav.pricing, to: "/pricing" },
    { label: t.nav.clubs, to: "/clubs" },
    { label: t.nav.organizers, to: "/organizers" },
    { label: t.nav.affiliates, to: "/affiliates" },
  ];

  return (
    <header
      className={cn(
        "relative z-[70] mx-auto w-full max-w-4xl border-transparent border-b md:rounded-md md:border md:transition-all md:ease-out",
        {
          "border-border bg-background/95 backdrop-blur-sm supports-backdrop-filter:bg-background/50 md:top-2 md:shadow":
            scrolled,
          // When scrolled, shrink the bar to fit its content so it adapts to
          // the label lengths of the active language (EN vs FR) instead of a
          // fixed width that crops or leaves the bar feeling cramped.
          "md:w-fit": scrolled && !searchOpen,
        }
      )}
    >
      <nav
        className={cn(
          "flex h-14 w-full items-center justify-between px-4 md:h-12 md:gap-6 md:transition-all md:ease-out",
          {
            "md:px-2": scrolled,
          }
        )}
      >
        <Link
          to="/"
          aria-label="Yuno"
          className="flex shrink-0 items-center rounded-md p-2 hover:bg-muted dark:hover:bg-muted/50"
        >
          <img src={yunoLogo} alt="Yuno" className="h-[15px] w-auto md:h-[18px]" />
        </Link>

        <div className="hidden items-center gap-1 md:flex">
          <MagnifyNav className="flex items-center gap-1">
            {navLinks.map((link) => (
              <Button asChild key={link.to} size="sm" variant="ghost">
                <Link to={link.to} activeOptions={{ exact: link.to === "/" }}>
                  {link.label}
                </Link>
              </Button>
            ))}
          </MagnifyNav>
          <SmartSearch compact onOpenChange={setSearchOpen} />
          <LanguageSwitcher compact className="ml-2" />
          <Button asChild size="sm" className="ml-2">

            <Link to="/contact">{t.nav.startFree}</Link>
          </Button>
        </div>

        <SiteMobileNav />
      </nav>
    </header>
  );
}
