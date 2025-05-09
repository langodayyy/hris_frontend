"use client";

import ConfirmEmailReset from "@/components/custom/confirmEmailReset";
import { useFormContext } from "@/context/FormContext";

export default function ForgotPassword() {
  const { errors } = useFormContext();

  return (
    <div className="flex h-screen w-screen bg-white p-[23px]">
      {/* form  */}
        <div className="w-1/2 flex flex-col items-center justify-center px-[80px] py-[10px] gap-[25px] overflow-y-auto">
          <h4 className="text-[34px] font-medium text-neutral-900">Forgot Password</h4>
          <p className="text-base text-neutral-500 text-center">No worries! Enter your email address below, and we’ll send you a link to reset your password.</p>
          
          {/* error message when no found email from backend */}
          {Object.entries(errors).map(([field, messages]) => (
              <div key={field} className="w-full justify-start text-danger-700">
                {Array.isArray(messages) ? (
                  messages.map((message, idx) => (
                    <div key={idx}>{message}</div>
                  ))
                ) : (
                  <div>{messages}</div>
                )}
              </div>
            ))}

          <ConfirmEmailReset></ConfirmEmailReset>

          <div className="flex items-center justify-center w-full text-sm gap-[10px]">
            <img src="/arrow-left.svg" alt="left arrow Icon" />
              <a href="/sign-in" className="text-info-500 hover:underline">
                Back to Sign In
              </a>
          </div>
        </div>
        {/* image */}
        <div className="w-1/2">
          <img className=" h-full w-full object-cover rounded-[10px]" src="/images/signin signup.png" alt="cover.png"  />
        </div>
    </div>
  )
}