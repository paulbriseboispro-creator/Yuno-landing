import { QueryClient } from "@tanstack/react-query";
import { createRouter } from "@tanstack/react-router";
import { routeTree } from "./routeTree.gen";
import { crmHostToRoute, crmRouteToHost, isCrmHost } from "@/i18n/hosts";

export const getRouter = () => {
  const queryClient = new QueryClient();

  const router = createRouter({
    routeTree,
    context: { queryClient },
    scrollRestoration: true,
    defaultPreloadStaleTime: 0,
    // crm.yunoapp.eu serves the CRM page at its root ("/" = route "/crm"),
    // see src/i18n/hosts.ts. Other hosts are left untouched.
    rewrite: {
      input: ({ url }) => (isCrmHost(url.host) ? crmHostToRoute(url) : undefined),
      output: ({ url }) => (isCrmHost(url.host) ? crmRouteToHost(url) : undefined),
    },
  });

  return router;
};
