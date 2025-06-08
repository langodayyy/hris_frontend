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
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogCancel,
  AlertDialogAction,
} from "@/components/ui/alert-dialog";

interface PaymentPaidDialogProps {
  open: boolean;
  onClose: () => void;
}

export default function CheckclockSettingPage({
  open,
  onClose,
}: PaymentPaidDialogProps) {
  const { paymentRule } = usePaymentData();
  const [selectedYear, setSelectedYear] = useState<string>("");
  const [showPaidDialog, setShowPaidDialog] = useState<boolean>(false);
  const [lastPaid, setLastPaid] = useState<boolean>(false);

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

  useEffect(() => {
    // Cek jika ada bill yang statusnya 'paid' untuk periode bulan & tahun sekarang
    if (Array.isArray(paymentRule)) {
      const now = new Date();
      const currentPeriod = now
        .toLocaleDateString("id-ID", { month: "2-digit", year: "numeric" })
        .replace("/", "-"); // Format: mm-yyyy
      const paidBill = paymentRule.find(
        (bill) => bill.status === "paid" && bill.period === currentPeriod
      );
      const dismissedKey = `paidDialogDismissed_${currentPeriod}`;
      const dismissed = localStorage.getItem(dismissedKey);
      // HANYA hapus dismissedKey jika status berubah dari paid ke non-paid
      if (!paidBill && lastPaid) {
        localStorage.removeItem(dismissedKey);
      }
      // JANGAN hapus dismissedKey saat status berubah dari non-paid ke paid
      setShowPaidDialog(!!paidBill && !dismissed);
      setLastPaid(!!paidBill);
    }
  }, [paymentRule]);

  const handleClosePaidDialog = () => {
    const now = new Date();
    const currentPeriod = now
      .toLocaleDateString("id-ID", { month: "2-digit", year: "numeric" })
      .replace("/", "-");
    localStorage.setItem(`paidDialogDismissed_${currentPeriod}`, "1");
    setShowPaidDialog(false);
  };

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
      <AlertDialog open={showPaidDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>
              <div className="flex gap-3">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="icon icon-tabler icons-tabler-filled icon-tabler-circle-check"
                >
                  <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                  <path d="M17 3.34a10 10 0 1 1 -14.995 8.984l-.005 -.324l.005 -.324a10 10 0 0 1 14.995 -8.336zm-1.293 5.953a1 1 0 0 0 -1.32 -.083l-.094 .083l-3.293 3.292l-1.293 -1.292l-.094 -.083a1 1 0 0 0 -1.403 1.403l.083 .094l2 2l.094 .083a1 1 0 0 0 1.226 0l.094 -.083l4 -4l.083 -.094a1 1 0 0 0 -.083 -1.32z" />
                </svg>
                The bill has been paid.
              </div>
            </AlertDialogTitle>
            <AlertDialogDescription>
              Do you want to change plans or stay with the same plan?
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel
              className="w-auto"
              onClick={handleClosePaidDialog}
            >
              Keep Current Plan
            </AlertDialogCancel>
            <AlertDialogAction
              className="w-auto"
              onClick={() => {
                handleClosePaidDialog();
                // Set allowPlanAccess agar halaman /plan bisa diakses
                localStorage.setItem("allowPlanAccess", "1");
                window.location.href = "/plan";
              }}
            >
              Change Plan
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </Sidebar>
  );
}
