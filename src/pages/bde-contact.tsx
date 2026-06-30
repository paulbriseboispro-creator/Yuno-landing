import { useServerFn } from "@tanstack/react-start";
import { useState } from "react";
import { motion } from "motion/react";
import { ArrowRight, CheckCircle2, Loader2, MailIcon, PhoneIcon, MapPinIcon } from "lucide-react";
import { submitLead } from "@/lib/leads.functions";
import { Button } from "@/components/ui/button";
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useBde } from "@/content/bde";

// Contact page for the standalone /bde space. A BDE is always an event
// organizer, so the segment is fixed (no picker) and leads are tagged
// `source: "bde-contact"` so they're distinguishable from the main funnel.
// French-only and rendered inside the BDE chrome (see __root.tsx).
export function BdeContactPage() {
  const t = useBde().contact;
  const send = useServerFn(submitLead);
  const [status, setStatus] = useState<"idle" | "loading" | "done" | "error">("idle");
  const [error, setError] = useState<string | null>(null);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("loading");
    setError(null);
    const fd = new FormData(e.currentTarget);
    try {
      await send({
        data: {
          segment: "organizer",
          name: String(fd.get("name") || ""),
          email: String(fd.get("email") || ""),
          company: String(fd.get("company") || ""),
          role: "",
          phone: String(fd.get("phone") || ""),
          message: String(fd.get("message") || ""),
          source: "bde-contact",
        },
      });
      setStatus("done");
    } catch (err) {
      console.error(err);
      setStatus("error");
      setError(t.form.errorMessage);
    }
  }

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
    <section className="px-6 pt-16 pb-24">
      <div className="relative mx-auto grid h-full w-full max-w-5xl overflow-hidden rounded-2xl border bg-surface md:grid-cols-[1fr_0.85fr]">
        {/* Left — info column */}
        <div className="col-span-1 flex flex-col space-y-5 p-8 lg:p-10">
          <span className="inline-flex w-fit items-center gap-2 rounded-full border border-border px-3 py-1 text-xs font-medium uppercase tracking-[0.18em] text-muted-foreground">
            <span className="size-1.5 rounded-full bg-accent" />
            {t.tag}
          </span>
          <h1 className="text-balance text-3xl font-medium leading-[1.1] tracking-tight md:text-4xl">
            {t.heading.lead}{" "}
            <span className="serif italic text-muted-foreground">{t.heading.accent}</span>
          </h1>
          <p className="max-w-md text-sm leading-relaxed text-muted-foreground md:text-base">
            {t.subhead}
          </p>

          <ul className="space-y-2.5 pt-2 text-sm">
            {t.benefits.map((b) => (
              <li key={b} className="flex items-center gap-2.5 text-muted-foreground">
                <CheckCircle2 className="size-4 text-accent" strokeWidth={1.75} />
                {b}
              </li>
            ))}
          </ul>

          <div className="grid gap-3 pt-2">
            {contactInfo.map((info) => (
              <ContactInfo key={info.label} {...info} />
            ))}
          </div>
        </div>

        {/* Right — form column */}
        <div className="col-span-1 flex items-center border-t bg-background/40 p-8 md:border-t-0 md:border-l">
          {status === "done" ? (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="w-full py-8 text-center"
            >
              <div className="mx-auto mb-4 grid size-12 place-items-center rounded-full bg-accent/15">
                <CheckCircle2 className="size-6 text-accent" />
              </div>
              <h2 className="mb-2 text-2xl font-medium tracking-tight">{t.success.title}</h2>
              <p className="mx-auto max-w-[42ch] text-sm text-muted-foreground">{t.success.body}</p>
            </motion.div>
          ) : (
            <form onSubmit={onSubmit} className="w-full">
              <FieldGroup>
                <Field>
                  <FieldLabel htmlFor="name">{t.form.nameLabel}</FieldLabel>
                  <Input
                    id="name"
                    name="name"
                    required
                    maxLength={120}
                    placeholder={t.form.namePlaceholder}
                    autoComplete="name"
                  />
                </Field>

                <Field>
                  <FieldLabel htmlFor="email">{t.form.emailLabel}</FieldLabel>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    required
                    maxLength={255}
                    placeholder={t.form.emailPlaceholder}
                    autoComplete="email"
                  />
                </Field>

                <Field>
                  <FieldLabel htmlFor="company">{t.form.orgLabel}</FieldLabel>
                  <Input
                    id="company"
                    name="company"
                    maxLength={160}
                    placeholder={t.form.orgPlaceholder}
                  />
                </Field>

                <Field>
                  <FieldLabel htmlFor="phone">{t.form.phoneLabel}</FieldLabel>
                  <Input
                    id="phone"
                    name="phone"
                    type="tel"
                    maxLength={40}
                    placeholder={t.form.phonePlaceholder}
                    autoComplete="tel"
                  />
                </Field>

                <Field>
                  <FieldLabel htmlFor="message">{t.form.messageLabel}</FieldLabel>
                  <Textarea
                    id="message"
                    name="message"
                    rows={3}
                    maxLength={2000}
                    placeholder={t.form.messagePlaceholder}
                  />
                </Field>
              </FieldGroup>

              {status === "error" && <p className="mt-4 text-xs text-destructive">{error}</p>}

              <Button type="submit" disabled={status === "loading"} className="mt-8 w-full">
                {status === "loading" ? (
                  <>
                    <Loader2 className="size-4 animate-spin" /> {t.form.submitting}
                  </>
                ) : (
                  <>
                    {t.form.submit} <ArrowRight className="size-4" />
                  </>
                )}
              </Button>

              <p className="mt-4 text-center text-[11px] text-muted-foreground">{t.consent}</p>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}

type ContactInfoProps = {
  icon: React.ReactNode;
  label: string;
  value: string;
  href?: string;
};

function ContactInfo({ icon, label, value, href }: ContactInfoProps) {
  return (
    <div className="flex items-center gap-3 py-1.5">
      <div className="rounded-lg border bg-card p-2.5 text-accent shadow-xs [&_svg]:size-4">
        {icon}
      </div>
      <div>
        <p className="text-sm font-medium">{label}</p>
        {href ? (
          <a
            href={href}
            className="text-xs text-muted-foreground hover:text-accent hover:underline"
          >
            {value}
          </a>
        ) : (
          <p className="text-xs text-muted-foreground">{value}</p>
        )}
      </div>
    </div>
  );
}
