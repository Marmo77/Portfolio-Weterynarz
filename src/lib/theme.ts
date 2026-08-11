import { site } from "../data/site";

/**
 * Wstrzykuje kolory/fonty/radius z `site.ts` jako CSS custom properties na
 * <html>. Dzięki temu cały motyw (Tailwind tokeny: primary, background, dark…)
 * bierze wartości z jednego źródła prawdy i da się go przestawić pod klienta
 * edytując wyłącznie `site.theme`.
 *
 * Wołane w `main.tsx` PRZED renderem, więc nadpisuje domyślne wartości z
 * `index.css` zanim cokolwiek się wyświetli (brak migotania / FOUC).
 */
export function applyTheme(theme: typeof site.theme = site.theme) {
  const root = document.documentElement;
  const { colors, fonts, radius } = theme;

  const vars: Record<string, string> = {
    "--primary": colors.primary,
    "--primary-foreground": colors.primaryForeground,
    "--background": colors.background,
    "--foreground": colors.foreground,
    "--dark": colors.dark,
    "--dark-surface": colors.darkSurface,
    "--dark-foreground": colors.darkForeground,
    // pierścień focus oraz meta theme-color sterowane brand-kolorem
    "--ring": colors.primary,
    "--radius": radius,
    // uwaga: nazwy inne niż tokeny Tailwind (--font-sans/--font-display),
    // które w index.css wskazują na te zmienne przez var()
    "--font-family-display": fonts.display,
    "--font-family-sans": fonts.sans,
  };

  for (const [key, value] of Object.entries(vars)) {
    root.style.setProperty(key, value);
  }

  // Zsynchronizuj kolor paska przeglądarki (mobile) z kolorem marki.
  const meta = document.querySelector('meta[name="theme-color"]');
  if (meta) meta.setAttribute("content", colors.primary);
}
