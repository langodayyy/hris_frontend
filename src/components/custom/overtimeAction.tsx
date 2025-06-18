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
import { Button } from "../ui/button";
import { Spinner } from "../ui/spinner";

export function OvertimeActions({ overtimeId }: { overtimeId: string }) {
  const [reason, setReason] = useState("");
  const [loading, setLoading] = useState(false);

  const handleApproval = async (
    status: "Approved" | "Rejected",
    reason?: string
  ) => {
    setLoading(true);
    try {
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

      const data = await response.json();
      if (!response.ok) throw data;
      toast.success("Overtime status updated.");
      window.location.reload();
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
    <div>
    <Toaster
      position="bottom-right"
      expand={true}
      richColors
      closeButton
    ></Toaster>
    <div className="flex flex-col md:flex-row gap-4 flex-wrap">
        <div className="flex-1">
        <AlertDialog>
          <AlertDialogTrigger asChild>
            <Button variant="destructive" disabled={loading}>
              <>
                {!loading ? (<span>Reject</span>) : (
                  <Spinner size="small" />
                )}
              </>
          
          
            </Button>
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
                  onChange={(e) => setReason(e.target.value)} />
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
        </div>
        <div className="flex-1">
        <AlertDialog>
          <AlertDialogTrigger asChild>
            <Button variant="default" disabled={loading}>

              {!loading ? (
              <>
                <span>Approve</span>
              </>
              ) : (
                <Spinner size="small" />
              )}
            </Button>
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
      </div>
    </div>
  );
}
