import { Card, CardContent } from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { Pie, PieChart } from "recharts";

// fetch data from db here
const chartDataPieFromDB = [
  { name: "On Time", value: 101 },
  { name: "Late", value: 30 },
  { name: "Absent", value: 10 },
];

// make a new const variable in addition of fill
const chartDataPie = chartDataPieFromDB.map((item) => {
  const key = item.name.toLowerCase().replace(/\s+/g, "_");
  return {
    ...item,
    fill: `var(--color-${key})`,
  };
});

// get random color if 10 first color is already fullfilled
function getRandomColor() {
  const letters = "0123456789ABCDEF";
  return (
    "#" +
    Array.from(
      { length: 6 },
      () => letters[Math.floor(Math.random() * 16)]
    ).join("")
  );
}

// i choose randomly, the first is use from the cmlabs guide
const presetColors = [
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

// define the config
const chartPieConfig = Object.fromEntries(
  chartDataPie.map((item, index) => {
    const key = item.name.toLowerCase().replace(/\s+/g, "_");
    const color =
      index < presetColors.length ? presetColors[index] : getRandomColor();
    return [key, { color, label: item.name }];
  })
) satisfies ChartConfig;

// proceed to calculate the percentage
// 1. Calculate total sum
const dataSum = chartDataPie.reduce((sum, item) => sum + item.value, 0);

// 2. Generate percentage summary
const dataSummary = chartDataPie.reduce((summary, item) => {
  // You can optionally normalize the key
  const key = item.name.toLowerCase().replace(/\s+/g, "_"); // e.g., "pending_approval"
  summary[key] = ((item.value / dataSum) * 100).toFixed(1) + "%";
  return summary;
}, {} as Record<string, string>);

// get today date
const today = new Date();
const yyyy = today.getFullYear();
const mm = String(today.getMonth() + 1).padStart(2, '0'); // Months are 0-based
const dd = String(today.getDate()).padStart(2, '0');

const formattedDate = `${yyyy}-${mm}-${dd}`;

export function AttendaceStatusToday() {
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
            <div className="flex font-bold text-lg justify-between">
                <div>Attendace</div>
                <span>{formattedDate}</span>
            </div>
          </div>

          {/* return the data summary */}
          <div className="flex flex-col gap-[10px] pt-[20px]">
            {Object.entries(chartPieConfig).map(([key, config]) => (
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
