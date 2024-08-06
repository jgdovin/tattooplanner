"use client";
import { SessionProvider } from "next-auth/react";
import { Session } from "next-auth";
import Link from "next/link";
import {
  faBuilding,
  faCalendar,
  faGauge,
  faPalette,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import { MenuLink } from "@/components/custom/MenuLink";
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
                <nav className="grid gap-1 px-2 group-[[data-collapsed=true]]:justify-center group-[[data-collapsed=true]]:px-2">
                  <MenuLink text="Dashboard" href="/dashboard" icon={faGauge} />
                  <MenuLink
                    text="Customers"
                    href="/dashboard/customers"
                    icon={faUser}
                  />
                  <MenuLink
                    text="Projects"
                    href="/dashboard/projects"
                    icon={faPalette}
                  />
                  <MenuLink
                    text="Locations"
                    href="/dashboard/settings/locations"
                    icon={faBuilding}
                  />
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
