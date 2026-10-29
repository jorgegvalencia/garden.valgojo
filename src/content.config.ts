import { defineCollection, reference } from "astro:content";
import { glob } from "astro/loaders";
import { z } from "astro/zod";
import { stageKeys, topicKeys } from "./lib/garden";

const notes = defineCollection({
  loader: glob({ pattern: "**/*.{md,mdx}", base: "./src/content/notes" }),
  schema: z
    .object({
      title: z.string(),
      summary: z.string(),
      topic: z.enum(topicKeys),
      stage: z.enum(stageKeys),
      plantedAt: z.coerce.date(),
      // Historial de riegos; la fecha del último riego se deriva de aquí
      waterings: z
        .array(z.object({ date: z.coerce.date(), note: z.string().optional() }))
        .default([]),
      related: z.array(reference("notes")).default([]),
      // Sustituye la imagen social generada; ruta bajo /public (p. ej. "/mi-imagen.png")
      image: z.string().optional(),
      draft: z.boolean().default(false),
    })
    .refine(({ plantedAt, waterings }) => waterings.every(({ date }) => date >= plantedAt), {
      message: "Ningún riego puede ser anterior a la fecha de plantada",
      path: ["waterings"],
    }),
});

export const collections = { notes };
