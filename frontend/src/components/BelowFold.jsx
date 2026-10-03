import { useEffect } from "react";
import SelectedWork from "./SelectedWork";
import About from "./About";
import HowIWork from "./HowIWork";
import Toolkit from "./Toolkit";
import Contact from "./Contact";
import ScrollTrace from "./ScrollTrace";
import SignatureSection from "./SignatureSection";

// Everything under the hero, split into its own chunk so the first screen
// doesn't wait on code for sections the visitor hasn't scrolled to yet.
export default function BelowFold() {
  // Arriving on "/#work" from another page: these sections only exist once
  // this chunk has mounted, so the scroll happens here.
  useEffect(() => {
    const id = window.location.hash.slice(1);
    if (id) document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
  }, []);

  return (
    <>
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
    </>
  );
}
