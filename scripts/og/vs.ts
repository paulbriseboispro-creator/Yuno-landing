// Renders the "Yuno vs <competitor>" link-preview images (public/og/vs-<id>-<lang>.png,
// 1200×630) for the comparison pages listed in PAGES below.
//   bun scripts/og/vs.ts            (all)      ·   bun scripts/og/vs.ts weezevent
// Needs a Chromium for playwright-core (CHROMIUM_PATH=/path/to/chrome).
import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { chromium } from "playwright-core";

const ROOT = resolve(import.meta.dir, "../..");
const dataUri = (file: string, mime: string) =>
  `data:${mime};base64,${readFileSync(resolve(ROOT, file)).toString("base64")}`;
const LOGO = dataUri("src/assets/yuno-logo.png", "image/png");
const INTER = dataUri("scripts/og/inter-latin.woff2", "font/woff2");
const esc = (s: string) => s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

type Vs = {
  id: string;
  lang: "en" | "fr" | "es";
  city: string;
  kicker: string;
  a: string;
  b: string;
  chips: [string, string[]];
  checks: string[];
};

const PAGES: Vs[] = [
  {
    id: "weezevent",
    lang: "fr",
    city: "Madrid · Paris",
    kicker: "Comparatif billetterie 2026",
    a: "Yuno vs Weezevent.",
    b: "Pensée pour toute la soirée.",
    chips: [
      "0 % de commission",
      ["Tables VIP", "Bar au QR code", "Commissions promoteurs", "Répartition club × orga"],
    ],
    checks: ["Frais publics", "Sources datées", "FR · EN · ES"],
  },
  {
    id: "xceed",
    lang: "es",
    city: "Madrid · París",
    kicker: "Comparativa 2026",
    a: "Yuno vs Xceed.",
    b: "Toda la noche en una cuenta.",
    chips: [
      "0 % de comisión",
      ["Reservados", "Barra con QR", "Comisiones RRPP", "Reparto discoteca × organizador"],
    ],
    checks: ["Tarifas públicas", "Fuentes fechadas", "ES · EN · FR"],
  },
  {
    id: "dice",
    lang: "en",
    city: "Madrid · Paris",
    kicker: "Ticketing comparison 2026",
    a: "Yuno vs DICE.",
    b: "Published fees. The whole club night.",
    chips: [
      "0% commission",
      ["VIP tables", "Bar by QR code", "Promoter commissions", "Club × organiser split"],
    ],
    checks: ["Public fees", "Dated sources", "EN · FR · ES"],
  },
];

const html = (p: Vs) => `<!doctype html><html lang="${p.lang}"><head><meta charset="utf-8"><style>
@font-face{font-family:Inter;font-weight:100 900;src:url(${INTER}) format("woff2")}
*{box-sizing:border-box;margin:0;padding:0}
html,body{width:1200px;height:630px;overflow:hidden}
body{font-family:Inter,sans-serif;color:#0a0a0b;background:#fff;position:relative;-webkit-font-smoothing:antialiased}
.wash{position:absolute;inset:0;background:radial-gradient(45% 60% at 92% 100%,rgba(232,25,44,.14),rgba(232,25,44,0) 70%),radial-gradient(60% 60% at 40% 0%,#f4f4f6,rgba(255,255,255,0) 70%)}
.ring{position:absolute;border:1.5px solid #ececef;border-radius:50%;left:600px;top:560px;transform:translate(-50%,-50%)}
.top{position:absolute;left:80px;top:66px;display:flex;align-items:center;gap:16px}
.logo{height:40px}
.chip{display:inline-flex;align-items:center;gap:8px;padding:7px 14px;border:1px solid #e4e4e7;border-radius:999px;background:#fff;font-size:17px;color:#52525b}
.dot{width:8px;height:8px;border-radius:50%;background:#10b981}
.kick{position:absolute;left:80px;top:158px;font-size:26px;color:#71717a}
h1{position:absolute;left:80px;top:206px;font-size:80px;line-height:1.02;letter-spacing:-.045em;font-weight:700;width:1060px}
h1 span{display:block}
h1 .b{background:linear-gradient(#0a0a0b,#52525b);-webkit-background-clip:text;background-clip:text;color:transparent;font-size:64px;padding-top:6px}
.chips{position:absolute;left:80px;top:462px;display:flex;gap:10px;white-space:nowrap}
.c{padding:12px 18px;border-radius:14px;background:#f4f4f5;font-size:19px;font-weight:600;letter-spacing:-.01em}
.c.red{background:#E8192C;color:#fff}
.foot{position:absolute;left:80px;right:80px;top:556px;display:flex;justify-content:space-between;align-items:center;font-size:20px;color:#52525b}
.foot b{color:#0a0a0b}.ok{color:#E8192C;margin-right:8px}.foot span{margin-right:26px}
</style></head><body><div class="wash"></div>
${[520, 860, 1200].map((d) => `<div class="ring" style="width:${d}px;height:${d}px"></div>`).join("")}
<div class="top"><img class="logo" src="${LOGO}" alt=""><div class="chip"><span class="dot"></span>${esc(p.city)}</div></div>
<div class="kick">${esc(p.kicker)}</div>
<h1><span>${esc(p.a)}</span><span class="b">${esc(p.b)}</span></h1>
<div class="chips"><div class="c red">${esc(p.chips[0])}</div>${p.chips[1].map((c) => `<div class="c">${esc(c)}</div>`).join("")}</div>
<div class="foot"><div>${p.checks.map((c) => `<span><i class="ok">✓</i>${esc(c)}</span>`).join("")}</div><b>landing.yunoapp.eu</b></div>
</body></html>`;

const only = process.argv[2];
const browser = await chromium.launch(
  process.env.CHROMIUM_PATH ? { executablePath: process.env.CHROMIUM_PATH } : {},
);
try {
  for (const p of PAGES.filter((x) => !only || x.id === only)) {
    const page = await browser.newPage({ viewport: { width: 1200, height: 630 } });
    await page.setContent(html(p), { waitUntil: "load" });
    await page.evaluate(() => document.fonts.ready);
    const out = resolve(ROOT, `public/og/vs-${p.id}-${p.lang}.png`);
    await page.screenshot({ path: out, type: "png" });
    console.log("wrote", out);
    await page.close();
  }
} finally {
  await browser.close();
}
