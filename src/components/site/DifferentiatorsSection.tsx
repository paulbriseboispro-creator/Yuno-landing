import { Reveal } from "@/components/site/Reveal";
import { Banknote, Users, Tag } from "lucide-react";

const items = [
  {
    icon: Banknote,
    title: "Automatic revenue splits",
    body: "At closing, every party gets paid. Club, organizer, promoters — each to their own Stripe account, automatically. No Excel, no Venmo, no \"I'll sort it tomorrow.\"",
    tag: "The only nightlife platform with multi-party Stripe Connect splits.",
  },
  {
    icon: Users,
    title: "Yuno Collab — organizers pay zero",
    body: "An external organizer wants to throw a night in your venue? They create the event on Yuno, you host the infrastructure. Splits happen automatically. No subscription for them, Pro dashboards free for you that night.",
    tag: "Host more nights, keep more margin.",
  },
  {
    icon: Tag,
    title: "Transparent pricing — you see it before you sign",
    body: "No sales call. No annual contract. No \"contact us for pricing.\" Core starts at €0. Pro at €69/month. You decide.",
    tag: "Fourvenues will send you a quote. We'll send you a link.",
  },
];

export function DifferentiatorsSection() {
  return (
    <section className="px-6 py-24 border-t border-border">
      <div className="mx-auto max-w-7xl">
        <Reveal className="mb-12 text-center">
          <span className="text-xs font-medium uppercase tracking-[0.18em] text-muted-foreground">
            What makes us different
          </span>
          <h2 className="mt-3 text-3xl md:text-4xl font-medium tracking-tight text-balance max-w-[24ch] mx-auto">
            Three things no one else does
          </h2>
        </Reveal>
        <div className="grid md:grid-cols-3 gap-4">
          {items.map((item, i) => (
            <Reveal key={item.title} delay={i * 0.08}>
              <article className="h-full p-8 rounded-2xl bg-surface ring-1 ring-border hover:ring-accent/40 transition-all">
                <div className="size-10 rounded-full bg-accent/10 ring-1 ring-accent/40 flex items-center justify-center mb-6">
                  <item.icon className="size-5 text-accent" />
                </div>
                <h3 className="text-xl font-medium mb-3 tracking-tight text-balance">{item.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed mb-4">{item.body}</p>
                <p className="text-sm serif italic text-accent">{item.tag}</p>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
