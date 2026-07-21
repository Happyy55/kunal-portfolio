import { Link } from "react-router-dom";
import { ArrowUpRight, Mail, MessageSquare } from "lucide-react";

const NAV = [
  { href: "#work", label: "Selected work" },
  { href: "#about", label: "About" },
  { href: "#how", label: "How I work" },
  { href: "#toolkit", label: "Stack" },
  { href: "#contact", label: "Contact" },
];

const SOCIAL = [
  { label: "LinkedIn", href: "https://www.linkedin.com/" },
  { label: "Email", href: "mailto:kunalsethia73800@gmail.com" },
  { label: "WhatsApp", href: "https://wa.me/916353633045" },
];

export const Footer = () => {
  const year = new Date().getFullYear();

  return (
    <footer
      data-testid="site-footer"
      className="relative border-t border-[var(--rule)] overflow-hidden"
    >
      {/* ambient glow */}
      <div
        aria-hidden
        className="absolute pointer-events-none -top-[30%] left-[10%] w-[80%] h-[120%]"
        style={{
          background:
            "radial-gradient(closest-side, rgba(108,232,236,0.14) 0%, transparent 70%), radial-gradient(closest-side, rgba(168,121,255,0.10) 0%, transparent 70%)",
          filter: "blur(60px)",
        }}
      />

      <div className="relative max-w-[1240px] mx-auto px-6 md:px-10 pt-16 md:pt-24 pb-10 md:pb-12">
        {/* —— Big closing line —— */}
        <div className="grid grid-cols-12 gap-6 md:gap-12 items-end pb-12 md:pb-16 border-b border-[var(--rule-strong)]">
          <div className="col-span-12 md:col-span-8">
            <h2 className="font-tight text-[34px] sm:text-[50px] lg:text-[64px] leading-[1.05] text-[var(--ink)] max-w-[20ch]">
              Every project starts with{" "}
              <em className="font-italic text-[var(--cyan)]">a conversation.</em>
            </h2>
          </div>
          <div className="col-span-12 md:col-span-4 flex flex-wrap items-center gap-3 md:justify-end">
            <a
              href="mailto:kunalsethia73800@gmail.com"
              data-testid="footer-email-cta"
              className="btn-primary text-[14px]"
            >
              <Mail size={14} strokeWidth={1.8} />
              <span>Send an email</span>
              <span className="arrow-dot" />
            </a>
            <a
              href="https://wa.me/916353633045"
              target="_blank"
              rel="noreferrer"
              data-testid="footer-whatsapp-cta"
              className="btn-ghost"
            >
              <MessageSquare size={14} strokeWidth={1.8} />
              <span>WhatsApp</span>
            </a>
          </div>
        </div>

        {/* —— Columns —— */}
        <div className="grid grid-cols-12 gap-6 md:gap-10 pt-12 md:pt-16">
          {/* Brand */}
          <div className="col-span-12 md:col-span-5">
            <div className="flex items-center gap-3">
              <span className="kj">KJ</span>
              <div className="leading-tight">
                <div className="font-display text-[var(--ink)] text-[15px]">Kunal Jain</div>
                <div className="eyebrow text-[var(--ink-muted)] mt-1 normal-case tracking-[0.1em]">
                  Creative Developer
                </div>
              </div>
            </div>
            <p className="mt-6 max-w-[42ch] text-[14px] leading-[1.85] text-[var(--ink-soft)]">
              I design brand identities and build fast, reliable websites
              for founders and small businesses — one person, end to end,
              working from Ahmedabad.
            </p>
            <div className="mt-7">
              <span className="live-pill" data-testid="footer-availability">
                <span className="dot" aria-hidden />
                Available for selected projects
              </span>
            </div>
          </div>

          {/* Navigation */}
          <div className="col-span-6 md:col-span-3">
            <div className="eyebrow mb-5">Navigate</div>
            <ul className="space-y-3.5">
              {NAV.map((l) => (
                <li key={l.href}>
                  <a
                    href={l.href}
                    onClick={(e) => { const el = document.getElementById(l.href.replace("#", "")); if (el) { e.preventDefault(); el.scrollIntoView({ behavior: "smooth" }); } }}
                    data-testid={`footer-nav-${l.label.toLowerCase().replace(/\s/g, "-")}`}
                    className="text-[14px] font-display text-[var(--ink-soft)] hover:text-[var(--cyan)] transition-colors duration-300"
                  >
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Elsewhere */}
          <div className="col-span-6 md:col-span-4">
            <div className="eyebrow mb-5">Elsewhere</div>
            <ul className="space-y-3.5">
              {SOCIAL.map((s) => (
                <li key={s.label}>
                  <a
                    href={s.href}
                    target={s.href.startsWith("http") ? "_blank" : undefined}
                    rel="noreferrer"
                    data-testid={`footer-social-${s.label.toLowerCase()}`}
                    className="group inline-flex items-center gap-2 text-[14px] font-display text-[var(--ink-soft)] hover:text-[var(--cyan)] transition-colors duration-300"
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

        {/* —— Hairline divider —— */}
        <div className="mt-14 md:mt-20 h-px w-full bg-gradient-to-r from-transparent via-[var(--rule-strong)] to-transparent" />

        {/* —— Baseline row —— */}
        <div className="mt-7 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 eyebrow">
          <span className="text-[var(--ink-muted)]">
            © {year} Kunal Jain. Built and maintained from Ahmedabad.
          </span>
          <span>Ahmedabad · India</span>
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
