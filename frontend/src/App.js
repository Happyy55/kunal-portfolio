import "@/App.css";
import { lazy, Suspense } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import AmbientCursor from "./components/AmbientCursor";
import PageLoader from "./components/PageLoader";
import { Toaster } from "sonner";

const Home = lazy(() => import("./pages/Home"));
const CaseStudy = lazy(() => import("./pages/CaseStudy"));
const Card = lazy(() => import("./pages/Card"));

function App() {
  return (
    <div className="App">
      <AmbientCursor />
      <BrowserRouter>
        <Suspense fallback={<PageLoader />}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/work/:slug" element={<CaseStudy />} />
            <Route path="/card" element={<Card />} />
          </Routes>
        </Suspense>
      </BrowserRouter>
      <Toaster
        theme="dark"
        position="bottom-right"
        toastOptions={{
          style: {
            background: "rgba(14, 18, 36, 0.92)",
            border: "1px solid rgba(108, 232, 236, 0.3)",
            color: "#F3EEE5",
            backdropFilter: "blur(16px)",
          },
        }}
      />
    </div>
  );
}

export default App;
