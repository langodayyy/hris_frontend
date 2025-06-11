"use client";

import { useState } from "react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Input } from "@/components/ui/input";
import Cookies from "js-cookie";
import { toast, Toaster } from "sonner";

export function OvertimeActions({ overtimeId }: { overtimeId: string }) {
  const [reason, setReason] = useState("");
  const [loading, setLoading] = useState(false);

  const handleApproval = async (
    status: "Approved" | "Rejected",
    reason?: string
  ) => {
    setLoading(true);
    try {
      console.log(overtimeId, status, reason);

      // Uncomment this when ready
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/overtime/approval?_method=PATCH`, {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${Cookies.get("token")}`,
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
            overtime_id: overtimeId,
            status: status,
            reason: reason,
            

        })
      });

      console.log(response)
      const data = await response.json();
      if (!response.ok) throw data;
      toast.success("Overtime status updated.");

    } catch (err) {
      let message = "Unknown error occurred";
      let messagesToShow: string[] = [];

      if (
        err &&
        typeof err === "object" &&
        "message" in err &&
        typeof (err as any).message === "string"
      ) {
        const backendError = err as { message: string; errors?: Record<string, string[]> };
        message = backendError.message;
        messagesToShow = backendError.errors ? Object.values(backendError.errors).flat() : [message];
      } else {
        messagesToShow = [message];
      }

      toast.error(
        <>
          <p className="text-red-700 font-bold">Error</p>
          {messagesToShow.map((msg, idx) => (
            <div key={idx} className="text-red-700">• {msg}</div>
          ))}
        </>,
        { duration: 30000 }
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex gap-2">
         <Toaster
          position="bottom-right"
          expand={true}
          richColors
          closeButton
        ></Toaster>
      {/* Reject Dialog */}
      <AlertDialog>
        <AlertDialogTrigger className="hover:bg-danger-50 rounded-md p-1 h-auto w-auto">
          <svg width="19" height="18" viewBox="0 0 19 18" fill="none" xmlns="http://www.w3.org/2000/svg">
            <g opacity="0.7">
              <rect x="1.63867" y="0.75" width="16.5" height="16.5" rx="3.25" stroke="#C11106" strokeWidth="1.5" />
              <path d="M14.3886 4.50004L5.38867 13.5M5.38863 4.5L14.3886 13.5" stroke="#C11106" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </g>
          </svg>
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure you want to reject this overtime?</AlertDialogTitle>
            <AlertDialogDescription> </AlertDialogDescription>
              <div className="flex flex-col gap-2 mt-2">
                Please enter the reason for rejection:
                <Input
                  placeholder="Enter the reason"
                  value={reason}
                  onChange={(e) => setReason(e.target.value)}
                />
              </div>
         
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel className="w-auto">Cancel</AlertDialogCancel>
            <AlertDialogAction
                className="w-auto bg-danger-700 text-white border border-danger-700 hover:bg-danger-800 hover:text-white"
                onClick={() => handleApproval("Rejected", reason)}
                disabled={loading}
            >
              Reject
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* Approve Dialog */}
      <AlertDialog>
        <AlertDialogTrigger className="hover:bg-success-50 rounded-md p-1 h-auto w-auto">
          <svg width="19" height="18" viewBox="0 0 19 18" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect x="1.63867" y="0.75" width="16.5" height="16.5" rx="3.25" stroke="#25703F" strokeWidth="1.5" />
            <path d="M4.63867 9L8.38867 12.75L15.8887 5.25" stroke="#25703F" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure you want to approve this overtime?</AlertDialogTitle>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel className="w-auto">Cancel</AlertDialogCancel>
            <AlertDialogAction
             className="w-auto bg-primary-900 text-white shadow-xs hover:bg-primary-950 cursor-pointer"
              onClick={() => handleApproval("Approved")}
              disabled={loading}
            >
              Approve
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
