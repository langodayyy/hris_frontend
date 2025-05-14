"use client";

import { useForm } from "@felte/react";
import { validator } from "@felte/validator-zod";
import { z } from "zod";
import { reporter } from "@felte/reporter-react";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import PasswordInput from "../ui/passwordInput";

import { useState } from "react";
import { useRouter } from "next/navigation";

import { useFormContext } from "@/context/FormContext";
import { Spinner } from "@/components/ui/spinner";
import Cookies from "js-cookie";

const signinSchema = z.object({
  username: z.string().nonempty("Email or phone number is required"),

  password: z.string().nonempty("Password is required"),
});

type SigninFormValues = z.infer<typeof signinSchema>;

export default function SigninForm() {
  const router = useRouter();
  const { setErrors } = useFormContext();
  const [isLoading, setLoading] = useState(false);

  const { form, errors } = useForm<SigninFormValues>({
    extend: [validator({ schema: signinSchema }), reporter()],
    onSubmit: async (values) => {
      setLoading(true);
      const formData = new FormData();
      Object.entries(values).forEach(([key, value]) => {
        formData.append(key, value);
      });
      const response = await loginAdmin(formData);

      setLoading(false);

      if (response.success) {
        // Handle successful registration
        if (Cookies.get("token")) {
          Cookies.remove("token");
        }
        Cookies.set("token", response.data.token, { expires:7, secure:true });

        if (response.data.is_profile_complete) {
          router.push("dashboard");
        } else {
          router.push("sign-up/complete-registration");
        }
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
        <Label htmlFor="username" className="font-medium text-neutral-900">
          Email or Phone Number
        </Label>
        <Input
          type="text"
          id="username"
          name="username"
          placeholder="Enter your email or phone number"
          required
        />
        {errors().username && (
          <div className="text-sm p-[10px] bg-danger-50 rounded-md">
            {Array.isArray(errors().username) ? (
              errors()!.username!.map((err, idx) => (
                <div
                  className="flex flex-row items-center gap-2 py-2"
                  key={idx}
                >
                  {/* <svg
                    width="22"
                    height="23"
                    viewBox="0 0 22 23"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <rect
                      y="0.5"
                      width="22"
                      height="22"
                      rx="11"
                      fill="#FFAB00"
                    />
                    <path
                      d="M11 8.90955V11.9095M11 14.4096H11.0062M6.73355 16.9096H15.2665C16.2148 16.9096 16.8073 15.8677 16.3331 15.0346L12.9312 7.4095C12.4312 5.90945 9.93115 5.40955 8.93115 7.40948L5.66694 15.0346C5.19275 15.8677 5.78518 16.9096 6.73355 16.9096Z"
                      stroke="white"
                      stroke-width="2"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                  </svg> */}

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
              <span className="text-danger-700">{errors().username}</span>
            )}
          </div>
        )}
      </div>
      <div className="flex flex-col w-full gap-2">
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
      <div className="grid grid-cols-2 w-full mt-0 pt-0 leading-none">
        <div className="flex items-center space-x-2 leading-none">
          <Checkbox id="remember" className="py-0 " />
          <Label
            htmlFor="remember"
            className="text-base text-neutral-900 leading-none m-0 p-0"
          >
            Remember me
          </Label>
        </div>
        <Button variant={"link"} className="text-base justify-end py-0">
          <a href="sign-in/forgot-password">Forgot Password?</a>
        </Button>
      </div>
      <Button type="submit" disabled={isLoading}>
        {isLoading ? <Spinner size={"small"}></Spinner> : "Sign In"}
      </Button>
    </form>
  );
}

export async function loginAdmin(formData: FormData) {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/login`, {
      method: "POST",
      body: formData,
    });

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
