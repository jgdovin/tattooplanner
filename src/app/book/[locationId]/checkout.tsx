"use client";
import { createBooking } from "@/lib/actions/book";
import { submitPayment } from "@/lib/actions/square";

import {
  fetchBookingDateAtom,
  successAtom,
  fetchBookServiceAtom,
} from "@/lib/store/checkout";
import { SignedIn, SignedOut, SignInButton, useUser } from "@clerk/nextjs";
import { useAtom } from "jotai";
import { redirect } from "next/navigation";
import { useEffect, useState } from "react";
// @ts-ignore: Unreachable code error
import { CreditCard, PaymentForm } from "react-square-web-payments-sdk";
import { toast } from "sonner";

const SUCCESS = "COMPLETED";

export default function Checkout({
  locationId,
  customerId,
}: {
  locationId: string;
  customerId?: string;
}) {
  const { user } = useUser();
  const [processing, setProcessing] = useState(false);
  const [success, setSuccess] = useAtom(successAtom);
  const [service] = useAtom(fetchBookServiceAtom);
  const [bookingDate] = useAtom(fetchBookingDateAtom);

  useEffect(() => {
    if (success) redirect("/book/success");
  }, [success]);

  if (!bookingDate) return <div>No date set, something went wrong</div>;

  return (
    <div>
      {/* TODO: better success */}
      {success ? (
        <div>Payment successful</div>
      ) : (
        <div>
          <SignedOut>
            Checkout As Guest or{" "}
            <SignInButton
              forceRedirectUrl={`/book/${locationId}`}
              mode="modal"
            />
          </SignedOut>
          <SignedIn>{user?.fullName}</SignedIn>
          <div className={`mt-5 ${processing && "hidden"}`}>
            <PaymentForm
              applicationId="sandbox-sq0idb-4Xm1JdMbmVCNLMqexhb7rA"
              locationId="LK6H4ZEKC70XF"
              cardTokenizeResponseReceived={async (token: any) => {
                // setProcessing(true);
                const result = await submitPayment(
                  token.token,
                  service.price,
                  customerId
                );
                if (!result.payment) {
                  setProcessing(false);
                  toast.error("Payment failed, please try again");
                  return;
                }

                if (result.payment.status === SUCCESS) {
                  const res = await createBooking({
                    serviceId: service.id!,
                    date: bookingDate,
                    locationId,
                    customerId: customerId!,
                  });

                  if (res.id) {
                    toast.success("Booking successful");
                    setSuccess(true);
                    return;
                  }
                }
              }}
            >
              <SignedIn>
                <CreditCard />
              </SignedIn>
              <SignedOut>
                You must sign in to complete checkout (for now)
              </SignedOut>
            </PaymentForm>
          </div>
        </div>
      )}
    </div>
  );
}
