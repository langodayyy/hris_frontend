"use client";

import { OvertimeActions } from "@/components/custom/overtimeAction";
import { Button } from "@/components/ui/button";
import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown } from "lucide-react";
import { ApprovalStatusBadge } from "@/components/ui/approval";
import { useState } from "react";
import {
  Sheet,
  SheetTrigger,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
  SheetFooter,
  SheetClose,
} from "@/components/ui/sheet";
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
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { AvatarImage } from "@radix-ui/react-avatar";
import Information from "@/components/ui/overtime-information";

type OvertimeRecord = {
  employeePhoto: string;
  position: string;
  id: string;
  employee_id: string;
  name: string;
  overtime_name: string;
  // type: "Government Regulation" | "Flat";
  type: string;
  date: string;
  start_hour: number;
  end_hour: number;
  payroll: number;
  // status: "Approved" | "Pending" | "Rejected";
  status: string;
  overtimeEvidenceUrl?: string;
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
  // {
  //   accessorKey: "action",
  //   header: "Action",
    
  //   cell: ({ row }) => {
  //   const status = row.getValue("status") as OvertimeRecord["status"];
  //   if (status === "Pending") {
  //     return <OvertimeActions overtimeId={row.original.id} />;
  //   }
  //   return <span>-</span>;
  //   },
  //   filterFn: (row, columnId, filterValue) => {
  //     return filterValue.includes(row.getValue(columnId));
  //   },
  // },
  {
      accessorKey: "Details",
      id: "Details",
      header: ({ column }) => {
        return <div className="text-center">Details</div>;
      },
      cell: ({ row }) => {
        // const employeeId = row.getValue("id") as string;
        const [selectedRow, setSelectedRow] = useState<OvertimeRecord | null>(
          null
        );
  
        const [loading, isLoading] = useState(false);
  
        const handleRowSelection = () => {
          const rowData = row.original as OvertimeRecord;
          console.log("Row Data:", rowData);
          setSelectedRow(rowData);
        };
  
        // console.log('photo', selectedRow?.employeePhoto)
  
        return (
          <div className="w-full flex items-center justify-center">
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="outline" size="sm" onClick={handleRowSelection}>
                  View
                </Button>
              </SheetTrigger>
       
                <>
                  <SheetContent className="bg-white">
                    <SheetHeader className="py-3 z-50">
                      <SheetTitle className="text-neutral-500 text-2xl">
                        Overtime Details
                      </SheetTitle>
                    </SheetHeader>
                    <div className="grid gap-4 px-4">
                      <div className="flex px-2 py-4 border-2 border-neutral-300 gap-2 items-center justify-between rounded-sm">
                        <div className="flex gap-2">
                          <Avatar className="w-12 h-12 z-0">
                            <AvatarImage src={ !selectedRow?.employeePhoto !== null ? selectedRow?.employeePhoto : "https://github.com/shadcn.png"} />
                            <AvatarFallback>EMP</AvatarFallback>
                          </Avatar>
                          <div className="flex flex-col gap-1">
                            <div
                              className="text-left truncate font-semibold"
                              title={selectedRow?.name || ""} // Tooltip untuk menampilkan nama lengkap
                            >
                              {(selectedRow?.name ?? "").length > 20
                                ? `${selectedRow?.name.slice(0, 20)}...`
                                : selectedRow?.name}
                            </div>
                            <span className="text-xs font-semibold text-neutral-500">
                              {selectedRow?.employee_id || ""}
                            </span>
                          </div>
                        </div>
                        {selectedRow?.status == "On Time" ||
                        selectedRow?.status == "Late" ? (
                          <div className="w-fit flex justify-end items-center">
                            <ApprovalStatusBadge
                              status={selectedRow?.status as "On Time" | "Late"}
                            />
                          </div>
                        ) : selectedRow?.status === "Absent" ? null : (
                          <div className="w-fit flex justify-end items-center">
                            <ApprovalStatusBadge
                              status={
                                selectedRow?.status as
                                  | "Pending"
                                  | "Rejected"
                                  | "Approved"
                              }
                            />
                          </div>
                        )}
                      </div>
                      <>
                        <div className="flex flex-col px-2 py-4 border-2 border-neutral-300 gap-3 rounded-sm">
                          <span className="font-semibold">
                            Overtime Information
                          </span>
                          <div className="flex flex-col gap-6">
                            <div className="grid grid-cols-3 gap-3 w-auto">
                              <Information
                                label="Date"
                                value={selectedRow?.date}
                              ></Information>
                              <Information
                                label="Start Hour"
                                value={selectedRow?.start_hour || ""}
                              ></Information>
                              <Information
                                label="End Hour"
                                value={selectedRow?.end_hour || ""}
                              ></Information>
                              
                            </div>
                            <div className="grid grid-cols-3 gap-3 w-auto">
                              <Information
                                label="Overtime Type"
                                value={selectedRow?.type}
                              ></Information>
                              <Information
                                label="Payroll"
                                value={
                                  selectedRow?.payroll != null
                                    ? `IDR ${(selectedRow.payroll || 0).toLocaleString("id-ID")}`
                                    : "-"
                                }
                              />

                              <Information
                                label="Status"
                                value={
                                  selectedRow?.status
                                }
                              ></Information>
                            </div>
                          </div>
                        </div>
                        {selectedRow?.overtimeEvidenceUrl && (
                          <div className="flex flex-col px-2 py-4 border-2 border-neutral-300 gap-3 rounded-sm">
                          <span className="font-semibold">
                            Proof of Overtime
                          </span>
                          <div className="p-3 border border-neutral-200 rounded-sm flex gap-2 justify-between">
                            <span
                              className="text-base flex items-center w-[200px] h-full truncate"
                            >
                              {"Evidence File"}
                            </span>
                            <div className="flex gap-4">
                              <AlertDialog>
                                <AlertDialogTrigger asChild>
                                  <Button
                                    variant="ghost"
                                    className="w-auto"
                                    size={"icon"}
                                  >
                                    <svg
                                      xmlns="http://www.w3.org/2000/svg"
                                      viewBox="0 0 24 24"
                                      fill="none"
                                      stroke="currentColor"
                                      strokeLinecap="round"
                                      strokeLinejoin="round"
                                      width="24"
                                      height="24"
                                      strokeWidth="2"
                                    >
                                      <path d="M10 12a2 2 0 1 0 4 0a2 2 0 0 0 -4 0"></path>
                                      <path d="M21 12c-2.4 4 -5.4 6 -9 6c-3.6 0 -6.6 -2 -9 -6c2.4 -4 5.4 -6 9 -6c3.6 0 6.6 2 9 6"></path>
                                    </svg>
                                  </Button>
                                </AlertDialogTrigger>
                                <AlertDialogContent>
                                  <AlertDialogHeader>
                                    <AlertDialogTitle>
                                      Proof of Attendance
                                    </AlertDialogTitle>
                                    <AlertDialogDescription className="max-h-96 overflow-auto">
                                      <img
                                        src={
                                          selectedRow?.overtimeEvidenceUrl
                                        }
                                        alt="Proof of attendance"
                                      />
                                    </AlertDialogDescription>
                                  </AlertDialogHeader>
                                  <AlertDialogFooter>
                                    <AlertDialogCancel>
                                      Close
                                    </AlertDialogCancel>
                                  </AlertDialogFooter>
                                </AlertDialogContent>
                              </AlertDialog>
                            </div>
                          </div>
                        </div>

                        )}
                        
                        {
                          selectedRow?.status === "Pending" ? (
                            <OvertimeActions overtimeId={selectedRow.id} />
                          ) : (
                            <></>
                          )
                        }
                        <SheetClose asChild>
                          <Button variant="outline">
                            Close
                          </Button>
                        </SheetClose>


                      </>
                      
                    </div>
                      
                    </SheetContent>
                </>
              
              
            </Sheet>
          </div>
        );
      },
    },
  
];
