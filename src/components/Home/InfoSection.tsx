import { Button } from "../ui/button";
import { Clock, MapPin, Phone, ArrowUpRight, Mail } from "lucide-react";
import { site } from "../../data/site";

/**
 * Adres, godziny, kontakt — trzy kolumny rozdzielone włosowymi liniami.
 *
 * Sekcja jest jasna celowo. Ciemne tło zostawiamy dla `Contact` i stopki:
 * jeden ciemny blok na końcu strony czyta się jak akcent, trzy rozrzucone po
 * całej stronie — jak brak decyzji. Bez poświat i cieni; robotę robią odstęp
 * i typografia.
 */
const InfoSection = () => {
  const { info } = site;
  return (
    <section
      className="bg-background border-t border-border/60 relative"
      id="about"
    >
      <div className="container mx-auto px-4 max-w-6xl relative z-10 pt-24 md:pt-28 pb-16">
        <div className="max-w-2xl mb-14">
          <h2 className="text-xs font-semibold text-primary tracking-[0.2em] uppercase mb-3">
            {info.eyebrow}
          </h2>
          <h3 className="text-4xl md:text-5xl font-display font-semibold text-foreground tracking-tight">
            {info.heading}
          </h3>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 border-t border-border/60">
          {/* Kolumna 1: adres */}
          <div className="group relative overflow-hidden lg:border-r border-b lg:border-b-0 border-border/60 py-10 lg:pl-6 lg:pr-10 flex flex-col">
            {/* Kreska wjeżdżająca po najechaniu — jedyny efekt hover; bez podbicia tła,
                żeby jasna sekcja nie migała plamą koloru */}
            <span
              aria-hidden
              className="absolute top-0 left-0 w-full h-0.5 bg-primary scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"
            />
            <MapPin
              className="w-5 h-5 text-primary mb-6 transition-transform duration-500 group-hover:-translate-y-0.5 group-hover:scale-110"
              strokeWidth={1.5}
              aria-hidden
            />
            <h4 className="text-[11px] font-semibold uppercase tracking-[0.18em] text-muted-foreground mb-4">
              {info.addressTitle}
            </h4>
            <div className="space-y-0.5 mb-8">
              <p className="text-foreground text-xl font-display">
                {site.contact.address.street}
              </p>
              <p className="text-muted-foreground font-light">
                {site.contact.address.zip} {site.contact.address.city}
              </p>
            </div>
            <Button
              variant="outline"
              className="mt-auto self-start gap-2 border-border hover:bg-muted rounded-full text-xs uppercase tracking-widest h-11 px-6"
              onClick={() =>
                window.open(`${site.contact.address.googleMapsUrl}`, "_blank")
              }
            >
              {info.addressCta} <ArrowUpRight className="ml-1 w-3 h-3" />
            </Button>
          </div>

          {/* Kolumna 2: godziny */}
          <div className="group relative overflow-hidden lg:border-r border-b lg:border-b-0 border-border/60 py-10 lg:px-10 flex flex-col">
            <span
              aria-hidden
              className="absolute top-0 left-0 w-full h-0.5 bg-primary scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-center"
            />
            <Clock
              className="w-5 h-5 text-primary mb-6 transition-transform duration-500 group-hover:-translate-y-0.5 group-hover:scale-110"
              strokeWidth={1.5}
              aria-hidden
            />
            <h4 className="text-[11px] font-semibold uppercase tracking-[0.18em] text-muted-foreground mb-4">
              {info.hoursTitle}
            </h4>
            <div className="w-full space-y-2.5">
              {site.hours.display.map((item, index) => (
                <div
                  key={index}
                  className="flex justify-between items-baseline gap-4 text-sm"
                >
                  <span className="text-muted-foreground font-light">
                    {item.day}
                  </span>
                  <span
                    aria-hidden
                    className="flex-1 border-b border-dotted border-border/70 -translate-y-1"
                  />
                  <span
                    className={
                      (item.hours as string) === site.hours.closedLabel
                        ? "text-muted-foreground/60 tabular-nums"
                        : "text-foreground tabular-nums"
                    }
                  >
                    {item.hours}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Kolumna 3: kontakt */}
          <div className="group relative overflow-hidden py-10 lg:pl-10 lg:pr-6 flex flex-col">
            <span
              aria-hidden
              className="absolute top-0 right-0 w-full h-0.5 bg-primary scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-right"
            />
            <Phone
              className="w-5 h-5 text-primary mb-6 transition-transform duration-500 group-hover:-translate-y-0.5 group-hover:scale-110"
              strokeWidth={1.5}
              aria-hidden
            />
            <h4 className="text-[11px] font-semibold uppercase tracking-[0.18em] text-muted-foreground mb-4">
              {info.contactTitle}
            </h4>
            <div className="space-y-5 mb-8">
              <div>
                <p className="text-[11px] uppercase tracking-widest text-muted-foreground/70 mb-1">
                  {info.phoneLabel}
                </p>
                <a
                  href={`tel:${site.contact.phone.replace(/\s/g, "")}`}
                  className="text-2xl font-display text-foreground hover:text-primary transition-colors block"
                >
                  {site.contact.phone}
                </a>
              </div>
              <div>
                <p className="text-[11px] uppercase tracking-widest text-muted-foreground/70 mb-1">
                  {info.emailLabel}
                </p>
                <a
                  href={`mailto:${site.contact.email}`}
                  className="text-base text-muted-foreground hover:text-foreground transition-colors block"
                >
                  {site.contact.email}
                </a>
              </div>
            </div>
            <Button
              className="mt-auto self-start bg-primary text-primary-foreground hover:bg-primary/90 rounded-full text-xs uppercase tracking-widest h-11 px-7 shadow-none"
              onClick={() =>
                document
                  .getElementById("contact")
                  ?.scrollIntoView({ behavior: "smooth" })
              }
            >
              {info.contactCta}
            </Button>
          </div>
        </div>

        {/* Pasek z jedną wyróżnioną informacją (hak sprzedażowy) */}
        <div className="mt-14 pt-8 border-t border-border/60 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h5 className="text-foreground text-lg font-display tracking-wide mb-1">
              {info.banner.title}
            </h5>
            <p className="text-muted-foreground text-sm font-light">
              {info.banner.text}
            </p>
          </div>
          <a
            href={`mailto:${site.contact.email}`}
            className="text-primary text-sm font-medium hover:text-foreground transition-colors flex items-center shrink-0"
          >
            <Mail className="w-4 h-4 mr-2" strokeWidth={1.5} />
            {info.banner.cta}
          </a>
        </div>
      </div>
    </section>
  );
};

export default InfoSection;
