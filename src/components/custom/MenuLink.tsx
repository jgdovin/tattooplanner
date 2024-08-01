import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
import { usePathname } from "next/navigation";

export interface MenuLinkProps {
  text: string;
  href: string;
  icon: any;
}

export const MenuLink = ({ text, href, icon }: MenuLinkProps) => {
  const active = usePathname() === href;

  return (
    <Link
      className={`
        inline-flex items-center whitespace-nowrap text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 hover:bg-gray-500/90 hover:text-white h-9 rounded-md px-3 dark:text-white dark:hover:bg-gray-500/90 dark:hover:text-white justify-start 
        ${
          active
            ? "dark:bg-gray-500 bg-gray-600 text-white"
            : "dark:bg-gray-700"
        } 
      `}
      href={href}
    >
      <FontAwesomeIcon className="pr-3" icon={icon} height={14} />
      {text}
    </Link>
  );
};
