import type { CrmPageContent } from "@/content/crm-pages/types";
import { CRM_PAGES, crmPageParent } from "@/content/crm-pages";
import { CRM_PAGE } from "@/i18n/crm-pages";
import { CRM_ORIGIN, crmUrl } from "@/i18n/hosts";
import { ORG_ID, organizationLd } from "@/i18n/landing-seo";
import { crmOgImageMeta, crmOgImageUrl } from "@/i18n/og";

// head() of a Yuno CRM content page (crm.yunoapp.eu/fr/…): meta and OG (the CRM
// preview image), self canonical (French only: no hreflang twins), and one
// JSON-LD @graph: Organization, the page (WebPage, Article for a guide,
// CollectionPage for the hub) with author and dates, BreadcrumbList, FAQPage
// generated from the visible FAQ, and a reference to the Yuno CRM
// SoftwareApplication described on the CRM page.

export function crmPageUrl(page: CrmPageContent): string {
  return CRM_ORIGIN + CRM_PAGE[page.id];
}

// Inline markup → plain text (JSON-LD, markdown, meta).
function plain(text: string): string {
  return text.replace(/\*\*(.+?)\*\*/g, "$1").replace(/\[([^\]]+)\]\([^)]+\)/g, "$1");
}

export function crmPageHead(page: CrmPageContent) {
  const self = crmPageUrl(page);
  const image = crmOgImageUrl("fr");
  const app = `${crmUrl("fr")}#app`;
  const parent = crmPageParent(page);
  const crumbs = [
    { name: "Yuno CRM", item: crmUrl("fr") },
    ...(parent ? [{ name: CRM_PAGES[parent].crumb, item: CRM_ORIGIN + CRM_PAGE[parent] }] : []),
    { name: page.crumb, item: self },
  ];
  const type =
    page.kind === "guide" ? "Article" : page.kind === "hub" ? "CollectionPage" : "WebPage";
  const author = { "@type": "Person", name: "Paul Brisebois", jobTitle: "Fondateur, Yuno" };

  const graph: Record<string, unknown>[] = [
    organizationLd("fr"),
    {
      "@type": type,
      "@id": `${self}#page`,
      url: self,
      name: page.meta.title,
      ...(type === "Article" ? { headline: page.hero.title } : {}),
      description: page.meta.description,
      inLanguage: "fr",
      datePublished: page.published,
      dateModified: page.updated,
      author,
      publisher: { "@id": ORG_ID },
      about: { "@id": app },
      image,
      primaryImageOfPage: { "@type": "ImageObject", url: image, width: 1200, height: 630 },
      breadcrumb: { "@id": `${self}#breadcrumb` },
      ...(type === "Article" ? { mainEntityOfPage: self } : {}),
      ...(page.kind === "hub"
        ? {
            hasPart: page.blocks.flatMap((b) =>
              b.type === "links"
                ? b.pages.map((id) => ({
                    "@type": "WebPage",
                    url: CRM_ORIGIN + CRM_PAGE[id],
                    name: CRM_PAGES[id].meta.title,
                  }))
                : [],
            ),
          }
        : {}),
    },
    {
      "@type": "BreadcrumbList",
      "@id": `${self}#breadcrumb`,
      itemListElement: crumbs.map((c, i) => ({
        "@type": "ListItem",
        position: i + 1,
        name: c.name,
        item: c.item,
      })),
    },
    {
      "@type": "SoftwareApplication",
      "@id": app,
      name: "Yuno CRM",
      applicationCategory: "BusinessApplication",
      applicationSubCategory: "CRM",
      operatingSystem: "Web",
      url: crmUrl("fr"),
      publisher: { "@id": ORG_ID },
    },
  ];
  if (page.faq) {
    graph.push({
      "@type": "FAQPage",
      "@id": `${self}#faq`,
      inLanguage: "fr",
      isPartOf: { "@id": `${self}#page` },
      mainEntity: page.faq.items.map((it) => ({
        "@type": "Question",
        name: it.q,
        acceptedAnswer: { "@type": "Answer", text: plain(it.a) },
      })),
    });
  }

  return {
    meta: [
      { title: page.meta.title },
      { name: "description", content: page.meta.description },
      {
        name: "robots",
        content: "index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1",
      },
      { property: "og:type", content: page.kind === "guide" ? "article" : "website" },
      { property: "og:site_name", content: "Yuno CRM" },
      { property: "og:title", content: page.meta.title },
      { property: "og:description", content: page.meta.description },
      { property: "og:url", content: self },
      { property: "og:locale", content: "fr_FR" },
      ...crmOgImageMeta("fr"),
      { name: "twitter:title", content: page.meta.title },
      { name: "twitter:description", content: page.meta.description },
      ...(page.kind === "guide"
        ? [
            { property: "article:published_time", content: page.published },
            { property: "article:modified_time", content: page.updated },
          ]
        : []),
      { name: "theme-color", content: "#ffffff" },
    ],
    links: [
      { rel: "canonical", href: self },
      { rel: "alternate", hrefLang: "fr", href: self },
      // The CRM page's faces (Bricolage / Geist), as on the CRM page.
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:opsz,wght@12..96,400..800&family=Geist:wght@400..700&family=Geist+Mono:wght@400..600&display=swap",
      },
    ],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({ "@context": "https://schema.org", "@graph": graph }),
      },
    ],
  };
}

