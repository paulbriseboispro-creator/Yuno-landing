import { cn } from "@/lib/utils";
import React from "react";
import { Button } from "@/components/ui/button";
import { Portal, PortalBackdrop } from "@/components/portal";
import { Link } from "@tanstack/react-router";
import { XIcon, MenuIcon } from "lucide-react";
import { useCommon } from "@/content/common";
import { LanguageSwitcher } from "./LanguageSwitcher";

export function SiteMobileNav() {
  const [open, setOpen] = React.useState(false);
  const t = useCommon();
  const navLinks = [
    { label: t.nav.product, to: "/" },
    { label: t.nav.pricing, to: "/pricing" },
    { label: t.nav.clubs, to: "/clubs" },
    { label: t.nav.organizers, to: "/organizers" },
    { label: t.nav.affiliates, to: "/affiliates" },
  ];

  return (
    <div className="md:hidden">
      <Button
        aria-controls="mobile-menu"
        aria-expanded={open}
        aria-label="Toggle menu"
        className="md:hidden"
        onClick={() => setOpen(!open)}
        size="icon"
        variant="outline"
      >
        {open ? (
          <XIcon className="size-4" />
        ) : (
          <MenuIcon className="size-4" />
        )}
      </Button>
      {open && (
        <Portal className="top-14" id="mobile-menu">
          <PortalBackdrop />
          <div
            className={cn(
              "data-[slot=open]:zoom-in-97 ease-out data-[slot=open]:animate-in",
              "size-full p-4"
            )}
            data-slot={open ? "open" : "closed"}
          >
            <div className="grid gap-y-2">
              {navLinks.map((link) => (
                <Button
                  asChild
                  className="justify-start"
                  key={link.to}
                  variant="ghost"
                  onClick={() => setOpen(false)}
                >
                  <Link to={link.to}>{link.label}</Link>
                </Button>
              ))}
            </div>
            <div className="mt-12 flex flex-col gap-2">
              <Button asChild className="w-full" variant="outline" onClick={() => setOpen(false)}>
                <Link to="/contact">{t.nav.bookDemo}</Link>
              </Button>
              <Button asChild className="w-full" onClick={() => setOpen(false)}>
                <Link to="/contact">{t.nav.startFree}</Link>
              </Button>
              <div className="mt-2 flex justify-center">
                <LanguageSwitcher />
              </div>
            </div>
          </div>
        </Portal>
      )}
    </div>
  );
}
