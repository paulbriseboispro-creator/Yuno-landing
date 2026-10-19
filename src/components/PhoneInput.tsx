import { useEffect, useRef, useState } from "react";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";
import {
  PHONE_COUNTRIES,
  composePhone,
  defaultPhoneCountry,
  parseComposed,
  phoneCountry,
  phoneIsValid,
  splitInternational,
} from "@/lib/phone";

const PLACEHOLDER: Record<string, string> = {
  FR: "6 12 34 56 78",
  BE: "470 12 34 56",
  CH: "79 123 45 67",
  ES: "612 34 56 78",
  GB: "7700 900123",
};

/**
 * Pays (drapeau + indicatif) à gauche, numéro à droite. La valeur rendue est
 * le numéro international (« +33 6 12 34 56 78 ») ou '' sans chiffre ; un
 * numéro collé avec son indicatif (« +44 7… », « 0032 4… ») fait basculer le pays.
 */
export function PhoneInput({
  lang,
  value,
  onChange,
  onBlur,
  id,
  invalid,
  selectClassName,
  inputClassName,
  countryLabel,
  autoFocus,
}: {
  lang: "en" | "fr" | "es";
  value: string;
  onChange: (value: string, valid: boolean) => void;
  onBlur?: () => void;
  id?: string;
  invalid?: boolean;
  selectClassName?: string;
  inputClassName?: string;
  countryLabel: string;
  autoFocus?: boolean;
}) {
  const fallback = lang === "en" ? "FR" : defaultPhoneCountry(lang);
  const [state, setState] = useState(() => parseComposed(value, fallback));
  const touched = useRef(false);

  // Anglais : le pays se devine au fuseau, une fois monté (jamais au rendu serveur).
  useEffect(() => {
    if (lang !== "en" || value) return;
    const guess = defaultPhoneCountry(lang);
    setState((s) => (touched.current || s.iso === guess ? s : { ...s, iso: guess }));
  }, [lang, value]);

  function emit(iso: string, national: string) {
    setState({ iso, national });
    onChange(composePhone(iso, national), phoneIsValid(iso, national));
  }

  const c = phoneCountry(state.iso);
  return (
    <div className="flex gap-2">
      <span className={cn("relative flex shrink-0 items-center gap-1.5", selectClassName)}>
        <span aria-hidden className="pointer-events-none flex items-center gap-1.5">
          <span className="text-[17px] leading-none">{c.flag}</span>
          <span className="tabular-nums">+{c.dial}</span>
          <ChevronDown className="size-3.5 opacity-50" />
        </span>
        <select
          aria-label={countryLabel}
          value={state.iso}
          onChange={(e) => {
            touched.current = true;
            emit(e.target.value, state.national);
          }}
          className="absolute inset-0 cursor-pointer opacity-0"
        >
          {PHONE_COUNTRIES.map((x) => (
            <option key={x.iso} value={x.iso}>
              {x.flag} {x.name[lang]} (+{x.dial})
            </option>
          ))}
        </select>
      </span>
      <input
        id={id}
        type="tel"
        inputMode="tel"
        autoComplete="tel-national"
        autoFocus={autoFocus}
        value={state.national}
        placeholder={PLACEHOLDER[state.iso] ?? ""}
        aria-invalid={invalid || undefined}
        onChange={(e) => {
          touched.current = true;
          const split = splitInternational(e.target.value);
          if (split) emit(split.iso, split.national);
          else emit(state.iso, e.target.value);
        }}
        onBlur={onBlur}
        maxLength={24}
        className={cn("min-w-0 flex-1", inputClassName)}
      />
    </div>
  );
}
