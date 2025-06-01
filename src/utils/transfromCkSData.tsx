import { data } from "react-router-dom";

type ApiResponse = {
  data_id: number;
  worktype: string;
  day: string;
  clock_in: string;
  clock_out: string;
  latitude: string | null;
  longitude: string | null;
  radius: string | null;
  created_at: string;
};

export type CheckclockSetting = {
  id: string;
  data_id: number;
  workType: "WFO" | "WFA";
  clockIn: string;
  clockOut: string;
  day: string;
  latidude?: number;
  longitude?: number;
  radius?: number;
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
    clockIn: "",
    clockOut: "",
    day: day.charAt(0).toUpperCase() + day.slice(1),
  }));

  const wfo: CheckclockSetting[] = defaultSettings.map((setting) => ({
    ...setting,
    workType: "WFO",
    latidude: undefined,
    longitude: undefined,
    radius: undefined,
  }));

  const wfa: CheckclockSetting[] = defaultSettings.map((setting) => ({
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
      clockIn: item.clock_in.slice(0, 5),
      clockOut: item.clock_out.slice(0, 5),
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
