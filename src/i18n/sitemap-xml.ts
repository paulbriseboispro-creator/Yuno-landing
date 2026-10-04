// Plain sitemap XML (<loc> + <lastmod>, no hreflang namespace), shared by
// /sitemap.xml (landing.yunoapp.eu) and /sitemap-crm.xml (crm.yunoapp.eu).

export interface SitemapEntry {
  loc: string;
  lastmod?: string;
}

export function sitemapXml(entries: SitemapEntry[]): string {
  const urls = entries.map((e) =>
    [
      `  <url>`,
      `    <loc>${e.loc}</loc>`,
      e.lastmod ? `    <lastmod>${e.lastmod}</lastmod>` : null,
      `  </url>`,
    ]
      .filter(Boolean)
      .join("\n"),
  );
  return [
    `<?xml version="1.0" encoding="UTF-8"?>`,
    `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">`,
    ...urls,
    `</urlset>`,
    ``,
  ].join("\n");
}
