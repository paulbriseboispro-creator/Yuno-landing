import { useLegal } from "@/content/legal";
import { useLocale } from "@/i18n/locale";
import { LegalLayout } from "@/pages/legal-layout";

// Page component shared by the English route (/privacy) and its French twin
// (/fr/privacy). It lives outside routes/ so the router's component code-split
// doesn't strip the named export the /fr route imports.
export function PrivacyPage() {
  const t = useLegal().privacy;
  return (
    <LegalLayout lang={useLocale()} path="/privacy" t={t}>
      {t.sections.map((section) => (
        <div key={section.title}>
          <h2 className="yl-h3 mb-2 text-xl text-zinc-950">{section.title}</h2>
          <p>{section.body}</p>
        </div>
      ))}
    </LegalLayout>
  );
}
