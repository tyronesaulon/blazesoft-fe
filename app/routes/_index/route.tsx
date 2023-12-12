import type { MetaFunction } from "@remix-run/node";
import { json } from "@remix-run/node";
import { AppShell, Container, Stack } from "@mantine/core";
import { Header, HEADER_HEIGHT } from "~/core/components/header/header";
import { useReducer, useState } from "react";
import type { Book } from "~/domains/books/models/book.interface";
import { bookSchema } from "~/domains/books/models/book.interface";
import { useLoaderData } from "@remix-run/react";
import BooksTable from "~/routes/_index/books-table";
import { useDisclosure } from "@mantine/hooks";
import type { BookForm } from "~/routes/_index/book-editor";
import { BookEditor } from "~/routes/_index/book-editor";
import { MOCK_BOOKS } from "~/routes/_index/mocks";
import reducer, { initialState } from "~/routes/_index/store/reducer";
import { BookActionType } from "~/routes/_index/store/actions";
import { faker } from "@faker-js/faker";
import { BookTableHeader } from "~/routes/_index/book-table-header";

const APPSHELL_PADDING_TOP = HEADER_HEIGHT + 24;

export const meta: MetaFunction = () => {
  return [{ title: "Blazesoft Frontend Assessment" }];
};

export async function loader() {
  return json({ books: MOCK_BOOKS });
}

export default function Index() {
  const loaderData = useLoaderData<typeof loader>();
  const [state, dispatch] = useReducer(reducer, {
    ...initialState,
    ...loaderData,
  });

  const [form, setForm] = useState<Book>();
  const [opened, { open, close }] = useDisclosure();
  const data = state.books;

  const select = (book: Book) => {
    setForm(book);
    open();
  };

  const create = (book: BookForm) => {
    const id = faker.string.uuid();
    const newBook = bookSchema.parse({
      ...book,
      id,
    });

    dispatch({
      type: BookActionType.ADD_BOOK,
      payload: newBook,
    });
  };

  const del = (book: Book) => {
    dispatch({
      type: BookActionType.REMOVE_BOOK,
      payload: book.id,
    });
  };

  const update = (book?: Book) => {
    if (book) {
      dispatch({
        type: BookActionType.UPDATE_BOOK,
        payload: book,
      });
    }

    close();
  };

  const onCloseForm = (book?: Book | BookForm) => {
    if (book) {
      if ((book as Book)?.id) {
        update(book as Book);
      } else {
        create(book);
      }
    }

    close();
  };

  const onAddBook = () => {
    setForm(undefined);
    open();
  };

  return (
    <>
      <AppShell header={{ height: HEADER_HEIGHT }} pt={APPSHELL_PADDING_TOP}>
        <Header />
        <Container size="lg">
          <Stack>
            <BookTableHeader onClickAddBook={onAddBook} />
            <BooksTable books={data} onSelect={select} onDelete={del} />
          </Stack>
        </Container>
      </AppShell>
      <BookEditor opened={opened} onClose={onCloseForm} value={form} />
    </>
  );
}
