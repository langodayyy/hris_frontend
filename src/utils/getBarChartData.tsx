import { ChartConfig } from "@/components/ui/chart";

type RawPieData = Record<string, number>;

type ChartData = {
  name: string;
  value: number;
};

type ChartDataResult = {
  chartData: ChartData[];
  chartConfig: ChartConfig;
};

export function getBarChartData(rawData: RawPieData): ChartDataResult {
  const chartData = Object.entries(rawData).map(([key, value]) => ({
    name: key,
    value,
  }));

  // define the config
  const chartConfig = {
    employee: {
      label: "Employee",
      color: "#1E3A5F",
    },
  } satisfies ChartConfig;

  return { chartData, chartConfig };
}
