//overtime data dummy

export const employeesSample = [
  { id_employee: "EMP0001", Name: "Mumtaz", position: "Manager" },
  { id_employee: "EMP0002", Name: "Kemal", position: "Manager" },
  { id_employee: "EMP0003", Name: "Lucky", position: "Manager" },
  { id_employee: "EMP0004", Name: "Silfi", position: "Manager" },
];

export const overtimeSettingSample = [
  {
    id_ovt_setting: "OTS001",
    name: "Weekday Overtime",
    type: "Goverment Regulation",
    calculation: "2",
    rate: "400000",
  },
  {
    id_ovt_setting: "OTS002",
    name: "Weekend Overtime",
    type: "Company Regulation",
    calculation: "1",
    rate: "150000",
  },
  {
    id_ovt_setting: "OTS003",
    name: "Holiday Overtime",
    type: "Company Regulation",
    calculation: "1",
    rate: "230000",
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
