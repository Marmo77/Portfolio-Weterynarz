import { Button } from "../ui/button";
import {
  ArrowRight,
  Baby,
  CalendarCheck,
  Car,
  Flower2,
  HeartPulse,
  Scissors,
  Sparkles,
  Stethoscope,
  Wrench,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { site } from "../../data/site";

/**
 * Ikona przycisku głównego, wybierana nazwą w `site.hero.icon`.
 *
 * Trzymamy zamkniętą mapę zamiast dynamicznego importu z `lucide-react`,
 * bo dzięki temu bundler dociąga tylko te kilka ikon, a literówka w
 * `site.ts` degraduje się do wartości domyślnej zamiast wywalać build.
 */
const HERO_ICONS: Record<string, LucideIcon> = {
  CalendarCheck, // domyślna — pasuje do każdej usługi „na termin"
  Stethoscope, // weterynarz, gabinet lekarski
  HeartPulse, // fizjoterapia, rehabilitacja
  Scissors, // fryzjer, barber
  Sparkles, // salon kosmetyczny
  Wrench, // warsztat, instalacje
  Car, // wulkanizacja, myjnia
  Flower2, // kwiaciarnia
  Baby, // żłobek, przedszkole
};

const Hero = () => {
  const { titleLines, subtitle, subtitleAccent, ctaPrimary, ctaSecondary } =
    site.hero;
  const Icon = HERO_ICONS[site.hero.icon] ?? CalendarCheck;

  const scrollTo = (id: string) =>
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });

  return (
    <section
      id="start"
      className="relative min-h-[88vh] flex items-center justify-center overflow-hidden bg-background"
    >
      {/* Zdjęcie tła */}
      <div
        className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url('${site.hero.backgroundImage}')` }}
      />
      {/*
        Przyciemnienie pod tekst. Gradient zamiast płaskiej płachty — czytelność
        bierzemy tam, gdzie stoi tekst (dół i lewa), a nie kosztem całego zdjęcia.
        Bez blura: rozmyte tło wygląda jak zasłonięty błąd, nie jak decyzja.
      */}
      <div className="absolute inset-0 z-0 bg-gradient-to-t from-black/70 via-black/35 to-black/25" />

      <div className="container relative z-10 px-4 pt-16 max-w-5xl">
        <h1 className="text-5xl md:text-7xl font-display font-semibold tracking-tight text-white leading-[1.02] animate-in fade-in slide-in-from-bottom-4 duration-700">
          {titleLines.slice(0, -1).map((line, i) => (
            <span key={i}>
              {line} <br />
            </span>
          ))}
          <span className="text-white/70 font-light">
            {titleLines[titleLines.length - 1]}
          </span>
        </h1>

        {/* Kreska w kolorze marki zamiast poświaty — jeden akcent wystarczy */}
        <span
          aria-hidden
          className="block w-16 h-px bg-primary mt-8 mb-7 animate-in fade-in duration-700 delay-200"
        />

        <p className="max-w-xl text-base md:text-xl text-white/80 mb-10 font-light leading-relaxed animate-in fade-in slide-in-from-bottom-4 duration-700 delay-200">
          {subtitle}
          <span className="text-white block mt-1.5">{subtitleAccent}</span>
        </p>

        <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 items-stretch sm:items-center animate-in fade-in slide-in-from-bottom-4 duration-700 delay-300">
          <Button
            size="lg"
            className="h-15 px-10 text-lg font-display tracking-wide rounded-full bg-primary text-primary-foreground hover:bg-primary/90 shadow-none transition-colors border-none"
            onClick={() => scrollTo(ctaPrimary.targetId)}
          >
            <Icon className="mr-2.5 h-5 w-5" strokeWidth={1.75} />{" "}
            {ctaPrimary.label}
          </Button>
          <Button
            variant="outline"
            size="lg"
            className="group h-15 px-9 text-lg font-display tracking-wide rounded-full bg-transparent hover:bg-white/10 border border-white/40 text-white hover:border-white hover:text-white transition-colors"
            onClick={() => scrollTo(ctaSecondary.targetId)}
          >
            {ctaSecondary.label}
            <ArrowRight className="ml-2.5 h-5 w-5 transition-transform group-hover:translate-x-0.5" />
          </Button>
        </div>
      </div>
    </section>
  );
};

export default Hero;
