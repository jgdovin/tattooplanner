"use client";

import { Button } from "@/components/ui/button";
import { faClipboard } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";

const DEFAULT_TEXT = <>Booking URL <FontAwesomeIcon className="pl-1" icon={faClipboard} /></>

export default function LocationCopyButton({locationId}: {locationId: string}) {
  const [buttonText, setButtonText] = useState(DEFAULT_TEXT)
  return (
    <Button
      className="w-32"
      onClick={() => {
        try {
          navigator.clipboard
            .writeText(`${process.env.NEXT_PUBLIC_API_HOSTNAME}/book/${locationId}`)
            .then(() => {
              setButtonText(<>Copied...</>);
              setTimeout(() => {
                setButtonText(DEFAULT_TEXT)
              }, 1000);
            });
        } catch (e) {}
      }}
    >
      {buttonText}
    </Button>
  );
}
