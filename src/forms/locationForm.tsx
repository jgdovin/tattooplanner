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
import { Label } from "@/components/ui/label";
import { useCallback, useEffect, useState } from "react";

import { zodResolver } from "@hookform/resolvers/zod";

import * as z from "zod";
import { useForm } from "react-hook-form";

interface LocationFormProps {
  handleSubmit: any;
  defaultValues: any;
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
  monStart: z.string().optional(),
  monEnd: z.string().optional(),
  monClosed: z.boolean().optional(),
  tueStart: z.string().optional(),
  tueEnd: z.string().optional(),
  tueClosed: z.boolean().optional(),
  wedStart: z.string().optional(),
  wedEnd: z.string().optional(),
  wedClosed: z.boolean().optional(),
  thuStart: z.string().optional(),
  thuEnd: z.string().optional(),
  thuClosed: z.boolean().optional(),
  friStart: z.string().optional(),
  friEnd: z.string().optional(),
  friClosed: z.boolean().optional(),
  satStart: z.string().optional(),
  satEnd: z.string().optional(),
  satClosed: z.boolean().optional(),
  sunStart: z.string().optional(),
  sunEnd: z.string().optional(),
  sunClosed: z.boolean().optional(),
  timezone: z.string().optional(),
});

const daysOfWeek = [
  ["sun", "Sunday"],
  ["mon", "Monday"],
  ["tue", "Tuesday"],
  ["wed", "Wednesday"],
  ["thu", "Thursday"],
  ["fri", "Friday"],
  ["sat", "Saturday"],
];

const TimeField = ({ name, form, label }: any) => {
  const [closed, setClosed] = useState(form.getValues(`${name}Closed`));

  return (
    <div className="grid grid-cols-4 gap-2">
      <FormField
        control={form.control}
        name={`${name}Start`}
        render={({ field }) => {
          return (
            <div className="flex flex-col items-center justify-between col-span-2">
              <Label className="w-full text-left">{label}</Label>
              <Input
                disabled={closed}
                className={closed ? `bg-red-200 border border-red-400` : ``}
                {...field}
                type="time"
              />
            </div>
          );
        }}
      />
      <div className="grid items-center gap-4 ">
        <FormField
          control={form.control}
          name={`${name}Closed`}
          render={({ field }) => {
            const { onChange } = field;
            return (
              <div className="flex items-center justify-end gap-2">
                <input
                  type="checkbox"
                  {...field}
                  checked={field.value}
                  id={`${name}Closed`}
                  onChange={(e) => {
                    onChange(e);
                    setClosed(e.target.checked);
                  }}
                />
                <Label htmlFor={`${name}Closed`}>Closed</Label>
              </div>
            );
          }}
        />
        <FormField
          control={form.control}
          name={`${name}End`}
          render={({ field }) => {
            return (
              <Input
                {...field}
                disabled={closed}
                className={closed ? `bg-red-200 border border-red-400` : ``}
                type="time"
              />
            );
          }}
        />
      </div>
    </div>
  );
};

export function LocationForm({
  handleSubmit,
  defaultValues,
}: LocationFormProps) {
  const [timezones, setTimezones] = useState([]);
  const form = useForm<z.infer<typeof formSchema>>({
    defaultValues,
    resolver: zodResolver(formSchema),
  });

  const { isDirty } = form.formState;
  const handleBeforeUnload = useCallback(
    (e: BeforeUnloadEvent) => {
      if (isDirty) {
        e.preventDefault();
      }
    },
    [isDirty]
  );
  useEffect(() => {
    window.addEventListener("beforeunload", handleBeforeUnload);
  }, [handleBeforeUnload]);

  useEffect(() => {
    fetch("/api/timezone").then(async (res) => {
      const json = await res.json();

      console.log(json);
    });
  }, []);

  return (
    <Form {...form}>
      <form id="locationForm" onSubmit={form.handleSubmit(handleSubmit)}>
        <div className="grid grid-cols-4 gap-4">
          <div className="col-span-2">
            <h1 className="w-full text-center font-bold text-xl mb-2">
              Details
            </h1>
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
                          <SelectItem value="MOBILE">
                            Mobile Location
                          </SelectItem>
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
          <div className="w-3/4 mx-auto flex flex-col gap-3 col-span-2">
            <h1 className="w-full text-center font-bold text-xl mb-2">
              Hours of Operation
            </h1>
            {daysOfWeek.map((day, index) => (
              <TimeField
                key={day[0]}
                index={index}
                name={day[0]}
                form={form}
                label={day[1]}
              />
            ))}
          </div>
        </div>
      </form>
    </Form>
  );
}
