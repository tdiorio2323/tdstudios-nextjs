/**
 * Single source of truth for all case study and project data.
 * This module consolidates project information from across the codebase.
 */

// Complete case study data with all fields
export const caseStudies = [
  {
    id: 1,
    slug: "apex-ventures",
    name: "Apex Ventures",
    title: "Apex Ventures",
    category: "Web Design / Branding",
    type: "design",
    year: "2024",
    description: "Complete brand identity and website for a venture capital firm.",
    image: "/placeholders/work-apex-ventures.jpg",
    client: "Apex Ventures",
    services: ["Brand Identity", "Web Design", "UI/UX", "Development"],
    duration: "12 weeks",
    overview: "Apex Ventures needed a sophisticated digital presence that would position them as a premier venture capital firm while maintaining approachability for founders seeking investment.",
    challenge: "The venture capital space is crowded with firms that look identical. Apex needed to stand out while maintaining credibility with both investors and founders. The website needed to communicate their data-driven approach while remaining human and accessible.",
    solution: "We developed a complete brand system anchored by a bold, modern identity that balances professionalism with warmth. The website features an intuitive portfolio showcase, founder resources, and a streamlined contact process. Custom data visualizations bring their investment thesis to life.",
    results: [
      "150% increase in qualified founder applications",
      "3x improvement in time-to-contact metrics",
      "Featured in TechCrunch design spotlight",
      "Brand recognition increased 85% among target market"
    ],
    testimonial: {
      quote: "TD Studios transformed how founders perceive our firm. The new brand and website position us exactly where we need to be — credible, modern, and founder-friendly.",
      author: "Sarah Chen",
      role: "Managing Partner, Apex Ventures"
    }
  },
  {
    id: 2,
    slug: "emerald-valley",
    name: "Emerald Valley",
    title: "Emerald Valley",
    category: "Cannabis / Packaging",
    type: "cannabis",
    year: "2024",
    description: "Premium packaging design for a craft cannabis brand.",
    image: "/placeholders/work-emerald-valley.jpg",
    client: "Emerald Valley",
    services: ["Brand Identity", "Packaging Design", "Label Design", "Brand Guidelines"],
    duration: "8 weeks",
    overview: "Emerald Valley is a craft cannabis cultivator focused on small-batch, organic flower. They needed packaging that would reflect their premium positioning and artisanal approach while meeting all state compliance requirements.",
    challenge: "Cannabis packaging regulations are strict and vary by state. The packaging needed to stand out on dispensary shelves while conveying quality, craft, and natural cultivation practices — all within tight regulatory constraints.",
    solution: "We created a packaging system inspired by vintage botanical illustrations and natural materials. Each strain features custom illustrations that reflect the flower's unique characteristics. The system is fully compliant, scalable across product lines, and creates instant shelf presence.",
    results: [
      "Sold out first production run in 3 days",
      "Featured in Leafly's Best Packaging Awards",
      "40% increase in retail partners",
      "Premium pricing maintained 25% above category average"
    ],
    testimonial: {
      quote: "The packaging perfectly captures our craft approach. Customers tell us they buy Emerald Valley based on the packaging alone. It's become our best sales tool.",
      author: "Marcus Green",
      role: "Founder, Emerald Valley"
    }
  },
  {
    id: 3,
    slug: "modernist-studio",
    name: "Modernist Studio",
    title: "Modernist Studio",
    category: "Brand Identity",
    type: "design",
    year: "2024",
    description: "Visual identity system for an architecture firm.",
    image: "/placeholders/work-modernist-studio.jpg",
    client: "Modernist Studio",
    services: ["Brand Strategy", "Visual Identity", "Brand Guidelines", "Print Collateral"],
    duration: "10 weeks",
    overview: "Modernist Studio is an architecture firm specializing in contemporary residential design. They needed a brand identity that would reflect their design philosophy and appeal to high-net-worth clients.",
    challenge: "Architecture firms often struggle to differentiate their brand from their work. Modernist Studio needed an identity that could stand on its own while complementing their minimalist design aesthetic without competing with their portfolio.",
    solution: "We developed a refined visual system built on geometric precision and negative space. The identity system is intentionally restrained, using a sophisticated monochrome palette and custom typography that echoes their architectural philosophy. The result is a brand that feels like architecture itself.",
    results: [
      "Project inquiries increased 120%",
      "Average project value up 35%",
      "Won Best Brand Design at AIA Conference",
      "Featured in Architectural Digest"
    ],
    testimonial: {
      quote: "TD Studios understood our vision completely. The brand identity reflects our design philosophy in every detail. It's architectural in its precision and restraint.",
      author: "James Morrison",
      role: "Principal Architect, Modernist Studio"
    }
  },
  {
    id: 4,
    slug: "high-tide-collective",
    name: "High Tide Collective",
    title: "High Tide Collective",
    category: "Cannabis / Web",
    type: "cannabis",
    year: "2023",
    description: "E-commerce website and brand refresh for a dispensary chain.",
    image: "/placeholders/work-high-tide.jpg",
    client: "High Tide Collective",
    services: ["Web Design", "E-Commerce", "Brand Refresh", "POS Integration"],
    duration: "14 weeks",
    overview: "High Tide Collective operates three premium dispensaries in California. They needed a website that could handle online ordering, menu management, and educational content while reflecting their curated, boutique positioning.",
    challenge: "Cannabis e-commerce faces unique challenges: age verification, complex compliance requirements, real-time inventory sync across multiple locations, and the inability to use standard payment processors. The site needed to be both functional and beautiful.",
    solution: "We built a custom Next.js e-commerce platform integrated with their POS system. Real-time inventory management, location-based ordering, educational resources, and a seamless checkout experience. The design balances premium aesthetics with functional e-commerce.",
    results: [
      "Online orders increased 300% in first quarter",
      "Average order value up 45%",
      "Customer retention improved 60%",
      "Perfect 100 Lighthouse performance score"
    ],
    testimonial: {
      quote: "The website has become our primary revenue driver. Customers love the experience, and the back-end integration with our POS system saves us hours every day.",
      author: "Lisa Torres",
      role: "Co-Founder, High Tide Collective"
    }
  },
  {
    id: 5,
    slug: "northwind-tech",
    name: "Northwind Tech",
    title: "Northwind Tech",
    category: "Web Design",
    type: "design",
    year: "2023",
    description: "Marketing website for a SaaS startup.",
    image: "/placeholders/work-northwind-tech.jpg",
    client: "Northwind Tech",
    services: ["Web Design", "Development", "Content Strategy", "SEO"],
    duration: "10 weeks",
    overview: "Northwind Tech offers project management software for distributed teams. As a early-stage startup, they needed a website that could clearly communicate their value proposition and convert free trial signups.",
    challenge: "SaaS websites need to balance technical credibility with approachability. The site needed to explain complex features simply, showcase social proof despite being a young company, and optimize every element for conversion.",
    solution: "We designed a conversion-focused website with clear messaging hierarchy, interactive product demos, and strategic CTAs throughout the journey. Benefit-driven copy, social proof placement, and a frictionless signup flow all optimized for conversion.",
    results: [
      "Free trial signups increased 215%",
      "Conversion rate improved from 2.3% to 8.1%",
      "Organic traffic up 180% in 6 months",
      "Average session duration increased 95%"
    ],
    testimonial: {
      quote: "TD Studios didn't just design a website — they architected a conversion machine. Every element is intentional and drives toward signup. Our growth metrics speak for themselves.",
      author: "David Park",
      role: "CEO, Northwind Tech"
    }
  },
  {
    id: 6,
    slug: "terra-bloom",
    name: "Terra Bloom",
    title: "Terra Bloom",
    category: "Cannabis / Branding",
    type: "cannabis",
    year: "2023",
    description: "Full brand identity and packaging for a wellness-focused cannabis brand.",
    image: "/placeholders/work-terra-bloom.jpg",
    client: "Terra Bloom",
    services: ["Brand Strategy", "Visual Identity", "Packaging Design", "Content Strategy"],
    duration: "12 weeks",
    overview: "Terra Bloom is a cannabis wellness brand targeting health-conscious consumers, particularly women. They needed a brand that felt premium and wellness-oriented while being distinctly cannabis.",
    challenge: "Cannabis brands often fall into one of two camps: medical/clinical or recreational/lifestyle. Terra Bloom needed to occupy a new space: approachable wellness. The brand needed to attract health-conscious consumers who might be new to cannabis.",
    solution: "We developed a sophisticated brand identity inspired by botanical wellness brands. Soft, natural color palette, elegant typography, and botanical illustrations create a welcoming aesthetic. The packaging feels more like a premium skincare product than traditional cannabis packaging.",
    results: [
      "Launched in 45 retail locations in first month",
      "Female customers represent 70% of sales",
      "Featured in Vogue's Cannabis Wellness Guide",
      "Expansion to 3 new states in year one"
    ],
    testimonial: {
      quote: "TD Studios created a brand that welcomes people who never thought cannabis was for them. The response from our target demographic has been overwhelming.",
      author: "Amanda Foster",
      role: "Founder, Terra Bloom"
    }
  },
  {
    id: 7,
    slug: "cascade-financial",
    name: "Cascade Financial",
    title: "Cascade Financial",
    category: "Brand Identity",
    type: "design",
    year: "2023",
    description: "Rebrand for a financial services company.",
    image: "/placeholders/work-cascade-financial.jpg",
    client: "Cascade Financial",
    services: ["Brand Strategy", "Visual Identity", "Brand Guidelines", "Website Design"],
    duration: "16 weeks",
    overview: "Cascade Financial is a boutique wealth management firm. After 15 years with their original brand, they needed a refresh to appeal to a younger generation of high-net-worth clients while maintaining trust with existing clients.",
    challenge: "Financial services branding must balance innovation with trust. The rebrand needed to feel modern and forward-thinking without losing the gravitas and credibility that existing clients expect from their wealth advisor.",
    solution: "We evolved the brand with a refined, contemporary identity that maintains equity in the Cascade name while introducing modern design elements. Sophisticated typography, strategic use of color, and professional photography create a brand that feels both established and progressive.",
    results: [
      "Client acquisition increased 55%",
      "Average client age decreased by 8 years",
      "95% positive feedback from existing clients",
      "Assets under management grew 40% year-over-year"
    ],
    testimonial: {
      quote: "The rebrand struck the perfect balance. We're attracting younger clients without alienating our base. TD Studios navigated that challenge brilliantly.",
      author: "Robert Hansen",
      role: "Managing Director, Cascade Financial"
    }
  },
  {
    id: 8,
    slug: "green-state-labs",
    name: "Green State Labs",
    title: "Green State Labs",
    category: "Cannabis / Packaging",
    type: "cannabis",
    year: "2023",
    description: "Product line packaging for a cannabis testing laboratory.",
    image: "/placeholders/work-green-state-labs.jpg",
    client: "Green State Labs",
    services: ["Packaging Design", "Label Design", "Brand System", "Production Management"],
    duration: "6 weeks",
    overview: "Green State Labs is a cannabis testing facility offering compliant testing services to cultivators and manufacturers. They needed packaging for their testing kits and sample containers that conveyed scientific credibility.",
    challenge: "Laboratory packaging must communicate precision, compliance, and professionalism. The packaging needed to work in clinical settings while maintaining brand recognition and differentiating from competitors in a commoditized market.",
    solution: "We designed a clean, scientific packaging system using clinical white with strategic color coding for different test types. Clear typography, intuitive labeling, and tamper-evident features create a system that's both functional and distinctive.",
    results: [
      "B2B sales increased 85%",
      "Sample contamination reduced to near-zero",
      "Adopted by 3 major MSOs as preferred testing partner",
      "Packaging system licensed to 2 out-of-state labs"
    ],
    testimonial: {
      quote: "The packaging system is brilliant in its simplicity. It communicates exactly what we do and how we do it. Our clients trust the product before they even see results.",
      author: "Dr. Michael Chen",
      role: "Chief Science Officer, Green State Labs"
    }
  }
];

// Create a lookup map by slug for easy access
export const caseStudiesBySlug = Object.fromEntries(
  caseStudies.map(cs => [cs.slug, cs])
);

// Export a simple array of slugs for static generation
export const caseStudySlugs = caseStudies.map(cs => cs.slug);

// Helper function to get case study by slug
export function getCaseStudyBySlug(slug) {
  return caseStudiesBySlug[slug] || null;
}

// Helper function to filter case studies by type
export function getCaseStudiesByType(type) {
  if (type === 'all' || !type) {
    return caseStudies;
  }
  return caseStudies.filter(cs => cs.type === type);
}