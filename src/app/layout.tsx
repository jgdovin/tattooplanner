import type { Metadata } from "next";
import "./globals.css";
import { cn } from "@/lib/utils";

import { ClerkProvider } from "@clerk/nextjs";
import { serif } from "@/lib/fonts";

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
      <body className={cn(`min-h-screen antialiased ${serif.className}`)}>
        <ClerkProvider>{children}</ClerkProvider>
      </body>
    </html>
  );
}
