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
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"
const chartData = [
  { name: "Permanent", value: 120 },
  { name: "Internship", value: 12 },
  { name: "Part-time", value: 5 },
  { name: "Outsource", value: 21 },
]

const chartConfig = {
  employee: {
    label: "employee",
    color: "#1E3A5F",
  },
} satisfies ChartConfig

export function EmployeeWorkStatus() {
  return (
    <Card>
      <CardHeader>
        <div className="border-b-1 border-b-black pb-[20px]">
          <div className="font-medium text-base text-[#acacac]">
            Employee Statistic
          </div>
          <div className="font-bold text-lg">Employee Work Status</div>
        </div>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <BarChart
            accessibilityLayer
            data={chartData}
            layout="vertical"
            margin={{
              right: 25,
              left: 25
            }}
          >
            <CartesianGrid horizontal={false} />
            <XAxis type="number" dataKey="value" />
            <YAxis
              dataKey="name"
              type="category"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
              tickFormatter={(value) => value.slice(0, 100)}
            />
            <ChartTooltip
              cursor={true}
              content={<ChartTooltipContent />}
            />
            <Bar dataKey="value" fill="var(--color-employee)" radius={5} />
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}
