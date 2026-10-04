import { cn } from "@/lib/utils";
import phone from "@/assets/crm/ticketing-phone.webp";

// A real ticketing event page on a phone (the reference shows Instagram
// Insights here): an event, a price, a buy button, nothing about people.
export function TicketingPhone({ className }: { className?: string }) {
  return (
    <img
      src={phone}
      alt=""
      width={989}
      height={2000}
      decoding="async"
      className={cn("block h-auto w-[280px] drop-shadow-[0_40px_50px_rgba(28,21,23,.35)]", className)}
    />
  );
}
