//overtime data dummy

export const employeesSample = [
  { id_employee: "EMP0001", Name: "Mumtaz", position: "Manager"},
  { id_employee: "EMP0002", Name: "Kemal", position: "Manager" },
  { id_employee: "EMP0003", Name: "Lucky", position: "Manager" },
  { id_employee: "EMP0004", Name: "Silfi", position: "Manager" },
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


export const overtimeSettingSample= [
  {
    id: 1,
    name: "Weekday OT Government",
    type: "Government Regulation",
    category: "Regular Weekday",
    work_day: 5,
    calculation: null,
    rate: null,
    formula: "Hour 1: 1.5 × (basic salary / 173)\nHour 2 and above: 2 × (basic salary / 173)",
  },
  {
    id: 2,
    name: "Holiday OT Government (6 days)",
    type: "Government Regulation",
    category: "Holiday",
    work_day: 6,
    calculation: null,
    rate: null,
    formula:
      "Hour 1–7: 2 × (basic salary / 173)\nHour 8: 3 × (basic salary / 173)\nHour 9–10: 4 × (basic salary / 173)",
  },
  {
    id: 3,
    name: "Short Day Holiday OT",
    type: "Government Regulation",
    category: "Shortday Holiday",
    work_day: 6,
    calculation: null,
    rate: null,
    formula:
      "    Hour 1–5: 2 × (basic salary / 173)\nHour 6: 3 × (basic salary / 173)\nHour 7–8: 4 × (basic salary / 173)",
  },
  {
    id: 4,
    name: "Holiday OT Government (5 days)",
    type: "Government Regulation",
    category: "Holiday",
    work_day: 5,
    calculation: null,
    rate: null,
    formula:
      "Hour 1–8: 2 × (basic salary / 173)\nHour 9: 3 × (basic salary / 173)\nHour 10–11: 4 × (basic salary / 173)",
  },
  {
    id: 5,
    name: "Weekday OT Flat",
    type: "Flat",
    category: "Regular Weekday",
    calculation: 1,
    work_day: null,
    rate: 150000,
    formula: "1 hour × IDR 150000",
  },
  {
    id: 6,
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

export function generateDummyOvertimeData(count: number) {
  const names = ["Mumtaz", "Kemal", "Lucky", "Silfi"];
  const position = ["Manager", "Staff", "Supervisor", "Admin"];
  const overtimeTypes = [
    { name: "Weekday Overtime", rate: 400000 },
    { name: "Weekend Overtime", rate: 150000 },
    { name: "Holiday Overtime", rate: 230000 },
  ];

  const approvalStatus = ["Pending", "Approved", "Rejected"];
  const data = [];

  for (let i = 1; i <= count; i++) {
    const randomNameIndex = Math.floor(Math.random() * names.length);
    const randomPositionIndex = Math.floor(Math.random() * position.length);
    const randomOT =
      overtimeTypes[Math.floor(Math.random() * overtimeTypes.length)];
    const randomHour = (Math.floor(Math.random() * 3) + 1) * 2;
    const date = new Date(2025, 4, (i % 31) + 1).toLocaleDateString("en-GB");
    const randomStatus =
      approvalStatus[Math.floor(Math.random() * approvalStatus.length)];

    data.push({
      id: `OVT${i.toString().padStart(4, "0")}`,
      name: names[randomNameIndex],
      position: position[randomPositionIndex],
      overtimeName: randomOT.name,
      date: date,
      hour: randomHour,
      ovt_payroll: randomHour * randomOT.rate,
      approvalStatus: randomStatus,
    });
  }
  return data;
}
