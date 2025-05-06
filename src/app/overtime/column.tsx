"use client";

import { Button } from "@/components/ui/button";
import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown} from "lucide-react";

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
type OvertimeRecord = {
  id: string;
  name: string;
  position: string;
  overtimeName: string;
  date: string;
  hour: number;
  ovt_payroll: number;
};

export const OvertimeColumn: ColumnDef<OvertimeRecord>[] = [
  {
    accessorKey: "id",
    enableSorting: true,
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          ID
          <ArrowUpDown />
        </Button>
      );
    },
    cell: ({ row }) => <div className="lowercase">{row.getValue("id")}</div>,
  },
  {
    accessorKey: "name",
    enableColumnFilter: true,
    enableSorting: true,
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Employee Name
          <ArrowUpDown />
        </Button>
      );
    },
    cell: ({ row }) => (
      <div className="lowercase">{row.getValue("name")}</div>
    ),
  },
  {
    accessorKey: "position",
    header: "Position",
  },
  {
    accessorKey: "overtimeName",
    header: "Overtime Type",
  },
  {
    accessorKey: "date",
    enableSorting: true,
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Date
          <ArrowUpDown />
        </Button>
      );
    },
    cell: ({ row }) => <div className="lowercase">{row.getValue("date")}</div>,
  },
  {
    accessorKey: "hour",
    header: "Total Hour",
  },
  {
    accessorKey: "ovt_payroll",
    header: "Overtime Payroll",
    cell: ({ getValue }) => {
      const value = getValue() as number;
      return `IDR ${value.toLocaleString("id-ID")}`;
    },
  },
];
