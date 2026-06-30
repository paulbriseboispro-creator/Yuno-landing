// Shared validateSearch helpers for the needs-driven landings. The ?besoin= param
// selects a pain on /clubs and /organizers (and re-leads the hero + hoists its
// proof block); /contact also carries the segment so a lead arrives pre-tagged
// with the role + pain. Unknown values are dropped so the URL stays clean.

const CLUB_PAINS = new Set([
  "vip",
  "co-soiree",
  "data",
  "fidelite",
  "live",
  "bar",
  "staff",
  "compta",
]);
const ORGA_PAINS = new Set([
  "orga",
  "co-soiree",
  "promo",
  "billetterie",
  "data",
  "fidelite",
  "porte",
  "compta",
]);
const SEGMENTS = new Set(["club", "organizer", "affiliate", "other"]);

export type ContactSegment = "club" | "organizer" | "affiliate" | "other";

export function validateClubSearch(search: Record<string, unknown>): { besoin?: string } {
  const b = search.besoin;
  return typeof b === "string" && CLUB_PAINS.has(b) ? { besoin: b } : {};
}

export function validateOrgaSearch(search: Record<string, unknown>): { besoin?: string } {
  const b = search.besoin;
  return typeof b === "string" && ORGA_PAINS.has(b) ? { besoin: b } : {};
}

export function validateContactSearch(search: Record<string, unknown>): {
  segment?: ContactSegment;
  besoin?: string;
} {
  const out: { segment?: ContactSegment; besoin?: string } = {};
  if (typeof search.segment === "string" && SEGMENTS.has(search.segment)) {
    out.segment = search.segment as ContactSegment;
  }
  if (typeof search.besoin === "string") out.besoin = search.besoin;
  return out;
}
