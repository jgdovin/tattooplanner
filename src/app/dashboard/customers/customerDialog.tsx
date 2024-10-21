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

import { formSchema, CustomerForm } from "@/components/forms/customerForm";
import * as z from "zod";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useAtom } from "jotai";
import {
  addCustomerAtom,
  updateCustomerAtom,
  fetchCustomerAtom,
} from "@/lib/store/customer";

interface CustomerDialogProps {
  isOpen: boolean;
  setIsOpen: (value: boolean) => void;
  isEditing: boolean;
  setIsEditing: (value: boolean) => void;
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

export function CustomerDialog({
  isOpen,
  setIsOpen,
  isEditing,
  setIsEditing,
}: CustomerDialogProps) {
  const [, addCustomer] = useAtom(addCustomerAtom);
  const [, updateCustomer] = useAtom(updateCustomerAtom);
  const [customer, setCustomer] = useAtom(fetchCustomerAtom);

  const handleSubmit = (submittedData: z.infer<typeof formSchema>) => {
    if (isEditing) {
      updateCustomer(submittedData!);
    } else {
      addCustomer(submittedData!);
    }
    setIsOpen(false);
  };

  const form = useForm<z.infer<typeof formSchema>>({
    defaultValues: customer || defaultValues,
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
    setCustomer("");
    form.reset(defaultValues);
  };
  return (
    <Dialog open={isOpen} onOpenChange={handleOpenChange}>
      <DialogTrigger asChild>
        <Button variant="outline">
          Create Customer <FontAwesomeIcon className="pl-1" icon={faPlus} />
        </Button>
      </DialogTrigger>
      <DialogContent className="max-h-screen max-w-[780px] overflow-y-auto m-10">
        <VisuallyHidden.Root>
          <DialogHeader>
            <DialogTitle>
              {isEditing ? "Edit Customer" : "Create Customer"}
            </DialogTitle>
            <DialogDescription>
              Create and modify customers records.
            </DialogDescription>
          </DialogHeader>
        </VisuallyHidden.Root>
        <CustomerForm
          submitAction={handleSubmit}
          form={form}
          isEditing={isEditing}
        />
      </DialogContent>
    </Dialog>
  );
}
