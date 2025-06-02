export type CheckclockResponse = {
  data_id: string;
  employee_id: number;
  employee_name: string;
  position: string;
  date: string;
  clock_in: string | null;
  clock_out: string | null;
  work_type: "WFO" | "WFA";
  status: string;
  approval_status: string;
  latitude?: number;
  longitude?: number;
  absent_start_date: string | null;
  absent_end_date: string | null;
};
