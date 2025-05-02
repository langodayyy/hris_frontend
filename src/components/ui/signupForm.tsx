"use client";

import { useForm } from "@felte/react";
import { validator } from "@felte/validator-zod";
import { z } from "zod";
import { reporter } from "@felte/reporter-react";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import PasswordInput from "./passwordInput";

import { useState } from "react";
import { useRouter } from "next/navigation";

import { useFormContext } from "@/context/FormContext";
import { Spinner } from "@/components/ui/spinner";

const signupSchema = z
  .object({
    email: z
      .string()
      .email("Invalid email address")
      .nonempty("Email is required"),

    password: z
      .string()
      .min(8, "Password must be at least 8 characters long")
      .regex(/(?=.*[0-9])/, "Password must contain at least one number")
      .regex(
        /(?=.*[a-z])/,
        "Password must contain at least one lowercase letter"
      )
      .regex(
        /(?=.*[A-Z])/,
        "Password must contain at least one uppercase letter"
      )
      .regex(
        /(?=.*[!@#$%^&*])/,
        "Password must contain at least one special character"
      ),

    password_confirmation: z.string(),
  })
  .refine((data) => data.password === data.password_confirmation, {
    message: "Passwords don't match",
    path: ["password_confirmation"],
  });

type SignupFormValues = z.infer<typeof signupSchema>;

export default function SignupForm() {
  const router = useRouter();
  const { setErrors } = useFormContext();
  const [isLoading, setLoading] = useState(false);

  const { form, errors } = useForm<SignupFormValues>({
    extend: [validator({ schema: signupSchema }), reporter()],
    onSubmit: async (values) => {
      setLoading(true);
      const formData = new FormData();
      Object.entries(values).forEach(([key, value]) => {
        formData.append(key, value);
      });
      const response = await registerUser(formData);

      setLoading(false);

      if (response.success) {
        // Handle successful registration
        console.log("User registered successfully:", response.data);

        router.push("/signup/complete-registration");
      } else {
        setErrors(response.errors);
      }
    },
  });

  return (
    <form ref={form} className="flex flex-col gap-[25px]" method="post">
      <div className="flex flex-col gap-5 w-full">
        <div className="flex flex-col gap-2 w-full">
          <Label htmlFor="email">Email</Label>
          <Input
            type="email"
            id="email"
            name="email"
            placeholder="Enter your email"
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
        <div className="flex flex-col gap-2 w-full">
          <PasswordInput id="password" name="password" />
          {errors().password && (
            <div className="text-sm p-[10px] bg-danger-50 rounded-md">
              {Array.isArray(errors().password) ? (
                errors()!.password!.map((err, idx) => (
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
                <span className="text-danger-700">{errors().password}</span>
              )}
            </div>
          )}
        </div>
        <div className="flex flex-col gap-2 w-full">
          <PasswordInput
            id="password_confirmation"
            name="password_confirmation"
            label="Confirm Password"
          />
          {errors().password_confirmation && (
            <div className="text-sm p-[10px] bg-danger-50 rounded-md">
              {Array.isArray(errors().password_confirmation) ? (
                errors()!.password_confirmation!.map((err, idx) => (
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
                <span className="text-danger-700">
                  {errors().password_confirmation}
                </span>
              )}
            </div>
          )}
        </div>
      </div>
      <div className="flex items-center space-x-2">
        <Checkbox id="terms2" name="terms_check"/>
        <label
          htmlFor="terms2"
          className="text-sm text-neutral-900 font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
        >
          I agree with terms of use of HRIS.
        </label>
      </div>
      <div className="w-full">
        <Button type="submit" disabled={isLoading}>
          {isLoading ? (
            <Spinner size={"small"}></Spinner>
          ) : (
            "Sign Up"
          )}
        </Button>
      </div>
    </form>
  );
}

export async function registerUser(formData: FormData) {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/register`,
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
