import { useEffect } from "react";
import { Link } from "react-router-dom";
import { QRCodeSVG } from "qrcode.react";
import { Download, ArrowLeft } from "lucide-react";
import DigitalCard, { NAME, TITLE, SITE, SITE_URL, PHONE, EMAIL, LINKEDIN_LABEL } from "../components/DigitalCard";
import Particles from "../components/Particles";

// Flattened, print-only layout — the interactive flip card doesn't translate
// to a printed page (no hover/tap, no 3D transform), so "Download PDF"
// prints this instead, via the browser's native print-to-PDF.
const PrintCard = () => (
  <div className="hidden print:block" style={{ color: "#111", background: "#fff", padding: "48px" }}>
    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
      <div>
        <div style={{ fontSize: 30, fontWeight: 700, letterSpacing: "-0.02em" }}>{NAME}</div>
        <div style={{ fontSize: 15, color: "#555", marginTop: 6 }}>{TITLE}</div>
      </div>
      <QRCodeSVG value={SITE_URL} size={88} bgColor="#ffffff" fgColor="#111111" level="M" />
    </div>
    <div style={{ marginTop: 40, fontSize: 14, lineHeight: 2.1 }}>
      <div>Phone: {PHONE}</div>
      <div>Email: {EMAIL}</div>
      <div>Website: {SITE}</div>
      <div>LinkedIn: {LINKEDIN_LABEL}</div>
    </div>
  </div>
);

export default function Card() {
  useEffect(() => {
    document.title = "Kunal Jain: Digital business card";
  }, []);

  return (
    <>
      <div className="relative min-h-[100svh] flex flex-col items-center justify-center px-6 py-16 print:hidden" data-testid="card-page">
        <Particles count={14} className="z-[1]" />
        <div className="relative z-[2] w-full max-w-[560px]">
          <DigitalCard />
          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3">
            <button
              onClick={() => window.print()}
              data-testid="card-download-pdf"
              className="btn-primary w-full sm:w-auto flex items-center justify-center gap-2"
            >
              <Download size={15} strokeWidth={1.8} />
              <span>Download PDF</span>
            </button>
            <Link
              to="/"
              data-testid="card-back-to-site"
              className="btn-ghost w-full sm:w-auto flex items-center justify-center gap-2"
            >
              <ArrowLeft size={15} strokeWidth={1.8} />
              <span>Back to website</span>
            </Link>
          </div>
        </div>
      </div>
      <PrintCard />
    </>
  );
}
