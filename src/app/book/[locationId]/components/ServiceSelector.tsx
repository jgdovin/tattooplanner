import { Service } from "@/app/dashboard/settings/services/columns";
import { convertStringDurationToHoursAndMinutes } from "@/lib/utils";
import { increaseStepAtom } from "@/store/checkout";
import { fetchBookServiceAtom } from "@/store/service";
import { faCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Label } from "@radix-ui/react-label";
import { RadioGroup, RadioGroupItem } from "@radix-ui/react-radio-group";
import { useAtom } from "jotai";

export default function ServiceSelector({ services }: { services: Service[] }) {
  const [, increaseStep] = useAtom(increaseStepAtom);
  const [service, setService] = useAtom(fetchBookServiceAtom);
  return (
    <div>
      <h1 className="text-2xl font-bold">Services</h1>

      <RadioGroup
        defaultValue={service.id}
        className="grid grid-cols-2 w-full justify-center"
        onValueChange={(value) => {
          setService(value).then(() => {
            increaseStep();
          });
        }}
      >
        {services.map((service: any) => (
          <div className="w-full" key={service.id}>
            <RadioGroupItem
              value={service.id}
              id={service.id}
              className="peer sr-only"
            />
            <Label
              htmlFor={service.id}
              className="flex flex-col gap-4 h-36 cursor-pointer justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
            >
              <h1 className="text-md font-bold">{service.name}</h1>
              <div className="line-clamp-3">{service.description}</div>
              <div className="flex justify-end">
                <span className="text-accent-foreground font-bold">
                  ${service.price}
                </span>
                <FontAwesomeIcon icon={faCircle} className="w-1 mx-2" />
                <span className="text-gray-500">
                  {convertStringDurationToHoursAndMinutes(service.duration)}
                </span>
              </div>
            </Label>
          </div>
        ))}
      </RadioGroup>
    </div>
  );
}
