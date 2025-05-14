//overtime data dummy

export const employeesSample = [
  { id_employee: "EMP0001", Name: "Mumtaz", position: "Manager" },
  { id_employee: "EMP0002", Name: "Kemal", position: "Manager" },
  { id_employee: "EMP0003", Name: "Lucky", position: "Manager" },
  { id_employee: "EMP0004", Name: "Silfi", position: "Manager" },
];

export const overtimeSettingsDummy = [
  {
    id: 1,
    name: "Weekday Overtime",
    type: "Government Regulation",
    category: "Weekday",
    calculation: `
    Hour 1: 1.5 × (basicSalary / 173)
    Hour 2 and above: 2 × (basicSalary / 173)
    `.trim(),
    rate: "",
  },
  {
    id: 2,
    name: "Holiday Overtime",
    type: "Government Regulation",
    category: "Holiday",
    calculation: `
    Hour 1–7: 2 × (basicSalary / 173)
    Hour 8: 3 × (basicSalary / 173)
    Hour 9–10: 4 × (basicSalary / 173)
    `.trim(),
    rate: "",
  },
  {
    id: 3,
    name: "Shortday Overtime",
    type: "Government Regulation",
    category: "Shortday",
    calculation: `
    Hour 1–5: 2 × (basicSalary / 173)
    Hour 6: 3 × (basicSalary / 173)
    Hour 7–8: 4 × (basicSalary / 173)
    `.trim(),
    rate: "",
  },
  {
    id: 4,
    name: "Weekend Overtime",
    type: "Company Regulation",
    category: "Weekday",
    calculation: "1.5 × (basicSalary / 173) per hour",
    rate: "",
  },
  {
    id: 5,
    name: "Holiday Overtime",
    type: "Company Regulation",
    category: "Holiday",
    calculation: "2.5 × (basicSalary / 173) per hour",
    rate: "",
  },
  {
    id: 6,
    name: "Flat Overtime",
    type: "Flat",
    category: "Weekday",
    calculation: "Per 1 hour",
    rate: 200000,
  },
];


export const overtimeSettingSample = [
  {
    id_ovt_setting: "OTS001",
    name: "Weekday Overtime",
    type: "Goverment Regulation",
    calculation: 2,
    rate: 400000,
  },
  {
    id_ovt_setting: "OTS002",
    name: "Weekend Overtime",
    type: "Company Regulation",
    calculation: 1,
    rate: 150000,
  },
  {
    id_ovt_setting: "OTS003",
    name: "Holiday Overtime",
    type: "Company Regulation",
    calculation: 1,
    rate: 230000,
  },
];

export const overtimeType = [
  { id: "1", name: "Government Regulation", description: "Regulasi pemerintah" },
  { id: "2", name: "Company Regulation", description: "Regulasi internal perusahaan" },
  { id: "3", name: "Flat", description: "Tarif tetap tanpa perhitungan" },
];

export const overtimecategory = [
  {
    id: "1",
    name: "Weekday",
    description: "Lembur hari kerja",
  },
  {
    id: "2",
    name: "Short Weekday",
    description: "Lembur akhir pekan",
  },
  {
    id: "3",
    name: "Holiday",
    description: "Lembur hari libur nasional",
  },
];

export const overtimeFormula = [
  {
    id: 1,
    name: "Formula 1",
    type: "Government Regulation",
    category: "Weekday",
    formula: " "
  }
]

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
