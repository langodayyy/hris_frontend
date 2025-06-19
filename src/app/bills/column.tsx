"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { BillDetailRow } from "@/components/ui/bill-detail-row";
import { BillDetailColumn } from "@/components/ui/bill-detail-column";
import { ApprovalStatusBadge } from "@/components/ui/approval";
import { BillStatusBadge } from "./BillStatusBadge";
import { CheckclockSettingForm } from "@/types/cksettingForm";
import { ColumnDef } from "@tanstack/react-table";
import React from "react";
import Cookies from "js-cookie";
import { useState } from "react";
import { Spinner } from "@/components/ui/spinner";

const fetcher = (url: string) =>
  fetch(url, {
    headers: {
      Authorization: `Bearer ${Cookies.get("token")}`,
      "Content-Type": "application/json",
    },
    method: "GET",
  }).then((res) => res.json());

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type checkclockSetting = {
  id: string;
  payment_id: string;
  total_employee: number;
  amount: number;
  period: string;
  deadline: string;
  pay_at: string;
  fine: number;
  status: string;
  plan_name: string;
};

export const wfoColumns: ColumnDef<CheckclockSettingForm>[] = [
  {
    accessorKey: "no",
    header: ({ column }) => {
      return <div className="text-center">No.</div>;
    },
    cell: ({ row }) => {
      return <div className="text-center">{row.index + 1}</div>;
    },
  },
  {
    accessorKey: "payment_id",
    header: ({ column }) => {
      return <div className="">Payment ID</div>;
    },
    cell: ({ row }) => {
      return <div className="text-left">{row.getValue("payment_id")}</div>;
    },
  },
  {
    accessorKey: "period",
    header: ({ column }) => {
      return <div className="text-center">Period</div>;
    },
    cell: ({ row }) => {
      const period = row.getValue("period");
      let formatted = "";
      if (typeof period === "string") {
        const parts = period.split("-");
        let year = "";
        let month = "";
        if (parts.length >= 2) {
          if (parts[0].length === 4) {
            // Format: YYYY-MM
            year = parts[0];
            month = parts[1];
          } else if (parts[1].length === 4) {
            // Format: MM-YYYY
            year = parts[1];
            month = parts[0];
          }
          if (year && month) {
            const date = new Date(Number(year), Number(month) - 1);
            formatted = date.toLocaleString("en-US", {
              month: "long",
              year: "numeric",
            });
          } else {
            formatted = period;
          }
        } else {
          formatted = period;
        }
      }
      return <div className="text-center">{formatted}</div>;
    },
  },
  {
    accessorKey: "plan_name",
    header: ({ column }) => {
      return <div className="text-center">Plan Name</div>;
    },
    cell: ({ row }) => {
      return <div className="text-center">{row.getValue("plan_name")}</div>;
    },
  },
  {
    accessorKey: "total_employee",
    header: ({ column }) => {
      return <div className="text-center">Total Employee</div>;
    },
    cell: ({ row }) => {
      return (
        <div className="text-center">{row.getValue("total_employee")}</div>
      );
    },
  },
  {
    accessorKey: "deadline",
    header: ({ column }) => {
      return <div className="text-center">Pay Before</div>;
    },
    cell: ({ row }) => {
      const deadline = row.getValue("deadline");
      let formatted = "";
      if (typeof deadline === "string" && /^\d{4}-\d{2}-\d{2}/.test(deadline)) {
        const [year, month, day] = deadline.split("-");
        const date = new Date(Number(year), Number(month) - 1, Number(day));
        formatted = date.toLocaleDateString("en-US", {
          day: "numeric",
          month: "long",
          year: "numeric",
        });
      } else {
        formatted = typeof deadline === "string" ? deadline : "";
      }
      return <div className="text-center">{formatted}</div>;
    },
  },
  {
    accessorKey: "pay_at",
    header: ({ column }) => {
      return <div className="text-center">Date Paid</div>;
    },
    cell: ({ row }) => {
      const pay_at = row.getValue("pay_at");
      let formatted = "";
      if (typeof pay_at === "string" && /^\d{4}-\d{2}-\d{2}/.test(pay_at)) {
        const [year, month, day] = pay_at.split("-");
        const date = new Date(Number(year), Number(month) - 1, Number(day));
        formatted = date.toLocaleDateString("en-US", {
          day: "numeric",
          month: "long",
          year: "numeric",
        });
      } else {
        formatted = typeof pay_at === "string" ? pay_at : "-";
      }
      return <div className="text-center">{formatted}</div>;
    },
  },
  {
    accessorKey: "amount",
    header: ({ column }) => <div className="text-center">Amount</div>,
    cell: ({ row }) => {
      const amount = row.getValue("amount");
      const formatted = amount ? Number(amount).toLocaleString("en-US") : "";
      return <div className="text-center">IDR {formatted}</div>;
    },
  },
  {
    accessorKey: "fine",
    header: ({ column }) => <div className="text-center">Fine</div>,
    cell: ({ row }) => {
      const fine = row.getValue("fine");
      const formatted = fine ? Number(fine).toLocaleString("en-US") : "";
      return <div className="text-center">IDR {formatted}</div>;
    },
  },
  {
    accessorKey: "status",
    header: ({ column }) => {
      return <div className="text-center">Status</div>;
    },
    cell: ({ row }) => {
      const status = row.getValue("status");
      let badgeProps = { status: "Pending" };
      if (status === "paid") {
        badgeProps = { status: "Approved" };
      } else if (status === "pending") {
        badgeProps = { status: "Pending" };
      } else if (status === "overdue") {
        badgeProps = { status: "Rejected" };
      }
      // Custom label and color for bills
      let label = "";
      if (status === "paid") label = "Paid";
      else if (status === "pending") label = "Waiting payment";
      else if (status === "overdue") label = "Overdue";
      let colorClass = "";
      if (status === "paid") colorClass = "bg-green-100 text-success-700";
      else if (status === "pending")
        colorClass = "bg-warning-50 text-warning-500";
      else if (status === "overdue") colorClass = "bg-red-100 text-danger-700";
      let dotClass = "";
      if (status === "paid") dotClass = "bg-green-600";
      else if (status === "pending") dotClass = "bg-warning-500";
      else if (status === "overdue") dotClass = "bg-red-600";
      return (
        <div className="w-full flex items-center justify-center">
          <div
            className={`flex items-center gap-2 px-3 py-1 w-fit rounded-2xl ${colorClass}`}
          >
            <span className={`w-2 h-2 rounded-full ${dotClass}`}></span>
            <span
              className={`text-sm font-medium ${colorClass.replace(
                /bg-[^ ]+/,
                ""
              )}`}
            >
              {label}
            </span>
          </div>
        </div>
      );
    },
  },
  {
    accessorKey: "action",
    header: ({ column }) => {
      return <div className="text-center">Detail</div>;
    },
    cell: ({ row }) => {
      const [isLoading, setLoading] = React.useState(false);
      const handleRedirect = async (paymentId: string) => {
        const storageKey = `invoice_url_${paymentId}`;
        const storageExpKey = `invoice_url_exp_${paymentId}`;
        const now = Date.now();
        const exp = localStorage.getItem(storageExpKey);
        const url = localStorage.getItem(storageKey);
        setLoading(true);
        if (url && exp && now < Number(exp)) {
          // Use cached invoice_url
          window.open(url, "_blank", "noopener,noreferrer");
          setLoading(false);
          return;
        }
        try {
          const data = await fetcher(
            `${process.env.NEXT_PUBLIC_API_URL}/payment/`
          );
          if (data.invoice_url) {
            localStorage.setItem(storageKey, data.invoice_url);
            localStorage.setItem(
              storageExpKey,
              (now + 24 * 60 * 60 * 1000).toString()
            );
            window.open(data.invoice_url, "_blank", "noopener,noreferrer");
          } else {
            console.error("No invoice_url found in response");
          }
        } catch (error) {
          console.error("Failed to get redirect link:", error);
        } finally {
          setLoading(false);
        }
      };

      return (
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="outline" size={"sm"}>
              View
            </Button>
          </SheetTrigger>
          <SheetContent className="bg-white">
            <div className="border rounded-lg border-gray-200 m-4 mt-12 h-fit px-1">
              <SheetHeader className="flex flex-col gap-0 px-5">
                <SheetTitle className="text-xl">Invoice</SheetTitle>
                <BillDetailRow
                  label="Payment ID:"
                  value={row.getValue("payment_id")}
                  className="!justify-start gap-2 text-neutral-400"
                />
              </SheetHeader>
              <div className="w-full border-1 border-neutral-100 " />
              <div className="px-5 flex flex-col gap-3 ">
                <div className="grid grid-cols-2 justify-star items-center mt-3">
                  <BillDetailColumn
                    label="Plan Name"
                    value={row.getValue("plan_name")}
                  />
                  <BillDetailColumn
                    label="Status"
                    value={
                      <BillStatusBadge
                        status={
                          row.getValue("status") === "paid"
                            ? "paid"
                            : row.getValue("status") === "pending"
                            ? "pending"
                            : "overdue"
                        }
                      />
                    }
                  />
                </div>
                <div className="grid grid-cols-2 justify-start items-center mb-3">
                  <BillDetailColumn
                    label="Period"
                    value={(() => {
                      const period = row.getValue("period");
                      let formatted = "";
                      if (typeof period === "string") {
                        const parts = period.split("-");
                        let year = "";
                        let month = "";
                        if (parts.length >= 2) {
                          if (parts[0].length === 4) {
                            // Format: YYYY-MM
                            year = parts[0];
                            month = parts[1];
                          } else if (parts[1].length === 4) {
                            // Format: MM-YYYY
                            year = parts[1];
                            month = parts[0];
                          }
                          if (year && month) {
                            const date = new Date(
                              Number(year),
                              Number(month) - 1
                            );
                            formatted = date.toLocaleString("en-US", {
                              month: "long",
                              year: "numeric",
                            });
                          } else {
                            formatted = period;
                          }
                        } else {
                          formatted = period;
                        }
                      }
                      return formatted;
                    })()}
                  />
                  <BillDetailColumn
                    label="Pay Before"
                    value={(() => {
                      const deadline = row.getValue("deadline");
                      let formatted = "";
                      if (
                        typeof deadline === "string" &&
                        /^\d{4}-\d{2}-\d{2}/.test(deadline)
                      ) {
                        const [year, month, day] = deadline.split("-");
                        const date = new Date(
                          Number(year),
                          Number(month) - 1,
                          Number(day)
                        );
                        formatted = date.toLocaleDateString("en-US", {
                          day: "numeric",
                          month: "long",
                          year: "numeric",
                        });
                      } else {
                        formatted =
                          typeof deadline === "string" ? deadline : "";
                      }
                      return formatted;
                    })()}
                  />
                </div>
                {/* <div className="w-full border-1 border-neutral-100 " /> */}
                <div className="font-semibold text-sm mt-1">Bill Details</div>
                <BillDetailRow
                  label="Total Employee"
                  value={row.getValue("total_employee")}
                />
                <div className="w-full border border-neutral-300 my-2"></div>
                <div className="flex flex-col gap-1">
                  <BillDetailRow
                    label="Amount"
                    value={`IDR ${Number(row.getValue("amount")).toLocaleString(
                      "en-US"
                    )}`}
                  />
                  <BillDetailRow
                    label="Fine (20%)"
                    value={`IDR ${Number(row.getValue("fine")).toLocaleString(
                      "en-US"
                    )}`}
                  />
                </div>
                <div className="w-full border border-neutral-300 my-2"></div>
                <BillDetailRow
                  label="Total"
                  labelClassName="font-semibold text-neutral-900"
                  value={(() => {
                    const amount = Number(row.getValue("amount") || 0);
                    const fine = Number(row.getValue("fine") || 0);
                    const total = amount + fine;
                    return `IDR ${total.toLocaleString("en-US")}`;
                  })()}
                />
              </div>
              <SheetFooter className=" grid grid-cols-2 mt-4">
                <SheetClose asChild>
                  <Button variant={"outline"}>Close</Button>
                </SheetClose>
                {(row.getValue("status") === "pending" ||
                  row.getValue("status") === "overdue") && (
                  <Button
                    type="submit"
                    onClick={() => {
                      console.log("Pay Bill clicked");
                      handleRedirect(row.getValue("payment_id"));
                    }}
                    disabled={isLoading}
                  >
                    {isLoading ? <Spinner size={"small"} /> : "Pay Bill"}
                  </Button>
                )}
              </SheetFooter>
            </div>
          </SheetContent>
        </Sheet>
      );
    },
  },
];
