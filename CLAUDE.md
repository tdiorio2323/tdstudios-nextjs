# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

TD Studios is a web design and branding agency website built with Next.js 16, React 19, Tailwind CSS 3.4, and modern JavaScript. The site specializes in web design, brand identity, and cannabis industry branding/packaging services. The project uses the Next.js App Router architecture with a component-based structure.

**Tech Stack:**
- Next.js 16 (App Router)
- React 19
- Tailwind CSS 3.4 (with custom config)
- Supabase (for media storage)
- JavaScript (no TypeScript)

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
- `app/page.js` - Home page with hero, services, work sections, and CTA
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

**Layout & Navigation:**
- `components/Navigation.js` - Client component with custom cursor, mobile menu, grain overlay, and navigation links
- `components/Footer.js` - Footer with social links and copyright

**Page Sections:**
- `components/Hero.js` - Hero section component
- `components/Services.js` - Services overview component
- `components/ServiceCard.js` - Individual service card
- `components/Work.js` - Work/portfolio grid component
- `components/HomeSections.js` - Exports Marquee, Approach, and CTA sections
- `components/CTA.js` - Reusable call-to-action section with customizable title, subtitle, and buttons

**Utilities:**
- `components/Loading.js` - Loading spinner component
- `components/ScrollReveal.js` - Scroll-based reveal animations (client component)
- `components/StructuredData.js` - JSON-LD structured data for SEO (Organization, LocalBusiness, Website schemas)

### Data & Configuration

- `lib/visuals.js` - **Central configuration for all visual assets** (hero images, portfolio projects, service icons, gallery images, cannabis imagery). This is the single source of truth for image paths across the site.
- `lib/supabase.js` - Supabase client configuration with helper functions: `getDesigns()`, `getDesignUrl(path)`. Used for fetching images from Supabase storage bucket 'designs'.

### Path Aliases

- `@/*` maps to the project root (configured in `jsconfig.json`)
- Use imports like `import Navigation from '@/components/Navigation'`

### Client vs Server Components

- **Client Components** (`'use client'`): Navigation (custom cursor, mobile menu), ScrollReveal, any component with state/effects
- **Server Components** (default): Footer, most pages, API routes, StructuredData
- When adding interactivity (useState, useEffect, event handlers), add `'use client'` directive at the top of the file

### Component Architecture Pattern

Pages are composed from smaller, focused components:
- Main pages (e.g., `app/page.js`) import and compose section components
- Section components (e.g., Hero, Services, Work) are self-contained
- The home page pattern: `Navigation → Hero → Services → Work → Marquee → Approach → CTA → Footer`
- Case study pages follow a structured narrative: `Hero → Image → Overview → Challenge → Solution → Results → Testimonial → CTA`

## Styling Conventions

### Tailwind CSS + CSS Custom Properties

The project uses **Tailwind CSS 3.4** with custom configuration (`tailwind.config.js`) that extends the default theme with brand colors. Tailwind utility classes are used throughout components alongside traditional CSS when needed.

### CSS Custom Properties (Design System)

**Color Palette** (defined in both `globals.css` and `tailwind.config.js`):
```css
--black: #0b0b0b
--white: #eeeeee
--cream: #d4d4d4
--purple: #a78bfa (primary brand color)
--purple-dark: #7c3aed (darker purple)
--pink: #f472b6 (accent color)
--charcoal: #18181b
--gray: #71717a
--light-gray: #a1a1aa
```

**Tailwind Access:** Use as `bg-purple`, `text-pink`, `bg-charcoal`, etc.

### Typography

- **Primary font**: `Syne` (weights: 400, 500, 600, 700, 800) - loaded via Google Fonts
- **Serif font**: `Instrument Serif` (used for emphasis and titles) - loaded via Google Fonts
- **Logo font**: `Benzin-Bold` (custom font at `/public/fonts/Benzin-Bold.ttf`) - loaded via @font-face
- **Tailwind access**: `font-sans` (Syne), `font-serif` (Instrument Serif)

### Key Styling Features

- **Tailwind utility classes** for most styling (spacing, layout, colors, typography)
- **Custom cursor** with hover states (`.cursor` class, mix-blend-mode: difference)
- **Grain texture overlay** (`.grain` class) for visual depth across all pages
- **Glassmorphism effects** using backdrop-filter, blur, and transparency
- **Smooth scroll behavior** (configured in globals.css @layer base)
- **Responsive grid layouts** using Tailwind's grid utilities
- **Custom animations** defined in globals.css: fadeUp, slideUp, scrollPulse, marquee

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

**Two image sources:**
1. **Local images** in `/public` directory (favicons, logos, placeholders)
2. **Supabase Storage** via `lib/supabase.js` for production designs

**Image optimization** (configured in `next.config.js`):
- Formats: AVIF, WebP
- Device sizes: 640, 750, 828, 1080, 1200, 1920, 2048, 3840
- Image sizes: 16, 32, 48, 64, 96, 128, 256, 384
- Compression enabled
- Remote patterns configured for Supabase CDN: `crpalakzdzvtgvljlutd.supabase.co`

**Image paths management:**
- All visual asset paths are centralized in `lib/visuals.js`
- When adding new images, update this file to maintain consistency
- Use Next.js `<Image>` component for optimization

## Supabase Integration

**Configuration:**
- Client initialized in `lib/supabase.js`
- Environment variables: `NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- Storage bucket: `designs`

**Helper functions:**
- `getDesigns()` - Fetches list of designs from Supabase storage (max 100, sorted by newest)
- `getDesignUrl(path)` - Returns public URL for a design file

**Usage:** Import from `@/lib/supabase` when fetching remote images.

## Important Notes

- **No TypeScript**: Uses JavaScript with JSConfig for path aliases
- **Tailwind CSS**: Use utility classes first, custom CSS in globals.css when needed
- **No test framework configured**: Tests would need to be added if required
- **Static export ready**: Can enable `output: 'export'` in `next.config.js` for static site generation
- **Form handling**: Contact form currently has client-side state only (no backend submission configured)
- **Gallery**: Dynamically loads images from file system via API route
- **Visual assets**: Always reference `lib/visuals.js` for image paths to maintain consistency