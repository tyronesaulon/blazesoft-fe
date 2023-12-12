import type { TableColumn } from "~/shared/Table/Table";
import { Table } from "~/shared/Table/Table";
import type { Book } from "~/domains/books/models/book.interface";
import { ActionIcon, Anchor, Container, Menu } from "@mantine/core";
import { IconDots, IconEdit, IconTrash } from "@tabler/icons-react";

export interface BooksProps {
  books: Book[];
  onSelect: (book: Book) => void;
  onDelete: (book: Book) => void;
}

export default function BooksTable({ books, onSelect, onDelete }: BooksProps) {
  const columns: TableColumn<Book>[] = [
    {
      name: "Title",
      cell: (row: Book) => (
        <Anchor onClick={() => onSelect(row)}>{row.name}</Anchor>
      ),
    },
    { name: "Description", cell: (row: Book) => <div>{row.description}</div> },
    { name: "Category", cell: (row: Book) => <div>{row.category}</div> },
    { name: "Price", cell: (row: Book) => <div>{row.price}</div> },
    {
      name: "",
      cell: (row: Book) => {
        return (
          <Menu>
            <Menu.Target>
              <ActionIcon variant="subtle">
                <IconDots />
              </ActionIcon>
            </Menu.Target>
            <Menu.Dropdown>
              <Menu.Item
                leftSection={<IconEdit size={16} />}
                onClick={() => onSelect(row)}
              >
                Edit
              </Menu.Item>
              <Menu.Item
                leftSection={<IconTrash size={16} />}
                color="red"
                onClick={() => onDelete(row)}
              >
                Delete
              </Menu.Item>
            </Menu.Dropdown>
          </Menu>
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
