"use client";
import { Button } from "@/components/ui/button";
import Image from "next/image";

export default function Home() {
  return (
    //  <Button variant={"link"}><a href="/sign-up">Sign Up Here</a></Button>

    <div className="flex flex-col bg-white h-screen">
      <div className="grid grid-cols-3 justify-start items-center h-20 px-20 py-5 bg-white outline-1 outline-offset-[-1px] outline-gray-200">
        <div className="justify-start text-black text-4xl font-extrabold">HRIS</div>
        <div className="flex justify-center items-center gap-14">
          <div className="justify-start text-lg font-medium">Home</div>
          <div className="justify-start text-lg font-medium">Features</div>
          <div className="justify-start text-lg font-medium">Price</div>
        </div>
        <div className="flex justify-end">
          <Button className="text-lg px-15 py-3 w-fit h-fit">Sign In</Button>
        </div>
      </div>

      <div className="flex flex-col justify-start items-center gap-16 bg-white px-[200px] pb-[50px]">
        <div className="flex flex-col justify-start gap-[32px] bg-white px-40">
          <div className=" text-center justify-start text-7xl font-bold font-stretch-auto font-sans pt-[70px] px-20">
            Managing human resource data in your office been easier
          </div>
          <div className="w-full text-center text-xl">
            With HRIS, you can manage payroll, HR and attendance processes in
            one integrated software. Manage leave applications, attendance,
            overtime and employee data management more practically.
          </div>
          <div className="flex justify-center">
            <Button className="font-semibold w-fit px-[63px] py-[18px] text-lg shadow-2xl shadow-blue-500/70">
              Register Now
            </Button>
          </div>
        </div>

        <div>
          <Image
            src="/images/desktop.png"
            alt="HRIS Dashboard"
            width={1413}
            height={860}
          />
        </div>

        <div className="flex flex-col gap-[50px] justify-center text-center">
          <div className="flex flex-col gap-[5px]">
            <div className="text-lg">
              Helpfull to manage your organization with
            </div>
            <div className="text-[40px] font-sans font-semibold">
              HRIS Features
            </div>
          </div>
          <div className="flex flex-row gap-[50px] justify-center">
            <div className="flex flex-col justify-start items-center gap-[17px] py-[40px] px-[30px] w-[350] h-[300] rounded-[20px] outline outline-2 outline-offset-[-2px] outline-zinc-100">
              <Image
                src="/images/icon.png"
                alt="HRIS Dashboard"
                width={70}
                height={70}
              />
              <div className="text-2xl font-semibold font-sans">
                Employee Management
              </div>
              <div className="text-sm text-gray-500">
                Manage all employee data in one centralized system. Everything
                is stored securely and easily accessible whenever needed.
              </div>
            </div>
            <div className="flex flex-col justify-start items-center gap-[17px] py-[40px] px-[30px] w-[350] h-[300] rounded-[20px] outline outline-2 outline-offset-[-2px] outline-zinc-100">
              <Image
                src="/images/icon.png"
                alt="HRIS Dashboard"
                width={70}
                height={70}
              />
              <div className="text-2xl font-semibold font-sans">
                Employee Management
              </div>
              <div className="text-sm text-gray-500">
                Manage all employee data in one centralized system. Everything
                is stored securely and easily accessible whenever needed.
              </div>
            </div>
          </div>
          <div className="flex flex-row gap-[50px] justify-center">
            <div className="flex flex-col justify-start items-center gap-[17px] py-[40px] px-[30px] w-[350] h-[300] rounded-[20px] outline outline-2 outline-offset-[-2px] outline-zinc-100">
              <Image
                src="/images/icon.png"
                alt="HRIS Dashboard"
                width={70}
                height={70}
              />
              <div className="text-2xl font-semibold font-sans">
                Employee Management
              </div>
              <div className="text-sm text-gray-500">
                Manage all employee data in one centralized system. Everything
                is stored securely and easily accessible whenever needed.
              </div>
            </div>
            <div className="flex flex-col justify-start items-center gap-[17px] py-[40px] px-[30px] w-[350] h-[300] rounded-[20px] outline outline-2 outline-offset-[-2px] outline-zinc-100">
              <Image
                src="/images/icon.png"
                alt="HRIS Dashboard"
                width={70}
                height={70}
              />
              <div className="text-2xl font-semibold font-sans">
                Employee Management
              </div>
              <div className="text-sm text-gray-500">
                Manage all employee data in one centralized system. Everything
                is stored securely and easily accessible whenever needed.
              </div>
            </div>
            <div className="flex flex-col justify-start items-center gap-[17px] py-[40px] px-[30px] w-[350] h-[300] rounded-[20px] outline outline-2 outline-offset-[-2px] outline-zinc-100">
              <Image
                src="/images/icon.png"
                alt="HRIS Dashboard"
                width={70}
                height={70}
              />
              <div className="text-2xl font-semibold font-sans">
                Employee Management
              </div>
              <div className="text-sm text-gray-500">
                Manage all employee data in one centralized system. Everything
                is stored securely and easily accessible whenever needed.
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-[60px] justify-center">
          <div className="text-[40px] font-sans font-semibold flex justify-center">
            Work smarter with easy access for user
          </div>
          <div className="flex flex-row justify-start gap-[50px]">
            <Image
              src="/images/background-landing.png"
              alt="HRIS Dashboard"
              width={500}
              height={600}
            />
            <div className="absolute w-[500px] h-[600px]">
              <div className="flex flex-col gap-[37px] px-[60px] py-[50px]">
                <div className="flex flex-col  gap-4">
                  <div className="text-[40px] text-white font-sans font-bold leading-[45px]">
                    Our Working Process – How We Work For Your HR Team
                  </div>
                  <div className="text-lg text-gray-200 leading-[30px] ">
                    We simplify your HR operations through a smart, integrated
                    system. From employee management to attendance tracking and
                    automated reports — everything is done in one easy-to-use
                    platform.
                  </div>
                </div>
                <Button className="bg-white text-gray-950 font-semibold w-fit px-15 py-5 text-lg hover:bg-gray-300">
                  Get Started
                </Button>
              </div>
            </div>

            <div className="flex flex-col py-[50px] gap-[70px] w-full">
              <div className="flex flex-row gap-[30px] w-full">
                <div className="flex flex-col gap-[10px] w-full">
                  <div className="text-4xl font-sans font-bold">01</div>
                  <div className="text-3xl font-sans font-bold">
                    Create your account
                  </div>
                  <div className="text-lg text-gray-400">
                    Sign up for a HR company account and start managing employee
                    data in just minutes.
                  </div>
                </div>
                <div className="flex flex-col gap-[10px] w-full">
                  <div className="text-4xl font-sans font-bold">02</div>
                  <div className="text-3xl font-sans font-bold">
                    Add and Manage Employees
                  </div>
                  <div className="text-lg text-gray-400">
                    Enter complete employee data starting from personal
                    information, position, to employment contract.
                  </div>
                </div>
              </div>
              <div className="flex flex-row gap-[30px] w-full">
                <div className="flex flex-col gap-[10px] w-full">
                  <div className="text-4xl font-sans font-bold">01</div>
                  <div className="text-3xl font-sans font-bold">
                    Create your account
                  </div>
                  <div className="text-lg text-gray-400">
                    Sign up for a HR company account and start managing employee
                    data in just minutes.
                  </div>
                </div>
                <div className="flex flex-col gap-[10px] w-full">
                  <div className="text-4xl font-sans font-bold">02</div>
                  <div className="text-3xl font-sans font-bold">
                    Add and Manage Employees
                  </div>
                  <div className="text-lg text-gray-400">
                    Enter complete employee data starting from personal
                    information, position, to employment contract.
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-[46px] justify-center w-full">
            <div className="flex flex-col gap-[15px] text-center ">
              <span className="text-lg">Pricing</span>
              <span className="text-[40px] font-bold font-sans">
                HR management made easy with HRIS
              </span>
              <span className="text-2xl font-sans text-[#BA3C54] font-bold">
                Free 14-day trial. No credit card required. Pay-as-you-go after
                trial ends.
              </span>
            </div>

            <div className="flex flex-row justify-center gap-[54px]">
              <div className="flex flex-col px-[30px] py-[50px] outline-1 outline-gray-300 w-[430px] h-fit gap-[25px] text-center rounded-[30px]">
                <span className="text-3xl font-sans font-bold">Essential</span>
                <div className="flex w-full h-[220px] bg-[url('/images/price01.png')] bg-cover bg-center items-center py-5 px-7 gap-3.5 flex-col text-center justify-center text-white rounded-2xl">
                  <div className="flex flex-col gap-0.5">
                    <span className="text-5xl font-bold font-sans ">
                      IDR 000000
                    </span>
                    <span>per month</span>
                  </div>
                  <span>
                    Manage HR easier with smart tools and world-class
                    support for your HR team
                  </span>
                </div>
                <span>Get started with..</span>

                <div className="outline-1 "></div>
                <div className="flex flex-col gap-3">
                  <span className="flex flex-row items-center gap-3">
                    <svg
                      width="15"
                      height="13"
                      viewBox="0 0 15 13"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M14 1L4.9 12L1 7.875"
                        stroke="#2FCF3F"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                    Feature 01
                  </span>
                  <span className="flex flex-row items-center gap-3">
                    <svg
                      width="15"
                      height="13"
                      viewBox="0 0 15 13"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M14 1L4.9 12L1 7.875"
                        stroke="#2FCF3F"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                    Feature 01
                  </span>
                  <span className="flex flex-row items-center gap-3">
                    <svg
                      width="15"
                      height="13"
                      viewBox="0 0 15 13"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M14 1L4.9 12L1 7.875"
                        stroke="#2FCF3F"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                    Feature 01
                  </span>
                  <span className="flex flex-row items-center gap-3">
                    <svg
                      width="15"
                      height="13"
                      viewBox="0 0 15 13"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M14 1L4.9 12L1 7.875"
                        stroke="#2FCF3F"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                    Feature 01
                  </span>
                  <span className="flex flex-row items-center gap-3">
                    <svg
                      width="15"
                      height="13"
                      viewBox="0 0 15 13"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M14 1L4.9 12L1 7.875"
                        stroke="#2FCF3F"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                    Feature 01
                  </span>
                  <span className="flex flex-row items-center gap-3">
                    <svg
                      width="15"
                      height="13"
                      viewBox="0 0 15 13"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M14 1L4.9 12L1 7.875"
                        stroke="#2FCF3F"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                    Feature 01
                  </span>
                  <span className="flex flex-row items-center gap-3">
                    <svg
                      width="15"
                      height="13"
                      viewBox="0 0 15 13"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M14 1L4.9 12L1 7.875"
                        stroke="#2FCF3F"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                    Feature 01
                  </span>
                  <span className="flex flex-row items-center gap-3">
                    <svg
                      width="15"
                      height="13"
                      viewBox="0 0 15 13"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M14 1L4.9 12L1 7.875"
                        stroke="#2FCF3F"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                    Feature 01
                  </span>
                </div>
                <div className="outline-1 outline-gray-300"></div>
                <Button>Get Started</Button>
              </div>
              <div className="flex flex-col px-[30px] py-[50px] outline-1 outline-gray-300 w-[430px] h-fit gap-[25px] text-center rounded-[30px]">
                <span className="text-3xl font-sans font-bold">Essential</span>
                <div className="flex w-full h-[220px] bg-[url('/images/price01.png')] bg-cover bg-center items-center py-5 px-7 gap-3.5 flex-col text-center justify-center text-white rounded-2xl">
                  <div className="flex flex-col gap-0.5">
                    <span className="text-5xl font-bold font-sans ">
                      IDR 000000
                    </span>
                    <span>per month</span>
                  </div>
                  <span>
                    Manage HR easier with smart tools and world-class
                    support for your HR team
                  </span>
                </div>
                <span>Get started with..</span>

                <div className="outline-1 "></div>
                <div className="flex flex-col gap-3">
                  <span className="flex flex-row items-center gap-3">
                    <svg
                      width="15"
                      height="13"
                      viewBox="0 0 15 13"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M14 1L4.9 12L1 7.875"
                        stroke="#2FCF3F"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                    Feature 01
                  </span>
                  <span className="flex flex-row items-center gap-3">
                    <svg
                      width="15"
                      height="13"
                      viewBox="0 0 15 13"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M14 1L4.9 12L1 7.875"
                        stroke="#2FCF3F"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                    Feature 01
                  </span>
                  <span className="flex flex-row items-center gap-3">
                    <svg
                      width="15"
                      height="13"
                      viewBox="0 0 15 13"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M14 1L4.9 12L1 7.875"
                        stroke="#2FCF3F"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                    Feature 01
                  </span>
                  <span className="flex flex-row items-center gap-3">
                    <svg
                      width="15"
                      height="13"
                      viewBox="0 0 15 13"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M14 1L4.9 12L1 7.875"
                        stroke="#2FCF3F"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                    Feature 01
                  </span>
                  <span className="flex flex-row items-center gap-3">
                    <svg
                      width="15"
                      height="13"
                      viewBox="0 0 15 13"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M14 1L4.9 12L1 7.875"
                        stroke="#2FCF3F"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                    Feature 01
                  </span>
                  <span className="flex flex-row items-center gap-3">
                    <svg
                      width="15"
                      height="13"
                      viewBox="0 0 15 13"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M14 1L4.9 12L1 7.875"
                        stroke="#2FCF3F"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                    Feature 01
                  </span>
                  <span className="flex flex-row items-center gap-3">
                    <svg
                      width="15"
                      height="13"
                      viewBox="0 0 15 13"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M14 1L4.9 12L1 7.875"
                        stroke="#2FCF3F"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                    Feature 01
                  </span>
                  <span className="flex flex-row items-center gap-3">
                    <svg
                      width="15"
                      height="13"
                      viewBox="0 0 15 13"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M14 1L4.9 12L1 7.875"
                        stroke="#2FCF3F"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                    Feature 01
                  </span>
                </div>
                <div className="outline-1 outline-gray-300"></div>
                <Button>Get Started</Button>
              </div>
              <div className="flex flex-col px-[30px] py-[50px] outline-1 outline-gray-300 w-[430px] h-fit gap-[25px] text-center rounded-[30px]">
                <span className="text-3xl font-sans font-bold">Essential</span>
                <div className="flex w-full h-[220px] bg-[url('/images/price01.png')] bg-cover bg-center items-center py-5 px-7 gap-3.5 flex-col text-center justify-center text-white rounded-2xl">
                  <div className="flex flex-col gap-0.5">
                    <span className="text-5xl font-bold font-sans ">
                      IDR 000000
                    </span>
                    <span>per month</span>
                  </div>
                  <span>
                    Manage HR easier with smart tools and world-class
                    support for your HR team
                  </span>
                </div>
                <span>Get started with..</span>

                <div className="outline-1 "></div>
                <div className="flex flex-col gap-3">
                  <span className="flex flex-row items-center gap-3">
                    <svg
                      width="15"
                      height="13"
                      viewBox="0 0 15 13"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M14 1L4.9 12L1 7.875"
                        stroke="#2FCF3F"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                    Feature 01
                  </span>
                  <span className="flex flex-row items-center gap-3">
                    <svg
                      width="15"
                      height="13"
                      viewBox="0 0 15 13"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M14 1L4.9 12L1 7.875"
                        stroke="#2FCF3F"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                    Feature 01
                  </span>
                  <span className="flex flex-row items-center gap-3">
                    <svg
                      width="15"
                      height="13"
                      viewBox="0 0 15 13"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M14 1L4.9 12L1 7.875"
                        stroke="#2FCF3F"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                    Feature 01
                  </span>
                  <span className="flex flex-row items-center gap-3">
                    <svg
                      width="15"
                      height="13"
                      viewBox="0 0 15 13"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M14 1L4.9 12L1 7.875"
                        stroke="#2FCF3F"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                    Feature 01
                  </span>
                  <span className="flex flex-row items-center gap-3">
                    <svg
                      width="15"
                      height="13"
                      viewBox="0 0 15 13"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M14 1L4.9 12L1 7.875"
                        stroke="#2FCF3F"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                    Feature 01
                  </span>
                  <span className="flex flex-row items-center gap-3">
                    <svg
                      width="15"
                      height="13"
                      viewBox="0 0 15 13"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M14 1L4.9 12L1 7.875"
                        stroke="#2FCF3F"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                    Feature 01
                  </span>
                  <span className="flex flex-row items-center gap-3">
                    <svg
                      width="15"
                      height="13"
                      viewBox="0 0 15 13"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M14 1L4.9 12L1 7.875"
                        stroke="#2FCF3F"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                    Feature 01
                  </span>
                  <span className="flex flex-row items-center gap-3">
                    <svg
                      width="15"
                      height="13"
                      viewBox="0 0 15 13"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M14 1L4.9 12L1 7.875"
                        stroke="#2FCF3F"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                    Feature 01
                  </span>
                </div>
                <div className="outline-1 outline-gray-300"></div>
                <Button>Get Started</Button>
              </div>

            </div>
          </div>
        </div>
      </div>

      <div className="bg-blue-950 text-white flex flex-col h-20 px-px-5 py-5">
        <span>HRIS</span>
        <span>Footer</span>
      </div>
    </div>
  );
}