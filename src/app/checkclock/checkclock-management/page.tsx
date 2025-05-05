"use client";
import Sidebar from "../../../components/sidebar";
import * as React from "react";
import { Input } from "@/components/ui/input";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuSeparator,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@radix-ui/react-dropdown-menu";



import { CheckclockOverview, columns } from "./columns"
import { DataTable } from "./data-table"


async function getData(): Promise<CheckclockOverview[]> {
  // Fetch data from your API here.
  return [
    {
      id: "1",
      employeeName: "Juanita",
      position: "CEO",
      date: "2023-10-01",
      clockIn: "08:00",
      clockOut: "17:00",
      workType: "WFO",
      status: "On Time",
      approvalStatus: "Approved",
    },
    {
      id: "2",
      employeeName: "John",
      position: "Manager",
      date: "2023-10-01",
      clockIn: "09:00",
      clockOut: "18:00",
      workType: "WFH",
      status: "Late",
      approvalStatus: "Pending",
    },
    // ...
  ]
}

export default async function CheckclockOverviewPage() {
  const [date, setDate] = React.useState<Date>();
  const [roles, setRoles] = React.useState<string[]>(["CEO"]);
  const data = await getData()

  const handleToggle = (role: string) => {
    setRoles((prevRoles) =>
      prevRoles.includes(role)
        ? prevRoles.filter((r) => r !== role)
        : [...prevRoles, role]
    );
  };


 

  return (
    <Sidebar title="Checkclock">
      <div className=" h-screen bg-white rounded-[15px] p-[20px] flex flex-col gap-[10px]">
        <div className="py-[10px] flex gap-6 items-center ">
          <span className="w-[187px] text-lg flex-none">
            Checkclock Overview
          </span>
          <div className="w-full">
            <Input
              placeholder="Search Employee"
              icon={
                <svg
                  width="20"
                  height="21"
                  viewBox="0 0 20 21"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M17.5 18L13.875 14.375M15.8333 9.66667C15.8333 13.3486 12.8486 16.3333 9.16667 16.3333C5.48477 16.3333 2.5 13.3486 2.5 9.66667C2.5 5.98477 5.48477 3 9.16667 3C12.8486 3 15.8333 5.98477 15.8333 9.66667Z"
                    stroke="currentColor"
                    strokeWidth="1.66667"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              }
            ></Input>
          </div>
          <div className="w-fit">
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant={"calendar"}
                  className={cn(
                    "w-[280px] justify-start text-left font-normal",
                    !date && "text-neutral-300"
                  )}
                >
                  <CalendarIcon />
                  {date ? format(date, "PPP") : <span>Today</span>}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0">
                <Calendar
                  mode="single"
                  selected={date}
                  onSelect={setDate}
                  initialFocus
                />
              </PopoverContent>
            </Popover>
          </div>
          <div className="w-fit">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant={"outline"}
                  icon={
                    <svg
                      width="20"
                      height="21"
                      viewBox="0 0 20 21"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M5 10.5H15M2.5 5.5H17.5M7.5 15.5H12.5"
                        stroke="currentColor"
                        strokeWidth="1.67"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  }
                >
                  Filter
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-72 rounded-2xl border border-neutral-200 drop-shadow-2xl">
                <DropdownMenuGroup>
                  <DropdownMenuSeparator>
                    <DropdownMenuCheckboxItem
                      checked={roles.includes("CEO")}
                      onCheckedChange={() => handleToggle("CEO")}
                    >
                      CEO
                    </DropdownMenuCheckboxItem>
                    <DropdownMenuCheckboxItem
                      checked={roles.includes("Head of HR")}
                      onCheckedChange={() => handleToggle("Head of HR")}
                    >
                      Head of HR
                    </DropdownMenuCheckboxItem>
                    <DropdownMenuCheckboxItem 
                      checked={roles.includes("Manager")}
                      onCheckedChange={() => handleToggle("Manager")}
                    >
                      Manager
                    </DropdownMenuCheckboxItem>
                    <DropdownMenuCheckboxItem
                      checked={roles.includes("HRD")}
                      onCheckedChange={() => handleToggle("HRD")}
                    >
                      HRD
                    </DropdownMenuCheckboxItem>
                    <DropdownMenuCheckboxItem
                      checked={roles.includes("CPO")}
                      onCheckedChange={() => handleToggle("CPO")}
                    >
                      CPO
                    </DropdownMenuCheckboxItem>
                    <DropdownMenuCheckboxItem
                      checked={roles.includes("Supervisor")}
                      onCheckedChange={() => handleToggle("Supervisor")}
                    >
                      Supervisor
                    </DropdownMenuCheckboxItem>
                    <DropdownMenuCheckboxItem
                      checked={roles.includes("OB")}
                      onCheckedChange={() => handleToggle("OB")}
                    >
                      OB
                    </DropdownMenuCheckboxItem>
                  </DropdownMenuSeparator>
                </DropdownMenuGroup>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
          <div className="w-fit">
            <Button
              icon={
                <svg
                  width="15"
                  height="15"
                  viewBox="0 0 15 15"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M7.5 3.125V11.875"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M3.125 7.5H11.875"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              }
            >
              Add
            </Button>
          </div>
        </div>
        <div className="container mx-auto py-10">
      <DataTable columns={columns} data={data} />
    </div>
      </div>
    </Sidebar>
  );
}
