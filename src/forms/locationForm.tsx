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
  TextareaField,
  TimeField,
} from "./components/inputField";

import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

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
  email: z.string(),
  website: z.string(),
  x: z.string(),
  instagram: z.string(),
  facebook: z.string(),
  type: z.enum(["PHYSICAL", "MOBILE"]),
  address1: z.string(),
  address2: z.string(),
  city: z.string(),
  state: z.string(),
  zip: z.string(),
  id: z.string().optional(),
  monStart: z.string().optional(),
  monEnd: z.string().optional(),
  monClosed: z.string(),
  tueStart: z.string().optional(),
  tueEnd: z.string().optional(),
  tueClosed: z.string(),
  wedStart: z.string().optional(),
  wedEnd: z.string().optional(),
  wedClosed: z.string(),
  thuStart: z.string().optional(),
  thuEnd: z.string().optional(),
  thuClosed: z.string(),
  friStart: z.string().optional(),
  friEnd: z.string().optional(),
  friClosed: z.string(),
  satStart: z.string().optional(),
  satEnd: z.string().optional(),
  satClosed: z.string(),
  sunStart: z.string().optional(),
  sunEnd: z.string().optional(),
  sunClosed: z.string(),
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
        <CardTitle>{formText} Location</CardTitle>
        <CardDescription></CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form
            id="locationForm"
            onSubmit={handleSubmit(submitAction)}
            className="grid grid-cols-4 gap-2"
          >
            <div className="grid col-span-2 gap-2">
              <div className="grid gap-2">
                <InputField
                  name="name"
                  form={form}
                  label="Name"
                  required={true}
                />
              </div>
              <div className="grid gap-2">
                <InputField name="nickname" form={form} label="Nickname" />
              </div>
              <div className="grid gap-2">
                <TextareaField
                  name="description"
                  form={form}
                  label="Description"
                />
              </div>
              <Label className="font-bold mt-3">Contact Details</Label>
              <Separator />
              <div className="flex flex-row gap-2">
                <InputField name="phone" form={form} label="Phone" />
                <InputField name="email" form={form} label="Email" />
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
              <Label className="font-bold mt-3">Social Contacts</Label>
              <Separator />
              <div className="grid gap-2">
                <InputField name="website" form={form} label="Website" />
              </div>
              <div className="grid gap-2">
                <InputField name="x" form={form} label="X" />
              </div>
              <div className="grid gap-2">
                <InputField name="instagram" form={form} label="Instagram" />
              </div>
              <div className="grid gap-2">
                <InputField name="facebook" form={form} label="Facebook" />
              </div>
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
