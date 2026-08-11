/**
 * Tytuł i opis strony — wyliczane wyłącznie z `src/data/site.ts`.
 *
 * To są strony demonstracyjne, więc świadomie NIE generujemy tu JSON-LD,
 * canonical, keywords ani og:image. Jedyne, co ma znaczenie, to tytuł
 * widoczny w zakładce przeglądarki.
 */
import { site } from "../data/site";

export const getPageSEO = (title?: string, description?: string) => ({
  title: title
    ? site.seo.titleTemplate.replace("%s", title)
    : site.seo.title,
  description: description || site.seo.description,
});
