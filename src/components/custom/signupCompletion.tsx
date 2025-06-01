"use client";

import { useForm } from "@felte/react";
import { validator } from "@felte/validator-zod";
import { z } from "zod";
import { reporter } from "@felte/reporter-react";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import PhoneInput from "@/components/ui/phoneInput";

import { useState } from "react";
import { useRouter } from "next/navigation";

import { useFormContext } from "@/context/FormContext";
import { Spinner } from "@/components/ui/spinner";

import Cookies from "js-cookie";
import PhoneInputt from "@/components/ui/phoneInput";

const schema = z.object({
  first_name: z
    .string()
    .nonempty("First name is required")
    .max(50, "Cannot exceed 50 characters"),

  last_name: z
    .string()
    .nonempty("Last name is required")
    .max(50, "Cannot exceed 50 characters"),

  // phone: z
  //     .e164()
  //     .nonempty("Phone is required")
  //     .refine((val) => /^\d+$/.test(val), {
  //         message: "Phone must contain only numbers",
  //     })
  //     .refine((val) => val.length >= 10 && val.length <= 15, {
  //         message: "Phone must be between 10 and 15 characters",
  //     }),

  company_name: z
    .string()
    .nonempty("Company name is required")
    .max(50, "Cannot exceed 50 characters"),
});

type SignupCompleteFormValues = z.infer<typeof schema>;

export default function SignupCompleteForm() {
  const router = useRouter();
  const { setErrors } = useFormContext();
  const [isLoading, setLoading] = useState(false);

  const { form, errors } = useForm<SignupCompleteFormValues>({
    extend: [validator({ schema: schema }), reporter()],
    onSubmit: async (values) => {
      setLoading(true);

      const response = await completeRegister(values);

      setLoading(false);

      if (response.success) {
        // Handle successful registration
        router.push("/dashboard");
      } else {
        setErrors(response.errors);
      }
    },
  });

  return (
    <form ref={form} method="post" className="flex flex-col  gap-[25px]">
      <div className="flex flex-col gap-5 w-full">
        <div className="flex flex-row gap-5 w-full">
          <div className="flex flex-col gap-2 w-full">
            <Label htmlFor="firstname">First Name</Label>
            <Input
              type="text"
              name="first_name"
              id="firstname"
              placeholder="Enter your first name"
            />
            {errors().first_name && (
              <div className="text-sm p-[10px] bg-danger-50 rounded-md">
                {Array.isArray(errors().first_name) ? (
                  errors()!.first_name!.map((err, idx) => (
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
                  <span className="text-danger-700">{errors().first_name}</span>
                )}
              </div>
            )}
          </div>
          <div className="flex flex-col gap-2 w-full">
            <Label htmlFor="lastname">Last Name</Label>
            <Input
              type="text"
              name="last_name"
              id="lastname"
              placeholder="Enter your last name"
            />
            {errors().last_name && (
              <div className="text-sm p-[10px] bg-danger-50 rounded-md">
                {Array.isArray(errors().last_name) ? (
                  errors()!.last_name!.map((err, idx) => (
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
                  <span className="text-danger-700">{errors().last_name}</span>
                )}
              </div>
            )}
          </div>
        </div>

        <PhoneInputt></PhoneInputt>

        <div className="flex flex-col gap-2 w-full">
          <Label htmlFor="companyname">Company Name</Label>
          <Input
            type="text"
            name="company_name"
            id="companyname"
            placeholder="Enter company name"
          />
          {errors().company_name && (
            <div className="text-sm p-[10px] bg-danger-50 rounded-md">
              {Array.isArray(errors().company_name) ? (
                errors()!.company_name!.map((err, idx) => (
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
                <span className="text-danger-700">{errors().company_name}</span>
              )}
            </div>
          )}
        </div>
      </div>
      <div className="w-full">
        <Button type="submit" disabled={isLoading}>
          {isLoading ? <Spinner size={"small"}></Spinner> : "Submit"}
        </Button>
      </div>
    </form>
  );
}

export async function completeRegister(data: Record<string, any>) {
  try {
    const userCookie = Cookies.get("token");
    if (userCookie) {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/completeRegister`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${userCookie}`,
          },
          body: JSON.stringify(data),
        }
      );

      if (!response.ok) {
        // If the response is not OK, parse the error response
        const errorData = await response.json();
        return { success: false, errors: errorData.errors };
      }

      // Parse and return the success response
      const responseData = await response.json();
      return { success: true, data: responseData };
    } else {
      return {
        success: false,
        errors: { general: ["User token not found"] },
      };
    }
  } catch (error: any) {
    // Handle network or other unexpected errors
    return {
      success: false,
      errors: { general: [error.message || "An unexpected error occurred"] },
    };
  }
}
