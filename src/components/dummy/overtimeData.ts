//overtime data dummy

export const employeesSample = [
  { id_emp: "EMP0001", name: "Silfi", position: "Staff", monthly_salary: 3500000},
  { id_emp: "EMP0002", name: "Dani", position: "Supervisor", monthly_salary:  4200000},
  { id_emp: "EMP0003", name: "Iqbal", position: "Manager", monthly_salary:  3750000},
  { id_emp: "EMP0004", name: "Ageng", position: "Staff", monthly_salary:  4055000},
  { id_emp: "EMP0005", name: "Rina", position: "Supervisor", monthly_salary:  4200000},
  { id_emp: "EMP0006", name: "Andi", position: "Staff", monthly_salary:  3500000},
  { id_emp: "EMP0007", name: "Maya", position: "Manager", monthly_salary:  4200000},
  { id_emp: "EMP0008", name: "Budi", position: "Staff", monthly_salary:  3500000},
  { id_emp: "EMP0009", name: "Nina", position: "Supervisor", monthly_salary:  4200000},
  { id_emp: "EMP0010", name: "Eka", position: "Staff", monthly_salary:  3500000},
];

export const governmentFormula = [
  // from_hour tuh range mulai ya jadi dari jam ke from_hour
  // to_hour tuh range sampe ya jadi dari jam ke from_hour sampai jam ke to_hour
  // mungkin ini bisa jadi gambaran di db nanti, mungkin pake id categorinya, kalo masuk akal ya

  {
    id: 1,
    category: "Regular Weekday",
    work_week_duration: null,
    from_hour: 1,
    to_hour: 1,
    multiplier: 1.5,
    description: "Jam pertama lembur hari kerja",
  },
  {
    id: 2,
    category: "Regular Weekday",
    work_week_duration: null,
    from_hour: 2,
    to_hour: 3,
    multiplier: 2,
    description: "Jam ke-2 dst lembur hari kerja",
  },
  {
    id: 3,
    category: "Holiday",
    work_week_duration: 6,
    from_hour: 1,
    to_hour: 7,
    multiplier: 2,
    description: "Jam 1-7 hari libur (6 hari kerja)",
  },
  {
    id: 4,
    category: "Holiday",
    work_week_duration: 6,
    from_hour: 8,
    to_hour: 8,
    multiplier: 3,
    description: "Jam ke-8 hari libur (6 hari kerja)",
  },
  {
    id: 5,
    category: "Holiday",
    work_week_duration: 6,
    from_hour: 9,
    to_hour: 10,
    multiplier: 4,
    description: "Jam 9-10 hari libur (6 hari kerja)",
  },
  {
    id: 6,
    category: "Holiday",
    work_week_duration: 5,
    from_hour: 1,
    to_hour: 8,
    multiplier: 2,
    description: "Jam 1-8 hari libur (5 hari kerja)",
  },
  {
    id: 7,
    category: "Holiday",
    work_week_duration: 5,
    from_hour: 9,
    to_hour: 9,
    multiplier: 3,
    description: "Jam ke-9 hari libur (5 hari kerja)",
  },
  {
    id: 8,
    category: "Holiday",
    work_week_duration: 5,
    from_hour: 10,
    to_hour: 11,
    multiplier: 4,
    description: "Jam 10-11 hari libur (5 hari kerja)",
  },
  {
    id: 9,
    category: "Shortday Holiday",
    work_week_duration: null,
    from_hour: 1,
    to_hour: 5,
    multiplier: 2,
    description: "Jam 1-5 hari libur pendek",
  },
  {
    id: 10,
    category: "Shortday Holiday",
    work_week_duration: null,
    from_hour: 6,
    to_hour: 6,
    multiplier: 3,
    description: "Jam ke-6 hari libur pendek",
  },
  {
    id: 11,
    category: "Shortday Holiday",
    work_week_duration: null,
    from_hour: 7,
    to_hour: 8,
    multiplier: 4,
    description: "Jam ke-7-8 hari libur pendek",
  },
];

