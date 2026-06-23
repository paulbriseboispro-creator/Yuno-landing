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
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const { error } = await supabaseAdmin.from("demo_leads").insert({
      segment: data.segment,
      name: data.name,
      email: data.email,
      company: data.company || null,
      role: data.role || null,
      phone: data.phone || null,
      message: data.message || null,
      source: data.source || null,
    });
    if (error) {
      console.error("[demo_leads] insert failed", error);
      throw new Error("Could not save your request. Please try again.");
    }
    return { ok: true as const };
  });
