export type DashboardResponse = {
  employeeCount: EmployeeCount[];
  approvalStatus: ApprovalStatus[];
  attendancePercentage: AttendancePercentage[];
  employeeAge: EmployeeAge[];
  lateEmployee: LateEmployee[];
  employeeWorkStatus: EmployeeWorkStatus[];
  employeeGender: EmployeeGender[];
  employeeMaritalStatus: EmployeeMaritalStatus[];
  employeeReligion: EmployeeReligion[];
  employeeWorkYear: EmployeeWorkYear[];
};

export type EmployeeCount = {
  "Total Employee": number;
  "New Employee": number;
  "Active Employee": number;
  "Resigned Employee": number;
};

export type ApprovalStatus = {
  Approved: number;
  Waiting: number;
  Rejected: number;
};

export type AttendancePercentage = {
  "On Time": number;
  Late: number;
  Absent: number;
};

export type EmployeeAge = {
  "21-30": number;
  "31-40": number;
  "41-50": number;
  "51++": number;
};

export type LateEmployee = {
  Name: string;
  Time: string; // Format "hh:mm"
  Position: string;
};

export type EmployeeWorkStatus = {
  Permanent: number;
  Internship: number;
  "Part-time": number;
  Outsource: number;
};

export type EmployeeGender = {
  Male: number;
  Female: number;
};

export type EmployeeMaritalStatus = {
  Single: number;
  Married: number;
  Divorced: number;
  Widowed: number;
};

export type EmployeeReligion = {
  Islam: number;
  Hinduism: number;
  Buddhism: number;
  Christianity: number;
  Confucianism: number;
  Other: number;
};

export type EmployeeWorkYear = {
  "0-1": number;
  "2-5": number;
  "6++": number;
};
