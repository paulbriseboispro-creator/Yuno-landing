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

## Getting started (current, call-based — being replaced by self-serve signup)
1. 30-minute call. 2. Set up together (~1 hour, founder present). 3. First night accompanied.
Founder: Paul Brisebois · +33 6 44 21 66 89 · yunoapp.eu

## Brand
Yuno red #E8192C. App UI is dark; the new landing (/, /fr, /es) is a light SaaS layout.
