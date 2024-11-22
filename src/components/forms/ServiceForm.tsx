"use client";

import { Label } from "@/components/ui/label";

import {
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";

import {
  CurrencyField,
  HiddenField,
  InputField,
  SelectField,
  TextareaField,
} from "./components/inputField";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useEffect, useState } from "react";
import { Checkbox } from "@/components/ui/checkbox";
import { Separator } from "@/components/ui/separator";
import { getArtistLocationsQuery } from "@/features/locations/server/db/locations";
import { LocationType } from "@/features/locations/schemas/locations";
import { Button } from "../ui/button";

export function ServiceForm({ submitAction, form, isEditing }: any) {
  const { handleSubmit, getValues } = form;

  const durations = getValues("duration").split(":");

  const [durationHours, setDurationHours] = useState(
    durations[0] === "00" ? "0" : durations[0]
  );
  const [durationMinutes, setDurationMinutes] = useState(durations[1]);

  const {
    data: artistLocations,
    isFetching,
    isPending,
    error,
  } = getArtistLocationsQuery();

  useEffect(() => {
    form.setValue("duration", `${durationHours}:${durationMinutes}`);
  }, [durationHours, durationMinutes, form]);

  useEffect(() => {
    if (isEditing) {
      return;
    }
    form.setValue("locations", artistLocations);
  }, [artistLocations]);

  if (error) return <div>Error: {error.message}</div>;

  if (isFetching || isPending) {
    return <div>Loading...</div>;
  }

  return (
    <Form {...form}>
      <form
        id="serviceForm"
        onSubmit={handleSubmit(submitAction, (err: any, e: any) => {
          console.log(err);
          console.log(getValues("locations"));
        })}
        className="grid gap-4"
      >
        <HiddenField name="id" form={form} />

        <div className="grid gap-2">
          <InputField
            placeholder="Service Name"
            name="name"
            form={form}
            label="Name"
            required={true}
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
            <CurrencyField name="price" step="0.01" form={form} label="Price" />
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
        <Separator />
        <div className="grid gap-2">
          <Label htmlFor="locations">Locations</Label>
          {artistLocations.map((location: LocationType) => {
            return (
              <FormField
                key={location.id}
                control={form.control}
                name="locations"
                render={({ field }) => {
                  return (
                    <FormItem
                      key={location.id}
                      className="flex flex-row items-start space-x-3 space-y-0 border hover:bg-slate-100"
                    >
                      <FormControl>
                        <Checkbox
                          className="m-3"
                          checked={
                            field.value?.filter((value: any) => {
                              return value.id === location.id;
                            }).length > 0
                          }
                          onCheckedChange={(checked) => {
                            return checked
                              ? field.onChange([...field.value, location])
                              : field.onChange(
                                  field.value?.filter(
                                    (value: any) => value.id !== location.id
                                  )
                                );
                          }}
                        />
                      </FormControl>
                      <FormMessage />
                      <FormLabel className="font-normal w-full p-3">
                        {location.name}
                      </FormLabel>
                    </FormItem>
                  );
                }}
              />
            );
          })}
          <div className="grid gap-2">
            {form.error && <div>{form.error.message}</div>}
          </div>
          <Button
            variant="accent"
            type="submit"
            className="w-full font-semibold"
          >
            Submit
          </Button>
        </div>
      </form>
    </Form>
  );
}
