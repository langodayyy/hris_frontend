"use client";
import { useState, useEffect } from "react";
import Sidebar from "../../../components/sidebar";
import * as React from "react";
import { CheckclockOverview, columns } from "./columns"
import { DataTable } from "./data-table"


export default function CheckclockOverviewPage() {
  const [data, setData] = useState<CheckclockOverview[]>([]);

  useEffect(() => {
    async function fetchData() {
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