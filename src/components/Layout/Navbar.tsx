import React, { useLayoutEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { Menu, X, Phone } from "lucide-react";
import { Button } from "../ui/button";
import { cn } from "../../lib/utils";
import { site } from "../../data/site";

interface NavbarProps {
  isScrolled: boolean;
  mobileMenuOpen: boolean;
  setMobileMenuOpen: (open: boolean) => void;
  handleNavigation: (id: string) => void;
}

const Navbar: React.FC<NavbarProps> = ({
  isScrolled,
  mobileMenuOpen,
  setMobileMenuOpen,
  handleNavigation,
}) => {
  const headerRef = useRef<HTMLElement>(null);

  // Publikuje rzeczywistą wysokość navbara jako zmienną CSS, żeby elementy
  // "sticky" (np. pasek kategorii menu) mogły się pod nią chować bez
  // zgadywania liczby pikseli — działa niezależnie od stanu scrolled/mobile.
  useLayoutEffect(() => {
    const el = headerRef.current;
    if (!el) return;
    const setVar = () =>
      document.documentElement.style.setProperty(
        "--navbar-h",
        `${el.getBoundingClientRect().height}px`,
      );
    setVar();
    const observer = new ResizeObserver(setVar);
    observer.observe(el);
    // Header ma animowany (transition-all) padding przy zmianie isScrolled —
    // ResizeObserver łapie wartość w trakcie animacji, więc domiaruj po jej
    // zakończeniu, by --navbar-h zawsze trafiał w finalną wysokość.
    el.addEventListener("transitionend", setVar);
    return () => {
      observer.disconnect();
      el.removeEventListener("transitionend", setVar);
    };
  }, [isScrolled]);

  return (
    <header
      ref={headerRef}
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        isScrolled
          ? "bg-background/90 backdrop-blur-md border-b border-border/60 py-3 text-foreground"
          : "bg-transparent py-6 text-white",
      )}
    >
      <div className="container mx-auto px-6 max-w-7xl flex justify-between items-center">
        <Link
          to="/"
          className="flex items-center space-x-3 group"
          onClick={() => handleNavigation("start")}
        >
          <div
            className={cn(
              "p-1.5 rounded-xl transition-colors duration-300",
              isScrolled
                ? "bg-primary/10 text-primary"
                : "bg-white/10 text-primary border border-white/20",
            )}
          >
            <img src={site.brand.logoFull} alt="Logo" className="h-8 w-8" />
          </div>
          <div className="flex flex-col items-start leading-none">
            <span
              className={cn(
                "text-2xl font-display font-semibold tracking-wide transition-colors",
                isScrolled ? "text-foreground" : "text-white",
              )}
            >
              {site.brand.name}
            </span>
            <span className="text-[0.65rem] font-semibold tracking-[0.2em] text-primary uppercase w-full text-left mt-0.5">
              {site.brand.nameSuffix}
            </span>
          </div>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center space-x-10">
          {site.nav.map((item) => {
            const linkClass = cn(
              "text-base font-normal transition-colors hover:text-primary bg-transparent border-none cursor-pointer",
              isScrolled
                ? "text-foreground/70"
                : "text-white/90 hover:text-white",
            );
            return item.path ? (
              <Link key={item.label} to={item.path} className={linkClass}>
                {item.label}
              </Link>
            ) : (
              <button
                key={item.label}
                onClick={() => handleNavigation(item.id!)}
                className={linkClass}
              >
                {item.label}
              </button>
            );
          })}

          {/* Przycisk akcji — etykieta z site.ts, po hoverze numer telefonu */}
          <Button
            onClick={() => handleNavigation(site.navCta.targetId)}
            className={cn(
              "group relative overflow-hidden rounded-full h-auto px-7 py-3 text-base font-medium shadow-none transition-colors duration-300 w-[190px]",
              isScrolled
                ? "bg-primary text-primary-foreground hover:bg-primary/90"
                : "bg-white text-foreground hover:bg-white hover:text-black border-transparent",
            )}
          >
            <div className="relative z-10 flex flex-col items-center transition-transform duration-500 group-hover:-translate-y-[150%]">
              <span>{site.navCta.label}</span>
            </div>
            <div className="absolute inset-0 z-10 flex items-center justify-center transition-transform duration-500 translate-y-[150%] group-hover:translate-y-0">
              <Phone className="w-4 h-4 mr-2" />
              <span className="whitespace-nowrap text-base">
                {site.contact.phone}
              </span>
            </div>
          </Button>
        </nav>

        {/* Mobile Toggle */}
        <button
          className={cn(
            "md:hidden p-2 rounded-xl transition-colors",
            isScrolled
              ? "text-foreground hover:bg-muted"
              : "text-white hover:bg-white/10",
          )}
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? (
            <X className="h-7 w-7" strokeWidth={1.5} />
          ) : (
            <Menu className="h-7 w-7" strokeWidth={1.5} />
          )}
        </button>
      </div>

      {/* Mobile Nav */}
      {mobileMenuOpen && (
        <div className="md:hidden absolute top-full left-0 right-0 bg-background border-b border-border/60 p-6 flex flex-col space-y-2 animate-in slide-in-from-top-3 text-foreground">
          {site.nav.map((item) =>
            item.path ? (
              <Link
                key={item.label}
                to={item.path}
                onClick={() => setMobileMenuOpen(false)}
                className="text-lg font-display p-3 hover:bg-muted rounded-xl transition-colors text-left"
              >
                {item.label}
              </Link>
            ) : (
              <button
                key={item.label}
                onClick={() => handleNavigation(item.id!)}
                className="text-lg font-display p-3 hover:bg-muted rounded-xl transition-colors text-left"
              >
                {item.label}
              </button>
            ),
          )}
          <Button
            className="w-full h-13 text-base rounded-full shadow-none mt-2"
            onClick={() => handleNavigation(site.navCta.targetId)}
          >
            {site.navCta.mobileLabel}
          </Button>
        </div>
      )}
    </header>
  );
};

export default Navbar;
