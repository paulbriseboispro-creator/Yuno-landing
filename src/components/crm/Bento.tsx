import { createContext, useContext, useId, useRef, type ReactNode } from "react";
import { motion, useInView } from "motion/react";
import { ArrowDown, ArrowRight, Mail, Search, Zap } from "lucide-react";
import { cn } from "@/lib/utils";
import { useCrm } from "./content";
import { Accent, Avatar, CtaButton, Eyebrow, Reveal, StatusTag, SwipeRow, useFmt } from "./ui";
import { useIsPhone } from "./media";

// "Everything Instagram should have given you" → "Everything your ticketing
// doesn't show you." The reference's bento: two cards and a tall night card on
// top, a wide card and a short one under. Each card carries a real piece of the
// Console that animates when it shows up.

// Inside the phone carousel a card is revealed as soon as a sliver shows, so
// the next one peeks in from the edge (that's what says "swipe").
const InRow = createContext(false);

function Card({
  children,
  className,
  delay = 0,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
}) {
  const inRow = useContext(InRow);
  return (
    <Reveal
      delay={inRow ? 0 : delay}
      className={cn("group relative h-full", className)}
      amount={inRow ? 0 : 0.2}
    >
      <div className="relative isolate flex h-full flex-col overflow-hidden rounded-[28px] transition-transform duration-500 [transition-timing-function:cubic-bezier(.22,1,.36,1)] group-hover:-translate-y-1">
        {children}
      </div>
    </Reveal>
  );
}

function CardText({ title, body, night }: { title: string; body: string; night?: boolean }) {
  return (
    <div className="relative z-10 px-6 pt-6 text-center sm:px-9 sm:pt-9">
      <h3 className={cn("yc-h3 text-[23px] sm:text-[27px]", night ? "text-white" : "text-yc-ink")}>
        {title}
      </h3>
      <p
        className={cn(
          "mx-auto mt-2 max-w-[30rem] text-pretty text-[14.5px] leading-[1.55] sm:mt-3 sm:text-[15px] sm:leading-[1.6]",
          night ? "text-yc-on-night-2" : "text-yc-sand-600",
        )}
      >
        {body}
      </p>
    </div>
  );
}

function ClientsCard({ className }: { className?: string }) {
  const b = useCrm().bento.clients;
  const table = useCrm().night.table;
  const rows = table.rows.slice(0, 4);
  return (
    <Card className={cn("min-h-[430px]", className)}>
      <div className="absolute inset-0 -z-10 bg-yc-sand-50 ring-1 ring-inset ring-black/[.04]" />
      <CardText title={b.title} body={b.body} />
      <div className="mt-auto pl-6 pt-6 sm:pl-9 sm:pt-8">
        <div className="translate-x-3 translate-y-3 rounded-tl-[18px] border-l border-t border-yc-sand-200 bg-white p-4 shadow-[var(--shadow-md)] transition-transform duration-700 group-hover:translate-x-1 group-hover:translate-y-1">
          <div className="mb-3 flex h-9 items-center gap-2 rounded-full border border-yc-sand-200 px-3 text-[13px] text-yc-sand-400">
            <Search className="size-3.5" />
            {b.search}
          </div>
          {rows.map((r) => (
            <div
              key={r.name}
              className="flex items-center gap-2.5 border-b border-yc-sand-100 py-2 last:border-0"
            >
              <Avatar ini={r.ini} tone={r.tone as "hot"} size={30} />
              <span className="flex min-w-0 flex-1 flex-col">
                <span className="truncate text-[13.5px] font-semibold">{r.name}</span>
                <span className="text-[12px] text-yc-sand-500">
                  {r.nights} {table.cols[1].toLowerCase()} · {r.last}
                </span>
              </span>
              <StatusTag tone={r.tone as "hot"}>{r.tag}</StatusTag>
            </div>
          ))}
        </div>
      </div>
    </Card>
  );
}

