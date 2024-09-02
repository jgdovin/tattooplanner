"use client";

import { getLocationsArtistId } from "@/actions/book";
import { SignUp } from "@clerk/nextjs";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function SignUpPage() {
  const [loading, setLoading] = useState(true);
  const [artistId, setArtistId] = useState("");

  const params = useSearchParams();
  const locationId = params.get("location_id");

  useEffect(() => {
    if (locationId) {
      getLocationsArtistId(locationId).then((res) => {
        setArtistId(res);
      });
    }
  }, [artistId, setArtistId, locationId]);

  useEffect(() => {
    setLoading(false);
  }, []);
  return (
    <div>
      {loading ? (
        <div>Loading...</div>
      ) : (
        <SignUp
          fallbackRedirectUrl="/customer/profile"
          unsafeMetadata={{ role: "customer", artistId }}
        />
      )}
    </div>
  );
}
