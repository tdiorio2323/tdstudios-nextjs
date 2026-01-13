# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

TD Studios is a web design and branding agency website built with Next.js 16, React 19, Tailwind CSS 3.4, and JavaScript (no TypeScript). The site uses the Next.js App Router architecture with Supabase for media storage.

## Development Commands

```bash
npm run dev      # Start dev server (http://localhost:3000)
npm run build    # Production build
npm start        # Start production server
npm run lint     # Run linter
```

## Architecture

### App Router Pages

**Main Pages:** `app/page.js` (home), `app/about/`, `app/contact/`, `app/services/`, `app/cannabis/`, `app/websites/`, `app/tdbranding/`

**Content Pages:** `app/blog/`, `app/faq/`, `app/process/`, `app/gallery/`

**Catalog Pages:**
- `app/designs/` - Design catalog from Supabase with category filtering and anti-save protections
- `app/gsopackaging/` - Same as designs but with GSO Packaging branding/watermarks

**API:** `app/api/gallery/route.js` - GET endpoint for gallery images from `/public/gallery`

### Key Data Files

- `lib/visuals.js` - **Central source of truth** for all visual asset paths (hero images, portfolio, service icons)
- `lib/catalogConfig.js` - Catalog categories, matchers, and page configs for `/designs` and `/gsopackaging`
- `lib/blog.js` - Blog post data with `getBlogPostBySlug()`, `getBlogPostsByCategory()`, `blogSlugs`
- `lib/supabase.js` - Supabase client with `getDesigns()`, `getDesignUrl(path)`
- `lib/storage.js` - Comprehensive Supabase storage utilities with recursive listing and pagination

### Component Patterns

**Reusable Layout:** `PageLayout.js` wraps pages with Navigation + Footer. `PageHeader.js` provides consistent hero sections with label → title → description pattern.

**Catalog System:** `components/catalog/` contains modular components (CatalogGrid, CategoryFilter, DesignCard, Pagination) used by both `/designs` and `/gsopackaging`.

**Client vs Server:** Add `'use client'` for components with state/effects (Navigation, catalog components). Server components are default.

### Path Aliases

`@/*` maps to project root via `jsconfig.json`. Use: `import Navigation from '@/components/Navigation'`

## Styling

**Tailwind + Custom Properties:** Brand colors defined in both `globals.css` and `tailwind.config.js`:
- `--purple` / `bg-purple`: #a78bfa (primary brand)
- `--pink` / `text-pink`: #f472b6 (accent)
- `--black`, `--white`, `--cream`, `--charcoal`, `--gray`

**Fonts:** Syne (primary, `font-sans`), Instrument Serif (`font-serif`), Benzin-Bold (logo, `/public/fonts/`)

**Key Visual Features:** Custom cursor with mix-blend-mode, grain texture overlay (`.grain`), glassmorphism effects

## Supabase Integration

**Environment Variables (required):**
```bash
NEXT_PUBLIC_SUPABASE_URL=https://ecdastbzvypuidplpryf.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=<your-key>
```

**Storage:** Bucket `catalog` (or `designs/catalog`). The `lib/storage.js` has `detectBucketConfig()` to auto-detect working configuration.

**Anti-Save Protection:** Catalog pages use `hooks/useAntiSaveProtection.js` for context menu blocking, drag prevention, and keyboard shortcut blocking. Multiple watermark layers protect images.

## SEO

Metadata in `app/layout.js`:
- Base URL: `https://tdstudiosny.com`
- Title template: `%s | TD Studios`
- `StructuredData.js` injects Organization, LocalBusiness, Website JSON-LD schemas

## Deployment

Vercel (`.vercel` directory present). Remote: `https://github.com/tdiorio2323/tdstudios-nextjs.git`
