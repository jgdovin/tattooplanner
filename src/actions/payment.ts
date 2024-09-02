"use server";

import prisma from "@/lib/prisma";
import { CreatePaymentResponse } from "square";

export async function createPayment(
  squarePaymentResponse: CreatePaymentResponse,
  customerId: string
) {
  if (!squarePaymentResponse.payment) return;
  const {
    payment: {
      id,
      amountMoney,
      totalMoney,
      approvedMoney,
      sourceType,
      orderId,
    },
  } = squarePaymentResponse;

  const payment = {
    squareId: id || "",
    squareAmount: amountMoney?.amount || 0,
    squareTotalAmount: totalMoney?.amount || 0,
    squareApprovedAmount: approvedMoney?.amount || 0,
    squareSourceType: sourceType || "",
    squareOrderId: orderId || "",
    customer: {
      connect: {
        id: customerId,
      },
    },
  };

  try {
    const res = await prisma.payment.create({
      data: payment,
    });
    return res;
  } catch (error) {
    console.error("Failed to add payment to DB", error);
  }
}
