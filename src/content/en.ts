// Single source of copy for the EN landing site. FR/ES will sit beside this file later.
export const en = {
  nav: {
    product: "Product",
    pricing: "Pricing",
    clubs: "Clubs",
    organizers: "Organizers",
    affiliates: "Affiliates",
    bookDemo: "Book demo",
    startFree: "Start free",
  },
  hero: {
    eyebrow: "The nightlife operating system",
    titleA: "The operating system for the",
    titleEm: "after-dark",
    titleB: "economy",
    sub: "Every night ends with a spreadsheet. Promoter payments, bar splits, guest list reconciliation — hours of work after a night that already ran on adrenaline. Yuno closes the loop automatically, so your next morning starts with a bank transfer, not a calculator.",
    ctaPrimary: "Start free",
    ctaSecondary: "Watch product tour",
  },
  segments: {
    clubs: "Clubs",
    organizers: "Organizers",
    promoters: "Promoters",
  },
  segmentContent: {
    clubs: {
      title: "Run the floor, not the spreadsheet",
      bullets: [
        "Interactive VIP floor plan with live minimum-spend tracking",
        "Guests order from their phone. Bar staff receive the order. No queue, no cash handling, 30% higher average order.",
        "Your bouncer is on the door in 30 seconds. No app download, no email account — just a PIN. Built for the turnover rate of nightlife.",
        "Built-in CRM with SMS & email campaigns to your top spenders",
        "Bouncer QR scanner with real-time capacity tracking and incident logging",
        "Pre-night analytics — see expected attendance before doors open based on ticket velocity and historical patterns.",
      ],
    },
    organizers: {
      title: "Ticketing without the markup",
      bullets: [
        "4% per ticket, €0.99 minimum — among the lowest in Europe",
        "Stripe Connect splits revenue with your host venue in real time",
        "Tiered pricing, queues, guest list and your own check-in app",
        "Onboard scanners with one-time PINs — no devices to provision",
      ],
    },
    promoters: {
      title: "Get paid for the crowd you bring",
      bullets: [
        "Personal Linktree-style page with all your nights in one URL",
        "Per-click, per-ticket and per-table attribution — automated",
        "IBAN payouts scheduled and traceable: pending, approved, paid",
        "Live leaderboard and conversion analytics for your team",
      ],
    },
  },
  features: {
    eyebrow: "What's inside",
    title: "Operator-grade tooling, end to end",
    items: [
      {
        tag: "Floor plan",
        title: "VIP Floor Plan Editor",
        body: "Drag-and-drop your tables, zones and minimum spend. VIP hosts log bottles on iPad — the system flags shortfalls automatically.",
      },
      {
        tag: "Bar",
        title: "Click & Collect Bar",
        body: "Guests pre-order drinks from their phone. Barmen see a live queue — Waiting → Prep → Ready — and push a notification when it's ready.",
      },
      {
        tag: "CRM",
        title: "CRM & SMS Marketing",
        body: "Every visit, favourite bottle and door incident in one profile. Send targeted SMS or email campaigns to your top 1% of spenders.",
      },
      {
        tag: "Staff",
        title: "PIN-Based Staff Login",
        body: "Bouncers, barmen, vestiaire and VIP hosts sign in with a 4-digit PIN. Two seconds, any terminal — built for nightly turnover.",
      },
      {
        tag: "Promoters",
        title: "Promoter Attribution",
        body: "Each promoter gets a unique link. Sales tracked live. Commission calculated automatically. Paid directly to their Stripe account after the night — zero manual work, zero disputes.",
      },
      {
        tag: "Live night",
        title: "Live Night Dashboard",
        body: "Entries, bar revenue, table spend and staff status — one screen, refreshed in real time, the way a night manager actually thinks.",
      },
    ],
  },
  split: {
    eyebrow: "Stripe Connect",
    title: "Instant payouts with",
    titleEm: "automated splits",
    body: "Every ticket sale is split at the moment the card clears — between the host venue, the organizer and the promoter who brought the sale. No month-end reconciliation, no awkward Whatsapps.",
    bullets: [
      "Real-time promoter attribution",
      "Full audit trail per transaction (VAT invoice support coming)",
      "Stripe Connect Standard accounts — you keep ownership",
    ],
    ticketLabel: "Ticket sale",
    ticketAmount: "€45.00",
    rows: [
      { label: "Venue", value: "€31.50", pct: "70%" },
      { label: "Organizer", value: "€9.00", pct: "20%", accent: true },
      { label: "Promoter", value: "€4.50", pct: "10%" },
    ],
  },
  pricing: {
    eyebrow: "Pricing",
    title: "Ready to scale your nights?",
    sub: "Pick a plan that matches your venue. Switch any time.",
    plans: [
      {
        name: "Yuno Core",
        price: "Free",
        suffix: "Pay-as-you-grow ticketing",
        cta: "Get started",
        featureGroups: [
          {
            label: "Core features",
            items: [
              "Event management",
              "Entry control (QR)",
              "Guest list",
              "Basic promoter tracking",
              "Ticket metrics",
            ],
          },
        ],
      },
      {
        name: "Essential",
        price: "€39",
        suffix: "/ month",
        cta: "Start 14-day trial",
        featureGroups: [
          {
            label: "Everything in Core, plus",
            items: [
              "Orders & QR system",
              "Menu management",
              "Staff management (PIN)",
              "Invoices & refunds",
              "Basic analytics",
              "Story Builder",
            ],
          },
        ],
      },
      {
        name: "Pro",
        price: "€69",
        suffix: "/ month",
        cta: "Start 14-day trial",
        popular: true,
        featureGroups: [
          {
            label: "Everything in Essential, plus",
            items: [
              "DJ management",
              "Organizer management",
              "Promoter tracking",
              "Advanced analytics",
              "CSV data export",
              "Customer database",
              "Live night",
              "Story Builder (advanced)",
              "Basic VIP table setup",
              "Promotional email campaigns",
            ],
          },
        ],
      },
      {
        name: "Elite",
        price: "€99",
        suffix: "/ month",
        cta: "Talk to sales",
        featureGroups: [
          {
            label: "Everything in Pro, plus",
            items: [
              "VIP tables",
              "VIP service",
              "Offers & upsell",
              "Loyalty & CRM",
              "Hype Analysis",
              "Client leaderboard (top spender ranking)",
              "Scarcity tools (FOMO ticket availability)",
              "Personalization engine",
            ],
          },
        ],
      },

    ],
    fees: "Plus 4% per ticket (€0.99 min) and 3% on drinks — service fees paid by the customer, never by you. Organizer and Affiliate accounts are free.",
  },
  faq: {
    eyebrow: "FAQ",
    title: "Common questions, straight answers",
    items: [
      {
        id: "setup-time",
        category: "getting-started",
        title: "How long does it take to set up a club?",
        content: "Most venues are live in under a week. We migrate your guest list, build your floor plan with you, and your staff is trained on the PIN flow in an afternoon.",
      },
      {
        id: "onboarding",
        category: "getting-started",
        title: "Do you offer training or onboarding?",
        content: "We provide video tutorials, documentation, and live webinars. Pro and Elite plans include personalized onboarding sessions with our support team.",
      },
      {
        id: "pos-integration",
        category: "features",
        title: "Can I keep my existing ticketing or POS?",
        content: "Yuno can run alongside an external ticketing provider for an event, but you'll get full operational value (bar, VIP, CRM, payouts) only when ticketing runs through Yuno.",
      },
      {
        id: "floor-plan",
        category: "features",
        title: "How does the VIP floor plan editor work?",
        content: "Drag-and-drop tables, zones and minimum spend directly in the app. VIP hosts log bottles on iPad — the system flags shortfalls automatically and updates availability in real time.",
      },
      {
        id: "bar-flow",
        category: "features",
        title: "How does the Click & Collect bar reduce queues?",
        content: "Guests pre-order drinks from their phone. Barmen see a live queue — pending, preparing, ready — and push a notification when the round is ready for pickup.",
      },
      {
        id: "revenue-split",
        category: "billing",
        title: "How does the revenue split with a host venue work?",
        content: "When you onboard, both parties connect their Stripe Connect Standard accounts and agree on a split (e.g. 70/30). Every sale is split at the moment of payment — funds land in each account independently.",
      },
      {
        id: "plan-change",
        category: "billing",
        title: "Can I change my plan anytime?",
        content: "Yes, you can upgrade or downgrade your plan at any time. Changes take effect immediately, and we'll prorate your billing accordingly.",
      },
      {
        id: "markets",
        category: "support",
        title: "Which markets do you operate in?",
        content: "Europe-first. We currently serve venues and organizers across France, Spain, Belgium, Switzerland and the UK, and we settle payouts in EUR and GBP.",
      },
      {
        id: "bug-report",
        category: "support",
        title: "How do I report a bug or request a feature?",
        content: "Use the in-app feedback button or email support@yuno.io with details. Our team typically responds within 24 hours on business days.",
      },
    ],
  },
  cta: {
    title: "Run your next night on Yuno",
    sub: "Book a 30-minute call. We'll walk through your floor plan, your fee stack and what migrating would look like.",
    button: "Book a demo",
  },
  footer: {
    tagline: "The infrastructure layer for the after-dark economy.",
    company: "Company",
    legal: "Legal",
    language: "Language",
    rights: "© 2026 Yuno Technologies. All rights reserved.",
  },
};
