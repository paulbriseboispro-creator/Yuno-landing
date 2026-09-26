import type { ReactNode } from "react";
import { ArrowRight, MessageCircle } from "lucide-react";
import { motion } from "motion/react";
import { cn } from "@/lib/utils";
import yunoLogo from "@/assets/yuno-logo.png";
import { useLanding, whatsappHref, type SignupRole } from "./context";

export const EASE = [0.22, 1, 0.36, 1] as const;

export function FadeIn({
  children,
  delay = 0,
  y = 18,
  className,
}: {
  children: ReactNode;
  delay?: number;
  y?: number;
  className?: string;
}) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.7, ease: EASE, delay }}
    >
      {children}
    </motion.div>
  );
}

export function Eyebrow({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full border border-zinc-200 bg-white px-3 py-1 text-xs font-medium text-zinc-600 shadow-[0_1px_2px_rgba(0,0,0,0.04)]",
        className,
      )}
    >
      <span className="size-1.5 rounded-full bg-[var(--yuno-red)]" />
      {children}
    </span>
  );
}

export function SectionHeader({
  eyebrow,
  title,
  sub,
  className,
}: {
  eyebrow?: string;
  title: string;
  sub?: string;
  className?: string;
}) {
  return (
    <FadeIn className={cn("mx-auto max-w-2xl text-center", className)}>
      {eyebrow && <Eyebrow>{eyebrow}</Eyebrow>}
      <h2 className="yl-h2 mt-4 text-balance">{title}</h2>
      {sub && (
        <p className="mx-auto mt-4 max-w-xl text-pretty text-[15px] leading-relaxed text-zinc-500 md:text-base">
          {sub}
        </p>
      )}
    </FadeIn>
  );
}

// `cta` is the tracking id read by the delegated listener (src/lib/posthog-dom.ts);
// the section comes from the closest `data-ph-section` / `data-ph-area`.
export function PrimaryCta({
  children,
  role,
  email,
  cta = "signup",
  size = "md",
  className,
}: {
  children: ReactNode;
  role?: SignupRole;
  cta?: string;
  email?: string;
  size?: "sm" | "md" | "lg";
  className?: string;
}) {
  const { openSignup } = useLanding();
  return (
    <button
      type="button"
      onClick={() => openSignup({ role, email })}
      data-ph-cta={cta}
      data-ph-role={role}
      className={cn(
        "yl-btn-primary group",
        size === "sm" && "h-9 px-4 text-[13px]",
        size === "md" && "h-11 px-5 text-sm",
        size === "lg" && "h-12 px-6 text-[15px]",
        className,
      )}
    >
      {children}
      <ArrowRight className="size-4 transition-transform duration-300 group-hover:translate-x-0.5" />
    </button>
  );
}

export function FounderCta({
  children,
  cta = "whatsapp",
  size = "md",
  className,
}: {
  children: ReactNode;
  cta?: string;
  size?: "sm" | "md" | "lg";
  className?: string;
}) {
  const { whatsappMessage } = useLanding();
  return (
    <a
      href={whatsappHref(whatsappMessage)}
      target="_blank"
      rel="noopener noreferrer"
      data-ph-cta={cta}
      className={cn(
        "yl-btn-secondary",
        size === "sm" && "h-9 px-4 text-[13px]",
        size === "md" && "h-11 px-5 text-sm",
        size === "lg" && "h-12 px-6 text-[15px]",
        className,
      )}
    >
      <MessageCircle className="size-4 text-[#25D366]" />
      {children}
    </a>
  );
}

// A soft, blurred brand glow used behind hero and feature visuals.
export function Glow({ className }: { className?: string }) {
  return (
    <div
      aria-hidden
      className={cn("pointer-events-none absolute rounded-full blur-3xl", className)}
    />
  );
}

// The Yuno wordmark (red). Sized by height; the PNG is 914×309.
export function YunoLogo({ className }: { className?: string }) {
  return (
    <img
      src={yunoLogo}
      alt="Yuno"
      width={914}
      height={309}
      className={cn("h-6 w-auto select-none", className)}
      draggable={false}
    />
  );
}
