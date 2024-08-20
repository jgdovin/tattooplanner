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

import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";

import {
  CurrencyField,
  InputField,
  SelectField,
  SwitchField,
  TextareaField,
} from "./components/inputField";

import * as z from "zod";
import { Form } from "@/components/ui/form";
import { useEffect, useState } from "react";

export const formSchema = z.object({
  id: z.string().optional(),
  name: z.string().min(3, { message: "Name must be at least 3 characters" }),
  description: z.string(),
  price: z.number().default(0),
  duration: z.string(),
  cancellationFee: z.number().default(0),
  hidePriceFromCustomers: z.boolean().default(false),
  bookableByCustomers: z.boolean().default(true),
  locations: z.array(z.string()).default([]),
});

const locations = [
  "New York",
  "Los Angeles",
  "Chicago",
  "Houston",
  "Phoenix",
  "Philadelphia",
  "San Antonio",
  "San Diego",
  "Dallas",
  "San Jose",
];

export function ServiceForm({ submitAction, form, isEditing }: any) {
  const [durationHours, setDurationHours] = useState("0");
  const [durationMinutes, setDurationMinutes] = useState("30");
  const [loading, setLoading] = useState(true);

  const { handleSubmit } = form;

  useEffect(() => {
    setLoading(false);
  }, []);

  useEffect(() => {
    form.setValue("duration", `${durationHours}:${durationMinutes}`);
  }, [durationHours, durationMinutes, form]);

  const formText = isEditing ? "Update" : "Create";

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle>{formText} Service</CardTitle>
        <CardDescription>
          Define the details of your new service offering.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form
            id="serviceForm"
            onSubmit={handleSubmit(submitAction)}
            className="grid gap-4"
          >
            <div className="grid gap-2">
              <InputField
                placeholder="Service Name"
                name="name"
                form={form}
                label="Name"
              />
            </div>
            <div className="grid gap-2">
              <TextareaField
                name="description"
                form={form}
                label="Description"
                textarea="true"
                placeholder="Describe your service"
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <CurrencyField
                  name="price"
                  step="0.01"
                  form={form}
                  label="Price"
                />
              </div>
              <div className="grid gap-2">
                <CurrencyField
                  name="cancellationFee"
                  step="0.01"
                  form={form}
                  label="Cancellation Fee"
                />
              </div>
            </div>
            <div className="grid gap-2 w-1/2">
              <Label>Duration</Label>
              <div className="flex gap-4">
                <div className="grid gap-2 w-full">
                  <SelectField
                    name="durationHours"
                    form={form}
                    value={durationHours}
                    onChange={setDurationHours}
                    label="Hours"
                    placeholder="55 Minutes"
                  >
                    <SelectTrigger id="duration-hours">
                      <SelectValue placeholder="12 Hours" />
                    </SelectTrigger>
                    <SelectContent>
                      {Array.from({ length: 25 }, (_, i) => (
                        <SelectItem key={i} value={`${i}`}>
                          {i} Hours
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </SelectField>
                </div>
                <div className="grid gap-2 w-full">
                  <SelectField
                    name="durationMinutes"
                    form={form}
                    value={durationMinutes}
                    onChange={setDurationMinutes}
                    label="Minutes"
                    placeholder="55 Minutes"
                  >
                    <SelectTrigger id="duration-minutes">
                      <SelectValue placeholder="55 Minutes" />
                    </SelectTrigger>
                    <SelectContent>
                      {Array.from({ length: 12 }, (_, i) => (
                        <SelectItem key={i} value={`${i * 5}`}>
                          {i * 5} Minutes
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </SelectField>
                </div>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="flex items-center gap-2">
                <SwitchField
                  name="hidePriceFromCustomers"
                  form={form}
                  label="Hide Price from Customer"
                />
              </div>
              <div className="flex items-center gap-2">
                <SwitchField
                  name="bookableByCustomers"
                  form={form}
                  label="Bookable by Customers"
                />
              </div>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="locations">Locations</Label>
              <Select>
                <SelectTrigger id="locations">
                  <SelectValue placeholder="Select locations" />
                </SelectTrigger>
                <SelectContent>
                  {locations.map((location) => (
                    <SelectItem key={location} value={location}>
                      {location}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </form>
        </Form>
      </CardContent>
      <CardFooter>
        <Button form="serviceForm" type="submit" disabled={loading}>
          {formText} Service
        </Button>
      </CardFooter>
    </Card>
  );
}
