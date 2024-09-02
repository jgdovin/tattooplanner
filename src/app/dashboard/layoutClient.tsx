"use client";

import { Footer } from "@/components/custom/Footer";
import { Header } from "@/components/custom/Header";
import { MenuLink } from "@/components/custom/MenuLink";
import {
  faGauge,
  faUser,
  faPalette,
  faBuilding,
  faPaintBrush,
} from "@fortawesome/free-solid-svg-icons";

export default function LayoutClient({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Header />
      <div className="grid grid-cols-[240px_1fr] h-full">
        <nav className="border-r bg-gray-100/40 dark:bg-gray-800/40">
          <div className="flex flex-col gap-2">
            <div className="flex h-[60px] items-center border-b px-6">
              TattooPlan
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
                  text="Calendar"
                  href="/dashboard/calendar"
                  icon={faPalette}
                />
                <MenuLink
                  text="Locations"
                  href="/dashboard/settings/locations"
                  icon={faBuilding}
                />
                <MenuLink
                  text="Services"
                  href="/dashboard/settings/services"
                  icon={faPaintBrush}
                />
              </nav>
            </div>
          </div>
        </nav>
        <main className="flex flex-col overflow-auto">{children}</main>
      </div>
      <Footer />
    </>
  );
}
