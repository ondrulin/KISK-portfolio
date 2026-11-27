# Content & Maintenance Guide

How to update Ondřej's portfolio over the 2026-2028 KISK Master's program without breaking structure, performance, or voice.

---

## 1. Updating Course Reflections (Semester 1)

1. Open `src/content/semesters/01-semestr.md`.
2. Locate the course inside the `courses:` array (for example `ISKM02`).
3. Change `status: "in-progress"` to `status: "completed"`.
4. Add a `reflection:` block using YAML multiline syntax (`|`), highlighting key takeaways with `**bold**` and avoiding long dashes (`—` / `–`):

```yaml
  - code: "ISKM02"
    name: "Design informačních služeb, rozhraní a interakcí"
    status: "completed"
    reflection: |
      Zde napiš samotnou reflexi v češtině. Klíčové myšlenky zvýrazni **tučným textem**,
      aby šel text snadno prolétnout očima, a případně doplň [odkaz](https://example.com).

      Druhý odstavec reflexe o tom, co mi předmět dal do praxe a co mě překvapilo.
```

5. Once the whole semester wraps up, change top-level `status: "active"` to `status: "completed"` and optionally write an overall semester reflection below the closing `---` of frontmatter.

---

## 2. Activating Semester 2, 3, or 4

1. Open `02-semestr.md`, `03-semestr.md`, or `04-semestr.md`.
2. Change `status: "upcoming"` to `status: "active"`.
3. Update `summary` and populate `courses`.
4. Run `npm run build` to generate `/studium/2-semestr` (or `3`/`4`) and unlock its overview cards automatically.

---

## 3. Adding New Photos & Icons (3G Safe)

1. Place photos in `src/assets/images/` and company/school icons in `src/assets/logos/` using lowercase kebab-case filenames.
2. Import and render via Astro `<Image />` with explicit `widths` and `sizes`:
   ```astro
   import { Image } from 'astro:assets';
   import newPhoto from '@/assets/images/example-photo.jpg';
   ```
3. For UI icons, import individual icons from `@lucide/astro/icons/<icon-name>` (e.g. `import BookOpen from '@lucide/astro/icons/book-open';`).

---

## 4. Czech Copy & Formatting Checklist

- **Natural first-person voice:** Avoid copy-pasting questionnaire prompts like *"Kdo jste?"*. Use natural headings (*"Od multimédií k návrhu produktů a služeb"*, *"Proč jsem si vybral právě KISK"*).
- **Zero long dashes:** Never use `—` or `–` anywhere on the site. Rewrite sentences naturally with commas, colons, periods, `·`, or standard `-`.
- **Scannable text:** Bold the most important phrases (`**tučně**` in Markdown or `<strong class="font-semibold text-ink">` in Astro) so readers can scan every card effortlessly.
