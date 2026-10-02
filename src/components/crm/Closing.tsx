import { useState, type FormEvent } from "react";
import { ArrowRight } from "lucide-react";
import { useLanding } from "@/components/landing/context";
import { FadeIn } from "@/components/landing/ui";
import { useCrm } from "./content";

// Last call: the collective's name opens the signup on the next question.
export function CrmFinal() {
  const f = useCrm().final;
  const { openSignup } = useLanding();
  const [name, setName] = useState("");

  function onSubmit(e: FormEvent) {
    e.preventDefault();
    openSignup({ orgName: name.trim() || undefined });
  }

  return (
    <section data-ph-section="closing" className="px-4 pb-16 sm:px-6 sm:pb-24 md:pb-32">
      <FadeIn className="yl-keep yl-edge relative mx-auto max-w-6xl overflow-hidden rounded-[2rem] bg-zinc-950 px-5 py-14 text-center text-white sm:px-6 sm:py-16 md:px-12 md:py-24">
        <div aria-hidden className="pointer-events-none absolute left-1/2 top-full">
          {[360, 560, 760, 960, 1160].map((d) => (
            <div
              key={d}
              className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/[0.07]"
              style={{ width: d, height: d }}
            />
          ))}
        </div>
        <div
          aria-hidden
          className="pointer-events-none absolute left-1/2 top-full h-[420px] w-[720px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(closest-side,rgba(232,25,44,0.45),transparent)]"
        />
        <div className="relative">
          <h2 className="yl-h2 mx-auto max-w-[18ch] text-balance text-white">{f.title}</h2>
          <p className="mx-auto mt-4 max-w-lg text-pretty text-[15px] leading-relaxed text-zinc-400 md:text-base">
            {f.sub}
          </p>
          <form
            onSubmit={onSubmit}
            className="mx-auto mt-9 flex max-w-lg flex-col gap-2 rounded-full sm:flex-row sm:bg-white/10 sm:p-1.5 sm:ring-1 sm:ring-white/15 sm:backdrop-blur"
          >
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder={f.placeholder}
              aria-label={f.placeholder}
              autoComplete="organization"
              maxLength={120}
              className="h-12 w-full min-w-0 rounded-full bg-white/10 px-5 text-[16px] text-white placeholder:text-zinc-500 outline-none ring-1 ring-white/15 focus:ring-white/40 sm:h-11 sm:flex-1 sm:bg-transparent sm:text-[15px] sm:ring-0"
            />
            <button
              type="submit"
              data-ph-cta="signup_crm"
              className="yl-btn-primary group h-12 bg-white px-5 text-[14px] text-zinc-950 hover:bg-zinc-100 sm:h-11"
            >
              {f.cta}
              <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" />
            </button>
          </form>
        </div>
      </FadeIn>
    </section>
  );
}
