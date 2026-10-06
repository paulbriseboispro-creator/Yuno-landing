# Yuno — product & sales context (source of truth)

Distilled from the September 2026 brochures (FR/EN presentation brochure, organizer
brochure, emailing brochure). These supersede older copy in `src/content/*` where they
disagree — notably pricing: **there are no paid plans any more** (no Core/Essential/Pro/Elite).

## One-liner
Landing positioning (Sept 2026, Paul): "Sell your nights. Run them end to end." — other platforms
stop at the ticket; Yuno also sells tables and drinks, runs the door and the bar, and splits the
money. The brochure line "Your ticketing platform keeps your customers. Yuno gives them back." is
**retired as a headline**: most ticketing tools let organizers export buyers (Weezevent, Shotgun CRM),
so buyer ownership is not Yuno's strongest edge. Don't lead with it or compare on it.

Yuno is the platform for the night: one platform sells tickets, VIP tables and drinks, runs
the door, the bar and table service, then splits the money between the club, the organizer
and the promoters. No subscription. No app to install. Three languages (EN · FR · ES).
Audience: clubs, organizers/collectives, promoters, agencies (+ DJs in the ecosystem).
Do NOT mention BDE / student unions on the main landing (Paul's instruction).

## Pricing (free for pros, paid by the end customer)
| Item | Who pays | Amount |
|---|---|---|
| Subscription / commission | — | €0 · 0% |
| Service fee, tickets | Customer, on top of price | 4% · min €0.99 |
| Service fee, VIP tables | Customer, on amount charged | 4% · min €0.99 · max €25 |
| Service fee, drinks | Customer, on top of price | 3% |
| Card processing (Stripe) | Club / organizer | 1.5% + €0.25 |
| Student associations | reduced minimum | €0.49 per ticket |

Worked example: 300 tickets at €20 → customer pays €20.99, you keep €19.44 after €0.56
Stripe fees → **€5,832 net**, on your own account, no waiting ("pas J+72").
Everything included, one service level, no options or tiers.
Emailing: 15,000 emails/month included, then €10 per 10,000 (€24 per 25,000). No subscription.

## Competitors (analyses in Paul's Drive, public pages checked June–Sept 2026)
Only use the competitor facts from those docs — their Yuno columns are outdated. The landing
matrix lives in `src/content/landing.ts` (`MARKS` + `compare`): Shotgun, Weezevent, Xceed.
Fourvenues is deliberately left off (too close to Yuno in features — Paul, Sep 2026). Staff row pitch:
each staff member has their own specialised account (bouncer, VIP waiter, bartender…), not "a PIN".
Savings calculator (Money section, `COMPETITOR_KEEP` in `Money.tsx`): Yuno vs Shotgun (10% of sales)
and Weezevent (2.5%, min €0.99), competitor fees counted as paid by the organizer, card fees included.
Xceed left out: its 3% is close to Yuno's card fees on tickets alone. Don't allude to Shotgun's "J+72"
payout, and keep the verdict under the matrix generic (Yuno = the whole system of the night).
- Shotgun: ticketing marketplace (5M+ app users). 10% base commission on the organizer's sales,
  contracts negotiable case by case (Paul, Sep 2026); buyer fees capped at €15; payout after the event;
  15% on resale / waiting list. Has CRM, newsletters, push, promoter tracking links (commissions by
  hand), offline scan, door sales. No VIP tables / floor plan, no bar, no staff roles, no club × organizer split.
- Weezevent: generalist ticketing, 2.5% min €0.99 per ticket (can be passed to buyer), payouts every
  15 days. Paid add-ons: cashless WeezPay €1.20/transaction, staff WeezCrew from €1,000. CRM
  WeezTarget free. Seat numbering but no club floor plan, no promoter management, no splits.
- Xceed: clubbing marketplace (5M+ users). 3% per ticket, 15% on marketplace sales, €29–59/month
  (lowest on annual). Floor plan + promoter accounting on Pro plan only. No bar, no CRM, no splits.
- Fourvenues: closest competitor (Pacha, BCM…), full club suite (tables, POS, promoters, CRM, live
  analytics, API, passes, channel manager). Subscription on quote after a demo. No club × organizer split.
- DICE (Fever since 2025): live-music ticket app, organizer pricing on quote. Not shown on the landing
  (no public info to compare).
- NCLUB / NCLOUD (Spain): guest-list app + promoter CRM, €450/month or €999/month + VAT; no ticket sales.
- Eventbrite: 3.5% + €0.49 (Essentials) to 5.5% + €0.99 (Pro) per ticket; generalist.
- Yuno's real edges: whole night in one account (tables + bar + door + staff screens), club × organizer
  contract and statement (nobody else), promoter commissions computed, €0 / 0% at a published price
  (vs 10% at Shotgun, quote-only Fourvenues), money on your own Stripe account as you sell.
- Don't claim "cheapest": the 4% (min €0.99) buyer fee is above Weezevent's per ticket once the
  price passes ~€25. Claim "€0 subscription, 0% commission for the organizer" instead.
- SEO/GEO keyword targets and positioning: `docs/seo-geo-strategy.md`. Comparison pages
  (`/fr/alternative-shotgun`, `/alternative-shotgun`, `/es/alternativa-fourvenues`) only state
  what the competitor publishes, with dated sources (`src/content/compare.ts`).
- Emailing vs Brevo Standard (€79/mo) and Mailchimp Standard (€117.76/mo) for 50k emails; Yuno €34.

## Three sales pillars
- Tickets & guest list: price tiers, presales, promo codes, free guest list before a set time,
  tracked links per promoter, Apple Wallet passes, waiting list. Checkout 30 s, no account, no app,
  card or Apple Pay.
- VIP tables & bottle service: interactive floor plan, zones, packages, deposit or pay on site,
  bottle pre-orders; VIP host tracks minimum spend and service live.
- Drinks: order & pay from phone at the bar's QR, bartender sees queue; switchable per club/bar.
Each night has one switch per pillar; adopt pillar by pillar (guest list alone first is fine).

## Screens & staff
Customer (event page), bouncer (one scanner for tickets/guests/tables, name search, duplicates
explained, live entry counter, incidents), VIP host (living floor plan, walk-ins, min spend,
orders from table), bartender, cloakroom, manager. Staff log in with a PIN — no account, no training.
Organizer team roles: admin, editor, scanner.

## Money
Stripe Connect: money lands directly in the club's/organizer's account, under their name on the
statement. Yuno never holds funds. Refunds, invoices, accounting exports in the dashboard.
Club × organizer contract signed inside Yuno, pillar by pillar or as a tiered revenue share;
at closing the club declares bar and door takings, organizer accepts or disputes; nothing moves
without both sides agreeing. Promoters: personal link per night, sales and entries counted live,
commission computed automatically, settlement in three tracked, timestamped steps.

## Data, CRM & emailing
Marketing channels to present (Paul, Sep 2026 — assume them even if SMS and Meta Ads are still
shipping): email, SMS, push notifications (Yuno app) and Meta Ads, all from the same customer base.
Every buyer (ticket, table, drink, guest list) joins YOUR customer base. Import existing file,
deduplicated, with attested consent. Segments on real purchases: takes tables, high basket,
seen < 60 days, regulars slipping away. Email editor reads the night at send time (open tier
price, tables left, guest-list spots). 9 automations: new night, abandoned cart, price going up,
last call, upgrade to a table, thanks for coming, we missed you, welcome, win-back. Campaigns
report sales & revenue produced. Sending rules: max one automation per person per 48 h, never
between 11 pm and 9 am, opt-in only.

## Owner view
Club dashboard (net sales, orders, visitors, conversion + 3 AI actions of the day), analytics per
night by channel and promoter, live view (who is on your page now, what just sold), exports
(door list, tables, Excel, invoices), assisted access, AI assistant.

## Traction (Sept 2026 — OK to cite)
- Madrid: launch with Amoris (event organizer) and 22 partner clubs listed on the platform.
- Paris: first real night with a Parisian organizer — Yuno guest list, online sign-ups, verified door scan.
- First Paris send: 7,228 emails, 95.3% delivered, 23.9% opens, 0.015% complaints, 7/10 re-clicked the automatic follow-up.
- Yuno marketplace: iOS app on the App Store + web app, where the public discovers nights; every
  buyer still joins the organizer's own customer base. Web remains a full purchase path.
- Vs Fourvenues (closest in features), lead on community / the public side: Yuno marketplace (App
  Store + web app) and an Instagram that posts the platform's nights regularly, vs Fourvenues as a
  tool for the venue team (staff apps Pro/Access/POS, sales via venue/RRPP links and venue/city web
  pages). State it factually; never call their customer experience bad (comparative-ad rules).

## Getting started (self-serve since 24 Sep 2026)
Clubs and organizers create their account alone in ~2 minutes: every "Create my free account"
CTA opens the signup dialog, and `/start` (`/fr/start`, `/es/start`, `?role=club|organizer`) is
the direct link for bios, DMs and decks. Four questions (profile → venue / nights → what you
sell, current ticketing, next night → account), then the person lands logged in on
yunoapp.eu/get-started with a plan built from their answers. Promoters and "other" leave a lead
(no self-serve account). A setup call with the founder stays on offer (WhatsApp), never required.
Founder: Paul Brisebois · +33 6 44 21 66 89 · yunoapp.eu

## Brand
Yuno red #E8192C. App UI is dark; the new landing (/, /fr, /es) is a light SaaS layout.

## Yuno CRM — second product, for organizers who keep their ticketing (Oct 2026)
A separate offer (page `/crm`, `/fr/crm`, `/es/crm`; signup `?product=crm`). It plugs into the
ticketing the pro already uses (Shotgun by API token, read-only; other tools by file import) and sells
nothing: no tickets, no door, no payments. It is the Yuno marketing engine on an external ticketing:
living base, night reports compared with the previous night, segments, Email Studio, automations,
Meta audiences (not live yet — say "soon"), team rights, consent and deliverability.
**Unlike the ticketing Suite, it is PAID** — never reuse the Suite's "€0 subscription" lines on its page.
One offer since 4 Oct 2026 (Paul's decision of 2 Oct): a subscription + Yunits, no plans, no email quota,
no seat or automation cap.
| Item | Value |
|---|---|
| Subscription | 24 € HT / month at launch (34 € later for NEW accounts; a 24 € subscriber keeps 24 € while subscribed) |
| Yearly | 288 € HT / year (12 × 24, no discount) + 30,000 bonus Yunits at once (≈ two months) |
| Yunits included | 10,000 every month (offered Yunits expire at month end and are used first) |
| Cost per send | email 1 Yunit · SMS 35 Yunits · Instagram DM 10 and WhatsApp 100 = "soon" |
| Always free | test sends, the AI assistant, contacts Yuno sets aside so as not to overload them |
| Recharges | 500 Yunits per € (10 € = 5,000 · 25 € = 12,500 · 50 € = 27,500 (+10 %) · 100 € = 57,500 (+15 %)), valid 12 months; auto top-up off by default, with a ceiling |
| Trial | 14 days, the whole tool + 5,000 Yunits, no card, no free plan; without a subscription the account pauses (base visible, nothing sent, Shotgun sync stops) |
Prices excl. VAT (20 % on the invoice). SMS and the MCP server (plug ChatGPT, Claude or Gemini
into the base) are announced as live (Paul, 4 Oct 2026). Meta audiences: "soon". Data hosted in the EU (Supabase
eu-west-1): write "Europe", never "France". Source of truth: `src/lib/crmPlans.ts`,
`supabase/functions/_shared/crm-billing.ts` and `crm_pricing_config()` in the yuno repo.
Positioning: "Keep your ticketing. Make your crowd come back." Don't claim Shotgun lacks a CRM
(it has one): talk about what Yuno CRM does, not what others don't.
