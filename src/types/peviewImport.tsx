export type EmployeeData = {
  id: number | null;
  user_id: number | null;
  ck_setting_id: number | null;
  company_id: string | null;
  employee_id: string | null;
  nik: string | null;
  first_name: string | null;
  last_name: string | null;
  position_id: string | null;
  position_name: string | null;
  department_name: string | null;
//   department_id: number | null;
  address: string | null;
  email: string | null;
  phone: string | null;
  birth_place: string | null;
  birth_date: string | null;
  education: string | null;
  religion: string | null;
  marital_status: string | null;
  citizenship: string | null;
  gender: string | null;
  blood_type: string | null;
  salary: number | null;
  contract_type: string | null;
  contract_end: string | null;
  bank_code: string | null;
  account_number: string | null;
  join_date: string | null;
  exit_date: string | null | null;
  errors?: string;
  employee_photo: string | null;
  employee_status: string | null;
  created_at: string | null;
  updated_at: string | null;
}

export type PreviewImport = {
  total_rows: number;
  valid_rows_count: number;
  invalid_rows_count: number;
  valid_rows: EmployeeData[];
  invalid_rows: EmployeeData[];
}
