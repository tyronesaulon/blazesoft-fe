import type { Book } from "~/domains/books/models/book.interface";
import type { BookActions } from "~/routes/_index/store/actions";
import { BookActionType } from "~/routes/_index/store/actions";

export type BooksState = {
  books: Book[];
};

export default function reducer(
  state: BooksState = initialState,
  action: BookActions,
): BooksState {
  switch (action.type) {
    case BookActionType.ADD_BOOK:
      return {
        ...state,
        books: [...state.books, action.payload],
      };
    case BookActionType.REMOVE_BOOK:
      return {
        ...state,
        books: state.books.filter((book) => book.id !== action.payload),
      };
    case BookActionType.UPDATE_BOOK:
      return {
        ...state,
        books: state.books.map((book) =>
          book.id === action.payload.id ? action.payload : book,
        ),
      };
    default:
      return state;
  }
}

export const initialState: BooksState = {
  books: [],
};
