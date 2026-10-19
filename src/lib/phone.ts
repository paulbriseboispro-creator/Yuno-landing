// Numéro de téléphone des formulaires d'inscription pro : un pays (drapeau +
// indicatif) et le numéro national, rendus au format international
// (« +33 6 12 34 56 78 »). Obligatoire depuis le 19/10/2026 : Paul appelle
// chaque pro qui ouvre un compte. Même logique que `PhoneInputWithCountry`
// de l'app (repo yuno) : un numéro sans indicatif est injoignable.

export type PhoneCountry = {
  iso: string;
  flag: string;
  dial: string;
  /** Longueurs admises du numéro national SANS le 0 initial. */
  lengths: number[];
  /** Le pays écrit un 0 devant le numéro national (on le retire). */
  trunk: boolean;
  name: { en: string; fr: string; es: string };
};

export const PHONE_COUNTRIES: PhoneCountry[] = [
  {
    iso: "FR",
    flag: "🇫🇷",
    dial: "33",
    lengths: [9],
    trunk: true,
    name: { en: "France", fr: "France", es: "Francia" },
  },
  {
    iso: "BE",
    flag: "🇧🇪",
    dial: "32",
    lengths: [8, 9],
    trunk: true,
    name: { en: "Belgium", fr: "Belgique", es: "Bélgica" },
  },
  {
    iso: "CH",
    flag: "🇨🇭",
    dial: "41",
    lengths: [9],
    trunk: true,
    name: { en: "Switzerland", fr: "Suisse", es: "Suiza" },
  },
  {
    iso: "LU",
    flag: "🇱🇺",
    dial: "352",
    lengths: [6, 8, 9],
    trunk: false,
    name: { en: "Luxembourg", fr: "Luxembourg", es: "Luxemburgo" },
  },
  {
    iso: "MC",
    flag: "🇲🇨",
    dial: "377",
    lengths: [8, 9],
    trunk: false,
    name: { en: "Monaco", fr: "Monaco", es: "Mónaco" },
  },
  {
    iso: "ES",
    flag: "🇪🇸",
    dial: "34",
    lengths: [9],
    trunk: false,
    name: { en: "Spain", fr: "Espagne", es: "España" },
  },
  {
    iso: "PT",
    flag: "🇵🇹",
    dial: "351",
    lengths: [9],
    trunk: false,
    name: { en: "Portugal", fr: "Portugal", es: "Portugal" },
  },
  {
    iso: "IT",
    flag: "🇮🇹",
    dial: "39",
    lengths: [9, 10],
    trunk: false,
    name: { en: "Italy", fr: "Italie", es: "Italia" },
  },
  {
    iso: "DE",
    flag: "🇩🇪",
    dial: "49",
    lengths: [10, 11],
    trunk: true,
    name: { en: "Germany", fr: "Allemagne", es: "Alemania" },
  },
  {
    iso: "NL",
    flag: "🇳🇱",
    dial: "31",
    lengths: [9],
    trunk: true,
    name: { en: "Netherlands", fr: "Pays-Bas", es: "Países Bajos" },
  },
  {
    iso: "GB",
    flag: "🇬🇧",
    dial: "44",
    lengths: [10],
    trunk: true,
    name: { en: "United Kingdom", fr: "Royaume-Uni", es: "Reino Unido" },
  },
  {
    iso: "IE",
    flag: "🇮🇪",
    dial: "353",
    lengths: [9],
    trunk: true,
    name: { en: "Ireland", fr: "Irlande", es: "Irlanda" },
  },
  {
    iso: "RE",
    flag: "🇷🇪",
    dial: "262",
    lengths: [9],
    trunk: true,
    name: { en: "Réunion", fr: "La Réunion", es: "Reunión" },
  },
  {
    iso: "GP",
    flag: "🇬🇵",
    dial: "590",
    lengths: [9],
    trunk: true,
    name: { en: "Guadeloupe", fr: "Guadeloupe", es: "Guadalupe" },
  },
  {
    iso: "MQ",
    flag: "🇲🇶",
    dial: "596",
    lengths: [9],
    trunk: true,
    name: { en: "Martinique", fr: "Martinique", es: "Martinica" },
  },
  {
    iso: "MA",
    flag: "🇲🇦",
    dial: "212",
    lengths: [9],
    trunk: true,
    name: { en: "Morocco", fr: "Maroc", es: "Marruecos" },
  },
  {
    iso: "DZ",
    flag: "🇩🇿",
    dial: "213",
    lengths: [9],
    trunk: true,
    name: { en: "Algeria", fr: "Algérie", es: "Argelia" },
  },
  {
    iso: "TN",
    flag: "🇹🇳",
    dial: "216",
    lengths: [8],
    trunk: false,
    name: { en: "Tunisia", fr: "Tunisie", es: "Túnez" },
  },
  {
    iso: "US",
    flag: "🇺🇸",
    dial: "1",
    lengths: [10],
    trunk: false,
    name: { en: "United States / Canada", fr: "États-Unis / Canada", es: "EE. UU. / Canadá" },
  },
];

