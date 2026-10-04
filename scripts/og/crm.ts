// Renders the link-preview images of Yuno CRM (crm.yunoapp.eu, WhatsApp,
// iMessage, LinkedIn, Slack, X…): public/og/crm-{en,fr,es}.png at 1200×630.
// Built to make the click: the page's promise (hero title + accent), Shotgun
// recognised at a glance, the offer as a button (14-day trial, no card), and
// the real Console as proof, captured from the live page in each language.
//
//   CHROMIUM_PATH="/Applications/Google Chrome.app/Contents/MacOS/Google Chrome" bun scripts/og/crm.ts
//
// Copy comes from src/content/crm.ts (hero + toasts): re-run after changing it,
// then bump CRM_OG_VERSION in src/i18n/crm.ts. OG_SOURCE overrides the page the
// Console is captured from (default https://crm.yunoapp.eu, e.g. a local
// `wrangler dev` on http://crm.localhost:8787).
import { readFileSync, mkdirSync } from "node:fs";
import { resolve } from "node:path";
import { chromium, type Browser } from "playwright-core";
import { crmContent } from "../../src/content/crm";
import type { LandingLang } from "../../src/i18n/landing-lang";

const LANGS: LandingLang[] = ["en", "fr", "es"];
const SOURCE = process.env.OG_SOURCE ?? "https://crm.yunoapp.eu";
// The CRM page on its domain (src/i18n/hosts.ts, CRM_HOST_PATHS).
const PAGE_PATH: Record<LandingLang, string> = { en: "/", fr: "/fr", es: "/es" };
const BROWSER_LOCALE: Record<LandingLang, string> = { en: "en-GB", fr: "fr-FR", es: "es-ES" };

const ROOT = resolve(import.meta.dir, "../..");
const dataUri = (file: string, mime: string) =>
  `data:${mime};base64,${readFileSync(resolve(ROOT, file)).toString("base64")}`;

const BRICOLAGE = dataUri("scripts/og/bricolage-latin.woff2", "font/woff2");
const GEIST = dataUri("scripts/og/geist-latin.woff2", "font/woff2");
const APP_ICON = dataUri("src/assets/crm/yuno-app-icon.webp", "image/webp");
const SHOTGUN = dataUri("src/assets/crm/shotgun-logo.webp", "image/webp");

const esc = (s: string) =>
  s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");

const ARROW = `<svg viewBox="0 0 24 24" fill="none" stroke="#E3141B" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>`;
const CHECK = `<svg viewBox="0 0 24 24" fill="none" stroke="#17A34A" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><path d="M20 6 9 17l-5-5"/></svg>`;

// The Console in the hero frame of the live page, flat and still (reduced
// motion stops the self-tour), without the floating toasts: they are drawn
// here, larger, so they read in a thumbnail.
async function captureConsole(browser: Browser, lang: LandingLang): Promise<string> {
  const page = await browser.newPage({
    viewport: { width: 1440, height: 1100 },
    deviceScaleFactor: 2,
    reducedMotion: "reduce",
    locale: BROWSER_LOCALE[lang],
  });
  try {
    // "load", not "networkidle": analytics keep the network busy on some loads.
    await page.goto(SOURCE + PAGE_PATH[lang], { waitUntil: "load", timeout: 60_000 });
    await page.waitForSelector(".yc-frame");
    await page.evaluate(() => {
      // Frame top near the top of the screen: the scroll-driven tilt is flat there.
      const el = document.querySelector(".yc-frame")!;
      window.scrollTo(0, el.getBoundingClientRect().top + window.scrollY - 90);
      document
        .querySelectorAll<HTMLElement>(".pointer-events-none.absolute.inset-0.z-20")
        .forEach((t) => (t.style.display = "none"));
    });
    // Count-ups and the late-loading avatars settle.
    await page.waitForTimeout(4000);
    await page.evaluate(() => document.fonts.ready);
    const png = await page.locator(".yc-frame").first().screenshot({ type: "png" });
    return `data:image/png;base64,${png.toString("base64")}`;
  } finally {
    await page.close();
  }
}

