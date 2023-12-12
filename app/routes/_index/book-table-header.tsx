import { Button, Group } from "@mantine/core";
import { IconPlus } from "@tabler/icons-react";

export interface BookTableHeaderProps {
  onClickAddBook: () => void;
}

export function BookTableHeader({ onClickAddBook }: BookTableHeaderProps) {
  return (
    <Group justify="flex-end">
      <Button leftSection={<IconPlus size={16} />} onClick={onClickAddBook}>
        Add Book
      </Button>
    </Group>
  );
}
