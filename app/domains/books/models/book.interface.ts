import { z } from "zod";

export const bookSchema = z.object({
  id: z.string().uuid(),
  name: z.string(),
  price: z.number(),
  category: z.string(),
  description: z.string(),
});

export type Book = z.infer<typeof bookSchema>;
