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
import React, { useState } from "react";
import { cn } from "@/lib/utils";
import { Calendar } from "@/components/ui/calendar";
import { format } from "date-fns";
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
  overtimeSettingSample,
} from "@/components/dummy/overtimeData";
import { useRouter } from "next/navigation";

export default function AddOvertimeEmployees() {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined);
  const [isEmployeeDropdownOpen, setIsEmployeeDropdownOpen] = useState(false);
  const [selectedEmployeeId, setSelectedEmployeeId] = useState("");
  const [selectedOvertimeName, setSelectedOvertimeName] = useState("");
  const [inputTotalHour, setInputTotalHour] = useState("");

// belum ditambahin batas yang government
  const handleHourChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputVal = e.target.value;

    if (inputVal === "") {
      setInputTotalHour("");
      return;
    }

    const val = parseInt(inputVal);
    if (isNaN(val)) return;

    if (
      selectedOvertime &&
      selectedOvertime.type === "Flat" &&
      selectedOvertime.calculation !== null
    ) {
      const calc = selectedOvertime.calculation;
      if (val % calc === 0) {
        setInputTotalHour(inputVal);
      }
    } else {
      setInputTotalHour(inputVal);
    }
  };
  

  // Menyiapkan opsi dropdown untuk employee
  const employeeOptions = employeesSample.map((emp) => ({
    value: emp.id_emp.toLowerCase(),
    label: emp.name,
  }));

  const selectedOvertime = overtimeSettingSample.find(
    (ot) => ot.id === selectedOvertimeName
  );

  // belum ditambahin perhitungan yang ditampilkan :(
  // sample perhitungan type flat
  // const calculatedPay =
  //   selectedOvertime && totalHour
  //     ? selectedOvertime.type === "Flat" &&
  //       selectedOvertime.calculation !== null
  //       ? `IDR ${
  //           (parseInt(totalHour) / selectedOvertime.calculation) *
  //           selectedOvertime.rate
  //         }`
  //       : ""
  //     : "";

  const router = useRouter();
  return (
    <Sidebar title="Overtime Management">
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
                      ? employeeOptions.find(
                          (emp) => emp.value === selectedEmployeeId
                        )?.label
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
                        {employeeOptions.map((emp) => (
                          <CommandItem
                            key={emp.value}
                            value={emp.label}
                            onSelect={() => {
                              setSelectedEmployeeId(emp.value);
                              setIsEmployeeDropdownOpen(false);
                            }}
                          >
                            <Check
                              className={cn(
                                "mr-2 h-4 w-4",
                                selectedEmployeeId === emp.value
                                  ? "opacity-100"
                                  : "opacity-0"
                              )}
                            />
                            {emp.label}
                          </CommandItem>
                        ))}
                      </CommandGroup>
                    </CommandList>
                  </Command>
                </PopoverContent>
              </Popover>
            </div>

            {/* Overtime Name */}
            <div className="flex flex-col w-full gap-2">
              <Label>Overtime Name</Label>
              <Select onValueChange={(val) => setSelectedOvertimeName(val)}>
                <SelectTrigger className="h-[45px] w-full p-4 border-neutral-300 text-neutral-900">
                  <SelectValue placeholder="Choose overtime name" />
                </SelectTrigger>
                <SelectContent>
                  {overtimeSettingSample.map((Item) => (
                    <SelectItem key={Item.id} value={Item.id}>
                      {Item.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
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
                  value={inputTotalHour}
                  onChange={handleHourChange}
                  required
                />

                <span>Hour</span>
              </div>
              {selectedOvertime?.type === "Flat" && (
                <p className="text-neutral-400 text-sm pl-1">
                  Overtime hours must be a multiple of{" "}
                  {selectedOvertime?.calculation}
                </p>
              )}
            </div>
          </div>

          {/* Overtime Pay */}
          <div className="flex flex-col w-full gap-2">
            <Label>Overtime Pay</Label>
            <Input
              disabled
              type="text"
              value="IDR 000000"
              readOnly
              className="bg-neutral-100"
            />
          </div>
        </Card>

        {/* Action Buttons */}
        <div className="flex flex-row gap-[15px] justify-end items-center">
          <Button
            variant="outline"
            className="w-[98px]"
            onClick={() => router.push("/overtime/management")}
          >
            Cancel
          </Button>
          <Button type="submit" variant="default" className="w-[98px]">
            Save
          </Button>
        </div>
      </Card>
    </Sidebar>
  );
}
