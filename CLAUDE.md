# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

TD Studios is a web design and branding agency website built with Next.js 16, React 19, and modern JavaScript. The site specializes in web design, brand identity, and cannabis industry branding/packaging services. The project uses the Next.js App Router architecture with a minimal, clean structure.

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

## Architecture & Structure

### App Router Structure
- `/app` - Next.js App Router pages and layouts
  - `layout.js` - Root layout with metadata, fonts (Google Fonts: Instrument Serif, Syne), and SEO configuration
  - `page.js` - Home page with hero, services, work showcase, and CTA sections
  - `/work/page.js` - Portfolio/work page
  - `/about/page.js` - About page
  - `/contact/page.js` - Contact page
  - `globals.css` - Global styles using CSS custom properties

### Components
- `/components` - Reusable React components
  - `Navigation.js` - Client component with custom cursor, mobile menu, and navigation links
  - `Footer.js` - Footer with social links and copyright

### Path Aliases
- `@/*` maps to the project root (configured in `jsconfig.json`)
- Use imports like `import Navigation from '@/components/Navigation'`

### Client vs Server Components
- Navigation is a client component (`'use client'`) due to interactive features (custom cursor, mobile menu state)
- Footer and most pages are server components (default in App Router)
- When adding interactivity, add `'use client'` directive at the top of the file

## Styling Conventions

### CSS Custom Properties (Design System)
```css
--black: #0a0a0a
--white: #f5f5f0
--cream: #e8e4dc
--sage: #8b9a7d (brand color)
--sage-dark: #6b7a5d
--gold: #c9a227 (accent color)
--charcoal: #1a1a1a
--gray: #888
--light-gray: #bbb
```

### Typography
- Primary font: `Syne` (weights: 400, 500, 600, 700, 800)
- Serif font: `Instrument Serif` (used for emphasis)
- Fonts loaded via Google Fonts in root layout

### Key Styling Features
- Custom cursor with hover states (mix-blend-mode: difference)
- Grain texture overlay
- Smooth scroll behavior
- BEM-style class naming (e.g., `.hero`, `.hero-content`, `.hero-title`)

## SEO & Metadata Configuration

Metadata is configured in `app/layout.js`:
- Base URL: `https://tdstudiosny.com`
- Default title template: `%s | TD Studios`
- OpenGraph and Twitter card images: `/og-image.svg`
- Favicon: `/favicon.svg`
- Keywords focus: web design, branding, cannabis packaging, NYC design agency

When adding new pages, use Next.js metadata exports for SEO.

## Key Features to Maintain

### Navigation Component
- Custom cursor that follows mouse movement
- Mobile menu with overlay
- Body scroll lock when mobile menu is open
- Hover effects on all interactive elements

### Content Structure
- Hero sections with label → title → description → tags pattern
- Service cards with numbered sections (01, 02, 03, 04)
- Work items with category/title/year metadata
- Two-pillar design: general creative services + cannabis industry expertise

## Important Notes

- This is NOT a git repository (no version control initialized)
- No test framework configured
- No TypeScript (uses JavaScript with JSConfig for path aliases)
- Static site ready - can enable `output: 'export'` in `next.config.js` for static exports
- Deployed to Vercel (`.vercel` directory present)
