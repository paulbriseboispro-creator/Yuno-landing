import { Link } from "@tanstack/react-router";
import { Instagram, Globe } from "lucide-react";
import yunoLogo from "@/assets/yuno-logo.png";

const navLinks = [
  { to: "/pricing", label: "Pricing" },
  { to: "/clubs", label: "Clubs" },
  { to: "/organizers", label: "Organizers" },
  { to: "/affiliates", label: "Affiliates" },
  { to: "/contact", label: "Contact" },
  { to: "/privacy", label: "Privacy" },
  { to: "/terms", label: "Terms" },
];

const socialLinks = [
  { href: "https://www.instagram.com/yunoapp.eu/", label: "Instagram", icon: <Instagram className="size-4" /> },
  { href: "https://www.yunoapp.eu/", label: "Website", icon: <Globe className="size-4" /> },
];

export function SiteFooter() {
  return (
    <footer className="mx-auto max-w-5xl px-4 md:px-6 border-t border-border mt-24">
      <div className="flex flex-col gap-6 py-6">
        <div className="flex items-center justify-between">
          <Link to="/" aria-label="Yuno" className="inline-flex items-center">
            <img src={yunoLogo} alt="Yuno" className="h-[21px] w-auto" />
          </Link>
          <div className="flex items-center">
            {socialLinks.map(({ href, label, icon }) => (
              <a
                key={label}
                aria-label={label}
                href={href}
                className="inline-flex h-9 w-9 items-center justify-center rounded-md text-muted-foreground hover:bg-accent hover:text-accent-foreground transition-colors"
              >
                {icon}
              </a>
            ))}
          </div>
        </div>

        <nav>
          <ul className="flex flex-wrap gap-4 font-medium text-muted-foreground text-sm md:gap-6">
            {navLinks.map((link) => (
              <li key={link.label}>
                {link.to.startsWith("/") ? (
                  <Link to={link.to} className="hover:text-foreground transition-colors">
                    {link.label}
                  </Link>
                ) : (
                  <a href={link.to} className="hover:text-foreground transition-colors">
                    {link.label}
                  </a>
                )}
              </li>
            ))}
          </ul>
        </nav>
      </div>

      <div className="flex items-center justify-between gap-4 border-t border-border py-4 text-muted-foreground text-sm">
        <p>&copy; {new Date().getFullYear()} Yuno Technologies. All rights reserved.</p>
      </div>
    </footer>
  );
}
