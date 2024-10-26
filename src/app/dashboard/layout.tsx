import { ThemeProvider } from "next-themes";
import LayoutClient from "./layoutClient";
import { Toaster } from "@/components/ui/sonner";
import { Nav } from "./_components/Nav";
import { Footer } from "@/components/custom/Footer";
import { Header } from "@/components/custom/Header";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="min-h-screen">
      <ThemeProvider attribute="class">
        <Toaster position="top-center" richColors={true} />
        <LayoutClient>
          <Header />
          <div className="grid grid-cols-[180px_1fr] h-full">
            <Nav />
            <main className="flex flex-col overflow-auto bg-accent/5 p-10">
              {children}
            </main>
          </div>
          <Footer />
        </LayoutClient>
      </ThemeProvider>
    </div>
  );
}
