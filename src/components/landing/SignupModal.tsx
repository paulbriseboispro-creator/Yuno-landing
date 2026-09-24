import { useEffect, useRef } from "react";
import { AnimatePresence, motion } from "motion/react";
import { X } from "lucide-react";
import { useLanding } from "./context";
import { SignupFlow } from "./SignupFlow";
import { EASE } from "./ui";

// The landing's conversion dialog: every "Create my free account" CTA opens it.
// The funnel itself (role → club / nights → what you sell → account) lives in
// SignupFlow, shared with the full-page /start route.
export function SignupModal() {
  const { t, signup, closeSignup } = useLanding();
  const s = t.signup;
  const dialogRef = useRef<HTMLDivElement>(null);
  const lastFocus = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (!signup.open) return;
    lastFocus.current = document.activeElement as HTMLElement | null;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeSignup();
      if (e.key === "Tab" && dialogRef.current) {
        const f = dialogRef.current.querySelectorAll<HTMLElement>(
          'button:not([disabled]), input, a[href], [tabindex]:not([tabindex="-1"])',
        );
        if (!f.length) return;
        const first = f[0];
        const last = f[f.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };
    document.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      document.removeEventListener("keydown", onKey);
      lastFocus.current?.focus?.();
    };
  }, [signup.open, closeSignup]);

  return (
    <AnimatePresence>
      {signup.open && (
        <motion.div
          className="fixed inset-0 z-[100] flex items-end justify-center sm:items-center sm:p-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
        >
          <div
            className="absolute inset-0 bg-zinc-950/40 backdrop-blur-[6px]"
            onClick={closeSignup}
          />
          <motion.div
            ref={dialogRef}
            role="dialog"
            aria-modal="true"
            aria-labelledby="signup-title"
            initial={{ opacity: 0, y: 40, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 30, scale: 0.98 }}
            transition={{ duration: 0.4, ease: EASE }}
            className="yl relative max-h-[92dvh] w-full overflow-y-auto rounded-t-[1.75rem] bg-white p-6 shadow-[0_40px_80px_-24px_rgba(10,10,11,0.5)] sm:max-w-[500px] sm:rounded-[1.75rem] sm:p-8"
          >
            <button
              type="button"
              onClick={closeSignup}
              aria-label={s.close}
              className="absolute right-4 top-4 z-10 flex size-9 items-center justify-center rounded-full text-zinc-500 transition-colors hover:bg-zinc-100 hover:text-zinc-900"
            >
              <X className="size-4" />
            </button>
            <SignupFlow
              source="landing"
              initialRole={signup.role}
              initialEmail={signup.email}
              onClose={closeSignup}
            />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
