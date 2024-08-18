import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Select, SelectContent } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import { faDollarSign } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

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
