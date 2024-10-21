"use client";

import { useEffect } from "react";
import { useTheme } from "next-themes";
import { useAtom } from "jotai";
import dayjs from "dayjs";

import { LocationType } from "@/lib/types/location";

import {
  fetchBookServiceAtom,
  currentStepAtom,
  fetchBookingDateAtom,
  successAtom,
} from "@/lib/store/checkout";

import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";

import {
  convertStringDurationToHoursAndMinutes,
  convertStringDurationToMinutes,
} from "@/lib/utils";

import SelectAService from "./selectAService";
import SelectADate from "./selectADate";
import Checkout from "./checkout";
import {
  ClearSelectionsButton,
  DecreaseStepButton,
  IncreaseStepButton,
} from "./components/Buttons";
import { SignedIn, SignedOut, SignOutButton } from "@clerk/nextjs";
import { CustomerType } from "@/lib/store/customer";

import Link from "next/link";

interface ClientProps {
  services: any;
  location: LocationType;
  preview: boolean;
  customer: CustomerType;
}

export default function Client({
  services,
  location,
  preview,
  customer,
}: ClientProps) {
  const { setTheme } = useTheme();

  useEffect(() => {
    setTheme("light");
  }, [setTheme]);

  const [currentStep] = useAtom(currentStepAtom);
  const [service, _] = useAtom(fetchBookServiceAtom);
  const [bookingDate] = useAtom(fetchBookingDateAtom);
  const [success] = useAtom(successAtom);

  const StepButtons = () => (
    <div className="flex justify-center w-full gap-10">
      <DecreaseStepButton />
      <ClearSelectionsButton />
      <IncreaseStepButton />
    </div>
  );

  const stepWrapper = (step: React.ReactElement) => {
    return (
      <div className="flex flex-col justify-center items-center w-full gap-5">
        <div className="flex justify-center w-full bg-black p-5 rounded-md">
          <h1 className="text-white text-3xl font-bold">
            Booking at {location.name} {preview && "- (Preview Only)"}
          </h1>
          <div className="md:absolute right-20 text-white">
            <SignedIn>
              <SignOutButton redirectUrl={`/book/${location.id}`} />
            </SignedIn>
            <SignedOut>
              <div className="text-white">
                <Link
                  href={`/customer/sign-in/?redirect_url=/book/${location.id}&location_id=${location.id}`}
                >
                  Sign In
                </Link>
              </div>
            </SignedOut>
          </div>
        </div>
        <div className="flex gap-5">
          <Card className="p-6 flex flex-col">{step}</Card>
          {service.name && (
            <Card className="p-6 flex flex-col gap-5 h-1/4">
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
        </div>
        {!success && <StepButtons />}
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
      <Checkout locationId={location.id!} customerId={customer?.id} />
    );

  return stepWrapper(<div>Step {currentStep}</div>);
}
