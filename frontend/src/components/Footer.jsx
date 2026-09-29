import { useLocation, useNavigate } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import FooterGlowText from "./FooterGlowText";

const NAV = [
  { href: "#work", label: "Selected work" },
  { href: "#about", label: "About" },
  { href: "#how", label: "How I work" },
  { href: "#toolkit", label: "Stack" },
  { href: "#contact", label: "Contact" },
];

const SOCIAL = [
  { label: "LinkedIn", href: "https://in.linkedin.com/in/kunaljainstudio" },
  { label: "Email", href: "mailto:KJCreator10@gmail.com" },
  { label: "WhatsApp", href: "https://wa.me/916353633045" },
];

export const Footer = () => {
  const year = new Date().getFullYear();
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const onHome = pathname === "/";

  // Same reasoning as Nav's smoothScroll: off the home page the target
  // section isn't in the DOM, so route to home with the hash and let
  // Home's mount effect finish the scroll once it's rendered.
  const goToSection = (e, href) => {
    e.preventDefault();
    const id = href.replace("#", "");
    if (onHome) {
      document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    } else {
      navigate(`/${href}`);
    }
  };

  return (
    <footer
      data-testid="site-footer"
      className="relative border-t border-[var(--rule)] overflow-hidden"
    >
      {/* ambient glow — warmer gold-led mix (vs. Contact's cyan/violet just
          above) so the two closing sections read as distinct, not repeated */}
      <div
        aria-hidden
        className="absolute pointer-events-none -top-[10%] left-1/2 -translate-x-1/2 w-[900px] max-w-[90vw] h-[600px]"
        style={{
          background:
            "radial-gradient(circle at center, rgba(212,180,134,0.12) 0%, transparent 60%), radial-gradient(circle at center, rgba(108,232,236,0.10) 0%, transparent 65%)",
          filter: "blur(70px)",
        }}
      />

      <div className="relative max-w-[1400px] mx-auto px-6 md:px-10 pt-16 md:pt-24 pb-10 md:pb-12">
        {/* —— Columns —— */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-10">
          {/* Brand */}
          <div className="md:col-span-5">
            <div className="flex items-center gap-3">
              <img src="/images/kj-mark.png" alt="KJ" className="kj-mark" />
              <div className="leading-tight">
                <div className="font-display text-[var(--ink)] text-[15px]">KJ Studio</div>
                <div className="eyebrow text-[var(--ink-muted)] mt-1 normal-case tracking-[0.1em]">
                  Creative Development
                </div>
              </div>
            </div>
            <p className="mt-6 max-w-[42ch] text-[14px] leading-[1.85] text-[var(--ink-soft)]">
              A creative studio designing brand identities and building
              fast, reliable websites for founders and small teams. Led by
              Kunal Jain, based in Ahmedabad.
            </p>
          </div>

          {/* Nav + Elsewhere sit side-by-side even on mobile (unlike Brand,
              which is full-width there), so they get their own 2-col grid —
              `md:contents` hands them off as direct items of the outer
              12-col grid once it actually needs to arbitrate 3 columns. */}
          <div className="grid grid-cols-2 gap-8 md:contents">
            {/* Navigation */}
            <div className="md:col-span-3">
              <div className="eyebrow mb-5">Navigate</div>
              <ul>
                {NAV.map((l) => (
                  <li key={l.href}>
                    <a
                      href={onHome ? l.href : `/${l.href}`}
                      onClick={(e) => goToSection(e, l.href)}
                      data-testid={`footer-nav-${l.label.toLowerCase().replace(/\s/g, "-")}`}
                      className="block py-[13px] text-[14px] font-display text-[var(--ink-soft)] hover:text-[var(--cyan)] transition-colors duration-300"
                    >
                      {l.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Elsewhere */}
            <div className="md:col-span-4">
              <div className="eyebrow mb-5">Elsewhere</div>
              <ul>
                {SOCIAL.map((s) => (
                  <li key={s.label}>
                    <a
                      href={s.href}
                      target={s.href.startsWith("http") ? "_blank" : undefined}
                      rel="noreferrer"
                      data-testid={`footer-social-${s.label.toLowerCase()}`}
                      className="group flex items-center gap-2 py-[13px] text-[14px] font-display text-[var(--ink-soft)] hover:text-[var(--cyan)] transition-colors duration-300"
                    >
                      <span>{s.label}</span>
                      <ArrowUpRight
                        size={12}
                        strokeWidth={1.8}
                        className="opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300"
                      />
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* —— Hairline divider —— */}
        <div className="mt-14 md:mt-20 h-px w-full bg-gradient-to-r from-transparent via-[var(--rule-strong)] to-transparent" />

        {/* —— Big glow wordmark —— */}
        <div className="mt-12 md:mt-16 -mb-2 md:-mb-4">
          <FooterGlowText />
        </div>

        {/* —— Baseline row —— */}
        <div className="mt-8 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 eyebrow">
          <span className="text-[var(--ink-muted)]">
            © {year} Kunal Jain. All rights reserved.
          </span>
          <button
            type="button"
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            data-testid="footer-back-to-top"
            className="text-[var(--ink-soft)] hover:text-[var(--cyan)] transition-colors duration-300 text-left sm:text-right"
          >
            Back to top
          </button>
        </div>
      </div>

      {/* bottom edge gradient */}
      <div
        aria-hidden
        className="absolute bottom-0 inset-x-0 h-px"
        style={{
          background:
            "linear-gradient(90deg, transparent 0%, rgba(108,232,236,0.4) 50%, transparent 100%)",
          boxShadow: "0 0 12px rgba(108,232,236,0.4)",
        }}
      />
    </footer>
  );
};

export default Footer;
