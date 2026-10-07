import { LoginCard } from "@/components/login/LoginCard";

/** Standalone sign-in page: plain maroon gradient, form centered (no landing page behind it) */
export const LoginPage = () => {
  return (
    <main className="relative grid min-h-svh place-items-center overflow-hidden bg-cocoa px-6 py-16 font-figtree">
      {/* soft red glow in the bottom-right corner, as in the design */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_70%_60%_at_100%_100%,#8a1f22_0%,rgba(122,32,33,0.55)_40%,transparent_75%)]"
      />
      <div className="relative w-full">
        <LoginCard />
      </div>
    </main>
  );
};