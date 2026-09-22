import { Navbar } from "@/components/landing/Navbar";
import { Hero } from "@/components/landing/Hero";
import { CategoryCards } from "@/components/landing/CategoryCards";
import { LoginCard } from "@/components/login/LoginCard";

/** Standalone sign-in screen: landing hero in the background, glass card on top */
export const LoginPage = () => {
  return (
    <div className="relative h-svh min-h-[820px] overflow-hidden bg-cocoa font-figtree">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-[1100px] bg-[radial-gradient(ellipse_55%_45%_at_50%_42%,#8a2122_0%,rgba(122,32,33,0.6)_45%,transparent_100%)]"
      />

      {/* background scene (not interactive) */}
      <div aria-hidden className="pointer-events-none relative select-none">
        <Navbar />
        <Hero />
        <CategoryCards />
      </div>

      <main className="absolute inset-x-0 top-[clamp(9rem,19.5vw,17.5rem)] flex justify-center px-4">
        <LoginCard />
      </main>
    </div>
  );
};
