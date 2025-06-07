"use client";
import Sidebar from "@/components/sidebar";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@radix-ui/react-label";
import * as React from "react";
import { Check, ChevronsUpDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { Input } from "@/components/ui/input";
import { Calendar } from "@/components/ui/calendar"; // Pastikan Anda memiliki komponen Calendar
import { format } from "date-fns";
import { useRouter } from "next/navigation";

import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { TimeInput } from "@/components/ui/timeInput";
import { DateRange } from "react-day-picker";
import { FileUploader } from "@/components/ui/fileUploader";
import { SelectPopover } from "@/components/ui/selectPopover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Route } from "react-router-dom";

const employeesSample = [
  {
    id_employee: "EMP0001",
    Name: "Mumtaz",
    position: "Manager",
    workType: "",
    clockIn: "",
    clockOut: "",
  },
  {
    id_employee: "EMP0002",
    Name: "Kemal",
    position: "Manager",
    workType: "",
    clockIn: "",
    clockOut: "",
  },
  {
    id_employee: "EMP0003",
    Name: "Lucky",
    position: "Manager",
    workType: "",
    clockIn: "08:00",
    clockOut: "",
  },
  {
    id_employee: "EMP0004",
    Name: "Silfi",
    position: "Manager",
    workType: "",
    clockIn: "08:00",
    clockOut: "",
  },
];

const attendanceType = [
  { label: "Clock In", value: "clockIn" },
  { label: "Clock Out", value: "clockOut" },
  { label: "Annual Leave", value: "annualLeave" },
  { label: "Sick Leave", value: "sickLeave" },
];

const workType = [
  { label: "WFO", value: "wfo" },
  { label: "WFA", value: "wfa" },
];

export default function AddCheckclockPage() {
  const router = useRouter();
  const [OpenAttendanceType, setOpenAttendanceType] = React.useState(false);
  const [valueEmployee, setValueEmployee] = React.useState("");
  const [valueAttendanceType, setValueAttendanceType] = React.useState("");
  const inputRef = React.useRef<HTMLButtonElement>(null);
  const selectedEmployee = employeesSample.find(
    (employee) => employee.Name === valueEmployee
  );
  const validateAttendanceType =
    valueAttendanceType === "Annual Leave" ||
    valueAttendanceType === "Sick Leave";
  const filteredAttendanceType = attendanceType.filter((type) => {
    // Hilangkan opsi "Clock In" jika employee memiliki data clockIn
    if (type.value === "clockIn" && selectedEmployee?.clockIn) {
      return false;
    }
    if (type.value === "clockOut" && !selectedEmployee?.clockIn) {
      return false;
    }
    return true;
  });

  const [date, setDate] = React.useState<DateRange | undefined>(undefined);
  const annual =
    valueAttendanceType === "Annual Leave" ||
    valueAttendanceType === "Sick Leave";
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
  };

  return (
    <Sidebar title="Checkclock">
      <Card>
        <CardContent className="flex flex-col gap-[15px]">
          <div className="px-[10px]">
            <h1 className="text-lg font-medium ">Add Checkclock</h1>
          </div>
          <form action="" onSubmit={handleSubmit}>
            <Card className="w-full p-5 gap-[30px]">
              <div className="w-full flex flex-col gap-4">
                {/* employee name */}
                <div className="flex flex-col gap-2">
                  <Label>Employee Name</Label>
                  <SelectPopover
                    options={employeesSample.map((employee) => ({
                      label: employee.Name,
                      value: employee.Name,
                    }))}
                    value={valueEmployee}
                    onChange={(value: string) => setValueEmployee(value)}
                    placeholder="Select employee"
                  />
                  <Input
                    name="employeeName"
                    type="hidden"
                    value={valueEmployee}
                  />
                </div>
                {/* Attendance Type */}
                <div className="flex flex-col gap-2">
                  <Label>Attendance Type</Label>
                  <div className="relative w-full ">
                    <Popover
                      open={OpenAttendanceType}
                      onOpenChange={setOpenAttendanceType}
                    >
                      <div className="relative">
                        <PopoverTrigger asChild>
                          <Button
                            variant="outline"
                            role="combobox"
                            aria-expanded={OpenAttendanceType}
                            className={cn(
                              "justify-between border-neutral-300 w-full hover:bg-primary-900 h-[45px]",
                              !valueAttendanceType
                                ? "text-neutral-300"
                                : "text-neutral-900"
                            )}
                            ref={inputRef}
                          >
                            {valueAttendanceType
                              ? attendanceType.find(
                                  (attendanceType) =>
                                    attendanceType.label === valueAttendanceType
                                )?.label
                              : "Select attendance type"}
                            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                          </Button>
                        </PopoverTrigger>
                        <div className="w-full relative z-50 mt-2 p-0">
                          <PopoverContent
                            className="absolute left-0 top-full mt-2 z-50 text-neutral-600"
                            style={{
                              width: inputRef.current
                                ? `${inputRef.current.offsetWidth}px`
                                : "200px",
                            }}
                            align="start"
                          >
                            <Command className="w-full">
                              <CommandInput placeholder="Select attendance type" />
                              <CommandList className="w-full">
                                <CommandEmpty>
                                  Attendance type not found.
                                </CommandEmpty>
                                <CommandGroup>
                                  {filteredAttendanceType.map(
                                    (attendanceType) => (
                                      <CommandItem
                                        key={attendanceType.label}
                                        value={attendanceType.label}
                                        onSelect={(currentValue) => {
                                          setValueAttendanceType(
                                            currentValue === valueAttendanceType
                                              ? ""
                                              : currentValue
                                          );
                                          console.log(currentValue);
                                          setOpenAttendanceType(false);
                                        }}
                                      >
                                        <Check
                                          className={cn(
                                            "mr-2 h-4 w-4",
                                            valueAttendanceType ===
                                              attendanceType.label
                                              ? "opacity-100"
                                              : "opacity-0"
                                          )}
                                        />
                                        {attendanceType.label}
                                      </CommandItem>
                                    )
                                  )}
                                </CommandGroup>
                              </CommandList>
                            </Command>
                          </PopoverContent>
                        </div>
                      </div>
                    </Popover>
                    <Input
                      name="attendanceType"
                      type="hidden"
                      value={valueAttendanceType}
                    />
                  </div>
                </div>
                {/* Date */}
                <div className="flex flex-col gap-2">
                  <Label>Date</Label>
                  {validateAttendanceType ? (
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          id="date"
                          variant={"calendar"}
                          icon={
                            <svg
                              width="25"
                              height="25"
                              viewBox="0 0 25 25"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                d="M16.6663 2.08333V6.25"
                                stroke="#B0B0B0"
                                strokeWidth="1.5"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              />
                              <path
                                d="M8.33333 2.08333V6.25"
                                stroke="#B0B0B0"
                                strokeWidth="1.5"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              />
                              <path
                                d="M3.125 9.375H21.875"
                                stroke="#B0B0B0"
                                strokeWidth="1.5"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              />
                              <path
                                fillRule="evenodd"
                                clipRule="evenodd"
                                d="M19.7917 4.16667H5.20833C4.05729 4.16667 3.125 5.09896 3.125 6.25001V19.7917C3.125 20.9427 4.05729 21.875 5.20833 21.875H19.7917C20.9427 21.875 21.875 20.9427 21.875 19.7917V6.25001C21.875 5.09896 20.9427 4.16667 19.7917 4.16667Z"
                                stroke="#B0B0B0"
                                strokeWidth="1.5"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              />
                              <path
                                d="M7.30495 13.2594C7.1612 13.2594 7.04453 13.376 7.04558 13.5198C7.04558 13.6635 7.16224 13.7802 7.30599 13.7802C7.44974 13.7802 7.56641 13.6635 7.56641 13.5198C7.56641 13.376 7.44974 13.2594 7.30495 13.2594"
                                stroke="#B0B0B0"
                                strokeWidth="1.5"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              />
                              <path
                                d="M12.5139 13.2594C12.3702 13.2594 12.2535 13.376 12.2546 13.5198C12.2546 13.6635 12.3712 13.7802 12.515 13.7802C12.6587 13.7802 12.7754 13.6635 12.7754 13.5198C12.7754 13.376 12.6587 13.2594 12.5139 13.2594"
                                stroke="currentColor"
                                strokeWidth="1.5"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              />
                              <path
                                d="M17.7219 13.2594C17.5782 13.2594 17.4615 13.376 17.4626 13.5198C17.4626 13.6635 17.5792 13.7802 17.723 13.7802C17.8667 13.7802 17.9834 13.6635 17.9834 13.5198C17.9834 13.376 17.8667 13.2594 17.7219 13.2594"
                                stroke="currentColor"
                                strokeWidth="1.5"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              />
                              <path
                                d="M7.30495 17.426C7.1612 17.426 7.04453 17.5427 7.04558 17.6865C7.04558 17.8302 7.16224 17.9469 7.30599 17.9469C7.44974 17.9469 7.56641 17.8302 7.56641 17.6865C7.56641 17.5427 7.44974 17.426 7.30495 17.426"
                                stroke="currentColor"
                                strokeWidth="1.5"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              />
                              <path
                                d="M12.5139 17.426C12.3702 17.426 12.2535 17.5427 12.2546 17.6865C12.2546 17.8302 12.3712 17.9469 12.515 17.9469C12.6587 17.9469 12.7754 17.8302 12.7754 17.6865C12.7754 17.5427 12.6587 17.426 12.5139 17.426"
                                stroke="currentColor"
                                strokeWidth="1.5"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              />
                            </svg>
                          }
                          className={cn(
                            "w-auto justify-start text-left font-normal",
                            !date?.from && "text-muted-foreground"
                          )}
                        >
                          {date?.from && date?.to ? (
                            <>
                              {format(date.from, "dd/MM/yyyy")} -{" "}
                              {format(date.to, "dd/MM/yyyy")}
                            </>
                          ) : (
                            <span className="text-neutral-300">
                              Pick a date range
                            </span>
                          )}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                          initialFocus
                          mode="range"
                          defaultMonth={date?.from}
                          selected={date}
                          onSelect={setDate}
                          numberOfMonths={1}
                        />
                      </PopoverContent>
                    </Popover>
                  ) : (
                    <Input
                      readOnly
                      name="date"
                      type="date"
                      defaultValue={`${new Date().getFullYear()}-${String(
                        new Date().getMonth() + 1
                      ).padStart(2, "0")}-${String(
                        new Date().getDate()
                      ).padStart(2, "0")}`}
                    ></Input>
                  )}
                </div>
                {/* WorkType */}
                <div className="flex flex-col gap-2">
                  <Label>Work Type</Label>
                  <Select>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select work type" />
                    </SelectTrigger>
                    <SelectContent>
                      {workType.map((type) => (
                        <SelectItem key={type.value} value={type.value}>
                          {type.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {!annual ? (
                  <div
                    className={cn(
                      "grid gap-[10px]",
                      !selectedEmployee?.clockIn ? "grid-cols-1" : "grid-cols-2" // Ubah grid menjadi 1 kolom jika tidak ada clockIn
                    )}
                  >
                    {/* Clock In */}
                    <div className="flex-col gap-2 flex">
                      <TimeInput
                        label="Clock In"
                        name="clockIn"
                        defaultValue={selectedEmployee?.clockIn || ""} // Gunakan nilai clockIn jika ada
                        readOnly={!!selectedEmployee?.clockIn} // Read-only jika clockIn ada
                      />
                    </div>
                    {/* Clock Out */}
                    {selectedEmployee?.clockIn && ( // Hanya tampilkan Clock Out jika tidak ada clockIn
                      <div className="flex-col gap-2 flex">
                        <TimeInput
                          label="Clock Out"
                          name="clockOut"
                          defaultValue={selectedEmployee?.clockOut || ""} // Kosong jika tidak ada clockOut
                          disabled={!selectedEmployee?.clockIn} // Disabled jika tidak ada clockIn
                        />
                      </div>
                    )}
                  </div>
                ) : (
                  <div className="flex flex-col gap-2">
                    <Label>Upload Supporting Evidence</Label>
                    <FileUploader
                      onDrop={(files) => console.log("Image Files:", files)}
                      accept={{
                        "image/png": [],
                        "image/jpeg": [],
                        "image/jpg": [],
                      }}
                      type="Only support .png, .jpg, .jpeg"
                    />
                  </div>
                )}
                {/* Time */}
              </div>
            </Card>
          </form>
          <div className="flex w-full gap-[15px] justify-end">
            <div className="w-[93px]">
              <Button variant={"outline"} onClick={() => router.back()}>
                Cancel
              </Button>
            </div>
            <div className="w-[93px]">
              <Button type="submit">Save</Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </Sidebar>
  );
}
