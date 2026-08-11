import React, { useEffect, useLayoutEffect, useRef, useState } from "react";
import { site } from "../../data/site";
import type { ServiceItem } from "../../data/site";

/**
 * Cena usługi. Trzy warianty, w tej kolejności:
 *   1. `priceNote`  → tekst zamiast liczby ("wycena indywidualna")
 *   2. `price`      → liczba, opcjonalnie z prefiksem "od" i jednostką
 *   3. brak obu     → nie renderujemy nic
 *
 * Wariant 3 jest normalny i celowy: nie zgadujemy cennika klienta.
 */
const Price: React.FC<{ item: ServiceItem }> = ({ item }) => {
  const { currency, fromLabel } = site.offer;

  if (item.priceNote) {
    return (
      <span className="shrink-0 text-sm md:text-base italic text-muted-foreground whitespace-nowrap">
        {item.priceNote}
      </span>
    );
  }

  if (item.price === undefined) return null;

  return (
    <span className="shrink-0 font-display text-xl md:text-2xl text-foreground tabular-nums whitespace-nowrap">
      {item.priceFrom && (
        <span className="text-muted-foreground text-sm mr-1.5 font-sans">
          {fromLabel}
        </span>
      )}
      {item.price}
      <span className="text-primary/70 text-base ml-1">{currency}</span>
      {item.unit && (
        <span className="text-muted-foreground text-sm ml-1 font-sans">
          {item.unit}
        </span>
      )}
    </span>
  );
};

const ServiceRow: React.FC<{ item: ServiceItem }> = ({ item }) => (
  <li className="group py-5 border-b border-border/60">
    <div className="flex items-baseline gap-3">
      <h4 className="text-xl md:text-2xl font-display tracking-wide text-foreground transition-colors duration-300 group-hover:text-primary">
        {item.name}
      </h4>
      {item.tags?.map((tag) => (
        <span
          key={tag}
          className="text-[10px] font-bold uppercase tracking-widest px-2 py-0.5 rounded-full border border-primary/30 text-primary"
        >
          {tag}
        </span>
      ))}

      {/* Kropki wypełniające — czytelnie wiążą nazwę usługi z ceną */}
      <span
        aria-hidden
        className="flex-1 border-b border-dotted border-border/70 -translate-y-1"
      />

      <Price item={item} />
    </div>

    {item.description && (
      <p className="mt-1.5 text-sm md:text-base text-muted-foreground leading-relaxed max-w-md">
        {item.description}
      </p>
    )}
  </li>
);

