// Client for the Yuno APP's Supabase project (not the landing's own project,
// which only keeps legacy demo_leads). The pro signup funnel creates the
// account there, then hands the session over to yunoapp.eu.
//
// The URL and publishable key are public by design: they already ship in every
// yunoapp.eu bundle (see scripts/ci-web-env.sh in the yuno repo) and RLS guards
// the data. Override with VITE_YUNO_SUPABASE_URL / VITE_YUNO_SUPABASE_KEY for a
// staging project. No secret ever lives here.
import { createClient, type SupabaseClient } from "@supabase/supabase-js";

export const YUNO_APP_ORIGIN = "https://yunoapp.eu";

const YUNO_SUPABASE_URL =
  import.meta.env.VITE_YUNO_SUPABASE_URL || "https://fulawxvdlwtdlpkycixe.supabase.co";
const YUNO_SUPABASE_KEY =
  import.meta.env.VITE_YUNO_SUPABASE_KEY || "sb_publishable_2rOH-YqTzz-YdIbQSrswpg_Os7DU-r1";

let client: SupabaseClient | null = null;

// Browser-only. The session stays in memory: it belongs to yunoapp.eu and is
// handed over in the URL fragment right after signup, never kept on this origin.
export function yunoApp(): SupabaseClient {
  if (!client) {
    client = createClient(YUNO_SUPABASE_URL, YUNO_SUPABASE_KEY, {
      auth: { persistSession: false, autoRefreshToken: false, detectSessionInUrl: false },
    });
  }
  return client;
}

/** Login on the app, landing back on the personalised /get-started page. */
export function appLoginUrl(signupKey?: string): string {
  const back = "/get-started" + (signupKey ? `?key=${signupKey}` : "");
  return `${YUNO_APP_ORIGIN}/auth?redirect=${encodeURIComponent(back)}`;
}

/** Session handoff to yunoapp.eu (see AuthHandoff.tsx in the yuno repo). */
export function appHandoffUrl(
  accessToken: string,
  refreshToken: string,
  lang: string,
  redirect = "/get-started",
): string {
  const frag = new URLSearchParams({
    yuno_at: accessToken,
    yuno_rt: refreshToken,
    redirect,
    lang,
  });
  return `${YUNO_APP_ORIGIN}/auth/handoff#${frag.toString()}`;
}

/** Random, unguessable id for one signup journey (pro_signups.client_key). */
export function newSignupKey(): string {
  const bytes = new Uint8Array(18);
  crypto.getRandomValues(bytes);
  return Array.from(bytes, (b) => b.toString(36).padStart(2, "0"))
    .join("")
    .slice(0, 32);
}

/** Fire-and-forget funnel tracking (RPC track_pro_signup, anon). Never throws. */
export async function trackSignup(
  key: string,
  step: "opened" | "role" | "structure" | "account" | "lead",
  data: Record<string, unknown> = {},
): Promise<void> {
  try {
    await yunoApp().rpc("track_pro_signup", { p_key: key, p_step: step, p_data: data });
  } catch {
    // A measurement never breaks a signup.
  }
}
