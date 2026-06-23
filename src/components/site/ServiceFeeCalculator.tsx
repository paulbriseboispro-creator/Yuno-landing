import { useState } from "react";
import { Wine, Ticket, Check } from "lucide-react";
import { usePricing } from "@/content/pricing";
import { useLocale, type Locale } from "@/i18n/locale";

function formatEur(value: number, locale: Locale) {
  return locale === "fr"
    ? `${value.toFixed(2).replace(".", ",")} €`
    : `${value.toFixed(2)}€`;
}

function FeeSlider({
  icon,
  label,
  min,
  max,
  step,
  value,
  onChange,
  fee,
  footnote,
  itemPriceLabel,
  serviceFeeLabel,
  locale,
}: {
  icon: React.ReactNode;
  label: string;
  min: number;
  max: number;
  step: number;
  value: number;
  onChange: (v: number) => void;
  fee: number;
  footnote: string;
  itemPriceLabel: string;
  serviceFeeLabel: string;
  locale: Locale;
}) {
  return (
    <div className="rounded-2xl bg-surface ring-1 ring-border p-6 md:p-7">
      <div className="flex items-center gap-2.5 mb-5">
        <span className="text-accent">{icon}</span>
        <h3 className="text-lg font-medium tracking-tight">{label}</h3>
      </div>

      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        aria-label={`${label} item price`}
        className="fee-slider w-full"
        style={
          {
            ["--pct" as string]: `${((value - min) / (max - min)) * 100}%`,
          } as React.CSSProperties
        }
      />

      <div className="mt-4 flex items-center justify-between text-sm">
        <span className="text-muted-foreground">
          {itemPriceLabel} <span className="text-foreground font-medium">{formatEur(value, locale)}</span>
        </span>
        <span className="text-muted-foreground">
          {serviceFeeLabel}{" "}
          <span className="text-accent font-semibold">{formatEur(fee, locale)}</span>
        </span>
      </div>

      <p className="mt-3 text-center text-xs text-muted-foreground">{footnote}</p>
    </div>
  );
}

export function ServiceFeeCalculator() {
  const { serviceFee: sf } = usePricing();
  const locale = useLocale();
  const [drinkPrice, setDrinkPrice] = useState(12);
  const [ticketPrice, setTicketPrice] = useState(20);

  const drinkFee = +(drinkPrice * 0.03).toFixed(2);
  const ticketFee = +Math.max(0.99, ticketPrice * 0.04).toFixed(2);

  return (
    <div className="space-y-5">
      <div className="rounded-2xl ring-1 ring-border bg-surface/60 px-6 py-5 text-center">
        <p className="text-base md:text-lg font-medium tracking-tight">
          {sf.summaryDrinksLabel} <span className="text-accent">{sf.summaryDrinksValue}</span>
          <span className="mx-2 text-muted-foreground">·</span>
          {sf.summaryTicketsLabel}{" "}
          <span className="text-accent">{sf.summaryTicketsValue}</span>
        </p>
        <p className="mt-1.5 text-xs uppercase tracking-[0.18em] text-muted-foreground">
          {sf.summaryNote}
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        <FeeSlider
          icon={<Wine className="size-5" strokeWidth={1.75} />}
          label={sf.drinksLabel}
          min={1}
          max={50}
          step={0.5}
          value={drinkPrice}
          onChange={setDrinkPrice}
          fee={drinkFee}
          footnote={sf.drinksFootnote}
          itemPriceLabel={sf.itemPrice}
          serviceFeeLabel={sf.serviceFeeLabel}
          locale={locale}
        />
        <FeeSlider
          icon={<Ticket className="size-5" strokeWidth={1.75} />}
          label={sf.ticketsLabel}
          min={1}
          max={500}
          step={1}
          value={ticketPrice}
          onChange={setTicketPrice}
          fee={ticketFee}
          footnote={sf.ticketsFootnote}
          itemPriceLabel={sf.itemPrice}
          serviceFeeLabel={sf.serviceFeeLabel}
          locale={locale}
        />
      </div>

      <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-2 pt-2 text-sm text-muted-foreground">
        {sf.checks.map((c) => (
          <span key={c} className="inline-flex items-center gap-1.5">
            <Check className="size-4 text-accent" strokeWidth={2.25} /> {c}
          </span>
        ))}
      </div>
    </div>
  );
}
