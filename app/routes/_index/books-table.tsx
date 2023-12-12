import type { TableColumn } from "~/shared/Table/Table";
import { Table } from "~/shared/Table/Table";
import type { Book } from "~/domains/books/models/book.interface";
import { Button, Container } from "@mantine/core";

export interface BooksProps {
  books: Book[];
  onDelete: (book: Book) => void;
  onUpdate: (book: Book) => void;
}

export default function BooksTable({ books, onDelete, onUpdate }: BooksProps) {
  const columns: TableColumn<Book>[] = [
    { name: "Title", cell: (row: Book) => <div>{row.name}</div> },
    { name: "Description", cell: (row: Book) => <div>{row.description}</div> },
    { name: "Category", cell: (row: Book) => <div>{row.category}</div> },
    { name: "Price", cell: (row: Book) => <div>{row.price}</div> },
    {
      name: "",
      cell: (row: Book) => {
        return (
          <div>
            <Button size="xs" onClick={() => onDelete(row)}>
              Delete
            </Button>
            <Button
              size="xs"
              onClick={() => onUpdate({ ...row, name: "New Name" })}
            >
              Update
            </Button>
          </div>
        );
      },
    },
  ];

  return (
    <Container size="md">
      <Table<Book> columns={columns} data={books} />
    </Container>
  );
}