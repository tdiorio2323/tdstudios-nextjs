# Project Architecture Overview

## 1. What this project does

- **TD Studios marketing website**: A portfolio/agency website showcasing web design, branding, and cannabis industry packaging services
- **Two-phase launch**: Currently shows a "coming soon" landing page (`app/page.js`) with a preview mode (`app/preview/page.js`) for the full site
- **Static content site**: No user accounts, no database—all content is hardcoded or file-based, optimized for fast static generation and SEO

---

## 2. Tech Stack

### Frontend
- **Next.js 16** (App Router architecture)
- **React 19** (with React Server Components by default)
- **JavaScript** (no TypeScript, uses `jsconfig.json` for path aliases)
- **CSS**: Custom properties + vanilla CSS (no CSS-in-JS or Tailwind)
- **Google Fonts**: Syne (body), Instrument Serif (headings)
- **Custom fonts**: Benzin-Bold (logo) loaded via `@font-face`

### Backend / API
- **No traditional backend**: Static site generation with minimal server logic
- **API Routes** (Next.js):
  - `app/api/gallery/route.js` - Filesystem-based gallery image fetcher
- **No database**: All data lives in code as JavaScript objects

### Database / Storage
- **None**: Project/case study data hardcoded in `app/work/[slug]/page.js`
- **Gallery images**: Stored in `/public/gallery` and served via API route
- **Visual assets config**: Centralized in `lib/visuals.js` (placeholder management)

### Infra / Hosting
- **Vercel**: Primary deployment platform (`.vercel` directory present)
- **Git**: GitHub repo at `https://github.com/tdiorio2323/tdstudios-nextjs.git`
- **CDN**: Vercel Edge Network for static assets

### Tooling & CI
- **npm**: Package manager
- **Next.js built-in linting**: ESLint config included
- **No CI/CD config files**: Likely using Vercel's automatic deployments on git push
- **No Docker**: Pure Node.js app
- **No tests**: No testing framework configured

---

## 3. Directory & Module Structure

```
tdstudios-nextjs/
├── app/                          # Next.js App Router (pages, layouts, API)
│   ├── page.js                   # Coming soon landing page (current homepage)
│   ├── preview/page.js           # Full site preview mode
│   ├── layout.js                 # Root layout: fonts, metadata, SEO, structured data
│   ├── globals.css               # Global styles with CSS custom properties
│   ├── work/
│   │   ├── page.js               # Portfolio listing page
│   │   └── [slug]/page.js        # Dynamic case study pages (8 projects hardcoded)
│   ├── about/page.js             # About page
│   ├── contact/page.js           # Contact form page (client-side only)
│   ├── websites/page.js          # Websites service page
│   ├── cannabis/page.js          # Cannabis branding service page
│   ├── tdbranding/page.js        # TD Branding page
│   ├── gallery/page.js           # Gallery page (uses API route)
│   ├── api/gallery/route.js      # GET endpoint to fetch images from filesystem
│   ├── sitemap.js                # Dynamic sitemap generator
│   ├── robots.js                 # robots.txt generator
│   ├── opengraph-image.js        # Dynamic OG image generator (Next.js OG)
│   ├── loading.js                # Global loading UI
│   └── not-found.js              # 404 page
│
├── components/
│   ├── Navigation.js             # Client component: custom cursor, mobile menu
│   ├── Footer.js                 # Server component: footer with social links
│   ├── Loading.js                # Loading spinner component
│   ├── ScrollReveal.js           # Client component: Intersection Observer animations
│   └── StructuredData.js         # JSON-LD schema injector (Org, LocalBusiness, Website)
│
├── lib/
│   └── visuals.js                # Centralized visual asset configuration (TODO-style placeholders)
│
├── public/
│   ├── fonts/Benzin-Bold.ttf     # Custom logo font
│   ├── images/nyc-skyline-bg.jpg # Background for coming soon page
│   ├── gallery/                  # Dynamic gallery images (read by API route)
│   ├── placeholders/             # Placeholder assets referenced in lib/visuals.js
│   ├── favicon.svg               # Site favicon
│   └── og-image.svg              # Fallback OG image
│
├── docs/                         # Documentation (not part of runtime)
│   └── VISUAL_ENHANCEMENT_OPPORTUNITIES.md
│
├── benzin/                       # Font files (not used at runtime; duplicated in public/)
│
├── next.config.js                # Next.js config: image optimization, compression
├── jsconfig.json                 # Path alias: @/* → project root
├── package.json                  # Dependencies: next, react, react-dom
├── CLAUDE.md                     # AI assistant context
└── ARCHITECTURE.md               # This file
```

