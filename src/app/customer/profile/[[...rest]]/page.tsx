"use client";
import { SignedIn, UserProfile } from "@clerk/nextjs";
import { useEffect, useState } from "react";

export default function Page() {
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    setLoading(false);
  }, []);
  return (
    <div>
      <SignedIn>{!loading && <UserProfile />}</SignedIn>
    </div>
  );
}
