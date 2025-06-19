import { Card, CardContent } from "@/components/ui/card";
import { useDashboardData } from "@/hooks/useDashboardData";
import { getPieChartData } from "@/utils/getPieChartData";

import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { Pie, PieChart } from "recharts";
import { Spinner } from "@/components/ui/spinner";

interface Props {
  dashboardData: any; // Replace with the actual type of dashboardData
}

export function ApprovalCheckClock({ dashboardData }: Props) {
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
    <Card className="flex flex-col py-0 gap-0 max-h-[251px]">
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
              <Pie data={chartDataPie} dataKey="value" nameKey="name" />
            </PieChart>
          </ChartContainer>
        ) : (
          <div className="max-h-[250px] flex items-center justify-center" />
        )}

        <div className="py-[20px] w-full">
          <div className="border-b-1 border-b-neutral-100 pb-[20px]">
            <div className="font-medium text-base text-[#acacac]">
              Check Clock Statistic
            </div>
            <div className="font-bold text-lg">Approval Status Today</div>
          </div>

          {/* Return summary data jika ada, jika tidak kosongkan atau tampilkan pesan */}
          <div className="flex flex-col gap-[10px] pt-[20px]">
            {hasDataForChart ? ( // Hanya tampilkan summary jika ada data untuk chart
              Object.entries(chartConfig).map(([key, config]) => (
                <div
                  key={key}
                  className="flex flex-row gap-[10px] items-center"
                >
                  <div
                    className="w-[10px] h-[10px] rounded-full"
                    style={{
                      backgroundColor: (config as ChartConfig[string]).color,
                    }}
                  ></div>
                  <div className="font-normal text-sm w-full">
                    {(config as ChartConfig[string]).label}
                  </div>
                  <div className="font-medium text-sm text-[#acacac]">
                    {dataSummary[key] !== undefined ? dataSummary[key] : "-"}
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
