import "@mantine/core/styles.css";

import { cssBundleHref } from "@remix-run/css-bundle";
import type { LinksFunction } from "@remix-run/node";
import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from "@remix-run/react";
import {
  ColorSchemeScript,
  MantineProvider,
  TypographyStylesProvider,
} from "@mantine/core";

export const links: LinksFunction = () => [
  ...(cssBundleHref ? [{ rel: "stylesheet", href: cssBundleHref }] : []),
];

export default function App() {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width,initial-scale=1" />
        <Meta />
        <Links />
        <ColorSchemeScript />
      </head>
      <body>
        <MantineProvider>
          <TypographyStylesProvider p={0}>
            <Outlet />
            <ScrollRestoration />
            <Scripts />
            <LiveReload />
          </TypographyStylesProvider>
        </MantineProvider>
      </body>
    </html>
  );
}
