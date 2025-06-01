"use client";
import { useState, useEffect } from "react";
import Sidebar from "../../../components/sidebar";
import * as React from "react";
import { CheckclockOverview, columns } from "./columns";
import { DataTable } from "./data-table";
import Cookies from "js-cookie";
import { CheckclockResponse } from "@/types/checkclock";

export default function CheckclockOverviewPage() {
  const [data, setData] = useState<CheckclockOverview[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await getCheckClock();
        
        if (response.success && response.data) {
          // Transform API data to match your table structure
          const transformedData: CheckclockOverview[] = response.data.map((item: CheckclockResponse) => ({
            id: item.employee_id,
            data_id: item.data_id,
            employeeName: item.employee_name,
            position: item.position,
            date: item.date,
            clockIn: item.clock_in || "--:--",
            clockOut: item.clock_out || "--:--",
            workType: item.work_type,
            status: item.status,
            approvalStatus: item.approval_status,
            latitude: item.latitude || "-",
            longitude: item.longitude || "-",
            startDate: item.absent_start_date || "-",
            endDate: item.absent_end_date || "-",
          }));
          
          setData(transformedData);
        } else {
          setError(response.errors?.general?.[0] || "Failed to fetch data");
        }
      } catch (err) {
        setError("An error occurred while fetching data");
        console.error(err);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, []);

  if (loading) {
    return (
      <Sidebar title="Checkclock">
        <div>Loading...</div>
      </Sidebar>
    );
  }

  if (error) {
    return (
      <Sidebar title="Checkclock">
        <div>Error: {error}</div>
      </Sidebar>
    );
  }

  return (
    <Sidebar title="Checkclock">
      <div className="min-h-screen bg-white rounded-[15px] p-5 flex flex-col gap-[10px]">
        <div className="container mx-auto">
          <DataTable columns={columns} data={data} />
        </div>
      </div>
    </Sidebar>
  );
  // useEffect(() => {
  //   async function fetchData() {
  //     // Simulate additional table data for Annual Leave and Sick Leave
  //     const leaveData = Array.from({ length: 20 }, (_, i) => {
  //       const startDate = `2023-10-${String(
  //         Math.floor(Math.random() * 30) + 1
  //       ).padStart(2, "0")}`;
  //       const endDate = `2023-10-${String(
  //         Math.min(
  //           30,
  //           parseInt(startDate.split("-")[2]) +
  //             Math.floor(Math.random() * 5) +
  //             1
  //         )
  //       ).padStart(2, "0")}`;

  //       return {
  //         employeeId: i + 1,
  //         status: ["Annual Leave", "Sick Leave"][Math.floor(Math.random() * 2)],
  //         startDate,
  //         endDate,
  //       };
  //     });

  //     const dynamicData = Array.from({ length: 50 }, (_, i) => {
  //       const status = [
  //         "On Time",
  //         "Late",
  //         "Absent",
  //         "Sick Leave",
  //         "Annual Leave",
  //       ][Math.floor(Math.random() * 5)];

  //       const workType = ["WFO", "WFA"][Math.floor(Math.random() * 2)];
  //       const hasClockIn = !["Absent", "Sick Leave", "Annual Leave"].includes(
  //         status
  //       );

  //       // Find leave data for the current employee if status is Sick Leave or Annual Leave
  //       const leaveInfo = leaveData.find(
  //         (leave) => leave.employeeId === i + 1 && leave.status === status
  //       );

  //       return {
  //         id: i + 1,
  //         employeeName: `Employee Name 00 ${i + 1}`,
  //         position: ["CEO", "Manager", "HRD", "Supervisor", "OB"][
  //           Math.floor(Math.random() * 5)
  //         ],
  //         date: leaveInfo
  //           ? { startDate: leaveInfo.startDate, endDate: leaveInfo.endDate }
  //           : `2023-10-${String(Math.floor(Math.random() * 30) + 1).padStart(
  //               2,
  //               "0"
  //             )}`,
  //         clockIn: hasClockIn
  //           ? `${String(Math.floor(Math.random() * 3) + 8).padStart(2, "0")}:00`
  //           : "--:--",
  //         clockOut: hasClockIn
  //           ? `${String(Math.floor(Math.random() * 3) + 17).padStart(
  //               2,
  //               "0"
  //             )}:00`
  //           : "--:--",
  //         workType,
  //         location: hasClockIn
  //           ? ["Malang", "Jakarta", "Surabaya", "Bandung"][
  //               Math.floor(Math.random() * 4)
  //             ]
  //           : "-",
  //         address: hasClockIn ? `Address ${i + 1}` : "",
  //         latitude: hasClockIn
  //           ? parseFloat((Math.random() * 90).toFixed(6))
  //           : 0,
  //         longitude: hasClockIn
  //           ? parseFloat((Math.random() * 180).toFixed(6))
  //           : 0,
  //         status,
  //         approvalStatus: ["Sick Leave", "Annual Leave"].includes(status)
  //           ? ["Approved", "Pending", "Rejected"][Math.floor(Math.random() * 3)]
  //           : undefined,
  //       };
  //     });

  //     console.log("Leave Data:", leaveData);
  //     console.log("Dynamic Data:", dynamicData);
  //     console.log(dynamicData);
  //     setData(dynamicData);
  //   }

  //   fetchData();
  // }, []);

  // return (
  //   <Sidebar title="Checkclock">
  //     <div className="min-h-screen bg-white rounded-[15px] p-5 flex flex-col gap-[10px]">
  //       <div className="container mx-auto">
  //         <DataTable columns={columns} data={data} />
  //       </div>
  //     </div>
  //   </Sidebar>
  // );
}

export async function getCheckClock() {
  try {
    const userCookie = Cookies.get("token");
    if (userCookie) {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/check-clocks`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${userCookie}`,
          },
        }
      );

      if (!response.ok) {
        // If the response is not OK, parse the error response
        const errorData = await response.json();
        return { success: false, errors: errorData.errors };
      }

      // Parse and return the success response
      const responseData = await response.json();
      return { success: true, data: responseData };
    } else {
      return {
        success: false,
        errors: { general: ["User token not found"] },
      };
    }
  } catch (error: any) {
    // Handle network or other unexpected errors
    return {
      success: false,
      errors: { general: [error.message || "An unexpected error occurred"] },
    };
  }
}
