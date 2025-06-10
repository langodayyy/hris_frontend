"use client";
import { Input } from "@/components/ui/input";
import PasswordInput from "@/components/ui/passwordInput";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import SigninEmployeeForm from "@/components/custom/signinEmployeeForm";
import { useFormContext } from "@/context/FormContext";

export default function SignInAsEmployee() {

  const {errors} = useFormContext();

  return (
    <div className="flex h-screen w-screen bg-white p-[23px]">
      {/* image */}
        <div className="w-1/2">
          <img className=" h-full w-full object-cover rounded-[10px]" src="/images/signin signup.png" alt="cover.png"  />
        </div>
        
      {/* form  */}
        <div className="w-1/2 flex flex-col items-start justify-start px-[80px] py-[10px] gap-[25px] overflow-y-auto">
          <img className="h-[94px]" src="/images/logo hris with text.png" alt="logo.png" />
          <div className="py-[30px]">
            <h4 className="text-[34px] font-medium text-neutral-900">Sign In as Employee</h4>
          </div>
          <p className="text-base text-neutral-500">Welcome back to HRIS cmlabs! Manage everything with ease.</p>
          
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

          <SigninEmployeeForm></SigninEmployeeForm>
          <div className="flex flex-col gap-[20px] w-full">
            {/* <Button type="submit">Sign In</Button> */}
            {/* <Button variant={"outline"}>Use a different sign in method</Button> */}
            <a href="/sign-in"><Button variant={"outline"}>Sign In as Admin</Button></a>
          </div>
          <div className="border border-neutral-300 w-full"></div>
          <div className="flex justify-center w-full text-sm">
            <p>
              Dont have account yet? &nbsp;
              <a href="/sign-up" className="text-info-500 hover:underline">
                Sign up now and get started
              </a>
            </p>
          </div>
        </div>
    </div>
  )
}