import { lazy, Suspense } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Particles from "./components/Particles";
import Home from "./pages/Home";

const CaseStudy = lazy(() => import("./pages/CaseStudy"));

export default function App() {
  return (
    <div className="App">
      <Particles count={30} starCount={26} />
      <BrowserRouter>
        <Suspense fallback={null}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/work/:slug" element={<CaseStudy />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </Suspense>
      </BrowserRouter>
    </div>
  );
}
