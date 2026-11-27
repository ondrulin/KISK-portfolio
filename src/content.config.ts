import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const semesters = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/semesters' }),
  schema: z.object({
    semesterNumber: z.number().int().min(1).max(4),
    slug: z.string(),
    title: z.string(),
    period: z.string(),
    status: z.enum(['active', 'upcoming', 'completed']),
    summary: z.string(),
    courses: z
      .array(
        z.object({
          code: z.string(),
          name: z.string(),
          status: z.enum(['in-progress', 'completed']).default('in-progress'),
          reflection: z.string().optional(),
        }),
      )
      .default([]),
  }),
});

export const collections = { semesters };
