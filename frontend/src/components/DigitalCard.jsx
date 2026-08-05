import { useState } from "react";
import { QRCodeSVG } from "qrcode.react";
import { Phone, Mail, Globe, Linkedin, ArrowUpRight } from "lucide-react";

const NAME = "Kunal Jain";
const TITLE = "Creative Developer";
const SITE = "kjcreator.com";
const SITE_URL = "https://kjcreator.com";
const PHONE = "+91 63536 33045";
const PHONE_TEL = "+916353633045";
const EMAIL = "kunalsethia73800@gmail.com";
const LINKEDIN_LABEL = "linkedin.com/in/KunalJain";
const LINKEDIN_URL = "https://www.linkedin.com/in/KunalJain";

const gridBg = {
  backgroundImage:
    "linear-gradient(rgba(255,255,255,.05) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.05) 1px, transparent 1px)",
  backgroundSize: "28px 28px",
};

const faceShell =
  "absolute inset-0 rounded-[18px] border border-[var(--rule-strong)] overflow-hidden";

const KJBadge = ({ size = 52 }) => (
  <div
    className="rounded-[14px] flex items-center justify-center font-tight font-bold"
    style={{
      width: size,
      height: size,
      fontSize: size * 0.4,
      background: "linear-gradient(135deg, var(--violet-deep), var(--cyan-deep))",
      color: "#0a0d18",
      boxShadow: "0 8px 24px -8px rgba(124,76,240,.55)",
    }}
  >
    KJ
  </div>
);

const Front = () => (
  <div className={faceShell} style={{ background: "linear-gradient(160deg, #171a26 0%, #0a0d18 55%, #0d0a18 100%)" }}>
    <div className="absolute inset-0" style={gridBg} />
    <div
      aria-hidden
      className="absolute -bottom-10 -right-10 w-[60%] h-[60%] rounded-full"
      style={{ background: "radial-gradient(closest-side, rgba(168,121,255,.28), transparent 70%)", filter: "blur(6px)" }}
    />
    <div className="relative h-full flex flex-col justify-between p-6 sm:p-8">
      <div className="flex items-start justify-between">
        <KJBadge />
        <span
          className="text-[10px] tracking-[.2em] uppercase px-3 py-1.5 rounded-full border border-[var(--rule-strong)] text-[var(--ink-soft)]"
          data-testid="card-available-pill"
        >
          Available
        </span>
      </div>

      <div>
        <svg viewBox="0 0 400 30" className="w-full h-6 mb-3" preserveAspectRatio="none" aria-hidden>
          <polyline
            points="0,28 90,28 140,6 260,6 300,28 400,28"
            fill="none"
            stroke="var(--cyan)"
            strokeWidth="2"
            style={{ filter: "drop-shadow(0 0 4px var(--cyan-glow))" }}
          />
        </svg>
        <h3 className="font-tight text-[clamp(28px,7vw,44px)] leading-[1.02] text-[var(--ink)]">{NAME}</h3>
        <p className="mt-2 text-[14px] sm:text-[15px] text-[var(--ink-soft)]">{TITLE}</p>
      </div>

      <div className="flex items-center justify-between">
        <a
          href={SITE_URL}
          target="_blank"
          rel="noreferrer"
          onClick={(e) => e.stopPropagation()}
          className="inline-flex items-center gap-2 text-[13px] font-mono text-[var(--ink)] px-3 py-2 rounded-lg"
          style={{ background: "rgba(108,232,236,0.08)", border: "1px solid var(--rule-strong)" }}
          data-testid="card-site-link"
        >
          <ArrowUpRight size={13} className="text-[var(--cyan)]" />
          {SITE}
        </a>
        <div className="flex items-end gap-[3px]" aria-hidden>
          {[6, 10, 14, 18].map((h, i) => (
            <span key={i} style={{ width: 3, height: h, background: "var(--cyan)", boxShadow: "0 0 6px var(--cyan-glow)" }} />
          ))}
        </div>
      </div>
    </div>
  </div>
);

