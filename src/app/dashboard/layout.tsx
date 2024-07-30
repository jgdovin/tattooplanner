"use client";
import { SessionProvider } from "next-auth/react";
import { Session } from "next-auth";
import Link from "next/link";
import { faGauge, faPalette, faUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Header } from "@/components/custom/Header";
import { Footer } from "@/components/custom/Footer";
export default function RootLayout({
  children,
  session,
}: Readonly<{
  children: React.ReactNode;
  session: Session | null;
}>) {
  return (
    <SessionProvider session={session}>
      <div className="flex flex-col h-screen justify-between">
        <Header />
        <div className="grid grid-cols-[240px_1fr] h-full">
          <nav className="border-r bg-gray-100/40 dark:bg-gray-800/40">
            <div className="flex flex-col gap-2">
              <div className="flex h-[60px] items-center border-b px-6">
                <Link
                  className="flex items-center gap-2 font-semibold"
                  href="/dashboard"
                >
                  <span className="">Dashboard</span>
                </Link>
              </div>
              <div className="flex-1 overflow-auto py-2">
                <nav className="grid items-start px-4 text-sm font-medium">
                  <Link
                    className="flex items-center gap-3 rounded-lg px-3 py-2 text-gray-500 transition-all hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50"
                    href="/dashboard"
                  >
                    <FontAwesomeIcon className="pr-3" icon={faGauge} />
                    Dashboard
                  </Link>

                  <Link
                    className="flex items-center gap-3 rounded-lg px-3 py-2 text-gray-500 transition-all hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50"
                    href="/dashboard/customers"
                  >
                    <FontAwesomeIcon className="pr-3" icon={faUser} />
                    Customers
                  </Link>

                  <Link
                    className="flex items-center gap-3 rounded-lg px-3 py-2 text-gray-500 transition-all hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50"
                    href="/dashboard/projects"
                  >
                    <FontAwesomeIcon className="pr-3" icon={faPalette} />
                    Projects
                  </Link>
                </nav>
              </div>
            </div>
          </nav>
          <main className="flex flex-col overflow-scroll">{children}</main>
        </div>
        <Footer />
      </div>
    </SessionProvider>
  );
}
