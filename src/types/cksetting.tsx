export type CheckclockSetting = {
  data_id: number;
  worktype: "WFO" | "WFA";
  worktype_id: number;
  day: string;
  minClockIn: string;
  clockIn: string;
  maxClockIn: string;
  clockOut: string;
  maxClockOut: string;
  latidude?: string;
  longitude?: string;
  radius?: string;
  created_at: string;
};
