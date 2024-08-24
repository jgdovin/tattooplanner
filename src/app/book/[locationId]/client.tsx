"use client";

import { useEffect, useState } from "react";
import { useTheme } from "next-themes";
import { useAtom } from "jotai";
import dayjs from "dayjs";

import { LocationType } from "@/store/location";
import { fetchBookServiceAtom } from "@/store/service";
import { currentStepAtom, setBookingDateAtom } from "@/store/checkout";

import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";

import {
  convertStringDurationToHoursAndMinutes,
  convertStringDurationToMinutes,
} from "@/lib/utils";

import SelectAService from "./selectAService";
import SelectADate from "./selectADate";
import Checkout from "./checkout";
import { DecreaseStepButton, IncreaseStepButton } from "./components/Buttons";

interface ClientProps {
  services: any;
  location: LocationType;
}

export default function Client({ services, location }: ClientProps) {
  const { setTheme } = useTheme();

  useEffect(() => {
    setTheme("light");
  }, [setTheme]);

  const [currentStep] = useAtom(currentStepAtom);
  const [bookingDate, _setBookingDate] = useState<Date | undefined>(undefined);
  const [service, _] = useAtom(fetchBookServiceAtom);

  const StepButtons = () => (
    <div className="flex justify-center w-full gap-10">
      <DecreaseStepButton />
      <IncreaseStepButton />
    </div>
  );

  const stepWrapper = (step: React.ReactElement) => {
    return (
      <div className="flex flex-col justify-center items-center w-full gap-5">
        <div className="flex justify-center w-full bg-black p-5 rounded-md">
          <h1 className="text-white text-3xl font-bold">
            Booking at {location.name}
          </h1>
        </div>
        {service.name && (
          <Card className="p-6 flex flex-col gap-5">
            <h1 className="text-lg font-bold text-center">Summary</h1>
            <div className="flex gap-2 items-center">
              <Label className="font-bold w-32 text-right">
                Booking Service:
              </Label>
              <span className="text-sm">{service.name}</span>
            </div>
            <div className="flex gap-2 items-center">
              <Label className="font-bold w-32 text-right pr-2">
                Duration:
              </Label>
              <span className="text-sm">
                {convertStringDurationToHoursAndMinutes(service.duration)}
              </span>
            </div>
            <div className="flex gap-2 items-center">
              <Label className="font-bold w-32 text-right pr-2">Price:</Label>
              <span className="text-sm">${service.price}</span>
            </div>
            {bookingDate && (
              <div className="flex gap-2 items-center">
                <Label className="font-bold w-32 text-right pr-2">
                  Booking Date:
                </Label>
                <div className="flex flex-col">
                  <span className="text-sm">
                    {dayjs(bookingDate).format("MMM DD, YYYY")}
                  </span>
                  <span className="text-sm">
                    {dayjs(bookingDate).format("h:mm A")} -
                    {dayjs(bookingDate)
                      .add(
                        convertStringDurationToMinutes(service.duration),
                        "minute"
                      )
                      .format("h:mm A")}
                  </span>
                </div>
              </div>
            )}
          </Card>
        )}
        {step}
        <StepButtons />
      </div>
    );
  };

  if (currentStep === 1)
    return stepWrapper(
      <SelectAService services={services} location={location} />
    );

  if (currentStep === 2)
    return stepWrapper(<SelectADate locationId={location.id || ""} />);

  if (currentStep === 3)
    return stepWrapper(
      <Checkout bookingDate={bookingDate!} locationId={location.id!} />
    );

  if (currentStep === 4) return <div>Thank you for booking!</div>;

  return stepWrapper(<div>Step {currentStep}</div>);
}
