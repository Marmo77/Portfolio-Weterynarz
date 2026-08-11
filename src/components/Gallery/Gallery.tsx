import React, { useEffect, useMemo, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { VisuallyHidden } from "radix-ui";
import { site } from "../../data/site";
import { Dialog, DialogContent, DialogTitle } from "../ui/dialog";

/** "all" albo `id` kategorii z `site.gallery.categories`. */
type Filter = string;

const Gallery: React.FC = () => {
  const { gallery } = site;
  const [filter, setFilter] = useState<Filter>("all");
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  useEffect(() => {
    document.title = `${gallery.heading} — ${site.brand.name}`;
  }, [gallery.heading]);

  const photos = useMemo(
    () =>
      filter === "all"
        ? gallery.photos
        : gallery.photos.filter((p) => p.category === filter),
    [filter, gallery.photos],
  );

  // Zamknięcie lightboxa po zmianie filtra, by nie odwoływać się do nieistniejącego indeksu.
  useEffect(() => setActiveIndex(null), [filter]);

  const showPrev = () =>
    setActiveIndex((i) => (i === null ? null : (i - 1 + photos.length) % photos.length));
  const showNext = () =>
    setActiveIndex((i) => (i === null ? null : (i + 1) % photos.length));

  return (
    <section className="pt-32 md:pt-40 pb-24 px-4">
      <div className="container mx-auto max-w-6xl">
        {/* Nagłówek */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-primary font-bold tracking-widest uppercase text-sm mb-3 block">
            {gallery.eyebrow}
          </span>
          <h1 className="text-5xl md:text-7xl font-display font-bold text-foreground leading-[0.95] mb-5">
            {gallery.heading}
          </h1>
          <p className="text-muted-foreground text-lg font-light">
            {gallery.subtitle}
          </p>
        </div>

        {/* Filtry kategorii — lista pochodzi z site.gallery.categories,
            więc każda branża definiuje własny podział zdjęć. */}
        <div className="flex justify-center mb-10">
          <div className="inline-flex flex-wrap justify-center gap-2.5">
            {(
              [
                ["all", gallery.allLabel],
                ...gallery.categories.map((c) => [c.id, c.label]),
              ] as [Filter, string][]
            ).map(([key, label]) => (
              <button
                key={key}
                type="button"
                onClick={() => setFilter(key)}
                className={
                  "rounded-full border px-5 py-2.5 text-base font-display tracking-wide whitespace-nowrap cursor-pointer transition-colors duration-300 " +
                  (filter === key
                    ? "bg-primary text-primary-foreground border-primary shadow-md"
                    : "bg-card/60 border-border text-muted-foreground hover:text-foreground hover:border-foreground/30")
                }
              >
                {label}
              </button>
            ))}
          </div>
        </div>

        {/* Siatka masonry */}
        <div className="columns-2 sm:columns-3 lg:columns-4 gap-4 [column-fill:_balance]">
          {photos.map((photo, i) => (
            <button
              key={photo.src}
              type="button"
              onClick={() => setActiveIndex(i)}
              className="group mb-4 block w-full break-inside-avoid overflow-hidden rounded-2xl cursor-zoom-in"
            >
              <img
                src={photo.src}
                alt={photo.alt}
                loading="lazy"
                className="w-full h-auto object-cover transition-transform duration-500 group-hover:scale-105"
              />
            </button>
          ))}
        </div>
      </div>

      {/* Lightbox */}
      <Dialog
        open={activeIndex !== null}
        onOpenChange={(open) => !open && setActiveIndex(null)}
      >
        <DialogContent className="max-w-[95vw] w-full h-fit bg-transparent shadow-none border-none p-0 flex items-center justify-center overflow-hidden">
          <VisuallyHidden.Root asChild>
            <DialogTitle>
              {activeIndex !== null ? photos[activeIndex].alt : "Podgląd zdjęcia"}
            </DialogTitle>
          </VisuallyHidden.Root>
          {activeIndex !== null && (
            <div className="relative w-full flex items-center justify-center">
              <img
                src={photos[activeIndex].src}
                alt={photos[activeIndex].alt}
                className="max-h-[85vh] max-w-full object-contain rounded-lg shadow-2xl"
              />
              {photos.length > 1 && (
                <>
                  <button
                    type="button"
                    onClick={showPrev}
                    aria-label="Poprzednie zdjęcie"
                    className="absolute left-2 md:left-4 top-1/2 -translate-y-1/2 p-2 rounded-full bg-black/50 text-white hover:bg-black/70 transition-colors"
                  >
                    <ChevronLeft className="w-6 h-6" />
                  </button>
                  <button
                    type="button"
                    onClick={showNext}
                    aria-label="Następne zdjęcie"
                    className="absolute right-2 md:right-4 top-1/2 -translate-y-1/2 p-2 rounded-full bg-black/50 text-white hover:bg-black/70 transition-colors"
                  >
                    <ChevronRight className="w-6 h-6" />
                  </button>
                </>
              )}
            </div>
          )}
        </DialogContent>
      </Dialog>
    </section>
  );
};

export default Gallery;
