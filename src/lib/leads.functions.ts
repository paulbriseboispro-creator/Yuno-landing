import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

const schema = z.object({
  segment: z.enum(["club", "organizer", "affiliate", "other"]),
  name: z.string().trim().min(1).max(120),
  email: z.string().trim().email().max(255),
  company: z.string().trim().max(160).optional().or(z.literal("")),
  role: z.string().trim().max(120).optional().or(z.literal("")),
  phone: z.string().trim().max(40).optional().or(z.literal("")),
  message: z.string().trim().max(2000).optional().or(z.literal("")),
  source: z.string().trim().max(120).optional().or(z.literal("")),
});

export const submitLead = createServerFn({ method: "POST" })
  .inputValidator((data: unknown) => schema.parse(data))
  .handler(async ({ data }) => {
    // The contact form writes to the Yuno app's Supabase (one project to run):
    // a public RPC, so the Worker needs the publishable key only, no secret.
    const { yunoApp } = await import("@/lib/yuno-app");
    const { error } = await yunoApp().rpc("submit_landing_contact_lead", {
      p_segment: data.segment,
      p_name: data.name,
      p_email: data.email,
      p_company: data.company || null,
      p_role: data.role || null,
      p_phone: data.phone || null,
      p_message: data.message || null,
      p_source: data.source || null,
    });
    if (error) {
      console.error("[landing_contact_leads] insert failed", error);
      throw new Error("Could not save your request. Please try again.");
    }
    return { ok: true as const };
  });
