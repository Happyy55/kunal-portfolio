import { Link } from "react-router-dom";

const SOCIAL = [
  { label: "LinkedIn", href: "https://www.linkedin.com/" },
  { label: "WhatsApp", href: "https://wa.me/916353633045" },
];

/**
 * Footer — quiet coda, not another scene. Per the locked Scene 07 spec
 * ("minimal interface, one clear CTA, no visual noise, no multiple
 * competing actions"), this deliberately carries no headline and no
 * button — SceneCTA above it already owns the page's one action.
 */
export const Footer = () => {
  const year = new Date().getFullYear();

  return (
    <footer
      data-testid="site-footer"
      className="relative border-t border-[var(--rule)]"
    >
      <div className="max-w-[1240px] mx-auto px-6 md:px-10 py-8 md:py-10 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div className="flex items-center gap-3">
          <span className="kj" aria-hidden>KJ</span>
          <span className="eyebrow text-[var(--ink-muted)]">
            © {year} KJ Creator · Ahmedabad, India
          </span>
        </div>

        <nav aria-label="Footer" className="flex items-center gap-6">
          <a
            href="mailto:kunalsethia73800@gmail.com"
            data-testid="footer-email"
            className="link text-[13px] font-display text-[var(--ink-soft)]"
          >
            kunalsethia73800@gmail.com
          </a>
          {SOCIAL.map((s) => (
            <a
              key={s.label}
              href={s.href}
              target="_blank"
              rel="noreferrer"
              data-testid={`footer-social-${s.label.toLowerCase()}`}
              className="link text-[13px] font-display text-[var(--ink-soft)]"
            >
              {s.label}
            </a>
          ))}
          <Link
            to="/card"
            data-testid="footer-card"
            className="link text-[13px] font-display text-[var(--ink-soft)]"
          >
            Business card
          </Link>
        </nav>
      </div>
    </footer>
  );
};

export default Footer;
