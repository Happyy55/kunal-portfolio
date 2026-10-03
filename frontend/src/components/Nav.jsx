import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { useSectionNav } from "../hooks/useSectionNav";

export const NAV_LINKS = [
  { href: "#signature", label: "The Craft" },
  { href: "#work", label: "Work" },
  { href: "#about", label: "About" },
  { href: "#how", label: "Process" },
  { href: "#toolkit", label: "Stack" },
  { href: "#contact", label: "Contact" },
];

export const Nav = () => {
  const { onHome, hrefFor, goTo } = useSectionNav();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [activeId, setActiveId] = useState("");

  // Header style + scroll-spy (the section whose top has passed 40% of the
  // viewport is the active one).
  useEffect(() => {
    let frame = 0;
    const update = () => {
      frame = 0;
      setScrolled(window.scrollY > 24);
      if (!onHome) return;
      const line = window.innerHeight * 0.4;
      let current = "";
      for (const { href } of NAV_LINKS) {
        const el = document.getElementById(href.slice(1));
        if (el && el.getBoundingClientRect().top <= line) current = el.id;
      }
      setActiveId(current);
    };
    const onScroll = () => { if (!frame) frame = requestAnimationFrame(update); };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(frame);
    };
  }, [onHome]);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  const follow = (e, href) => {
    setOpen(false);
    goTo(e, href);
  };

  return (
    <>
      <header
        data-testid="site-nav"
        className={`fixed top-0 inset-x-0 z-50 transition-[padding] duration-500 ${scrolled ? "py-3" : "py-5 md:py-6"}`}
      >
        <div className="max-w-[1400px] mx-auto px-4 md:px-10">
          <div
            className={`flex items-center justify-between transition-all duration-500 rounded-full border ${
              scrolled
                ? "px-4 md:px-5 py-2 bg-[rgba(5,7,15,0.88)] border-[rgba(255,255,255,0.09)] shadow-[0_8px_24px_rgba(0,0,0,0.35)] backdrop-blur-xl"
                : "px-2 py-1.5 border-transparent"
            }`}
          >
            <Link
              to="/"
              data-testid="nav-brand"
              className="flex items-center gap-3"
              onClick={(e) => {
                setOpen(false);
                if (onHome) {
                  e.preventDefault();
                  window.scrollTo({ top: 0, behavior: "smooth" });
                }
              }}
            >
              <img src="/images/kj-mark.png" alt="" width="34" height="58" className="kj-mark nav-mark" />
              <span className="sr-only sm:hidden">KJ Studio</span>
              <span className="hidden sm:flex flex-col leading-none">
                <span className="font-display text-[17px] text-[var(--ink)]">KJ Studio</span>
                <span className="mt-1.5 font-mono text-[11px] tracking-[0.12em] text-[var(--ink-muted)]">
                  Creative Development
                </span>
              </span>
            </Link>

            <nav aria-label="Main" className="hidden lg:flex items-center gap-8 xl:gap-10">
              {NAV_LINKS.map((l) => {
                const active = activeId === l.href.slice(1);
                return (
                  <a
                    key={l.href}
                    href={hrefFor(l.href)}
                    onClick={(e) => follow(e, l.href)}
                    aria-current={active ? "true" : undefined}
                    data-testid={`nav-link-${l.label.toLowerCase().replace(/\s/g, "-")}`}
                    className={`link font-display font-medium text-[15px] py-2 ${active ? "text-[var(--cyan)]" : ""}`}
                  >
                    {l.label}
                  </a>
                );
              })}
              <a
                href={hrefFor("#contact")}
                onClick={(e) => follow(e, "#contact")}
                data-testid="nav-cta"
                className="font-display text-[13.5px] px-[18px] py-[10px] rounded-full border border-[var(--rule-strong)] text-[var(--ink)] hover:text-[var(--cyan)] hover:border-[var(--cyan)] transition-colors"
              >
                Let's talk
              </a>
            </nav>

            <button
              type="button"
              onClick={() => setOpen((v) => !v)}
              data-testid="nav-mobile-toggle"
              aria-label={open ? "Close menu" : "Open menu"}
              aria-expanded={open}
              className="lg:hidden inline-flex items-center justify-center w-11 h-11 rounded-full border border-[var(--rule-strong)] bg-[rgba(5,7,15,0.55)] text-[var(--ink)]"
            >
              {open ? <X size={18} strokeWidth={1.7} /> : <Menu size={18} strokeWidth={1.7} />}
            </button>
          </div>
        </div>
      </header>

      <div
        data-testid="nav-mobile-sheet"
        className={`fixed inset-0 z-40 lg:hidden bg-[rgba(5,7,15,0.97)] backdrop-blur-xl transition-opacity duration-300 ${
          open ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
        aria-hidden={!open}
        onClick={() => setOpen(false)}
      >
        <nav aria-label="Mobile" className="h-full flex flex-col justify-center px-8" onClick={(e) => e.stopPropagation()}>
          <ul>
            {NAV_LINKS.map((l) => (
              <li key={l.href}>
                <a
                  href={hrefFor(l.href)}
                  onClick={(e) => follow(e, l.href)}
                  tabIndex={open ? 0 : -1}
                  data-testid={`nav-mobile-link-${l.label.toLowerCase().replace(/\s/g, "-")}`}
                  className="block py-3 font-tight text-[30px] leading-tight text-[var(--ink)] hover:text-[var(--cyan)] transition-colors"
                >
                  {l.label}
                </a>
              </li>
            ))}
          </ul>
          <p className="mt-12 pt-8 border-t border-[var(--rule-strong)] eyebrow">Ahmedabad, India</p>
        </nav>
      </div>
    </>
  );
};

export default Nav;
