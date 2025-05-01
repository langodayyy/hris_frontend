"use client";
import { Input } from "@/components/ui/input";
import PasswordInput from "@/components/ui/passwordInput";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";

export default function SignIn() {

  return (
    <div className="flex h-screen w-screen bg-white p-[23px]">
      {/* image */}
        <div className="w-1/2">
          <img className=" h-full w-full object-cover rounded-[10px]" src="images/signin signup.png" alt="cover.png"  />
        </div>
        
      {/* form  */}
        <div className="w-1/2 flex flex-col items-start justify-start px-[80px] py-[10px] gap-[25px] overflow-y-auto">
          <img className="h-[94px]" src="images/logo hris with text.png" alt="logo.png" />
          <div className="py-[30px]">
            <h4 className="text-[34px] font-medium text-neutral-900">Sign In</h4>
          </div>
          <p className="text-base text-neutral-500">Welcome back to HRIS cmlabs! Manage everything with ease.</p>
          <div className="flex flex-col w-full gap-2">
            <label htmlFor="email_phonenumber" className="font-medium text-neutral-900">Email or Phone Number</label>
            <Input type="text" id="email_phonenumber" name="email_phonenumber" placeholder="Enter your email or phone number" required/>
          </div>
          <div className="flex flex-col w-full gap-2">
            <PasswordInput id="password" name="password" />
          </div>
          <div className="grid grid-cols-2 w-full mt-0 pt-0 leading-none">
            <div className="flex items-center space-x-2 leading-none">
              <Checkbox id="remember" className="py-0 "/>
              <label htmlFor="remember" className="text-base text-neutral-900 leading-none m-0 p-0">
                Remember me
              </label>
            </div>
            <Button variant={"link"} className="text-base justify-end py-0">Forgot Password?</Button>
          </div>
          <div className="flex flex-col gap-[20px] w-full">
            <Button type="submit">Sign In</Button>
            <Button variant={"outline"}>
            <svg
                  width="21"
                  height="20"
                  viewBox="0 0 21 20"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M20.5 10.2273C20.5 9.51818 20.4351 8.83636 20.3145 8.18182H10.7041V12.0545H16.1957C15.9545 13.3 15.231 14.3545 14.1456 15.0636V17.5818H17.4573C19.3868 15.8364 20.5 13.2727 20.5 10.2273Z"
                    fill="#4285F4"
                  />
                  <path
                    d="M10.7041 20C13.4592 20 15.769 19.1091 17.4573 17.5818L14.1456 15.0636C13.2365 15.6636 12.077 16.0273 10.7041 16.0273C8.05102 16.0273 5.79685 14.2727 4.9898 11.9091H1.59462V14.4909C3.27365 17.7545 6.71521 20 10.7041 20Z"
                    fill="#34A853"
                  />
                  <path
                    d="M4.9898 11.9C4.78571 11.3 4.66512 10.6636 4.66512 10C4.66512 9.33636 4.78571 8.7 4.9898 8.1V5.51818H1.59462C0.898887 6.86364 0.5 8.38182 0.5 10C0.5 11.6182 0.898887 13.1364 1.59462 14.4818L4.2384 12.4636L4.9898 11.9Z"
                    fill="#FBBC05"
                  />
                  <path
                    d="M10.7041 3.98182C12.2069 3.98182 13.5427 4.49091 14.6095 5.47273L17.5315 2.60909C15.7597 0.990909 13.4592 0 10.7041 0C6.71521 0 3.27365 2.24546 1.59462 5.51818L4.9898 8.1C5.79685 5.73636 8.05102 3.98182 10.7041 3.98182Z"
                    fill="#EA4335"
                  />
                </svg>
              Sign In with Google</Button>
              <Button variant={"outline"}>Sign In as Employee</Button>
          </div>
          <div className="border border-neutral-300 w-full"></div>
          <div className="flex justify-center w-full text-sm">
            <p>
              Don't have account yet? &nbsp;
              <a href="/signup" className="text-info-500 hover:underline">
                Sign up now and get started
              </a>
            </p>
          </div>
        </div>
    </div>
  )
}