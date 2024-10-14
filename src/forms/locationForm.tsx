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
  HiddenField,
  InputField,
  LocationInputField,
  TextareaField,
  TimeField,
} from "./components/inputField";

import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { LocationType } from "@/types/location";

interface LocationFormProps {
  submitAction: any;
  form: any;
  isEditing: boolean;
}

export const LOCATION_TYPES_TYPE = {
  PHYSICAL: "PHYSICAL",
  MOBILE: "MOBILE",
} as const;

const DEFAULT_OPEN_TIME = "09:00";
const DEFAULT_CLOSE_TIME = "17:00";
const EMPTY_STRING = "";

export const EMPTY_LOCATION_DATA: LocationType = {
  id: EMPTY_STRING,
  name: EMPTY_STRING,
  nickname: EMPTY_STRING,
  description: EMPTY_STRING,
  phone: EMPTY_STRING,
  email: EMPTY_STRING,
  website: EMPTY_STRING,
  x: EMPTY_STRING,
  instagram: EMPTY_STRING,
  facebook: EMPTY_STRING,
  type: LOCATION_TYPES_TYPE["PHYSICAL"], // Default value; change if necessary
  address1: EMPTY_STRING,
  address2: EMPTY_STRING,
  city: EMPTY_STRING,
  state: EMPTY_STRING,
  zip: EMPTY_STRING,
  monStart: DEFAULT_OPEN_TIME,
  monEnd: DEFAULT_CLOSE_TIME,
  monClosed: false,
  tueStart: DEFAULT_OPEN_TIME,
  tueEnd: DEFAULT_CLOSE_TIME,
  tueClosed: false,
  wedStart: DEFAULT_OPEN_TIME,
  wedEnd: DEFAULT_CLOSE_TIME,
  wedClosed: false,
  thuStart: DEFAULT_OPEN_TIME,
  thuEnd: DEFAULT_CLOSE_TIME,
  thuClosed: false,
  friStart: DEFAULT_OPEN_TIME,
  friEnd: DEFAULT_CLOSE_TIME,
  friClosed: false,
  satStart: DEFAULT_OPEN_TIME,
  satEnd: DEFAULT_CLOSE_TIME,
  satClosed: true,
  sunStart: DEFAULT_OPEN_TIME,
  sunEnd: DEFAULT_CLOSE_TIME,
  sunClosed: true,
  requiresSurveyForBooking: false,
};

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
                <InputField
                  name="email"
                  form={form}
                  label="Email"
                  required={true}
                />
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
                <HiddenField name="id" form={form} />
              </div>
              <div className="grid gap-2">
                {form.error && <div>{form.error.message}</div>}
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
