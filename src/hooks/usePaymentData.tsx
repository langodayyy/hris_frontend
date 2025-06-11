"use client";
import useSWR from "swr";
import { useEffect, useState, useCallback } from "react";
import Cookies from "js-cookie";
import { CheckclockSetting } from "@/types/cksetting";
import { redirect } from "next/navigation";

export type paymentRule = {
  payment_id: string;
  user_id: number;
  total_employee: number;
  amount: number;
  period: string;
  deadline: Date;
  status: string;
  pay_at: Date;
  fine: number;
  plan_name: string; // Optional, if you want to include plan name
};

const fetcher = (url: string) =>
  fetch(url, {
    headers: {
      Authorization: `Bearer ${Cookies.get("token")}`,
      "Content-Type": "application/json",
    },
  }).then((res) => res.json());

export function usePaymentData() {
  const { data, error, isLoading } = useSWR(
    `${process.env.NEXT_PUBLIC_API_URL}/payment-history`,
    fetcher
  );
  console.log("API raw data:", data, "error:", error);
 const payData = data?.payData ?? null;
  const paymentRule = Array.isArray(data?.data)
    ? data.data.map((item: any) => ({
        payment_id: item.payment_id,
        user_id: item.user_id,
        total_employee: item.total_employee,
        amount: item.amount,
        period: item.period, // mapping ke 'period' agar sesuai dengan kolom tabel
        deadline: item.deadline,
        status: item.status,
        pay_at: item.pay_at,
        fine: item.fine || 0, 
        plan_name: item.plan_name, 
      }))
    : [];

  return {
    payData,
    loading: isLoading,
    paymentRule,
  };
}
