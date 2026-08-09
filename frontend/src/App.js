import "@/App.css";
import { lazy, Suspense } from "react";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import AmbientCursor from "./components/AmbientCursor";
import PageLoader from "./components/PageLoader";
import Particles from "./components/Particles";
import PageTransition from "./components/PageTransition";

const Home = lazy(() => import("./pages/Home"));
const CaseStudy = lazy(() => import("./pages/CaseStudy"));
const Card = lazy(() => import("./pages/Card"));

function AnimatedRoutes() {
  const location = useLocation();
  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<PageTransition><Home /></PageTransition>} />
        <Route path="/work/:slug" element={<PageTransition><CaseStudy /></PageTransition>} />
        <Route path="/card" element={<PageTransition><Card /></PageTransition>} />
      </Routes>
    </AnimatePresence>
  );
}

function App() {
  return (
    <div className="App">
      <AmbientCursor />
      <Particles count={30} starCount={26} className="!fixed inset-0 z-[0] pointer-events-none" />
      <BrowserRouter>
        <Suspense fallback={<PageLoader />}>
          <AnimatedRoutes />
        </Suspense>
      </BrowserRouter>
    </div>
  );
}

export default App;
