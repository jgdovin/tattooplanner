"use client";

import { SignIn } from "@clerk/nextjs";

export default function SignInPage() {
  return (
    <div>
      <SignIn signUpUrl="/user/sign-up" fallbackRedirectUrl="/dashboard" />
    </div>
  );
}
