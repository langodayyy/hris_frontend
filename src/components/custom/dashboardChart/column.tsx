"use client";

import { Button } from "@/components/ui/button";
import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown } from "lucide-react";

export type CheckClockListRecord = {
  id: string;
  name: string;
  time: string;
  position: string;
};

export const CheckClockList = (
): ColumnDef<CheckClockListRecord>[] => [
  {
    accessorKey: "no",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="justify-start"
        >
          No
          <ArrowUpDown />
        </Button>
      );
    },
    enableSorting: true,
    cell: ({ row }) => {
      return <div className="text-start px-3">{row.index + 1}</div>;
    },
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
          className="justify-start"
        >
          Name
          <ArrowUpDown />
        </Button>
      );
    },
    cell: ({ row }) => <div className="text-start px-3">{row.getValue("name")}</div>,
  },
  {
    accessorKey: "time",
    header: "Time",
  },
  {
    accessorKey: "position",
    header: "Position",
  },
];