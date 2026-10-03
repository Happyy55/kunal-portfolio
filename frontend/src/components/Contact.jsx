import { Mail, MessageSquare, Phone, Linkedin, ArrowRight, ArrowUpRight } from "lucide-react";
import { CONTACT } from "../data/contact";

const WHATSAPP_HELLO = `${CONTACT.whatsapp}?text=${encodeURIComponent("Hi Kunal, I'd like to talk about a project.")}`;

const CHANNELS = [
  { label: "Email", value: CONTACT.email, href: `mailto:${CONTACT.email}`, icon: Mail, accent: "var(--cyan)", testid: "social-email" },
  { label: "WhatsApp", value: CONTACT.phoneDisplay, href: WHATSAPP_HELLO, icon: MessageSquare, accent: "var(--cyan)", testid: "contact-whatsapp", external: true },
  { label: "Phone", value: CONTACT.phoneDisplay, href: `tel:${CONTACT.phone}`, icon: Phone, accent: "var(--violet)", testid: "contact-phone" },
  { label: "LinkedIn", value: "in/kunaljainstudio", href: CONTACT.linkedin, icon: Linkedin, accent: "var(--gold)", testid: "social-linkedin", external: true },
];

export const Contact = () => (
  <section id="contact" data-testid="contact-section" className="relative overflow-hidden">
    <div
      aria-hidden
      className="absolute pointer-events-none -top-[10%] left-1/2 -translate-x-1/2 w-[800px] max-w-[90vw] h-[600px] blur-[50px]"
      style={{
        background:
          "radial-gradient(circle at center, rgba(108,232,236,0.16) 0%, transparent 60%), radial-gradient(circle at center, rgba(168,121,255,0.12) 0%, transparent 65%)",
      }}
    />

    <div className="relative max-w-[1100px] mx-auto px-6 md:px-10 py-20 md:py-32">
      <div className="reveal text-center">
        <div className="section-mark mb-6 md:mb-8">Contact</div>
        <h2 className="font-tight text-[38px] sm:text-[54px] lg:text-[72px] leading-[1.04] text-[var(--ink)] max-w-[16ch] mx-auto">
          Got something <span className="text-[var(--cyan)]">worth building?</span>
        </h2>
        <p className="mt-6 md:mt-8 text-[16px] md:text-[17px] leading-[1.75] text-[var(--ink-soft)] max-w-[44ch] mx-auto">
          Tell me what you're making. I read everything and reply within a day.
        </p>

        <div className="mt-9 flex flex-wrap justify-center gap-3">
          <a href={`mailto:${CONTACT.email}`} data-testid="contact-cta-email" className="btn-primary btn-hero-lg">
            Email me <ArrowRight size={16} strokeWidth={1.7} />
          </a>
          <a href={WHATSAPP_HELLO} target="_blank" rel="noopener noreferrer" data-testid="contact-cta-whatsapp" className="btn-ghost btn-hero-lg">
            WhatsApp <ArrowUpRight size={16} strokeWidth={1.7} />
          </a>
        </div>
      </div>

      <ul className="reveal mt-14 md:mt-20 grid grid-cols-1 sm:grid-cols-2 gap-3 md:gap-4">
        {CHANNELS.map((c) => (
          <li key={c.label}>
            <a
              href={c.href}
              target={c.external ? "_blank" : undefined}
              rel={c.external ? "noopener noreferrer" : undefined}
              data-testid={c.testid}
              className="contact-channel"
              style={{ "--channel-accent": c.accent }}
            >
              <span className="contact-channel-icon">
                <c.icon size={18} strokeWidth={1.8} />
              </span>
              <span className="min-w-0">
                <span className="block eyebrow">{c.label}</span>
                <span className="block mt-1 truncate text-[15px] text-[var(--ink)]">{c.value}</span>
              </span>
            </a>
          </li>
        ))}
      </ul>
    </div>
  </section>
);

export default Contact;
