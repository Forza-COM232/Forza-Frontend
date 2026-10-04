import { AboutSection } from "./AboutSection";
import { CategoryCards } from "./CategoryCards";
import { Footer } from "./Footer";
import { Hero } from "./Hero";
import { Navbar } from "./Navbar";

export const LandingPage = () => {
  return (
    <div className="relative min-h-svh overflow-hidden bg-cocoa font-figtree">
      {/* red glow behind the hero */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-[1100px] bg-[radial-gradient(ellipse_55%_45%_at_50%_42%,#8a2122_0%,rgba(122,32,33,0.6)_45%,transparent_100%)]"
      />
      <div className="relative">
        <Navbar />
        <main>
          <Hero />
          <CategoryCards />
          <AboutSection />
        </main>
        <Footer />
      </div>
    </div>
  );
};
