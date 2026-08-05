import { useEffect } from "react";
import DigitalCard from "../components/DigitalCard";
import Particles from "../components/Particles";
import { Download } from "lucide-react";

const VCARD = `BEGIN:VCARD
VERSION:3.0
N:Jain;Kunal;;;
FN:Kunal Jain
TITLE:Creative Developer
ORG:Kunal Jain Studio
TEL;TYPE=CELL:+916353633045
EMAIL:kunalsethia73800@gmail.com
URL:https://kjcreator.com
item1.URL:https://www.linkedin.com/in/KunalJain
item1.X-ABLabel:LinkedIn
END:VCARD`;

function downloadVCard() {
  const blob = new Blob([VCARD], { type: "text/vcard;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = "Kunal-Jain.vcf";
  document.body.appendChild(a);
  a.click();
  a.remove();
  URL.revokeObjectURL(url);
}

export default function Card() {
  useEffect(() => {
    document.title = "Kunal Jain — Digital business card";
  }, []);

  return (
    <div className="relative min-h-[100svh] flex items-center justify-center px-6 py-16" data-testid="card-page">
      <Particles count={14} className="z-[1]" />
      <div className="relative z-[2] w-full max-w-[560px]">
        <DigitalCard />
        <button
          onClick={downloadVCard}
          data-testid="card-download-vcard"
          className="btn-primary mt-8 w-full sm:w-auto mx-auto flex items-center justify-center gap-2"
        >
          <Download size={15} strokeWidth={1.8} />
          <span>Save to contacts</span>
        </button>
      </div>
    </div>
  );
}
