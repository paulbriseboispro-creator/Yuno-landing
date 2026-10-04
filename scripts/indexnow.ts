// Pings IndexNow (Bing — which feeds ChatGPT Search and Copilot —, Yandex,
// Seznam, Naver…) with every URL of the live sitemaps, so new or updated pages
// are crawled within hours instead of weeks. Runs after `wrangler deploy`
// (see the "deploy" script); never fails the deploy.
//   bun scripts/indexnow.ts
// One submission per domain (IndexNow wants a single host per call): the
// landing, and Yuno CRM on crm.yunoapp.eu (same Worker, same key file).
const SITES = [
  { host: "landing.yunoapp.eu", sitemap: "sitemap.xml" },
  { host: "crm.yunoapp.eu", sitemap: "sitemap-crm.xml" },
];
// Public by design: the same key is served at https://<host>/<key>.txt.
const KEY = "6b140d006ec847b001a56b818a20ab7c";

async function ping(host: string, sitemap: string) {
  const xml = await fetch(`https://${host}/${sitemap}`).then((r) => r.text());
  const urlList = [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1]);
  if (!urlList.length) throw new Error(`no <loc> found in https://${host}/${sitemap}`);
  const res = await fetch("https://api.indexnow.org/indexnow", {
    method: "POST",
    headers: { "Content-Type": "application/json; charset=utf-8" },
    body: JSON.stringify({
      host,
      key: KEY,
      keyLocation: `https://${host}/${KEY}.txt`,
      urlList,
    }),
  });
  console.log(`IndexNow ${host}: ${res.status} for ${urlList.length} URLs`);
}

async function main() {
  for (const { host, sitemap } of SITES) {
    await ping(host, sitemap).catch((e) =>
      console.warn(`IndexNow ${host} skipped:`, e instanceof Error ? e.message : e),
    );
  }
}

main();
