// Renders the link-preview images of the main landing (WhatsApp, iMessage,
// LinkedIn, Slack, X…): public/og/landing-{en,fr,es}.png at 1200×630, plus the
// square app icons (public/apple-touch-icon.png, public/icon-192.png).
//
// Copy comes from src/content/landing.ts, so re-run this after changing the
// hero copy:   bun run og
// Needs a Chromium for playwright-core (`bunx playwright install chromium`
// locally, or CHROMIUM_PATH=/path/to/chrome).
import { readFileSync, mkdirSync } from "node:fs";
import { resolve } from "node:path";
import { chromium } from "playwright-core";
import { landingContent } from "../../src/content/landing";
import type { LandingLang } from "../../src/i18n/landing-lang";

const LANDING_LANGS: LandingLang[] = ["en", "fr", "es"];

const ROOT = resolve(import.meta.dir, "../..");
const dataUri = (file: string, mime: string) =>
  `data:${mime};base64,${readFileSync(resolve(ROOT, file)).toString("base64")}`;

const LOGO = dataUri("src/assets/yuno-logo.png", "image/png");
const DASHBOARD = dataUri("src/assets/home/club-dashboard.webp", "image/webp");
const INTER = dataUri("scripts/og/inter-latin.woff2", "font/woff2");
const FAVICON = dataUri("public/favicon.ico", "image/x-icon");

const esc = (s: string) =>
  s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");

const CHECK = `<svg viewBox="0 0 24 24" fill="none" stroke="#10b981" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><path d="M20 6 9 17l-5-5"/></svg>`;
const CROWN = `<svg viewBox="0 0 24 24" fill="none" stroke="#B45309" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M11.562 3.266a.5.5 0 0 1 .876 0L15.39 8.87a1 1 0 0 0 1.516.294L21.183 5.5a.5.5 0 0 1 .798.519l-2.834 10.246a1 1 0 0 1-.956.734H5.81a1 1 0 0 1-.957-.734L2.02 6.02a.5.5 0 0 1 .798-.519l4.276 3.664a1 1 0 0 0 1.516-.294z"/><path d="M5 21h14"/></svg>`;

