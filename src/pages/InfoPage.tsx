import { useEffect } from "react";
import { Link, Navigate, useParams } from "react-router";
import { ArrowLeft } from "lucide-react";
import { Footer } from "@/components/landing/Footer";
import { Navbar } from "@/components/landing/Navbar";
import { infoPages } from "@/components/landing/data";

/** Simple text page behind the landing footer links (/info/security, /info/system-outages, …) */
export const InfoPage = () => {
  const { slug = "" } = useParams();
  const page = infoPages[slug];

  // footer links open these pages, so start at the top instead of the old scroll position
  useEffect(() => window.scrollTo(0, 0), [slug]);

  if (!page) return <Navigate to="/" replace />;

  return (
    <div className="relative min-h-svh overflow-hidden bg-cocoa font-figtree">
      {/* same red glow as the landing page */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-[1100px] bg-[radial-gradient(ellipse_55%_45%_at_50%_20%,#8a2122_0%,rgba(122,32,33,0.6)_45%,transparent_100%)]"
      />
      <div className="relative">
        <Navbar />
        <main className="mx-auto w-full max-w-[760px] px-6 pt-16 md:pt-24">
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-sm text-cream/90 transition-colors hover:text-white"
          >
            <ArrowLeft className="size-4" />
            Back to home
          </Link>

          <h1 className="mt-8 font-display text-4xl text-cream md:text-5xl">{page.title}</h1>
          <p className="mt-1 text-base text-cream/90 md:text-lg">{page.subtitle}</p>

          <div className="mt-10 rounded-2xl border border-white/15 bg-white/5 px-6 py-7 text-sm leading-relaxed text-cream/90 md:px-8 md:text-base">
            {page.body.map((line) => (
              <p key={line}>{line}</p>
            ))}
          </div>
        </main>
        <Footer />
      </div>
    </div>
  );
};