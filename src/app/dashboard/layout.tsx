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
import LayoutClient from "./layoutClient";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex flex-col h-screen justify-between">
      <LayoutClient>{children}</LayoutClient>
    </div>
  );
}