### Important Files

- **`app/layout.js`**: Root layout; injects Google Fonts, Benzin font, metadata, structured data schemas
- **`app/globals.css`**: All global styles including CSS custom properties for Neo Tokyo theme (purple/pink) and original theme (green/gold)
- **`app/work/[slug]/page.js`**: Contains hardcoded object with 8 case studies (apex-ventures, emerald-valley, etc.)
- **`lib/visuals.js`**: Central config for all visual assets with TODO comments for placeholder replacement
- **`components/Navigation.js`**: Custom cursor logic, mobile menu, body scroll lock
- **`next.config.js`**: Image optimization (AVIF/WebP), compression enabled, `poweredByHeader: false`

---

## 4. Request & Data Flow

### Typical Page Request (Server-Side Rendered or Static)

1. **User navigates** to a URL (e.g., `/work/apex-ventures`)
2. **Next.js Router** matches route to `app/work/[slug]/page.js`
3. **Server Component** runs on server (or at build time if statically generated):
   - Reads hardcoded `projects` object
   - Looks up project by `params.slug`
   - Returns 404 if not found via `notFound()`
4. **Metadata generation** (`generateMetadata` function):
   - Sets page title, description, OG tags
5. **React rendering**:
   - Server component renders JSX
   - Client components (`Navigation`, `ScrollReveal`) hydrate on client
6. **Response sent** to browser with fully rendered HTML + hydration scripts

### Gallery API Flow

1. **Client requests** `GET /api/gallery`
2. **API Route** (`app/api/gallery/route.js`):
   - Uses Node.js `fs` module to scan `/public/gallery` directory
   - Filters for image extensions (`.jpg`, `.jpeg`, `.png`, `.gif`, `.webp`, `.avif`)
   - Sorts by modification time (newest first)
   - Returns JSON: `{ images: [{ name, url }] }`
3. **Client** (e.g., `app/gallery/page.js`) fetches and displays images

### Form Submission (Contact Page)

1. **User fills form** on `/contact`
2. **Client-side React state** captures form data
3. **Form submission** (`handleSubmit`):
   - Currently **NO backend**: Form logic exists but doesn't send data anywhere
   - Shows success message client-side only
   - **Extension point**: Add email service integration (e.g., Resend, SendGrid, Mailgun)

### SEO / Metadata Flow

1. **`app/layout.js`** sets global metadata (title template, OG image, favicon)
2. **Each page** exports `metadata` object or `generateMetadata` function
3. **Next.js** automatically generates:
   - `<title>`, `<meta>`, `<link>` tags
   - `sitemap.xml` via `app/sitemap.js`
   - `robots.txt` via `app/robots.js`
   - OG image via `app/opengraph-image.js` (uses `next/og` ImageResponse)
4. **Structured data** injected via `<script type="application/ld+json">` in `StructuredData.js`

### Global State / Context

- **No global state management**: No Redux, Zustand, or React Context providers
- **Client state**: Local `useState` in components (e.g., mobile menu open/closed, form data)
- **URL state**: Navigation handled by Next.js router (no manual state persistence)

---

## 5. Core Models & Types

**No formal data models** (no database, no TypeScript interfaces). All "models" are plain JavaScript objects.

### Case Study / Project

Defined in: `app/work/[slug]/page.js` (hardcoded `projects` object)

```javascript
{
  title: string,           // "Apex Ventures"
  category: string,        // "Web Design / Branding"
  type: string,            // "design" | "cannabis"
  year: string,            // "2024"
  description: string,     // Short description
  client: string,          // Client name
  services: string[],      // ["Brand Identity", "Web Design", ...]
  duration: string,        // "12 weeks"
  overview: string,        // Long overview paragraph
  challenge: string,       // Challenge paragraph
  solution: string,        // Solution paragraph
  results: string[],       // 4 result bullets
  testimonial: {
    quote: string,
    author: string,
    role: string
  }
}
```

**8 hardcoded projects**: apex-ventures, emerald-valley, modernist-studio, high-tide-collective, northwind-tech, terra-bloom, cascade-financial, green-state-labs

### Visual Asset Config

Defined in: `lib/visuals.js`

```javascript
{
  id: number,
  slug: string,          // URL slug
  name: string,          // Display name
  category: string,      // Category label
  type: string,          // "design" | "cannabis"
  year: string,
  description: string,
  image: string          // Path to placeholder image
}
```

Used for: Portfolio project listings, hero visuals, gallery images, service icons

### Structured Data Schemas

Defined in: `components/StructuredData.js`

