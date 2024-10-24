"use client";

import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

export function RedirectButton() {
  const router = useRouter();
  return (
    <Button
      className="text-lg p-6 rounded-xl flex gap-2"
      onClick={() => router.push("/dashboard")}
    >
      Dashboard <FontAwesomeIcon icon={faArrowRight} className="w-5 h-5" />
    </Button>
  );
}
