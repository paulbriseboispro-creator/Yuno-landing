import { writeFile } from "node:fs/promises";
import { resolve } from "node:path";
import { pathToFileURL } from "node:url";
import { defineConfig, type Plugin } from "vite";
import tsConfigPaths from "vite-tsconfig-paths";
import tailwindcss from "@tailwindcss/vite";
import { tanstackStart } from "@tanstack/react-start/plugin/vite";
import viteReact from "@vitejs/plugin-react";

// Renders /sitemap.xml once, after the whole app is built, into the static
// client output. Cloudflare serves a matching static asset before the Worker,
// so Google gets a plain file (Search Console failed to fetch the
// Worker-rendered sitemap, but read a static one straight away). The route in
// src/routes/sitemap[.]xml.ts stays the single source of the content.
function staticSitemap(): Plugin {
  return {
    name: "yuno:static-sitemap",
    apply: "build",
    buildApp: {
      order: "post",
      async handler(builder) {
        const root = builder.config.root;
        const clientOut = resolve(root, builder.environments.client.config.build.outDir);
        const serverOut = resolve(root, builder.environments.ssr.config.build.outDir);
        const server = await import(pathToFileURL(resolve(serverOut, "server.js")).href);
        const res: Response = await server.default.fetch(
          new Request("https://landing.yunoapp.eu/sitemap.xml"),
          {},
          {},
        );
        const xml = await res.text();
        if (!res.ok || !xml.startsWith("<?xml") || !xml.includes("<urlset")) {
          throw new Error(`static sitemap: /sitemap.xml returned ${res.status}`);
        }
        // Same file under a second, never-failed name: Search Console kept
        // /sitemap.xml stuck at "couldn't fetch" even once it was fixed, while
        // a freshly named file was read at once. Submit sitemap-pages.xml there.
        for (const name of ["sitemap.xml", "sitemap-pages.xml"]) {
          await writeFile(resolve(clientOut, name), xml);
        }
        builder.config.logger.info(`static sitemap: ${xml.match(/<url>/g)?.length ?? 0} URLs`);
      },
    },
  };
}

// Standard TanStack Start + React + Tailwind v4 setup.
// - tsConfigPaths wires the "@/*" alias from tsconfig.json.
// - VITE_* vars in .env are exposed via import.meta.env automatically by Vite.
// - tanstackStart redirects the bundled server entry to src/server.ts (our SSR
//   error wrapper); src/start.ts is picked up as the start entry by convention.
export default defineConfig({
  plugins: [
    tsConfigPaths(),
    tailwindcss(),
    tanstackStart({
      server: { entry: "server" },
    }),
    viteReact(),
    staticSitemap(),
  ],
  // Keep a single copy of React/TanStack across client and SSR bundles to avoid
  // duplicate-instance hydration and hook errors.
  resolve: {
    dedupe: ["react", "react-dom", "@tanstack/react-router", "@tanstack/react-query"],
  },
});
