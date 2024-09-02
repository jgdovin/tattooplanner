"use client";

import { SignIn } from "@clerk/nextjs";

export default function SignInPage() {
  return (
    <div>
      <SignIn
        transferable={false}
        signUpUrl="/user/sign-up"
        fallbackRedirectUrl="/dashboard"
      />
    </div>
  );
}
