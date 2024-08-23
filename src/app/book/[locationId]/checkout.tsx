"use client";
import { submitPayment } from "@/actions/square";
import { useState } from "react";
// @ts-ignore: Unreachable code error
import { CreditCard, PaymentForm } from "react-square-web-payments-sdk";

const SUCCESS = "COMPLETED";

export default function Checkout({ increaseStep }: { increaseStep: any }) {
  const [processing, setProcessing] = useState(false);

  return (
    <div className="w-1/4">
      <div className="w-full text-center">ADD CUSTOMER CHECKOUT DETAILS</div>
      <div className={`${processing && "hidden"}`}>
        <PaymentForm
          applicationId="sandbox-sq0idb-4Xm1JdMbmVCNLMqexhb7rA"
          locationId="LK6H4ZEKC70XF"
          cardTokenizeResponseReceived={async (token: any) => {
            setProcessing(true);
            const result = await submitPayment(token.token, 100);
            if (!result.payment) {
              setProcessing(false);
              // TODO: add toast error
              return;
            }

            if (result.payment.status === SUCCESS) {
              increaseStep();
            }
          }}
        >
          <CreditCard />
        </PaymentForm>
      </div>
    </div>
  );
}
