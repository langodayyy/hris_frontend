import { useEffect, useState } from "react";
import { DashboardResponse } from "@/types/dashboard";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";

export function useDashboardData() {
  const [dashboardData, setDashboardData] = useState<DashboardResponse | null>(
    null
  );
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    async function fetchDashboard() {
      try {
        const userCookie = Cookies.get("token");
        if (userCookie) {
          const res = await fetch(
            `${process.env.NEXT_PUBLIC_API_URL}/dashboard`,
            {
              method: "GET",
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${userCookie}`,
              },
            }
          );

          if (res.status == 401) {
            router.push("/sign-in");
            return;
          }

          const json = await res.json();
          console.log(json);
          setDashboardData(json);
        } else {
          router.push("/sign-in");
          // tambahin toast error
          return;
        }
      } catch (error) {
        console.error("Error initializing token checker:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchDashboard();
  }, []);

  return { dashboardData, loading };
}
