import type { ReactNode } from "react";
import { Lock } from "lucide-react";
import { cn } from "@/lib/utils";

// A light browser window around a (dark) Yuno app capture.
export function BrowserFrame({
  url,
  children,
  className,
}: {
  url: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "overflow-hidden rounded-2xl border border-zinc-200 bg-white shadow-[0_1px_2px_rgba(10,10,11,0.05),0_30px_60px_-24px_rgba(10,10,11,0.28)]",
        className,
      )}
    >
      <div className="flex h-9 items-center gap-3 border-b border-zinc-100 bg-zinc-50/80 px-3.5">
        <div className="flex gap-1.5">
          <span className="size-2.5 rounded-full bg-[#ff5f57]" />
          <span className="size-2.5 rounded-full bg-[#febc2e]" />
          <span className="size-2.5 rounded-full bg-[#28c840]" />
        </div>
        <div className="mx-auto flex h-5 min-w-0 max-w-[60%] items-center gap-1.5 rounded-md bg-white px-2.5 text-[11px] text-zinc-400 ring-1 ring-zinc-200/80">
          <Lock className="size-2.5 shrink-0" />
          <span className="truncate">{url}</span>
        </div>
        <div className="w-10" />
      </div>
      <div className="bg-zinc-950">{children}</div>
    </div>
  );
}
