import type { MetaFunction } from "@remix-run/node";
import { AppShell } from "@mantine/core";
import { Header, HEADER_HEIGHT } from "~/core/Header/Header";

export const meta: MetaFunction = () => {
  return [
    { title: "New Remix App" },
    { name: "description", content: "Welcome to Remix!" },
  ];
};

export default function Index() {
  return (
    <AppShell header={{ height: HEADER_HEIGHT }}>
      <Header />
    </AppShell>
  );
}
