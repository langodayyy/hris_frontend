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
import { CheckclockSettingForm } from "@/types/cksettingForm";
import { ColumnDef } from "@tanstack/react-table";
import React from "react";
import { Label } from "recharts";

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
  status: string;
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
    accessorKey: "amount",
    header: ({ column }) => <div className="text-center">Amount</div>,
    cell: ({ row }) => {
      const amount = row.getValue("amount");
      const formatted = amount ? Number(amount).toLocaleString("id-ID") : "";
      return <div className="text-center">IDR {formatted}</div>;
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
        formatted = date.toLocaleDateString("id-ID", {
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
      const deadline = row.getValue("deadline");
      let formatted = "";
      if (typeof deadline === "string" && /^\d{4}-\d{2}-\d{2}/.test(deadline)) {
        const [year, month, day] = deadline.split("-");
        const date = new Date(Number(year), Number(month) - 1, Number(day));
        formatted = date.toLocaleDateString("id-ID", {
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
      return (
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="outline" size={"sm"}>
              View
            </Button>
          </SheetTrigger>
          <SheetContent className="bg-white">
            <SheetHeader>
              <SheetTitle>Pay the bill</SheetTitle>
            </SheetHeader>
            <SheetDescription className="mt-1">
              Make changes to your profile here. Click save when you're done.
            </SheetDescription>
            <div className="flex w-full flex-col">
              <div className="flex w-full justify-between px-4">
                <span>hhjash</span>
              </div>
            </div>
            <SheetFooter>
              <SheetClose asChild>
                <Button type="submit">Save changes</Button>
              </SheetClose>
            </SheetFooter>
          </SheetContent>
        </Sheet>
      );
    },
  },
];
