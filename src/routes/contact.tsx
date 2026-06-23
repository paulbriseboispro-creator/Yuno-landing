import { createFileRoute } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { useState } from "react";
import { motion } from "motion/react";
import { ArrowRight, CheckCircle2, Loader2, MailIcon, PhoneIcon, MapPinIcon } from "lucide-react";
import { submitLead } from "@/lib/leads.functions";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Book a demo — Yuno" },
      {
        name: "description",
        content:
          "Talk to a Yuno expert. We'll walk through your floor plan, your fee stack and what migrating would look like.",
      },
      { property: "og:title", content: "Book a demo — Yuno" },
      {
        property: "og:description",
        content: "Talk to a Yuno expert. 30-minute call, no pressure.",
      },
      { property: "og:url", content: "/contact" },
    ],
    links: [{ rel: "canonical", href: "/contact" }],
  }),
  component: ContactPage,
});

type Segment = "club" | "organizer" | "affiliate" | "other";

const contactInfo = [
  { icon: <MailIcon />, label: "Email", value: "hello@yuno.io" },
  { icon: <PhoneIcon />, label: "Phone", value: "+33 1 86 65 12 34" },
  { icon: <MapPinIcon />, label: "Based in", value: "Paris · Barcelona · London" },
];

function ContactPage() {
  const send = useServerFn(submitLead);
  const [segment, setSegment] = useState<Segment>("club");
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
          segment,
          name: String(fd.get("name") || ""),
          email: String(fd.get("email") || ""),
          company: String(fd.get("company") || ""),
          role: "",
          phone: String(fd.get("phone") || ""),
          message: String(fd.get("message") || ""),
          source: "landing-contact",
        },
      });
      setStatus("done");
    } catch (err) {
      console.error(err);
      setStatus("error");
      setError(err instanceof Error ? err.message : "Something went wrong.");
    }
  }

  const segments: { id: Segment; label: string }[] = [
    { id: "club", label: "Nightclub" },
    { id: "organizer", label: "Organizer" },
    { id: "affiliate", label: "Promoter" },
    { id: "other", label: "Other" },
  ];

  return (
    <section className="pt-24 pb-24 px-6">
      <div className="relative mx-auto grid h-full w-full max-w-5xl rounded-2xl border bg-surface md:grid-cols-[1fr_0.85fr] overflow-hidden">
        {/* Left — info column */}
        <div className="col-span-1 flex flex-col space-y-5 p-8 lg:p-10">
          <span className="inline-flex w-fit items-center gap-2 text-xs font-medium uppercase tracking-[0.18em] text-muted-foreground border border-border rounded-full px-3 py-1">
            <span className="size-1.5 rounded-full bg-accent" />
            Talk to us
          </span>
          <h1 className="font-medium text-3xl tracking-tight md:text-4xl text-balance leading-[1.1]">
            Book a 30-minute{" "}
            <span className="serif italic text-muted-foreground">walkthrough</span>
          </h1>
          <p className="max-w-md text-muted-foreground text-sm leading-relaxed md:text-base">
            Tell us about your venue or your events. We'll come back within one business day with a tailored demo and a fee comparison.
          </p>

          <ul className="space-y-2.5 text-sm pt-2">
            {["No card, no commitment", "Migration plan from your current tooling", "EU-based, GDPR-native"].map((b) => (
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
        <div className="col-span-1 flex items-center border-t p-8 md:border-t-0 md:border-l bg-background/40">
          {status === "done" ? (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="w-full text-center py-8"
            >
              <div className="mx-auto size-12 rounded-full bg-accent/15 grid place-items-center mb-4">
                <CheckCircle2 className="size-6 text-accent" />
              </div>
              <h2 className="text-2xl font-medium tracking-tight mb-2">You're on the list.</h2>
              <p className="text-sm text-muted-foreground max-w-[42ch] mx-auto">
                We'll be in touch within one business day.
              </p>
            </motion.div>
          ) : (
            <form onSubmit={onSubmit} className="w-full">
              <FieldGroup>
                <Field>
                  <FieldLabel>I am a…</FieldLabel>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                    {segments.map((s) => (
                      <button
                        key={s.id}
                        type="button"
                        onClick={() => setSegment(s.id)}
                        className={cn(
                          "px-3 py-2 rounded-lg text-xs font-medium transition-colors ring-1",
                          segment === s.id
                            ? "bg-accent/15 text-accent ring-accent/40"
                            : "bg-background text-muted-foreground ring-border hover:text-foreground",
                        )}
                      >
                        {s.label}
                      </button>
                    ))}
                  </div>
                </Field>

                <Field>
                  <FieldLabel htmlFor="name">Full name</FieldLabel>
                  <Input id="name" name="name" required maxLength={120} placeholder="Alex Martin" autoComplete="name" />
                </Field>

                <Field>
                  <FieldLabel htmlFor="email">Work email</FieldLabel>
                  <Input id="email" name="email" type="email" required maxLength={255} placeholder="alex@yourclub.com" autoComplete="email" />
                </Field>

                <Field>
                  <FieldLabel htmlFor="company">Company / venue</FieldLabel>
                  <Input id="company" name="company" maxLength={160} placeholder="Neon Room" />
                </Field>

                <Field>
                  <FieldLabel htmlFor="phone">Phone</FieldLabel>
                  <Input id="phone" name="phone" type="tel" maxLength={40} placeholder="+33 6 ..." autoComplete="tel" />
                </Field>

                <Field>
                  <FieldLabel htmlFor="message">What do you want to fix first?</FieldLabel>
                  <Textarea id="message" name="message" rows={3} maxLength={2000} placeholder="Bar queues, VIP tracking, ticketing fees..." />
                </Field>
              </FieldGroup>

              {status === "error" && (
                <p className="text-xs text-destructive mt-4">{error}</p>
              )}

              <Button type="submit" disabled={status === "loading"} className="mt-8 w-full">
                {status === "loading" ? (
                  <>
                    <Loader2 className="size-4 animate-spin" /> Sending…
                  </>
                ) : (
                  <>
                    Book my demo <ArrowRight className="size-4" />
                  </>
                )}
              </Button>

              <p className="text-[11px] text-muted-foreground mt-4 text-center">
                By submitting you agree to be contacted about Yuno. We never share your data.
              </p>
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
};

function ContactInfo({ icon, label, value }: ContactInfoProps) {
  return (
    <div className="flex items-center gap-3 py-1.5">
      <div className="rounded-lg border bg-card p-2.5 shadow-xs [&_svg]:size-4 text-accent">
        {icon}
      </div>
      <div>
        <p className="font-medium text-sm">{label}</p>
        <p className="text-muted-foreground text-xs">{value}</p>
      </div>
    </div>
  );
}
