import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Spinner } from "@/components/ui/spinner";
import { useDashboardData } from "@/hooks/useDashboardData";
import { getBarChartData } from "@/utils/getBarChartData";

interface StatCardProps {
  icon: React.ReactNode;
  title: string;
  //   value: number | string;
  lastUpdated: string;
  dashboardData: any; // Replace with the actual type of dashboardData
}

export default function StatCard({ icon, title, lastUpdated, dashboardData }: StatCardProps) {

  const { chartData } = getBarChartData(dashboardData);

  const matched = chartData.find((item) => item.name === title);
  const value = matched ? matched.value : 0;

  return (
    <Card className="col-span-1 py-0 gap-0">
      <CardContent className="py-[20px] px-[20px]">
        <div className="flex flex-row gap-[10px] font-medium text-base pb-[10px]">
          {icon}
          <div className="w-full">{title}</div>
        </div>
        <div className="font-bold text-4xl">{value}</div>
      </CardContent>
      <CardFooter className="py-[10px] px-[20px] border-t-2 border-t-[#d9d9d9]">
        <div className="font-semibold text-sm text-[#acacac]">
          Update: {lastUpdated}
        </div>
      </CardFooter>
    </Card>
  );
}
