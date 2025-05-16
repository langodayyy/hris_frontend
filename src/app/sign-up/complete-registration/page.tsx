"use client";

import Image from "next/image";

import SignupCompleteForm from "@/components/custom/signupCompletion";
import { useFormContext } from "@/context/FormContext";

export default function SignUpCompleteRegistration() {
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
          </div>
        </div>
      </div>
    </div>
  );
}
