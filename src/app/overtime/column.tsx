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
import Router from "next/router";

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
    cell: ({ row }) => <div className="lowercase">{row.getValue("name")}</div>,
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
  {
    id: "action", // tidak pakai accessorKey karena ini custom cell
    header: "Action",
    cell: ({ row }) => {
      const record = row.original;
      return (
        <div className="flex px-6 justify-center">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => Router.push("/overtime/edit/" + record.id)}
            icon={
              <svg
                width="17"
                height="16"
                viewBox="0 0 17 16"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <g clipPath="url(#clip0_459_2142)">
                  <path
                    d="M12.562 0.62016L4.43402 8.74816C4.12358 9.05692 3.87747 9.4242 3.70994 9.82872C3.54241 10.2332 3.45678 10.667 3.45802 11.1048V12.0002C3.45802 12.177 3.52826 12.3465 3.65328 12.4716C3.77831 12.5966 3.94788 12.6668 4.12469 12.6668H5.02002C5.45786 12.6681 5.8916 12.5824 6.29613 12.4149C6.70065 12.2474 7.06792 12.0013 7.37669 11.6908L15.5047 3.56283C15.8943 3.17227 16.1131 2.64314 16.1131 2.09149C16.1131 1.53984 15.8943 1.01071 15.5047 0.62016C15.1085 0.241423 14.5815 0.0300598 14.0334 0.0300598C13.4852 0.0300598 12.9582 0.241423 12.562 0.62016V0.62016ZM14.562 2.62016L6.43402 10.7482C6.0581 11.1218 5.55003 11.3321 5.02002 11.3335H4.79135V11.1048C4.79274 10.5748 5.00307 10.0667 5.37669 9.69083L13.5047 1.56283C13.6471 1.4268 13.8364 1.35089 14.0334 1.35089C14.2303 1.35089 14.4196 1.4268 14.562 1.56283C14.702 1.70317 14.7806 1.89329 14.7806 2.09149C14.7806 2.2897 14.702 2.47982 14.562 2.62016V2.62016Z"
                    fill="#374957"
                  />
                  <path
                    d="M15.4583 5.986C15.2815 5.986 15.112 6.05624 14.9869 6.18126C14.8619 6.30629 14.7917 6.47586 14.7917 6.65267V10H12.125C11.5946 10 11.0859 10.2107 10.7108 10.5858C10.3357 10.9609 10.125 11.4696 10.125 12V14.6667H3.45833C2.9279 14.6667 2.41919 14.456 2.04412 14.0809C1.66905 13.7058 1.45833 13.1971 1.45833 12.6667V3.33333C1.45833 2.8029 1.66905 2.29419 2.04412 1.91912C2.41919 1.54405 2.9279 1.33333 3.45833 1.33333H9.48633C9.66315 1.33333 9.83271 1.2631 9.95774 1.13807C10.0828 1.01305 10.153 0.843478 10.153 0.666667C10.153 0.489856 10.0828 0.320286 9.95774 0.195262C9.83271 0.0702379 9.66315 0 9.48633 0L3.45833 0C2.5746 0.00105857 1.72737 0.352588 1.10248 0.97748C0.477588 1.60237 0.126059 2.4496 0.125 3.33333L0.125 12.6667C0.126059 13.5504 0.477588 14.3976 1.10248 15.0225C1.72737 15.6474 2.5746 15.9989 3.45833 16H11.0203C11.4583 16.0013 11.8921 15.9156 12.2968 15.7481C12.7014 15.5806 13.0688 15.3345 13.3777 15.024L15.1483 13.252C15.4588 12.9432 15.705 12.576 15.8727 12.1715C16.0403 11.767 16.1261 11.3332 16.125 10.8953V6.65267C16.125 6.47586 16.0548 6.30629 15.9297 6.18126C15.8047 6.05624 15.6351 5.986 15.4583 5.986ZM12.435 14.0813C12.167 14.3487 11.8281 14.5337 11.4583 14.6147V12C11.4583 11.8232 11.5286 11.6536 11.6536 11.5286C11.7786 11.4036 11.9482 11.3333 12.125 11.3333H14.7417C14.6592 11.7023 14.4743 12.0406 14.2083 12.3093L12.435 14.0813Z"
                    fill="#374957"
                  />
                </g>
                <defs>
                  <clipPath id="clip0_459_2142">
                    <rect
                      width="16"
                      height="16"
                      fill="white"
                      transform="translate(0.125)"
                    />
                  </clipPath>
                </defs>
              </svg>
            }
          ></Button>
          <AlertDialog>
            <AlertDialogTrigger>
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
                  your account and remove your data from our servers.
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
      );
    },
  },
];
