"use client";
import { Button } from "@/components/ui/button";
import PasswordInput from "@/components/ui/passwordInput";

export default function SetNewPassword() {

  return (
    <div className="flex h-screen w-screen bg-white p-[23px]">
      {/* form  */}
        <div className="w-1/2 flex flex-col items-center justify-center px-[80px] py-[10px] gap-[25px] overflow-y-auto">
          <h4 className="text-[34px] font-medium text-neutral-900">Set New Password</h4>
          <p className="text-base text-neutral-500 text-center">Enter your new password bellom to complete the reset process.  Ensure it’s strong and secure</p>
          <div className="flex flex-col w-full gap-2">
            <PasswordInput id="password" name="password" />
          </div>
          <div className="flex flex-col gap-2 w-full">
            <PasswordInput
                id="password_confirmation" name="password_confirmation" label="Confirm Password" />
          </div>
          <Button type="submit">Reset Password</Button>
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