"use client";

import { SignUp } from "@clerk/nextjs";

export default function SignUpPage() {
  return (
    <div>
      <SignUp
        signInUrl="/user/sign-in"
        fallbackRedirectUrl="/dashboard"
        unsafeMetadata={{ role: "user" }}
      />
    </div>
  );
}
