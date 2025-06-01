"use client";

import { useState } from "react";
import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown } from "lucide-react";
import { differenceInMinutes } from "date-fns";

import { Button } from "@/components/ui/button";
import { ApprovalStatusBadge } from "@/components/ui/approval";
import { Input } from "@/components/ui/input";
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
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { AvatarImage } from "@radix-ui/react-avatar";
import Information from "@/components/ui/attendance-information";
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
import DownloadButton from "@/components/ui/downloadButton";

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type CheckclockOverview = {
  id: number;
  data_id?: string;
  employeeName: string;
  position: string;
  date?: string | { startDate: string; endDate: string };
  clockIn?: string;
  clockOut?: string;
  workType?: string;
  status: string;
  approvalStatus?: string;
  location: string;
  address: string;
  latitude: number;
  longitude: number;
  startDate?: string;
  endDate?: string;
};
 
const calculateWorkHours = (
  clockIn: string | undefined,
  clockOut: string | undefined
): string => {
  if (
    !clockIn ||
    !clockOut ||
    typeof clockIn !== "string" ||
    typeof clockOut !== "string"
  ) {
    console.warn("Invalid or missing clockIn or clockOut value:", {
      clockIn,
      clockOut,
    });
    return "N/A"; // Return a fallback value for invalid inputs
  }

  // Prepend a default date if the input is a time-only string
  const defaultDate = "1970-01-01";
  const clockInDate = new Date(
    clockIn.includes(":") ? `${defaultDate}T${clockIn}` : clockIn
  );
  const clockOutDate = new Date(
    clockOut.includes(":") ? `${defaultDate}T${clockOut}` : clockOut
  );

  // Check if the dates are valid
  if (isNaN(clockInDate.getTime()) || isNaN(clockOutDate.getTime())) {
    console.error("Invalid date format detected:", { clockIn, clockOut });
    return "N/A"; // Return a fallback value for invalid dates
  }

  const totalMinutes = differenceInMinutes(clockOutDate, clockInDate);
  const hours = Math.floor(totalMinutes / 60);
  const minutes = totalMinutes % 60;
  const seconds = (totalMinutes % 1) * 60;

  return `${hours}h ${minutes}m ${seconds.toFixed(0)}s`;
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
    },
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
    cell: ({ row }) => {
      const date = row.getValue("date") as
        | string
        | { startDate: string; endDate: string };
      return (
        <div className="text-center">
          {typeof date === "string" ? date : `${date.startDate}`}
        </div>
      );
    },
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
    },
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
    },
  },
  {
    accessorKey: "approvalStatus",
    header: ({ column }) => {
      return <div className="text-center">Approval Status</div>;
    },
    cell: ({ row }) => {
      const approvalStatus = row.getValue("approvalStatus") as
        | string
        | undefined;

      if (!approvalStatus) {
        return null; // Do not render the badge if approvalStatus is undefined
      }

      return (
        <ApprovalStatusBadge
          status={approvalStatus as "Approved" | "Pending" | "Rejected"}
        />
      );
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
      // const employeeId = row.getValue("id") as string;
      const [selectedRow, setSelectedRow] = useState<CheckclockOverview | null>(
        null
      );

      const handleRowSelection = () => {
        const rowData = row.original as CheckclockOverview;
        console.log("Row Data:", rowData);
        setSelectedRow(rowData);
      };

      return (
        <div className="w-full flex items-center justify-center">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="outline" size="sm" onClick={handleRowSelection}>
                View
              </Button>
            </SheetTrigger>
            {selectedRow?.workType === "WFO" ? (
              <>
                <SheetContent className="bg-white">
                  <SheetHeader className="py-3 z-50">
                    <SheetTitle className="text-neutral-500 text-2xl">
                      Attendance Details
                    </SheetTitle>
                  </SheetHeader>
                  <div className="grid gap-4 px-4">
                    <div className="flex px-2 py-4 border-2 border-neutral-300 gap-2 items-center justify-between rounded-sm">
                      <div className="flex gap-2">
                        <Avatar className="w-12 h-12 z-0">
                          <AvatarImage src="https://github.com/shadcn.png" />
                          <AvatarFallback>CN</AvatarFallback>
                        </Avatar>
                        <div className="flex flex-col gap-1">
                          <div
                            className="text-left truncate font-semibold"
                            title={selectedRow?.employeeName || ""} // Tooltip untuk menampilkan nama lengkap
                          >
                            {(selectedRow?.employeeName ?? "").length > 20
                              ? `${selectedRow?.employeeName.slice(0, 20)}...`
                              : selectedRow?.employeeName}
                          </div>
                          <span className="text-xs font-semibold text-neutral-500">
                            {selectedRow?.position || ""}
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
                              selectedRow?.approvalStatus as
                                | "Pending"
                                | "Rejected"
                                | "Approved"
                            }
                          />
                        </div>
                      )}
                    </div>
                    {selectedRow?.status === "Sick Leave" ||
                    selectedRow?.status === "Annual Leave" ? (
                      <>
                        <div className="flex flex-col px-2 py-4 border-2 border-neutral-300 gap-3 rounded-sm">
                          <span className="font-semibold">
                            Attendance Information
                          </span>
                          <div className="grid grid-cols-3 gap-3 w-auto">
                            <Information
                              label="Status"
                              value={selectedRow.status}
                            ></Information>
                            <Information
                              label="Start Date"
                              value={
                                
                                selectedRow?.startDate
                                  ? (console.log(
                                      "Start Date:",
                                      selectedRow.startDate
                                    ),
                                    selectedRow.startDate)
                                  : "N/A"
                              }
                            ></Information>
                            <Information
                              label="End Date"
                              value={
                                
                                selectedRow?.endDate
                                  ? (console.log(selectedRow.endDate),
                                    selectedRow.endDate)
                                  : "N/A"
                              }
                            ></Information>
                          </div>
                        </div>
                        <div className="flex flex-col px-2 py-4 border-2 border-neutral-300 gap-3 rounded-sm">
                          <span className="font-semibold">Proof of Leave</span>
                          <div className="p-3 border border-neutral-200 rounded-sm flex gap-2 justify-between">
                            <span className="text-base flex items-center w-full h-full">
                              (nama file)
                            </span>
                            <div className="flex gap-4">
                              <AlertDialog>
                                <AlertDialogTrigger asChild>
                                  <Button
                                    variant="ghost"
                                    className="w-auto"
                                    size={"icon"}
                                    onClick={() => {
                                      // Handle view action here
                                      console.log("View file");
                                    }}
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
                                      Proof of Leave
                                    </AlertDialogTitle>
                                    <AlertDialogDescription className="max-h-96 overflow-auto">
                                      <img
                                        src="/images/proof-of-leave.jpg"
                                        alt="Proof of Leave"
                                      />
                                    </AlertDialogDescription>
                                  </AlertDialogHeader>
                                  <AlertDialogFooter>
                                    <AlertDialogCancel>Close</AlertDialogCancel>
                                  </AlertDialogFooter>
                                </AlertDialogContent>
                              </AlertDialog>

                              <DownloadButton
                              // fileUrl={`/images/bukti-absen-${selectedRow?.employeeName}.jpg`}

                                fileUrl="/images/proof-of-levave.jpg"
                                fileName={`proof of leave ${selectedRow?.employeeName}.jpg`}
                              />
                            </div>
                          </div>
                        </div>
                      </>
                    ) : (
                      <>
                        <div className="flex flex-col px-2 py-4 border-2 border-neutral-300 gap-3 rounded-sm">
                          <span className="font-semibold">
                            Attendance Information
                          </span>
                          <div className="flex flex-col gap-6">
                            <div className="grid grid-cols-3 gap-3 w-auto">
                              <Information
                                label="Date"
                                value={
                                  typeof selectedRow?.date === "string"
                                    ? selectedRow?.date
                                    : `${selectedRow?.startDate} - ${selectedRow?.endDate}`
                                }
                              ></Information>
                              <Information
                                label="Clock In"
                                value={selectedRow?.clockIn || ""}
                              ></Information>
                              <div className="">
                                <Information
                                  label="Clock Out"
                                  value={selectedRow?.clockOut || ""}
                                ></Information>
                              </div>
                            </div>
                            <div className="grid grid-cols-3 gap-3 w-auto">
                              <Information
                                label="status"
                                value={
                                  selectedRow?.status === "Absent"
                                    ? "Absent"
                                    : selectedRow?.clockIn ||
                                      selectedRow?.clockOut
                                    ? "Present"
                                    : "N/A"
                                }
                              ></Information>
                              <Information
                                label="Work Type"
                                value={selectedRow.workType}
                              ></Information>
                              {selectedRow?.status !== "Absent" && (
                                <Information
                                  label="Work Hours"
                                  value={calculateWorkHours(
                                    selectedRow?.clockIn || "",
                                    selectedRow?.clockOut || ""
                                  )}
                                ></Information>
                              )}
                            </div>
                          </div>
                        </div>

                        <div className="flex flex-col px-2 py-4 border-2 border-neutral-300 gap-3 rounded-sm">
                          <span className="font-semibold">
                            Location Information
                          </span>
                          <div className="flex flex-col gap-6">
                            <div className="grid grid-cols-2">
                              <Information
                                label="Location"
                                value={selectedRow.location}
                              ></Information>
                              <Information
                                label="Address"
                                value={selectedRow.address}
                              ></Information>
                            </div>
                            <div className="grid grid-cols-2">
                              <Information
                                label="Latitude"
                                value={selectedRow.latitude}
                              ></Information>
                              <Information
                                label="Longitude"
                                value={selectedRow.longitude}
                              ></Information>
                            </div>
                          </div>
                        </div>
                      </>
                    )}
                  </div>

                  {selectedRow?.status == "On Time" ||
                  selectedRow?.status == "Late" ? (
                    <SheetFooter>
                      <div className="flex gap-2 flex-wrap">
                        <AlertDialog>
                          <AlertDialogTrigger asChild>
                            <Button variant="destructive">
                              Reject Attendance
                            </Button>
                          </AlertDialogTrigger>

                          <AlertDialogContent>
                            <form
                              onSubmit={(e) => {
                                e.preventDefault();
                                const formData = new FormData(e.currentTarget);
                                const name = formData.get("name");
                                console.log("Submitted name:", name);
                                // Lanjutkan aksi setelah submit...
                              }}
                            >
                              <AlertDialogHeader>
                                <AlertDialogTitle>
                                  Are you sure you want to reject this
                                  attendance?
                                </AlertDialogTitle>
                                <AlertDialogDescription>
                                  Please enter the reason for rejection.
                                </AlertDialogDescription>
                              </AlertDialogHeader>

                              <div className="py-4 flex flex-col gap-3">
                                <Input
                                  name="reason"
                                  placeholder="Enter the reason"
                                  type="text"
                                ></Input>
                              </div>

                              <AlertDialogFooter>
                                <AlertDialogCancel
                                  type="button"
                                  className="w-auto"
                                >
                                  Cancel
                                </AlertDialogCancel>
                                <Button type="submit" className="w-auto">
                                  Submit
                                </Button>
                              </AlertDialogFooter>
                            </form>
                          </AlertDialogContent>
                        </AlertDialog>

                        <SheetClose asChild>
                          <Button type="button" variant={"outline"}>
                            Close
                          </Button>
                        </SheetClose>
                      </div>
                    </SheetFooter>
                  ) : (
                    <SheetFooter>
                      <div className="flex gap-2 flex-wrap">
                        {selectedRow?.approvalStatus === "Pending" ? (
                          <>
                            <Button>Approve</Button>
                            <AlertDialog>
                              <AlertDialogTrigger asChild>
                                <Button variant="outline">
                                  Reject Attendance
                                </Button>
                              </AlertDialogTrigger>

                              <AlertDialogContent>
                                <form
                                  onSubmit={(e) => {
                                    e.preventDefault();
                                    const formData = new FormData(
                                      e.currentTarget
                                    );
                                    const name = formData.get("name");
                                    console.log("Submitted name:", name);
                                    // Lanjutkan aksi setelah submit...
                                  }}
                                >
                                  <AlertDialogHeader>
                                    <AlertDialogTitle>
                                      Are you sure you want to reject this
                                      attendance?
                                    </AlertDialogTitle>
                                    <AlertDialogDescription>
                                      Please enter the reason for rejection.
                                    </AlertDialogDescription>
                                  </AlertDialogHeader>

                                  <div className="py-4 flex flex-col gap-3">
                                    <Input
                                      name="reason"
                                      placeholder="Enter the reason"
                                      type="text"
                                    ></Input>
                                  </div>

                                  <AlertDialogFooter>
                                    <AlertDialogCancel
                                      type="button"
                                      className="w-auto"
                                    >
                                      Cancel
                                    </AlertDialogCancel>
                                    <Button type="submit" className="w-auto">
                                      Submit
                                    </Button>
                                  </AlertDialogFooter>
                                </form>
                              </AlertDialogContent>
                            </AlertDialog>
                          </>
                        ) : (
                          <SheetClose asChild>
                            <Button type="button" variant={"outline"}>
                              Close
                            </Button>
                          </SheetClose>
                        )}
                      </div>
                    </SheetFooter>
                  )}
                </SheetContent>
              </>
            ) : (
              <>
                <SheetContent className="bg-white">
                  <SheetHeader className="py-3 z-50">
                    <SheetTitle className="text-neutral-500 text-2xl">
                      Attendance Details
                    </SheetTitle>
                  </SheetHeader>
                  <div className="grid gap-4 px-4">
                    <div className="flex px-2 py-4 border-2 border-neutral-300 gap-2 items-center justify-between rounded-sm">
                      <div className="flex gap-2">
                        <Avatar className="w-12 h-12 z-0">
                          <AvatarImage src="https://github.com/shadcn.png" />
                          <AvatarFallback>CN</AvatarFallback>
                        </Avatar>
                        <div className="flex flex-col gap-1">
                          <div
                            className="text-left truncate font-semibold"
                            title={selectedRow?.employeeName || ""} // Tooltip untuk menampilkan nama lengkap
                          >
                            {(selectedRow?.employeeName ?? "").length > 20
                              ? `${selectedRow?.employeeName.slice(0, 20)}...`
                              : selectedRow?.employeeName}
                          </div>
                          <span className="text-xs font-semibold text-neutral-500">
                            {selectedRow?.position || ""}
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
                              selectedRow?.approvalStatus as
                                | "Pending"
                                | "Rejected"
                                | "Approved"
                            }
                          />
                        </div>
                      )}
                    </div>
                    {selectedRow?.status === "Sick Leave" ||
                    selectedRow?.status === "Annual Leave" ? (
                      <>
                        <div className="flex flex-col px-2 py-4 border-2 border-neutral-300 gap-3 rounded-sm">
                          <span className="font-semibold">
                            Attendance Information
                          </span>
                          <div className="grid grid-cols-3 gap-3 w-auto">
                            <Information
                              label="Status"
                              value={selectedRow.status}
                            ></Information>

                            <Information
                              label="Start Date"
                              value={
                                
                                selectedRow?.startDate
                                  ? (console.log(
                                      "Start Date:",
                                      selectedRow.startDate
                                    ),
                                    selectedRow.startDate)
                                  : "N/A"
                              }
                            ></Information>
                            <Information
                              label="End Date"
                              value={
                                
                                selectedRow?.endDate
                                  ? (console.log(selectedRow.endDate),
                                    selectedRow.endDate)
                                  : "N/A"
                              }
                            ></Information>
                          </div>
                        </div>
                        <div className="flex flex-col px-2 py-4 border-2 border-neutral-300 gap-3 rounded-sm">
                          <span className="font-semibold">Proof of Leave</span>
                          <div className="p-3 border border-neutral-200 rounded-sm flex gap-2 justify-between">
                            <span className="text-base flex items-center w-full h-full">
                              (nama file)
                            </span>
                            <div className="flex gap-4">
                              <AlertDialog>
                                <AlertDialogTrigger asChild>
                                  <Button
                                    variant="ghost"
                                    className="w-auto"
                                    size={"icon"}
                                    onClick={() => {
                                      // Handle view action here
                                      console.log("View file");
                                    }}
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
                                      Proof of Leave
                                    </AlertDialogTitle>
                                    <AlertDialogDescription className="max-h-96 overflow-auto">
                                      <img
                                        src="/images/proof-of-leave.jpg"
                                        alt="Proof of Leave"
                                      />
                                    </AlertDialogDescription>
                                  </AlertDialogHeader>
                                  <AlertDialogFooter>
                                    <AlertDialogCancel>Close</AlertDialogCancel>
                                  </AlertDialogFooter>
                                </AlertDialogContent>
                              </AlertDialog>

                             <DownloadButton
                              // fileUrl={`/images/bukti-absen-${selectedRow?.employeeName}.jpg`}

                                fileUrl="/images/proof-of-leave.jpg"
                                fileName={`proof of leave ${selectedRow?.employeeName}.jpg`}
                              />
                            </div>
                          </div>
                        </div>
                      </>
                    ) : (
                      <>
                        <div className="flex flex-col px-2 py-4 border-2 border-neutral-300 gap-3 rounded-sm">
                          <span className="font-semibold">
                            Attendance Information
                          </span>
                          <div className="flex flex-col gap-6">
                            <div className="grid grid-cols-3 gap-3 w-auto">
                              <Information
                                label="Date"
                                value={
                                  typeof selectedRow?.date === "string"
                                    ? selectedRow?.date
                                    : `${selectedRow?.startDate} - ${selectedRow?.endDate}`
                                }
                              ></Information>
                              <Information
                                label="Clock In"
                                value={selectedRow?.clockIn || ""}
                              ></Information>
                              <Information
                                label="status"
                                value={
                                  selectedRow?.status === "Absent"
                                    ? "Absent"
                                    : selectedRow?.clockIn ||
                                      selectedRow?.clockOut
                                    ? "Present"
                                    : "N/A"
                                }
                              ></Information>
                            </div>
                          </div>
                        </div>
                        <div className="flex flex-col px-2 py-4 border-2 border-neutral-300 gap-3 rounded-sm ">
                          <span className="font-semibold">
                            Location Information
                          </span>
                          <div className="flex flex-col gap-6">
                            <div className="grid grid-cols-2 gap-3 w-auto">
                              <Information
                                label="Latitude"
                                value={selectedRow?.latitude}
                              ></Information>
                              <Information
                                label="Longitude"
                                value={selectedRow?.longitude}
                              ></Information>
                            </div>
                          </div>
                        </div>
                        {selectedRow?.status !== "Absent" && (

                        <div className="flex flex-col px-2 py-4 border-2 border-neutral-300 gap-3 rounded-sm">
                          <span className="font-semibold">
                            Proof of Attendance
                          </span>
                          <div className="p-3 border border-neutral-200 rounded-sm flex gap-2 justify-between">
                            <span className="text-base flex items-center w-full h-full">
                              (nama file)
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
                                        src="/images/proof-of-attendance.jpg"
                                        alt="Proof of attendance"
                                      />
                                    </AlertDialogDescription>
                                  </AlertDialogHeader>
                                  <AlertDialogFooter>
                                    <AlertDialogCancel>Close</AlertDialogCancel>
                                  </AlertDialogFooter>
                                </AlertDialogContent>
                              </AlertDialog>

                              <DownloadButton
                              // fileUrl={`/images/bukti-absen-${selectedRow?.employeeName}.jpg`}

                                fileUrl="/images/proof-of-attendance.jpg"
                                fileName={`proof of attendance ${selectedRow?.employeeName}.jpg`}
                              />
                            </div>
                          </div>
                        </div>
                        )}
                      </>
                    )}
                  </div>

                  {selectedRow?.status == "On Time" ||
                  selectedRow?.status == "Late" ? (
                    <SheetFooter>
                      <div className="flex gap-2 flex-wrap">
                        <AlertDialog>
                          <AlertDialogTrigger asChild>
                            <Button variant="destructive">
                              Reject Attendance
                            </Button>
                          </AlertDialogTrigger>

                          <AlertDialogContent>
                            <form
                              onSubmit={(e) => {
                                e.preventDefault();
                                const formData = new FormData(e.currentTarget);
                                const name = formData.get("name");
                                console.log("Submitted name:", name);
                                // Lanjutkan aksi setelah submit...
                              }}
                            >
                              <AlertDialogHeader>
                                <AlertDialogTitle>
                                  Are you sure you want to reject this
                                  attendance?
                                </AlertDialogTitle>
                                <AlertDialogDescription>
                                  Please enter the reason for rejection.
                                </AlertDialogDescription>
                              </AlertDialogHeader>

                              <div className="py-4 flex flex-col gap-3">
                                <Input
                                  name="reason"
                                  placeholder="Enter the reason"
                                  type="text"
                                ></Input>
                              </div>

                              <AlertDialogFooter>
                                <AlertDialogCancel
                                  type="button"
                                  className="w-auto"
                                >
                                  Cancel
                                </AlertDialogCancel>
                                <Button type="submit" className="w-auto">
                                  Submit
                                </Button>
                              </AlertDialogFooter>
                            </form>
                          </AlertDialogContent>
                        </AlertDialog>

                        <SheetClose asChild>
                          <Button type="button" variant={"outline"}>
                            Close
                          </Button>
                        </SheetClose>
                      </div>
                    </SheetFooter>
                  ) : (
                    <SheetFooter>
                      <div className="flex gap-2 flex-wrap">
                        {selectedRow?.approvalStatus === "Pending" ? (
                          <>
                            <Button>Approve</Button>
                            <AlertDialog>
                              <AlertDialogTrigger asChild>
                                <Button variant="outline">
                                  Reject Attendance
                                </Button>
                              </AlertDialogTrigger>

                              <AlertDialogContent>
                                <form
                                  onSubmit={(e) => {
                                    e.preventDefault();
                                    const formData = new FormData(
                                      e.currentTarget
                                    );
                                    const name = formData.get("name");
                                    console.log("Submitted name:", name);
                                    // Lanjutkan aksi setelah submit...
                                  }}
                                >
                                  <AlertDialogHeader>
                                    <AlertDialogTitle>
                                      Are you sure you want to reject this
                                      attendance?
                                    </AlertDialogTitle>
                                    <AlertDialogDescription>
                                      Please enter the reason for rejection.
                                    </AlertDialogDescription>
                                  </AlertDialogHeader>

                                  <div className="py-4 flex flex-col gap-3">
                                    <Input
                                      name="reason"
                                      placeholder="Enter the reason"
                                      type="text"
                                    ></Input>
                                  </div>

                                  <AlertDialogFooter>
                                    <AlertDialogCancel
                                      type="button"
                                      className="w-auto"
                                    >
                                      Cancel
                                    </AlertDialogCancel>
                                    <Button type="submit" className="w-auto">
                                      Submit
                                    </Button>
                                  </AlertDialogFooter>
                                </form>
                              </AlertDialogContent>
                            </AlertDialog>
                          </>
                        ) : (
                          <SheetClose asChild>
                            <Button type="button" variant={"outline"}>
                              Close
                            </Button>
                          </SheetClose>
                        )}
                      </div>
                    </SheetFooter>
                  )}
                </SheetContent>
              </>
            )}
          </Sheet>
        </div>
      );
    },
  },
];
