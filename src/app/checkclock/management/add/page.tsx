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
import Cookies from "js-cookie";

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
import { Spinner } from "@/components/ui/spinner";
import { useEdit } from "@/context/EditFormContext";
import { Toaster, toast } from "sonner";

type Employee = {
  dataEmployeeId: string;
  idEmployee: string;
  name: string;
  ccDate: string;
  position: string;
  worktype: string | null;
  clockIn: string | null;
  clockOut: string | null;
};

const attendanceType = [
  { label: "Clock In", value: "clockIn", input: "Present", subInput: "in" },
  { label: "Clock Out", value: "clockOut", input: "Present", subInput: "out" },
  {
    label: "Annual Leave",
    value: "annualLeave",
    input: "Annual Leave",
    subInput: "",
  },
  {
    label: "Sick Leave",
    value: "sickLeave",
    input: "Sick Leave",
    subInput: "",
  },
];

const workType = [
  { label: "WFO", value: "WFO" },
  { label: "WFA", value: "WFA" },
];

export default function AddCheckclockPage() {
  const router = useRouter();
  const [OpenAttendanceType, setOpenAttendanceType] = React.useState(false);
  const [valueEmployee, setValueEmployee] = React.useState("");
  const [valueAttendanceType, setValueAttendanceType] = React.useState("");
  const [handleAttendanceType, setHandleAttendanceType] = React.useState("");
  const [valueClockType, setValueClockType] = React.useState("");
  const inputRef = React.useRef<HTMLButtonElement>(null);
  const [employees, setEmployees] = React.useState<Employee[]>([]);
  const [loading, setLoading] = React.useState(false);
  const { errors, setErrors, success, setSuccess } = useEdit();

  const toCamelCase = (employee: any): Employee => ({
    dataEmployeeId: employee.data_id,
    idEmployee: employee.id_employee,
    name: employee.name,
    ccDate: employee.check_clock_date,
    position: employee.position,
    worktype: employee.worktype,
    clockIn: employee.clock_in,
    clockOut: employee.clock_out,
  });

  React.useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const userCookie = Cookies.get("token");
        if (userCookie) {
          const response = await fetch(
            `${process.env.NEXT_PUBLIC_API_URL}/cc-employee-data`,
            {
              method: "GET",
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${userCookie}`,
              },
            }
          );

          if (!response.ok) {
            // If the response is not OK, parse the error response
            const errorData = await response.json();
            return { success: false, errors: errorData.errors };
          }

          // Parse and return the success response
          const responseData = await response.json();
          const camelCaseData = responseData.map(toCamelCase);
          setEmployees(camelCaseData);
        } else {
          return {
            success: false,
            errors: { general: ["User token not found"] },
          };
        }
      } catch (error: any) {
        // Handle network or other unexpected errors
        return {
          success: false,
          errors: {
            general: [error.message || "An unexpected error occurred"],
          },
        };
      }
    };

    fetchEmployees();
  }, []);

  const selectedEmployee = employees.find(
    (employee) => employee.dataEmployeeId === valueEmployee
  );

  console.log(selectedEmployee);
  console.log(employees);
  console.log(valueEmployee);

  const [selectedWorkType, setSelectedWorkType] = React.useState("");
  React.useEffect(() => {
    if (selectedEmployee?.worktype) {
      setSelectedWorkType(selectedEmployee.worktype);
    } else {
      setSelectedWorkType(""); // Optional: reset if employee has no worktype
    }
  }, [selectedEmployee]);

  const validateAttendanceType =
    handleAttendanceType === "Annual Leave" ||
    handleAttendanceType === "Sick Leave";
  const filteredAttendanceType = attendanceType.filter((type) => {
    // Hilangkan opsi "Clock In" jika employee memiliki data clockIn
    if (selectedEmployee?.clockIn) {
      return type.value === "clockOut";
    }
    if (type.value === "clockOut" && !selectedEmployee?.clockIn) {
      return false;
    }
    return true;
  });

  const [date, setDate] = React.useState<DateRange | undefined>(undefined);
  const annual =
    handleAttendanceType === "Annual Leave" ||
    handleAttendanceType === "Sick Leave";

  const employeeOptions = employees.map((employee) => ({
    label: `${employee.idEmployee} - ${employee.name}`,
    value: employee.dataEmployeeId,
  }));

  const handleEmployeeChange = (label: string) => {
    const selected = employeeOptions.find((option) => option.label === label);
    if (selected) {
      setValueEmployee(selected.value);
    }
  };

  console.log(handleAttendanceType);
  console.log(valueAttendanceType);
  console.log("start", date?.from);
  console.log(
    "Formatted start_date:",
    date?.from ? format(date.from, "yyyy-MM-dd") : ""
  );
  console.log("end", date?.to);

  const fileInputRef = React.useRef<HTMLInputElement>(null);
  const handleFileDrop = (files: File[]) => {
    if (files.length > 0 && fileInputRef.current) {
      const dataTransfer = new DataTransfer();
      dataTransfer.items.add(files[0]);
      fileInputRef.current.files = dataTransfer.files;
    }
  };

  const handleSubmit = async () => {
    setLoading(true);

    try {
      const form = document.getElementById("checkClockForm") as HTMLFormElement;
      const formData = new FormData(form);

      console.log("Submitting data:", Object.fromEntries(formData.entries()));

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/check-clocks`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${Cookies.get("token")}`,
          },
          body: formData,
        }
      );

      const responseData = await response.json();
      console.log("Response:", responseData);

      if (!response.ok) {
        setErrors(responseData.errors);
        console.log("state err", errors);
      } else {
        setSuccess({
          message: responseData.message || "Successfully submitted",
        });
        console.log("state succ", success);
      }
    } catch (err: any) {
      console.log("Submit error:", err);
      setErrors(err);
    } finally {
      setLoading(false);
    }
  };

  React.useEffect(() => {
    if (errors && Object.keys(errors).length > 0) {
      Object.entries(errors).forEach(([field, messages]) => {
        if (Array.isArray(messages)) {
          messages.forEach((message) => toast.error(`${message}`));
        } else {
          toast.error(`${messages}`);
        }
      });
      setErrors({});
    }
  }, [errors]);

  React.useEffect(() => {
    if (success && Object.keys(success).length > 0) {
      toast.success(`${success.message}`);
      // setSuccess({});

      // Delay redirect to allow user to see the toast
      const timeout = setTimeout(() => {
        router.push("/checkclock/management"); // replace with your desired route
      }, 1000); // 2 seconds delay

      // Clean up timeout on unmount
      return () => clearTimeout(timeout);
    }
  }, [success]);

  return (
    <Sidebar title="Checkclock">
      <Toaster
        position="bottom-right"
        expand={true}
        richColors
        closeButton
      ></Toaster>
      <Card>
        <CardContent className="flex flex-col gap-[15px]">
          <div className="px-[10px]">
            <h1 className="text-lg font-medium ">Add Checkclock</h1>
          </div>
          <form
            id="checkClockForm"
            onSubmit={(e) => {
              e.preventDefault(); // mencegah reload halaman
              handleSubmit();
            }}
          >
            <input
              type="hidden"
              name="start_date"
              value={date?.from ? format(date.from, "yyyy-MM-dd") : ""}
            />
            <input
              type="hidden"
              name="end_date"
              value={date?.to ? format(date.to, "yyyy-MM-dd") : ""}
            />
            <input
              type="hidden"
              name="ck_setting_name"
              value={selectedWorkType}
            />
            <Card className="w-full p-5 gap-[30px]">
              <div className="w-full flex flex-col gap-4">
                {/* employee name */}
                <div className="flex flex-col gap-2">
                  <Label>Employee Name</Label>
                  <SelectPopover
                    options={employeeOptions}
                    value={
                      employeeOptions.find(
                        (option) => option.value === valueEmployee
                      )?.label || ""
                    }
                    onChange={handleEmployeeChange}
                    placeholder="Select employee"
                  />
                  <Input
                    name="employee_id"
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
                              !handleAttendanceType
                                ? "text-neutral-300"
                                : "text-neutral-900"
                            )}
                            ref={inputRef}
                          >
                            {handleAttendanceType
                              ? attendanceType.find(
                                  (attendanceType) =>
                                    attendanceType.label ===
                                    handleAttendanceType
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
                                        onSelect={() => {
                                          setHandleAttendanceType(
                                            attendanceType.label
                                          );
                                          setValueAttendanceType(
                                            attendanceType.input
                                          );
                                          setValueClockType(
                                            attendanceType.subInput
                                          );
                                          setOpenAttendanceType(false);
                                        }}
                                      >
                                        <Check
                                          className={cn(
                                            "mr-2 h-4 w-4",
                                            handleAttendanceType ===
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
                      name="status"
                      type="hidden"
                      value={valueAttendanceType}
                    />
                    <Input
                      name="check_clock_type"
                      type="hidden"
                      value={valueClockType}
                    />
                  </div>
                </div>
                {/* Date */}
                <div className="flex flex-col gap-2">
                  <Label>Date</Label>
                  {validateAttendanceType ? (
                    <Popover>
                      <input
                        name="check_clock_date"
                        type="hidden"
                        defaultValue={`${new Date().getFullYear()}-${String(
                          new Date().getMonth() + 1
                        ).padStart(2, "0")}-${String(
                          new Date().getDate()
                        ).padStart(2, "0")}`}
                      ></input>
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
                      name="check_clock_date"
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
                  <Select
                    value={selectedWorkType}
                    onValueChange={(value) => setSelectedWorkType(value)}
                    disabled={!!selectedEmployee?.clockOut || !!selectedEmployee?.clockIn} 
                  >
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
                        name="check_clock_time"
                        defaultValue={selectedEmployee?.clockIn || ""} // Gunakan nilai clockIn jika ada
                        readOnly={!!selectedEmployee?.clockIn} // Read-only jika clockIn ada
                      />
                    </div>
                    {/* Clock Out */}
                    {selectedEmployee?.clockIn && ( // Hanya tampilkan Clock Out jika tidak ada clockIn
                      <div className="flex-col gap-2 flex">
                        <TimeInput
                          label="Clock Out"
                          name="check_clock_time"
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
                      onDrop={handleFileDrop}
                      accept={{
                        "image/png": [],
                        "image/jpeg": [],
                        "image/jpg": [],
                      }}
                      type="Only support .png, .jpg, .jpeg"
                    />
                    <input
                      type="file"
                      name="evidence"
                      // accept=".csv"
                      ref={fileInputRef}
                      hidden
                    />
                  </div>
                )}
                {/* Time */}
              </div>
              <div className="flex w-full gap-[15px] justify-end">
                <div className="w-[93px]">
                  <Button
                    type="button"
                    variant={"outline"}
                    onClick={() => router.back()}
                  >
                    Cancel
                  </Button>
                </div>
                <div className="w-[93px]">
                  <Button type="submit" disabled={loading}>
                    {loading ? <Spinner size={"small"}></Spinner> : "Save"}
                  </Button>
                </div>
              </div>
            </Card>
          </form>
        </CardContent>
      </Card>
    </Sidebar>
  );
}
