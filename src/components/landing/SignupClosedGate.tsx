// Yuno en pause (2026-11-08) : les comptes pro s'ouvrent sur invitation
// seulement. La vraie porte est côté serveur (complete_pro_signup refuse
// `pro_signup_closed`) ; cet écran évite seulement de faire remplir un
// formulaire pour rien. Un lien d'invitation (`?offer=`) passe toujours.
import { useEffect, useState, type ReactNode } from "react";
import { MessageCircle } from "lucide-react";
import { useLanding, whatsappHref } from "@/components/landing/context";
import { yunoApp } from "@/lib/yuno-app";

const WORDS = {
  en: {
    title: "Yuno is invitation-only for now",
    body: "We are focusing on the venues and organizers we already work with. Pro accounts open on invitation. Got one, or want to talk? Message us.",
    cta: "Message us on WhatsApp",
  },
  fr: {
    title: "Yuno est sur invitation pour le moment",
    body: "On se concentre sur les clubs et les organisateurs avec qui on travaille déjà. Les comptes pro s'ouvrent sur invitation. Tu en as une, ou tu veux en parler ? Écris-nous.",
    cta: "Nous écrire sur WhatsApp",
  },
  es: {
    title: "Yuno funciona solo con invitación por ahora",
    body: "Nos centramos en los clubs y organizadores con los que ya trabajamos. Las cuentas pro se abren con invitación. ¿Tienes una o quieres hablar? Escríbenos.",
    cta: "Escríbenos por WhatsApp",
  },
} as const;

export function SignupClosedGate({
  children,
  tone = "light",
}: {
  children: ReactNode;
  tone?: "light" | "page";
}) {
  const { lang, whatsappMessage } = useLanding();
  const [open, setOpen] = useState<boolean | null>(null);

  useEffect(() => {
    if (new URLSearchParams(window.location.search).get("offer")) {
      setOpen(true);
      return;
    }
    let alive = true;
    yunoApp()
      .rpc("pro_signup_is_open")
      .then(({ data, error }) => {
        // Panne de lecture : on laisse le formulaire, le serveur tranche.
        if (alive) setOpen(error ? true : data !== false);
      });
    return () => {
      alive = false;
    };
  }, []);

  if (open !== false) return <>{children}</>;
  const w = WORDS[(lang as keyof typeof WORDS) in WORDS ? (lang as keyof typeof WORDS) : "en"];
  return (
    <div
      className={
        tone === "page"
          ? "mx-auto flex min-h-[70vh] max-w-md flex-col justify-center px-6 py-16"
          : "py-2"
      }
    >
      <h2 id="signup-title" className="text-[22px] font-semibold tracking-tight text-zinc-950">
        {w.title}
      </h2>
      <p className="mt-3 text-[15px] leading-relaxed text-zinc-600">{w.body}</p>
      <a
        href={whatsappHref(whatsappMessage)}
        target="_blank"
        rel="noopener noreferrer"
        className="mt-6 inline-flex items-center justify-center gap-2 rounded-full bg-zinc-950 px-5 py-3 text-[15px] font-medium text-white transition-colors hover:bg-zinc-800"
      >
        <MessageCircle className="size-4 text-[#25D366]" /> {w.cta}
      </a>
    </div>
  );
}
