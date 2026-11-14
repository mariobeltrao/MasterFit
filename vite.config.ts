import { defineConfig, type Plugin } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import { buildStructuredData } from "./src/data/structuredData.ts";

// Writes the schema.org JSON-LD into index.html so crawlers read it without running JS.
const structuredData = (): Plugin => ({
  name: "masterfit-structured-data",
  transformIndexHtml: () => [
    {
      tag: "script",
      attrs: { type: "application/ld+json" },
      children: JSON.stringify(buildStructuredData()).replace(/</g, "\\u003c"),
      injectTo: "head",
    },
  ],
});

export default defineConfig({ plugins: [react(), tailwindcss(), structuredData()] });
