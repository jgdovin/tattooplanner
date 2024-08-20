"use client";

import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";

import { Form } from "@/components/ui/form";

import { useEffect, useState } from "react";

import {
  InputField,
  LocationInputField,
  TimeField,
} from "./components/inputField";

import * as z from "zod";
import { Button } from "@/components/ui/button";

interface LocationFormProps {
  submitAction: any;
  form: any;
  isEditing: boolean;
}

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
  // timezone: z.string().optional(),
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

export function LocationForm({
  submitAction,
  form,
  isEditing,
}: LocationFormProps) {
  const [timezones, setTimezones] = useState([]);
  const formText = isEditing ? "Update" : "Create";
  const [loading, setLoading] = useState(true);

  const { handleSubmit } = form;

  useEffect(() => {
    setLoading(false);
  }, []);

  // useEffect(() => {
  //   fetch("/api/timezone").then(async (res) => {
  //     const json = await res.json();

  //   });
  // }, []);

  return (
    <Card className="w-full max-w-4xl mx-auto">
      <CardHeader>
        <CardTitle>{formText} Service</CardTitle>
        <CardDescription>
          Define the details of your new service offering.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form
            id="locationForm"
            onSubmit={handleSubmit(submitAction)}
            className="grid grid-cols-4 gap-4"
          >
            <div className="grid col-span-2 gap-2">
              <div className="grid gap-2">
                <InputField name="name" form={form} label="Name" />
              </div>
              <div className="grid gap-2">
                <InputField name="nickname" form={form} label="Nickname" />
              </div>
              <div className="grid gap-2">
                <InputField
                  name="description"
                  form={form}
                  label="Description"
                />
              </div>
              <div className="grid gap-2">
                <InputField name="phone" form={form} label="Phone" />
              </div>
              <div className="grid gap-2">
                <InputField name="address1" form={form} label="Address 1" />
              </div>
              <div className="grid gap-2">
                <InputField name="address2" form={form} label="Address 2" />
              </div>
              <div className="flex flex-row gap-2">
                <InputField name="city" form={form} label="City" />
                <InputField name="state" form={form} label="State" />
              </div>

              <div className="grid gap-2">
                <InputField name="zip" form={form} label="Zip" />
              </div>
              <div className="grid gap-2">
                <LocationInputField
                  name="type"
                  form={form}
                  label="Location Type"
                />
              </div>
            </div>
            <div className="w-3/4 mx-auto flex flex-col gap-3 col-span-2">
              <Label className="font-bold">Hours of Operation</Label>
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
          </form>
        </Form>
      </CardContent>
      <CardFooter>
        <Button form="locationForm" type="submit" disabled={loading}>
          {formText} Location
        </Button>
      </CardFooter>
    </Card>
  );
}
