import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { Pie, PieChart } from "recharts";

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
import { getPieChartData } from "@/utils/getPieChartData";
import { useDashboardData } from "@/hooks/useDashboardData";
import { Spinner } from "@/components/ui/spinner";

interface Props { 
  dashboardData: any; // Replace with the actual type of dashboardData
}

export function Age({dashboardData}: Props) {
  const [position, setPosition] = useState("5")
  
  const { chartDataPie, chartConfig, dataSummary } = getPieChartData(dashboardData);

  return (
    <Card className="flex flex-col py-0 gap-0">
      <CardContent className="flex flex-row w-full pb-0">
        <ChartContainer
          config={chartConfig}
          className="aspect-square max-h-[250px] min-w-[250px]"
        >
          <PieChart>
            <ChartTooltip
              cursor={true}
              content={<ChartTooltipContent hideLabel />}
            />
            <Pie data={chartDataPie} dataKey="value" nameKey="name" />
          </PieChart>
        </ChartContainer>
        <div className="py-[20px] w-full">
          <div className="flex border-b-1 border-b-black pb-[20px] justify-between">
            <div>
              <div className="font-medium text-base text-[#acacac]">
                Employee Statistic
              </div>
              <div className="font-bold text-lg">Age</div>
            </div>
            <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
              variant={"ghost"}
              size={"icon"}
              className="flex items-center"
            >
              <svg
                width="4"
                height="14"
                viewBox="0 0 4 14"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M2 4.99997C3.10556 4.99997 4 5.89442 4 6.99997C4 8.10553 3.10556 8.99997 2 8.99997C0.894444 8.99997 0 8.10553 0 6.99997C0 5.89442 0.894444 4.99997 2 4.99997ZM0 2.11108C0 3.21664 0.894444 4.11108 2 4.11108C3.10556 4.11108 4 3.21664 4 2.11108C4 1.00553 3.10556 0.111084 2 0.111084C0.894444 0.111084 0 1.00553 0 2.11108ZM0 11.8889C0 12.9944 0.894444 13.8889 2 13.8889C3.10556 13.8889 4 12.9944 4 11.8889C4 10.7833 3.10556 9.88886 2 9.88886C0.894444 9.88886 0 10.7833 0 11.8889Z"
                  fill="black"
                />
              </svg>
            </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-fit" align="end">
              <DropdownMenuRadioGroup
                value={position}
                onValueChange={setPosition}
              >
                <DropdownMenuRadioItem value="5">Per 5 Year</DropdownMenuRadioItem>
                <DropdownMenuRadioItem value="10">
                  Per 10 Year
                </DropdownMenuRadioItem>
                <DropdownMenuRadioItem value="15">
                  Per 15 Year
                </DropdownMenuRadioItem>
              </DropdownMenuRadioGroup>
            </DropdownMenuContent>
          </DropdownMenu>
            
          </div>

          {/* return the data summary */}
          <div className="flex flex-col gap-[10px] pt-[20px]">
            {Object.entries(chartConfig).map(([key, config]) => (
              <div key={key} className="flex flex-row gap-[10px] items-center">
                <div
                  className="w-[10px] h-[10px] rounded-full"
                  style={{ backgroundColor: config.color }}
                ></div>
                <div className="font-normal text-sm w-full">{config.label}</div>
                <div className="font-medium text-sm text-[#acacac]">
                  {dataSummary[key]}
                </div>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

export async function fetchData(formData: FormData) {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/dashboard-data`,
      {
        method: "POST",
        body: formData,
      }
    );

    if (!response.ok) {
      // If the response is not OK, parse the error response
      const errorData = await response.json();
      return { success: false, errors: errorData.errors };
    }

    // Parse and return the success response
    const data = await response.json();

    return { success: true, data };
  } catch (error: any) {
    // Handle network or other unexpected errors
    return {
      success: false,
      errors: { general: [error.message || "An unexpected error occurred"] },
    };
  }
}
