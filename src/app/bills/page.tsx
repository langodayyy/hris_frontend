"use client";

import { useEffect, useState } from "react";
import Sidebar from "@/components/sidebar";
import { DataTable } from "./data-table";
import { checkclockSetting, wfoColumns } from "./column";
import { useCKSettingData } from "@/hooks/useCKSettingData";
import { transformCKData } from "@/utils/transfromCkSData";
import { Toaster, toast } from "sonner";
import { useEdit } from "@/context/EditFormContext";
import { usePaymentData } from "@/hooks/usePaymentData";

export default function CheckclockSettingPage() {
  const { paymentRule } = usePaymentData();
  const [selectedYear, setSelectedYear] = useState<string>("");
  // const [selectedWorkType, setSelectedWorkType] = useState<"WFO" | "WFA">(
  //   "WFO"
  // );

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

  // const { wfo, wfa } = transformCKData(Array.isArray(ckData) ? ckData : []);

  // const filteredData = selectedWorkType === "WFO" ? wfo : wfa;
  console.log(paymentRule);
  return (
    <Sidebar title={"Bills"}>
      <Toaster position="bottom-right" expand={true}></Toaster>
      <DataTable
        columns={wfoColumns}
        data={Array.isArray(paymentRule) ? paymentRule : []}
        selectedYear={selectedYear}
        setSelectedYear={setSelectedYear}
        // columns={checkclockSetting}
        // data={paymentRule}

        // columns={selectedWorkType === "WFO" ? wfoColumns : wfaColumns}
        // data={filteredData}
        // selectedWorkType={selectedWorkType}
        // setSelectedWorkType={setSelectedWorkType}
      />
    </Sidebar>
  );
}
