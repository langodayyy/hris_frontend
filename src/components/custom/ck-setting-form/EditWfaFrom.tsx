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

const EditCKsSchema = z
  .object({
    clockIn: z.string().nullable().optional(),
    minClockIn: z.string().nullable().optional(),
    maxClockIn: z.string().nullable().optional(),
    clockOut: z.string().nullable().optional(),
    maxClockOut: z.string().nullable().optional(),
  })
  .superRefine((data, ctx) => {
    const fields = {
      clockIn: data.clockIn,
      minClockIn: data.minClockIn,
      maxClockIn: data.maxClockIn,
    };

    const hasEmpty = Object.values(fields).some((val) => val == "");
    const hasNonEmpty = Object.values(fields).some(
      (val) => val !== "" && val !== null && val !== undefined
    );

    if (hasEmpty && hasNonEmpty) {
      Object.keys(fields).forEach((key) => {
        ctx.addIssue({
          code: "custom",
          path: [key],
          message: "All fields must be filled or all must be empty.",
        });
      });
    }
  });

type CKsetting = z.infer<typeof EditCKsSchema>;

type Props = {
  onUpdate?: () => void;
};

export default function EditWfaForm({ onUpdate }: Props) {
  const { setErrors, setSuccess, selectedRow, setIsOpen } = useEdit();
  const [isLoading, setLoading] = useState(false);

  const { form, errors, setFields } = useForm<CKsetting>({
    initialValues: {
      clockIn: selectedRow?.clockIn ?? "",
      minClockIn: selectedRow?.minClockIn ?? "",
      maxClockIn: selectedRow?.maxClockIn ?? "",
      clockOut: "",
      maxClockOut: "",
    },
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
            setSuccess(response.message);
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
        <div className={"flex flex-col gap-4"}>
          <div className="flex flex-col gap-2">
            <div className="flex flex-col gap-2">
              <Label className="h-6">Day</Label>
              <Input defaultValue={selectedRow?.day ?? ""} readOnly />
              <input
                name="worktype_id"
                type="hidden"
                value={selectedRow?.worktype_id ?? ""}
              />
              <input
                name="clockOut"
                type="hidden"
                value={selectedRow?.clockOut}
              />
              <input
                name="maxClockOut"
                type="hidden"
                value={selectedRow?.maxClockOut}
              />
            </div>
            <div>
              <TimeInput
                label={"Minimum Clock In Time"}
                name={"minClockIn"}
              />
              {errors().minClockIn && (
                <span className="text-danger-700">{errors().minClockIn}</span>
              )}
            </div>
            <div>
              <TimeInput
                label={"Clock In Time"}
                name={"clockIn"}
              />
              {errors().clockIn && (
                <span className="text-danger-700">{errors().clockIn}</span>
              )}
            </div>
            <div>
              <TimeInput
                label={"Maximum Clock In Time"}
                name={"maxClockIn"}
              />
              {errors().maxClockIn && (
                <span className="text-danger-700">{errors().maxClockIn}</span>
              )}
            </div>
          </div>
        </div>
        <AlertDialogFooter className="pt-6">
          <Button
            type="button"
            variant={"outline"}
            className="w-auto"
            onClick={() =>
              setFields({
                clockIn: "",
                minClockIn: "",
                maxClockIn: "",
                clockOut: "",
                maxClockOut: "",
              })
            }
          >
            Clear All
          </Button>
          <div className="w-full"></div>
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
          Authorization: `Bearer ${Cookies.get("token")}`,
        },
        body: JSON.stringify(jsonData),
        cache: "no-store",
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
