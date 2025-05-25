// If you're using this type elsewhere, you can rename as needed
export type ChartData = {
  id: string;
  name: string;
  time: string;
  position: string;
};

export type ChartDataResult = {
  chartData: ChartData[];
};

// Fix: Raw data is an array of objects, not a record
export type RawTableData = {
  Name: string;
  Time: string;
  Position: string;
}[];

// Final conversion function
export function getTableChartData(rawData: RawTableData): ChartDataResult {
  const chartData: ChartData[] = rawData.map((entry, index) => ({
    id: (index + 1).toString(),
    name: entry.Name,
    time: entry.Time,
    position: entry.Position,
  }));

  return { chartData };
}
