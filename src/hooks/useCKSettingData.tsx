"use client";
import { useEffect, useState, useCallback } from "react";
import Cookies from "js-cookie";
import { CheckclockSetting } from "@/types/cksetting";
import { redirect } from "next/navigation";
import { transformCKData } from "@/utils/transfromCkSData";
import { CheckclockSettingForm } from "@/types/cksettingForm";

export function useCKSettingData() {
  const [ckData, setCkData] = useState<CheckclockSetting | null>(null);
  // const [wfo, setWfo] = useState<CheckclockSettingForm[]>([]);
  // const [wfa, setWfa] = useState<CheckclockSettingForm[]>([]);
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
          cache: "no-store",
        }
      );
      const json = await res.json();
      setCkData(json);
      console.log("ckData response", json);
      // const { wfo, wfa } = transformCKData(Array.isArray(json) ? json : []);
      // setWfo(wfo);
      // setWfa(wfa);
      setLoadingCKS(false);
    } catch (error) {
      console.error("Error initializing get cks data:", error);
      setLoadingCKS(false);
    }
  }, []);

  useEffect(() => {
    fetchCkSetting();
  }, [fetchCkSetting]);

  const refetch = useCallback(async () => {
    console.log("refetch is working")
    setLoadingCKS(true);
    await fetchCkSetting();
  }, [fetchCkSetting]);

  return { ckData, loading, refetch };
}