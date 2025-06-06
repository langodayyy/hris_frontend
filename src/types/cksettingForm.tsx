export type CheckclockSettingForm = {
  id: string;
  data_id: number;
  workType: "WFO" | "WFA";
  worktype_id: number;
  clockIn: string;
  clockOut: string;
  day: string;
  latidude?: number;
  longitude?: number;
  radius?: number;
};