/**
 * Central configuration for all visual assets across the TD Studios website.
 * 
 * INSTRUCTIONS:
 * 1. Drop your real image files into the /public/placeholders/ folder (or any subfolder in /public/).
 * 2. Update the paths below to point to your new files (e.g., "/placeholders/my-hero.jpg").
 * 3. The site will automatically update to show your new visuals.
 */

// Hero Section Visual
export const heroVisual = {
  // TODO: Drop your main hero visual into /public/placeholders and update this path
  src: "/placeholders/hero-main.jpg",
  alt: "TD Studios - Premium Web Design & Branding",
};

// Portfolio/Work Projects
export const portfolioProjects = [
  {
    id: 1,
    slug: "apex-ventures",
    name: "Apex Ventures",
    category: "Web Design / Branding",
    type: "design",
    year: "2024",
    description: "Complete brand identity and website for a venture capital firm.",
    // TODO: Drop project image into /public/placeholders and update path
    image: "/placeholders/work-apex-ventures.jpg",
  },
  {
    id: 2,
    slug: "emerald-valley",
    name: "Emerald Valley",
    category: "Cannabis / Packaging",
    type: "cannabis",
    year: "2024",
    description: "Premium packaging design for a craft cannabis brand.",
    // TODO: Drop project image into /public/placeholders and update path
    image: "/placeholders/work-emerald-valley.jpg",
  },
  {
    id: 3,
    slug: "modernist-studio",
    name: "Modernist Studio",
    category: "Brand Identity",
    type: "design",
    year: "2024",
    description: "Visual identity system for an architecture firm.",
    // TODO: Drop project image into /public/placeholders and update path
    image: "/placeholders/work-modernist-studio.jpg",
  },
  {
    id: 4,
    slug: "high-tide-collective",
    name: "High Tide Collective",
    category: "Cannabis / Web",
    type: "cannabis",
    year: "2023",
    description: "E-commerce website and brand refresh for a dispensary chain.",
    // TODO: Drop project image into /public/placeholders and update path
    image: "/placeholders/work-high-tide.jpg",
  },
  {
    id: 5,
    slug: "northwind-tech",
    name: "Northwind Tech",
    category: "Web Design",
    type: "design",
    year: "2023",
    description: "Marketing website for a SaaS startup.",
    // TODO: Drop project image into /public/placeholders and update path
    image: "/placeholders/work-northwind-tech.jpg",
  },
  {
    id: 6,
    slug: "terra-bloom",
    name: "Terra Bloom",
    category: "Cannabis / Branding",
    type: "cannabis",
    year: "2023",
    description: "Full brand identity and packaging for a wellness-focused cannabis brand.",
    // TODO: Drop project image into /public/placeholders and update path
    image: "/placeholders/work-terra-bloom.jpg",
  },
  {
    id: 7,
    slug: "cascade-financial",
    name: "Cascade Financial",
    category: "Brand Identity",
    type: "design",
    year: "2023",
    description: "Rebrand for a financial services company.",
    // TODO: Drop project image into /public/placeholders and update path
    image: "/placeholders/work-cascade-financial.jpg",
  },
  {
    id: 8,
    slug: "green-state-labs",
    name: "Green State Labs",
    category: "Cannabis / Packaging",
    type: "cannabis",
    year: "2023",
    description: "Product line packaging for a cannabis testing laboratory.",
    // TODO: Drop project image into /public/placeholders and update path
    image: "/placeholders/work-green-state-labs.jpg",
  },
];

// Service Icons
export const serviceIcons = {
  // TODO: Drop SVG icons into /public/placeholders and update paths
  // Keys match the IDs used in the services section
  "website-design": "/placeholders/icon-website-design.svg",
  "brand-identity": "/placeholders/icon-branding.svg",
  "packaging-design": "/placeholders/icon-packaging.svg",
  "graphic-design": "/placeholders/icon-graphic-design.svg",
};

// Gallery Images
export const galleryImages = [
  // TODO: Drop gallery images into /public/placeholders and add entries here
  { src: "/placeholders/gallery-01.jpg", alt: "Portfolio work sample 1" },
  { src: "/placeholders/gallery-02.jpg", alt: "Portfolio work sample 2" },
  { src: "/placeholders/gallery-03.jpg", alt: "Portfolio work sample 3" },
  { src: "/placeholders/gallery-04.jpg", alt: "Portfolio work sample 4" },
  { src: "/placeholders/gallery-05.jpg", alt: "Portfolio work sample 5" },
  { src: "/placeholders/gallery-06.jpg", alt: "Portfolio work sample 6" },
];

// Cannabis-Specific Imagery
export const cannabisShots = [
  // TODO: Drop cannabis project images into /public/placeholders and add entries here
  { src: "/placeholders/cannabis-packaging-01.jpg", alt: "Cannabis packaging design example 1" },
  { src: "/placeholders/cannabis-packaging-02.jpg", alt: "Cannabis packaging design example 2" },
  { src: "/placeholders/cannabis-packaging-03.jpg", alt: "Cannabis packaging design example 3" },
  { src: "/placeholders/cannabis-branding-01.jpg", alt: "Cannabis branding example 1" },
  { src: "/placeholders/cannabis-branding-02.jpg", alt: "Cannabis branding example 2" },
  { src: "/placeholders/cannabis-web-01.jpg", alt: "Cannabis website design example" },
];

// About Page Visual
export const aboutVisual = {
  // TODO: Drop studio/team photo into /public/placeholders and update path
  src: "/placeholders/about-studio.jpg",
  alt: "TD Studios workspace in New York",
};
