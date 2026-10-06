import { Check, History, RefreshCw, ShieldCheck } from "lucide-react";
import shotgunLogo from "@/assets/crm/shotgun-logo.webp";
import { useCrm } from "./content";
import { Avatar, Marquee, Reveal, StatusTag } from "./ui";

// Under the hero, the reference shows the accounts that use it. Yuno shows what
// it does with yours: every Shotgun buyer becomes a profile (a marquee of
// profiles), then the three facts of the connection.
export function CrmProof() {
  const p = useCrm().proof;
  const half = Math.ceil(p.pills.length / 2);
  const icons = [History, RefreshCw, ShieldCheck];
  return (
    <section data-ph-section="proof" className="relative pb-14 pt-10 sm:pb-24 sm:pt-8">
      <Reveal className="mx-auto max-w-[40rem] px-6 text-center">
        <p className="text-pretty text-[17px] font-medium leading-[1.6] text-yc-sand-700 sm:text-[18px]">
          {p.line}
        </p>
      </Reveal>
      <div className="mt-7 flex flex-col gap-2.5 sm:mt-9 sm:gap-3">
        {[p.pills.slice(0, half), p.pills.slice(half)].map((row, r) => (
          <Marquee key={r} reverse={r === 1} duration={r ? 58 : 50} gap={12}>
            {row.map((x) => (
              <div
                key={x.name}
                className="flex flex-none items-center gap-3 rounded-full border border-yc-sand-200 bg-white py-1.5 pl-1.5 pr-2 shadow-[var(--shadow-xs)]"
              >
                <Avatar ini={x.ini} tone={x.tone} size={34} />
                <span className="flex flex-col pr-1">
                  <span className="text-[14px] font-semibold leading-[17px] text-yc-ink">
                    {x.name}
                  </span>
                  <span className="text-[12px] leading-[15px] text-yc-sand-500">{x.meta}</span>
                </span>
                <StatusTag tone={x.tone}>{x.tag}</StatusTag>
              </div>
            ))}
          </Marquee>
        ))}
      </div>

      {/* Phone: one card, the connection on top and its three facts under it */}
      <Reveal className="mx-4 mt-10 overflow-hidden rounded-[24px] bg-yc-ink text-white md:hidden">
        <div className="flex items-center gap-3.5 p-5">
          <img src={shotgunLogo} alt="Shotgun" className="size-11 rounded-[12px]" />
          <span className="flex flex-col">
            <span className="text-[15px] font-semibold leading-tight">{p.connected}</span>
            <span className="mt-1 inline-flex items-center gap-1.5 text-[12.5px] font-medium text-yc-mint">
              <span className="yc-live size-1.5 rounded-full bg-yc-mint" />
              API
            </span>
          </span>
        </div>
        <ul className="divide-y divide-white/[.08] border-t border-white/[.08]">
          {p.facts.map((f, i) => {
            const Icon = icons[i];
            return (
              <li key={f.title} className="flex gap-3.5 px-5 py-4">
                <span className="grid size-8 flex-none place-items-center rounded-[10px] bg-white/[.08]">
                  <Icon className="size-4 text-yc-red-300" strokeWidth={2.2} />
                </span>
                <span className="flex flex-col">
                  <span className="text-[15px] font-semibold">{f.title}</span>
                  <span className="mt-0.5 text-[13.5px] leading-[1.45] text-yc-on-night-2">
                    {f.body}
                  </span>
                </span>
              </li>
            );
          })}
        </ul>
      </Reveal>

      <div className="mx-auto mt-14 hidden max-w-[1120px] grid-cols-1 gap-3 px-4 sm:px-6 md:grid md:grid-cols-4">
        <Reveal className="flex items-center gap-3.5 rounded-[22px] bg-yc-ink p-5 text-white md:col-span-1">
          <img src={shotgunLogo} alt="Shotgun" className="size-11 rounded-[12px]" />
          <span className="flex flex-col">
            <span className="text-[15px] font-semibold leading-tight">{p.connected}</span>
            <span className="mt-1 inline-flex items-center gap-1.5 text-[12.5px] font-medium text-yc-mint">
              <Check className="size-3.5" strokeWidth={3} />
              API
            </span>
          </span>
        </Reveal>
        {p.facts.map((f, i) => {
          const Icon = icons[i];
          return (
            <Reveal
              key={f.title}
              delay={0.08 * (i + 1)}
              className="rounded-[22px] border border-yc-sand-200 bg-white p-5"
            >
              <span className="flex items-center gap-2 text-[15px] font-semibold text-yc-ink">
                <Icon className="size-4 text-yc-red-500" strokeWidth={2.2} />
                {f.title}
              </span>
              <span className="mt-1.5 block text-[13.5px] leading-[1.5] text-yc-sand-600">
                {f.body}
              </span>
            </Reveal>
          );
        })}
      </div>
    </section>
  );
}
