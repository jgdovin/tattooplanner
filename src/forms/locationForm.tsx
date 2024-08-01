import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";

import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import * as z from "zod";

interface LocationFormProps {
  form: any;
  handleSubmit: any;
}

const InputField = ({ name, form, label }: any) => (
  <FormField
    control={form.control}
    name={name}
    render={({ field }) => {
      return (
        <FormItem className="grid grid-cols-4 items-center gap-4">
          <FormLabel className="text-right">{label}</FormLabel>
          <FormControl className="col-span-3">
            <Input type="text" {...field} />
          </FormControl>
          <FormMessage className="col-span-4 text-center" />
        </FormItem>
      );
    }}
  />
);

export const formSchema = z.object({
  name: z.string().min(3),
  nickname: z.string(),
  description: z.string(),
  phone: z.string(),
  type: z.enum(["PHYSICAL", "MOBILE"]),
  address1: z.string(),
  address2: z.string(),
  city: z.string(),
  state: z.string(),
  zip: z.string(),
  id: z.string().optional(),
});

export function LocationForm({ form, handleSubmit }: LocationFormProps) {
  return (
    <Form {...form}>
      <form id="locationForm" onSubmit={form.handleSubmit(handleSubmit)}>
        <div className="grid gap-4 py-4">
          <InputField name="name" form={form} label="Name" />
          <InputField name="nickname" form={form} label="Nickname" />
          <InputField name="description" form={form} label="Description" />
          <InputField name="phone" form={form} label="Phone" />
          <FormField
            control={form.control}
            name="type"
            render={({ field }) => {
              return (
                <FormItem className="grid grid-cols-4 items-center gap-4">
                  <FormLabel className="text-right">Type</FormLabel>
                  <FormControl className="col-span-3">
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <SelectTrigger className="col-span-3">
                        <SelectValue placeholder="Type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="PHYSICAL">
                          Physical Location
                        </SelectItem>
                        <SelectItem value="MOBILE">Mobile Location</SelectItem>
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage className="col-span-4 text-center" />
                </FormItem>
              );
            }}
          />
          <InputField name="address1" form={form} label="Address 1" />
          <InputField name="address2" form={form} label="Address 2" />
          <InputField name="city" form={form} label="City" />
          <InputField name="state" form={form} label="State" />
          <InputField name="zip" form={form} label="Zip" />
        </div>
      </form>
    </Form>
  );
}
