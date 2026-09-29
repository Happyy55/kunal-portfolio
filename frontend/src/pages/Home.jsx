import { useEffect } from "react";
import Nav from "../components/Nav";
import Hero from "../components/Hero";
import SelectedWork from "../components/SelectedWork";
import About from "../components/About";
import HowIWork from "../components/HowIWork";
import Toolkit from "../components/Toolkit";
import Contact from "../components/Contact";
import Footer from "../components/Footer";
import ScrollTrace from "../components/ScrollTrace";
import SignatureSection from "../components/SignatureSection";
import { useReveal } from "../hooks/useReveal";

export default function Home() {
  const ref = useReveal();

  useEffect(() => {
    document.title =
      "Kunal Jain, Creative Developer";
  }, []);

  // Arriving here from another route (a case study's "Back to index", the
  // nav/footer links, the business card) is a fresh mount, not an in-page
  // click — so the usual el.scrollIntoView() from Nav/Footer never runs.
  // Pick up the hash (or the lack of one) here instead: scroll to that
  // section once the page has actually laid out, or reset to top for a
  // plain "/" landing so a stale scroll position from the previous page
  // isn't carried over.
  useEffect(() => {
    const hash = window.location.hash;
    if (!hash) {
      window.scrollTo({ top: 0, behavior: "instant" });
      return;
    }
    const id = hash.slice(1);
    let cancelled = false;
    let attempts = 0;
    let timer = null;
    const tryScroll = () => {
      if (cancelled) return;
      const el = document.getElementById(id);
      if (el) {
        el.scrollIntoView({ behavior: "smooth", block: "start" });
      } else if (attempts < 20) {
        attempts += 1;
        timer = setTimeout(tryScroll, 50);
      }
    };
    timer = setTimeout(tryScroll, 50);
    return () => {
      cancelled = true;
      clearTimeout(timer);
    };
  }, []);

  return (
    <div ref={ref} data-testid="home-page">
      <Nav />
      <main>
        <Hero />
        <ScrollTrace />
        <SignatureSection />
        <ScrollTrace />
        <SelectedWork />
        <ScrollTrace />
        <About />
        <ScrollTrace />
        <HowIWork />
        <ScrollTrace />
        <Toolkit />
        <ScrollTrace />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}