export const overtimeDummy = [
  {
    id: "OVT0001",
    id_emp: "EMP0001",
    name: "Silfi",
    position: "Staff",
    overtime_name: "Weekday OT Government",
    overtime_type: "Government Regulation",
    overtime_category: "Regular Weekday",
    date: "2025-05-14",
    hour: 3,
    ovt_payroll: 60000,
    approval_status: "Approved",
  },
  {
    id: "OVT0002",
    id_emp: "EMP0002",
    name: "Dani",
    position: "Supervisor",
    overtime_name: "Holiday OT Flat",
    overtime_type: "Flat",
    overtime_category: "Holiday",
    date: "2025-05-12",
    hour: 4,
    ovt_payroll: 100000,
    approval_status: "Pending",
  },
  {
    id: "OVT0003",
    id_emp: "EMP0003",
    name: "Iqbal",
    position: "Manager",
    overtime_name: "Weekday OT Government",
    overtime_type: "Government Regulation",
    overtime_category: "Regular Weekday",
    date: "2025-05-11",
    hour: 2,
    ovt_payroll: 40000,
    approval_status: "Approved",
  },
  {
    id: "OVT0004",
    id_emp: "EMP0004",
    name: "Ageng",
    position: "Staff",
    overtime_name: "Holiday OT Flat",
    overtime_category: "Holiday",
    overtime_type: "Flat",
    date: "2025-05-10",
    hour: 5,
    ovt_payroll: 125000,
    approval_status: "Rejected",
  },
  {
    id: "OVT0005",
    id_emp: "EMP0005",
    name: "Rina",
    position: "Supervisor",
    overtime_name: "Weekday OT Government",
    overtime_type: "Government Regulation",
    overtime_category: "Regular Weekday",
    date: "2025-05-09",
    hour: 1,
    ovt_payroll: 20000,
    approval_status: "Pending",
  },
  {
    id: "OVT0006",
    id_emp: "EMP0006",
    name: "Andi",
    position: "Staff",
    overtime_name: "Holiday OT Flat",
    overtime_category: "Holiday",
    overtime_type: "Flat",
    date: "2025-05-08",
    hour: 6,
    ovt_payroll: 150000,
    approval_status: "Approved",
  },
  {
    id: "OVT0007",
    id_emp: "EMP0007",
    name: "Maya",
    position: "Manager",
    overtime_name: "Weekday OT Government",
    overtime_type: "Government Regulation",
    overtime_category: "Regular Weekday",
    date: "2025-05-07",
    hour: 2,
    ovt_payroll: 40000,
    approval_status: "Approved",
  },
  {
    id: "OVT0008",
    id_emp: "EMP0008",
    name: "Budi",
    position: "Staff",
    overtime_name: "Holiday OT Flat",
    overtime_category: "Holiday",
    overtime_type: "Flat",
    date: "2025-05-06",
    hour: 3,
    ovt_payroll: 75000,
    approval_status: "Pending",
  },
  {
    id: "OVT0009",
    id_emp: "EMP0009",
    name: "Nina",
    position: "Supervisor",
    overtime_name: "Weekday OT Government",
    overtime_type: "Government Regulation",
    overtime_category: "Regular Weekday",
    date: "2025-05-05",
    hour: 4,
    ovt_payroll: 80000,
    approval_status: "Rejected",
  },
  {
    id: "OVT0010",
    id_emp: "EMP0010",
    name: "Eka",
    position: "Staff",
    overtime_name: "Holiday OT Flat",
    overtime_category: "Holiday",
    overtime_type: "Flat",
    date: "2025-05-04",
    hour: 2,
    ovt_payroll: 50000,
    approval_status: "Approved",
  },
];

export const overtimeSettingSample= [
  {
    id: "1",
    name: "Weekday OT Government",
    type: "Government Regulation",
    category: "Regular Weekday",
    work_day: 5,
    calculation: null,
    rate: null,
    formula: "Hour 1: 1.5 × (monthly salary / 173)\nHour 2 and above: 2 × (monthly salary / 173)",
  },
  {
    id: "2",
    name: "Holiday OT Government (6 days)",
    type: "Government Regulation",
    category: "Holiday",
    work_day: 6,
    calculation: null,
    rate: null,
    formula:
      "Hour 1–7: 2 × (monthly salary / 173)\nHour 8: 3 × (monthly salary / 173)\nHour 9–10: 4 × (monthly salary / 173)",
  },
  {
    id: "3",
    name: "Short Day Holiday OT",
    type: "Government Regulation",
    category: "Shortday Holiday",
    work_day: 6,
    calculation: null,
    rate: null,
    formula:
      "    Hour 1–5: 2 × (monthly salary / 173)\nHour 6: 3 × (monthly salary / 173)\nHour 7–8: 4 × (monthly salary / 173)",
  },
  {
    id: "4",
    name: "Holiday OT Government (5 days)",
    type: "Government Regulation",
    category: "Holiday",
    work_day: 5,
    calculation: null,
    rate: null,
    formula:
      "Hour 1–8: 2 × (monthly salary / 173)\nHour 9: 3 × (monthly salary / 173)\nHour 10–11: 4 × (monthly salary / 173)",
  },
  {
    id: "5",
    name: "Weekday OT Flat",
    type: "Flat",
    category: "Regular Weekday",
    calculation: 1,
    work_day: null,
    rate: 150000,
    formula: "1 hour × IDR 150000",
  },
  {
    id: "6",
    name: "Holiday OT Flat",
    type: "Flat",
    category: "Regular Weekday",
    calculation: 2,
    work_day: null,
    rate: 200000,
    formula: "2 hour × IDR 200000",
  },
];

export const overtimeType = [
  {
    id: "1",
    name: "Government Regulation",
    description: "Regulasi pemerintah",
  },
  { id: "2", name: "Flat", description: "Tarif tetap tanpa perhitungan" },
];

export const overtimecategory = [
  {
    id: "1",
    name: "Regular Weekday",
    description: "Lembur hari kerja",
  },
  {
    id: "2",
    name: "Shortday Holiday",
    description: "Lembur di hari kerja pendek",
  },
  {
    id: "3",
    name: "Holiday",
    description: "Lembur hari libur nasional",
  },
];


