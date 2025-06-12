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
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

const signinSchema = z.object({
  id_company: z.string().nonempty("ID Company is required"),
  id_employee: z.string().nonempty("ID Employee is required"),

  password: z.string().nonempty("Password is required"),
});

type SigninFormValues = z.infer<typeof signinSchema>;

export default function SigninEmployeeForm() {
  const router = useRouter();
  const { setErrors } = useFormContext();
  const [isLoading, setLoading] = useState(false);

  const { form, errors } = useForm<SigninFormValues>({
    extend: [validator({ schema: signinSchema }), reporter()],
    onSubmit: async (values) => {
      setLoading(true);
      const formData = new FormData();
      Object.entries(values).forEach(([key, value]) => {
        formData.append(key, String(value));
      });
      const response = await loginUser(formData);

      setLoading(false);

      if (response.success) {
        // Handle successful registration
        Cookies.set("token-employee", response.data.token, {
          expires: 7, // Cookie expires in 7 days
          secure: true, // Use secure cookies (HTTPS only)
          domain: ".hris.my.id",
          sameSite: "None",
        });

        window.location.href = `${process.env.NEXT_PUBLIC_APP_URL}/dashboard`;
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
        <Label htmlFor="id_company" className="font-medium text-neutral-900">
          ID Company
        </Label>
        <Input
          type="text"
          id="id_company"
          name="id_company"
          placeholder="Enter your company ID"
          required
        />
        {errors().id_company && (
          <span className="text-danger-700">{errors().id_company}</span>
        )}
      </div>
      <div className="flex flex-col w-full gap-2">
        <Label htmlFor="id_employee" className="font-medium text-neutral-900">
          ID Employee
        </Label>
        <Input
          type="text"
          id="id_employee"
          name="id_employee"
          placeholder="Enter your employee ID"
          required
        />
        {errors().id_employee && (
          <span className="text-danger-700">{errors().id_employee}</span>
        )}
      </div>
      <div className="flex flex-col w-full gap-2">
        <PasswordInput id="password" name="password" />
        {errors().password && (
          <span className="text-danger-700">{errors().password}</span>
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
        <Dialog>
          <DialogTrigger asChild>
            <Button variant={"link"} className="text-base justify-end py-0">
              Forgot Password?
            </Button>
          </DialogTrigger>
          <DialogContent className="p-10 bg-white text-lg">
            <DialogHeader>
              <DialogTitle>Forgot Password</DialogTitle>
              <DialogDescription className="pt-2 text-base">
                Please contact admin to reset your password
              </DialogDescription>
            </DialogHeader>
          </DialogContent>
        </Dialog>
      </div>
      <Button type="submit" disabled={isLoading}>
        {isLoading ? <Spinner size={"small"}></Spinner> : "Sign In"}
      </Button>
    </form>
  );
}

export async function loginUser(formData: FormData) {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/login-employee`,
      {
        method: "POST",
        body: formData,
      }
    );

    if (!response.ok) {
      // If the response is not OK, parse the error response
      const errorData = await response.json();
      return { success: false, errors: errorData.message };
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
