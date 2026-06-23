import * as React from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { LayoutGridIcon, PowerIcon, FeatherIcon, CreditCardIcon, LifeBuoyIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { useHome } from "@/content/home";

export interface FaqItem {
  id: string;
  category: string;
  title: string;
  content: string;
}

export function FaqSection({ items, eyebrow, title }: { items: FaqItem[]; eyebrow: string; title: string }) {
  const t = useHome();
  const [activeCategory, setActiveCategory] = React.useState("all");

  const categories = [
    { icon: <LayoutGridIcon className="size-4" />, id: "all", label: t.faq.categories.all },
    { icon: <PowerIcon className="size-4" />, id: "getting-started", label: t.faq.categories["getting-started"] },
    { icon: <FeatherIcon className="size-4" />, id: "features", label: t.faq.categories.features },
    { icon: <CreditCardIcon className="size-4" />, id: "billing", label: t.faq.categories.billing },
    { icon: <LifeBuoyIcon className="size-4" />, id: "support", label: t.faq.categories.support },
  ];

  const filtered = React.useMemo(() => {
    if (activeCategory === "all") return items;
    return items.filter((faq) => faq.category === activeCategory);
  }, [activeCategory, items]);

  const currentCategory = React.useMemo(
    () => categories.find((cat) => cat.id === activeCategory),
    [activeCategory, categories]
  );

  return (
    <section className="mx-auto w-full max-w-5xl">
      <div className="flex flex-col items-center justify-center gap-4 px-4 py-16">
        <span className="inline-block text-xs font-medium uppercase tracking-[0.18em] text-accent border border-accent/40 rounded-full px-3 py-1">
          {eyebrow}
        </span>
        <h2 className="text-balance text-4xl md:text-5xl font-medium tracking-tight">
          {title}
        </h2>
      </div>
      <div className="relative grid min-h-full grid-cols-1 py-12 md:grid-cols-3">
        {/* Category tabs */}
        <div className="flex h-full items-start justify-center border-b border-border pb-2 md:border-b-0">
          <div className="flex w-max flex-wrap items-start justify-start gap-2 md:flex-col md:justify-center">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={cn(
                  "inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium transition-colors",
                  activeCategory === cat.id
                    ? "bg-surface-2 text-foreground ring-1 ring-border"
                    : "text-muted-foreground hover:text-foreground"
                )}
              >
                {cat.icon}
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        {/* Accordion */}
        <div className="col-span-2 space-y-5 px-4 py-5">
          {currentCategory && activeCategory !== "all" && (
            <div className="flex items-center gap-2 text-sm font-medium">
              {currentCategory.icon}
              {currentCategory.label}
            </div>
          )}
          <Accordion className="space-y-2" collapsible type="single">
            {filtered.map((item) => (
              <AccordionItem
                className="border-0"
                key={item.id}
                value={item.id}
              >
                <AccordionTrigger className="rounded-xl bg-surface px-5 py-4 text-sm font-medium hover:no-underline hover:bg-surface-2 transition-colors text-left">
                  {item.title}
                </AccordionTrigger>
                <AccordionContent className="px-5 pt-3 pb-4 text-sm text-muted-foreground leading-relaxed">
                  {item.content}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  );
}
