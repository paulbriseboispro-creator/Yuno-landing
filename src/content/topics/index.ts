// Registry of the topic pages (one search intent = one page, EN/FR/ES twins).
// Add a page: write src/content/topics/<id>.ts (export an array of
// TopicPageContent), list it here, then add one route file per path in
// src/routes (see src/routes/vip-table-booking-software.tsx for the pattern).
import type { TopicPageContent } from "../topic-types";
import { vipTables } from "./vip-tables";
import { promoters } from "./promoters";
import { revenueSplit } from "./revenue-split";
import { guestList } from "./guest-list";
import { madrid } from "./madrid";
import { pricing } from "./pricing";

export const TOPIC_PAGES: TopicPageContent[] = [
  ...vipTables,
  ...promoters,
  ...revenueSplit,
  ...guestList,
  ...madrid,
  ...pricing,
];

export function topicPage(path: string): TopicPageContent {
  const page = TOPIC_PAGES.find((p) => p.path === path);
  if (!page) throw new Error(`No topic page for ${path}`);
  return page;
}

export const TOPIC_PATHS = new Set(TOPIC_PAGES.map((p) => p.path));
