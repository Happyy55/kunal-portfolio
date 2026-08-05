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
      "Kunal Jain — Creative Developer";
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
