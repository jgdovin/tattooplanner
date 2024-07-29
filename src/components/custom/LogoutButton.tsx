import { faDoorOpen } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";

export function LogoutButton() {
  return (
    <Link href="/api/auth/signout" className="button">
      <FontAwesomeIcon icon={faDoorOpen} />
    </Link>
  );
}
