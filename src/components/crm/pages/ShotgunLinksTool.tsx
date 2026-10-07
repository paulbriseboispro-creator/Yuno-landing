import { useMemo, useState } from "react";
import { Check, ChevronDown, Copy, Link2 } from "lucide-react";
import { cn } from "@/lib/utils";

// Free tool of the Instagram guide: builds a Shotgun event URL with one
// utm_source per publication. Everything goes into utm_source, the only field
// Shotgun's ticket data returns as is (utm_medium is replaced by the purchase
// platform, utm_campaign is not returned). Runs in the browser, sends nothing.

const PLACEMENTS = [
  { id: "ig-story", label: "Story Instagram" },
  { id: "ig-bio", label: "Lien en bio Instagram" },
  { id: "tt-bio", label: "Lien en bio TikTok" },
  { id: "wa", label: "Groupe WhatsApp" },
  { id: "newsletter", label: "Newsletter" },
  { id: "qr", label: "Affiche ou flyer (QR code)" },
  { id: "lien", label: "Autre" },
] as const;

function slug(s: string): string {
  return s
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 40);
}

type Built = { ok: true; url: string; source: string; shotgun: boolean } | { ok: false };

function build(raw: string, placement: string, name: string): Built {
  let url: URL;
  try {
    url = new URL(/^https?:\/\//i.test(raw.trim()) ? raw.trim() : `https://${raw.trim()}`);
  } catch (err) {
    if (!(err instanceof TypeError)) throw err;
    return { ok: false };
  }
  if (!url.hostname.includes(".")) return { ok: false };
  const source = [placement, slug(name)].filter(Boolean).join("-");
  for (const k of ["utm_source", "utm_medium", "utm_campaign", "utm_content", "utm_term"]) {
    url.searchParams.delete(k);
  }
  url.searchParams.set("utm_source", source);
  return {
    ok: true,
    url: url.toString(),
    source,
    shotgun: /(^|\.)shotgun\.live$/i.test(url.hostname),
  };
}

export function ShotgunLinksTool() {
  const [raw, setRaw] = useState("");
  const [placement, setPlacement] = useState<string>(PLACEMENTS[0].id);
  const [name, setName] = useState("");
  const [copied, setCopied] = useState<string | null>(null);
  const [saved, setSaved] = useState<{ source: string; url: string }[]>([]);
  const built = useMemo(
    () => (raw.trim() ? build(raw, placement, name) : null),
    [raw, placement, name],
  );

  const copy = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(text);
      setTimeout(() => setCopied((c) => (c === text ? null : c)), 1600);
    } catch {
      // Clipboard refused (permissions, old browser): the link stays selectable.
    }
  };

  const field =
    "mt-2 h-12 w-full rounded-[14px] border border-yc-sand-200 bg-white px-4 text-[15px] text-yc-ink outline-none transition-colors placeholder:text-yc-sand-400 focus:border-yc-red-500 focus:ring-[3px] focus:ring-yc-red-200";

  return (
    <div className="rounded-[28px] border border-yc-sand-200 bg-yc-sand-50 p-5 shadow-[var(--shadow-sm)] sm:p-8">
      <div className="grid gap-5 md:grid-cols-[1.4fr_1fr_1fr]">
        <label className="block text-[14px] font-semibold text-yc-ink">
          Adresse de votre soirée Shotgun
          <input
            type="url"
            inputMode="url"
            autoComplete="off"
            spellCheck={false}
            value={raw}
            onChange={(e) => setRaw(e.target.value)}
            placeholder="https://shotgun.live/fr/events/ma-soiree"
            className={field}
          />
        </label>
        <label className="block text-[14px] font-semibold text-yc-ink">
          Emplacement
          <span className="relative block">
            <select
              value={placement}
              onChange={(e) => setPlacement(e.target.value)}
              className={cn(field, "appearance-none pr-10")}
            >
              {PLACEMENTS.map((p) => (
                <option key={p.id} value={p.id}>
                  {p.label}
                </option>
              ))}
            </select>
            <ChevronDown
              aria-hidden
              className="pointer-events-none absolute right-3.5 top-[calc(50%+4px)] size-4 -translate-y-1/2 text-yc-sand-500"
            />
          </span>
        </label>
        <label className="block text-[14px] font-semibold text-yc-ink">
          Nom de la publication
          <input
            type="text"
            autoComplete="off"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="line-up"
            className={field}
          />
        </label>
      </div>

      <div className="mt-6 rounded-[18px] bg-white p-4 ring-1 ring-yc-sand-200 sm:p-5">
        <div className="yc-label">Votre lien suivi</div>
        {built?.ok ? (
          <>
            <div className="mt-2 break-all font-yc-mono text-[13.5px] leading-[1.55] text-yc-ink">
              {built.url}
            </div>
            <div className="mt-2 text-[13.5px] text-yc-sand-600">
              Source dans Shotgun : <b className="font-yc-mono text-yc-ink">{built.source}</b>
              {!built.shotgun && " · ce n’est pas une adresse shotgun.live, vérifiez-la."}
            </div>
            <div className="mt-4 flex flex-wrap gap-2.5">
              <button
                type="button"
                onClick={() => copy(built.url)}
                className="yc-btn yc-btn--sm yc-btn--dark"
              >
                {copied === built.url ? <Check className="size-4" /> : <Copy className="size-4" />}
                <span>{copied === built.url ? "Copié" : "Copier le lien"}</span>
              </button>
              <button
                type="button"
                onClick={() =>
                  setSaved((s) =>
                    s.some((x) => x.url === built.url)
                      ? s
                      : [...s, { source: built.source, url: built.url }],
                  )
                }
                className="yc-btn yc-btn--sm yc-btn--white"
              >
                <Link2 className="size-4" />
                <span>Ajouter à ma liste</span>
              </button>
            </div>
          </>
        ) : (
          <p className="mt-2 text-[14.5px] text-yc-sand-500">
            {built && !built.ok
              ? "Cette adresse n’est pas valide. Collez le lien de la page de votre soirée."
              : "Collez l’adresse de votre soirée pour obtenir le lien."}
          </p>
        )}
      </div>

      {saved.length > 0 && (
        <div className="mt-5">
          <div className="yc-label">Vos liens de cette soirée</div>
          <ul className="mt-2 flex flex-col gap-2">
            {saved.map((l) => (
              <li
                key={l.url}
                className="flex items-center justify-between gap-3 rounded-[14px] bg-white px-4 py-2.5 ring-1 ring-yc-sand-200"
              >
                <span className="min-w-0 truncate font-yc-mono text-[13px] text-yc-ink">
                  {l.source}
                </span>
                <button
                  type="button"
                  onClick={() => copy(l.url)}
                  className="flex-none text-[13.5px] font-semibold text-yc-red-600"
                >
                  {copied === l.url ? "Copié" : "Copier"}
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
