import { faker } from "@faker-js/faker";
import type { Book } from "~/domains/books/models/book.interface";
import { BookCategory } from "~/domains/books/models/book-categories.enum";

export const MOCK_BOOKS: Book[] = [
  {
    id: faker.string.uuid(),
    name: "Red Rising",
    description:
      "Darrow is a Red, a member of the lowest caste in the color-coded society of the future. Like his fellow Reds, he works all day, believing that he and his people are making the surface of Mars livable for future generations.",
    category: BookCategory.SciFi,
    price: 59.99,
  },
  {
    id: faker.string.uuid(),
    name: "Golden Son",
    description:
      "With shades of The Hunger Games, Ender’s Game, and Game of Thrones, debut author Pierce Brown’s genre-defying epic Red Rising hit the ground running and wasted no time becoming a sensation. Golden Son continues the stunning saga of Darrow, a rebel forged by tragedy, battling to lead his oppressed people to freedom from the overlords of a brutal elitist future built on lies. Now fully embedded among the Gold ruling class, Darrow continues his work to bring down Society from within.",
    category: BookCategory.SciFi,
    price: 59.99,
  },
  {
    id: faker.string.uuid(),
    name: "Morning Star",
    description:
      "Darrow would have lived in peace, but his enemies brought him war. The Gold overlords demanded his obedience, hanged his wife, and enslaved his people. But Darrow is determined to fight back. Risking everything to transform himself and breach Gold society, Darrow has battled to survive the cutthroat rivalries that breed Society’s mightiest warriors, climbed the ranks, and waited patiently to unleash the revolution that will tear the hierarchy apart from within.",
    category: BookCategory.SciFi,
    price: 59.99,
  },
];
