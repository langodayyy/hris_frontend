import { Card, CardContent } from "@/components/ui/card";
import { ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { Pie, PieChart } from "recharts";

const chartDataPie = [
  { status_type: "Pending Approval", value: 275, fill: "var(--color-pending)" },
  { status_type: "Approved", value: 200, fill: "var(--color-approved)" },
  { status_type: "Rejected", value: 187, fill: "var(--color-rejected)" },
];

const chartPieConfig = {
  pending: {
    color: "#257047",
  },
  approved: {
    color: "#FFAB00",
  },
  rejected: {
    color: "#C11106",
  },
} satisfies ChartConfig;

export function ApprovalCheckClockChart() {
  return (
    <Card className="flex flex-col py-0 gap-0">
      <CardContent className="flex flex-row w-full pb-0">
        <ChartContainer
          config={chartPieConfig}
          className="aspect-square max-h-[250px] min-w-[250px]"
        >
          <PieChart>
            <ChartTooltip
              cursor={true}
              content={<ChartTooltipContent hideLabel/>}
            />
            <Pie data={chartDataPie} dataKey="value" nameKey="status_type" />
          </PieChart>
        </ChartContainer>
        <div className="py-[20px] w-full">
          <div className="border-b-1 border-b-black pb-[20px]">
            <div className="font-medium text-base text-[#acacac]">
              Check Clock Statistic
            </div>
            <div className="font-bold text-lg">Approval Status Today</div>
          </div>
          <div className="flex flex-col gap-[10px] pt-[20px]">
            <div className="flex flex-row gap-[10px] items-center">
              <div className="w-[10px] h-[10px] rounded-full bg-[#257047]"></div>
              <div className="font-normal text-sm w-full">Approved</div>
              <div className="font-medium text-sm text-[#acacac]">60%</div>
            </div>
            <div className="flex flex-row gap-[10px] items-center">
              <div className="w-[10px] h-[10px] rounded-full bg-[#FFAB00]"></div>
              <div className="font-normal text-sm w-full">Pending</div>
              <div className="font-medium text-sm text-[#acacac]">30%</div>
            </div>
            <div className="flex flex-row gap-[10px] items-center">
              <div className="w-[10px] h-[10px] rounded-full bg-[#C11106]"></div>
              <div className="font-normal text-sm w-full">Rejected</div>
              <div className="font-medium text-sm text-[#acacac]">10%</div>
            </div>
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
