// utils/getPieChartData.ts
import { ChartConfig } from "@/components/ui/chart";

export const presetColors = [
  "#1E3A5F", // 1
  "#7CA5BF", // 2
  "#BA3C54", // 3
  "#FFAB00", // 4
  "#4CAF50", // 5
  "#673AB7", // 6
  "#00BCD4", // 7
  "#E91E63", // 8
  "#9C27B0", // 9
  "#3F51B5", // 10
];

// get random color if 10 first color is already fullfilled
function getRandomColor() {
  const letters = "0123456789ABCDEF";
  return (
    "#" +
    Array.from({ length: 6 }, () => letters[Math.floor(Math.random() * 16)]).join("")
  );
}

type RawPieData = Record<string, number>;

type ChartDataPie = {
  name: string;
  value: number;
  fill: string;
};

type ChartDataResult = {
  chartDataPie: ChartDataPie[];
  chartConfig: ChartConfig;
  dataSummary: Record<string, string>;
};

export function getPieChartData(rawData: RawPieData): ChartDataResult {
  const chartData = Object.entries(rawData).map(([key, value]) => ({
    name: key,
    value,
  }));

  const chartDataPie = chartData.map((item) => {
    const key = item.name.toLowerCase().replace(/\s+/g, "_");
    return {
      ...item,
      fill: `var(--color-${key})`,
    };
  });

  // define the config
  const chartConfig: ChartConfig = Object.fromEntries(
    chartDataPie.map((item, index) => {
      const key = item.name.toLowerCase().replace(/\s+/g, "_");
      const color = index < presetColors.length ? presetColors[index] : getRandomColor();
      return [key, { color, label: item.name }];
    })
  );

  // proceed to calculate the percentage
  // 1. Calculate total sum
  const dataSum = chartDataPie.reduce((sum, item) => sum + item.value, 0);

  // 2. Generate percentage summary
  const dataSummary = chartDataPie.reduce((summary, item) => {
    const key = item.name.toLowerCase().replace(/\s+/g, "_");
    summary[key] = dataSum > 0 ? ((item.value / dataSum) * 100).toFixed(1) + "%" : "0%";
    return summary;
  }, {} as Record<string, string>);

  return { chartDataPie, chartConfig, dataSummary };
}
