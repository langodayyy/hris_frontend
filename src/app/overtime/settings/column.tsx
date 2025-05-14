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
  id_ovt_setting: string;
  name: string;
  type: string;
  calculation: number;
  rate: number;
};

export const OvertimeSettingsColumn = (
  onEdit: (id: string) => void
): ColumnDef<OvertimeSettingsRecord>[] => [
  {
    accessorKey: "no",
    header: "No",
    enableSorting: true,
    cell: ({ row }) => {
      return <div className="text-center">{row.index + 1}</div>;
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
        >
          Overtime Name
          <ArrowUpDown />
        </Button>
      );
    },
    cell: ({ row }) => <div className="lowercase">{row.getValue("name")}</div>,
  },
  {
    accessorKey: "type",
    header: "Type",
  },
  {
    accessorKey: "calculation",
    header: "Calculation",
    cell: ({ getValue }) => {
      const value = getValue();
      return `per ${Number(value ?? 0)} hour`;
    },
  },
  {
    accessorKey: "rate",
    header: "Overtime Rate",
    cell: ({ getValue }) => {
      const value = getValue();
      return `IDR ${Number(value ?? 0).toLocaleString("id-ID")}`;
    },
  },
  {
    accessorKey: "action",
    header: "Action",
    cell: ({ row }) => {
      return (
        <div className="flex px-6 justify-center gap-1">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => onEdit(row.original.id_ovt_setting)}
            className="p-1 h-auto w-auto"
            icon={
              <svg
                width="17"
                height="16"
                viewBox="0 0 17 16"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <g clipPath="url(#clip0_459_4153)">
                  <path
                    d="M13.2368 0.62016L5.10883 8.74816C4.79839 9.05692 4.55228 9.4242 4.38475 9.82872C4.21722 10.2332 4.13159 10.667 4.13283 11.1048V12.0002C4.13283 12.177 4.20306 12.3465 4.32809 12.4716C4.45311 12.5966 4.62268 12.6668 4.79949 12.6668H5.69483C6.13267 12.6681 6.56641 12.5824 6.97093 12.4149C7.37545 12.2474 7.74273 12.0013 8.05149 11.6908L16.1795 3.56283C16.5691 3.17227 16.7879 2.64314 16.7879 2.09149C16.7879 1.53984 16.5691 1.01071 16.1795 0.62016C15.7833 0.241423 15.2563 0.0300598 14.7082 0.0300598C14.16 0.0300598 13.633 0.241423 13.2368 0.62016V0.62016ZM15.2368 2.62016L7.10883 10.7482C6.73291 11.1218 6.22483 11.3321 5.69483 11.3335H5.46616V11.1048C5.46755 10.5748 5.67787 10.0667 6.05149 9.69083L14.1795 1.56283C14.3219 1.4268 14.5112 1.35089 14.7082 1.35089C14.9051 1.35089 15.0944 1.4268 15.2368 1.56283C15.3768 1.70317 15.4554 1.89329 15.4554 2.09149C15.4554 2.2897 15.3768 2.47982 15.2368 2.62016V2.62016Z"
                    fill="#374957"
                  />
                  <path
                    d="M16.1322 5.986C15.9554 5.986 15.7858 6.05624 15.6608 6.18126C15.5357 6.30629 15.4655 6.47586 15.4655 6.65267V10H12.7988C12.2684 10 11.7597 10.2107 11.3846 10.5858C11.0095 10.9609 10.7988 11.4696 10.7988 12V14.6667H4.13216C3.60173 14.6667 3.09302 14.456 2.71795 14.0809C2.34288 13.7058 2.13216 13.1971 2.13216 12.6667V3.33333C2.13216 2.8029 2.34288 2.29419 2.71795 1.91912C3.09302 1.54405 3.60173 1.33333 4.13216 1.33333H10.1602C10.337 1.33333 10.5065 1.2631 10.6316 1.13807C10.7566 1.01305 10.8268 0.843478 10.8268 0.666667C10.8268 0.489856 10.7566 0.320286 10.6316 0.195262C10.5065 0.0702379 10.337 0 10.1602 0L4.13216 0C3.24843 0.00105857 2.4012 0.352588 1.77631 0.97748C1.15142 1.60237 0.799887 2.4496 0.798828 3.33333L0.798828 12.6667C0.799887 13.5504 1.15142 14.3976 1.77631 15.0225C2.4012 15.6474 3.24843 15.9989 4.13216 16H11.6942C12.1321 16.0013 12.5659 15.9156 12.9706 15.7481C13.3752 15.5806 13.7426 15.3345 14.0515 15.024L15.8222 13.252C16.1327 12.9432 16.3789 12.576 16.5465 12.1715C16.7141 11.767 16.7999 11.3332 16.7988 10.8953V6.65267C16.7988 6.47586 16.7286 6.30629 16.6036 6.18126C16.4785 6.05624 16.309 5.986 16.1322 5.986ZM13.1088 14.0813C12.8408 14.3487 12.5019 14.5337 12.1322 14.6147V12C12.1322 11.8232 12.2024 11.6536 12.3274 11.5286C12.4524 11.4036 12.622 11.3333 12.7988 11.3333H15.4155C15.333 11.7023 15.1482 12.0406 14.8822 12.3093L13.1088 14.0813Z"
                    fill="#374957"
                  />
                </g>
                <defs>
                  <clipPath id="clip0_459_4153">
                    <rect
                      width="17"
                      height="20"
                      fill="white"
                      transform="translate(0.798828)"
                    />
                  </clipPath>
                </defs>
              </svg>
            }
          ></Button>
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
      );
    },
    filterFn: (row, columnId, filterValue) => {
      return filterValue.includes(row.getValue(columnId));
    },
  },
];
