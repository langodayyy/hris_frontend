"use client";

import { useState } from "react";
import Sidebar from "@/components/sidebar";
import { DataTable } from "./data-table";
import { checkclockSetting, wfoColumns, wfaColumns } from "./column";

export default function CheckclockSettingPage() {
  const [selectedWorkType, setSelectedWorkType] = useState<"WFO" | "WFA">(
    "WFO"
  );

  const wfo: checkclockSetting[] = [
    {
      id: "1",
      workType: "WFO",
      clockIn: "08:00",
      clockOut: "17:00",
      day: "Monday",
      latidude: "-6.2",
      longitude: "106.8",
      radius: "50",
    },
    {
      id: "2",
      workType: "WFO",
      clockIn: "08:00",
      clockOut: "17:00",
      day: "Tuesday",
      latidude: "-6.2",
      longitude: "106.8",
      radius: "50",
    },
    {
      id: "3",
      workType: "WFO",
      clockIn: "08:00",
      clockOut: "17:00",
      day: "Wednesday",
      latidude: "-6.2",
      longitude: "106.8",
      radius: "50",
    },
    {
      id: "4",
      workType: "WFO",
      clockIn: "08:00",
      clockOut: "17:00",
      day: "Thursday",
      latidude: "-6.2",
      longitude: "106.8",
      radius: "50",
    },
    {
      id: "5",
      workType: "WFO",
      clockIn: "08:00",
      clockOut: "17:00",
      day: "Friday",
      latidude: "-6.2",
      longitude: "106.8",
      radius: "50",
    },
    {
      id: "6",
      workType: "WFO",
      clockIn: "",
      clockOut: "",
      day: "Saturday",
      latidude: "",
      longitude: "",
      radius: "",
    },
    {
      id: "7",
      workType: "WFO",
      clockIn: "",
      clockOut: "",
      day: "Sunday",
      latidude: "",
      longitude: "",
      radius: "",
    },
  ];

  const wfa: checkclockSetting[] = [
    {
      id: "1",
      workType: "WFA",
      clockIn: "08:00",
      clockOut: "17:00",
      day: "Monday",
    },
    {
      id: "2",
      workType: "WFA",
      clockIn: "08:00",
      clockOut: "17:00",
      day: "Tuesday",
    },
    {
      id: "3",
      workType: "WFA",
      clockIn: "08:00",
      clockOut: "17:00",
      day: "Wednesday",
    },
    {
      id: "4",
      workType: "WFA",
      clockIn: "08:00",
      clockOut: "17:00",
      day: "Thursday",
    },
    {
      id: "5",
      workType: "WFA",
      clockIn: "08:00",
      clockOut: "17:00",
      day: "Friday",
    },
    {
      id: "6",
      workType: "WFA",
      clockIn: "",
      clockOut: "",
      day: "Saturday",
    },
    {
      id: "7",
      workType: "WFA",
      clockIn: "",
      clockOut: "",
      day: "Sunday",
    },
  ];

  const filteredData = selectedWorkType === "WFO" ? wfo : wfa;

  return (
    <Sidebar title={"Checkclock"}>
      <DataTable
        columns={selectedWorkType === "WFO" ? wfoColumns : wfaColumns}
        data={filteredData}
        selectedWorkType={selectedWorkType}
        setSelectedWorkType={setSelectedWorkType}
      />
    </Sidebar>
  );
}
