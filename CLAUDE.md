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
npm run storage:audit  # Audit Supabase storage bucket contents
```

## Architecture

### App Router Pages

**Main Pages:** `app/page.js` (home), `app/about/`, `app/contact/`, `app/services/`, `app/cannabis/`

**Content Pages:** `app/blog/`, `app/blog/[slug]/`, `app/faq/`, `app/process/`

**Catalog Pages:**
- `app/designs/` - Main design catalog from Supabase with category filtering and anti-save protections
- `app/gsopackaging/` - Same catalog system but with GSO Packaging branding/watermarks

**Brand-Specific Catalogs:** Each brand has a page + API route fetching from a Supabase folder:
- `/nerds` → `app/api/nerds/` → Supabase `designs/NERDS/`
- `/flipz` → `app/api/flipz/` → Supabase `designs/FLIPZ/`
- `/pocky` → `app/api/pocky/` → Supabase `designs/POCKY/`
- `/faygo` → `app/api/faygo/` → Supabase `designs/FAYGO/`
- `/vday` → `app/api/vday/` → Supabase `designs/VDAY/`

**API Routes:**
- `app/api/storage-debug/` - Diagnostic endpoint for Supabase storage configuration
- `app/api/{brand}/` - Brand catalog endpoints (use `SUPABASE_SERVICE_ROLE_KEY`)

### Key Data Files

- `lib/visuals.js` - Central source of truth for all visual asset paths (hero images, portfolio, service icons)
- `lib/catalogConfig.js` - Catalog categories, filename-based matchers, and `catalogConfigs` for all catalog pages (designs, gsopackaging, and brand-specific)
- `lib/blog.js` - Blog post data with `getBlogPostBySlug()`, `getBlogPostsByCategory()`, `blogSlugs`
- `lib/supabase.js` - Supabase client initialization with environment variable validation
- `lib/storage.js` - Storage utilities with recursive listing, pagination, and `detectBucketConfig()` for auto-detecting working bucket configuration

### Component Patterns

**Reusable Layout:** `PageLayout.js` wraps pages with Navigation + Footer. `PageHeader.js` provides consistent hero sections with label, title, description pattern.

**Catalog System:** `components/catalog/` contains modular components (CatalogGrid, CategoryFilter, DesignCard, Pagination, LoadingSpinner, ErrorState, EmptyState) used by both `/designs` and `/gsopackaging`. Barrel export via `components/catalog/index.js`.

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

**Environment Variables (required in `.env.local`):**
```
NEXT_PUBLIC_SUPABASE_URL=https://ecdastbzvypuidplpryf.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=<your-key>
SUPABASE_SERVICE_ROLE_KEY=<your-service-role-key>  # Required for brand API routes
```

**Storage:** Bucket `designs` with root path `catalog`. The `lib/storage.js` exports `STORAGE_CONFIG` for this and `detectBucketConfig()` to auto-detect working configuration. Remote images are allowed via `next.config.mjs` `remotePatterns`.

**Anti-Save Protection:** Catalog pages use `hooks/useAntiSaveProtection.js` for context menu blocking, drag prevention, and keyboard shortcut blocking. Multiple watermark layers protect images.

**Adding a New Brand Catalog:**
1. Create Supabase folder: `designs/BRANDNAME/` (uppercase)
2. Add config to `catalogConfigs` in `lib/catalogConfig.js`
3. Create API route `app/api/brandname/route.js` (copy from existing, change folder name)
4. Create page `app/brandname/page.js` (copy from existing, change config key and API endpoint)

## SEO

Metadata in `app/layout.js`:
- Base URL: `https://tdstudiosny.com`
- Title template: `%s | TD Studios`
- `StructuredData.js` injects Organization, LocalBusiness, Website JSON-LD schemas

## Deployment

Vercel. Remote: `https://github.com/tdiorio2323/tdstudios-nextjs.git`

## Notes

- ES modules: `"type": "module"` in package.json, config files use `.mjs` extension
- No TypeScript — all source files are `.js`
- No test framework configured
