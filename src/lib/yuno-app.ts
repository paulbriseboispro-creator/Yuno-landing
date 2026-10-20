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
      // Implicit flow on purpose: Google / Apple sign-in leaves for the provider and comes back
      // with the session in the URL fragment, read by the funnel itself (no PKCE verifier to keep).
      auth: {
        flowType: "implicit",
        persistSession: false,
        autoRefreshToken: false,
        detectSessionInUrl: false,
      },
    });
  }
  return client;
}

/** Login on the app, landing back on the personalised /get-started page. */
export function appLoginUrl(signupKey?: string): string {
  const back = "/get-started" + (signupKey ? `?key=${signupKey}` : "");
  return `${YUNO_APP_ORIGIN}/auth?redirect=${encodeURIComponent(back)}`;
}

/**
 * Session handoff to the app (see AuthHandoff.tsx in the yuno repo): yunoapp.eu
 * for Yuno Ticketing, crm.yunoapp.eu for Yuno CRM (its own origin, so its own
 * session — the app serves its CRM side there since 4 Oct 2026).
 */
export function appHandoffUrl(
  accessToken: string,
  refreshToken: string,
  lang: string,
  redirect = "/get-started",
  origin = YUNO_APP_ORIGIN,
): string {
  const frag = new URLSearchParams({
    yuno_at: accessToken,
    yuno_rt: refreshToken,
    redirect,
    lang,
  });
  return `${origin}/auth/handoff#${frag.toString()}`;
}

/**
 * "Does this address already have a Yuno account?" — asked while the person types it, not
 * after the password (Poupée, 19/10/2026: a club owner came back to the funnel four times and
 * only learned at the last screen that his address was taken). App RPC `email_has_account`
 * (yuno repo, migration 20260830120000): a boolean, never a row; `auth.signUp` already reveals
 * the same thing, only too late. `null` = we don't know (network, RPC down): never block on it.
 */
export async function emailHasAccount(email: string): Promise<boolean | null> {
  try {
    const { data, error } = await yunoApp().rpc("email_has_account", {
      _email: email.trim().toLowerCase(),
    });
    if (error || typeof data !== "boolean") return null;
    return data;
  } catch {
    return null;
  }
}

export type LoginLinkResult = "sent" | "wait" | "failed";

/**
 * One-tap way back in for an address that already has an account: a passwordless login link
 * (Supabase magic link, bilingual FR/EN template of the app's Auth, valid one hour, one use).
 * It also covers a forgotten password. `shouldCreateUser: false`: it never opens an account.
 * `redirectTo` must be in the app's Auth redirect allow-list (yunoapp.eu, landing, crm).
 */
export async function sendLoginLink(email: string, redirectTo: string): Promise<LoginLinkResult> {
  try {
    const { error } = await yunoApp().auth.signInWithOtp({
      email: email.trim().toLowerCase(),
      options: { shouldCreateUser: false, emailRedirectTo: redirectTo },
    });
    if (!error) return "sent";
    const code = (error as { code?: string }).code ?? "";
    if (
      error.status === 429 ||
      code === "over_email_send_rate_limit" ||
      code === "over_request_rate_limit"
    )
      return "wait";
    return "failed";
  } catch {
    return "failed";
  }
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
