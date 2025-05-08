"use client";

import { useForm } from "@felte/react";
import { validator } from "@felte/validator-zod";
import { z } from "zod";
import { reporter } from "@felte/reporter-react";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

import { useState } from "react";
import { useRouter } from "next/navigation";

import { useFormContext } from "@/context/FormContext";
import { Spinner } from "@/components/ui/spinner";

const resetPassSchema = z.object({
  email: z
    .string()
    .email("Invalid email address")
    .nonempty("Email is required"),
});

type resetPassFormValues = z.infer<typeof resetPassSchema>;

export default function ConfirmEmailReset() {
  const router = useRouter();
  const { setErrors } = useFormContext();
  const [isLoading, setLoading] = useState(false);

  const { form, errors } = useForm<resetPassFormValues>({
    extend: [validator({ schema: resetPassSchema }), reporter()],
    onSubmit: async (values) => {
      setLoading(true);
      const formData = new FormData();
      Object.entries(values).forEach(([key, value]) => {
        formData.append(key, value);
      });
      const response = await requestResetPassword(formData);

      setLoading(false);

      if (response.success) {
        router.push(`/sign-in/check-email?email=${encodeURIComponent(values.email)}`);
      } else {
        setErrors(response.errors);
      }
    },
  });

  return (
    <form
      ref={form}
      className="w-full flex flex-col items-start justify-start gap-[25px]"
      method="post"
    >
      <div className="flex flex-col w-full gap-2">
        <label htmlFor="email" className="font-medium text-neutral-900">
          Email
        </label>
        <Input
          type="email"
          id="email"
          name="email"
          placeholder="Enter your email"
          required
        />
        {errors().email && (
          <div className="text-sm p-[10px] bg-danger-50 rounded-md">
            {Array.isArray(errors().email) ? (
              errors()!.email!.map((err, idx) => (
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
              <span className="text-danger-700">{errors().email}</span>
            )}
          </div>
        )}
      </div>
      <Button type="submit" disabled={isLoading}>
        {isLoading ? <Spinner size={"small"}></Spinner> : "Reset Password"}
      </Button>
    </form>
  );
}

export async function requestResetPassword(formData: FormData) {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/reset-password`,
      {
        method: "POST",
        body: formData,
      }
    );

    if (!response.ok) {
      // If the response is not OK, parse the error response
      const errorData = await response.json();
      return { success: false, errors: errorData.errors };
    }

    // Parse and return the success response
    const data = await response.json();

    return { success: true, data };
  } catch (error: any) {
    // Handle network or other unexpected errors
    return {
      success: false,
      errors: { general: [error.message || "An unexpected error occurred"] },
    };
  }
}
