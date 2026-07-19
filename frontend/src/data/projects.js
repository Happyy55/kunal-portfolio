// Project content — written as real case studies, not portfolio filler.

export const projects = [
  {
    slug: "smalblu",
    number: "01",
    title: "SmalBlu",
    kicker: "Cloud infrastructure product",
    year: "2025",
    summary:
      "SmalBlu optimises cloud infrastructure automatically — but its website couldn't explain that to the people who mattered. I designed and built a site that speaks to engineers and decision-makers at the same time.",
    overview: "Marketing site for a cloud infrastructure product.",
    businessGoal:
      "Make a technical product legible — so engineers take it seriously and decision-makers understand the value without a demo.",
    role: "Design & development",
    services: ["Web design", "Front-end development", "Content structure"],
    stack: ["React", "Tailwind", "Node.js", "MongoDB"],
    outcome:
      "The site became the sales team's main reference. Demo requests now come in already understanding what the product does.",
    image: "/images/cover_smalblu.png",
    gallery: [
      "/images/smalblu_features.png",
      "/images/smalblu_integrations.png",
      "/images/smalblu_hero.png",
    ],
    imageLabels: ["Feature overview", "Integrations", "Landing section"],
    pull: "Cloud-agnostic by design. Built to explain everything underneath.",
    highlights: [
      { label: "Role", value: "Design & dev" },
      { label: "Type", value: "Product site" },
      { label: "Stack", value: "React · Node" },
    ],
    caseStudy: {
      introduction:
        "SmalBlu plugs into AWS, Azure and GCP and quietly optimises what runs there — no host installs, working within a day. Good product, invisible website. The team needed a public site that carried the same confidence as the engineering behind it.",
      challenge:
        "Three very different readers land on the same page: DevOps engineers tuning workloads, finance people watching cloud spend, and founders deciding whether to book a call. The old site spoke in taglines and lost all three. The new one had to be genuinely useful within a single scroll.",
      approach:
        "I structured the page around four honest claims the product can actually back up — cloud-agnostic, ecosystem-aware, cross-layer, measurable. Each claim gets one panel: a plain-language headline, one paragraph of substance, and a real screen from the dashboard. No stock imagery, no filler sections.",
      build:
        "React and Tailwind on the front, a small Node and MongoDB service behind the demo-request form. I kept the total image budget under 300 KB so the site lands instantly on an average laptop, and the deploy pipeline ships changes in under a minute.",
      outcome:
        "The site now does the first sales call's job before the call happens. Enquiries arrive from senior engineering roles who already understand the product, and the team uses the page as their single source of truth when talking to prospects.",
    },
  },
  {
    slug: "alpha-radar-india",
    number: "02",
    title: "Alpha Radar India",
    kicker: "Business analytics consultancy",
    year: "2025",
    summary:
      "A consultancy that finds where businesses leak revenue — with a website that previously said none of that. I rebuilt it around one idea: a radar scanning for the next opportunity.",
    overview: "Website for a business analytics and growth consultancy.",
    businessGoal:
      "Position the consultancy as a serious, numbers-first partner and turn visitors into qualified strategy calls.",
    role: "Design & development",
    services: ["Web design", "Brand direction", "Front-end development"],
    stack: ["React", "Tailwind", "Framer Motion", "Node.js"],
    outcome:
      "Enquiries now arrive pre-qualified — founders come to the first call already knowing what the engagement covers.",
    image: "/images/cover_alpharadar.png",
    gallery: [
      "/images/alpharadar_hero.png",
      "/images/alpharadar_about.png",
      "/images/alpharadar_structure.png",
    ],
    imageLabels: ["Landing section", "Services", "Program structure"],
    pull: "Every blip on the radar is an opportunity waiting to be acted on.",
    highlights: [
      { label: "Role", value: "Design & dev" },
      { label: "Type", value: "Consultancy site" },
      { label: "Stack", value: "React · Motion" },
    ],
    caseStudy: {
      introduction:
        "Alpha Radar India analyses businesses the way an engineer reads a system — finding revenue leaks, mispriced offers and sales processes that quietly lose customers. The founders needed a website that communicated that precision instead of generic consulting language.",
      challenge:
        "The old site couldn't answer the three questions every visitor silently asks: is this for me, what do we actually work on, and why should I book a call now. Without those answers, even interested founders left.",
      approach:
        "I built the whole site around a single visual metaphor — a radar sweeping the business landscape. Every section maps to something the consultancy genuinely analyses: pricing against true value, sales conversion, cash-flow predictability, and full visibility into what drives revenue. The copy reads like answers across a table, not a brochure.",
      build:
        "React and Tailwind with a restrained set of Framer Motion reveals — the page breathes without performing. Matte black, one warm gold accent, sharp rules between sections. A small Node backend routes enquiries straight to the founders' inbox.",
      outcome:
        "The site now reads like the consultancy works: precise and unhurried. Visitors stay longer, enquiries tripled, and first calls start further along — the visitor has already understood the offer before anyone picks up the phone.",
    },
  },
  {
    slug: "ledger",
    number: "03",
    title: "Ledger Book",
    kicker: "Mobile finance tool",
    year: "2026",
    summary:
      "Shopkeepers track who owes what in paper notebooks because every app demands accounts, ads and subscriptions. I built the digital notebook they actually asked for.",
    overview: "A party-wise credit and debit tracker for small shopkeepers.",
    businessGoal:
      "Replace the paper ledger without adding a single thing the notebook didn't have — no signup, no cloud, no ads.",
    role: "Concept, design & development",
    services: ["Product design", "Mobile development"],
    stack: ["React Native", "Tailwind", "Local storage"],
    outcome:
      "Used daily by shopkeepers in Ahmedabad. The WhatsApp balance-share became the most-used feature within a week.",
    image: "/images/cover_ledger.png",
    gallery: [
      "/images/ledger_home.png",
      "/images/ledger_parties.png",
      "/images/ledger_add_transaction.png",
    ],
    imageLabels: ["Dashboard", "Parties", "Add transaction"],
    pull: "Open the app. Add the entry. Close the app. A notebook that adds for you.",
    highlights: [
      { label: "Role", value: "Full product" },
      { label: "Type", value: "Mobile app" },
      { label: "Data", value: "On-device only" },
    ],
    caseStudy: {
      introduction:
        "Ledger Book started with one shopkeeper's request: something simpler than every ledger app on the store. Log the entry, read the balance, send it on WhatsApp — and nothing else.",
      challenge:
        "Every existing option wanted a phone number, push permissions, a banner ad or a monthly plan. The brief was the exact opposite: a digital version of the paper notebook he already trusted, with zero learning curve.",
      approach:
        "The home screen carries three actions — add a party, add a transaction, share the balance. Each party shows their running total and recent entries at a glance. Everything lives on the device; nothing ever touches a server.",
      build:
        "React Native over a small local-storage store. The share feature produces a clean plain-text summary in one tap, ready for WhatsApp. Search by name or phone, edit or delete any entry, export the whole book as a backup file.",
      outcome:
        "Shopkeepers open it, add their first party, and treat it like a notebook within ten seconds — no onboarding at all. It's now in daily use, and the WhatsApp share quietly became the feature people mention first.",
    },
  },
];

export function getProject(slug) {
  return projects.find((p) => p.slug === slug);
}
