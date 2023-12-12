import type { Book } from "~/domains/books/models/book.interface";

export enum BookActionType {
  ADD_BOOK = "ADD_BOOK",
  REMOVE_BOOK = "REMOVE_BOOK",
  UPDATE_BOOK = "UPDATE_BOOK",
}

export interface BookAction<T = undefined> {
  type: BookActionType;
  payload?: T;
}

export interface AddBookAction extends BookAction<Book> {
  type: BookActionType.ADD_BOOK;
  payload: Book;
}

export interface RemoveBookAction extends BookAction<string> {
  type: BookActionType.REMOVE_BOOK;
  payload: string;
}

export interface UpdateBookAction extends BookAction<Book> {
  type: BookActionType.UPDATE_BOOK;
  payload: Book;
}

export type BookActions = AddBookAction | RemoveBookAction | UpdateBookAction;
