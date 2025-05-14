"use client";

import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown } from "lucide-react";



import { Button } from "@/components/ui/button";
import { ApprovalStatusBadge } from "@/components/ui/approval";


// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type CheckclockOverview = {
  id: number; 
  employeeName: string;
  position:string;
  date: string;
  clockIn: string;
  clockOut: string;
  workType: string;
  status: string;
  approvalStatus: string;
};

export const columns: ColumnDef<CheckclockOverview>[] = [
  {
    accessorKey: "id",
    header: "Employee ID",
  },
  {
    accessorKey: "employeeName",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="text-center  gap-0 p-0  text-neutral-400"
        >
          <div className="w-full flex items-start justify-start">
            Employee Name
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </div>
        </Button>
      );
      
    },

    cell: ({ row }) => {
      const employeeName = row.getValue("employeeName") as string;

      return (
        <div
          className="text-left max-w-[120px] truncate"
          title={employeeName} // Tooltip untuk menampilkan nama lengkap
        >
          {employeeName.length > 20
            ? `${employeeName.slice(0, 20)}...`
            : employeeName}
        </div>
      );
    },
  },
  {
    accessorKey: "position",
    header: ({ column }) => {
      return <div className="text-center">Position</div>;
    },
    // header: "Position",
    cell: ({ row }) => (
      <div className="text-center">{row.getValue("position")}</div>
    ),
    filterFn: (row, columnId, filterValue) => {
      return filterValue.includes(row.getValue(columnId));
    }
  },
  {
    accessorKey: "date",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Date
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => (
      <div className="text-center">{row.getValue("date")}</div>
    ),
  },

  {
    accessorKey: "clockIn",
    header: ({ column }) => {
      return <div className="text-center">Clock In</div>;
    },
    cell: ({ row }) => (
      <div className="text-center">{row.getValue("clockIn")}</div>
    ),
  },
  {
    accessorKey: "clockOut",
    header: ({ column }) => {
      return <div className="text-center">Clock Out</div>;
    },
    cell: ({ row }) => (
      <div className="text-center">{row.getValue("clockOut")}</div>
    ),
  },
  {
    accessorKey: "workType",
    header: ({ column }) => {
      return <div className="text-center">Work Type</div>;
    },
    cell: ({ row }) => (
      <div className="text-center">{row.getValue("workType")}</div>
    ),
    filterFn: (row, columnId, filterValue) => {
      return filterValue.includes(row.getValue(columnId));
    }
  },
  {
    accessorKey: "status",
    header: ({ column }) => {
      return <div className="text-center">Status</div>;
    },
    cell: ({ row }) => (
      <div className="text-center">{row.getValue("status")}</div>
    ),
    filterFn: (row, columnId, filterValue) => {
      return filterValue.includes(row.getValue(columnId));
    }
  },
  {
    accessorKey: "approvalStatus",
    header: ({ column }) => {
      return <div className="text-center">Approval Status</div>;
    },
    cell: ({ row }) => {
      const status = row.getValue(
        "approvalStatus"
      ) as CheckclockOverview["approvalStatus"];

      return <ApprovalStatusBadge status={status as "Approved" | "Pending" | "Rejected"} />;
    },
    filterFn: (row, columnId, filterValue) => {
      return filterValue.includes(row.getValue(columnId));
    },
  },
  {
    accessorKey: "Details",
    id: "actions",
    header: ({ column }) => {
      return <div className="text-center">Details</div>;
    },
    cell: ({ row }) => {
      return (
        <div className="w-full flex items-center justify-center">
          <Button variant={"outline"} size={"sm"}>
            View
          </Button>
        </div>
      );
    },
  },
];
