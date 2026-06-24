import { Reveal } from "@/components/site/Reveal";
import { Banknote, Users, Tag } from "lucide-react";
import { useHome } from "@/content/home";

const icons = { Banknote, Users, Tag } as const;

export function DifferentiatorsSection() {
  const t = useHome();
  const items = t.differentiators.items;
  return (
    <section className="px-6 py-16 border-t border-border">
      <div className="mx-auto max-w-7xl">
        <Reveal className="mb-12 text-center">
          <span className="text-xs font-medium uppercase tracking-[0.18em] text-muted-foreground">
            {t.differentiators.eyebrow}
          </span>
          <h2 className="mt-3 text-3xl md:text-4xl font-medium tracking-tight text-balance max-w-[24ch] mx-auto">
            {t.differentiators.title}
          </h2>
        </Reveal>
        <div className="grid md:grid-cols-3 gap-4">
          {items.map((item, i) => {
            const Icon = icons[item.icon as keyof typeof icons];
            return (
            <Reveal key={item.title} delay={i * 0.08}>
              <article className="h-full p-8 rounded-2xl bg-surface ring-1 ring-border hover:ring-accent/40 transition-all">
                <div className="size-10 rounded-full bg-accent/10 ring-1 ring-accent/40 flex items-center justify-center mb-6">
                  <Icon className="size-5 text-accent" />
                </div>
                <h3 className="text-xl font-medium mb-3 tracking-tight text-balance">{item.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed mb-4">{item.body}</p>
                <p className="text-sm serif italic text-accent">{item.tag}</p>
              </article>
            </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