- **`organizationSchema`**: Schema.org Organization (name, logo, contact, services)
- **`localBusinessSchema`**: Schema.org ProfessionalService (address, hours, geo)
- **`websiteSchema`**: Schema.org WebSite (URL, description)

---

## 6. Configuration & Environment

### Environment Variables

**None currently used**. The site has no secrets or external API integrations that require env vars.

**Potential future env vars** (if adding features):
- `RESEND_API_KEY` - For contact form email sending
- `NEXT_PUBLIC_GA_ID` - Google Analytics tracking ID
- `NEXT_PUBLIC_SITE_URL` - Base URL (currently hardcoded to `https://tdstudiosny.com`)

### Config Files

#### `next.config.js`
```javascript
{
  images: {
    formats: ['image/avif', 'image/webp'],  // Image optimization
    deviceSizes: [...],                      // Responsive breakpoints
    imageSizes: [...]                        // Icon/thumbnail sizes
  },
  compress: true,                            // Gzip compression
  poweredByHeader: false                     // Remove "X-Powered-By: Next.js"
  // output: 'export' (commented out)        // Enable for pure static export
}
```

#### `jsconfig.json`
```javascript
{
  "compilerOptions": {
    "paths": {
      "@/*": ["./*"]  // Import alias: import X from '@/components/X'
    }
  }
}
```

#### `package.json`
- **Dependencies**: next@^16.0.5, react@^19.2.0, react-dom@^19.2.0
- **Scripts**: `dev`, `build`, `start`, `lint`

### Per-Environment Behavior

**No explicit environment detection** in code. Behavior is controlled by Next.js build mode:
- **Development** (`npm run dev`): Hot reload, verbose errors, no optimization
- **Production** (`npm run build && npm start`): Minified, optimized, static generation where possible
- **Static export** (`output: 'export'` in config): Pure static HTML/CSS/JS (currently disabled)

---

## 7. Running, Testing, Deploying

### Local Development

```bash
# Install dependencies
npm install

# Start dev server (http://localhost:3000)
npm run dev

# Build for production (generates .next/ folder)
npm run build

# Run production server locally
npm start

# Lint code
npm run lint
```

### Testing

**No tests configured**. To add testing:
1. Install a framework (e.g., `npm install --save-dev jest @testing-library/react`)
2. Add test script to `package.json`: `"test": "jest"`
3. Create `__tests__/` directories or `.test.js` files

### Deployment

**Vercel (current method)**:
1. Push to `main` branch on GitHub
2. Vercel automatically detects changes
3. Runs `npm run build`
4. Deploys to `tdstudiosny.com` (production) or preview URL (PRs)

**Manual deployment** (alternative):
1. Run `npm run build` locally
2. Upload `.next/` folder + `package.json` + `next.config.js` to server
3. Run `npm start` on server (requires Node.js)

