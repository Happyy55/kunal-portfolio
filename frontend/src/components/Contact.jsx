import { useRef } from "react";
import { Mail, MessageSquare, Phone, Linkedin } from "lucide-react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger, useGSAP);

const EMAIL = "kunalsethia73800@gmail.com";
const PHONE = "+91 63536 33045";
const PHONE_TEL = "+916353633045";
const WHATSAPP_URL = `https://wa.me/916353633045?text=${encodeURIComponent("Hi Kunal, I'd like to talk about a project.")}`;

const LINES = [
  { label: "WhatsApp", value: PHONE, href: WHATSAPP_URL, testid: "contact-whatsapp", external: true, icon: MessageSquare, accent: "cyan" },
  { label: "Phone", value: PHONE, href: `tel:${PHONE_TEL}`, testid: "contact-phone", icon: Phone, accent: "violet" },
  { label: "LinkedIn", value: "linkedin.com/in/kunaljain", href: "https://www.linkedin.com/in/kunaljain", testid: "social-linkedin", external: true, icon: Linkedin, accent: "gold" },
  { label: "Email", value: EMAIL, href: `mailto:${EMAIL}`, testid: "social-email", icon: Mail, accent: "cyan" },
];

const ACCENT_VAR = { cyan: "var(--cyan)", violet: "var(--violet)", gold: "var(--gold)" };

export const Contact = () => {
  const listRef = useRef(null);

  useGSAP(
    () => {
      const rows = listRef.current?.querySelectorAll("li");
      if (!rows?.length) return;
      gsap.fromTo(
        rows,
        { opacity: 0, x: -16 },
        {
          opacity: 1,
          x: 0,
          duration: 0.5,
          stagger: 0.08,
          ease: "power2.out",
          scrollTrigger: { trigger: listRef.current, start: "top 85%", toggleActions: "play none none reverse" },
        }
      );
    },
    { scope: listRef }
  );

  return (
    <section id="contact" data-testid="contact-section" className="relative overflow-hidden">
      <div
        aria-hidden
        className="absolute pointer-events-none -top-[10%] left-1/2 -translate-x-1/2 w-[800px] max-w-[90vw] h-[600px]"
        style={{
          background:
            "radial-gradient(circle at center, rgba(108,232,236,0.18) 0%, transparent 60%), radial-gradient(circle at center, rgba(168,121,255,0.14) 0%, transparent 65%)",
          filter: "blur(50px)",
        }}
      />

      <div className="max-w-[1400px] mx-auto px-6 md:px-10 py-16 md:py-28 relative">
        <div className="reveal text-center">
          <div className="section-mark mb-6 md:mb-8 justify-center">Let's Create</div>
          <h2 className="font-tight text-[36px] sm:text-[54px] lg:text-[72px] leading-[1.04] text-[var(--ink)] max-w-[16ch] mx-auto">
            Got something{" "}
            <em className="font-italic text-[var(--cyan)]">worth building?</em>
          </h2>
          <p className="mt-6 md:mt-8 text-[15px] md:text-[16.5px] leading-[1.85] text-[var(--ink)] max-w-[46ch] mx-auto">
            You bring the idea, and I'll make sure it survives the build.
          </p>
          <p className="mt-3 text-[14px] md:text-[15px] leading-[1.85] text-[var(--ink-soft)] max-w-[54ch] mx-auto">
            Email or WhatsApp, whichever's faster for you. I read everything, and reply within a day.
          </p>
        </div>

        <div className="mt-14 md:mt-20 reveal">
          <div className="connect-panel max-w-[880px] mx-auto">
            <div aria-hidden className="connect-panel-glow" />
            <div className="relative">
              <div className="eyebrow mb-3 text-center justify-center">
                <span>Other ways to reach me</span>
              </div>
              <p className="text-center text-[14px] md:text-[15px] leading-[1.85] text-[var(--ink-soft)] max-w-[42ch] mx-auto">
                Pick whichever's easiest — I'm reachable on all of these.
              </p>

              <ul ref={listRef} className="mt-9 md:mt-11 flex flex-wrap items-start justify-center gap-x-8 gap-y-8 sm:gap-x-12">
                {LINES.map((row) => (
                  <li key={row.label}>
                    <a
                      href={row.href}
                      target={row.external ? "_blank" : undefined}
                      rel={row.external ? "noreferrer" : undefined}
                      data-testid={row.testid}
                      className="connect-icon-link group flex flex-col items-center gap-3"
                      style={{ "--connect-accent": ACCENT_VAR[row.accent] }}
                      title={row.value}
                    >
                      <span className="connect-icon">
                        <row.icon size={22} strokeWidth={1.8} />
                      </span>
                      <span className="font-display text-[13.5px] text-[var(--ink-soft)] group-hover:text-[var(--ink)] transition-colors">
                        {row.label}
                      </span>
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        <div className="mt-14 md:mt-20 flex flex-wrap items-center justify-between gap-4 eyebrow">
          <span>Design • Development • Branding</span>
          <span className="text-[var(--ink-muted)]">Available for freelance projects</span>
        </div>
      </div>
    </section>
  );
};

export default Contact;
