// validateSearch helper for /contact: a link may carry ?segment= (club,
// organizer, affiliate, other) and ?besoin= so a lead arrives pre-tagged with
// the role and the pain it wants to talk about. Unknown segments are dropped so
// the URL stays clean. (The /clubs and /organizers pages that also read
// ?besoin= were retired on 20/10/2026.)

const SEGMENTS = new Set(["club", "organizer", "affiliate", "other"]);

export type ContactSegment = "club" | "organizer" | "affiliate" | "other";

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
