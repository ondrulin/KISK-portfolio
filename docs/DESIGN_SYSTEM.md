# Design System

The visual system uses a crisp **light-only monochrome palette** paired with **one signature light-green accent**, Instrument Sans + Inter typography, `@lucide/astro` iconography, and subtle CSS entrance animations.

---

## 1. Color Palette (Monochrome + Single Light-Green Accent)

All tokens live in `src/styles/global.css`. Do not introduce secondary color themes (indigo, terracotta, etc.).

### Monochrome Neutrals
| Token | Hex | Role |
| --- | --- | --- |
| `--color-bg` | `#ffffff` | Page and primary card background |
| `--color-surface` | `#f7f7f7` | Subtle elevated surface, disabled cards, nav container |
| `--color-surface-muted` | `#efefef` | Flat neutral code/status tags |
| `--color-ink` | `#141414` | Primary headings, scannable bold highlights, and CTA ink |
| `--color-ink-soft` | `#4a4a4a` | Body copy and descriptions |
| `--color-ink-faint` | `#737373` | Captions, dates, inline metadata, disabled copy |
| `--color-line` | `#e5e5e5` | Default 1px neutral hairline border |
| `--color-line-strong` | `#d4d4d4` | Button borders, hover hairlines, dashed frames |
| `--color-cta` | `#141414` | Primary solid dark pill button background |

### Single Light-Green Accent
| Token | Hex | Role |
| --- | --- | --- |
| `--color-accent` | `#b4f178` | Circular arrow badges, primary accent fills (always paired with `#141414` ink/icons) |
| `--color-accent-strong` | `#9ce959` | Indicator dots, link underlines, hover state on `--color-accent` |
| `--color-accent-soft` | `#eefbe0` | Eyebrow badge fills and icon containers |
| `--color-accent-border` | `#cbeea6` | Subtle hairline border for `--color-accent-soft` elements |

---

## 2. Typography & Copy Rules

- **Headings:** `"Instrument Sans Variable"` (`font-stretch: 96%`, `letter-spacing: -0.03em`)
- **Body & UI:** `"Inter Variable"` (`16px`, `line-height: 1.65`)
- **Scannable Highlights:** Important phrases inside body paragraphs and bullets use `<strong class="font-semibold text-ink">` so `#141414` stands out clearly against `#4a4a4a` body text.
- **No Long Dashes:** Never use `—` or `–` in rendered Czech copy.

---

## 3. UX Affordance: Buttons vs. Static Metadata

To prevent false-button confusion:
1. **Interactive Controls (`rounded-full`):**
   - Primary CTA (`bg-cta text-white rounded-full` with embedded `bg-accent` circular arrow)
   - Secondary / Back Buttons (`rounded-full border border-line-strong bg-bg shadow-xs hover:border-ink`)
   - Card Action Indicator (`h-7 w-7 rounded-full bg-accent text-ink` circular arrow button)
2. **Non-Interactive Metadata (`rounded-md` or borderless):**
   - Eyebrow / Workload tags use `rounded-md` (`6px` radius) with `bg-accent-soft` or `bg-surface-muted`.
   - Counts, dates, and statuses (`8 předmětů`, `2023-2026`, `Probíhá`) render as **borderless inline icon + text** (`text-xs font-medium text-ink-faint`) — never inside pill borders.

---

## 4. Layout, Grids & Motion

- **Outer Container:** `max-w-[880px]` centered (`px-5 sm:px-8`).
- **Course Overview Grids:** Always use a symmetrical 2-column grid (`grid-cols-1 sm:grid-cols-2`) so course items stretch cleanly to fill 100% of the container width.
- **About Page (`O mně`):** Unified 2-column grid (`md:grid-cols-[1fr_290px]`) where the left column stacks equal-width narrative cards and the right column stacks compressed photography seamlessly one after another.
- **Entrance Motion:** `.animate-section` (`fadeInUp`, `0.48s cubic-bezier(0.22, 1, 0.36, 1)`) with `.delay-1`..`.delay-4` stagger, automatically disabled when `prefers-reduced-motion: reduce` is active.
