"use client";

import { useForm } from "@felte/react";
import { validator } from "@felte/validator-zod";
import { z } from "zod";
import { reporter } from "@felte/reporter-react";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

import { useState } from "react";

import { useEdit } from "@/context/EditFormContext";
import { TimeInput } from "@/components/ui/timeInput";
import { AlertDialogFooter } from "@/components/ui/alert-dialog";
import { AlertDialogCancel } from "@radix-ui/react-alert-dialog";
import { Spinner } from "@/components/ui/spinner";
import Cookies from "js-cookie";
import { Toaster, toast } from "sonner";

const EditCKsSchema = z.object({
  clockIn: z.string().nullable().optional(),
  clockOut: z.string().nullable().optional(),
  latitude: z.number().optional(),
  longitude: z.number().optional(),
  radius: z.number().optional(),
})
.refine(
    (data) => {
      // If clockIn is null, clockOut must also be null
      if (data.clockIn == "" && data.clockOut != "") {
        return false;
      }
      return true;
    },
    {
      message: "If clockIn is empty, clockOut must also be empty.",
      path: ["clockOut"],
    }
  );

type CKsetting = z.infer<typeof EditCKsSchema>;

type Props = {
  onUpdate?: () => void;
}

export default function EditWfoForm({ onUpdate }: Props) {
  const { setErrors, setSuccess, selectedRow, setIsOpen } = useEdit();
  const [isLoading, setLoading] = useState(false);

  const { form, errors } = useForm<CKsetting>({
    extend: [validator({ schema: EditCKsSchema }), reporter()],
    onSubmit: async (values) => {
      try {
        setLoading(true);
        const formData = new FormData();
        Object.entries(values).forEach(([key, value]) => {
          formData.append(key, String(value));
        });

        const response = await editCKS(formData, selectedRow?.data_id);

        if (response.success) {
          setIsOpen(false); // Close dialog after successful submission
          if (onUpdate) {
            onUpdate(); // Trigger the refetch function passed as a prop
            setSuccess(response.message)
          }
        } else if (response.errors) {
          console.error(response.errors);
          setErrors(response.errors);
        }
      } catch (error) {
        console.error("Form submission error:", error);
        toast.error("An unexpected error occurred. Please try again.");
      } finally {
        setLoading(false);
      }
    },
  });

  return (
    <>
    <form ref={form} method="post">
      <div
        className={"flex flex-col gap-4"}
      >
        <div className="flex flex-col gap-2">
          <div className="flex flex-col gap-2">
            <Label className="h-6">Day</Label>
            <Input defaultValue={selectedRow?.day ?? ""} readOnly />
            <input name="worktype_id" type="hidden" value={selectedRow?.worktype_id ?? "hehe"}/>
          </div>
          <div className="">
            <TimeInput
              label={"Clock In"}
              name={"clockIn"}
              defaultValue={selectedRow?.clockIn ?? ""}
            />
            {errors().clockIn && (
              <div className="text-sm p-[10px] bg-danger-50 rounded-md">
                {Array.isArray(errors().clockIn) ? (
                  errors()!.clockIn!.map((err, idx) => (
                    <div
                      className="flex flex-row items-center gap-2 py-2"
                      key={idx}
                    >
                      <svg
                        width="15"
                        height="16"
                        viewBox="0 0 22 23"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <circle cx="11" cy="11.5" r="11" fill="#C11106" />
                        <path
                          d="M7 8L15 16M15 8L7 16"
                          stroke="white"
                          strokeWidth="3"
                          strokeLinecap="round"
                        />
                      </svg>

                      <span key={idx} className="text-danger-700 block">
                        {err}
                      </span>
                    </div>
                  ))
                ) : (
                  <span className="text-danger-700">{errors().clockIn}</span>
                )}
              </div>
            )}
          </div>
          <div className="flex flex-col gap-2">
            <TimeInput
              label={"Clock Out"}
              name={"clockOut"}
              defaultValue={selectedRow?.clockOut ?? ""}
            />
            {errors().clockOut && (
              <div className="text-sm p-[10px] bg-danger-50 rounded-md">
                {Array.isArray(errors().clockOut) ? (
                  errors()!.clockOut!.map((err, idx) => (
                    <div
                      className="flex flex-row items-center gap-2 py-2"
                      key={idx}
                    >
                      <svg
                        width="15"
                        height="16"
                        viewBox="0 0 22 23"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <circle cx="11" cy="11.5" r="11" fill="#C11106" />
                        <path
                          d="M7 8L15 16M15 8L7 16"
                          stroke="white"
                          strokeWidth="3"
                          strokeLinecap="round"
                        />
                      </svg>

                      <span key={idx} className="text-danger-700 block">
                        {err}
                      </span>
                    </div>
                  ))
                ) : (
                  <span className="text-danger-700">{errors().clockOut}</span>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
      <AlertDialogFooter className="pt-6">
        <AlertDialogCancel type="button" className="w-auto">
          Cancel
        </AlertDialogCancel>
        <Button type="submit" className="w-auto">
          {isLoading ? <Spinner size={"small"}></Spinner> : "Save"}
        </Button>
      </AlertDialogFooter>
    </form>
    </>
  );
}

export async function editCKS(formData: FormData, data_id: number) {
  try {
    const jsonData = Object.fromEntries(formData.entries());

    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/check-clock-setting-times/${data_id}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${Cookies.get("token")}`,
        },
        body: JSON.stringify(jsonData),
        cache: 'no-store',
      }
    );

    if (!response.ok) {
      // If the response is not OK, parse the error response
      const errorData = await response.json();
      return { success: false, errors: errorData.errors };
    }

    // Parse and return the success response
    const data = await response.json();

    return { success: true, message: data.success };
  } catch (error: any) {
    // Handle network or other unexpected errors
    return {
      success: false,
      errors: { general: [error.message || "An unexpected error occurred"] },
    };
  }
}
