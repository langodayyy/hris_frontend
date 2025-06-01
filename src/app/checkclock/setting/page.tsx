"use client";

import { useState } from "react";
import Sidebar from "@/components/sidebar";
import { DataTable } from "./data-table";
import { checkclockSetting, wfoColumns, wfaColumns } from "./column";
import { useCKSettingData } from "@/hooks/useCKSettingData";
import { transformCKData } from "@/utils/transfromCkSData";

export default function CheckclockSettingPage() {
  const { ckData, loading, refetch } = useCKSettingData();
  const [selectedWorkType, setSelectedWorkType] = useState<"WFO" | "WFA">(
    "WFO"
  );

  const { wfo, wfa } = transformCKData(Array.isArray(ckData) ? ckData : []);

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
