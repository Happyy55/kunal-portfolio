import { ArrowUpRight } from "lucide-react";
import { NAV_LINKS } from "./Nav";
import { useSectionNav } from "../hooks/useSectionNav";
import { CONTACT } from "../data/contact";

const SOCIAL = [
  { label: "LinkedIn", href: CONTACT.linkedin },
  { label: "Email", href: `mailto:${CONTACT.email}` },
  { label: "WhatsApp", href: CONTACT.whatsapp },
];

// Echoes the hero headline as an outlined wordmark.
const WORDMARK = ["I turn ideas", "into experiences.", "You remember the feeling."];

export const Footer = () => {
  const { hrefFor, goTo } = useSectionNav();
  const year = new Date().getFullYear();

  return (
    <footer data-testid="site-footer" className="relative border-t border-[var(--rule)] overflow-hidden">
      <div
        aria-hidden
        className="absolute pointer-events-none -top-[10%] left-1/2 -translate-x-1/2 w-[900px] max-w-[90vw] h-[600px] blur-[70px]"
        style={{
          background:
            "radial-gradient(circle at center, rgba(212,180,134,0.12) 0%, transparent 60%), radial-gradient(circle at center, rgba(108,232,236,0.10) 0%, transparent 65%)",
        }}
      />

      <div className="relative max-w-[1400px] mx-auto px-6 md:px-10 pt-16 md:pt-24 pb-10 md:pb-12">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10">
          <div className="md:col-span-5">
            <div className="flex items-center gap-3">
              <img src="/images/kj-mark.png" alt="" width="34" height="58" className="kj-mark" />
              <div className="leading-none">
                <div className="font-display text-[17px] text-[var(--ink)]">KJ Studio</div>
                <div className="mt-1.5 font-mono text-[11px] tracking-[0.12em] text-[var(--ink-muted)]">
                  Creative Development
                </div>
              </div>
            </div>
            <p className="mt-6 max-w-[42ch] text-[14.5px] leading-[1.8] text-[var(--ink-soft)]">
              A creative studio designing brand identities and building fast,
              reliable websites for founders and small teams. Led by Kunal
              Jain, based in Ahmedabad.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-8 md:contents">
            <nav aria-label="Footer" className="md:col-span-3 md:col-start-7">
              <div className="eyebrow mb-4">Navigate</div>
              <ul>
                {NAV_LINKS.map((l) => (
                  <li key={l.href}>
                    <a
                      href={hrefFor(l.href)}
                      onClick={(e) => goTo(e, l.href)}
                      className="block py-2.5 text-[14.5px] font-display text-[var(--ink-soft)] hover:text-[var(--cyan)] transition-colors"
                    >
                      {l.label}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>

            <div className="md:col-span-3">
              <div className="eyebrow mb-4">Elsewhere</div>
              <ul>
                {SOCIAL.map((s) => (
                  <li key={s.label}>
                    <a
                      href={s.href}
                      target={s.href.startsWith("http") ? "_blank" : undefined}
                      rel={s.href.startsWith("http") ? "noopener noreferrer" : undefined}
                      data-testid={`footer-social-${s.label.toLowerCase()}`}
                      className="group inline-flex items-center gap-2 py-2.5 text-[14.5px] font-display text-[var(--ink-soft)] hover:text-[var(--cyan)] transition-colors"
                    >
                      {s.label}
                      <ArrowUpRight size={12} strokeWidth={1.8} className="opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300" />
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        <div className="mt-14 md:mt-20 h-px w-full bg-gradient-to-r from-transparent via-[var(--rule-strong)] to-transparent" />

        <div className="mt-12 md:mt-16 select-none" aria-hidden>
          {WORDMARK.map((line) => (
            <div key={line} className="footer-glow-line">
              <span className="footer-glow-base">{line}</span>
              <span className="footer-glow-shine">{line}</span>
            </div>
          ))}
        </div>

        <div className="mt-10 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 eyebrow">
          <span>© {year} KJ Studio · Kunal Jain</span>
          <button
            type="button"
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            data-testid="footer-back-to-top"
            className="eyebrow self-start sm:self-auto py-3 hover:text-[var(--cyan)] transition-colors"
          >
            Back to top ↑
          </button>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
