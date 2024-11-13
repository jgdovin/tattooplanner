"use client";

import { Form } from "@/components/ui/form";

import {
  InputField,
  TextareaField,
} from "@/components/forms/components/inputField";
import { Button } from "@/components/ui/button";
import {
  customerFormSchema,
  CustomerType,
} from "@/features/customers/schemas/customers";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

interface LocationFormProps {
  submitAction: any;
}

export function CustomerForm({ submitAction }: LocationFormProps) {
  const form = useForm<CustomerType>({
    resolver: zodResolver(customerFormSchema),
    defaultValues: {},
  });

  return (
    <Form {...form}>
      <form
        id="customerForm"
        onSubmit={form.handleSubmit(submitAction)}
        className="grid gap-4"
      >
        <div className="grid gap-2">
          <InputField name="name" form={form} label="Name" required={true} />
        </div>
        <div className="grid gap-2">
          <InputField name="email" form={form} label="Email" required={true} />
        </div>
        <div className="grid gap-2">
          <InputField name="phone" form={form} label="Phone" required={true} />
        </div>
        <div className="grid gap-2">
          <TextareaField name="notes" form={form} label="Notes" />
        </div>
        <div className="grid gap-2">
          <InputField name="address1" form={form} label="Address 1" />
        </div>
        <div className="grid gap-2">
          <InputField name="address2" form={form} label="Address 2" />
        </div>
        <div className="grid gap-2">
          <InputField name="city" form={form} label="City" />
        </div>
        <div className="grid gap-2">
          <div className="flex gap-4">
            <div className="w-full">
              <InputField name="state" form={form} label="State" />
            </div>
            <div className="w-full">
              <InputField name="zip" form={form} label="Zip" />
            </div>
          </div>
          <div>
            <Button
              variant="accent"
              type="submit"
              className="grid col-span-4 font-semibold"
            >
              Submit
            </Button>
          </div>
        </div>
      </form>
    </Form>
  );
}