function SegmentsCard({ className }: { className?: string }) {
  const b = useCrm().bento.segments;
  const { num } = useFmt();
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.4 });
  return (
    <Card className={cn("min-h-[430px]", className)} delay={0.08}>
      <div className="yc-aura absolute inset-0 -z-10" />
      <div
        aria-hidden
        className="absolute -bottom-24 left-1/2 -z-10 h-64 w-[130%] -translate-x-1/2 rounded-[50%] bg-[radial-gradient(closest-side,rgba(227,20,27,.22),transparent)]"
      />
      <CardText title={b.title} body={b.body} />
      <div
        ref={ref}
        className="mx-5 mb-5 mt-auto rounded-[20px] bg-white p-4 shadow-[var(--shadow-md)] ring-1 ring-yc-sand-200 sm:mx-8 sm:mb-8"
      >
        {b.rows.map((r, i) => (
          <div
            key={r.l}
            className="grid grid-cols-[96px_1fr_48px] items-center gap-3 py-1.5 text-[13.5px]"
          >
            <span className="font-semibold">{r.l}</span>
            <span className="h-2.5 overflow-hidden rounded-full bg-yc-sand-100">
              <span
                className="block h-full rounded-full"
                style={{
                  width: inView ? `${r.w}%` : "0%",
                  background: i === 2 ? "var(--gradient-brand)" : "var(--color-yc-ink)",
                  transition: `width 1s cubic-bezier(.22,1,.36,1) ${0.15 + i * 0.1}s`,
                }}
              />
            </span>
            <span className="text-right font-semibold tabular-nums">{num(r.n)}</span>
          </div>
        ))}
        <span
          className="mt-3 flex h-10 items-center justify-center gap-2 rounded-full text-[14px] font-semibold text-white"
          style={{ background: "var(--gradient-brand)", boxShadow: "var(--shadow-cta)" }}
        >
          <Mail className="size-4" />
          {b.action}
        </span>
      </div>
    </Card>
  );
}

