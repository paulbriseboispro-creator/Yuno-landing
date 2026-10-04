import { ChevronLeft, ChevronRight, Download, Settings } from "lucide-react";
import { cn } from "@/lib/utils";
import { useCrm } from "./content";

// A generic ticketing back office on a phone (the reference shows Instagram
// Insights here): one total per night, an export, and nothing about people.
// Deliberately unbranded — this is "a billetterie", not a competitor.
export function TicketingPhone({ className }: { className?: string }) {
  const ph = useCrm().problem.phone;
  return (
    <div
      className={cn(
        "relative w-[280px] rounded-[46px] bg-[#111] p-[10px] shadow-[0_2px_0_1px_#2a2a2a_inset,0_40px_80px_-30px_rgba(28,21,23,.55),0_0_0_1px_rgba(0,0,0,.6)]",
        className,
      )}
    >
      <div className="relative overflow-hidden rounded-[37px] bg-white">
        <div className="flex h-11 items-center justify-between px-7 pt-1 text-[13px] font-semibold text-black">
          <span>{ph.time}</span>
          <span className="absolute left-1/2 top-2.5 h-[26px] w-[92px] -translate-x-1/2 rounded-full bg-black" />
          <span className="flex items-center gap-1">
            <span className="flex items-end gap-[2px]">
              {[4, 6, 8, 10].map((h) => (
                <i key={h} className="block w-[3px] rounded-[1px] bg-black" style={{ height: h }} />
              ))}
            </span>
            <span className="ml-1 h-[11px] w-[22px] rounded-[3px] border border-black/60 p-[1.5px]">
              <span className="block h-full w-3/4 rounded-[1px] bg-black" />
            </span>
          </span>
        </div>
        <div className="flex items-center justify-between px-4 py-2">
          <span className="grid size-8 place-items-center rounded-full bg-zinc-100">
            <ChevronLeft className="size-4" />
          </span>
          <span className="text-[13.5px] font-semibold">{ph.app}</span>
          <span className="grid size-8 place-items-center rounded-full bg-zinc-100">
            <Settings className="size-4" />
          </span>
        </div>
        <div className="px-4 pb-2 pt-1">
          <div className="text-[17px] font-semibold tracking-tight">{ph.title}</div>
          <div className="text-[12px] text-zinc-500">{ph.date}</div>
        </div>
        <div className="mx-4 divide-y divide-zinc-100 rounded-2xl border border-zinc-100">
          {ph.stats.map((s) => (
            <div
              key={s.label}
              className="flex items-center justify-between px-3.5 py-2.5 text-[13px]"
            >
              <span className="text-zinc-600">{s.label}</span>
              <span className="flex items-center gap-1 font-semibold">
                {s.value}
                <ChevronRight className="size-3.5 text-zinc-400" />
              </span>
            </div>
          ))}
        </div>
        <div className="px-4 pb-1 pt-4 text-[12.5px] font-semibold">{ph.section}</div>
        <div className="mx-4 mb-6 divide-y divide-zinc-100">
          {ph.rows.map((r, i) => (
            <div key={r} className="flex items-center justify-between py-2.5 text-[13px]">
              <span className="flex items-center gap-2 text-zinc-700">
                {i === 0 && <Download className="size-3.5 text-zinc-500" />}
                {r}
              </span>
              <ChevronRight className="size-3.5 text-zinc-400" />
            </div>
          ))}
        </div>
        <div className="mx-auto mb-2 h-1 w-28 rounded-full bg-black" />
      </div>
    </div>
  );
}
