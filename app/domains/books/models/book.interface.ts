import { z } from "zod";
import { BookCategory } from "~/domains/books/models/book-categories.enum";

export const bookSchema = z.object({
  id: z.string().uuid(),
  name: z.string(),
  price: z.number(),
  category: z.nativeEnum(BookCategory),
  description: z.string(),
});

export type Book = z.infer<typeof bookSchema>;
