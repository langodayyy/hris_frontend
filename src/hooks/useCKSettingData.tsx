"use client";
import useSWR from 'swr';
import { useEffect, useState, useCallback } from "react";
import Cookies from "js-cookie";
import { CheckclockSetting } from "@/types/cksetting";
import { redirect } from "next/navigation";

export type LocationRule = {
  data_id: number;
  latitude: string;
  longitude: string;
  radius: string;
};

// export function useCKSettingData() {
//   // ubah jangan simpen data di state, karena data ini akan diambil dari API
//   const [ckData, setCkData] = useState<CheckclockSetting | null>(null);
//   const [locationRule, setLocationRule] = useState<LocationRule | null>(null);

//   const [loading, setLoadingCKS] = useState(true);

//   const fetchCkSetting = useCallback(async () => {
//     try {
//       const userCookie = Cookies.get("token");
//       if (!userCookie) {
//         redirect("/sign-in");
//         return;
//       }

//       const res = await fetch(
//         `${process.env.NEXT_PUBLIC_API_URL}/check-clock-setting-times`,
//         {
//           method: "GET",
//           headers: {
//             "Content-Type": "application/json",
//             Authorization: `Bearer ${userCookie}`,
//           },
//           cache: "no-store",
//         }
//       );
//       const json = await res.json();

//       // get data cc from db
//       setCkData(json.ckdata);
//       console.log("ckData response", json);

//       // get rule cc from db
//       const locationRule = json.location_rule?.[0] || {};
//       console.log("locationRule from API:", locationRule); // Debugging log

//       setLocationRule({
//         data_id: locationRule.data_id || 0,
//         latitude: locationRule.latitude || "0",
//         longitude: locationRule.longitude || "0",
//         radius: locationRule.radius || "0",
//       });
      
//       setLoadingCKS(false);
//     } catch (error) {
//       console.error("Error initializing get cks data:", error);
//       setLoadingCKS(false);
//     }
//   }, []);

//   useEffect(() => {
//     fetchCkSetting();
//   }, [fetchCkSetting]);

//   const refetch = useCallback(async () => {
//     console.log("refetch is working")
//     setLoadingCKS(true);
//     await fetchCkSetting();
//   }, [fetchCkSetting]);

//   return { ckData, locationRule, loading, refetch };
// }

const fetcher = (url: string) => fetch(url, {
  headers: {
    Authorization: `Bearer ${Cookies.get("token")}`,
    "Content-Type": "application/json",
  }
}).then(res => res.json());

export function useCKSettingData() {
  const { data, error, isLoading, mutate } = useSWR(
    `${process.env.NEXT_PUBLIC_API_URL}/check-clock-setting-times`,
    fetcher
  );

  const ckData = data?.ckdata ?? null;
  const locationRule = data?.location_rule?.[0]
    ? {
        data_id: data.location_rule[0].data_id || 0,
        latitude: data.location_rule[0].latitude || "0",
        longitude: data.location_rule[0].longitude || "0",
        radius: data.location_rule[0].radius || "0",
      }
    : null;

  return {
    ckData,
    locationRule,
    loading: isLoading,
    error,
    refetch: mutate,
  };
}