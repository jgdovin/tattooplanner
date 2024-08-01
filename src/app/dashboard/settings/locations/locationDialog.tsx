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

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { formSchema, LocationForm } from "@/forms/locationForm";
import * as z from "zod";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";

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
};

export function LocationDialog({
  isOpen,
  setIsOpen,
  formData,
}: LocationDialogProps) {
  const form = useForm<z.infer<typeof formSchema>>({
    defaultValues: formData || defaultValues,
    resolver: zodResolver(formSchema),
  });
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
  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="outline">
          Add <FontAwesomeIcon className="pl-1" icon={faPlus} />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[525px]">
        <DialogHeader>
          <DialogTitle>Add Location</DialogTitle>
          <DialogDescription>
            Make changes to your location here. Click save when youre done.
          </DialogDescription>
        </DialogHeader>
        <LocationForm form={form} handleSubmit={handleSubmit} />
        <DialogFooter>
          <Button form="locationForm" type="submit">
            Save changes
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
