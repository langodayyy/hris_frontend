"use client";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function ForgotPassword() {

  return (
    <div className="flex h-screen w-screen bg-white p-[23px]">
      {/* form  */}
        <div className="w-1/2 flex flex-col items-center justify-center px-[80px] py-[10px] gap-[25px] overflow-y-auto">
          <h4 className="text-[34px] font-medium text-neutral-900">Forgot Password</h4>
          <p className="text-base text-neutral-500 text-center">No worries! Enter your email address below, and we’ll send you a link to reset your password.</p>
          <div className="flex flex-col w-full gap-2">
            <label htmlFor="email" className="font-medium text-neutral-900">Email</label>
            <Input type="email" id="email" name="email" placeholder="Enter your email" required/>
          </div>
          <Button type="submit">Reset Password</Button>
          <div className="flex items-center justify-center w-full text-sm gap-[10px]">
            <img src="/arrow-left.svg" alt="left arrow Icon" />
              <a href="/signin" className="text-info-500 hover:underline">
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