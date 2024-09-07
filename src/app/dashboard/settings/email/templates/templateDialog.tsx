"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import * as VisuallyHidden from "@radix-ui/react-visually-hidden";

import { formSchema, LocationForm } from "@/forms/locationForm";
import * as z from "zod";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useAtom } from "jotai";
import {
  addLocationAtom,
  EMPTY_LOCATION_DATA,
  fetchLocationAtom,
  updateLocationAtom,
} from "@/store/location";
import { DialogDescription } from "@radix-ui/react-dialog";

interface TemplateDialogProps {
  isOpen: boolean;
  setIsOpen: (value: boolean) => void;
  isEditing: boolean;
  setIsEditing: (value: boolean) => void;
}

export function TemplateDialog({
  isOpen,
  setIsOpen,
  isEditing,
  setIsEditing,
}: TemplateDialogProps) {
  const [, addLocation] = useAtom(addLocationAtom);
  const [, updateService] = useAtom(updateLocationAtom);
  const [location, setLocation] = useAtom(fetchLocationAtom);

  const handleSubmit = (submittedData: z.infer<typeof formSchema>) => {
    if (isEditing) {
      updateService(submittedData!);
    } else {
      addLocation(submittedData!);
    }
    setIsOpen(false);
  };

  const form = useForm<z.infer<typeof formSchema>>({
    defaultValues: location || EMPTY_LOCATION_DATA,
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
    setIsOpen(open);
    setIsEditing(false);
    setLocation("");
    form.reset(EMPTY_LOCATION_DATA);
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleOpenChange}>
      <DialogTrigger asChild>
        <Button variant="outline">
          Create Template <FontAwesomeIcon className="pl-1" icon={faPlus} />
        </Button>
      </DialogTrigger>
      <DialogContent className="max-h-screen max-w-[880px] overflow-y-auto m-10">
        <VisuallyHidden.Root>
          <DialogHeader>
            <DialogTitle>Add Location</DialogTitle>
          </DialogHeader>
          <DialogDescription>
            {isEditing ? "Edit" : "Create"} a location
          </DialogDescription>
        </VisuallyHidden.Root>
        <LocationForm
          submitAction={handleSubmit}
          form={form}
          isEditing={isEditing}
        />
      </DialogContent>
    </Dialog>
  );
}
