import path from "path";
import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import { defineConfig, type Plugin } from "vite";

import { site } from "./src/data/site";

/**
 * Wstrzykuje tytuł, opis, język i adres Google Fonts do index.html na
 * podstawie src/data/site.ts. Dzięki temu tytuł zakładki jest poprawny już
 * przed zamontowaniem Reacta, a kroje pisma zmienia się w jednym miejscu.
 */
function siteMeta(): Plugin {
  return {
    name: "site-meta",
    transformIndexHtml(html) {
      return html
        .replaceAll("%SITE_TITLE%", site.seo.title)
        .replaceAll("%SITE_DESCRIPTION%", site.seo.description)
        .replaceAll("%SITE_LANG%", site.seo.lang)
        .replaceAll("%SITE_FONTS%", site.theme.fontsUrl);
    },
  };
}

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss(), siteMeta()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
});
