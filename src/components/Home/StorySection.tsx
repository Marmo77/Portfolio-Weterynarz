import type { LucideIcon } from "lucide-react";
import {
  ArrowRight,
  Award,
  Clock,
  HeartHandshake,
  Leaf,
  PawPrint,
  ShieldCheck,
  Sparkles,
  Users,
} from "lucide-react";
import { site } from "../../data/site";

/**
 * Ikony punktów, wybierane nazwą w `site.story.points[].icon`.
 *
 * Zamknięta mapa (tak samo jak HERO_ICONS w Hero.tsx): bundler dociąga tylko
 * te kilka ikon, a literówka w `site.ts` degraduje się do ikony domyślnej
 * zamiast wywalać build.
 */
const STORY_ICONS: Record<string, LucideIcon> = {
  HeartHandshake, // domyślna — pasuje do każdej usługi „z ludźmi"
  ShieldCheck, // bezpieczeństwo, gwarancja, certyfikat
  Clock, // krótkie terminy, dyżur, dojazd
  PawPrint, // weterynarz, groomer, hotel dla zwierząt
  Sparkles, // kosmetyka, fryzjer
  Leaf, // naturalne preparaty, ekologia
  Award, // doświadczenie, nagrody, staż
  Users, // zespół, rodzinna firma
};

/**
 * Sekcja „o nas" — zdjęcie plus krótka opowieść firmy.
 *
 * Stoi między siatką kontaktową a cennikiem: dwie sekcje z samymi danymi pod
 * rząd czytają się jak formularz, a to jedyne miejsce, gdzie firma mówi
 * własnym głosem. Wyłączana w całości przez `site.story.enabled`.
 */
const StorySection = () => {
  const { story } = site;
  if (!story.enabled) return null;

  const scrollTo = (id: string) =>
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });

  return (
    <section id="story" className="py-24 md:py-32 px-4 bg-background">
      <div className="container mx-auto max-w-6xl">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Zdjęcie */}
          <figure className="relative">
            <div className="overflow-hidden rounded-[2rem] bg-muted">
              <img
                src={story.image.src}
                alt={story.image.alt}
                loading="lazy"
                className="w-full aspect-[4/5] lg:aspect-[4/4.4] object-cover transition-transform duration-[1.2s] ease-out hover:scale-[1.03]"
              />
            </div>
            {/* Delikatna ramka w kolorze marki — przesunięta, bez cienia */}
            <div
              aria-hidden
              className="pointer-events-none absolute -bottom-3 -right-3 -top-3 -left-3 rounded-[2.5rem] border border-primary/15 -z-10"
            />
            {story.caption && (
              <figcaption className="mt-4 text-sm text-muted-foreground font-light">
                {story.caption}
              </figcaption>
            )}
          </figure>

          {/* Tekst */}
          <div>
            <span className="text-primary text-xs font-semibold tracking-[0.2em] uppercase">
              {story.eyebrow}
            </span>
            <h2 className="mt-3 text-4xl md:text-5xl font-display font-semibold text-foreground leading-[1.05] tracking-tight">
              {story.heading}
            </h2>

            <div className="mt-6 space-y-4">
              {story.paragraphs.map((paragraph, i) => (
                <p
                  key={i}
                  className="text-base md:text-lg text-muted-foreground font-light leading-relaxed"
                >
                  {paragraph}
                </p>
              ))}
            </div>

            <ul className="mt-10 space-y-6">
              {story.points.map((point) => {
                const Icon = STORY_ICONS[point.icon] ?? HeartHandshake;
                return (
                  <li key={point.title} className="flex gap-4">
                    <Icon
                      className="w-5 h-5 mt-1 shrink-0 text-primary"
                      strokeWidth={1.5}
                    />
                    <div>
                      <h3 className="font-display text-lg text-foreground tracking-wide">
                        {point.title}
                      </h3>
                      <p className="text-sm md:text-base text-muted-foreground font-light leading-relaxed">
                        {point.text}
                      </p>
                    </div>
                  </li>
                );
              })}
            </ul>

            <button
              type="button"
              onClick={() => scrollTo(story.cta.targetId)}
              className="group mt-10 inline-flex items-center gap-2 text-foreground font-display tracking-wide border-b border-foreground/20 pb-1 hover:border-primary hover:text-primary transition-colors cursor-pointer"
            >
              {story.cta.label}
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default StorySection;
