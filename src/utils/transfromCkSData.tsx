import { CheckclockSettingForm } from "@/types/cksettingForm";
import { data } from "react-router-dom";

type ApiResponse = {
  data_id: number;
  worktype: string;
  worktype_id: number;
  day: string;
  min_clock_in: string;
  clock_in: string;
  max_clock_in: string;
  clock_out: string;
  max_clock_out: string;
  latitude: string | null;
  longitude: string | null;
  radius: string | null;
  created_at: string;
};

const days = [
  "monday",
  "tuesday",
  "wednesday",
  "thursday",
  "friday",
  "saturday",
  "sunday",
];

export function transformCKData(apiData: ApiResponse[]) {
  const defaultSettings = days.map((day, index) => ({
    id: (index + 1).toString(),
    data_id: 0,
    worktype_id: 0,
    minClockIn: "",
    clockIn: "",
    maxClockIn: "",
    clockOut: "",
    maxClockOut: "",
    day: day.charAt(0).toUpperCase() + day.slice(1),
  }));

  const wfo: CheckclockSettingForm[] = defaultSettings.map((setting) => ({
    ...setting,
    workType: "WFO",
    latidude: undefined,
    longitude: undefined,
    radius: undefined,
  }));

  const wfa: CheckclockSettingForm[] = defaultSettings.map((setting) => ({
    ...setting,
    workType: "WFA",
  }));

  // Update arrays with API data
  apiData.forEach((item) => {
    const dayIndex = days.indexOf(item.day.toLowerCase());
    if (dayIndex === -1) return;

    const transformed = {
      id: (dayIndex + 1).toString(),
      data_id: item.data_id,
      workType: item.worktype as "WFO" | "WFA",
      worktype_id: item.worktype_id,
      minClockIn: item.min_clock_in ? item.min_clock_in.slice(0, 5) : "--:--",
      clockIn: item.clock_in ? item.clock_in.slice(0, 5) : "--:--",
      maxClockIn: item.max_clock_in ? item.max_clock_in.slice(0, 5) : "--:--",
      clockOut: item.clock_out ? item.clock_out.slice(0, 5) : "--:--",
      maxClockOut: item.max_clock_out ? item.max_clock_out.slice(0, 5) : "--:--",
      day: item.day.charAt(0).toUpperCase() + item.day.slice(1),
      ...(item.worktype === "WFO" && {
        latidude: item.latitude ? parseFloat(item.latitude) : undefined,
        longitude: item.longitude ? parseFloat(item.longitude) : undefined,
        radius: item.radius ? parseFloat(item.radius) : undefined,
      }),
    };

    if (item.worktype === "WFO") {
      wfo[dayIndex] = transformed;
    } else {
      wfa[dayIndex] = transformed;
    }
  });

  return { wfo, wfa };
}
