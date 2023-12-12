import {
  Button,
  Modal,
  NumberInput,
  Stack,
  Textarea,
  TextInput,
} from "@mantine/core";
import { IconCurrencyDollar } from "@tabler/icons-react";
import type { Book } from "~/domains/books/models/book.interface";
import { bookSchema } from "~/domains/books/models/book.interface";
import type { z } from "zod";
import { useForm, zodResolver } from "@mantine/form";
import { useEffect, useState } from "react";

export const bookFormSchema = bookSchema.omit({ id: true });
export type BookForm = z.infer<typeof bookFormSchema>;
const INITIAL_VALUE: BookForm = {
  name: "",
  description: "",
  category: "",
  price: 0,
};

export interface BookEditorProps {
  opened: boolean;
  onClose: (book?: Book) => void;
  value?: Book;
}

export function BookEditor({
  opened,
  onClose: controlledOnClose,
  value,
}: BookEditorProps) {
  const [initialized, setInitialized] = useState(false);
  const form = useForm<BookForm>({
    initialValues: INITIAL_VALUE,
    validate: zodResolver(bookFormSchema),
  });

  const onClose = (book?: Book) => {
    controlledOnClose(book);
    form.reset();
    setInitialized(false);
  };

  const submit = (book: BookForm) => {
    const changes = bookSchema.parse({
      id: value?.id,
      ...book,
    });

    onClose(changes);
  };

  useEffect(() => {
    if (!opened || initialized) {
      return;
    }

    if (value) {
      const book = bookFormSchema.parse(value);
      form.setValues(book);
    } else {
      form.reset();
    }

    setInitialized(true);
  }, [form, initialized, opened, value]);

  return (
    <Modal title="Book Editor" opened={opened} onClose={onClose}>
      <form onSubmit={form.onSubmit(submit)}>
        <Stack>
          <TextInput label="Name" {...form.getInputProps("name")} />
          <Textarea
            label="Description"
            {...form.getInputProps("description")}
          />
          <TextInput label="Category" {...form.getInputProps("category")} />
          <NumberInput
            leftSection={<IconCurrencyDollar size={16} />}
            label="Price"
            {...form.getInputProps("price")}
          />
          <Button type="submit">Save</Button>
        </Stack>
      </form>
    </Modal>
  );
}
