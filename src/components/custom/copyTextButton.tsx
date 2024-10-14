"use client";

import { Button } from "@/components/ui/button";
import { faClipboard } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";

export default function CopyTextButton({
  textToCopy,
  label,
}: {
  textToCopy: string;
  label: string;
}) {
  const [buttonText, setButtonText] = useState(label);
  return (
    <Button
      className="w-32"
      onClick={() => {
        try {
          navigator.clipboard.writeText(textToCopy).then(() => {
            setButtonText("Copied...");
            setTimeout(() => {
              setButtonText(label);
            }, 1000);
          });
        } catch (e) {}
      }}
    >
      {buttonText} <FontAwesomeIcon className="pl-1" icon={faClipboard} />
    </Button>
  );
}
