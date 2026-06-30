import { Link } from "@tanstack/react-router";
import { ArrowRight, MessageCircle } from "lucide-react";
import { useCommon } from "@/content/common";

// The rdv (meeting) choice, surfaced at every closing CTA: book via the /contact
// form (pre-tagged with the visitor's segment + chosen pain) OR talk to the team
// on WhatsApp. No calendar tool — these are the two real channels Paul chose.
export function RdvButtons({
  segment,
  besoin,
  formLabel,
  align = "center",
}: {
  segment: "club" | "organizer" | "affiliate" | "other";
  besoin?: string;
  formLabel?: string;
  align?: "center" | "start";
}) {
  const { rdv } = useCommon();
  const waText = encodeURIComponent(rdv.whatsappMessage);
  const waHref = `https://wa.me/${rdv.whatsappNumber}?text=${waText}`;

  return (
    <div
      className={`flex flex-col items-${align === "center" ? "center" : "start"} gap-3`}
    >
      <div className={`flex flex-col gap-3 sm:flex-row ${align === "center" ? "justify-center" : ""}`}>
        <Link
          to="/contact"
          search={{ segment, besoin }}
          className="inline-flex items-center justify-center gap-2 rounded-full bg-primary px-7 py-3.5 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
        >
          {formLabel ?? rdv.formCta} <ArrowRight className="size-4" />
        </Link>
        <a
          href={waHref}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center justify-center gap-2 rounded-full bg-[#25D366] px-7 py-3.5 text-sm font-medium text-white transition-opacity hover:opacity-90"
        >
          <MessageCircle className="size-4" /> {rdv.whatsappCta}
        </a>
      </div>
      <p className="text-xs text-muted-foreground">
        {rdv.or} — {rdv.whatsappHint}
      </p>
    </div>
  );
}
