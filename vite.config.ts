import { defineConfig } from "vite";
import tsConfigPaths from "vite-tsconfig-paths";
import tailwindcss from "@tailwindcss/vite";
import { tanstackStart } from "@tanstack/react-start/plugin/vite";
import viteReact from "@vitejs/plugin-react";

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
  ],
  // Keep a single copy of React/TanStack across client and SSR bundles to avoid
  // duplicate-instance hydration and hook errors.
  resolve: {
    dedupe: ["react", "react-dom", "@tanstack/react-router", "@tanstack/react-query"],
  },
});
