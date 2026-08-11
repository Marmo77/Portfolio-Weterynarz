import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../ui/accordion";
import { site } from "../../data/site";

/**
 * FAQ na jasnym tle — lista rozdzielona włosowymi liniami, bez kart i ramek.
 * Ciemne tło zostaje przy `Contact` (patrz komentarz w InfoSection.tsx).
 */
const FAQ = () => {
  const { faq } = site;
  return (
    <section className="py-24 md:py-28 px-4 bg-background border-t border-border/60">
      <div className="container mx-auto max-w-5xl">
        <div className="grid md:grid-cols-[1fr_1.6fr] gap-10 md:gap-16">
          {/* Nagłówek zostaje z boku — na desktopie stoi obok pytań */}
          <div className="md:sticky md:top-28 md:self-start">
            <span className="text-primary text-xs font-semibold tracking-[0.2em] uppercase">
              {faq.eyebrow}
            </span>
            <h2 className="mt-3 text-4xl md:text-5xl font-display font-semibold text-foreground tracking-tight">
              {faq.heading}
            </h2>
            <p className="mt-4 text-muted-foreground font-light leading-relaxed">
              {faq.subtitle}
            </p>
          </div>

          <Accordion
            type="single"
            collapsible
            className="w-full border-t border-border/60"
          >
            {faq.items.map((item, index) => (
              <AccordionItem
                key={index}
                value={`item-${index}`}
                className="border-b border-border/60"
              >
                <AccordionTrigger className="text-foreground hover:text-primary hover:no-underline font-display tracking-wide text-lg text-left py-6">
                  {item.question}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground text-base font-light leading-relaxed pb-6 pr-6">
                  {item.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  );
};

export default FAQ;
