# Yuno — product & sales context (source of truth)

Distilled from the September 2026 brochures (FR/EN presentation brochure, organizer
brochure, emailing brochure). These supersede older copy in `src/content/*` where they
disagree — notably pricing: **there are no paid plans any more** (no Core/Essential/Pro/Elite).

## One-liner
"Your ticketing platform keeps your customers. Yuno gives them back." / « Votre billetterie
garde vos clients. Yuno vous les rend. »

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

## Competitors (public prices checked 21 Sep 2026)
- Weezevent: 2.5% min €0.99 incl. VAT per ticket, can be passed to buyer. Buyers stay with you.
- Eventbrite: 3.5% + €0.49 (Essentials) to 5.5% + €0.99 (Pro) per ticket. Marketplace keeps buyers, recommends other events.
- Xceed: 3% + 15% marketplace marketing commission, and €29–59/month subscription. Marketplace.
- Shotgun: organizer commission negotiated, not published. Buyer fees capped at €15. Marketplace.
- DICE: on quote, not published. Marketplace.
- None of them combines tickets, VIP tables with table service, the bar, promoter commissions
  and the club × organizer split in one account. Don't claim more than the combination: Xceed
  advertises bottle/VIP table sales, Shotgun has a sales-partner (promoter) portal, and
  Fourvenues (ES, on quote) bundles tickets, lists, VIP map and RRPP commissions.
- Don't claim "cheapest": the 4% (min €0.99) buyer fee is above Weezevent's per ticket once the
  price passes ~€25. Claim "€0 subscription, 0% commission for the organizer" instead.
- SEO/GEO keyword targets and positioning: see `docs/seo-geo-strategy.md`.
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
- Yuno app on the iOS App Store (retention); web remains a full purchase path.

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
