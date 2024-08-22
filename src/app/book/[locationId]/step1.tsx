"use client";

import { faCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { formatTime } from "@/lib/utils";
import { useAtom } from "jotai";
import { fetchBookServiceAtom } from "@/store/service";

export default function Step1({ services, location, increaseStep }: any) {
  const [service, setService] = useAtom(fetchBookServiceAtom);
  return (
    <>
      <h1 className="text-2xl font-bold">Services</h1>

      <RadioGroup
        defaultValue={service.id}
        className="grid grid-cols-2 w-full justify-center"
        onValueChange={(value) => {
          console.log(value);
          setService(value).then(() => increaseStep());
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
              className="flex flex-col gap-4 h-36  justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
            >
              <h1 className="text-md font-bold">{service.name}</h1>
              <div className="line-clamp-3">{service.description}</div>
              <div className="flex justify-end">
                <span className="text-accent-foreground font-bold">
                  ${service.price}
                </span>
                <FontAwesomeIcon icon={faCircle} className="w-1 mx-2" />
                <span className="text-gray-500">{service.duration}</span>
              </div>
            </Label>
          </div>
        ))}
      </RadioGroup>
      <div className="flex flex-col items-center w-full bg-gray-200 text-gray-700 p-10 rounded-md gap-10">
        <h1 className="text-xl font-bold">{location.name}</h1>
        <div className="flex gap-20">
          <div>
            <p>
              {location.name} -{" "}
              <span className="text-xs text-gray-600">{location.nickname}</span>
              {location.address1 && (
                <>
                  <br />
                  {location.address1}
                </>
              )}
              <br />
              {location.city}, {location.state} {location.zip}
              {location.phone && (
                <>
                  <br />
                  <a className="hover:underline" href={`tel:${location.phone}`}>
                    {location.phone}
                  </a>
                </>
              )}
              {location.email && (
                <>
                  <br />
                  <a
                    className="hover:underline"
                    href={`mailto:${location.email}`}
                  >
                    {location.email}
                  </a>
                </>
              )}
            </p>
          </div>
          <div>
            <div className="flex">
              <div className="w-24">Monday</div>
              {location.monClosed ? (
                "Closed"
              ) : (
                <>
                  {formatTime(location.monStart)}- {formatTime(location.monEnd)}
                </>
              )}
            </div>
            <div className="flex">
              <div className="w-24">Tuesday</div>
              {location.tueClosed ? (
                "Closed"
              ) : (
                <>
                  {formatTime(location.tueStart)}- {formatTime(location.tueEnd)}
                </>
              )}
            </div>
            <div className="flex">
              <div className="w-24">Wednesday</div>
              {location.wedClosed ? (
                "Closed"
              ) : (
                <>
                  {formatTime(location.wedStart)}- {formatTime(location.wedEnd)}
                </>
              )}
            </div>
            <div className="flex">
              <div className="w-24">Thursday</div>
              {location.thuClosed ? (
                "Closed"
              ) : (
                <>
                  {formatTime(location.thuStart)}- {formatTime(location.thuEnd)}
                </>
              )}
            </div>
            <div className="flex">
              <div className="w-24">Friday</div>
              {location.friClosed ? (
                "Closed"
              ) : (
                <>
                  {formatTime(location.friStart)}- {formatTime(location.friEnd)}
                </>
              )}
            </div>
            <div className="flex">
              <div className="w-24">Saturday</div>
              {location.satClosed ? (
                "Closed"
              ) : (
                <>
                  {formatTime(location.satStart)}- {formatTime(location.satEnd)}
                </>
              )}
            </div>
            <div className="flex">
              <div className="w-24">Sunday</div>
              {location.sunClosed ? (
                "Closed"
              ) : (
                <>
                  {formatTime(location.sunStart)}- {formatTime(location.sunEnd)}
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