function RelanceCard({ className }: { className?: string }) {
  const b = useCrm().bento.relance;
  const email = useCrm().channels.rates[0].name;
  const rows = useCrm().night.table.rows;
  const list = [rows[4], rows[3], rows[2], rows[5], rows[1], rows[0], rows[6], rows[7]];
  return (
    <Card className={cn("min-h-[560px] lg:min-h-0", className)} delay={0.12}>
      <div className="absolute inset-0 -z-10 bg-yc-night" />
      <div
        aria-hidden
        className="absolute -bottom-40 -right-40 -z-10 size-[420px] rounded-full bg-[radial-gradient(closest-side,rgba(227,20,27,.45),transparent)]"
      />
      <div className="relative flex flex-1 items-center justify-center px-6 pt-8 sm:pt-10">
        <motion.div
          initial={{ rotate: 6, y: 30, opacity: 0 }}
          whileInView={{ rotate: 8, y: 0, opacity: 1 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
          className="w-[300px] rounded-[16px] bg-white p-3.5 shadow-[0_30px_60px_-20px_rgba(0,0,0,.6)] transition-transform duration-700 group-hover:rotate-[4deg] sm:w-[330px]"
        >
          <div className="mb-2 flex items-center justify-between">
            <span className="text-[13px] font-semibold text-yc-ink">{b.list}</span>
            <span className="h-5 rounded-full bg-yc-red-50 px-2 text-[11px] font-semibold leading-5 text-yc-red-700">
              {email}
            </span>
          </div>
          {list.map((r, i) => (
            <div
              key={r.name}
              className={cn(
                "flex items-center gap-2 border-b border-yc-sand-100 py-1.5 last:border-0",
                i >= 6 && "max-sm:hidden",
              )}
            >
              <Avatar ini={r.ini} tone={i < 3 ? "cold" : (r.tone as "hot")} size={24} />
              <span className="flex-1 truncate text-[12px] font-semibold text-yc-ink">
                {r.name}
              </span>
              <span className="h-1.5 w-16 overflow-hidden rounded-full bg-yc-sand-100">
                <span
                  className="block h-full rounded-full"
                  style={{ width: `${r.score}%`, background: "var(--gradient-brand)" }}
                />
              </span>
              <span className="w-6 text-right text-[11px] font-semibold tabular-nums text-yc-ink">
                {r.score}
              </span>
            </div>
          ))}
        </motion.div>
      </div>
      <div className="relative z-10 px-6 pb-7 pt-8 text-center sm:px-9 sm:pb-9 sm:pt-10">
        <h3 className="yc-h3 text-[23px] text-white sm:text-[27px]">{b.title}</h3>
        <p className="mx-auto mt-2 max-w-[22rem] text-pretty text-[14.5px] font-medium leading-[1.55] text-yc-on-night-2 sm:mt-3 sm:text-[15px] sm:leading-[1.6]">
          {b.body}
        </p>
      </div>
    </Card>
  );
}

function BilansCard({ className }: { className?: string }) {
  const b = useCrm().bento.bilans;
  // Unique gradient ids: the card exists twice in the page (phone carousel + grid).
  const gid = useId().replace(/[^a-zA-Z0-9]/g, "");
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.4 });
  const cur = "M0 150 C 60 140, 110 120, 170 104 S 260 70, 320 60 S 420 30, 520 18";
  const prev = "M0 152 C 70 146, 120 132, 180 120 S 270 96, 330 88 S 430 62, 520 54";
  return (
    <Card className={cn("min-h-[420px] sm:col-span-2", className)} delay={0.05}>
      <div
        className="absolute inset-0 -z-10"
        style={{
          background:
            "radial-gradient(70% 90% at 50% 120%,rgba(255,107,53,.28),transparent 70%),radial-gradient(60% 60% at 0% 0%,rgba(227,20,27,.08),transparent),var(--noise),#FFF6F2",
        }}
      />
      <CardText title={b.title} body={b.body} />
      <div
        ref={ref}
        className="mx-5 mb-0 mt-auto rounded-t-[22px] bg-white p-4 shadow-[var(--shadow-md)] ring-1 ring-yc-sand-200 sm:mx-10 sm:mt-8 sm:p-6"
      >
        <div className="flex flex-wrap items-start justify-between gap-3 sm:gap-4">
          <div className="flex gap-4 sm:gap-6">
            {b.stats.map((s, i) => (
              <div key={s.l}>
                <div
                  className={cn(
                    "whitespace-nowrap font-yc-display text-[24px] font-semibold leading-none tracking-[-0.03em] sm:text-[30px]",
                    i === 1 ? "text-yc-green-700" : "text-yc-ink",
                  )}
                >
                  {s.v}
                </div>
                <div className="mt-1 text-[11.5px] leading-[1.3] text-yc-sand-500 sm:text-[12.5px] sm:leading-normal">
                  {s.l}
                </div>
              </div>
            ))}
          </div>
          <div className="flex gap-4 text-[12px] text-yc-sand-600 sm:text-[12.5px]">
            <span className="inline-flex items-center gap-1.5">
              <i
                className="inline-block h-[3px] w-4 rounded-full"
                style={{ background: "var(--gradient-brand)" }}
              />
              {b.legend[0]}
            </span>
            <span className="inline-flex items-center gap-1.5">
              <i className="inline-block w-4 border-t-2 border-dashed border-yc-sand-400" />
              {b.legend[1]}
            </span>
          </div>
        </div>
        <div className="relative mt-4">
          <svg
            viewBox="0 0 520 160"
            className="h-[104px] w-full overflow-visible sm:h-[150px]"
            preserveAspectRatio="none"
          >
            <defs>
              <linearGradient id={`${gid}l`} x1="0" x2="1">
                <stop offset="0" stopColor="#E3141B" />
                <stop offset="1" stopColor="#FF6B35" />
              </linearGradient>
              <linearGradient id={`${gid}f`} x1="0" y1="0" x2="0" y2="1">
                <stop offset="0" stopColor="#FF6B35" stopOpacity=".18" />
                <stop offset="1" stopColor="#FF6B35" stopOpacity="0" />
              </linearGradient>
            </defs>
            <path
              d={`${cur} L520 160 L0 160 Z`}
              fill={`url(#${gid}f)`}
              style={{ opacity: inView ? 1 : 0, transition: "opacity .8s .9s" }}
            />
            <path
              d={prev}
              fill="none"
              stroke="#A39A98"
              strokeWidth="2"
              strokeDasharray="5 6"
              vectorEffect="non-scaling-stroke"
            />
            <path
              d={cur}
              fill="none"
              stroke={`url(#${gid}l)`}
              strokeWidth="3.5"
              strokeLinecap="round"
              vectorEffect="non-scaling-stroke"
              pathLength={1}
              style={{
                strokeDasharray: 1,
                strokeDashoffset: inView ? 0 : 1,
                transition: "stroke-dashoffset 1.6s cubic-bezier(.22,1,.36,1) .2s",
              }}
            />
          </svg>
          <div
            className="absolute bottom-0 top-0 border-l-[1.5px] border-dashed border-yc-sand-400"
            style={{ left: "38%", opacity: inView ? 1 : 0, transition: "opacity .5s 1.2s" }}
          >
            <span className="absolute -left-[5px] -top-1 size-2.5 rounded-full bg-yc-ink shadow-[0_0_0_3px_#fff]" />
            <span className="absolute left-2 -top-1.5 whitespace-nowrap rounded-full bg-yc-ink px-2 py-0.5 text-[11px] font-semibold text-white">
              {b.send}
            </span>
          </div>
        </div>
        <div className="mt-2 flex justify-between font-yc-mono text-[11px] text-yc-sand-500">
          <span>{b.axis[0]}</span>
          <span>{b.axis[1]}</span>
        </div>
      </div>
    </Card>
  );
}

