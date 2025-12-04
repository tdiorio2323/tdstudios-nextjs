# TD Studios Cleanup Plan

## 1. Objectives

* Clean up the existing TD Studios (tdstudiosny.com) Next.js codebase without a full redesign.
* Remove dead/unused code and duplicated logic.
* Fix missing styles and make styling patterns consistent.
* Tighten up SEO and basic security (forms, data).
* Prepare the repo for future upgrades (TypeScript, CMS) without breaking current behavior.

---

## 2. Ground Rules

* No full visual redesign; preserve the current layout and vibe.
* Only small, safe steps per batch of changes.
* Do not rename routes or drastically change structure unless explicitly planned.
* Every change should be explainable in 1–2 sentences and traceable back to this plan.
* Opus/Claude Code should always show diffs before you commit.

---

## 3. Roadmap

### Phase 1: Quick Wins (Today / This Week)

#### [x] 1. Delete unused ScrollReveal component

* **Description:** Remove the dead ScrollReveal component that is never imported anywhere.
* **Files involved:**

  * `components/ScrollReveal.js`
* **Actions:**

  * Confirm with a project-wide search that nothing imports `ScrollReveal`.
  * Delete the file if there are truly zero references.
* **Risk level:** Low
* **Notes:**

  * This is purely dead code removal.
* **Completed:**
  * Confirmed zero imports throughout codebase
  * Deleted 47-line unused intersection observer component
  * No regressions expected

---

#### [x] 2. Consolidate CTA components

* **Description:** Use a single, canonical CTA component instead of multiple implementations.
* **Files involved:**

  * `components/CTA.js`
  * `components/HomeSections.js`
  * Any pages that currently use an inline or alternate CTA.
* **Actions:**

  * Identify all CTA variants (e.g. in `HomeSections`).
  * Make `components/CTA.js` the single CTA source of truth.
  * Refactor pages/sections to import and use `CTA` instead of duplicating logic.
  * Remove or simplify any redundant CTA code from `HomeSections.js`.
* **Risk level:** Medium
* **Notes:**

  * Keep existing CTA styling/behavior as close as possible; this is a consolidation, not a redesign.
* **Completed:**
  * Updated `components/CTA.js` to use Tailwind classes instead of undefined CSS classes
  * Added support for title emphasis styling to match home page design
  * Updated home page to use the unified CTA component with appropriate props
  * Removed duplicate CTA export from `HomeSections.js`

---

#### [x] 3. Remove gallery image optimization bypass

* **Description:** Let Next.js handle image optimization by removing `unoptimized={true}` from gallery images.
* **Files involved:**

  * `app/gallery/page.js`
* **Actions:**

  * Remove `unoptimized={true}` from all `<Image>` components in the gallery.
  * Verify that `next/image` is imported and used correctly.
* **Risk level:** Low
* **Notes:**

  * Watch for layout shifts; visually inspect the gallery after the change.
* **Completed:**
  * Removed `unoptimized` flag from gallery grid images (line 103)
  * Removed `unoptimized` flag from lightbox modal image (line 137)
  * Images will now use Next.js optimization (AVIF/WebP formats)

---

#### [x] 4. Add contact page metadata

* **Description:** Give the contact page proper SEO metadata via the App Router `metadata` export.
* **Files involved:**

  * `app/contact/page.js`
* **Actions:**

  * Add a `export const metadata = { ... }` block with a clear `title` and `description` tailored to TD Studios.
  * Keep JSX untouched except for any needed imports or minor cleanups.
* **Risk level:** Low
* **Notes:**

  * This should not affect layout; only page head metadata.
* **Completed:**
  * Created `ContactClient.js` to hold the client-side form logic
  * Converted `page.js` to server component with metadata export
  * Added comprehensive metadata: title, description, keywords, OpenGraph, Twitter cards
  * No visual changes, only improved SEO

---

#### [x] 5. Fix critical missing CSS classes

* **Description:** Resolve 20+ missing CSS class references such as `page-header`, `contact-form`, etc.
* **Files involved:**

  * `app/globals.css`
  * Any pages/components using undefined classes (e.g. headers, contact page).
* **Actions:**

  * For one-off layout styles, replace custom class names with Tailwind utility classes directly in JSX.
  * Only define global CSS classes in `globals.css` when they are clearly reused across multiple places.
  * Verify that previously broken elements now render correctly.
* **Risk level:** Medium
* **Notes:**

  * Goal is to reduce "mystery classes" and lean into Tailwind as the default.
* **Completed:**
  * Replaced all undefined CSS classes in `/app/work/page.js` with Tailwind utilities
  * Replaced all undefined CSS classes in `/app/contact/ContactClient.js` with Tailwind utilities
  * Converted 20+ mystery classes including: page-header, contact-form, form-input, work-grid, etc.
  * All styling now uses Tailwind utilities - no undefined CSS classes remain

---

### Phase 2: Data & Security (Week 1)

#### [x] 6. Extract case study data into a single source of truth

