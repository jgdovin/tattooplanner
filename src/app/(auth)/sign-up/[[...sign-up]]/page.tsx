import { SignUp } from "@clerk/nextjs";

export default function SignUpPage() {
  return (
    <SignUp
      signInUrl="/sign-in"
      fallbackRedirectUrl="/dashboard"
      unsafeMetadata={{ role: "user" }}
    />
  );
}