const row = (Icon, label, value, href, testid) => (
  <div className="flex items-center gap-3" data-testid={testid}>
    <div
      className="shrink-0 w-9 h-9 rounded-[10px] flex items-center justify-center border border-[var(--rule-strong)]"
      style={{ background: "rgba(255,255,255,0.03)" }}
    >
      <Icon size={15} className="text-[var(--ink-soft)]" />
    </div>
    <div className="min-w-0">
      <div className="text-[9px] tracking-[.18em] uppercase text-[var(--ink-muted)] mb-0.5">{label}</div>
      {href ? (
        <a
          href={href}
          target={href.startsWith("http") ? "_blank" : undefined}
          rel="noreferrer"
          onClick={(e) => e.stopPropagation()}
          className="text-[13px] sm:text-[14px] font-mono text-[var(--ink)] hover:text-[var(--cyan)] transition-colors truncate block"
        >
          {value}
        </a>
      ) : (
        <div className="text-[13px] sm:text-[14px] font-mono text-[var(--ink)] truncate">{value}</div>
      )}
    </div>
  </div>
);

const Back = () => (
  <div className={faceShell} style={{ background: "linear-gradient(200deg, #12141f 0%, #0a0d18 60%, #150f22 100%)" }}>
    <div className="absolute inset-0" style={gridBg} />
    <div className="relative h-full flex flex-col p-6 sm:p-8">
      <div className="flex items-center justify-between mb-6 sm:mb-8">
        <div className="text-[11px] sm:text-[12px] tracking-[.14em] uppercase text-[var(--ink-soft)] font-mono">
          Contact <span className="text-[var(--cyan)]">//</span> KJ.Studio
        </div>
        <KJBadge size={34} />
      </div>

      <div className="grid grid-cols-12 gap-6 flex-1">
        <div className="col-span-12 sm:col-span-7 flex flex-col justify-between gap-4 sm:gap-5">
          {row(Phone, "Phone", PHONE, `tel:${PHONE_TEL}`, "card-phone")}
          {row(Mail, "Email", EMAIL, `mailto:${EMAIL}`, "card-email")}
          {row(Globe, "Website", SITE, SITE_URL, "card-website")}
          {row(Linkedin, "LinkedIn", LINKEDIN_LABEL, LINKEDIN_URL, "card-linkedin")}
        </div>

        <div className="col-span-12 sm:col-span-5 flex flex-col items-center justify-center gap-2 sm:gap-3">
          <div className="bg-white p-2 sm:p-2.5 rounded-[10px]" data-testid="card-qr">
            <QRCodeSVG value={SITE_URL} size={92} bgColor="#ffffff" fgColor="#0a0d18" level="M" />
          </div>
          <div className="text-center text-[9px] tracking-[.14em] uppercase text-[var(--ink-muted)] leading-relaxed">
            Scan for
            <br />
            <span className="text-[var(--ink-soft)]">portfolio</span>
          </div>
        </div>
      </div>

      <div
        className="mt-6 pt-4 flex items-center justify-between text-[10px] tracking-[.14em] uppercase text-[var(--ink-muted)]"
        style={{ borderTop: "1px solid var(--rule)" }}
      >
        <span>Kunal Jain Studio</span>
        <div className="w-16 h-[3px] rounded-full" style={{ background: "linear-gradient(90deg, var(--cyan), var(--violet))" }} />
      </div>
    </div>
  </div>
);

export const DigitalCard = ({ className = "" }) => {
  const [flipped, setFlipped] = useState(false);

  return (
    <div className={`select-none ${className}`}>
      <div
        role="button"
        tabIndex={0}
        aria-pressed={flipped}
        aria-label="Flip business card"
        data-testid="digital-card-flip"
        onClick={() => setFlipped((f) => !f)}
        onKeyDown={(e) => (e.key === "Enter" || e.key === " ") && setFlipped((f) => !f)}
        className="relative w-full cursor-pointer"
        style={{ aspectRatio: "1.75 / 1", perspective: "1600px" }}
      >
        <div
          className="relative w-full h-full transition-transform duration-700"
          style={{
            transformStyle: "preserve-3d",
            transform: flipped ? "rotateY(180deg)" : "rotateY(0deg)",
            transitionTimingFunction: "cubic-bezier(.2,.8,.2,1)",
          }}
        >
          <div className="absolute inset-0" style={{ backfaceVisibility: "hidden" }}>
            <Front />
          </div>
          <div className="absolute inset-0" style={{ backfaceVisibility: "hidden", transform: "rotateY(180deg)" }}>
            <Back />
          </div>
        </div>
      </div>
      <p className="mt-3 text-center text-[11px] tracking-[.1em] uppercase text-[var(--ink-muted)]">
        Tap card to flip
      </p>
    </div>
  );
};

export default DigitalCard;
