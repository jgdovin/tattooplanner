"use client";

import { Form } from "@/components/ui/form";

import {
  InputField,
  TextareaField,
} from "@/components/forms/components/inputField";

import { Button } from "@/components/ui/button";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  CommandInput,
  CommandList,
  CommandEmpty,
  CommandGroup,
  CommandItem,
} from "@/components/ui/command";
import { Command } from "@/components/ui/command";
import { useEffect, useState } from "react";
import { ChevronsUpDown } from "lucide-react";
import { getCustomersForProjectListQuery } from "@/features/customers/server/db/customers";
import { useSearchParams } from "next/navigation";

interface ProjectFormProps {
  submitAction: any;
  form: any;
}

type CustomerListItem = {
  id: string;
  name: string;
};

export function ProjectForm({ submitAction, form }: ProjectFormProps) {
  const { handleSubmit } = form;
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState("");
  const params = useSearchParams();

  useEffect(() => {
    const customerId = params.get("customerId");
    if (customerId) setValue(customerId);
  });

  useEffect(() => {
    console.log(value);
  }, [value]);

  const { data, error, isPending } = getCustomersForProjectListQuery();

  if (isPending) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <Form {...form}>
      <form id="projectForm" onSubmit={handleSubmit(submitAction)}>
        <div className="flex flex-col gap-2">
          <div>
            <InputField name="name" form={form} label="Name" required={true} />
          </div>
          <div>
            <TextareaField
              name="notes"
              form={form}
              label="Notes"
              required={true}
            />
          </div>
          <div className="w-full">
            <Popover open={open} onOpenChange={setOpen}>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  role="combobox"
                  aria-expanded={open}
                  className="w-1/2 justify-between popover-content-width-full"
                >
                  {value
                    ? data.find(
                        (customer: CustomerListItem) => customer.id === value
                      )?.name
                    : "Select a Customer.."}
                  <ChevronsUpDown className="opacity-50" />
                </Button>
              </PopoverTrigger>
              <PopoverContent className="p-0">
                <Command
                  filter={(search, keywords) => {
                    if (!keywords) return 0;
                    const keyword: string = keywords[0];
                    if (keyword.toLowerCase().includes(search.toLowerCase()))
                      return 1;
                    return 0;
                  }}
                >
                  <CommandInput placeholder="Search Customers..." />
                  <CommandList>
                    <CommandEmpty>No customers found.</CommandEmpty>
                    <CommandGroup>
                      {data.map((customer: CustomerListItem) => (
                        <CommandItem
                          key={customer.id}
                          value={customer.id}
                          keywords={[customer.name]}
                          onSelect={(currentValue) => {
                            setValue(
                              currentValue === value ? "" : currentValue
                            );
                            setOpen(false);
                          }}
                        >
                          {customer.name}
                        </CommandItem>
                      ))}
                    </CommandGroup>
                  </CommandList>
                </Command>
              </PopoverContent>
            </Popover>
          </div>
          <div>
            <Button
              variant="accent"
              type="submit"
              className="grid col-span-4 font-semibold text-white"
            >
              Submit
            </Button>
          </div>
        </div>
      </form>
    </Form>
  );
}
