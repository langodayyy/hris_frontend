"use client";
import { Button } from "@/components/ui/button";

export default function LinkExpired() {

  return (
    <div className="flex h-screen w-screen bg-white p-[23px]">
      {/* form  */}
        <div className="w-1/2 flex flex-col items-center justify-center px-[80px] py-[10px] gap-[25px] overflow-y-auto">
          <img src="/Notification-dot.svg" alt="info_icon" />
          <h4 className="text-[34px] font-medium text-neutral-900 text-center">Link Expired</h4>
          <p className="text-base text-neutral-500 text-center">The password reset link has expired.
            Please request a new link to reset your password.</p>
          <Button type="submit">Back to Sign In</Button>
        </div>
        {/* image */}
        <div className="w-1/2">
          <img className=" h-full w-full object-cover rounded-[10px]" src="/images/signin signup.png" alt="cover.png"  />
        </div>
    </div>
  )
}