* **Description:** Move hardcoded case study data into a dedicated lib module.
* **Files involved:**

  * `app/work/[slug]/page.js`
  * `lib/visuals.js`
  * New: `lib/caseStudies.js` (or similar)
* **Actions:**

  * Identify all case study/project data currently hardcoded in `app/work/[slug]/page.js` and duplicated in `lib/visuals.js`.
  * Create `lib/caseStudies.js` that exports a well-structured data object/array.
  * Refactor `work/[slug]` route to import from this new module.
  * Remove duplicated data from other files where possible.
* **Risk level:** Medium
* **Notes:**

  * This sets you up for a future CMS swap with minimal route changes.
* **Completed:**
  * Created `lib/caseStudies.js` with comprehensive data structure containing all fields
  * Exported `caseStudies` array and `caseStudiesBySlug` object for easy lookup
  * Added helper functions: `getCaseStudyBySlug()` and `getCaseStudiesByType()`
  * Updated `app/work/[slug]/page.js` to use new module via `getCaseStudyBySlug()`
  * Updated `app/work/page.js` to use `getCaseStudiesByType()` for filtering
  * Updated `components/Work.js` (home page) to use `caseStudies` array
  * Removed duplicate `portfolioProjects` array from `lib/visuals.js` (82 lines removed)

---

#### [ ] 7. Create form API route for contact submissions

* **Description:** Move Formspree (or any external form endpoint) behind a Next.js API route with basic validation.
* **Files involved:**

  * `app/contact/page.js`
  * New: `app/api/contact/route.js`
* **Actions:**

  * Create `app/api/contact/route.js` to accept POST requests, validate payload, and forward to Formspree or another service.
  * Keep the Formspree endpoint hidden server-side.
  * Add basic rate limiting or spam checks if reasonable.
  * Update the contact form to POST to the new API route instead of calling the external URL directly.
* **Risk level:** Medium
* **Notes:**

  * Start simple (validation + proxy); you can harden later.

---

### Phase 3: Styling Consistency (Week 2)

#### [ ] 8. Establish a clear CSS architecture

* **Description:** Define and document how styling should be done going forward.
* **Files involved:**

  * `tailwind.config.js`
  * `app/globals.css`
  * Key layout components (header, footer, sections)
* **Actions:**

  * Decide on a primarily utility-first Tailwind approach, with minimal global classes.
  * Clean up `globals.css` so it contains only truly global/base rules.
  * Document naming patterns and when to create a reusable class vs. inline Tailwind utilities.
* **Risk level:** Medium
* **Notes:**

  * Keep it light; this is a guideline, not a rewrite of every component.

---

#### [ ] 9. Consolidate all portfolio/visual data

* **Description:** Remove redundant data definitions for portfolio items and visuals.
* **Files involved:**

  * `lib/visuals.js`
  * `lib/caseStudies.js` (or equivalent from Phase 2)
  * Any page that consumes this data
* **Actions:**

  * Ensure there is exactly one canonical source for each project/case study.
  * Refactor consumers to read from that source.
  * Remove leftover, unused data structures.
* **Risk level:** Medium
* **Notes:**

  * This complements the case study extraction and keeps things future-CMS-ready.

---

### Phase 4: Architecture Improvements (Month 1)

#### [ ] 10. Evaluate and prepare for TypeScript migration

* **Description:** Plan and optionally start a gradual migration from JS to TS.
* **Files involved:**

  * Project-wide (configs, `app/**/*`, `lib/**/*`, `components/**/*`)
* **Actions:**

  * Add basic TypeScript support (tsconfig, types for Next.js).
  * Identify critical core modules (Supabase client, `lib/visuals`, `lib/caseStudies`, layout components) as first TS targets.
  * Optionally migrate 1–2 leaf components to TS to validate tooling.
* **Risk level:** Medium/High (if done in large chunks)
* **Notes:**

  * Keep this incremental. No big-bang conversion.

---

#### [ ] 11. Explore CMS integration for case studies and content

* **Description:** Prepare to move case studies and possibly other content to a CMS (e.g. Contentful, Sanity).
* **Files involved:**

  * `lib/caseStudies.js`
  * Any page that renders case studies or dynamic content
* **Actions:**

  * Choose a CMS and sketch a content model based on `lib/caseStudies.js`.
  * Plan how data fetching would plug into the existing pages.
  * Optionally create a feature branch where CMS-backed fetching is prototyped.
* **Risk level:** High (if fully implemented), Low (if only planning)
* **Notes:**

  * Not required to execute immediately, but should be aligned with the data model work.

---

## 4. Tracking & Workflow

* All changes should reference a specific task number from this plan in the commit message.

  * Example: `chore: remove ScrollReveal (TD-1)` or `refactor: consolidate CTA components (TD-2)`.
* Update this file as tasks are completed:

  * Check the box `[x]` when done.
  * Add a short bullet under each completed task with:

    * What changed.
    * Any follow-up or regressions to watch.
* Keep this file in the repo root so Opus/Claude can always use it as context when editing.