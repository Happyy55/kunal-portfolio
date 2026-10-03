import { lazy, Suspense, useEffect } from "react";
import Nav from "../components/Nav";
import Hero from "../components/Hero";
import Footer from "../components/Footer";
import { useReveal } from "../hooks/useReveal";
import { usePageMeta } from "../hooks/usePageMeta";

const BelowFold = lazy(() => import("../components/BelowFold"));

export default function Home() {
  const ref = useReveal();

  usePageMeta({
    title: "KJ Studio (KJ Creator) · Web design & development by Kunal Jain, Ahmedabad",
    description:
      "KJ Studio, also known as KJ Creator, is the creative development studio of Kunal Jain in Ahmedabad, India. Websites, brand identities and apps for founders and small teams.",
    path: "/",
  });

  // A plain "/" landing starts at the top; "/#section" is handled by
  // BelowFold once those sections exist.
  useEffect(() => {
    if (!window.location.hash) window.scrollTo({ top: 0, behavior: "instant" });
  }, []);

  return (
    <div ref={ref} data-testid="home-page">
      <Nav />
      <main>
        <Hero />
        <Suspense fallback={<div className="min-h-screen" aria-hidden />}>
          <BelowFold />
        </Suspense>
      </main>
      <Footer />
    </div>
  );
}
