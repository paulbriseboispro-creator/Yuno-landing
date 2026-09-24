// Pings IndexNow (Bing — which feeds ChatGPT Search and Copilot —, Yandex,
// Seznam, Naver…) with every URL of the live sitemap, so new or updated pages
// are crawled within hours instead of weeks. Runs after `wrangler deploy`
// (see the "deploy" script); never fails the deploy.
//   bun scripts/indexnow.ts
const HOST = "landing.yunoapp.eu";
// Public by design: the same key is served at https://<host>/<key>.txt.
const KEY = "6b140d006ec847b001a56b818a20ab7c";

async function main() {
  const sitemap = await fetch(`https://${HOST}/sitemap.xml`).then((r) => r.text());
  const urlList = [...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1]);
  if (!urlList.length) throw new Error("no <loc> found in the live sitemap");
  const res = await fetch("https://api.indexnow.org/indexnow", {
    method: "POST",
    headers: { "Content-Type": "application/json; charset=utf-8" },
    body: JSON.stringify({
      host: HOST,
      key: KEY,
      keyLocation: `https://${HOST}/${KEY}.txt`,
      urlList,
    }),
  });
  console.log(`IndexNow: ${res.status} for ${urlList.length} URLs`);
}

main().catch((e) => console.warn("IndexNow skipped:", e instanceof Error ? e.message : e));
