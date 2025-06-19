import { Card, CardContent } from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { Spinner } from "@/components/ui/spinner";
import { useDashboardData } from "@/hooks/useDashboardData";
import { getPieChartData } from "@/utils/getPieChartData";
import { Pie, PieChart } from "recharts";

interface Props {
  dashboardData: any; // Replace with the actual type of dashboardData
}

export function OvertimeApprovalToday({ dashboardData }: Props) {
  // const { chartDataPie, chartConfig, dataSummary } = getPieChartData(dashboardData);
  let chartDataPie: any[] = [];
  let chartConfig: ChartConfig = {};
  let dataSummary: { [key: string]: number | string } = {};
  let hasDataForChart = false;

  // Proses data hanya jika dashboardData valid
  if (dashboardData && Object.keys(dashboardData).length > 0) {
    const processedData = getPieChartData(dashboardData);
    chartDataPie = processedData.chartDataPie;
    chartConfig = processedData.chartConfig;
    dataSummary = processedData.dataSummary;
    hasDataForChart = chartDataPie.some((item: any) => item.value > 0);
  }

  return (
    <Card className="flex flex-col py-0 gap-0">
      <CardContent className="flex flex-row w-full pb-0">
        {hasDataForChart ? (
          <ChartContainer
            config={chartConfig}
            className="aspect-square max-h-[250px] min-w-[250px]"
          >
            <PieChart>
              <ChartTooltip
                cursor={true}
                content={<ChartTooltipContent hideLabel />}
              />
              <Pie data={chartDataPie} dataKey="value" nameKey="status_type" />
            </PieChart>
          </ChartContainer>
        ) : (
          <div className=" max-h-[250px] flex items-center justify-center" />
        )}
        <div className="py-[20px] w-full">
          <div className="border-b-2 border-neutral-100 pb-[20px]">
            <div className="font-medium text-base text-[#acacac]">
              Overtime Statistic
            </div>
            <div className="font-bold text-lg">Overtime Approval Today</div>
          </div>

          {/* return the data summary */}
          <div className="flex flex-col gap-[10px] pt-[20px]">
            {hasDataForChart ? ( // Hanya tampilkan summary jika ada data untuk chart
              Object.entries(chartConfig).map(([key, config]) => (
                <div
                  key={key}
                  className="flex flex-row gap-[10px] items-center"
                >
                  <div
                    className="w-[10px] h-[10px] rounded-full"
                    style={{ backgroundColor: config.color }}
                  ></div>
                  <div className="font-normal text-sm w-full">
                    {config.label}
                  </div>
                  <div className="font-medium text-sm text-[#acacac]">
                    {dataSummary[key]}
                  </div>
                </div>
              ))
            ) : (
              // Jika tidak ada data, tampilkan pesan di area summary juga
              <p className="text-gray-500 italic my-12 justify-center flex">
                No approval data available for today.
              </p>
            )}
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
