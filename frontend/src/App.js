import "@/App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import CaseStudy from "./pages/CaseStudy";
import AmbientCursor from "./components/AmbientCursor";
import { Toaster } from "sonner";

function App() {
  return (
    <div className="App">
      <AmbientCursor />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/work/:slug" element={<CaseStudy />} />
        </Routes>
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
