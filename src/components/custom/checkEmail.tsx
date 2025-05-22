"use client";
import { useSearchParams } from "next/navigation";

export default function CheckEmail() {
  const searchParams = useSearchParams();
  const email = searchParams.get("email");

  return (
    <div className="flex h-screen w-screen bg-white p-[23px]">
      {/* form  */}
        <div className="w-1/2 flex flex-col items-center justify-center px-[80px] py-[10px] gap-[25px] overflow-y-auto">
          <h4 className="text-[34px] font-medium text-neutral-900">Check Your Email</h4>
          <p className="text-base text-neutral-500 text-center">We sent password reset link to your email <span className="font-bold">({email})</span> which valid for 60 Minutes after receives the email. Please check your inbox!</p>
          <div className="flex justify-center w-full text-sm">
            <p>
              Dont receive the email? &nbsp;
              {/* still dont have the logic */}
              <a href="#" className="text-info-500 hover:underline">
                Click here to resend!
              </a>
            </p>
          </div>
        </div>
        {/* image */}
        <div className="w-1/2">
          <img className=" h-full w-full object-cover rounded-[10px]" src="/images/signin signup.png" alt="cover.png"  />
        </div>
    </div>
  )
}
