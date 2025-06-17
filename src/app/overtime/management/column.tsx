"use client";

import { OvertimeActions } from "@/components/custom/overtimeAction";
import { Button } from "@/components/ui/button";
import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown } from "lucide-react";
import { ApprovalStatusBadge } from "@/components/ui/approval";


type OvertimeRecord = {
  id: string;
  employee_id: string;
  name: string;
  overtime_name: string;
  // type: "Government Regulation" | "Flat";
  type: string;
  date: string;
  total_hour: number;
  payroll: number;
  // status: "Approved" | "Pending" | "Rejected";
  status: string;
};

export const OvertimeColumn = (): ColumnDef<OvertimeRecord>[] => [
  {
    id: "no",
    enableSorting: true,
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          No
          <ArrowUpDown />
        </Button>
      );
    },
    cell: ({ row }) => row.index + 1, // Tampilkan nomor urut
    accessorFn: (_, index) => index, // Untuk keperluan sorting
  },
  {
    accessorKey: "employee_id",
    enableSorting: true,
    enableColumnFilter: true,
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Emloyee ID
          <ArrowUpDown />
        </Button>
      );
    },
    cell: ({ row }) => <div>{row.getValue("employee_id")}</div>,
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
    cell: ({ row }) => <div className="text-start">{row.getValue("name")}</div>,
  },
  {
    accessorKey: "overtime_name",
    header: "Overtime Name",
  },
  {
    accessorKey: "type",
    header: "Overtime Type",
    filterFn: (row, columnId, filterValues: string[]) => {
      if (filterValues.length === 0) return true; // If no filters selected, show all
      const overtimeType = row.getValue(columnId) as string;
      return filterValues.includes(overtimeType);
    },

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
    cell: ({ row }) => <div>{row.getValue("date")}</div>,
  },
  {
    accessorKey: "start_hour",
    header: "Start Hour",
  },
  {
    accessorKey: "end_hour",
    header: "End Hour",
  },
  {
    accessorKey: "payroll",
    header: "Overtime Payroll",
    cell: ({ getValue }) => {
      const value = getValue() as number;
      const formatted = (value || 0).toLocaleString("id-ID"); // 1.000.000
      return `IDR ${formatted}`;
    },
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      const status = row.getValue(
        "status"
      ) as OvertimeRecord["status"];

      if (status === "Pending") {
        return <ApprovalStatusBadge status="Pending" />;
      } else if (status === "Rejected") {
        return <ApprovalStatusBadge status="Rejected" />;
      } else {
        return <ApprovalStatusBadge status="Approved" />;
      }
    },
    filterFn: (row, columnId, filterValues: string[]) => {
      if (filterValues.length === 0) return true; // If no filters selected, show all
      const status = row.getValue(columnId) as string;
      return filterValues.includes(status);
    },
  },
  {
    accessorKey: "action",
    header: "Action",
    
    cell: ({ row }) => {
    const status = row.getValue("status") as OvertimeRecord["status"];
    if (status === "Pending") {
      return <OvertimeActions overtimeId={row.original.id} />;
    }
    return <span>-</span>;
  },
  filterFn: (row, columnId, filterValue) => {
    return filterValue.includes(row.getValue(columnId));
  },
  },
  
];
