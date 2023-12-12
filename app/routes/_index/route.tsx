import type { MetaFunction } from "@remix-run/node";
import { json } from "@remix-run/node";
import { AppShell } from "@mantine/core";
import { Header, HEADER_HEIGHT } from "~/core/Header/Header";
import { useState } from "react";
import type { Book } from "~/domains/books/models/book.interface";
import { faker } from "@faker-js/faker";
import { useLoaderData } from "@remix-run/react";
import BooksTable from "~/routes/_index/books-table";
import { useDisclosure } from "@mantine/hooks";
import { BookEditor } from "~/routes/_index/book-editor";

const APPSHELL_PADDING_TOP = HEADER_HEIGHT + 24;
const INITIAL_BOOKS: Book[] = Array.from({ length: 10 }).map(() => ({
  id: faker.string.uuid(),
  name: faker.lorem.words(),
  description: faker.lorem.paragraph(),
  category: faker.lorem.word(),
  price: faker.number.int({ min: 1, max: 300 }),
}));

export const meta: MetaFunction = () => {
  return [{ title: "Blazesoft Frontend Assessment" }];
};

export async function loader() {
  return json({ books: INITIAL_BOOKS });
}

export default function Index() {
  const loaderData = useLoaderData<typeof loader>();
  const [data, setData] = useState<Book[]>(loaderData?.books ?? []);
  const [form, setForm] = useState<Book>();
  const [opened, { open, close }] = useDisclosure();

  const select = (book: Book) => {
    setForm(book);
    open();
  };

  const del = (book: Book) => {
    setData((books) => books.filter((b) => b.id !== book.id));
  };

  const update = (book?: Book) => {
    if (book) {
      setData((books) =>
        books.map((b) => (b.id === book.id ? { ...b, ...book } : b)),
      );
    }

    close();
  };

  return (
    <AppShell header={{ height: HEADER_HEIGHT }} pt={APPSHELL_PADDING_TOP}>
      <Header />
      <BooksTable books={data} onSelect={select} onDelete={del} />
      <BookEditor opened={opened} onClose={update} value={form} />
    </AppShell>
  );
}
