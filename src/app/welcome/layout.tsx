"use client";
import { SessionProvider } from "next-auth/react";
import { Session } from "next-auth";
import Link from "next/link";
import {
  faBuilding,
  faCalendar,
  faGauge,
  faPaintBrush,
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
      <div className="flex flex-col h-screen justify-between bg-blue-200">
        <Header />
        <div className="h-full bg-red-200">
          <main className="flex flex-col bg-green-200">{children}</main>
        </div>
        <Footer />
      </div>
    </SessionProvider>
  );
}
