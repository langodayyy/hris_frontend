"use client";

import { useEffect, useState } from "react";
import Sidebar from "@/components/sidebar";
import { DataTable } from "./data-table";
import { checkclockSetting, wfoColumns, wfaColumns } from "./column";
import { useCKSettingData } from "@/hooks/useCKSettingData";
import { transformCKData } from "@/utils/transfromCkSData";
import { Toaster, toast } from "sonner";
import { useEdit } from "@/context/EditFormContext";

export default function CheckclockSettingPage() {
  const { ckData, locationRule } = useCKSettingData();
  const [selectedWorkType, setSelectedWorkType] = useState<"WFO" | "WFA">(
    "WFO"
  );

  const { errors, setErrors, success, setSuccess } = useEdit();

  useEffect(() => {
  if (errors && Object.keys(errors).length > 0) {
    Object.entries(errors).forEach(([messages]) => {
      if (Array.isArray(messages)) {
        messages.forEach((message) => toast.error(`${message}`));
        console.log(`${messages}`);
      } else {
        // toast.error(`${messages}`);
      }
    });
    setErrors({});
  }
  }, [errors]);

  useEffect(() => {
    if (success && Object.keys(success).length > 0) {
      toast.success(`${success.message}`);
      setSuccess({}); 
    }
  }, [success]); 

  const { wfo, wfa } = transformCKData(Array.isArray(ckData) ? ckData : []);

  const filteredData = selectedWorkType === "WFO" ? wfo : wfa;

  

  return (
    <Sidebar title={"Checkclock"}>
      <Toaster position="bottom-right" expand={true} richColors closeButton></Toaster>
      <div className="w-full" >

      <DataTable 
        columns={selectedWorkType === "WFO" ? wfoColumns : wfaColumns}
        data={filteredData}
        selectedWorkType={selectedWorkType}
        setSelectedWorkType={setSelectedWorkType}
        />
        </div>
    </Sidebar>
  );
}
