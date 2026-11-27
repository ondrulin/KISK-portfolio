# AGENTS.md — AI Agent & Maintainer Guide

This repository hosts the personal and academic portfolio of **Ondřej Schwarz** for his Master's studies at **KISK (Kabinet informačních studií a knihovnictví), Masaryk University**, focusing on **Design informačních služeb** (2026-2028).

This file is the primary entry point for AI coding agents and future iterations across Semesters 1-4. Read this alongside [`docs/`](docs/) before making structural or content changes.

---

## 1. Core Principles & Language Rules

- **Code, filenames, comments, types, and documentation:** Strictly **English**.
- **User-facing UI, copy, headings, metadata, alt text, and reflections:** Strictly **Czech** (`<html lang="cs">`).
- **Tone of Voice & Copy Formatting (Czech copy):**
  - Friendly, clear, grounded, and authentic. Write in natural first-person prose (avoid bureaucratic form-prompt titles like *"Kdo jste?"*).
  - **No long dashes:** Never use em-dashes (`—`) or en-dashes (`–`) anywhere in rendered website copy, titles, metadata, or Markdown reflections. Use commas, colons, periods, middle dots (`·`), or standard hyphens (`-`) instead.
  - **Scannability:** Highlight important keywords and takeaways in paragraphs and bullet points with `<strong class="font-semibold text-ink">` (or `**bold**` in Markdown) so every section is easy to skim.
  - Avoid AI-generated clichés, corporate jargon, CV buzzwords, or inflated claims.
- **Explicit Exclusions:**
  - Do **not** add a downloadable CV/resume file or button.
  - Do **not** render importance stars (`★`) next to KISK courses.
  - Do **not** add a dark mode toggle; this site is strictly **light mode only**.

---

## 2. Tech Stack & Performance Rules (3G-First)

- **Framework:** Astro 5 (`output: 'static'`, `trailingSlash: 'never'`)
- **Styling:** Tailwind CSS v4 (`@tailwindcss/vite`) + custom CSS tokens and subtle CSS entrance animations in `src/styles/global.css`
- **Icons:** `@lucide/astro` (direct icon imports like `@lucide/astro/icons/arrow-right` compiled to inline SVGs at build time with 0 KB client JS)
- **Fonts:** Self-hosted variable fonts (`@fontsource-variable/instrument-sans` for headings, `@fontsource-variable/inter` for body) with Czech `latin-ext` glyph support
- **Content Engine:** Astro 5 Content Layer (`src/content.config.ts`) reading Markdown files from `src/content/semesters/`
- **Image Optimization:** Sharp + Astro `<Image />` component (`astro:assets`) generating WebP variants with responsive `widths` and `sizes`
- **Hosting:** Netlify (`netlify.toml`) publishing `dist/`

### Performance Guardrails
- Keep client-side JavaScript at **0 KB by default**. Use native HTML elements (`<details>`/`<summary>` for mobile menu, anchor links for course navigation) and pure CSS `@keyframes` for entrance animations.
- Every raster image and logo must be imported from `src/assets/` and rendered via `<Image />` with `widths`, `sizes`, and appropriate `loading` (`eager` + `fetchpriority="high"` only on above-the-fold hero imagery; `lazy` everywhere else).

---

## 3. Repository Structure

```text
├── AGENTS.md                  # Agent & iteration guide (you are here)
├── README.md                  # Quickstart overview
├── astro.config.mjs           # Astro + Tailwind v4 static config
├── netlify.toml               # Netlify build, cache, and security headers
├── tsconfig.json              # Strict TS config with @/* -> src/* alias
├── docs/
│   ├── ARCHITECTURE.md        # Routing, content schema, 3G & deploy setup
│   ├── DESIGN_SYSTEM.md       # Monochrome + light-green tokens & UX rules
│   └── CONTENT_GUIDE.md       # How to update semesters, courses, and copy
├── public/
│   └── favicon.svg            # Minimalist OS monogram favicon
└── src/
    ├── assets/
    │   ├── images/            # Optimized source photography & VŠE creations
    │   └── logos/             # Brand & university icons (2n, metio, muni, vse-fis)
    ├── components/            # Reusable Astro UI components
    ├── content/
    │   └── semesters/         # 01-semestr.md .. 04-semestr.md
    ├── content.config.ts      # Zod schema for Content Collections
    ├── layouts/
    │   └── BaseLayout.astro   # HTML shell, SEO tags, sticky header, footer
    ├── pages/
    │   ├── index.astro        # Domů (Home overview)
    │   ├── studium/
    │   │   ├── index.astro    # Studium (Narrative + VŠE showcase + Semesters 1-4)
    │   │   └── [slug].astro   # Dynamic semester page (active/completed only)
    │   ├── prace.astro        # Práce (Timeline, Permanento + VŠE/MUNI education)
    │   └── o-mne.astro        # O mně (2-column story/hobbies + stacked photo column)
    └── styles/
        └── global.css         # Tailwind v4 + monochrome/green tokens + animations
```

