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

import axios from "axios";

import { formSchema, ServiceForm } from "@/forms/serviceForm";
import * as z from "zod";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useAtom } from "jotai";
import { addServiceAtom } from "@/store/service";

interface ServiceDialogProps {
  isOpen: boolean;
  setIsOpen: (value: boolean) => void;
  locationId?: string;
  formData?: any;
}

const defaultValues = {
  name: "",
  description: "",
  price: 0,
  duration: "01:00",
  cancellationFee: 0,
  hidePriceFromCustomers: false,
  bookableByCustomers: true,
  locations: [],
  durationMinutes: "30",
  durationHours: "0",
};

export function ServiceDialog({ isOpen, setIsOpen }: ServiceDialogProps) {
  const [, addService] = useAtom(addServiceAtom);

  const handleSubmit = (submittedData: z.infer<typeof formSchema>) => {
    addService(submittedData!);
    setIsOpen(false);
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
        <VisuallyHidden.Root>
          <DialogHeader>
            <DialogTitle>Create Service</DialogTitle>
            <DialogDescription>
              Create a new service by filling out the form below.
            </DialogDescription>
          </DialogHeader>
        </VisuallyHidden.Root>
        <ServiceForm create="true" submitAction={handleSubmit} form={form} />
      </DialogContent>
    </Dialog>
  );
}
