import { createStart, createMiddleware } from "@tanstack/react-start";

import { renderErrorPage } from "./lib/error-page";
import { attachSupabaseAuth } from "@/integrations/supabase/auth-attacher";
import { hostRoute, relayToApp } from "@/i18n/hosts";

// landing.yunoapp.eu/crm → crm.yunoapp.eu, and crm.yunoapp.eu serves the CRM
// page, its signup and — relayed to yunoapp.eu — the Yuno app's CRM side
// (sign-in, Console, Admin CRM: src/i18n/hosts.ts). Lives here, not in
// src/server.ts: importing app modules there turns their constants into exports
// of the Worker entry, which Cloudflare rejects.
const hostMiddleware = createMiddleware().server(async ({ next, request }) => {
  if (request.method === "GET" || request.method === "HEAD") {
    const url = new URL(request.url);
    // One URL per page for search engines: https only (the zone serves plain
    // http too), and no trailing slash, as a permanent redirect (the router's
    // own is a 307, which Google reads as temporary).
    if (url.hostname.endsWith("yunoapp.eu") && url.protocol === "http:") {
      url.protocol = "https:";
      return Response.redirect(url.toString(), 301);
    }
    const route = hostRoute(url);
    if (route && "app" in route) return relayToApp(request, route.app);
    if (route) return Response.redirect(route.redirect, 301);
    if (url.pathname.length > 1 && url.pathname.endsWith("/")) {
      url.pathname = url.pathname.replace(/\/+$/, "") || "/";
      return Response.redirect(url.toString(), 301);
    }
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
