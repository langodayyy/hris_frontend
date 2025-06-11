"use client";
import Sidebar from "@/components/sidebar";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Check, ChevronsUpDown } from "lucide-react";
import React, { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import { Calendar } from "@/components/ui/calendar";
import { format, setHours } from "date-fns";
import { CalendarIcon } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import {
  employeesSample,
  governmentFormula,
  overtimeSettingSample,
} from "@/components/dummy/overtimeData";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import Cookies from "js-cookie";
import { Spinner } from "@/components/ui/spinner";
import { Skeleton } from "@/components/ui/skeleton";
import { Toaster } from "@/components/ui/sonner";

export default function AddOvertimeEmployees() {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined);
  const [isEmployeeDropdownOpen, setIsEmployeeDropdownOpen] = useState(false);
  // const [selectedEmployeeId, setSelectedEmployeeId] = useState("");
  const [selectedOvertimeName, setSelectedOvertimeName] = useState("");
  const [inputTotalHour, setInputTotalHour] = useState(0);


  const [selectedEmployeeId, setSelectedEmployeeId] = useState<string | null>(null);
  const [employee, setEmployee] = useState<{ employee_id: string; full_name: string }[] | null>(null);

  const [isloading, setIsLoading] = useState(false);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    const fetchFormData = async () => {
      setIsLoading(true);
      try {
        const token = Cookies.get('token');
        const resEmp = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/employee-overtime-form-data`, {
          headers: {
            "Authorization": `Bearer ${token}`,
            "Content-Type": "application/json"
          }
        })
        const rawData = await resEmp.json();
      
        if (!resEmp.ok) {
          throw rawData;
        }
        // setOvertimeSettingData(data);
        console.log(rawData)
        setEmployee(rawData);
      } catch (err) {
        let message = "Unknown error occurred";
        let messagesToShow: string[] = [];

        if (
          err &&
          typeof err === "object" &&
          "message" in err &&
          typeof (err as any).message === "string"
        ) {
          const backendError = err as { message: string; errors?: Record<string, string[]> };

          if (backendError.message.toLowerCase().includes("failed to fetch")) {
            message = "Unknown error occurred";
          } else {
            message = backendError.message;
          }

          messagesToShow = backendError.errors
            ? Object.values(backendError.errors).flat()
            : [message];
        } else {
          messagesToShow = [message];
        }

        toast.error(
          <>
            <p className="text-red-700 font-bold">Error</p>
            {messagesToShow.map((msg, idx) => (
              <div key={idx} className="text-red-700">• {msg}</div>
            ))}
          </>,
          { duration: 30000 }
        );
      } finally {
        setIsLoading(false);
      }
    }
   fetchFormData()
  }, [])


  const handleSubmit = async () => {
    const payload = {
      employee_id: selectedEmployeeId,
      date: selectedDate,
      total_hour: inputTotalHour,
    };

    console.log("Data yang dikirim:", payload);
    setLoading(true);
    // setError(false);
    // setSuccess(false);
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/overtime`, {
          method: "POST",
          headers: {
            "Authorization": `Bearer ${Cookies.get("token")}`,
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            employee_id: selectedEmployeeId,
            date: selectedDate,
            total_hour: inputTotalHour,

      })
    });


    const responseData = await response.json();
    if (!response.ok) {
        throw responseData; 
    }
    toast.success('Overtime created successfully')
    // setSuccess(true);
    router.push("/overtime/management")
    } catch (err) {
    // setError(true);
    let message = "Unknown error occurred";
    let messagesToShow: string[] = [];

    if (
    err &&
    typeof err === "object" &&
    "message" in err &&
    typeof (err as any).message === "string"
    ) {
    const backendError = err as { message: string; errors?: Record<string, string[]> };

    if (backendError.message.toLowerCase().includes("failed to fetch")) {
        message = "Unknown error occurred";
    } else {
        message = backendError.message;
    }

    messagesToShow = backendError.errors
        ? Object.values(backendError.errors).flat()
        : [message];
    } else {
    messagesToShow = [message]
    }

    toast.error(
        <>
            <p className="text-red-700 font-bold">Error</p>
            {messagesToShow.map((msg, idx) => (
            <div key={idx} className="text-red-700">• {msg}</div>
            ))}
        </>,
        { duration: 30000 }
    );
    } finally {
    setLoading(false);
    }
  };

  const router = useRouter();
  return (
    <Sidebar title="Overtime Management">
      <Toaster position="bottom-right" expand={true} richColors closeButton></Toaster>
      {isloading ? (
          <Skeleton className="min-h-svh"></Skeleton>
        ):(
      <Card className="flex flex-col gap-[15px] px-[20px] py-[26px]">
        <div className="px-[10px]">
          <p className="font-medium text-lg text-neutral-900">
            Add Overtime Employee
          </p>
        </div>

        <Card className="p-[20px] gap-[30px] flex flex-col">
          {/* Employee Selection */}
          <div className="flex flex-row gap-[30px]">
            {/* selected employee */}
            <div className="flex flex-col w-full gap-2">
              <Label>Employee Name</Label>
              <Popover
                open={isEmployeeDropdownOpen}
                onOpenChange={setIsEmployeeDropdownOpen}
              >
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    role="combobox"
                    aria-expanded={isEmployeeDropdownOpen}
                    className={cn(
                      "justify-between border-neutral-300 w-full hover:bg-primary-900 h-[45px]",
                      !selectedEmployeeId
                        ? "text-neutral-300"
                        : "text-neutral-900"
                    )}
                  >
                    {selectedEmployeeId
                      ? employee?.find(
                          (emp) => emp.employee_id === selectedEmployeeId
                        )?.full_name
                      : "Choose employee or search"}
                    <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                  </Button>
                </PopoverTrigger>
                <PopoverContent align="start" className="p-0 w-[400px]">
                  <Command className="w-full">
                    <CommandInput placeholder="Search employee..." />
                    <CommandList>
                      <CommandEmpty>No employee found.</CommandEmpty>
                      <CommandGroup>
                        {employee?.map((emp) => (
                          <CommandItem
                            key={emp.employee_id}
                            value={emp.full_name}
                            onSelect={() => {
                              setSelectedEmployeeId(emp.employee_id);
                              setIsEmployeeDropdownOpen(false);
                            }}
                          >
                            <Check
                              className={cn(
                                "mr-2 h-4 w-4",
                                selectedEmployeeId === emp.employee_id
                                  ? "opacity-100"
                                  : "opacity-0"
                              )}
                            />
                            {emp.full_name}
                          </CommandItem>
                        ))}
                      </CommandGroup>
                    </CommandList>
                  </Command>
                </PopoverContent>
              </Popover>
            </div>
          </div>

          <div className="flex flex-row gap-[30px]">
            {/* Overtime Date */}
            <div className="flex flex-col w-full gap-2">
              <Label>Overtime Date</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant={"outline"}
                    className={cn(
                      "w-full justify-start text-left font-normal text-neutral-900 border-neutral-300",
                      !selectedDate && "text-muted-foreground"
                    )}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {selectedDate ? (
                      format(selectedDate, "dd/MM/yyyy")
                    ) : (
                      <span className="text-neutral-300">Pick a date</span>
                    )}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={selectedDate}
                    onSelect={setSelectedDate}
                    initialFocus
                    classNames={{
                      day_selected:
                        "text-primary-foreground hover:bg-primary hover:text-primary-foreground focus:bg-secondary-600 focus:text-primary-foreground  ",
                    }}
                  />
                </PopoverContent>
              </Popover>
            </div>

            {/* Total Hour */}
            <div className="flex flex-col w-full gap-2">
              <Label>Total Hour</Label>
              <div className="flex flex-row gap-2 items-center">
                <Input
                  type="number"
                  placeholder="Enter overtime duration"
                  // value={inputTotalHour}
                  // onChange={}
                  onChange={(e) => setInputTotalHour(Number(e.target.value))}
                  required
                  max="24"
                  min="1"
                />
              </div>
            </div>
          </div>
        </Card>

        {/* Action Buttons */}
        <div className="flex flex-row gap-[15px] justify-end items-center">
          <Button
            variant="outline"
            className="w-[98px]"
            onClick={() => router.push("/overtime/management")}
            disabled={loading}
          >
            {!loading ? (
              <>
              <span>Cancel</span>
              </>
            ) : (
              <Spinner size="small" />
          )}
          </Button>
          <Button type="submit" variant="default" className="w-[98px]" onClick={handleSubmit} disabled={loading}>
           {!loading ? (
                <>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M19 21H5C4.46957 21 3.96086 20.7893 3.58579 20.4142C3.21071 20.0391 3 19.5304 3 19V5C3 4.46957 3.21071 3.96086 3.58579 3.58579C3.96086 3.21071 4.46957 3 5 3H16L21 8V19C21 19.5304 20.7893 20.0391 20.4142 20.4142C20.0391 20.7893 19.5304 21 19 21Z" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M17 21V13H7V21" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M7 3V8H15" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                <span className="ml-1">Save</span>
                </>
            ) : (
                <Spinner size="small" />
            )}
          </Button>
        </div>
      </Card>
        )}
    </Sidebar>
  );
}
