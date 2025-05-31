"use client";

import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { Button } from "@/components/ui/button";
import { useDashboardData } from "@/hooks/useDashboardData";
import { Spinner } from "@/components/ui/spinner";
import { getBarChartData } from "@/utils/getBarChartData";

interface Props { 
  dashboardData: any; // Replace with the actual type of dashboardData
}

export function CurrentEmployee({dashboardData}: Props) {

  const { chartData, chartConfig } = getBarChartData(dashboardData);

  return (
    <Card>
      <CardHeader>
        <div className="flex border-b-1 border-b-black pb-[20px] justify-between">
          <div>
            <div className="font-medium text-base text-[#acacac]">
              Employee Statistic
            </div>
            <div className="font-bold text-lg">Current Number of Employees</div>
          </div>
          <Button variant={"ghost"} size={"icon"} className="flex items-center">
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
        </div>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <BarChart accessibilityLayer data={chartData}>
            <YAxis type="number" dataKey="value"></YAxis>
            <CartesianGrid vertical={false} />
            <XAxis
              className="text-sm"
              dataKey="name"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
              tickFormatter={(value) => value.slice(0, 10)}
            />
            <ChartTooltip cursor={true} content={<ChartTooltipContent />} />
            <Bar dataKey="value" fill="var(--color-employee)" radius={8} />
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
