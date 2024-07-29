import Link from "next/link";
import { useSession, signIn, signOut } from "next-auth/react";

import { Logo } from "@/components/custom/Logo";
import { Button } from "@/components/ui/button";
import { LogoutButton } from "@/components/custom/LogoutButton";

interface AuthUserProps {
  email: string;
}

export function LoggedInUser({
  userData,
}: {
  readonly userData: AuthUserProps;
}) {
  return (
    <div className="flex gap-2">
      <Link
        href="/dashboard/account"
        className="font-semibold hover:text-primary"
      >
        {userData.email}
      </Link>
      <LogoutButton />
    </div>
  );
}

export function Header() {
  const { data: session } = useSession();
  return (
    <div className="flex items-center justify-between px-4 py-3 bg-white shadow-md dark:bg-gray-800">
      <Logo />
      <div className="flex items-center gap-4">
        {session ? (
          <LoggedInUser userData={{ email: session?.user?.email || "" }} />
        ) : (
          <Link href="/api/auth/signin">
            <Button>Sign In</Button>
          </Link>
        )}
      </div>
    </div>
  );
}
