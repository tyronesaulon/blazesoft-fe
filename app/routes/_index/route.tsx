import type { MetaFunction } from "@remix-run/node";
import { json } from "@remix-run/node";
import { AppShell } from "@mantine/core";
import { Header, HEADER_HEIGHT } from "~/core/Header/Header";
import { useReducer, useState } from "react";
import type { Book } from "~/domains/books/models/book.interface";
import { useLoaderData } from "@remix-run/react";
import BooksTable from "~/routes/_index/books-table";
import { useDisclosure } from "@mantine/hooks";
import { BookEditor } from "~/routes/_index/book-editor";
import { MOCK_BOOKS } from "~/routes/_index/mocks";
import reducer, { initialState } from "~/routes/_index/store/reducer";
import { BookActionType } from "~/routes/_index/store/actions";

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

  return (
    <AppShell header={{ height: HEADER_HEIGHT }} pt={APPSHELL_PADDING_TOP}>
      <Header />
      <BooksTable books={data} onSelect={select} onDelete={del} />
      <BookEditor opened={opened} onClose={update} value={form} />
    </AppShell>
  );
}
