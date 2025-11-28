# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

TD Studios is a web design and branding agency website built with Next.js 16, React 19, and modern JavaScript. The site specializes in web design, brand identity, and cannabis industry branding/packaging services. The project uses the Next.js App Router architecture with a minimal, clean structure.

The site currently features a "coming soon" landing page with glassmorphism effects and a NYC skyline background, with a preview mode for the full site.

## Development Commands

```bash
# Start development server (default: http://localhost:3000)
npm run dev

# Build for production
npm run build

# Start production server
npm start

# Run linter
npm run lint
```

## Git Repository

- **Remote**: `https://github.com/tdiorio2323/tdstudios-nextjs.git`
- **Main branch**: `main`
- **Deployment**: Vercel (`.vercel` directory present)

## Architecture & Structure

### App Router Structure

#### Main Pages
- `app/page.js` - Coming soon landing page with glassmorphism, email signup, and preview link
- `app/preview/page.js` - Preview of the full site
- `app/work/page.js` - Portfolio/work page
- `app/work/[slug]/page.js` - Dynamic case study pages (8 projects: apex-ventures, emerald-valley, modernist-studio, high-tide-collective, northwind-tech, terra-bloom, cascade-financial, green-state-labs)
- `app/about/page.js` - About page
- `app/contact/page.js` - Contact page with form
- `app/websites/page.js` - Websites service page
- `app/cannabis/page.js` - Cannabis branding service page
- `app/tdbranding/page.js` - TD Branding page
- `app/gallery/page.js` - Gallery page with dynamic image loading

#### Special Files
- `app/layout.js` - Root layout with metadata, fonts (Google Fonts + Benzin-Bold), SEO, and structured data
- `app/globals.css` - Global styles using CSS custom properties
- `app/loading.js` - Loading state component
- `app/not-found.js` - 404 error page
- `app/sitemap.js` - Dynamic sitemap generation
- `app/robots.js` - Robots.txt generation
- `app/opengraph-image.js` - Open Graph image generation

#### API Routes
- `app/api/gallery/route.js` - GET endpoint to fetch gallery images from `/public/gallery` directory

### Components

- `components/Navigation.js` - Client component with custom cursor, mobile menu, and navigation links
- `components/Footer.js` - Footer with social links and copyright
- `components/Loading.js` - Loading spinner component
- `components/ScrollReveal.js` - Scroll-based reveal animations
- `components/StructuredData.js` - JSON-LD structured data for SEO (Organization, LocalBusiness, Website schemas)

### Path Aliases

- `@/*` maps to the project root (configured in `jsconfig.json`)
- Use imports like `import Navigation from '@/components/Navigation'`

### Client vs Server Components

- **Client Components** (`'use client'`): Navigation (custom cursor, mobile menu), home page (email form)
- **Server Components** (default): Footer, most pages, API routes
- When adding interactivity, add `'use client'` directive at the top of the file

## Styling Conventions

### CSS Custom Properties (Design System)

**Neo Tokyo Theme** (current color scheme):
```css
--black: #0b0b0b
--white: #eeeeee
--cream: #d4d4d4
--sage: #a78bfa (purple - primary brand color)
--sage-dark: #7c3aed (darker purple)
--gold: #f472b6 (pink - accent color)
--charcoal: #18181b
--gray: #71717a
--light-gray: #a1a1aa
```

**Original Theme** (reference - may be used in some sections):
```css
--sage: #8b9a7d (green)
--gold: #c9a227 (yellow-gold)
```

### Typography

- **Primary font**: `Syne` (weights: 400, 500, 600, 700, 800)
- **Serif font**: `Instrument Serif` (used for emphasis and titles)
- **Logo font**: `Benzin-Bold` (custom font at `/public/fonts/Benzin-Bold.ttf`)
- Fonts loaded via Google Fonts in root layout + local @font-face for Benzin

### Key Styling Features

- **Custom cursor** with hover states (mix-blend-mode: difference)
- **Grain texture overlay** for visual depth
- **Glassmorphism effects** on coming soon page (backdrop-filter, blur, transparency)
- **Smooth scroll behavior** with prefers-reduced-motion support
- **BEM-style class naming** (e.g., `.hero`, `.hero-content`, `.hero-title`)
- **Responsive grid layouts** for services, work, values
- **Animation**: fadeUp, slideUp, scrollPulse, marquee

## SEO & Metadata Configuration

Metadata is configured in `app/layout.js`:
- **Base URL**: `https://tdstudiosny.com`
- **Default title template**: `%s | TD Studios`
- **OpenGraph and Twitter card images**: `/og-image.svg`
- **Favicon**: `/favicon.svg`
- **Keywords**: web design, branding, cannabis packaging, brand identity, NYC design agency
- **Structured Data**: Organization, LocalBusiness, and Website JSON-LD schemas injected via `StructuredData` component

When adding new pages, use Next.js metadata exports for SEO.

## Key Features to Maintain

### Navigation Component

- Custom cursor that follows mouse movement with hover state enlargement
- Mobile menu with overlay and body scroll lock
- Hover effects on all interactive elements
- Mix-blend-mode: difference for visibility on all backgrounds

### Coming Soon Landing Page

- **Glassmorphism card** with background blur and transparency
- **Animated gradient orbs** in background
- **NYC skyline background image** (`/images/nyc-skyline-bg.jpg`)
- **Email signup form** with success state
- **Social links** to Instagram and email
- **Preview link** to full site at `/preview`
- **Logo** using Benzin-Bold font with uppercase styling

### Content Patterns

- **Hero sections**: label → title → description → tags pattern
- **Service cards**: Numbered sections (01, 02, 03, 04)
- **Work items**: category/title/year metadata
- **Two-pillar design**: general creative services + cannabis industry expertise
- **Case studies**: Overview → Challenge → Solution → Results → Testimonial structure

## Dynamic Routes & Data

### Case Study Pages (`/work/[slug]`)

Case study data is hardcoded in `app/work/[slug]/page.js` with the following structure:

```javascript
{
  title, category, type, year, description,
  client, services[], duration,
  overview, challenge, solution,
  results[], testimonial: { quote, author, role }
}
```

**Available slugs**: apex-ventures, emerald-valley, modernist-studio, high-tide-collective, northwind-tech, terra-bloom, cascade-financial, green-state-labs

**Static generation**: Uses `generateStaticParams()` to pre-render all case study pages

### Gallery API

- **Endpoint**: `GET /api/gallery`
- **Functionality**: Scans `/public/gallery` directory for images
- **Supported formats**: .jpg, .jpeg, .png, .gif, .webp, .avif
- **Response**: `{ images: [{ name, url }] }` sorted by newest first
- **Error handling**: Returns empty array if directory doesn't exist or on error

## Image Handling

- Image optimization configured in `next.config.js`
- Formats: AVIF, WebP
- Device sizes: 640, 750, 828, 1080, 1200, 1920, 2048, 3840
- Image sizes: 16, 32, 48, 64, 96, 128, 256, 384
- Compression enabled
- Store images in `/public` directory

## Important Notes

- **No TypeScript**: Uses JavaScript with JSConfig for path aliases
- **No test framework configured**: Tests would need to be added if required
- **Static export ready**: Can enable `output: 'export'` in `next.config.js` for static site generation
- **Form handling**: Contact form currently has client-side state only (no backend submission configured)
- **Gallery**: Dynamically loads images from file system via API route
