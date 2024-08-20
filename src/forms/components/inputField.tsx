"use client";

import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import { faDollarSign } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";

export const InputField = ({
  type = "text",
  name,
  form,
  label,
  className,
  ...props
}: any) => (
  <FormField
    control={form.control}
    name={name}
    render={({ field }) => {
      return (
        <FormItem className={`grid gap-1`}>
          <FormLabel>{label}</FormLabel>
          <FormControl>
            <div className="flex flex-col gap-2">
              <Input type={type} {...props} {...field} />
              <FormMessage className="col-span-4 text-center" />
            </div>
          </FormControl>
        </FormItem>
      );
    }}
  />
);

export const TextareaField = ({ name, form, label, ...props }: any) => (
  <FormField
    control={form.control}
    name={name}
    render={({ field }) => {
      return (
        <FormItem className="grid gap-1">
          <FormLabel>{label}</FormLabel>
          <FormControl>
            <>
              <Textarea {...field} {...props} />
              <FormMessage className="col-span-4 text-center" />
            </>
          </FormControl>
        </FormItem>
      );
    }}
  />
);

export const CurrencyField = ({ name, form, label, ...props }: any) => (
  <FormField
    control={form.control}
    name={name}
    render={({ field }) => {
      return (
        <FormItem className="grid gap-1">
          <FormLabel>{label}</FormLabel>
          <FormControl>
            <div className="flex">
              <div className="flex items-center px-4 bg-gray-500 text-white rounded-l">
                <FontAwesomeIcon icon={faDollarSign} />
              </div>
              <Input
                className="rounded-none rounded-r"
                type="number"
                {...props}
                onChange={(e) => field.onChange(parseFloat(e.target.value))}
                value={parseFloat(field.value)}
              />
            </div>
          </FormControl>
          <FormMessage className="col-span-4 text-center" />
        </FormItem>
      );
    }}
  />
);

export const SelectField = ({
  name,
  form,
  label,
  children,
  value,
  onChange,
  ...props
}: any) => (
  <FormField
    control={form.control}
    name={name}
    render={({ field }) => {
      return (
        <FormItem className="grid gap-1">
          <FormLabel>{label}</FormLabel>
          <FormControl>
            <Select
              {...props}
              onValueChange={onChange || field.onChange}
              value={value || field.value}
              className="w-full"
            >
              {children}
            </Select>
          </FormControl>
          <FormMessage className="col-span-4 text-center" />
        </FormItem>
      );
    }}
  />
);

export const SwitchField = ({ name, form, label, ...props }: any) => (
  <FormField
    control={form.control}
    name={name}
    render={({ field }) => {
      return (
        <FormItem className="flex items-center justify-center self-center align-middle gap-1">
          <FormLabel className="pt-2">{label}</FormLabel>
          <FormControl>
            <Switch {...props} {...field} />
          </FormControl>
          <FormMessage className="col-span-4 text-center" />
        </FormItem>
      );
    }}
  />
);

export const TimeField = ({ name, form, label }: any) => {
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

export const LocationInputField = ({ name, form, label, ...props }: any) => (
  <FormField
    control={form.control}
    name="type"
    render={({ field }) => {
      return (
        <FormItem className="flex items-center gap-4">
          <FormLabel className="text-right text-nowrap font-bold">
            {label}
          </FormLabel>
          <FormControl>
            <Select onValueChange={field.onChange} defaultValue={field.value}>
              <SelectTrigger>
                <SelectValue placeholder="Type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="PHYSICAL">Physical Location</SelectItem>
                <SelectItem value="MOBILE">Mobile Location</SelectItem>
              </SelectContent>
            </Select>
          </FormControl>
          <FormMessage className="text-center" />
        </FormItem>
      );
    }}
  />
);
