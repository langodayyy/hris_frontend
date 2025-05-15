"use client"

import { TrendingUp } from "lucide-react"
import { Bar, BarChart, CartesianGrid, LabelList, XAxis, YAxis } from "recharts"

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

import { CheckClockList, CheckClockListRecord } from "./column";
import { DataTable } from "./data-table";

const chartData: CheckClockListRecord[] = [
  { id: "1", name: "Mumtaz", time: "10:00", position: "CEO" },
  { id: "2", name: "Lucky", time: "10:00", position: "Manager" },
  { id: "3", name: "Mumtaz", time: "10:00", position: "Employee" },
];

export function CheckClockListToday() {
  const column = CheckClockList();

  return (
    <Card>
      <CardHeader>
        <div className="border-b-1 border-b-black pb-[20px]">
          <div className="font-medium text-base text-[#acacac]">
            Check Clock Summary 
          </div>
          <div className="font-bold text-lg">Late Employee Attendace Today</div>
        </div>
      </CardHeader>
      <CardContent>
        <div>
            <DataTable columns={column} data={chartData} />
        </div>
      </CardContent>
    </Card>
  )
}
