"use client";

import { Button } from "@/components/ui/button";
import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown } from "lucide-react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { ApprovalStatusBadge } from "@/components/ui/approval";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

type OvertimeRecord = {
  id: string;
  id_emp: string;
  name: string;
  overtime_name: string;
  // overtime_type: "Government Regulation" | "Flat";
  overtime_type: string;
  date: string;
  hour: number;
  ovt_payroll: number;
  // approval_status: "Approved" | "Pending" | "Rejected";
  approval_status: string;
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
    accessorKey: "id_emp",
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
    cell: ({ row }) => <div>{row.getValue("id_emp")}</div>,
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
    accessorKey: "overtime_type",
    header: "Overtime Type",
    filterFn: (row, columnId, filterValues: string[]) => {
      if (filterValues.length === 0) return true; // If no filters selected, show all
      const overtimeType = row.getValue(columnId) as string;
      return filterValues.includes(overtimeType);
    },

    // cell: ({ row }) => {
    //   const overtime_type = row.getValue("overtime_type") as string;

    //   return (
    //     <div
    //       className="text-left max-w-[120px] truncate"
    //       title={overtime_type} // Tooltip untuk menampilkan nama lengkap
    //     >
    //       {overtime_type.length > 20
    //         ? `${overtime_type.slice(0, 20)}...`
    //         : overtime_type}
    //     </div>
    //   );
    // },
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
  {
    accessorKey: "approval_status",
    header: "Status",
    cell: ({ row }) => {
      const status = row.getValue(
        "approval_status"
      ) as OvertimeRecord["approval_status"];

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
      const status = row.getValue(
        "approval_status"
      ) as OvertimeRecord["approval_status"];

      if (status === "Pending") {
        return (
          <>
            <AlertDialog>
              <AlertDialogTrigger className="hover:bg-danger-50 rounded-md p-1 h-auto w-auto">
                <svg
                  width="19"
                  height="18"
                  viewBox="0 0 19 18"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <g opacity="0.7">
                    <rect
                      x="1.63867"
                      y="0.75"
                      width="16.5"
                      height="16.5"
                      rx="3.25"
                      stroke="#C11106"
                      strokeWidth="1.5"
                    />
                    <path
                      d="M14.3886 4.50004L5.38867 13.5M5.38863 4.5L14.3886 13.5"
                      stroke="#C11106"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </g>
                </svg>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>
                    Are you sure you want to reject this attendance?
                  </AlertDialogTitle>
                  <AlertDialogDescription>
                    <div className="flex gap-2 flex-col">
                      Please enter the reason for rejection.
                      <div className="grid flex-1 gap-2">
                        <Input id="reason" placeholder="Enter the reason" />
                      </div>
                    </div>
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel className="w-auto">
                    Cancel
                  </AlertDialogCancel>
                  <AlertDialogAction className="w-auto bg-danger-700 text-white border border-danger-700 hover:bg-danger-800 hover:text-white">
                    Reject
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
            <Button
              variant="ghost"
              size="icon"
              // onClick={}
              className="p-1 h-auto w-auto"
              icon={
                <svg
                  width="19"
                  height="18"
                  viewBox="0 0 19 18"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <rect
                    x="1.63867"
                    y="0.75"
                    width="16.5"
                    height="16.5"
                    rx="3.25"
                    stroke="#25703F"
                    strokeWidth="1.5"
                  />
                  <path
                    d="M4.63867 9L8.38867 12.75L15.8887 5.25"
                    stroke="#25703F"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              }
            ></Button>
          </>
        );
      } else {
        return <span>-</span>;
      }
    },
    filterFn: (row, columnId, filterValue) => {
      return filterValue.includes(row.getValue(columnId));
    },
  },
];