// Plain markdown of a CRM content page, for /llms-full.txt.
export function crmPageMarkdown(page: CrmPageContent): string {
  const out: string[] = [
    `# ${page.meta.title}`,
    "",
    `URL: ${crmPageUrl(page)} · ${page.updated}`,
    "",
    `> ${page.meta.description}`,
    "",
    plain(page.hero.sub),
    "",
  ];
  if (page.answer) {
    out.push(
      `## ${page.answer.title}`,
      "",
      ...page.answer.paragraphs.flatMap((p) => [plain(p), ""]),
    );
    if (page.answer.bullets) out.push(...page.answer.bullets.map((b) => `- ${plain(b)}`), "");
  }
  for (const b of page.blocks) {
    if (b.type === "callout" || b.type === "tool") continue;
    out.push(`## ${b.title}`, "");
    if (b.type === "text") {
      out.push(...b.paragraphs.flatMap((p) => [plain(p), ""]));
      if (b.bullets) out.push(...b.bullets.map((x) => `- ${plain(x)}`), "");
    } else if (b.type === "cards") {
      out.push(...b.items.flatMap((it) => [`### ${it.title}`, "", plain(it.body), ""]));
    } else if (b.type === "steps") {
      out.push(...b.items.map((it, i) => `${i + 1}. **${it.title}.** ${plain(it.body)}`), "");
    } else if (b.type === "table") {
      out.push(
        `| ${b.head.join(" | ")} |`,
        `|${b.head.map(() => "---").join("|")}|`,
        ...b.rows.map((r) => `| ${r.map(plain).join(" | ")} |`),
        "",
      );
      if (b.footnote) out.push(`_${plain(b.footnote)}_`, "");
    } else if (b.type === "links") {
      out.push(
        ...b.pages.map(
          (id) =>
            `- [${CRM_PAGES[id].card.title}](${CRM_ORIGIN + CRM_PAGE[id]}): ${CRM_PAGES[id].card.body}`,
        ),
        "",
      );
    }
  }
  if (page.faq) {
    out.push(`## ${page.faq.title}`, "");
    for (const it of page.faq.items) out.push(`### ${it.q}`, "", plain(it.a), "");
  }
  if (page.sources) {
    out.push(
      `## ${page.sources.title}`,
      "",
      ...page.sources.items.map((s) => `- ${s.label}: ${s.url}`),
      "",
    );
  }
  return out.join("\n");
}
