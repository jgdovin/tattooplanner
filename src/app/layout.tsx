import { ThemeProvider } from "next-themes";
import type { Metadata } from "next";
import { Inter as FontSans } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";

import { Provider as JotaiProvider } from "jotai";
import { ClerkProvider } from "@clerk/nextjs";
import { Toaster } from "@/components/ui/sonner";
import ClientLayout from "./ClientLayout";

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
        <ClerkProvider>
          <ThemeProvider attribute="class">
            <JotaiProvider>
              <Toaster position="top-center" richColors={true} />
              <ClientLayout>{children}</ClientLayout>
            </JotaiProvider>
          </ThemeProvider>
        </ClerkProvider>
      </body>
    </html>
  );
}
