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
const chartData = [
  { name: "New", value: 21 },
  { name: "Active", value: 120 },
  { name: "Resigned", value: 40 },
];

const chartConfig = {
  employee: {
    label: "Employee",
    color: "#1E3A5F",
  },
} satisfies ChartConfig;

export function CurrentEmployee() {
  return (
    <Card>
      <CardHeader>
        <div className="border-b-1 border-b-black pb-[20px]">
          <div className="font-medium text-base text-[#acacac]">
            Employee Statistic
          </div>
          <div className="font-bold text-lg">Current Number of Employees</div>
        </div>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <BarChart
            accessibilityLayer
            data={chartData}
          >
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
            <ChartTooltip
              cursor={true}
              content={<ChartTooltipContent />}
            />
            <Bar dataKey="value" fill="var(--color-employee)" radius={8} />
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
