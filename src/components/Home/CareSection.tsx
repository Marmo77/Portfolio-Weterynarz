import type { LucideIcon } from "lucide-react";
import { Activity, Siren, Scissors, PhoneCall, Clock } from "lucide-react";
import { site } from "../../data/site";

/**
 * Ikony kart, wybierane nazwą w `site.care.items[].icon` — ten sam wzorzec
 * zamkniętej mapy co STORY_ICONS w StorySection.tsx.
 */
const CARE_ICONS: Record<string, LucideIcon> = {
  Activity,
  Siren,
  Scissors,
  PhoneCall,
  Clock,
};

/**
 * Sekcja „Zakres opieki" — bento z 5 kart: jedna opisowa (lead), jedna
 * akcentowa kolorem marki (accent), trzy zwykłe. Wypełnia lukę między
 * StorySection (jacy jesteśmy) a OfferSection (cennik) — mówi konkretnie,
 * czym gabinet realnie dysponuje, zamiast suchej listy słów kluczowych.
 */
const CareSection = () => {
  const { care } = site;

  return (
    <section id="care" className="py-24 md:py-32 px-4 bg-muted/40">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-primary text-xs font-semibold tracking-[0.2em] uppercase">
            {care.eyebrow}
          </span>
          <h2 className="mt-3 text-4xl md:text-5xl font-display font-semibold text-foreground leading-[1.05] tracking-tight">
            {care.heading}
          </h2>
          <p className="mt-5 text-base md:text-lg text-muted-foreground font-light leading-relaxed">
            {care.subtitle}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {care.items.map((item) => {
            const Icon = CARE_ICONS[item.icon] ?? Activity;
            const isLead = item.variant === "lead";
            const isAccent = item.variant === "accent";

            return (
              <div
                key={item.title}
                className={
                  isLead
                    ? "group md:col-span-2 rounded-[2rem] bg-card border border-border p-8 md:p-10 flex flex-col justify-center transition-all duration-300 hover:-translate-y-1.5 hover:shadow-xl hover:border-primary/30"
                    : isAccent
                      ? "group rounded-[2rem] bg-primary text-primary-foreground p-8 md:p-10 flex flex-col justify-center transition-all duration-300 hover:-translate-y-1.5 hover:shadow-xl hover:shadow-primary/30"
                      : "group rounded-[2rem] bg-card border border-border p-8 flex flex-col justify-center transition-all duration-300 hover:-translate-y-1.5 hover:shadow-xl hover:border-primary/30"
                }
              >
                <Icon
                  className={
                    isAccent
                      ? "w-8 h-8 mb-4 transition-transform duration-300 group-hover:scale-110"
                      : "w-7 h-7 mb-4 text-primary transition-transform duration-300 group-hover:scale-110"
                  }
                  strokeWidth={1.5}
                />
                <h3
                  className={
                    isAccent
                      ? "font-display text-xl mb-2"
                      : "font-display text-xl text-foreground mb-2 transition-colors duration-300 group-hover:text-primary"
                  }
                >
                  {item.title}
                </h3>
                <p
                  className={
                    isAccent
                      ? "text-primary-foreground/85 font-light leading-relaxed"
                      : "text-muted-foreground font-light leading-relaxed"
                  }
                >
                  {item.text}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default CareSection;
