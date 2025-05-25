import { useEffect, useState } from "react";
import { DashboardResponse } from "@/types/dashboard";

export function useDashboardData() {
  const [dashboardData, setDashboardData] = useState<DashboardResponse|null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchDashboard() {
        try {
            const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/dashboardnologin`);
            const json = await res.json();
            console.log(json);
            setDashboardData(json);
            setLoading(false);
        } catch (error) {
            console.error("Error initializing token checker:", error);
        }
    }

    fetchDashboard();
  }, []);

  return { dashboardData, loading };
}