function ogHtml(lang: LandingLang, consoleShot: string) {
  const h = crmContent[lang].hero;
  // Two sentences, each on its own block; the accent word in the brand gradient.
  const sentences = h.title.split(/(?<=\.)\s+/);
  const title = sentences
    .map((s) => {
      const i = s.indexOf(h.accent);
      const body =
        i < 0
          ? esc(s)
          : `${esc(s.slice(0, i))}<span class="acc">${esc(h.accent)}</span>${esc(s.slice(i + h.accent.length))}`;
      return `<span class="s">${body}</span>`;
    })
    .join("");
  const [regular, , sales] = h.toasts;
  return `<!doctype html><html lang="${lang}"><head><meta charset="utf-8"><style>
  @font-face{font-family:Bricolage;font-weight:200 800;font-stretch:75% 100%;src:url(${BRICOLAGE}) format("woff2")}
  @font-face{font-family:Geist;font-weight:100 900;src:url(${GEIST}) format("woff2")}
  *{box-sizing:border-box;margin:0;padding:0}
  html,body{width:1200px;height:630px;overflow:hidden}
  body{font-family:Geist,sans-serif;color:#1c1517;background:#fcfaf9;position:relative;-webkit-font-smoothing:antialiased}
  .aura{position:absolute;left:520px;top:120px;width:1000px;height:760px;border-radius:50%;filter:blur(10px);
    background:radial-gradient(closest-side,rgba(255,107,53,.26),rgba(227,20,27,.13) 45%,rgba(252,250,249,0) 72%)}
  .left{position:absolute;left:64px;top:58px;width:560px}
  .brand{display:flex;align-items:center;gap:12px}
  .brand img{width:44px;height:44px;border-radius:12px;box-shadow:0 1px 2px rgba(28,21,23,.14)}
  .brand b{font-family:Bricolage;font-size:31px;font-weight:700;letter-spacing:-.03em;line-height:1}
  .chip{display:inline-flex;align-items:center;gap:9px;margin-top:26px;padding:5px 16px 5px 5px;border:1px solid #e6dfdd;
    border-radius:999px;background:#fff;font-size:18px;font-weight:600;color:#3d3437;box-shadow:0 1px 2px rgba(28,21,23,.06)}
  .tag{display:inline-flex;align-items:center;height:32px;padding:0 13px;border-radius:999px;background:#1c1517;color:#fff;font-size:15px;font-weight:600}
  .chip img{width:24px;height:24px;border-radius:6px}
  h1{margin-top:22px;font-family:Bricolage;font-weight:600;letter-spacing:-.035em;line-height:1.02;font-size:64px;text-wrap:balance}
  h1 .s{display:block}
  .acc{background:linear-gradient(110deg,#e3141b 0%,#f2392a 45%,#ff6b35 100%);-webkit-background-clip:text;background-clip:text;color:transparent;padding-bottom:.06em}
  .cta{display:inline-flex;align-items:center;gap:16px;margin-top:30px;height:66px;padding:0 9px 0 30px;border-radius:999px;
    background:linear-gradient(110deg,#e3141b 0%,#f2392a 45%,#ff6b35 100%);color:#fff;font-size:23px;font-weight:600;letter-spacing:-.01em;
    box-shadow:inset 0 1px 0 rgba(255,255,255,.35),inset 0 -3px 0 rgba(0,0,0,.1),0 10px 22px rgba(227,20,27,.32),0 0 0 7px rgba(227,20,27,.08)}
  .disc{width:48px;height:48px;border-radius:50%;background:#fff;display:flex;align-items:center;justify-content:center}
  .disc svg{width:24px;height:24px}
  .trust{display:flex;align-items:center;gap:9px;margin-top:20px;font-size:19px;font-weight:500;color:#5e5457}
  .trust svg{width:21px;height:21px}
  .shot{position:absolute;left:652px;top:96px;width:860px;border-radius:24px;overflow:hidden;background:#fff;
    box-shadow:0 0 0 1px #e6dfdd,0 4px 8px rgba(28,21,23,.04),0 34px 70px -18px rgba(28,21,23,.32)}
  .shot img{display:block;width:100%}
  .toast{position:absolute;display:flex;align-items:center;gap:13px;padding:12px 22px 12px 12px;border-radius:20px;background:#fff;
    white-space:nowrap;box-shadow:0 0 0 1px #e6dfdd,0 2px 4px rgba(28,21,23,.06),0 24px 46px -14px rgba(28,21,23,.36)}
  .ic{width:46px;height:46px;border-radius:50%;flex:none;display:flex;align-items:center;justify-content:center;font-weight:700}
  .tt{font-size:19px;font-weight:600;letter-spacing:-.01em;line-height:1.2}
  .ts{font-size:15.5px;color:#857b7d;margin-top:3px}
</style></head><body>
<div class="aura"></div>
<div class="shot"><img src="${consoleShot}" alt=""></div>
<div class="toast" style="left:610px;top:262px">
  <div class="ic" style="background:linear-gradient(135deg,#FFE1DF,#FFC4C0);color:#9D0B12;font-size:16px">CR</div>
  <div><div class="tt">${esc(regular.title)}</div><div class="ts">${esc(regular.sub)}</div></div>
</div>
<div class="toast" style="left:742px;top:462px">
  <div class="ic" style="background:#eaf8ef;color:#0f7a37;font-size:19px">▲</div>
  <div><div class="tt">${esc(sales.title.replace(/^▲\s*/, ""))}</div><div class="ts">${esc(sales.sub)}</div></div>
</div>
<div class="left">
  <div class="brand"><img src="${APP_ICON}" alt=""><b>yuno</b></div>
  <div class="chip"><span class="tag">${esc(h.eyebrowTag)}</span><img src="${SHOTGUN}" alt="">${esc(h.eyebrow)}</div>
  <h1>${title}</h1>
  <div class="cta">${esc(h.cta)}<span class="disc">${ARROW}</span></div>
  <div class="trust">${CHECK}${esc(h.trust[2])}</div>
</div>
<script>
  // Fit the title: the longest language must leave room for the button.
  document.fonts.ready.then(() => {
    const h1 = document.querySelector("h1");
    let size = 64;
    while (size > 44 && (h1.offsetHeight > 268 || h1.scrollWidth > 560)) {
      size -= 1;
      h1.style.fontSize = size + "px";
    }
    document.body.dataset.ready = "1";
  });
</script>
</body></html>`;
}

const browser = await chromium.launch(
  process.env.CHROMIUM_PATH ? { executablePath: process.env.CHROMIUM_PATH } : {},
);
try {
  mkdirSync(resolve(ROOT, "public/og"), { recursive: true });
  for (const lang of LANGS) {
    const shot = await captureConsole(browser, lang);
    // A fresh page per language: setContent() reuses the JS realm.
    const page = await browser.newPage({ viewport: { width: 1200, height: 630 } });
    await page.setContent(ogHtml(lang, shot), { waitUntil: "load" });
    await page.waitForFunction(() => document.body.dataset.ready === "1");
    const out = resolve(ROOT, `public/og/crm-${lang}.png`);
    await page.screenshot({ path: out, type: "png" });
    console.log("wrote", out);
    await page.close();
  }
} finally {
  await browser.close();
}
