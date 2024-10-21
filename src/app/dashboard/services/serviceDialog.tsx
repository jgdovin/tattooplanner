"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import * as VisuallyHidden from "@radix-ui/react-visually-hidden";

import { formSchema, ServiceForm } from "@/components/forms/serviceForm";
import * as z from "zod";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useAtom } from "jotai";
import {
  addServiceAtom,
  EMPTY_SERVICE_DATA,
  fetchServiceAtom,
  updateServiceAtom,
} from "@/store/service";

interface ServiceDialogProps {
  isOpen: boolean;
  setIsOpen: (value: boolean) => void;
  isEditing?: boolean;
  setIsEditing: (value: boolean) => void;
}

export function ServiceDialog({
  isOpen,
  setIsOpen,
  isEditing,
  setIsEditing,
}: ServiceDialogProps) {
  const [, addService] = useAtom(addServiceAtom);
  const [, updateService] = useAtom(updateServiceAtom);
  const [service, setService] = useAtom(fetchServiceAtom);

  const handleSubmit = (submittedData: z.infer<typeof formSchema>) => {
    if (isEditing) {
      updateService(submittedData!);
    } else {
      addService(submittedData!);
    }
    setIsOpen(false);
  };

  const form = useForm<z.infer<typeof formSchema>>({
    defaultValues: service || EMPTY_SERVICE_DATA,
    resolver: zodResolver(formSchema),
  });
  const { isDirty, errors } = form.formState;

  const handleOpenChange = (open: boolean) => {
    if (isDirty) {
      const close = confirm("Unsaved changes will be lost. Are you sure?");
      if (!close) {
        return;
      }
    }
    setIsOpen(open);
    setIsEditing(false);
    setService("");
    form.reset(EMPTY_SERVICE_DATA);
  };
  return (
    <Dialog open={isOpen} onOpenChange={handleOpenChange}>
      <DialogTrigger asChild>
        <Button variant="outline">
          Create Service
          <FontAwesomeIcon className="pl-1" icon={faPlus} />
        </Button>
      </DialogTrigger>
      <DialogContent className="max-h-screen max-w-[780px] overflow-y-auto m-10">
        <VisuallyHidden.Root>
          <DialogHeader>
            <DialogTitle>
              {isEditing ? "Edit Service" : "Create Service"}
            </DialogTitle>
            <DialogDescription>
              Create and modify services that you offer to your customers.
            </DialogDescription>
          </DialogHeader>
        </VisuallyHidden.Root>

        <ServiceForm
          submitAction={handleSubmit}
          form={form}
          isEditing={isEditing}
        />
      </DialogContent>
    </Dialog>
  );
}
