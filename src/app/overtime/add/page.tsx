"use client";
import Sidebar from "@/components/sidebar";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList} from "@/components/ui/command";
import { Input } from "@/components/ui/input";
import { Popover, PopoverContent, PopoverTrigger} from "@/components/ui/popover";
import { Check, ChevronsUpDown } from "lucide-react";
import React, { useState } from "react";
import { cn } from "@/lib/utils"; 
import { Calendar } from "@/components/ui/calendar";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";

//sample aja
const employeesSample = [
  { id_employee: "EMP0001", Name: "Mumtaz", position: "Manager" },
  { id_employee: "EMP0002", Name: "Kemal", position: "Manager" },
  { id_employee: "EMP0003", Name: "Lucky", position: "Manager" },
  { id_employee: "EMP0004", Name: "Silfi", position: "Manager" },
];

//sample aja
const overtimeSettingSample = [
  { id_ovt_setting: "OTS001", name: "Weekday Overtime", type: "Goverment Regulation", calculation: "2", rate:"400000" },
  { id_ovt_setting: "OTS002", name: "Weekend Overtime", type: "Company Regulation", calculation: "1", rate:"150000" },
  { id_ovt_setting: "OTS003", name: "Holiday Overtime", type: "Company Regulation", calculation: "1", rate:"230000" },
];


export default function AddOvertimeEmployees() {

  const [date, setDate] = useState<Date | undefined>(undefined);
  const [open, setOpen] = React.useState(false);
  const [value, setValue] = React.useState("");
  const [selectedOvertimeType, setSelectedOvertimeType] = useState("");
  const [totalHour, setTotalHour] = useState("");

  const handleHourChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputVal = e.target.value;

    // Selalu izinkan kosong (biar bisa dihapus manual)
    if (inputVal === "") {
      setTotalHour("");
      return;
    }

    const selected = overtimeSettingSample.find(
      (item) => item.id_ovt_setting === selectedOvertimeType
    );

    // Kalau belum pilih jenis lembur, simpan aja
    if (!selected) {
      setTotalHour(inputVal);
      return;
    }

    const calc = parseInt(selected.calculation);
    const val = parseInt(inputVal);

    // Kalau bukan angka, jangan update
    if (isNaN(val)) return;

    // Cek apakah kelipatan
    if (val % calc === 0) {
      setTotalHour(inputVal); // valid
    } else {
      // Jika tidak valid, jangan update state (atau bisa juga reset totalHour)
      // alert(`Jumlah jam lembur harus kelipatan ${calc}`);
    }
  };

  // transform data agar sesuai format dropdown
  const employeeOptions = employeesSample.map((emp) => ({
    value: emp.id_employee.toLowerCase(),
    label: emp.Name,
  }));

  const selectedOvertime = overtimeSettingSample.find(
    (ot) => ot.id_ovt_setting  === selectedOvertimeType
  );

  const calculatedPay =
    selectedOvertime && totalHour
      ? `IDR ${
          (parseInt(totalHour) / parseInt(selectedOvertime.calculation)) * parseInt(selectedOvertime.rate)
        }`
      : "";

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
          <div className="flex flex-col w-full gap-2">
            <Label>Employee Name</Label>
            <Popover open={open} onOpenChange={setOpen}>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  role="combobox"
                  aria-expanded={open}
                  className={cn(
                    "justify-between border-neutral-300 w-full hover:bg-primary-900 h-[45px]",
                    !value ? "text-neutral-300" : "text-neutral-900"
                  )}
                >
                  {value
                    ? employeeOptions.find((emp) => emp.value === value)?.label
                    : "Choose employee or search"}
                  <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                </Button>
              </PopoverTrigger>
              <PopoverContent className="p-0">
                <Command>
                  <CommandInput placeholder="Search employee..." />
                  <CommandList>
                    <CommandEmpty>No employee found.</CommandEmpty>
                    <CommandGroup>
                      {employeeOptions.map((emp) => (
                        <CommandItem
                          key={emp.value}
                          value={emp.value}
                          onSelect={(currentValue) => {
                            setValue(
                              currentValue === value ? "" : currentValue
                            );
                            setOpen(false);
                          }}
                        >
                          <Check
                            className={cn(
                              "mr-2 h-4 w-4",
                              value === emp.value ? "opacity-100" : "opacity-0"
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

          {/* Overtime Type */}
          <div className="flex flex-col w-full gap-2">
            <Label>Overtime Type</Label>
            <Select onValueChange={(val) => setSelectedOvertimeType(val)}>
              <SelectTrigger className="h-[45px] w-full p-4 border-neutral-300 text-neutral-300">
                <SelectValue placeholder="Choose overtime type" />
              </SelectTrigger>
              <SelectContent>
                {overtimeSettingSample.map((Item) => (
                  <SelectItem key={Item.id_ovt_setting} value={Item.id_ovt_setting}>
                    {Item.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Total Hour */}
          <div className="flex flex-col w-full gap-2">
            <Label>Total Hour</Label>
            <div className="flex flex-row gap-2 items-center">
              <Input
                type="number"
                placeholder="Enter overtime duration"
                value={totalHour}
                onChange={handleHourChange}
                required
              />
              <span>Hour</span>
            </div>
            {selectedOvertimeType && (
              <p className="text-neutral-400 text-sm pl-1">
                Overtime hours must be a multiple of{" "}
                {selectedOvertime?.calculation}
              </p>
            )}
          </div>

          {/* Overtime Date with Calendar */}
          <div className="flex flex-col w-full gap-2">
            <Label>Overtime Date</Label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant={"outline"}
                  className={cn(
                    "w-full justify-start text-left font-normal text-neutral-900 border-neutral-300",
                    !date && "text-muted-foreground"
                  )}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {date ? (
                    format(date, "dd/MM/yyyy")
                  ) : (
                    <span className="text-neutral-300">Pick a date</span>
                  )}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                  mode="single"
                  selected={date}
                  onSelect={setDate}
                  initialFocus
                  classNames={{
                    day_selected:
                      "bg-secondary-600 text-primary-foreground hover:bg-primary hover:text-primary-foreground focus:bg-secondary-600 focus:text-primary-foreground  ",
                  }}
                />
              </PopoverContent>
            </Popover>
          </div>

          {/* Overtime Pay */}
          <div className="flex flex-col w-full gap-2">
            <Label>Overtime Pay</Label>
            <Input
              disabled
              type="text"
              value={calculatedPay}
              readOnly
              className="bg-neutral-100"
            />
          </div>
        </Card>

        {/* Action Buttons */}
        <div className="flex flex-row gap-[15px] justify-end items-center">
          <Button type="button" variant="outline" className="w-[98px]">
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
