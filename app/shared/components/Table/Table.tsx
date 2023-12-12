import { Card, Center, Table as MantineTable, Text } from "@mantine/core";
import type { ReactElement } from "react";

export const DEFAULT_EMPTY_PLACEHOLDER = "No content";

export interface TableColumn<T> {
  name: string;
  cell?: (row: T) => ReactElement | string;
}

export interface TableProps<T> {
  loading?: boolean;
  columns: TableColumn<T>[];
  data: T[];
  emptyPlaceholder?: ReactElement | string;
}

export function Table<T extends { id: string }>({
  loading,
  columns,
  data,
  emptyPlaceholder,
}: TableProps<T>) {
  const isEmpty = !loading && !data.length;

  return (
    <Card withBorder>
      <MantineTable>
        <MantineTable.Thead>
          <MantineTable.Tr>
            {columns.map((column) => {
              return (
                <MantineTable.Th key={column.name}>
                  {column.name}
                </MantineTable.Th>
              );
            })}
          </MantineTable.Tr>
        </MantineTable.Thead>
        <MantineTable.Tbody>
          {data.map((row) => {
            return (
              <MantineTable.Tr key={row.id}>
                {columns.map((column) => {
                  return (
                    <MantineTable.Td key={column.name}>
                      {column.cell ? column.cell(row) : null}
                    </MantineTable.Td>
                  );
                })}
              </MantineTable.Tr>
            );
          })}
        </MantineTable.Tbody>
      </MantineTable>
      {isEmpty && (
        <Center>
          {!emptyPlaceholder ? (
            DEFAULT_EMPTY_PLACEHOLDER
          ) : typeof emptyPlaceholder === "string" ? (
            <Text c="dimmed">{emptyPlaceholder}</Text>
          ) : (
            emptyPlaceholder
          )}
        </Center>
      )}
    </Card>
  );
}
