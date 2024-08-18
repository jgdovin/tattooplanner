"use client";

import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { useState, useEffect } from "react";

export const DurationInput = ({ form }: any) => {
  const [hours, setHours] = useState("0");
  const [minutes, setMinutes] = useState("30");

  useEffect(() => {
    form.setValue("duration", `${hours}:${minutes}`);
  }, [form, hours, minutes]);

  return (
    <FormField
      control={form.control}
      name="duration"
      render={({ field }) => {
        return (
          <FormItem className="grid  grid-cols-4 items-center gap-4">
            <FormLabel className="text-right pt-7">Duration</FormLabel>
            <div className="flex gap-3 col-span-3">
              <FormControl className="grid-cols-3">
                <>
                  <div className="w-full">
                    <FormLabel className="text-right pl-5 self-center text-xs text-gray-400 font-bold">
                      Hours
                    </FormLabel>
                    <Select onValueChange={setHours} defaultValue={hours}>
                      <SelectTrigger className="col-span-1">
                        <SelectValue placeholder="Hours" />
                      </SelectTrigger>
                      <SelectContent>
                        {[...Array(24).keys()].map((hour) => (
                          <SelectItem key={hour} value={`${hour}`}>
                            {hour} Hours
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="w-full">
                    <FormLabel className="text-right pl-5 self-center text-xs text-gray-400 font-bold">
                      Minutes
                    </FormLabel>
                    <Select onValueChange={setMinutes} defaultValue={minutes}>
                      <SelectTrigger className="col-span-1">
                        <SelectValue placeholder="Hours" />
                      </SelectTrigger>
                      <SelectContent>
                        {[0, 5, 10, 15, 20, 25, 30, 35, 40, 45, 50, 55].map(
                          (minute) => (
                            <SelectItem key={minute} value={`${minute}`}>
                              {minute} Minutes
                            </SelectItem>
                          )
                        )}
                      </SelectContent>
                    </Select>
                  </div>
                  <Input type="hidden" {...field} />
                </>
              </FormControl>
            </div>
          </FormItem>
        );
      }}
    />
  );
};
