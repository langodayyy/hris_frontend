export type CheckclockSetting = {
  data_id: number;
  worktype: "WFO" | "WFA";
  day: string;
  clockIn: string;
  clockOut: string;
  latidude?: string;
  longitude?: string;
  radius?: string;
  created_at: string;
};
