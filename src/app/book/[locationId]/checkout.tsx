"use client";
import { createBooking } from "@/actions/book";
import { submitPayment } from "@/actions/square";
import { successAtom } from "@/store/checkout";
import { fetchBookServiceAtom } from "@/store/service";
import { useAtom } from "jotai";
import { useState } from "react";
// @ts-ignore: Unreachable code error
import { CreditCard, PaymentForm } from "react-square-web-payments-sdk";

const SUCCESS = "COMPLETED";

export default function Checkout({
  bookingDate,
  locationId,
}: {
  bookingDate: Date;
  locationId: string;
}) {
  const [processing, setProcessing] = useState(false);
  const [success, setSuccess] = useAtom(successAtom);
  const [service] = useAtom(fetchBookServiceAtom);

  return (
    <div className="w-1/4">
      <div className="w-full text-center">ADD CUSTOMER CHECKOUT DETAILS</div>
      <div className={`${processing && "hidden"}`}>
        <PaymentForm
          applicationId="sandbox-sq0idb-4Xm1JdMbmVCNLMqexhb7rA"
          locationId="LK6H4ZEKC70XF"
          cardTokenizeResponseReceived={async (token: any) => {
            // setProcessing(true);
            const result = await submitPayment(token.token, service.price);
            if (!result.payment) {
              setProcessing(false);
              // TODO: add toast error
              return;
            }

            if (result.payment.status === SUCCESS) {
              const res = await createBooking({
                serviceId: service.id!,
                date: bookingDate,
                locationId,
              });

              if (res.id) {
                setSuccess(true);
                return;
              }
            }
          }}
        >
          <CreditCard />
        </PaymentForm>
      </div>
      {/* TODO: better success */}
      {success && <div>Payment successful</div>}
    </div>
  );
}
