import { MenuLink } from "@/components/custom/MenuLink";
import {
  faGauge,
  faUser,
  faPalette,
  faBuilding,
  faPaintBrush,
  faEnvelope,
} from "@fortawesome/free-solid-svg-icons";

export function Nav() {
  return (
    <nav className="border-r bg-accent/10 dark:bg-gray-800/40 h-screen">
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
              href="/dashboard/locations"
              icon={faBuilding}
            />
            <MenuLink
              text="Services"
              href="/dashboard/services"
              icon={faPaintBrush}
            />
            <MenuLink
              text="Surveys"
              href="/dashboard/settings/surveys"
              icon={faEnvelope}
            />
            <MenuLink
              text="Email Templates"
              href="/dashboard/settings/email/templates"
              icon={faEnvelope}
            />
          </nav>
        </div>
      </div>
    </nav>
  );
}