const BY_ISO = new Map(PHONE_COUNTRIES.map((c) => [c.iso, c]));
// Le plus long indicatif d'abord : « 352 » (Luxembourg) avant « 35… ».
const BY_DIAL = [...PHONE_COUNTRIES].sort((a, b) => b.dial.length - a.dial.length);

export const phoneCountry = (iso: string | null | undefined) =>
  BY_ISO.get((iso ?? "").toUpperCase()) ?? BY_ISO.get("FR")!;

/** Pays par défaut : la langue de la page d'abord, sinon le fuseau, sinon la France. */
export function defaultPhoneCountry(lang: string): string {
  if (lang === "es") return "ES";
  if (lang === "fr") return "FR";
  try {
    const tz = Intl.DateTimeFormat().resolvedOptions().timeZone ?? "";
    const TZ: Record<string, string> = {
      "Europe/Paris": "FR",
      "Europe/Madrid": "ES",
      "Europe/Brussels": "BE",
      "Europe/Zurich": "CH",
      "Europe/Luxembourg": "LU",
      "Europe/Monaco": "MC",
      "Europe/Lisbon": "PT",
      "Europe/Rome": "IT",
      "Europe/Berlin": "DE",
      "Europe/Amsterdam": "NL",
      "Europe/London": "GB",
      "Europe/Dublin": "IE",
      "Indian/Reunion": "RE",
      "America/Guadeloupe": "GP",
      "America/Martinique": "MQ",
      "Africa/Casablanca": "MA",
      "Africa/Algiers": "DZ",
      "Africa/Tunis": "TN",
    };
    if (TZ[tz]) return TZ[tz];
    if (tz.startsWith("America/")) return "US";
  } catch {
    /* ignore */
  }
  return "FR";
}

const digitsOf = (s: string) => s.replace(/\D/g, "");

/** Le numéro national sans 0 initial ni indicatif. */
export function nationalDigits(iso: string, raw: string): string {
  const c = phoneCountry(iso);
  let d = digitsOf(raw);
  if (d.startsWith("00" + c.dial)) d = d.slice(2 + c.dial.length);
  if (c.trunk && d.startsWith("0")) d = d.slice(1);
  return d;
}

/** Un numéro collé avec son indicatif (« +44 7… », « 0032 4… ») : le pays et le reste. */
export function splitInternational(raw: string): { iso: string; national: string } | null {
  const t = raw.trim();
  if (!/^(\+|00)/.test(t)) return null;
  const d = digitsOf(t).replace(/^00/, "");
  const c = BY_DIAL.find((x) => d.startsWith(x.dial));
  if (!c) return null;
  let rest = d.slice(c.dial.length);
  if (c.trunk && rest.startsWith("0")) rest = rest.slice(1);
  return { iso: c.iso, national: rest };
}

/** Groupage lisible : France « 6 12 34 56 78 », ailleurs par trois. */
function group(iso: string, d: string): string {
  if (["FR", "RE", "GP", "MQ"].includes(iso) && d.length === 9)
    return `${d[0]} ${d.slice(1).replace(/(\d{2})(?=\d)/g, "$1 ")}`;
  // Par trois, sans jamais laisser un chiffre seul à la fin (« 770 090 0123 »).
  const parts: string[] = [];
  let rest = d;
  while (rest.length > 4) {
    parts.push(rest.slice(0, 3));
    rest = rest.slice(3);
  }
  if (rest) parts.push(rest);
  return parts.join(" ");
}

/** Valeur envoyée à Yuno : « +33 6 12 34 56 78 », ou '' sans chiffre. */
export function composePhone(iso: string, national: string): string {
  const d = nationalDigits(iso, national);
  if (!d) return "";
  return `+${phoneCountry(iso).dial} ${group(iso, d)}`.trim();
}

/** Le numéro a la longueur d'un vrai numéro du pays choisi. */
export function phoneIsValid(iso: string, national: string): boolean {
  const d = nationalDigits(iso, national);
  return phoneCountry(iso).lengths.includes(d.length);
}

/** Relit une valeur déjà composée (retour sur l'étape, brouillon gardé). */
export function parseComposed(
  value: string,
  fallbackIso: string,
): { iso: string; national: string } {
  const split = splitInternational(value);
  if (split) return { iso: split.iso, national: group(split.iso, split.national) };
  return { iso: fallbackIso, national: value };
}

/** Une valeur composée (« +33 6 12 34 56 78 ») est un vrai numéro du pays reconnu. */
export function composedPhoneIsValid(value: string | null | undefined): boolean {
  const split = splitInternational(value ?? "");
  return !!split && phoneCountry(split.iso).lengths.includes(split.national.length);
}
