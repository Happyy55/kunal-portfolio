import { Mail, MessageSquare } from "lucide-react";
import { useMagnetic } from "../hooks/useMagnetic";

const EMAIL = "kunalsethia73800@gmail.com";
const PHONE = "+91 63536 33045";
const PHONE_TEL = "+916353633045";
const WHATSAPP_URL = `https://wa.me/916353633045?text=${encodeURIComponent("Hi Kunal, I'd like to talk about a project.")}`;

const LINES = [
  { label: "WhatsApp", value: PHONE, href: WHATSAPP_URL, testid: "contact-whatsapp", external: true },
  { label: "Phone", value: PHONE, href: `tel:${PHONE_TEL}`, testid: "contact-phone" },
  { label: "LinkedIn", value: "linkedin.com/in/kunaljain", href: "https://www.linkedin.com/", testid: "social-linkedin", external: true },
  { label: "Email", value: EMAIL, href: `mailto:${EMAIL}`, testid: "social-email" },
];

export const Contact = () => {
  useMagnetic("[data-magnetic-contact]", 0.18);

  return (
    <section id="contact" data-testid="contact-section" className="border-t border-[var(--rule)] relative overflow-hidden">
      <div
        aria-hidden
        className="absolute pointer-events-none -top-[10%] left-[20%] w-[60%] h-[70%]"
        style={{
          background:
            "radial-gradient(closest-side, rgba(108,232,236,0.18) 0%, transparent 70%), radial-gradient(closest-side, rgba(168,121,255,0.14) 0%, transparent 70%)",
          filter: "blur(50px)",
        }}
      />

      <div className="max-w-[1240px] mx-auto px-6 md:px-10 py-16 md:py-28 relative">
        <div className="reveal text-center">
          <div className="section-mark mb-6 md:mb-8 justify-center">Contact</div>
          <h2 className="font-tight text-[36px] sm:text-[54px] lg:text-[72px] leading-[1.04] text-[var(--ink)] max-w-[16ch] mx-auto">
            Have a project{" "}
            <em className="font-italic text-[var(--cyan)]">in mind?</em>
          </h2>
          <p className="mt-6 md:mt-8 text-[15px] md:text-[16.5px] leading-[1.85] text-[var(--ink)] max-w-[46ch] mx-auto">
            Let's create something exceptional together.
          </p>
          <p className="mt-3 text-[14px] md:text-[15px] leading-[1.85] text-[var(--ink-soft)] max-w-[54ch] mx-auto">
            Email or WhatsApp — whichever feels right. I read every message and reply within a day.
          </p>
        </div>

        <div className="mt-9 md:mt-12 flex flex-wrap items-center justify-center gap-4 md:gap-5 reveal">
          <a href={`mailto:${EMAIL}`} data-testid="contact-email-button" data-magnetic-contact className="magnetic inline-block">
            <span className="btn-primary text-[15px] py-[18px] px-[26px]" data-magnetic-target>
              <Mail size={15} strokeWidth={1.8} />
              <span>{EMAIL}</span>
              <span className="arrow-dot" />
            </span>
          </a>
          <a href={WHATSAPP_URL} target="_blank" rel="noreferrer" data-testid="contact-whatsapp-button" className="btn-ghost">
            <MessageSquare size={15} strokeWidth={1.8} />
            <span>Chat on WhatsApp</span>
          </a>
        </div>

        <div className="mt-14 md:mt-20 grid grid-cols-12 gap-8 md:gap-6 lg:gap-12">
          <div className="col-span-12 max-w-[820px] mx-auto w-full reveal">
            <div className="eyebrow mb-5 text-center">
              <span>Other ways to reach me</span>
            </div>
            <ul className="border-t border-[var(--rule-strong)]">
              {LINES.map((row) => (
                <li key={row.label} className="border-b border-[var(--rule-strong)]">
                  <a
                    href={row.href}
                    target={row.external ? "_blank" : undefined}
                    rel={row.external ? "noreferrer" : undefined}
                    data-testid={row.testid}
                    className="group flex items-baseline justify-between gap-6 py-6 transition-colors hover:text-[var(--cyan)]"
                  >
                    <span className="font-display text-[15px] text-[var(--ink-soft)] group-hover:text-[var(--cyan)] transition-colors">{row.label}</span>
                    <span className="font-display text-[15px] sm:text-[17px] text-[var(--ink)] group-hover:text-[var(--cyan)] transition-colors text-right break-all">{row.value}</span>
                  </a>
                </li>
              ))}
            </ul>
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