function AutomationsCard({ className }: { className?: string }) {
  const b = useCrm().bento.envois;
  return (
    <Card className={cn("min-h-[300px]", className)} delay={0.1}>
      <div className="absolute inset-0 -z-10 bg-yc-sand-50 ring-1 ring-inset ring-black/[.04]" />
      <div className="px-7 pt-7 sm:px-8">
        <div className="mx-auto flex max-w-[300px] flex-col items-stretch">
          {b.flow.map((f, i) => (
            <div key={f.k} className="flex flex-col items-center">
              <div className="flex w-full items-center gap-3 rounded-[14px] bg-white px-3.5 py-2.5 shadow-[var(--shadow-xs)] ring-1 ring-yc-sand-200">
                <span
                  className={cn(
                    "grid size-7 flex-none place-items-center rounded-[9px]",
                    i === 0
                      ? "bg-yc-ink text-white"
                      : i === 2
                        ? "text-white"
                        : "bg-yc-sand-100 text-yc-sand-700",
                  )}
                  style={i === 2 ? { background: "var(--gradient-brand)" } : undefined}
                >
                  {i === 0 ? (
                    <Zap className="size-3.5" />
                  ) : i === 1 ? (
                    <ArrowRight className="size-3.5" />
                  ) : (
                    <Mail className="size-3.5" />
                  )}
                </span>
                <span className="flex min-w-0 flex-col text-left">
                  <span className="font-yc-mono text-[10.5px] uppercase tracking-[0.06em] text-yc-sand-500">
                    {f.k}
                  </span>
                  <span className="truncate text-[13px] font-semibold">{f.v}</span>
                </span>
              </div>
              {i < b.flow.length - 1 && <ArrowDown className="my-1 size-3.5 text-yc-sand-400" />}
            </div>
          ))}
        </div>
      </div>
      <div className="px-7 pb-8 pt-5 text-center sm:px-8">
        <h3 className="yc-h3 text-[23px] text-yc-ink">{b.title}</h3>
        <p className="mx-auto mt-2 max-w-[22rem] text-pretty text-[14.5px] leading-[1.55] text-yc-sand-600">
          {b.body}
        </p>
      </div>
    </Card>
  );
}

const PHONE_CARD = "h-[476px] min-h-0 w-[86%] max-w-[340px]";

export function CrmBento() {
  const b = useCrm().bento;
  const phone = useIsPhone();
  return (
    <section
      id="produit"
      data-ph-section="features"
      className="relative px-4 pt-20 sm:px-6 sm:pt-36"
    >
      <div className="mx-auto flex max-w-[1200px] flex-col justify-between gap-5 sm:gap-8 lg:flex-row lg:items-end">
        <div className="max-w-[620px]">
          <Reveal>
            <Eyebrow>{b.eyebrow}</Eyebrow>
          </Reveal>
          <Reveal delay={0.05}>
            <h2 className="yc-h2 mt-5 text-yc-ink">
              <Accent text={b.title} accent={b.accent} />
            </h2>
          </Reveal>
        </div>
        <Reveal
          delay={0.1}
          className="flex max-w-[400px] flex-col items-start gap-6 lg:items-end lg:text-right"
        >
          <p className="text-[16px] leading-[1.6] text-yc-sand-600 sm:text-[17px]">{b.sub}</p>
          <CtaButton ring cta="features_crm" className="max-sm:hidden">
            {b.cta}
          </CtaButton>
        </Reveal>
      </div>

      {/* Phones: the five cards in a row you swipe */}
      {phone !== false && (
        <div className="mt-8 sm:hidden">
          <InRow.Provider value>
            <SwipeRow count={5} label={b.title}>
              <ClientsCard className={PHONE_CARD} />
              <SegmentsCard className={PHONE_CARD} />
              <RelanceCard className={PHONE_CARD} />
              <BilansCard className={PHONE_CARD} />
              <AutomationsCard className={PHONE_CARD} />
            </SwipeRow>
          </InRow.Provider>
        </div>
      )}

      <div className="mx-auto mt-14 hidden max-w-[1200px] gap-5 sm:grid lg:grid-cols-3">
        <div className="grid gap-5 sm:grid-cols-2 lg:col-span-2">
          <ClientsCard />
          <SegmentsCard />
          <BilansCard />
        </div>
        <div className="grid gap-5 lg:grid-rows-[1fr_auto]">
          <RelanceCard />
          <AutomationsCard />
        </div>
      </div>
    </section>
  );
}
