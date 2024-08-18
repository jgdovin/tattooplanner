/**
 * v0 by Vercel.
 * @see https://v0.dev/t/MKKlByglmjP
 * Documentation: https://v0.dev/docs#integrating-generated-code-into-your-nextjs-app
 */
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";

import {
  CurrencyField,
  InputField,
  TextareaField,
} from "./components/inputField";

import * as z from "zod";
import { Form } from "@/components/ui/form";

export const formSchema = z.object({
  name: z.string().min(3, { message: "Name must be at least 3 characters" }),
  description: z.string(),
  price: z.number().default(0),
  duration: z.string(),
  cancellationFee: z.number().default(0),
  hidePriceFromCustomers: z.boolean().default(false),
  bookableByCustomers: z.boolean().default(true),
  locations: z.array(z.string()).default([]),
});

export default function Component({ handleSubmit, form }: any) {
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
  return (
    <Card className="w-full max-w-2xl">
      <CardHeader>
        <CardTitle>Create Service</CardTitle>
        <CardDescription>
          Define the details of your new service offering.
        </CardDescription>
      </CardHeader>
      <CardContent className="grid gap-4">
        <Form {...form}>
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
                type="number"
                step="0.01"
                form={form}
                label="Price"
              />
            </div>
            <div className="grid gap-2">
              <CurrencyField
                name="cancellationFee"
                type="number"
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
                <Label htmlFor="duration-hours">Hours</Label>
                <Select>
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
                </Select>
              </div>
              <div className="grid gap-2 w-full">
                <Label htmlFor="duration-minutes">Minutes</Label>
                <Select>
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
                </Select>
              </div>
            </div>
          </div>
          <div className="flex gap-4">
            <div className="flex items-center gap-2">
              <Label htmlFor="hide-price" className="text-sm font-medium">
                Hide Price from Customer
              </Label>
              <Switch id="hide-price" />
            </div>
            <div className="flex items-center gap-2">
              <Label htmlFor="allow-booking" className="text-sm font-medium">
                Allow Customer to Book
              </Label>
              <Switch id="allow-booking" />
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
        </Form>
      </CardContent>
      <CardFooter>
        <Button>Create Service</Button>
      </CardFooter>
    </Card>
  );
}
