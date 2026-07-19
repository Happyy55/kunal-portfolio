import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react";

const LINKS = [
  { href: "#work", label: "Work" },
  { href: "#about", label: "About" },
  { href: "#toolkit", label: "Stack" },
  { href: "#contact", label: "Contact" },
];

export const Nav = () => {
  const { pathname } = useLocation();
  const onHome = pathname === "/";
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [activeId, setActiveId] = useState("");

  // scroll-spy: highlight the section currently in view
  useEffect(() => {
    if (!onHome) return;
    const ids = ["work", "about", "toolkit", "contact"];
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((en) => {
          if (en.isIntersecting) setActiveId(en.target.id);
        });
      },
      { rootMargin: "-35% 0px -55% 0px" }
    );
    ids.forEach((id) => {
      const el = document.getElementById(id);
      if (el) obs.observe(el);
    });
    return () => obs.disconnect();
  }, [onHome]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // lock body scroll when sheet open
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  const hrefFor = (href) => (onHome ? href : `/${href}`);

  const smoothScroll = (e, href) => {
    const el = document.getElementById(href.replace("#", ""));
    if (el) {
      e.preventDefault();
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <>
      <header
        data-testid="site-nav"
        className={`fixed top-0 inset-x-0 z-50 transition-all duration-500 ${scrolled ? "py-4" : "py-8"}`}
      >
        <div className="max-w-[1240px] mx-auto px-6 md:px-10">
          <div
            className={`flex items-center justify-between transition-all duration-500 ${
              scrolled
                ? "rounded-full px-6 py-3 bg-[rgba(5,7,15,0.55)] border border-[rgba(255,255,255,0.09)]"
                : "px-0 py-1.5"
            }`}
            style={scrolled ? { boxShadow: "0 0 30px rgba(108,232,236,0.10), 0 8px 32px rgba(0,0,0,0.35)", backdropFilter: "blur(28px) saturate(1.5)", WebkitBackdropFilter: "blur(28px) saturate(1.5)" } : {}}
          >
            <Link to="/" data-testid="nav-brand" className="flex items-center gap-3" onClick={() => setOpen(false)}>
              <span className="kj">KJ</span>
              <span className="hidden sm:flex flex-col leading-none">
                <span className="font-display text-[16.5px] text-[var(--ink)]">Kunal Jain</span>
                <span className="font-mono text-[9.5px] text-[var(--ink-muted)] tracking-[0.24em] mt-1">
                  Creative Developer
                </span>
              </span>
            </Link>

            <nav className="hidden md:flex items-center gap-11">
              {LINKS.map((l) => (
                <a
                  key={l.href}
                  href={hrefFor(l.href)}
                  onClick={(e) => smoothScroll(e, l.href)}
                  data-testid={`nav-link-${l.label.toLowerCase()}`}
                  className={`relative text-[14.5px] link font-display py-1 inline-flex items-center gap-2 transition-colors duration-300 ${
                    activeId === l.href.slice(1) ? "text-[var(--cyan)]" : ""
                  }`}
                >
                  <span
                    aria-hidden
                    className={`w-1 h-1 rounded-full transition-all duration-300 ${
                      activeId === l.href.slice(1) ? "bg-[var(--cyan)] opacity-100" : "opacity-0 -ml-3"
                    }`}
                    style={activeId === l.href.slice(1) ? { boxShadow: "0 0 8px var(--cyan-glow)" } : {}}
                  />
                  {l.label}
                </a>
              ))}
              <a
                href={hrefFor("#contact")}
                onClick={(e) => smoothScroll(e, "#contact")}
                data-testid="nav-cta"
                className="inline-flex items-center gap-2.5 text-[13px] font-display px-[18px] py-[9px] rounded-full border border-[rgba(108,232,236,0.32)] text-[var(--ink)] hover:text-[var(--cyan)] hover:border-[var(--cyan)] transition-all duration-300 hover:-translate-y-[1px]"
                style={{ boxShadow: "0 0 18px rgba(108,232,236,0.10), inset 0 0 12px rgba(108,232,236,0.05)" }}
              >
                Let's talk
                <span className="w-1.5 h-1.5 rounded-full bg-[var(--cyan)]" style={{ boxShadow: "0 0 8px var(--cyan-glow)" }} />
              </a>
            </nav>

            <button
              type="button"
              onClick={() => setOpen((v) => !v)}
              data-testid="nav-mobile-toggle"
              aria-label={open ? "Close menu" : "Open menu"}
              className="md:hidden inline-flex items-center justify-center w-10 h-10 rounded-full border border-[rgba(108,232,236,0.3)] bg-[rgba(5,7,15,0.55)] backdrop-blur-md text-[var(--ink)] hover:text-[var(--cyan)] hover:border-[var(--cyan)] transition-colors"
              style={{ boxShadow: "0 0 18px rgba(108,232,236,0.18)" }}
            >
              {open ? <X size={18} strokeWidth={1.7} /> : <Menu size={18} strokeWidth={1.7} />}
            </button>
          </div>
          {!scrolled && (
            <div
              aria-hidden
              className="mt-5 h-px w-full"
              style={{
                background:
                  "linear-gradient(90deg, transparent 0%, rgba(108,232,236,0.28) 30%, rgba(168,121,255,0.22) 70%, transparent 100%)",
              }}
            />
          )}
        </div>
      </header>

      {/* Mobile sheet */}
      <div
        data-testid="nav-mobile-sheet"
        className={`fixed inset-0 z-40 md:hidden transition-opacity duration-300 ${open ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"}`}
        style={{ background: "radial-gradient(80% 80% at 50% 30%, rgba(108,232,236,0.10) 0%, rgba(5,7,15,0.96) 60%)", backdropFilter: "blur(20px)" }}
        onClick={() => setOpen(false)}
      >
        <div className="h-full flex flex-col justify-center px-8" onClick={(e) => e.stopPropagation()}>
          <span className="eyebrow text-[var(--cyan)] mb-10">Menu</span>
          <ul className="space-y-7">
            {LINKS.map((l, i) => (
              <li key={l.href} style={{ transitionDelay: `${i * 60}ms` }}>
                <a
                  href={hrefFor(l.href)}
                  onClick={(e) => { smoothScroll(e, l.href); setOpen(false); }}
                  data-testid={`nav-mobile-link-${l.label.toLowerCase()}`}
                  className="font-tight text-[40px] leading-none text-[var(--ink)] hover:text-[var(--cyan)] transition-colors"
                >
                  {l.label}
                </a>
              </li>
            ))}
          </ul>
          <div className="mt-14 pt-8 border-t border-[var(--rule-strong)] flex items-center justify-between">
            <span className="eyebrow text-[var(--ink-muted)]">Ahmedabad · IN</span>
          </div>
        </div>
      </div>
    </>
  );
};

export default Nav;
