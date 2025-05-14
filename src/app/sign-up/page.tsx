"use client";

import Image from "next/image";
import { Button } from "@/components/ui/button";
import SignupForm from "../../components/custom/signupForm";

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
              Sign Up
            </span>
            <span className="text-lg  text-neutral-500">
              Create your account and streamline your employee management.
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

            <SignupForm></SignupForm>
            <div className="w-full">
              <Button variant={"outline"} >
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
                Sign Up with Google
              </Button>
            </div>
            <div className="border border-neutral-300"></div>
            <div className="flex justify-center text-sm ">
              <p>
                Already have an account? &nbsp;
                <a href="/sign-in" className="text-info-500 hover:underline">
                  Sign In
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
