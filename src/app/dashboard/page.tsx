"use client";

import Sidebar from "@/components/sidebar";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ApprovalCheckClock } from "@/components/custom/dashboardChart/ApprovalCheckClock";
import { Gender } from "@/components/custom/dashboardChart/Gender";
import { MaritalStatus } from "@/components/custom/dashboardChart/MaritalStatus";
import { AttendaceStatusToday } from "@/components/custom/dashboardChart/AttendanceStatusToday";
import { Age } from "@/components/custom/dashboardChart/Age";
import { Religion } from "@/components/custom/dashboardChart/Religion";
import { YearsofWorks } from "@/components/custom/dashboardChart/YearsofWorks";
import { CurrentEmployee } from "@/components/custom/dashboardChart/CurrentEmployee";
import { EmployeeWorkStatus } from "@/components/custom/dashboardChart/EmployeeWorkStatus";
import { CheckClockListToday } from "@/components/custom/dashboardChart/CheckClockListToday";
import { OvertimeApprovalToday } from "@/components/custom/dashboardChart/OvertimeApprovalToday";

export default function Dashboard() {
  return (
    <Sidebar title="Dashboard">
      {/* Employee Data Number */}
      <div className="grid grid-cols-4 gap-[30px] pb-[30px]">
        {/* Card Total Employee */}
        <Card className="col-span-1 py-0 gap-0">
          <CardContent className="py-[20px] px-[20px]">
            <div className="flex flex-row gap-[10px] font-medium text-base pb-[10px]">
              {/* Icon */}
              <svg
                width="30"
                height="30"
                viewBox="0 0 30 30"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M3.75 26.25V23.75C3.75 22.4239 4.27678 21.1521 5.21447 20.2145C6.15215 19.2768 7.42392 18.75 8.75 18.75H13.75C15.0761 18.75 16.3479 19.2768 17.2855 20.2145C18.2232 21.1521 18.75 22.4239 18.75 23.75V26.25M20 3.91251C21.0755 4.18788 22.0288 4.81338 22.7095 5.69039C23.3903 6.56741 23.7598 7.64604 23.7598 8.75626C23.7598 9.86647 23.3903 10.9451 22.7095 11.8221C22.0288 12.6991 21.0755 13.3246 20 13.6M26.25 26.25V23.75C26.2437 22.6464 25.8724 21.576 25.1941 20.7055C24.5158 19.835 23.5685 19.2134 22.5 18.9375M6.25 8.75C6.25 10.0761 6.77678 11.3479 7.71447 12.2855C8.65215 13.2232 9.92392 13.75 11.25 13.75C12.5761 13.75 13.8479 13.2232 14.7855 12.2855C15.7232 11.3479 16.25 10.0761 16.25 8.75C16.25 7.42392 15.7232 6.15215 14.7855 5.21447C13.8479 4.27678 12.5761 3.75 11.25 3.75C9.92392 3.75 8.65215 4.27678 7.71447 5.21447C6.77678 6.15215 6.25 7.42392 6.25 8.75Z"
                  stroke="black"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>

              {/* Card Title */}
              <div className="w-full">Total Employee</div>
            </div>

            {/* use api and query to generate the number of employee */}
            <div className="font-bold text-4xl">201</div>
          </CardContent>
          <CardFooter className="py-[10px] px-[20px] border-t-2 border-t-[#d9d9d9]">
            {/* use api and query to generate the date */}
            <div className="font-semibold text-sm text-[#acacac]">
              Update: 21 April 2025
            </div>
          </CardFooter>
        </Card>

        {/* Card New Employee */}
        <Card className="col-span-1 py-0 gap-0">
          <CardContent className="py-[20px] px-[20px]">
            <div className="flex flex-row gap-[10px] font-medium text-base pb-[10px]">
              {/* Icon */}
              <svg
                width="31"
                height="30"
                viewBox="0 0 31 30"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M20.25 23.75H27.75M24 20V27.5M7.75 26.25V23.75C7.75 22.4239 8.27678 21.1521 9.21447 20.2145C10.1521 19.2768 11.4239 18.75 12.75 18.75H17.75M10.25 8.75C10.25 10.0761 10.7768 11.3479 11.7145 12.2855C12.6521 13.2232 13.9239 13.75 15.25 13.75C16.5761 13.75 17.8479 13.2232 18.7855 12.2855C19.7232 11.3479 20.25 10.0761 20.25 8.75C20.25 7.42392 19.7232 6.15215 18.7855 5.21447C17.8479 4.27678 16.5761 3.75 15.25 3.75C13.9239 3.75 12.6521 4.27678 11.7145 5.21447C10.7768 6.15215 10.25 7.42392 10.25 8.75Z"
                  stroke="black"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>

              {/* Card Title */}
              <div className="w-full">New Employee</div>
            </div>

            {/* use api and query to generate the number of employee */}
            <div className="font-bold text-4xl">12</div>
          </CardContent>
          <CardFooter className="py-[10px] px-[20px] border-t-2 border-t-[#d9d9d9]">
            {/* use api and query to generate the date */}
            <div className="font-semibold text-sm text-[#acacac]">
              Update: 21 April 2025
            </div>
          </CardFooter>
        </Card>

        {/* Card Active Employee */}
        <Card className="col-span-1 py-0 gap-0">
          <CardContent className="py-[20px] px-[20px]">
            <div className="flex flex-row gap-[10px] font-medium text-base pb-[10px]">
              {/* Icon */}
              <svg
                width="31"
                height="30"
                viewBox="0 0 31 30"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M8 26.25V23.75C8 22.4239 8.52678 21.1521 9.46447 20.2145C10.4021 19.2768 11.6739 18.75 13 18.75H18M19.25 23.75L21.75 26.25L26.75 21.25M10.5 8.75C10.5 10.0761 11.0268 11.3479 11.9645 12.2855C12.9021 13.2232 14.1739 13.75 15.5 13.75C16.8261 13.75 18.0979 13.2232 19.0355 12.2855C19.9732 11.3479 20.5 10.0761 20.5 8.75C20.5 7.42392 19.9732 6.15215 19.0355 5.21447C18.0979 4.27678 16.8261 3.75 15.5 3.75C14.1739 3.75 12.9021 4.27678 11.9645 5.21447C11.0268 6.15215 10.5 7.42392 10.5 8.75Z"
                  stroke="black"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>

              {/* Card Title */}
              <div className="w-full">Active Employee</div>
            </div>

            {/* use api and query to generate the number of employee */}
            <div className="font-bold text-4xl">201</div>
          </CardContent>
          <CardFooter className="py-[10px] px-[20px] border-t-2 border-t-[#d9d9d9]">
            {/* use api and query to generate the date */}
            <div className="font-semibold text-sm text-[#acacac]">
              Update: 21 April 2025
            </div>
          </CardFooter>
        </Card>

        {/* Card Resigned Employee */}
        <Card className="col-span-1 py-0 gap-0">
          <CardContent className="py-[20px] px-[20px]">
            <div className="flex flex-row gap-[10px] font-medium text-base pb-[10px]">
              {/* Icon */}
              <svg
                width="31"
                height="30"
                viewBox="0 0 31 30"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M8.25 26.25V23.75C8.25 22.4239 8.77678 21.1521 9.71447 20.2145C10.6521 19.2768 11.9239 18.75 13.25 18.75H17.625M28.25 27.5L22 21.25M22 27.5L28.25 21.25M10.75 8.75C10.75 10.0761 11.2768 11.3479 12.2145 12.2855C13.1521 13.2232 14.4239 13.75 15.75 13.75C17.0761 13.75 18.3479 13.2232 19.2855 12.2855C20.2232 11.3479 20.75 10.0761 20.75 8.75C20.75 7.42392 20.2232 6.15215 19.2855 5.21447C18.3479 4.27678 17.0761 3.75 15.75 3.75C14.4239 3.75 13.1521 4.27678 12.2145 5.21447C11.2768 6.15215 10.75 7.42392 10.75 8.75Z"
                  stroke="black"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>

              {/* Card Title */}
              <div className="w-full">Resigned Employee</div>
            </div>

            {/* use api and query to generate the number of employee */}
            <div className="font-bold text-4xl">13</div>
          </CardContent>
          <CardFooter className="py-[10px] px-[20px] border-t-2 border-t-[#d9d9d9]">
            {/* use api and query to generate the date */}
            <div className="font-semibold text-sm text-[#acacac]">
              Update: 21 April 2025
            </div>
          </CardFooter>
        </Card>
      </div>
      {/* Chart */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-[30px]">
        <div className="flex flex-col cols-span-1 gap-y-[30px]">
          {/* pie chart checkclock approval  */}
          <ApprovalCheckClock></ApprovalCheckClock>

          {/* pie chart attendance status today */}
          <AttendaceStatusToday></AttendaceStatusToday>

          {/* bar chart horizontal current number of employee (new, active, resigned)*/}
          <CurrentEmployee></CurrentEmployee>

          {/* pie chart gender */}
          <Gender></Gender>

          {/* pie chart maritial status  */}
          <MaritalStatus></MaritalStatus>

          {/* pie chart years of works */}
          <YearsofWorks></YearsofWorks>
        </div>
        <div className="flex flex-col cols-span-1 gap-y-[30px]">
          {/* table late, absence, leave employee today  */}
          <CheckClockListToday></CheckClockListToday>

          {/* pie chart overtime approval today  */}
          <OvertimeApprovalToday></OvertimeApprovalToday>

          {/* bar chart vertical employee type status (magang, tetap, pkwt, kontrak) */}
          <EmployeeWorkStatus></EmployeeWorkStatus>

          {/* pie chart age */}
          <Age></Age>
          
          {/* pie chart religion */}
          <Religion></Religion>

        </div>
      </div>
    </Sidebar>
  );
}
