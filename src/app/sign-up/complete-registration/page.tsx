"use client";

import { Metadata } from "next";
import Sidebar from "../../../components/sidebar";
import Image from "next/image";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
// import { PhoneInput } from "../../../components/ui/phoneInput";
import PhoneInput from "../../../components/ui/phoneInput";
import { Eye, EyeOff } from "lucide-react";
import { link } from "fs";

import SignupCompleteForm from "@/components/custom/signupCompletion";
import { useFormContext } from "@/context/FormContext";

export default function SignUp() {
  const { errors } = useFormContext();

  return (
    <div className="p-[23px] w-screen h-screen bg-white">
      <div className="flex flex-row w-full h-full">
        <div className="w-full h-full">
          <div
            className="w-full h-full bg-cover bg-center rounded-[10px]"
            style={{ backgroundImage: 'url("/images/signin signup.png")' }}
          ></div>
        </div>
        <div className="w-full flex justify-center h-full overflow-auto">
          <div className="w-[600px] h-full flex flex-col  gap-[25px]  px-[50px] bg-white ">
            <Image
              src="/images/logo hris with text.png"
              alt="Logo"
              width={135}
              height={94}
              className=""
            />
            <span className=" text-[34px] font-semibold text-neutral-900">
              Let's Complete Your Profile!
            </span>
            <span className="text-lg text-neutral-500">
              Please provide basic company and HR contact details to help us
              serve you better.
            </span>

            {/* errors message login failure from backend */}
            {Object.entries(errors).map(([field, messages]) => (
              <div key={field} className="text-danger-700">
                {Array.isArray(messages) ? (
                  messages.map((message, idx) => (
                    <div key={idx}>{message}</div>
                  ))
                ) : (
                  <div>{messages}</div>
                )}
              </div>
            ))}
            
            <SignupCompleteForm></SignupCompleteForm>
            {/* <form
              action=""
              method="post"
              className="flex flex-col  gap-[25px]"
              onSubmit={async (e) => {
                e.preventDefault();
                const formData = new FormData(e.target as HTMLFormElement);
                const token = localStorage.getItem("token");
                const response = await fetch(
                  "http://localhost:8000/api/completeRegister",
                  {
                  method: "POST",
                  body: formData,
                  headers: {
                    Authorization: `Bearer ${token}`,
                  },
                  }
                );

                if (response.ok) {
                  localStorage.setItem("is_profile_complete", "true");
                  window.location.href = "/dashboard"; // Redirect to dashboard or another page
                } 
                else {
                  // Handle error response
                  const errorData = await response.json();
                    const errorMessages = Object.values(errorData.errors)
                    .flat()
                    .join("\n");
                    
                    // ⚠️change the format to non alert JS⚠️
                    alert(`Error:\n${errorMessages}`);
                }
              }}
            >
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
                  </div>
                  <div className="flex flex-col gap-2 w-full">
                    <Label htmlFor="lastname">Last Name</Label>
                    <Input
                      type="text"
                      name="last_name"
                      id="lastname"
                      placeholder="Enter your last name"
                    />
                  </div>
                </div>

                <PhoneInput></PhoneInput>
                <div className="flex flex-col gap-2 w-full">
                  <Label htmlFor="companyname">Company Name</Label>
                  <Input
                    type="text"
                    name="company_name"
                    id="companyname"
                    placeholder="Enter company name"
                  />
                </div>
              </div>
              <div className="w-full">
                <Button type="submit">Submit</Button>
              </div>
            </form> */}
          </div>
        </div>
      </div>
    </div>
  );
}
