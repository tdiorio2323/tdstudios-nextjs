# TD Studios Next.js Project - Development Context

## Project Overview

**TD Studios** is a web design and branding agency website built with Next.js 16, React 19, and modern JavaScript. The site specializes in web design, brand identity, and cannabis industry branding/packaging services. The project uses the Next.js App Router architecture with a minimal, clean structure.

The site currently features a "coming soon" landing page with glassmorphism effects and a NYC skyline background, with a preview mode for the full site. It includes 8 hardcoded case studies showcasing both general creative services and cannabis industry expertise.

## Technologies

- **Framework**: Next.js 16 (App Router)
- **Language**: JavaScript (no TypeScript)
- **Runtime**: Node.js
- **Styling**: Tailwind CSS, CSS custom properties, custom CSS
- **Fonts**: Google Fonts (Syne, Instrument Serif), custom Benzin-Bold font
- **Database**: Supabase integration (though most content is hardcoded)
- **Deployment**: Vercel
- **Package Manager**: npm

## Project Structure

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
│   └── robots.js                 # robots.txt generator
├── components/                   # React components
│   ├── Navigation.js             # Client component: custom cursor, mobile menu
│   ├── Footer.js                 # Server component: footer with social links
│   ├── ScrollReveal.js           # Client component: Intersection Observer animations
│   └── StructuredData.js         # JSON-LD schema injector (Org, LocalBusiness, Website)
├── lib/                          # Library/utils
│   ├── visuals.js                # Centralized visual asset configuration
│   └── supabase.js               # Supabase client configuration
├── public/                       # Static assets
│   ├── fonts/                    # Custom fonts
│   ├── images/                   # Background images
│   ├── gallery/                  # Dynamic gallery images (read by API route)
│   ├── placeholders/             # Placeholder assets referenced in lib/visuals.js
│   └── favicon.svg               # Site favicon
├── docs/                         # Documentation
├── next.config.js                # Next.js configuration
├── tailwind.config.js            # Tailwind CSS configuration
├── jsconfig.json                 # Path aliases configuration
├── package.json                  # Dependencies and scripts
└── ARCHITECTURE.md               # Architecture documentation
```

## Key Features

### Navigation Component
- Custom cursor that follows mouse movement with hover state enlargement
- Mobile menu with overlay and body scroll lock
- Hover effects on all interactive elements
- Mix-blend-mode: difference for visibility on all backgrounds

### Coming Soon Landing Page
- Glassmorphism card with background blur and transparency
- Animated gradient orbs in background
- NYC skyline background image
- Email signup form with success state
- Social links to Instagram and email
- Preview link to full site at `/preview`
- Logo using Benzin-Bold font with uppercase styling

### Portfolio/Work Section
- Filterable project grid (All Projects, Web & Brand, Cannabis)
- Detailed case study pages with consistent structure: Overview → Challenge → Solution → Results → Testimonial
- 8 pre-built case studies showcasing different service types

### SEO & Structured Data
- Comprehensive metadata configuration in root layout
- JSON-LD structured data for Organization, LocalBusiness, and Website schemas
- Dynamic sitemap and robots.txt generation
- Open Graph and Twitter card optimization

### Gallery System
- Dynamic gallery API route that scans `/public/gallery` directory
- Supports multiple image formats (jpg, jpeg, png, gif, webp, avif)
- Sorted by modification time (newest first)

## Development Commands

```bash
# Install dependencies
npm install

# Start development server (default: http://localhost:3000)
npm run dev

# Build for production
npm run build

# Start production server locally
npm start

# Run linter
npm run lint
```

## Development Conventions

### Component Structure
- **Server Components** (default): Used for most pages and layout components
- **Client Components**: Use `'use client'` directive at the top for interactivity

### Styling System
- **CSS Custom Properties** for design system in `globals.css`
  - Neo Tokyo Theme: `--black: #0b0b0b`, `--white: #eeeeee`, `--purple: #a78bfa`, `--pink: #f472b6`
- **Tailwind CSS** for utility classes
- **BEM-style class naming** (e.g., `.hero`, `.hero-content`, `.hero-title`)
- **Responsive design** with mobile-first approach

### Import Path Aliases
- Use `@/*` to reference files from the project root
- Example: `import Navigation from '@/components/Navigation'`

### Content Patterns
- **Hero sections**: label → title → description → tags pattern
- **Service cards**: Numbered sections (01, 02, 03, 04)
- **Work items**: category/title/year metadata
- **Case studies**: Overview → Challenge → Solution → Results → Testimonial structure
- **Two-pillar design**: general creative services + cannabis industry expertise

### SEO & Metadata
- Next.js metadata exports for page-specific SEO
- Structured data (JSON-LD) for Organization, LocalBusiness, Website schemas
- Predefined keywords in root layout

### File Naming Conventions
- Component files use PascalCase (e.g., Navigation.js, Footer.js)
- Page files use lowercase with hyphens if needed
- CSS custom properties use kebab-case with `--` prefix

## Key Files and Configuration

### Configuration Files
- `next.config.js`: Image optimization, compression, security headers
- `tailwind.config.js`: Theme colors, font families, content paths
- `jsconfig.json`: Path aliases (`@/*` maps to project root)

### Data Management
- Case study data is hardcoded in `app/work/[slug]/page.js`
- Visual assets configuration in `lib/visuals.js`
- Navigation in `components/Navigation.js`
- API routes in `app/api/` directory

### Important Notes
- **No test framework configured**: Tests would need to be added if required
- **Static export ready**: Can enable `output: 'export'` in `next.config.js` for static site generation
- **Form handling**: Contact form currently has client-side state only (no backend submission configured)
- **Gallery**: Dynamically loads images from file system via API route
- **Supabase**: Configured for potential storage integration but not fully implemented
- **Placeholder images**: Many visual assets reference placeholders that need to be replaced with real assets

## Deployment
- Deployed on Vercel with automatic deployment from the `main` branch
- Uses Vercel Edge Network for optimized static asset delivery
- Custom domain: `https://tdstudiosny.com`

## Known Issues & To-Dos
- Contact form has no backend integration (currently client-side only)
- Many visual assets reference placeholder paths that need to be replaced
- Hardcoded data that should ideally come from a CMS
- Two different color themes in CSS (one active, one as reference)