function ogHtml(lang: LandingLang) {
  const t = landingContent[lang];
  const notif = t.hero.notifications[0];
  return `<!doctype html><html lang="${lang}"><head><meta charset="utf-8"><style>
  @font-face{font-family:Inter;font-weight:100 900;src:url(${INTER}) format("woff2")}
  *{box-sizing:border-box;margin:0;padding:0}
  html,body{width:1200px;height:630px;overflow:hidden}
  body{font-family:Inter,sans-serif;color:#0a0a0b;background:#fff;position:relative;
    font-feature-settings:"cv11","ss01";-webkit-font-smoothing:antialiased}
  .wash{position:absolute;inset:0;background:
    radial-gradient(50% 75% at 92% 60%,rgba(232,25,44,.16),rgba(232,25,44,0) 70%),
    radial-gradient(60% 60% at 15% 0%,#f4f4f6,rgba(255,255,255,0) 70%)}
  .grain{position:absolute;inset:0;background-image:radial-gradient(rgba(10,10,11,.07) 1px,transparent 1px);
    background-size:22px 22px;-webkit-mask-image:linear-gradient(90deg,transparent 35%,black 75%)}
  .ring{position:absolute;border:1.5px solid #ececef;border-radius:50%;left:980px;top:350px;transform:translate(-50%,-50%)}
  .left{position:absolute;left:72px;top:100px;width:600px}
  .logo{height:38px;display:block}
  .chip{display:inline-flex;align-items:center;gap:10px;margin-top:34px;padding:8px 16px 8px 14px;border:1px solid #e4e4e7;
    border-radius:999px;background:#fff;font-size:17px;font-weight:500;color:#52525b;box-shadow:0 1px 2px rgba(10,10,11,.04)}
  .dot{width:9px;height:9px;border-radius:50%;background:#10b981;box-shadow:0 0 0 4px rgba(16,185,129,.18)}
  h1{margin-top:24px;font-size:66px;line-height:1.04;letter-spacing:-.045em;font-weight:600}
  h1 span{display:block;white-space:nowrap;width:max-content}
  h1 .b{background:linear-gradient(#0a0a0b,#71717a);-webkit-background-clip:text;background-clip:text;color:transparent;padding-bottom:6px}
  ul{list-style:none;margin-top:30px;display:flex;flex-direction:column;gap:14px}
  li{display:flex;align-items:center;gap:12px;font-size:22px;font-weight:500;color:#3f3f46;letter-spacing:-.01em}
  li svg{width:22px;height:22px;flex:none}
  .shot{position:absolute;left:700px;top:118px;width:720px;border-radius:14px;overflow:hidden;background:#0a0a0b;
    box-shadow:0 0 0 1px rgba(10,10,11,.85),0 40px 80px -24px rgba(10,10,11,.5),0 8px 20px -8px rgba(10,10,11,.25)}
  .bar{height:28px;background:#18181b;display:flex;align-items:center;gap:7px;padding-left:14px}
  .bar i{width:10px;height:10px;border-radius:50%;background:#3f3f46}
  .shot img{display:block;width:100%}
  .notif{position:absolute;left:652px;top:478px;display:flex;align-items:center;gap:14px;padding:14px 22px 14px 14px;
    background:#fff;border-radius:18px;white-space:nowrap;border:1px solid #f0f0f2;
    box-shadow:0 1px 2px rgba(10,10,11,.06),0 22px 44px -14px rgba(10,10,11,.4)}
  .ic{width:46px;height:46px;border-radius:12px;background:#FEF3C7;display:flex;align-items:center;justify-content:center;flex:none}
  .ic svg{width:24px;height:24px}
  .nt{font-size:18px;font-weight:600;letter-spacing:-.015em}
  .nm{font-size:15px;color:#71717a;margin-top:3px}
</style></head><body>
<div class="wash"></div><div class="grain"></div>
${[420, 700, 980].map((d) => `<div class="ring" style="width:${d}px;height:${d}px"></div>`).join("")}
<div class="shot"><div class="bar"><i></i><i></i><i></i></div><img src="${DASHBOARD}" alt=""></div>
<div class="notif"><div class="ic">${CROWN}</div><div><div class="nt">${esc(notif.title)}</div><div class="nm">${esc(notif.meta)}</div></div></div>
<div class="left">
  <img class="logo" src="${LOGO}" alt="">
  <div class="chip"><span class="dot"></span>${esc(t.hero.chips[0])}</div>
  <h1><span>${esc(t.hero.titleA)}</span><span class="b">${esc(t.hero.titleB)}</span></h1>
  <ul>${t.hero.note.map((n) => `<li>${CHECK}${esc(n)}</li>`).join("")}</ul>
</div>
<script>
  // Shrink the headline until its longest line fits the left column.
  const h = document.querySelector("h1");
  const widest = () => Math.max(...[...h.children].map((s) => s.getBoundingClientRect().width));
  document.fonts.ready.then(() => {
    let px = 66;
    while (widest() > 580 && px > 40) h.style.fontSize = --px + "px";
    document.body.dataset.ready = "1";
  });
</script>
</body></html>`;
}

// Square icon (iMessage / Slack / home screen): the favicon art, full bleed.
const iconHtml = (px: number) => `<!doctype html><html><head><style>
  *{margin:0}html,body{width:${px}px;height:${px}px;overflow:hidden;background:#E8192C}
  img{width:100%;height:100%;display:block;image-rendering:auto}
</style></head><body><img src="${FAVICON}" alt=""></body></html>`;

const browser = await chromium.launch(
  process.env.CHROMIUM_PATH ? { executablePath: process.env.CHROMIUM_PATH } : {},
);
try {
  mkdirSync(resolve(ROOT, "public/og"), { recursive: true });
  for (const lang of LANDING_LANGS) {
    // A fresh page each time: setContent() reuses the JS realm, so the inline
    // script's top-level consts would clash on the second language.
    const page = await browser.newPage({ viewport: { width: 1200, height: 630 } });
    await page.setContent(ogHtml(lang), { waitUntil: "load" });
    await page.waitForFunction(() => document.body.dataset.ready === "1");
    const out = resolve(ROOT, `public/og/landing-${lang}.png`);
    await page.screenshot({ path: out, type: "png" });
    console.log("wrote", out);
    await page.close();
  }
  const page = await browser.newPage();
  for (const [px, file] of [
    [180, "public/apple-touch-icon.png"],
    [192, "public/icon-192.png"],
  ] as const) {
    await page.setViewportSize({ width: px, height: px });
    await page.setContent(iconHtml(px), { waitUntil: "load" });
    await page.screenshot({ path: resolve(ROOT, file), type: "png" });
    console.log("wrote", resolve(ROOT, file));
  }
} finally {
  await browser.close();
}
