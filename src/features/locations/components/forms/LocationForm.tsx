"use client";

import { Label } from "@/components/ui/label";
import { Form } from "@/components/ui/form";

import { useEffect, useState } from "react";

import {
  HiddenField,
  InputField,
  LocationInputField,
  TextareaField,
  TimeField,
} from "@/components/forms/components/inputField";

import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { SlugInput } from "./SlugInput";

interface LocationFormProps {
  submitAction: any;
  form: any;
  isEditing: boolean;
}

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
  const { handleSubmit } = form;

  return (
    <Form {...form}>
      <form
        id="locationForm"
        onSubmit={handleSubmit(submitAction)}
        className="grid grid-cols-2 gap-10"
      >
        <div className="grid gap-2">
          <div className="grid gap-2">
            <InputField name="name" form={form} label="Name" required={true} />
          </div>
          <div className="grid gap-2">
            <SlugInput isEditing={isEditing} form={form} />
          </div>
          <div className="grid gap-2">
            <InputField name="nickname" form={form} label="Nickname" />
          </div>
          <div className="grid gap-2">
            <TextareaField name="description" form={form} label="Description" />
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
            <LocationInputField name="type" form={form} label="Location Type" />
          </div>
        </div>
        <div className="grid mx-14 gap-3">
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
        <div className="grid col-span-2">
          <Button
            variant="accent"
            type="submit"
            className="grid col-span-4 font-semibold"
          >
            Submit
          </Button>
        </div>
      </form>
    </Form>
  );
}
