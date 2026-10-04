import { createStart, createMiddleware } from "@tanstack/react-start";

import { renderErrorPage } from "./lib/error-page";
import { attachSupabaseAuth } from "@/integrations/supabase/auth-attacher";
import { hostRedirect } from "@/i18n/hosts";

// landing.yunoapp.eu/crm → crm.yunoapp.eu, and crm.yunoapp.eu only serves the
// CRM page and its signup (src/i18n/hosts.ts). Lives here, not in src/server.ts:
// importing app modules there turns their constants into exports of the Worker
// entry, which Cloudflare rejects.
const hostMiddleware = createMiddleware().server(async ({ next, request }) => {
  if (request.method === "GET" || request.method === "HEAD") {
    const to = hostRedirect(new URL(request.url));
    if (to) return Response.redirect(to, 301);
  }
  return next();
});

const errorMiddleware = createMiddleware().server(async ({ next }) => {
  try {
    return await next();
  } catch (error) {
    if (error != null && typeof error === "object" && "statusCode" in error) {
      throw error;
    }
    console.error(error);
    return new Response(renderErrorPage(), {
      status: 500,
      headers: { "content-type": "text/html; charset=utf-8" },
    });
  }
});

export const startInstance = createStart(() => ({
  functionMiddleware: [attachSupabaseAuth],
  requestMiddleware: [hostMiddleware, errorMiddleware],
}));
