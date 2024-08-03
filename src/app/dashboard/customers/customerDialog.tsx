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
import { formSchema, CustomerForm } from "@/forms/customerForm";
import * as z from "zod";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { Customer } from "./columns";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useCallback, useEffect } from "react";

interface CustomerDialogProps {
  isOpen: boolean;
  setIsOpen: (value: boolean) => void;
  formData?: any;
}

const defaultValues = {
  name: "",
  email: "",
  phone: "",
  notes: "",
  address1: "",
  address2: "",
  city: "",
  state: "",
  zip: "",
};

export function CustomerDialog({ isOpen, setIsOpen }: CustomerDialogProps) {
  const handleSubmit = (submittedData: z.infer<typeof formSchema>) => {
    // submit to api
    const url = `/api/customer`;
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
      <DialogContent className="max-h-screen max-w-[580px] overflow-y-auto m-10">
        <DialogHeader>
          <DialogTitle>Add Customer</DialogTitle>
          <DialogDescription>
            Create a new customer by filling out the form below.
          </DialogDescription>
        </DialogHeader>
        <CustomerForm handleSubmit={handleSubmit} form={form} />
        <DialogFooter>
          <Button form="customerForm" type="submit">
            Save Customer
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
