import { NextSSRPlugin } from "@uploadthing/react/next-ssr-plugin";
import { ThemeProvider } from "next-themes";
import type { Metadata } from "next";
import { Inter as FontSans } from "next/font/google";
import "./globals.css";
import { extractRouterConfig } from "uploadthing/server";
import { ourFileRouter } from "./api/uploadthing/core";
import "@uploadthing/react/styles.css";
import { cn } from "@/lib/utils";

import { Provider } from "jotai";
import { ClerkProvider } from "@clerk/nextjs";
import { Toaster } from "@/components/ui/sonner";

const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const metadata: Metadata = {
  title: "Tattoo Plan",
  description: "All your tattoo shop needs in one place",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={cn(
          "min-h-screen bg-background font-sans antialiased",
          fontSans.variable
        )}
      >
        <NextSSRPlugin routerConfig={extractRouterConfig(ourFileRouter)} />
        <ThemeProvider attribute="class">
          <ClerkProvider>
            <Provider>
              <Toaster position="top-center" />
              {children}
            </Provider>
          </ClerkProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
