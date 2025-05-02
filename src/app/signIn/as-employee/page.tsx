"use client";
import { Input } from "@/components/ui/input";
import PasswordInput from "@/components/ui/passwordInput";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";

export default function SignInAsEmployee() {

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
          <div className="flex flex-col w-full gap-2">
            <label htmlFor="id_company" className="font-medium text-neutral-900">ID Company</label>
            <Input type="number" id="id_company" name="id_company" placeholder="Enter your company id" required/>
          </div>
          <div className="flex flex-col w-full gap-2">
            <label htmlFor="id_employee" className="font-medium text-neutral-900">ID Employee</label>
            <Input type="number" id="id_employee" name="id_employee" placeholder="Enter your employee id" required/>
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
            {/* <Button variant={"link"} className="text-base justify-end py-0">Forgot Password?</Button> */}
            <Dialog>
                <DialogTrigger asChild>
                    <Button variant={"link"} className="text-base justify-end py-0">Forgot Password?</Button>
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
          <div className="flex flex-col gap-[20px] w-full">
            <Button type="submit">Sign In</Button>
            <Button variant={"outline"}>Use a different sign in method</Button>
            <Button variant={"outline"}>Sign In as Employee</Button>
          </div>
          <div className="border border-neutral-300 w-full"></div>
          <div className="flex justify-center w-full text-sm">
            <p>
              Dont have account yet? &nbsp;
              <a href="/signup" className="text-info-500 hover:underline">
                Sign up now and get started
              </a>
            </p>
          </div>
        </div>
    </div>
  )
}