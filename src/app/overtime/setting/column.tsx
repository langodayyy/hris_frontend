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

type OvertimeSettingsRecord = {
  id: string;
  name: string;
  type: string;
  category: string;
  working_days: number | null;
  status: string;
  formula: string[];
};

export const OvertimeSettingsColumn = (): ColumnDef<OvertimeSettingsRecord>[] => [
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
    accessorKey: "name",
    enableColumnFilter: true,
    enableSorting: true,
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Overtime Name
          <ArrowUpDown />
        </Button>
      );
    },
    cell: ({ row }) => <div className="text-start">{row.getValue("name")}</div>,
  },
  {
    accessorKey: "type",
    header: "Type",
  },
  {
    accessorKey: "category",
    header: "Category",
  },
  // {
  //   accessorKey: "work_day",
  //   header: "Working Day",
  //   cell: ({ getValue }) => {
  //     const value = getValue();
  //     return value == null ? "-" : `${value} days`;
  //   },
  // },
  // {
  //   accessorKey: "calculation",
  //   header: "Calculation",
  //   cell: ({ getValue }) => {
  //     const value = getValue();
  //     return value == null ? "-" : `per ${Number(value)} hour`;
  //   },
  // },
  // {
  //   accessorKey: "rate",
  //   header: "Overtime Rate",
  //   cell: ({ getValue }) => {
  //     const value = getValue();
  //     return value == null
  //       ? "-"
  //       : `IDR ${Number(value ?? 0).toLocaleString("id-ID")}`;
  //   },
  // },
  // {
  //   accessorKey: "formula",
  //   header: "Formula",
  //   cell: ({ getValue }) => {
  //     const value = getValue();
  //     return (
  //       <div style={{ whiteSpace: "pre-line" }}>
  //         {value ? String(value) : "-"}
  //       </div>
  //     );
  //   },
  // },
{
  accessorKey: "formulas",
  header: "Formula",
  cell: ({ getValue }) => {
    const formulas = getValue(); // harus berupa array
    return (
      <div style={{ whiteSpace: "pre-line" }}>
        {Array.isArray(formulas) && formulas.length > 0
          ? formulas.join("\n")
          : "-"}
      </div>
    );
  },
},


  {
    accessorKey: "action",
    header: "Action",
    cell: ({ row }) => {
      const status = row.getValue(
        "type"
      ) as OvertimeSettingsRecord["type"];

      if (status === "Flat") {
      return (
        <div className="flex px-6 justify-center gap-1">
          <AlertDialog>
            <AlertDialogTrigger className="hover:bg-danger-50 rounded-md p-1 h-auto w-auto">
              <svg
                width="19"
                height="18"
                viewBox="0 0 19 18"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <g clipPath="url(#clip0_459_2131)">
                  <path
                    d="M15.875 3H13.55C13.3759 2.15356 12.9154 1.39301 12.2459 0.846539C11.5765 0.300068 10.7392 0.00109089 9.875 0L8.375 0C7.51085 0.00109089 6.67349 0.300068 6.00406 0.846539C5.33464 1.39301 4.87407 2.15356 4.7 3H2.375C2.17609 3 1.98532 3.07902 1.84467 3.21967C1.70402 3.36032 1.625 3.55109 1.625 3.75C1.625 3.94891 1.70402 4.13968 1.84467 4.28033C1.98532 4.42098 2.17609 4.5 2.375 4.5H3.125V14.25C3.12619 15.2442 3.52166 16.1973 4.22466 16.9003C4.92767 17.6033 5.8808 17.9988 6.875 18H11.375C12.3692 17.9988 13.3223 17.6033 14.0253 16.9003C14.7283 16.1973 15.1238 15.2442 15.125 14.25V4.5H15.875C16.0739 4.5 16.2647 4.42098 16.4053 4.28033C16.546 4.13968 16.625 3.94891 16.625 3.75C16.625 3.55109 16.546 3.36032 16.4053 3.21967C16.2647 3.07902 16.0739 3 15.875 3V3ZM8.375 1.5H9.875C10.3402 1.50057 10.7938 1.64503 11.1737 1.91358C11.5536 2.18213 11.8411 2.56162 11.9968 3H6.25325C6.40894 2.56162 6.69643 2.18213 7.07629 1.91358C7.45615 1.64503 7.90979 1.50057 8.375 1.5V1.5ZM13.625 14.25C13.625 14.8467 13.3879 15.419 12.966 15.841C12.544 16.2629 11.9717 16.5 11.375 16.5H6.875C6.27826 16.5 5.70597 16.2629 5.28401 15.841C4.86205 15.419 4.625 14.8467 4.625 14.25V4.5H13.625V14.25Z"
                    fill="#BA3C54"
                  />
                  <path
                    d="M7.625 13.4995C7.82391 13.4995 8.01468 13.4205 8.15533 13.2798C8.29598 13.1392 8.375 12.9484 8.375 12.7495V8.24953C8.375 8.05061 8.29598 7.85985 8.15533 7.7192C8.01468 7.57854 7.82391 7.49953 7.625 7.49953C7.42609 7.49953 7.23532 7.57854 7.09467 7.7192C6.95402 7.85985 6.875 8.05061 6.875 8.24953V12.7495C6.875 12.9484 6.95402 13.1392 7.09467 13.2798C7.23532 13.4205 7.42609 13.4995 7.625 13.4995Z"
                    fill="#BA3C54"
                  />
                  <path
                    d="M10.625 13.4995C10.8239 13.4995 11.0147 13.4205 11.1553 13.2798C11.296 13.1392 11.375 12.9484 11.375 12.7495V8.24953C11.375 8.05061 11.296 7.85985 11.1553 7.7192C11.0147 7.57854 10.8239 7.49953 10.625 7.49953C10.4261 7.49953 10.2353 7.57854 10.0947 7.7192C9.95402 7.85985 9.875 8.05061 9.875 8.24953V12.7495C9.875 12.9484 9.95402 13.1392 10.0947 13.2798C10.2353 13.4205 10.4261 13.4995 10.625 13.4995Z"
                    fill="#BA3C54"
                  />
                </g>
                <defs>
                  <clipPath id="clip0_459_2131">
                    <rect
                      width="18"
                      height="18"
                      fill="white"
                      transform="translate(0.125)"
                    />
                  </clipPath>
                </defs>
              </svg>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                <AlertDialogDescription>
                  This action cannot be undone. This will permanently delete
                  your data and remove your data from our servers.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel className="w-auto">Cancel</AlertDialogCancel>
                <AlertDialogAction className="w-auto bg-danger-700 text-white border border-danger-700 hover:bg-danger-800 hover:text-white">
                  Delete
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
      ) } else {
        return(
          <span>-</span>
        );
      }
    },
    filterFn: (row, columnId, filterValue) => {
      return filterValue.includes(row.getValue(columnId));
    },
  },
];
