import { defineCollection, z } from 'astro:content'

export const collections = {
  blog: defineCollection({
    schema: z.object({
      title: z.string(),
      description: z.string(),
      date: z.coerce.date(),
      updatedAt: z.coerce.date().optional(),
      author: z.string().optional(),
      category: z.string(),
      tags: z.array(z.string()).default([]),
      image: z.string().optional(),
      draft: z.boolean().default(false),
    }),
  }),
}
