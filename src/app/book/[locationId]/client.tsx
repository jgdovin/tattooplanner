"use client";

import { LocationType } from "@/store/location";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { useAtom } from "jotai";
import { fetchBookServiceAtom } from "@/store/service";
import dayjs from "dayjs";
import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";

import SelectAService from "./selectAService";
import SelectADate from "./selectADate";
import Checkout from "./checkout";
import { useTheme } from "next-themes";
import { convertStringDurationToMinutes } from "@/lib/utils";

interface ClientProps {
  services: any;
  location: LocationType;
}

const steps = ["Select a service", "Select a date/time", "Checkout"];

export default function Client({ services, location }: ClientProps) {
  const { setTheme } = useTheme();

  useEffect(() => {
    setTheme("light");
  }, []);

  const [currentStep, setCurrentStep] = useState(1);
  const [bookingDate, _setBookingDate] = useState<Date | undefined>(undefined);
  const [service, _] = useAtom(fetchBookServiceAtom);

  const setBookingDate = ({ date, time }: { date: Date; time: string }) => {
    if (!date) _setBookingDate(undefined);
    const newDate = dayjs(date)
      .set("hour", parseInt(time.split(":")[0]))
      .set("minute", parseInt(time.split(":")[1]));
    _setBookingDate(newDate.toDate());
  };

  const increaseStep = () => {
    if (currentStep >= steps.length) return;
    setCurrentStep(currentStep + 1);
  };

  const decreaseStep = () => {
    if (currentStep <= 1) return;
    setCurrentStep(currentStep - 1);
  };
  const disableIncreaseButton = () => {
    if (currentStep >= steps.length) return true;
    if (currentStep === 1 && !service.name) return true;
    return false;
  };
  const IncreaseStepButton = () => (
    <Button
      disabled={disableIncreaseButton()}
      onClick={increaseStep}
      className={`${
        currentStep >= steps.length && "hidden"
      } text-2xl py-6 px-8`}
    >
      Next
    </Button>
  );

  const DecreaseStepButton = () => (
    <Button
      disabled={currentStep <= 1}
      onClick={decreaseStep}
      className="text-2xl py-6 px-8"
    >
      Back
    </Button>
  );

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
              <Label className="font-bold">Booking Service:</Label>
              <span className="text-sm">{service.name}</span>
            </div>
            {bookingDate && (
              <div className="flex flex-col">
                <div className="flex gap-2 items-center">
                  <Label className="font-bold">Booking Date:</Label>
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
                <div className="flex gap-2 items-center">
                  <Label className="font-bold">Price:</Label>
                  <span className="text-sm">${service.price}</span>
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
      <SelectAService
        services={services}
        location={location}
        increaseStep={increaseStep}
        setBookingDate={setBookingDate}
      />
    );

  if (currentStep === 2)
    return stepWrapper(
      <SelectADate
        locationId={location.id || ""}
        setBookingDate={setBookingDate}
        bookingDate={bookingDate}
        increaseStep={increaseStep}
      />
    );

  if (currentStep === 3)
    return stepWrapper(<Checkout increaseStep={increaseStep} />);

  if (currentStep === 4) return <div>Thank you for booking!</div>;

  return stepWrapper(<div>Step {currentStep}</div>);
}
