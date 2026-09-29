import "@/App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Particles from "./components/Particles";
import PageTransition from "./components/PageTransition";
import Home from "./pages/Home";
import CaseStudy from "./pages/CaseStudy";

function AnimatedRoutes() {
  return (
    <Routes>
      <Route path="/" element={<PageTransition><Home /></PageTransition>} />
      <Route path="/work/:slug" element={<PageTransition><CaseStudy /></PageTransition>} />
    </Routes>
  );
}

function App() {
  return (
    <div className="App">
      <Particles count={30} starCount={26} className="!fixed inset-0 z-[0] pointer-events-none" />
      <BrowserRouter>
        <AnimatedRoutes />
      </BrowserRouter>
    </div>
  );
}

export default App;
