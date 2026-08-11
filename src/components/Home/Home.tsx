import React from "react";
import Hero from "./Hero";
import InfoSection from "./InfoSection";
import StorySection from "./StorySection";
import OfferSection from "./OfferSection";
import FAQ from "./FAQ";
import Contact from "./Contact";

const Home: React.FC = () => {
  return (
    <main className="flex flex-col w-full min-h-screen">
      <Hero />
      <InfoSection />
      <StorySection />
      <OfferSection />
      <FAQ />
      <Contact />
    </main>
  );
};

export default Home;
