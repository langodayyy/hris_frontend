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

export function ApprovalCheckClock() {
  const { dashboardData, loading } = useDashboardData();

  if (loading || !dashboardData)
    return (
      <Card className="flex flex-col py-0 gap-0 h-[251px] justify-center items-center">
        <Spinner size="small" />
      </Card>
    );

  const { chartDataPie, chartConfig, dataSummary } = getPieChartData(dashboardData.approvalStatus[0]);

  return (
    <Card className="flex flex-col py-0 gap-0 max-h-[251px]">
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
          <div className="border-b-1 border-b-black pb-[20px]">
            <div className="font-medium text-base text-[#acacac]">
              Check Clock Statistic
            </div>
            <div className="font-bold text-lg">Approval Status Today</div>
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
