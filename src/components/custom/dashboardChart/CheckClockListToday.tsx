"use client";

import { Card, CardContent, CardHeader } from "@/components/ui/card";

import { CheckClockList, CheckClockListRecord } from "./column";
import { DataTable } from "./data-table";
import { Button } from "@/components/ui/button";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuCheckboxItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  DropdownMenuRadioItem,
  DropdownMenuRadioGroup,
} from "@/components/ui/dropdown-menu";
import { useState } from "react";
import { getTableChartData } from "@/utils/getTableChartData";
import { useDashboardData } from "@/hooks/useDashboardData";
import { Spinner } from "@/components/ui/spinner";

const chartData: CheckClockListRecord[] = [
  { id: "1", name: "Mumtaz", time: "10:00", position: "CEO" },
  { id: "2", name: "Lucky", time: "10:00", position: "Manager" },
  { id: "3", name: "Mumtaz", time: "10:00", position: "Employee" },
];

export function CheckClockListToday() {
  const column = CheckClockList();
  const [position, setPosition] = useState("sick")

  const { dashboardData, loading } = useDashboardData();
    
      if (loading || !dashboardData)
        return (
          <Card className="flex flex-col py-0 gap-0 h-[251px] justify-center items-center">
            <Spinner size="small" />
          </Card>
        );
    
      const { chartData } = getTableChartData(dashboardData.lateEmployee);

  return (
    <Card>
      <CardHeader>
        <div className="flex border-b-1 border-b-black pb-[20px] justify-between">
          <div>
            <div className="font-medium text-base text-[#acacac]">
              Check Clock Summary
            </div>
            <div className="font-bold text-lg">
              Late Employee Attendace Today
            </div>
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant={"ghost"}
                size={"icon"}
                className="flex items-center"
              >
                <svg
                  width="22"
                  height="21"
                  viewBox="0 0 22 21"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M21 1.5H1L9 10.96V17.5L13 19.5V10.96L21 1.5Z"
                    stroke="black"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-fit" align="end">
              <DropdownMenuRadioGroup
                value={position}
                onValueChange={setPosition}
              >
                <DropdownMenuRadioItem value="sick">Sick Leave</DropdownMenuRadioItem>
                <DropdownMenuRadioItem value="leave">
                  Annual Leave
                </DropdownMenuRadioItem>
                <DropdownMenuRadioItem value="late">
                  Late
                </DropdownMenuRadioItem>
              </DropdownMenuRadioGroup>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </CardHeader>
      <CardContent>
        <div>
          <DataTable columns={column} data={chartData} />
        </div>
      </CardContent>
    </Card>
  );
}