---

## 4. How to Iterate Across Semesters 1-4

Each semester lives in `src/content/semesters/0X-semestr.md` and follows the schema in `src/content.config.ts`:

```yaml
---
semesterNumber: 1
slug: "1-semestr"
title: "1. semestr"
period: "Podzim 2026"
status: "active"        # "active" | "upcoming" | "completed"
summary: "Short Czech summary shown on overview cards (no long dashes)."
courses:
  - code: "ISKM01"
    name: "Informační vědy"
    status: "in-progress" # "in-progress" | "completed"
    reflection: |
      Markdown/text reflection for this course (optional while in-progress).
---
```

### Common Iteration Tasks
1. **Adding course reflections for Semester 1:** Edit `src/content/semesters/01-semestr.md`. Update a course's `status` to `"completed"` and add Markdown text to `reflection` (using `**bold**` for scannable takeaways and avoiding `—`/`–`).
2. **Unlocking Semester 2, 3, or 4:** Edit `src/content/semesters/02-semestr.md` (or `03`/`04`), change `status: "upcoming"` to `status: "active"`, update `summary`, and populate `courses`.
3. **Keeping upcoming semesters disabled:** Any semester with `status: "upcoming"` is **not** generated as a page in `[slug].astro` and renders as a non-clickable (`aria-disabled="true"`) muted card on `/` and `/studium`.

---

## 5. Design System & UX Guardrails

- **Monochrome + Single Light-Green Accent:**
  - Neutrals: `#ffffff` (`--color-bg`), `#f7f7f7` (`--color-surface`), `#efefef` (`--color-surface-muted`), `#e5e5e5` (`--color-line`), `#141414` (`--color-ink`), `#4a4a4a` (`--color-ink-soft`), `#737373` (`--color-ink-faint`).
  - Single Accent (Light Green): `#b4f178` (`--color-accent`), `#9ce959` (`--color-accent-strong`), `#eefbe0` (`--color-accent-soft`), `#cbeea6` (`--color-accent-border`) — always paired with dark `#141414` ink/icons for high contrast.
- **Buttons vs. Informational Chips (Strict UX Rule):**
  - `rounded-full` is reserved strictly for **interactive buttons and navigation links** (e.g. breadcrumb back button, primary CTAs, circular green arrow badges).
  - Non-interactive labels, course codes, and counts (`8 předmětů`, `Podzim 2026`, `půl úvazek`) must use rectangular `rounded-md` tags or borderless inline icon+text metadata so users never confuse static chips with clickable buttons.
- **Course Grids:** Always render semester course lists in symmetrical full-width 2-column CSS grids (`grid-cols-1 sm:grid-cols-2`) rather than ragged `flex-wrap` chips.

See [`docs/DESIGN_SYSTEM.md`](docs/DESIGN_SYSTEM.md) for full details.

---

## 6. Commands & Verification Checklist

```bash
npm run dev       # Start local dev server
npm run build     # Build static site into dist/
npm run preview   # Preview production build locally
npx astro check   # Type-check Astro components and Content Collections
```

Before finishing any change:
1. Run `npx astro check` and `npm run build` — ensure zero errors.
2. Verify zero em-dashes (`—`) or en-dashes (`–`) exist anywhere in `src/`.
3. Confirm all images and logos use `astro:assets` `<Image />` and zero client JS is emitted in `dist/_astro/`.
