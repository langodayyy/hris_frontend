"use client";
import { useState, useEffect } from "react";
import Sidebar from "../../../components/sidebar";
import * as React from "react";
import { CheckclockOverview, columns } from "./columns";
import { DataTable } from "./data-table";
import Cookies from "js-cookie";

export default function CheckclockOverviewPage() {
  const [data, setData] = useState<CheckclockOverview[]>([]);

  useEffect(() => {
    async function fetchData() {
      // const dynamicData = await getCheckClock();
      // // if (response.success) {
      // //   setData(response.data);
      // // } else {
      // //   console.error("Error fetching data:", response.errors);
      // // }
      // //     const dynamicData = Array.from({ length: 50 }, (_, i) => ({
      // //       id: i + 1,
      // //       employeeName: `Employee Name 00 ${i + 1}`,
      // //       position: ["CEO", "Manager", "HRD", "Supervisor", "OB"][
      // //         Math.floor(Math.random() * 5)
      // //       ],
      // //       date: `2023-10-${String(Math.floor(Math.random() * 30) + 1).padStart(
      // //         2,
      // //         "0"
      // //       )}`,
      // //       clockIn: `${String(Math.floor(Math.random() * 3) + 8).padStart(
      // //         2,
      // //         "0"
      // //       )}:00`,
      // //       clockOut: `${String(Math.floor(Math.random() * 3) + 17).padStart(
      // //         2,
      // //         "0"
      // //       )}:00`,
      // //     workType: ["WFO", "WFH"][Math.floor(Math.random() * 2)],
      // //     status: ["On Time", "Late", "Absent", "Sick Leave", "Anual Leave"][
      // //       Math.floor(Math.random() * 3)
      // //     ],
      // //     approvalStatus: ["Approved", "Pending", "Rejected"][
      // //       Math.floor(Math.random() * 3)
      // //     ],
      // //   })
      // // );

      // console.log("lmdmds",dynamicData.data);
      // setData(dynamicData.data);

      const dynamicData = Array.from({ length: 50 }, (_, i) => ({
        id: i + 1,
        employeeName: `Employee Name 00 ${i + 1}`,
        position: ["CEO", "Manager", "HRD", "Supervisor", "OB"][
          Math.floor(Math.random() * 5)
        ],
        date: `2023-10-${String(Math.floor(Math.random() * 30) + 1).padStart(
          2,
          "0"
        )}`,
        clockIn: `${String(Math.floor(Math.random() * 3) + 8).padStart(
          2,
          "0"
        )}:00`,
        clockOut: `${String(Math.floor(Math.random() * 3) + 17).padStart(
          2,
          "0"
        )}:00`,
        workType: ["WFO", "WFH"][Math.floor(Math.random() * 2)],
        status: ["On Time", "Late", "Absent", "Sick Leave", "Anual Leave"][
          Math.floor(Math.random() * 3)
        ],
        approvalStatus: ["Approved", "Pending", "Rejected"][
          Math.floor(Math.random() * 3)
        ],
      }));
      console.log(dynamicData);
      setData(dynamicData);
    }

    fetchData();
  }, []);

  return (
    <Sidebar title="Checkclock">
      <div className="min-h-screen bg-white rounded-[15px] p-[20px] flex flex-col gap-[10px]">
        <div className="container mx-auto">
          <DataTable columns={columns} data={data} />
        </div>
      </div>
    </Sidebar>
  );
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
