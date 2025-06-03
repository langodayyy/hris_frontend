import { useEffect, useState, useCallback } from "react";
import Cookies from "js-cookie";
import { CheckclockSetting } from "@/types/cksetting";
import { redirect } from "next/navigation";

export function useCKSettingData() {
  const [ckData, setCkData] = useState<CheckclockSetting | null>(null);
  const [loading, setLoadingCKS] = useState(true);

  const fetchCkSetting = useCallback(async () => {
    try {
      const userCookie = Cookies.get("token");
      if (!userCookie) {
        redirect("/sign-in");
        return;
      }

      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/check-clock-setting-times`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${userCookie}`,
          },
        }
      );
      const json = await res.json();
      setCkData(json);
      setLoadingCKS(false);
    } catch (error) {
      console.error("Error initializing get cks data:", error);
      setLoadingCKS(false); // Make sure to set loading to false even on error
    }
  }, []);

  useEffect(() => {
    fetchCkSetting();
  }, [fetchCkSetting]);

  // Add effect to watch loading state changes
  useEffect(() => {
    if (loading) {
      fetchCkSetting();
    }
  }, [loading, fetchCkSetting]);

  return { 
    ckData, 
    loading, 
    setLoadingCKS,
    refetch: fetchCkSetting // Expose refetch function
  };
}