import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { formSchema, LocationForm } from "@/forms/locationForm";
import * as z from "zod";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useCallback, useEffect } from "react";

interface LocationDialogProps {
  isOpen: boolean;
  setIsOpen: (value: boolean) => void;
  locationId?: string;
  formData?: any;
}

const defaultValues = {
  name: "",
  nickname: "",
  description: "",
  phone: "",
  address1: "",
  address2: "",
  city: "",
  state: "",
  zip: "",
  type: "PHYSICAL" as const,
  monStart: "09:00",
  monEnd: "17:00",
  monClosed: false,
  tueStart: "09:00",
  tueEnd: "17:00",
  tueClosed: false,
  wedStart: "09:00",
  wedEnd: "17:00",
  wedClosed: false,
  thuStart: "09:00",
  thuEnd: "17:00",
  thuClosed: false,
  friStart: "09:00",
  friEnd: "17:00",
  friClosed: false,
  satStart: "09:00",
  satEnd: "17:00",
  satClosed: true,
  sunStart: "09:00",
  sunEnd: "17:00",
  sunClosed: true,
};

export function LocationDialog({ isOpen, setIsOpen }: LocationDialogProps) {
  const handleSubmit = (submittedData: z.infer<typeof formSchema>) => {
    // submit to api
    const url = `/api/location`;
    const response = fetch(url, {
      method: "POST",
      body: JSON.stringify(submittedData),
    });
    response
      .then((res) => {
        if (res.ok) {
          setIsOpen(false);
          window.location.reload();
          return;
        }
        throw new Error("Failed to update location");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const form = useForm<z.infer<typeof formSchema>>({
    defaultValues,
    resolver: zodResolver(formSchema),
  });
  const { isDirty } = form.formState;

  const handleOpenChange = (open: boolean) => {
    if (isDirty) {
      const close = confirm("Unsaved changes will be lost. Are you sure?");
      if (!close) {
        return;
      }
    }
    form.reset(defaultValues);
    setIsOpen(open);
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleOpenChange}>
      <DialogTrigger asChild>
        <Button variant="outline">
          Add <FontAwesomeIcon className="pl-1" icon={faPlus} />
        </Button>
      </DialogTrigger>
      <DialogContent className="max-h-screen max-w-[780px] overflow-y-auto m-10">
        <DialogHeader>
          <DialogTitle>Add Location</DialogTitle>
        </DialogHeader>
        <LocationForm handleSubmit={handleSubmit} form={form} />
        <DialogFooter>
          <Button form="locationForm" type="submit">
            Save Location
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