const OfferSection: React.FC = () => {
  const { offer } = site;
  const [active, setActive] = useState(offer.categories[0]?.id);
  const navRef = useRef<HTMLDivElement>(null);
  const stickyBarRef = useRef<HTMLDivElement>(null);
  const sectionRefs = useRef<Record<string, HTMLElement | null>>({});

  // Publikuje wysokość przyklejonego paska kategorii jako zmienną CSS (na
  // :root, żeby sekcje — jego rodzeństwo w DOM — też mogły ją odczytać) —
  // sekcje wiedzą wtedy ile miejsca zostawić przy skoku (scroll-margin-top).
  useLayoutEffect(() => {
    const el = stickyBarRef.current;
    if (!el) return;
    const setVar = () =>
      document.documentElement.style.setProperty(
        "--offer-bar-h",
        `${el.getBoundingClientRect().height}px`,
      );
    setVar();
    const observer = new ResizeObserver(setVar);
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  // Scroll-spy: podświetla kategorię, której sekcja jest aktualnie pod paskiem.
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const inView = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        const id = inView[0]?.target.getAttribute("data-cat");
        if (id) setActive(id);
      },
      // wąskie pasmo detekcji ~40% od góry (pod przyklejonym paskiem)
      { rootMargin: "-40% 0px -55% 0px", threshold: 0 },
    );
    offer.categories.forEach((c) => {
      const el = sectionRefs.current[c.id];
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, [offer.categories]);

  // Utrzymuje aktywny chip wyśrodkowany w przyklejonym pasku (scrolluje tylko pasek).
  useEffect(() => {
    const container = navRef.current;
    const chip = container?.querySelector<HTMLElement>(`[data-cat="${active}"]`);
    if (!container || !chip) return;
    const c = container.getBoundingClientRect();
    const b = chip.getBoundingClientRect();
    container.scrollBy({
      left: b.left + b.width / 2 - (c.left + c.width / 2),
      behavior: "smooth",
    });
  }, [active]);

  const scrollToCategory = (id: string) => {
    // offset względem paska + navbara żyje w inline `scrollMarginTop` sekcji
    sectionRefs.current[id]?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };

  return (
    <section id="offer" className="pt-24 md:pt-32 pb-24 px-4">
      <div className="container mx-auto max-w-6xl">
        {/* Nagłówek */}
        <div className="text-center max-w-2xl mx-auto mb-10">
          <span className="text-primary font-bold tracking-widest uppercase text-sm mb-3 block">
            {offer.eyebrow}
          </span>
          <h2 className="text-5xl md:text-7xl font-display font-bold text-foreground leading-[0.95] mb-5">
            {offer.heading}
          </h2>
          <p className="text-muted-foreground text-lg font-light">
            {offer.subtitle}
          </p>
        </div>

        {/* Przyklejony pasek kategorii (scroll-spy + skok do sekcji) */}
        <div
          ref={stickyBarRef}
          style={{ top: "var(--navbar-h, 4rem)" }}
          className="sticky z-30 -mx-4 px-4 py-3 mb-4 bg-background/85 backdrop-blur-md border-b border-border/60"
        >
          <div className="relative">
            <div
              ref={navRef}
              className="no-scrollbar overflow-x-auto md:overflow-visible"
            >
              <div className="flex w-max md:w-full flex-nowrap md:flex-wrap justify-start md:justify-center gap-2.5">
                {offer.categories.map((category) => (
                  <button
                    key={category.id}
                    type="button"
                    data-cat={category.id}
                    aria-current={active === category.id}
                    onClick={() => scrollToCategory(category.id)}
                    className={
                      "shrink-0 rounded-full border px-5 py-2.5 text-base md:text-lg font-display tracking-wide whitespace-nowrap cursor-pointer transition-colors duration-300 " +
                      (active === category.id
                        ? "bg-primary text-primary-foreground border-primary shadow-md"
                        : "bg-card/60 border-border text-muted-foreground hover:text-foreground hover:border-foreground/30")
                    }
                  >
                    {category.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Maski krawędzi — sygnalizują przewijanie (tylko mobile) */}
            <div className="pointer-events-none absolute inset-y-0 left-0 w-8 bg-gradient-to-r from-background to-transparent md:hidden" />
            <div className="pointer-events-none absolute inset-y-0 right-0 w-8 bg-gradient-to-l from-background to-transparent md:hidden" />
          </div>
        </div>

        {/* Wszystkie kategorie w jednym przewijaniu */}
        <div className="mt-10 space-y-16">
          {offer.categories.map((category) => (
            <section
              key={category.id}
              data-cat={category.id}
              ref={(el) => {
                sectionRefs.current[category.id] = el;
              }}
              style={{
                scrollMarginTop:
                  "calc(var(--navbar-h, 4rem) + var(--offer-bar-h, 4.5rem) + 12px)",
              }}
            >
              <div className="flex items-baseline gap-4 mb-1">
                <h3 className="text-3xl md:text-4xl font-display font-bold text-foreground">
                  {category.label}
                </h3>
                <span className="flex-1 border-b border-border/50" aria-hidden />
              </div>
              {category.note && (
                <p className="text-xs md:text-sm text-muted-foreground/70 uppercase tracking-wider mb-4">
                  {category.note}
                </p>
              )}
              <ul className="grid md:grid-cols-2 md:gap-x-14 border-t border-border/60 mt-4">
                {category.items.map((item) => (
                  <ServiceRow key={item.name} item={item} />
                ))}
              </ul>
            </section>
          ))}
        </div>
      </div>
    </section>
  );
};

export default OfferSection;
