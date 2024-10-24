"use client";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";

export function CreateButton({
  feature,
  clickHandler,
  url,
}: {
  feature: string;
  clickHandler?: () => void;
  url?: string;
}) {
  const router = useRouter();

  const handleClick = () => {
    if (url) {
      router.push(url);
    }
    if (clickHandler) {
      clickHandler();
    }
  };

  return (
    <Button variant="outline" onClick={() => handleClick()}>
      Create {feature} <FontAwesomeIcon className="pl-1" icon={faPlus} />
    </Button>
  );
}
