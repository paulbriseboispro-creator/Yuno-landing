import { useLegal } from "@/content/legal";

// Page component shared by the English route (/privacy) and its French twin
// (/fr/privacy). It lives outside routes/ so the router's component code-split
// doesn't strip the named export the /fr route imports.
export function PrivacyPage() {
  const t = useLegal().privacy;
  return (
    <section className="pt-24 pb-24 px-6">
      <div className="mx-auto max-w-3xl">
        <span className="inline-block text-xs font-medium uppercase tracking-[0.18em] text-accent border border-accent/40 rounded-full px-3 py-1 mb-6">
          {t.badge}
        </span>
        <h1 className="text-4xl md:text-5xl font-medium tracking-tight text-balance mb-4">
          {t.heading}
        </h1>
        <p className="text-sm text-muted-foreground mb-10">
          {t.lastUpdated}
        </p>

        <div className="rounded-2xl bg-surface ring-1 ring-border p-6 md:p-8 mb-10">
          <p className="text-sm text-muted-foreground leading-relaxed">
            <strong className="text-foreground">{t.placeholder}</strong>{" "}
            {t.notice}{" "}
            <a className="text-accent hover:underline" href="mailto:contact@yunoapp.eu">
              contact@yunoapp.eu
            </a>
            .
          </p>
        </div>

        <div className="space-y-8 text-sm text-muted-foreground leading-relaxed">
          {t.sections.map((section) => (
            <div key={section.title}>
              <h2 className="text-xl font-medium text-foreground tracking-tight mb-2">
                {section.title}
              </h2>
              <p>{section.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
