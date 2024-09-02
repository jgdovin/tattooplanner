"use client";

import { Form } from "@/components/ui/form";

import * as z from "zod";

import { zPhone } from "./customValidation/zodPhoneValidate";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { InputField, TextareaField } from "./components/inputField";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";

interface LocationFormProps {
  submitAction: any;
  form: any;
  isEditing: boolean;
}

export const formSchema = z.object({
  name: z.string().min(3, { message: "Name must be at least 3 characters" }),
  email: z.string().email(),
  phone: zPhone,
  notes: z.string(),
  address1: z.string(),
  address2: z.string(),
  city: z.string(),
  state: z.string(),
  zip: z.string(),
  id: z.string().optional(),
});

export function CustomerForm({
  submitAction,
  form,
  isEditing,
}: LocationFormProps) {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(false);
  }, []);

  const formText = isEditing ? "Update" : "Create";

  return (
    <Form {...form}>
      <Card className="w-full max-w-2xl mx-auto">
        <CardHeader>
          <CardTitle>{formText} Customer</CardTitle>
          <CardDescription>{formText} Customer details</CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form
              id="customerForm"
              onSubmit={form.handleSubmit(submitAction)}
              className="grid gap-4"
            >
              <div className="grid gap-2">
                <InputField
                  name="name"
                  form={form}
                  label="Name"
                  required={true}
                />
              </div>
              <div className="grid gap-2">
                <InputField
                  name="email"
                  form={form}
                  label="Email"
                  required={true}
                />
              </div>
              <div className="grid gap-2">
                <InputField
                  name="phone"
                  form={form}
                  label="Phone"
                  required={true}
                />
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
              </div>
            </form>
          </Form>
        </CardContent>
        <CardFooter>
          <Button form="customerForm" type="submit" disabled={loading}>
            {formText} Customer
          </Button>
        </CardFooter>
      </Card>
    </Form>
  );
}
