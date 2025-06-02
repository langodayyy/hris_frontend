export type CheckclockSetting = {
  data_id: number;
  worktype: "WFO" | "WFA";
  worktype_id: number;
  day: string;
  clockIn: string;
  clockOut: string;
  latidude?: string;
  longitude?: string;
  radius?: string;
  created_at: string;
};
