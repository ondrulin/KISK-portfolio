# Architecture Overview

This document explains the technical architecture, routing model, content layer, 3G performance strategy, and Netlify deployment setup for Ondřej Schwarz's KISK portfolio.

---

## 1. Tech Stack

| Layer | Choice | Why |
| --- | --- | --- |
| Static Site Generator | **Astro 5** (`output: 'static'`) | Emits pure HTML/CSS with 0 KB JS by default |
| Styling & Motion | **Tailwind CSS v4** (`@tailwindcss/vite`) | Zero-runtime CSS tokens + pure CSS entrance animations |
| Iconography | **`@lucide/astro`** | Build-time inline SVGs via direct subpath imports (`@lucide/astro/icons/*`) |
| Typography | **Instrument Sans** & **Inter** (`@fontsource-variable/*`) | Local variable WOFF2 subsets (`latin` + `latin-ext`), zero external font latency |
| Content Storage | **Astro Content Layer** (`src/content/semesters/*.md`) | Type-safe Zod validation, easy per-semester Markdown editing |
| Images & Logos | **Sharp** via `astro:assets` `<Image />` | Automatic WebP compression, `srcset`, explicit dimensions, lazy loading |
| Deployment | **Netlify** (`netlify.toml`) | Zero-config static hosting with immutable asset caching |

---

## 2. Routing Map

```text
/                    -> src/pages/index.astro          (Home overview: hero, Semesters 1-4, Work & About previews)
/studium             -> src/pages/studium/index.astro  (Personal profile, VŠE creations, KISK narrative + Semesters 1-4)
/studium/[slug]      -> src/pages/studium/[slug].astro (Detail page generated ONLY for active/completed semesters)
/prace               -> src/pages/prace.astro          (Timeline with 2N, Metio, Permanento + MUNI/VŠE icons)
/o-mne               -> src/pages/o-mne.astro          (2-column layout: equal-width story/hobbies + stacked photos)
```

---

## 3. Content Collection Schema (`src/content.config.ts`)

The `semesters` collection uses Astro 5's `glob` loader (`base: './src/content/semesters'`, `pattern: '**/*.md'`):

- `semesterNumber`: integer `1..4` (used for deterministic sorting)
- `slug`: URL segment (`1-semestr`, `2-semestr`, `3-semestr`, `4-semestr`)
- `title`: Czech display title (`1. semestr`, etc.)
- `period`: Czech academic term (`Podzim 2026`, `Jaro 2027`, etc.)
- `status`: `'active' | 'upcoming' | 'completed'`
- `summary`: short Czech description displayed on overview cards (dash-free)
- `courses`: array of objects (`code`, `name`, `status`: `'in-progress' | 'completed'`, optional `reflection` Markdown string)

---

## 4. 3G-First Performance Strategy

1. **Zero Client JS:** Mobile navigation (`<details>`), anchor jump links, Lucide SVG icons, and entrance animations (`@keyframes fadeInUp`) require 0 KB of client JavaScript.
2. **Aggressive Image Compression:** Large source photos (studio cutout PNG, Thailand street photo, VŠE macro/3D renders, mountain photos) and square organization logos (`2n.png`, `metio-software.png`, `muni.png`, `vse-fis.jpg`) are resized to exact display widths and encoded to WebP at build time.
3. **Self-Hosted Subsetted Variable Fonts:** Bundled locally with `font-display: swap`.
