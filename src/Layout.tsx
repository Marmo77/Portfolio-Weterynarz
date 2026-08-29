import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Navbar from "./components/Layout/Navbar";
import Footer from "./components/Layout/Footer";
import { Analytics } from "@vercel/analytics/react";
import { DemoBar, demoBar } from "./components/Home/DemoBar";
import { cn } from "./lib/utils";
interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleNavigation = (id: string) => {
    // If not on home page, go there first
    if (location.pathname !== "/") {
      navigate("/");
      setTimeout(() => {
        const element = document.getElementById(id);
        if (element) {
          element.scrollIntoView({ behavior: "smooth" });
        }
      }, 100);
    } else {
      const element = document.getElementById(id);
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    }
    setMobileMenuOpen(false);
  };

  // Tylko strona główna ma ciemne zdjęcie Hero pod navbarem — na każdej innej
  // trasie (np. /galeria) tło jest jasne od samego góry, więc navbar musi być
  // od razu w "aktywnym" (nieprzezroczystym) stanie, inaczej biały tekst
  // znika na jasnym tle.
  const forceActiveNavbar = location.pathname !== "/";

  return (
    // pb-14 rezerwuje miejsce pod DemoBar, który jest `fixed bottom-0`
    // — bez tego pasek trwale zasłania dół stopki. Warunkowe: gdy
    // `demoBar.enabled` jest false, ten sam odstęp zostawał pusty i było
    // widać jasny pasek `bg-background` pod stopką — bez paska nie ma
    // czego zasłaniać, więc nie rezerwujemy miejsca.
    <div
      className={cn(
        "min-h-screen bg-background text-foreground font-sans selection:bg-primary selection:text-primary-foreground",
        demoBar.enabled && "pb-14",
      )}
    >
      <Navbar
        isScrolled={isScrolled || forceActiveNavbar}
        mobileMenuOpen={mobileMenuOpen}
        setMobileMenuOpen={setMobileMenuOpen}
        handleNavigation={handleNavigation}
      />
      <Analytics />

      {/* Content */}
      <div className="pt-0">{children}</div>
      <DemoBar />
      <Footer handleNavigation={handleNavigation} />
    </div>
  );
};

export default Layout;
