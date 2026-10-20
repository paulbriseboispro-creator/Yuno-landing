import { useSearch } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { useState, type ReactNode } from "react";
import { motion } from "motion/react";
import { ArrowRight, CheckCircle2, Loader2, MailIcon, MapPinIcon, PhoneIcon } from "lucide-react";
import { submitLead } from "@/lib/leads.functions";
import { capture } from "@/lib/posthog";
import { cn } from "@/lib/utils";
import { useContact } from "@/content/contact";
import { useLocale } from "@/i18n/locale";
import { LandingShell } from "@/components/landing/Shell";
import { Eyebrow, FounderCta, PrimaryCta } from "@/components/landing/ui";
import { PhoneInput } from "@/components/PhoneInput";

type Segment = "club" | "organizer" | "affiliate" | "other";

// Same field look as the signup dialog (SignupFlow's INPUT).
const INPUT =
  "w-full rounded-xl border border-zinc-200 bg-white px-3.5 text-[16px] text-zinc-950 sm:text-[15px] outline-none transition-[border-color,box-shadow] placeholder:text-zinc-400 focus:border-zinc-950 focus:shadow-[0_0_0_4px_rgba(10,10,11,0.06)]";

// /contact and /fr/contact, on the landing's light chrome. Pros open their
// account themselves (no call to book): the page leads with that, then a
// message form (a lead through the Yuno app's public RPC, submitLead) and the
// founder's WhatsApp for those with a question first.
export function ContactPage() {
  const t = useContact();
  const lang = useLocale();
  const send = useServerFn(submitLead);
  // Links may deep-link here with ?segment= and ?besoin=, so the form arrives
  // pre-selected on the right role and pre-loaded with the chosen pain.
  const search = useSearch({ strict: false }) as { segment?: Segment; besoin?: string };
  const besoin = search.besoin;
  const [segment, setSegment] = useState<Segment>(search.segment ?? "club");
  const [status, setStatus] = useState<"idle" | "loading" | "done" | "error">("idle");
  const [error, setError] = useState<string | null>(null);
  // Optional, but never a bare tel field: country + number, sent international.
  const [phone, setPhone] = useState("");
  const [phoneValid, setPhoneValid] = useState(true);
  const prefillMessage =
    besoin && t.besoinLabels[besoin] ? `${t.prefillPrefix} : ${t.besoinLabels[besoin]}.` : "";

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (phone && !phoneValid) {
      setStatus("error");
      setError(t.form.phoneInvalid);
      return;
    }
    setStatus("loading");
    setError(null);
    const fd = new FormData(e.currentTarget);
    try {
      await send({
        data: {
          segment,
          name: String(fd.get("name") || ""),
          email: String(fd.get("email") || ""),
          company: String(fd.get("company") || ""),
          role: "",
          phone,
          message: String(fd.get("message") || ""),
          source: besoin ? `landing-contact:${besoin}` : "landing-contact",
        },
      });
      capture("contact_form_submitted", {
        segment: segment,
        source: besoin ? `landing-contact:${besoin}` : "landing-contact",
      });
      setStatus("done");
    } catch (err) {
      console.error(err);
      setStatus("error");
      setError(t.form.errorMessage);
    }
  }

  const segments: { id: Segment; label: string }[] = [
    { id: "club", label: t.form.segments.club },
    { id: "organizer", label: t.form.segments.organizer },
    { id: "affiliate", label: t.form.segments.affiliate },
    { id: "other", label: t.form.segments.other },
  ];

  const contactInfo = [
    {
      icon: <MailIcon />,
      label: t.contactInfo.emailLabel,
      value: "paul.brisebois.pro@gmail.com",
      href: "mailto:paul.brisebois.pro@gmail.com",
    },
    {
      icon: <PhoneIcon />,
      label: t.contactInfo.phoneLabel,
      value: "+33 6 44 21 66 89",
      href: "tel:+33644216689",
    },
    { icon: <MapPinIcon />, label: t.contactInfo.locationLabel, value: t.contactInfo.location },
  ];

  return (
    <LandingShell lang={lang} path="/contact">
      <section data-ph-section="contact" className="px-4 pb-24 pt-10 sm:px-6 md:pt-16">
        <div className="yl-card mx-auto grid max-w-5xl overflow-hidden md:grid-cols-[1fr_0.9fr]">
          {/* Left — info column */}
          <div className="flex flex-col gap-5 p-7 lg:p-10">
            <Eyebrow className="w-fit">{t.tag}</Eyebrow>
            <h1 className="yl-h1 text-balance text-[clamp(1.9rem,3.6vw,2.6rem)] text-zinc-950">
              {t.heading.lead} <span className="text-zinc-500">{t.heading.accent}</span>
            </h1>
            <p className="max-w-md text-[15px] leading-relaxed text-zinc-500">{t.subhead}</p>

            <ul className="space-y-2.5 pt-1 text-sm">
              {t.benefits.map((b) => (
                <li key={b} className="flex items-center gap-2.5 text-zinc-600">
                  <CheckCircle2 className="size-4 text-[var(--yuno-red)]" strokeWidth={1.75} />
                  {b}
                </li>
              ))}
            </ul>

            <PrimaryCta cta="contact_signup" className="w-fit">
              {t.cta}
            </PrimaryCta>

            <div className="grid gap-3 pt-1">
              {contactInfo.map((info) => (
                <ContactInfo key={info.label} {...info} />
              ))}
            </div>
          </div>

          {/* Right — form column */}
          <div className="flex items-center border-t border-zinc-200 bg-zinc-50 p-7 md:border-l md:border-t-0 lg:p-10">
            {status === "done" ? (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="w-full py-8 text-center"
              >
                <div className="mx-auto mb-4 grid size-12 place-items-center rounded-full bg-emerald-50">
                  <CheckCircle2 className="size-6 text-emerald-600" />
                </div>
                <h2 className="yl-h3 mb-2 text-2xl text-zinc-950">{t.success.title}</h2>
                <p className="mx-auto max-w-[42ch] text-sm text-zinc-500">{t.success.body}</p>
              </motion.div>
            ) : (
              <form onSubmit={onSubmit} className="w-full space-y-4">
                <h2 className="yl-h3 text-lg text-zinc-950">{t.formTitle}</h2>
                <div>
                  <p className="mb-2 text-[13px] font-medium text-zinc-800">
                    {t.form.segmentLabel}
                  </p>
                  <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
                    {segments.map((s) => (
                      <button
                        key={s.id}
                        type="button"
                        onClick={() => setSegment(s.id)}
                        aria-pressed={segment === s.id}
                        className={cn(
                          "rounded-lg border px-3 py-2 text-xs font-medium transition-colors",
                          segment === s.id
                            ? "border-[var(--yuno-red)] bg-[var(--yuno-red)]/10 text-[var(--yuno-red)]"
                            : "border-zinc-200 bg-white text-zinc-600 hover:text-zinc-950",
                        )}
                      >
                        {s.label}
                      </button>
                    ))}
                  </div>
                </div>

                <Labeled id="name" label={t.form.nameLabel}>
                  <input
                    id="name"
                    name="name"
                    required
                    maxLength={120}
                    placeholder={t.form.namePlaceholder}
                    autoComplete="name"
                    className={cn(INPUT, "h-11")}
                  />
                </Labeled>
                <Labeled id="email" label={t.form.emailLabel}>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    required
                    maxLength={255}
                    placeholder={t.form.emailPlaceholder}
                    autoComplete="email"
                    className={cn(INPUT, "h-11")}
                  />
                </Labeled>
                <Labeled id="company" label={t.form.companyLabel}>
                  <input
                    id="company"
                    name="company"
                    maxLength={160}
                    placeholder={t.form.companyPlaceholder}
                    className={cn(INPUT, "h-11")}
                  />
                </Labeled>
                <Labeled id="phone" label={t.form.phoneLabel}>
                  <PhoneInput
                    id="phone"
                    lang={lang}
                    value={phone}
                    onChange={(v, valid) => {
                      setPhone(v);
                      setPhoneValid(valid);
                    }}
                    countryLabel={t.form.phoneCountry}
                    selectClassName={cn(INPUT, "h-11 w-auto px-3 text-zinc-800")}
                    inputClassName={cn(INPUT, "h-11")}
                  />
                </Labeled>
                <Labeled id="message" label={t.form.messageLabel}>
                  <textarea
                    id="message"
                    name="message"
                    rows={3}
                    maxLength={2000}
                    placeholder={t.form.messagePlaceholder}
                    key={besoin ?? "none"}
                    defaultValue={prefillMessage}
                    className={cn(INPUT, "resize-y py-2.5")}
                  />
                </Labeled>

                {status === "error" && <p className="text-xs text-[var(--yuno-red)]">{error}</p>}

                <button
                  type="submit"
                  disabled={status === "loading"}
                  className="yl-btn-primary group h-11 w-full px-5 text-sm disabled:opacity-60"
                >
                  {status === "loading" ? (
                    <>
                      <Loader2 className="size-4 animate-spin" /> {t.form.submitting}
                    </>
                  ) : (
                    <>
                      {t.form.submit}
                      <ArrowRight className="size-4 transition-transform duration-300 group-hover:translate-x-0.5" />
                    </>
                  )}
                </button>

                <div className="flex items-center gap-3">
                  <span className="h-px flex-1 bg-zinc-200" />
                  <span className="text-[11px] uppercase tracking-[0.16em] text-zinc-400">
                    {t.form.or}
                  </span>
                  <span className="h-px flex-1 bg-zinc-200" />
                </div>
                <FounderCta className="w-full justify-center">{t.form.whatsappCta}</FounderCta>

                <p className="text-center text-[11px] text-zinc-400">{t.consent}</p>
              </form>
            )}
          </div>
        </div>
      </section>
    </LandingShell>
  );
}

function Labeled({ id, label, children }: { id: string; label: string; children: ReactNode }) {
  return (
    <div>
      <label htmlFor={id} className="mb-1.5 block text-[13px] font-medium text-zinc-800">
        {label}
      </label>
      {children}
    </div>
  );
}

type ContactInfoProps = {
  icon: ReactNode;
  label: string;
  value: string;
  href?: string;
};

function ContactInfo({ icon, label, value, href }: ContactInfoProps) {
  return (
    <div className="flex items-center gap-3 py-1">
      <div className="rounded-lg border border-zinc-200 bg-white p-2.5 text-[var(--yuno-red)] [&_svg]:size-4">
        {icon}
      </div>
      <div>
        <p className="text-sm font-medium text-zinc-900">{label}</p>
        {href ? (
          <a href={href} className="text-xs text-zinc-500 hover:text-zinc-950 hover:underline">
            {value}
          </a>
        ) : (
          <p className="text-xs text-zinc-500">{value}</p>
        )}
      </div>
    </div>
  );
}
