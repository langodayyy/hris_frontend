import { useEffect, useState } from "react";
import { DashboardResponse } from "@/types/dashboard";
import Cookies from "js-cookie";
import { redirect } from "next/navigation";

export function useDashboardData() {
  const [dashboardData, setDashboardData] = useState<DashboardResponse|null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchDashboard() {
        try {
            const userCookie = Cookies.get("token");
            if (!userCookie) {
              redirect("/sign-in");
              return;
            }
            const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/dashboard`,
              {
                method: "GET",
                headers: {
                  Authorization: `Bearer ${userCookie}`,
                },
              }
            );
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
