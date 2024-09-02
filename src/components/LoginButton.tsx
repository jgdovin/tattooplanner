import { useSession, signIn, signOut } from "next-auth/react";
export default function LoginButton() {
  const { data: session } = useSession();
  if (session) {
    return (
      <>
        {session.user?.email}
        <button onClick={() => signOut()}>Sign out</button>
      </>
    );
  }
  return (
    <>
      <button onClick={() => signIn()}>Sign in</button>
    </>
  );
}
