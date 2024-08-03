import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";

import { Input } from "@/components/ui/input";

import { useCallback, useEffect, useState } from "react";

import { zodResolver } from "@hookform/resolvers/zod";

import * as z from "zod";
import { useForm } from "react-hook-form";
import { Textarea } from "@/components/ui/textarea";

interface LocationFormProps {
  handleSubmit: any;
  form: any;
}

const InputField = ({ name, form, label, textArea }: any) => (
  <FormField
    control={form.control}
    name={name}
    render={({ field }) => {
      return (
        <FormItem className="grid grid-cols-4 items-center gap-4">
          <FormLabel className="text-right">{label}</FormLabel>
          <FormControl className="col-span-3">
            {textArea ? (
              <Textarea {...field} />
            ) : (
              <Input type="text" {...field} />
            )}
          </FormControl>
          <FormMessage className="col-span-4 text-center" />
        </FormItem>
      );
    }}
  />
);

export const formSchema = z.object({
  name: z.string().min(3),
  email: z.string().email(),
  phone: z.string(),
  notes: z.string(),
  address1: z.string(),
  address2: z.string(),
  city: z.string(),
  state: z.string(),
  zip: z.string(),
  id: z.string().optional(),
});

export function CustomerForm({ handleSubmit, form }: LocationFormProps) {
  return (
    <Form {...form}>
      <form id="customerForm" onSubmit={form.handleSubmit(handleSubmit)}>
        <div className="grid grid-cols-4 gap-4">
          <div className="col-span-4">
            <h1 className="w-full text-center font-bold text-xl mb-2">
              Details
            </h1>
            <InputField name="name" form={form} label="Name" />
            <InputField
              name="notes"
              form={form}
              label="Notes"
              textArea={true}
            />
            <InputField name="email" form={form} label="Email" />
            <InputField name="phone" form={form} label="Phone" />
            <InputField name="address1" form={form} label="Address 1" />
            <InputField name="address2" form={form} label="Address 2" />
            <InputField name="city" form={form} label="City" />
            <InputField name="state" form={form} label="State" />
            <InputField name="zip" form={form} label="Zip" />
          </div>
        </div>
      </form>
    </Form>
  );
}
