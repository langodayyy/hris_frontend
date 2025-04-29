import { Metadata } from "next";
import Sidebar from "../../components/sidebar";
import Image from "next/image";
// import HomeClient from "./aboutMe";

export default function SignUp() {
  return (
    <div className="p-[23px] w-screen h-screen">
      <div className="grid grid-cols-2 w-full h-full">
        <div className="w-full h-full">
          <div
            className="w-full h-full bg-cover bg-center"
            style={{ backgroundImage: 'url("/images/signin signup.png")' }}
          >
          </div>
        </div>
        <div className="w-full h-full flex flex-col justify-center gap-[25px] pb-[15px] pt-[10px] px-[50px]">
          <Image
            src="/images/logo hris with text.png"
            alt="Logo"
            width={135}
            height={94}
            className=""
          />
          <span className="py-[30px] text-4xl text-neutral-900">
            Sign Up
          </span>
          <span className="text-lg text-neutral-500">Create your account and streamline your employee management.</span>
          <div className="flex flex-col gap-5"></div>
        </div>
      </div>
    </div>
  );
}
