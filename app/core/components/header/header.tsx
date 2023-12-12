import type { AppShellHeaderProps } from "@mantine/core";
import { AppShellHeader, Group, Title } from "@mantine/core";

export const HEADER_HEIGHT = 60;

export type HeaderProps = AppShellHeaderProps;

export function Header({ ...props }: HeaderProps) {
  return (
    <AppShellHeader {...props} px="md">
      <Group align="center" h="100%">
        <Title m={0} order={2}>
          Blazesoft Assessment
        </Title>
      </Group>
    </AppShellHeader>
  );
}