**Static export** (if enabled):
1. Uncomment `output: 'export'` in `next.config.js`
2. Run `npm run build` → generates `out/` folder
3. Upload `out/` to any static host (Netlify, S3, etc.)
4. **Note**: Loses API routes (`/api/gallery` won't work in static mode)

---

## 8. Extension Guide (for new work)

### Add a New Page/Route

1. **Create file** in `app/`:
   - Example: `app/services/page.js` for `/services`
2. **Export a React component**:
   ```javascript
   export default function ServicesPage() {
     return <div>Services content</div>
   }
   ```
3. **Add metadata** (optional but recommended):
   ```javascript
   export const metadata = {
     title: 'Services',
     description: 'Our services...'
   }
   ```
4. **Update navigation** in `components/Navigation.js`:
   - Add link to `nav-links` array
   - Add to mobile menu

### Add a New API Endpoint

1. **Create route handler** in `app/api/`:
   - Example: `app/api/contact/route.js` for `POST /api/contact`
2. **Export HTTP method functions**:
   ```javascript
   import { NextResponse } from 'next/server'

   export async function POST(request) {
     const body = await request.json()
     // Process data
     return NextResponse.json({ success: true })
   }
   ```
3. **Add error handling**:
   ```javascript
   try {
     // logic
   } catch (error) {
     return NextResponse.json(
       { error: error.message },
       { status: 500 }
     )
   }
   ```

### Add a New Background Job/Worker

**Not applicable** - this is a static site with no background job infrastructure.

**If needed**, options:
- Use Vercel Cron Jobs (add `vercel.json` with cron config)
- Use external service (e.g., GitHub Actions cron, AWS EventBridge)
- Add serverless function in `app/api/` and trigger via HTTP

### Add or Change a Data Model

**Case studies** (hardcoded in `app/work/[slug]/page.js`):
1. Edit the `projects` object
2. Add new entry with unique slug
3. Add slug to `generateStaticParams()` return array
4. Update `app/sitemap.js` to include new slug

**Visual assets** (managed in `lib/visuals.js`):
1. Edit `portfolioProjects`, `galleryImages`, etc.
2. Drop actual image files into `/public/placeholders/`
3. Update `src` paths to match filenames

**Future: Migrate to CMS** (e.g., Sanity, Contentful):
1. Install CMS SDK: `npm install @sanity/client`
2. Create data fetching functions in `lib/` (e.g., `lib/sanity.js`)
3. Replace hardcoded objects with API calls in Server Components
4. Keep `generateStaticParams()` for static generation

---

## 9. Caveats & Gotchas

### Known Tricky Areas

1. **Hardcoded case study data**:
   - All project content lives in `app/work/[slug]/page.js` as a massive object
   - Adding/editing projects requires editing code and redeploying
   - **Risk**: Easy to have stale/inconsistent data across pages
   - **Mitigation**: Consider migrating to a CMS or JSON file

2. **Two versions of color theme**:
   - `app/globals.css` defines **two color palettes**:
     - **Neo Tokyo theme** (purple/pink - currently active)
     - **Original theme** (green/gold - commented as reference)
   - Some pages may still reference old colors
   - **Risk**: Inconsistent colors if mixing themes
   - **Mitigation**: Global find/replace when changing themes

3. **Coming soon vs. full site**:
   - `app/page.js` is the "coming soon" landing page
   - `app/preview/page.js` is the full site preview
   - **Before launch**: Swap content or redirect `/` → `/preview`
   - **Risk**: Users may see "coming soon" after launch if not updated

4. **Contact form has no backend**:
   - `app/contact/page.js` has form UI but **doesn't send emails**
   - Currently just shows success message without actually submitting
   - **Risk**: Users think they've contacted you, but no message is received
   - **Required**: Integrate email service (Resend, SendGrid, etc.) before going live

5. **Gallery API uses filesystem**:
   - `app/api/gallery/route.js` reads `/public/gallery` with Node.js `fs` module
   - **Risk**: Won't work if you enable `output: 'export'` (static mode)
   - **Mitigation**: If going fully static, hardcode gallery images in component

6. **No TypeScript**:
   - Pure JavaScript project with `jsconfig.json` for path aliases
   - **Risk**: No compile-time type checking; easier to introduce bugs
   - **Mitigation**: Add TypeScript gradually if project grows

7. **No tests**:
   - Zero test coverage
   - **Risk**: Regressions when making changes
   - **Mitigation**: Add tests for critical paths (e.g., case study rendering, navigation)

8. **Custom cursor logic**:
   - `components/Navigation.js` implements custom cursor with mouse tracking
   - **Risk**: Performance issues on low-end devices; accessibility concerns
   - **Consideration**: Disable on mobile, add `prefers-reduced-motion` support

9. **Benzin font duplication**:
   - Font files exist in both `/benzin/` and `/public/fonts/`
   - Only `/public/fonts/Benzin-Bold.ttf` is actually used
   - **Cleanup**: Remove `/benzin/` folder to reduce confusion

10. **Placeholder asset system**:
    - `lib/visuals.js` references non-existent files in `/public/placeholders/`
    - **Risk**: Broken images if not replaced with real assets
    - **TODO**: Drop actual images into `/public/placeholders/` and update paths

### Non-Obvious Constraints

- **Must use Node.js runtime** for gallery API (can't go fully static without changes)
- **Google Fonts loaded in `<head>`**: Blocks render; consider preconnect/font-display
- **No image component optimization**: Many pages use `<div>` backgrounds instead of Next.js `<Image>`
- **SEO depends on structured data**: Schemas in `StructuredData.js` must stay accurate

### Things to NOT Touch Without Care

- **`app/layout.js`**: Root layout; changes affect entire site (fonts, metadata, global styles)
- **`app/globals.css`**: CSS custom properties; changing variables affects all pages
- **`next.config.js`**: Image optimization settings; incorrect config breaks images
- **`components/Navigation.js`**: Complex client-side logic (cursor, menu, scroll lock); test thoroughly
- **`app/work/[slug]/page.js`**: Contains all case study data; easy to break by typo
- **Vercel deployment**: Pushing to `main` triggers automatic deploy; use feature branches for safety

---

**Last updated**: 2025-11-28
**Maintainer**: Tyler Diorio (TD Studios)
