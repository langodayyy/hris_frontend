// app/page.tsx atau halaman utama Anda

"use client";
import { Button } from "@/components/ui/button";
import PricingCard from "@/components/ui/pricing";
import RevealOnScroll from "@/components/ui/reveal-on-scroll";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Image from "next/image";
import Link from "next/link";


export default function Home() {
  return (
    <div className="flex flex-col bg-white">
      {/* Navbar Section */}
      <div className="sticky top-0 z-50 shadow-md grid grid-cols-3 justify-start items-center h-fit px-20 py-5 bg-white outline-1 outline-offset-[-1px] outline-gray-200">
        <div className="justify-start items-center text-black text-4xl font-bold font-sans flex flex-row gap-2">
          <Image
            src="/images/logo hris.png"
            alt="HRIS Dashboard"
            width={30}
            height={35}
          />
          HRIS
        </div>
        <div className="flex justify-center items-center gap-14 ">
          <Link href="#home" scroll={true}>
            <div className="justify-start text-lg font-medium cursor-pointer hover:font-semibold">
              Home
            </div>
          </Link>
          <Link href="#features" scroll={true}>
            <div className="justify-start text-lg font-medium cursor-pointer hover:font-semibold">
              Features
            </div>
          </Link>
          <Link href="#price" scroll={true}>
            <div className="justify-start text-lg font-medium cursor-pointer hover:font-semibold">
              Price
            </div>
          </Link>
        </div>
        <div className="flex justify-end">
          <Link href="/sign-in">
            <Button className="text-lg px-15 py-3 w-fit h-fit">Sign In</Button>
          </Link>
        </div>
      </div>

      {/* home section */}
      <div
        id="home"
        className="flex flex-col justify-start items-center gap-16 bg-white px-[200px] pb-[50px]"
      >
        {/* sambutan */}
        <div className="flex flex-col justify-start gap-[32px] bg-white px-40">
          <RevealOnScroll
            animationType="slide-right"
            threshold={0.1}
            duration="duration-1000"
          >
            <div className=" text-center justify-start text-7xl font-bold font-stretch-auto font-sans pt-[70px]">
              Managing human resource data in your office been easier
            </div>
          </RevealOnScroll>
          <RevealOnScroll
            animationType="slide-left"
            threshold={0.1}
            duration="duration-1000"
          >
            <div className="w-full text-center text-xl">
              With HRIS, you can manage payroll, HR and attendance processes in
              one integrated software. Manage leave applications, attendance,
              overtime and employee data management more practically.
            </div>
          </RevealOnScroll>
          <div className="flex justify-center">
            <RevealOnScroll
              animationType="slide-up"
              threshold={0.1}
              duration="duration-1000"
            >
              <Link href="#freetrial" scroll={true}>
                <Button className="font-semibold w-fit px-[63px] py-[18px] text-lg shadow-2xl shadow-blue-500/70">
                  Get Started Free
                </Button>
              </Link>
            </RevealOnScroll>
          </div>
        </div>

        {/* dashboard image */}
        <RevealOnScroll
          animationType="slide-up"
          threshold={0.1}
          duration="duration-1000"
        >
          <div>
            <Image
              src="/images/desktop.png"
              alt="HRIS Dashboard"
              width={1413}
              height={860}
              priority
            />
          </div>
        </RevealOnScroll>

        {/* Features Section */}
        <div
          id="features"
          className="flex flex-col gap-[50px] justify-center text-center"
        >
          {/* features title */}
          <div className="flex flex-col gap-[5px]">
            <RevealOnScroll
              animationType="fade-in"
              threshold={0.1}
              duration="duration-3000"
            >
              <div className="text-lg">
                Helpfull to manage your organization with
              </div>
            </RevealOnScroll>

            <RevealOnScroll
              animationType="scale-in"
              threshold={0.5}
              duration="duration-2000"
            >
              <div className="text-[40px] font-sans font-semibold">
                HRIS Features
              </div>
            </RevealOnScroll>
          </div>

          {/* children of features */}
          <div className="flex flex-row gap-[50px] justify-center">
            {/* analytics */}
            <RevealOnScroll
              animationType="slide-up"
              threshold={0.5}
              duration="duration-500"
              delay="delay-100"
            >
              <div className="flex flex-col justify-start items-center gap-[17px] py-[40px] px-[30px] w-[350px] h-[300px] rounded-[20px] outline-2 outline-offset-[-2px] outline-zinc-100">
                <Image
                  src="/images/analythic-icon.png"
                  alt="HRIS Dashboard"
                  width={70}
                  height={70}
                />
                <div className="text-2xl font-semibold font-sans">
                  Analytics
                </div>
                <div className="text-gray-500">
                  Monitor employee performance and trends in real-time. Help HR
                  and management make data-driven decisions.
                </div>
              </div>
            </RevealOnScroll>

            {/* employee */}
            <RevealOnScroll
              animationType="slide-up"
              threshold={0.5}
              duration="duration-500"
              delay="delay-300"
            >
              <div className="flex flex-col justify-start items-center gap-[17px] py-[40px] px-[30px] w-[350px] h-[300px] rounded-[20px] outline outline-2 outline-offset-[-2px] outline-zinc-100">
                <Image
                  src="/images/employee-icon.png"
                  alt="HRIS Dashboard"
                  width={70}
                  height={70}
                />
                <div className="text-2xl font-semibold font-sans">
                  Employee Management
                </div>
                <div className="text-gray-500">
                  Manage all employee data in one centralized system. Everything
                  is stored securely and easily accessible whenever needed.
                </div>
              </div>
            </RevealOnScroll>
          </div>
          <div className="flex flex-row gap-[50px] justify-center">
            {/* attendance */}
            <RevealOnScroll
              animationType="slide-up"
              threshold={0.5}
              duration="duration-500"
              delay="delay-400"
            >
              <div className="flex flex-col justify-start items-center gap-[17px] py-[40px] px-[30px] w-[350px] h-[300px] rounded-[20px] outline-2 outline-offset-[-2px] outline-zinc-100">
                <Image
                  src="/images/attendance-icon.png"
                  alt="HRIS Dashboard"
                  width={70}
                  height={70}
                />
                <div className="text-2xl font-semibold font-sans">
                  Attendance Management
                </div>
                <div className="text-gray-500">
                  Record and manage attendance in one system. Track entry, exit,
                  overtime, and leave in real-time with online attendance.
                </div>
              </div>
            </RevealOnScroll>

            {/* overtime */}
            <RevealOnScroll
              animationType="slide-up"
              threshold={0.5}
              duration="duration-500"
              delay="delay-700"
            >
              <div className="flex flex-col justify-start items-center gap-[17px] py-[40px] px-[30px] w-[350px] h-[300px] rounded-[20px]  outline-2 outline-offset-[-2px] outline-zinc-100">
                <Image
                  src="/images/overtime-icon.png"
                  alt="HRIS Dashboard"
                  width={70}
                  height={70}
                />
                <div className="text-2xl font-semibold font-sans">
                  Overtime Record
                </div>
                <div className="text-gray-500">
                  Track and calculate employee overtime accurately for payroll
                  and reporting needs.
                </div>
              </div>
            </RevealOnScroll>

            {/* document */}
            <RevealOnScroll
              animationType="slide-up"
              threshold={0.5}
              duration="duration-500"
              delay="delay-1000"
            >
              <div className="flex flex-col justify-start items-center gap-[17px] py-[40px] px-[30px] w-[350px] h-[300px] rounded-[20px] outline-2 outline-offset-[-2px] outline-zinc-100">
                <Image
                  src="/images/document-icon.png"
                  alt="HRIS Dashboard"
                  width={70}
                  height={70}
                />
                <div className="text-2xl font-semibold font-sans">
                  Document Management
                </div>
                <div className="text-gray-500">
                  Manage all employee data in one centralized system. Everything
                  is stored securely and easily accessible whenever needed.
                </div>
              </div>
            </RevealOnScroll>
          </div>
        </div>

        {/* work with hris */}
        <div className="flex flex-col gap-[60px] justify-center items-center w-full">
          <RevealOnScroll
            animationType="scale-in"
            threshold={0.5}
            duration="duration-2000"
          >
            <div className="text-[40px] font-sans font-semibold flex justify-center">
              Work smarter with easy access for user
            </div>
          </RevealOnScroll>

          <div className="flex flex-row justify-center gap-[50px] ">
            {/* image + text */}
            <RevealOnScroll
              animationType="slide-up"
              threshold={0.5}
              duration="duration-2000"
            >
              <div className="relative w-[500px] h-[600px]">
                <Image
                  src="/images/background-landing.png"
                  alt="HRIS Dashboard"
                  width={500}
                  height={600}
                />
                <div className="absolute inset-0">
                  {" "}
                  <div className="flex flex-col gap-[37px] px-[60px] py-[50px]">
                    <div className="flex flex-col gap-4">
                      <div className="text-[40px] text-white font-sans font-bold leading-[45px]">
                        Our Working Process – How We Work For Your HR Team
                      </div>
                      <div className="text-lg text-gray-200 leading-[30px] ">
                        We simplify your HR operations through a smart,
                        integrated system. From employee management to
                        attendance tracking and automated reports — everything
                        is done in one easy-to-use platform.
                      </div>
                    </div>
                    <Link href="/sign-up">
                      <button className="bg-white text-gray-950 font-semibold w-fit px-15 py-5 text-lg hover:bg-gray-300 rounded-lg">
                        Get Started
                      </button>
                    </Link>
                  </div>
                </div>
              </div>
            </RevealOnScroll>

            {/* text 1-4 */}
            <div className="flex flex-col py-[50px] gap-[50px] w-full items-center">
              <div className="grid grid-cols-2 gap-[30px] w-full">
                {/* 01 */}
                <RevealOnScroll
                  animationType="slide-right"
                  threshold={0.5}
                  duration="duration-500"
                  delay="delay-500"
                >
                  <div className="flex flex-col gap-[10px] w-full">
                    <div className="text-4xl font-sans font-bold">01</div>
                    <div className="text-3xl font-sans font-bold">
                      Create Your Account
                    </div>
                    <div className="text-lg text-gray-400">
                      Sign up for a HR company account and start managing
                      employee data in just minutes.
                    </div>
                  </div>
                </RevealOnScroll>

                {/* 02 */}
                <RevealOnScroll
                  animationType="slide-right"
                  threshold={0.5}
                  duration="duration-500"
                  delay="delay-700"
                >
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
                </RevealOnScroll>
              </div>

              <div className="grid grid-cols-2 gap-[30px] w-full">
                {/* 03 */}
                <RevealOnScroll
                  animationType="slide-right"
                  threshold={0.5}
                  duration="duration-500"
                  delay="delay-900"
                >
                  <div className="flex flex-col gap-[10px] w-full">
                    <div className="text-4xl font-sans font-bold">03</div>
                    <div className="text-3xl font-sans font-bold">
                      Automate Attendance
                    </div>
                    <div className="text-lg text-gray-400">
                      Use online attendance, leave, overtime, and automatic
                      notification features without any hassle.
                    </div>
                  </div>
                </RevealOnScroll>

                {/* 04 */}
                <RevealOnScroll
                  animationType="slide-right"
                  threshold={0.5}
                  duration="duration-500"
                  delay="delay-1100"
                >
                  <div className="flex flex-col gap-[10px] w-full">
                    <div className="text-4xl font-sans font-bold">04</div>
                    <div className="text-3xl font-sans font-bold">
                      Access Report and Insight
                    </div>
                    <div className="text-lg text-gray-400">
                      View real-time employee reports and statistics to help
                      make faster decisions.
                    </div>
                  </div>
                </RevealOnScroll>
              </div>
            </div>
          </div>
        </div>

        {/* price */}
        <div
          id="price"
          className="flex flex-col gap-[46px] justify-center items-center w-full"
        >
          <div className="flex flex-col gap-[15px] text-center ">
            {/* title */}
            <RevealOnScroll
              animationType="slide-up"
              threshold={0.5}
              duration="duration-1000"
              delay="delay-300"
            >
              <span className="text-lg">Pricing</span>
            </RevealOnScroll>

            <RevealOnScroll
              animationType="slide-up"
              threshold={0.5}
              duration="duration-1000"
              delay="delay-700"
            >
              <span className="text-[40px] font-bold font-sans">
                HR management made easy with HRIS
              </span>
            </RevealOnScroll>

            <div className="flex justify-center">
              {/* tabs option */}
              <RevealOnScroll
                animationType="slide-up"
                threshold={0.5}
                duration="duration-1000"
                delay="delay-800"
              >
                <Tabs defaultValue="kurang" className="w-[400px] h-fit">
                  <TabsList className="h-15">
                    <TabsTrigger
                      className="text-lg h-full w-full "
                      value="kurang"
                    >
                      For teams{" < "}50
                    </TabsTrigger>
                    <TabsTrigger
                      className="text-lg h-full w-full "
                      value="lebih"
                    >
                      For teams 50+
                    </TabsTrigger>
                  </TabsList>

                  {/* price for employee < 50 */}
                  <TabsContent value="kurang">
                    <div className="flex flex-row items-start justify-center gap-5 mt-10">
                      {/* free price */}
                      <RevealOnScroll
                        animationType="slide-up"
                        threshold={0.5}
                        duration="duration-200"
                      >
                        <div className="flex justify-center items-center h-fit ">
                          <PricingCard
                            title="FREE"
                            imageUrl="/images/free-price.png"
                            currency="Try Free"
                            price="IDR.0"
                            description="Free trial for 14 days"
                            features={[
                              "Employee Management",
                              "Leave Requests",
                              "Attendance Tracking",
                              "Payroll Integration",
                              "Support via Chat",
                              "Performance Reviews",
                            ]}
                            buttonText="Claim Now"
                            //fungsi klik button ada di komponen tabs
                          />
                        </div>
                      </RevealOnScroll>

                      {/* card02 */}
                      <RevealOnScroll
                        animationType="slide-up"
                        threshold={0.5}
                        duration="duration-200"
                      >
                        <div className="flex justify-center items-center h-fit">
                          <PricingCard
                            title="Essential"
                            imageUrl="/images/price01.png"
                            currency="IDR"
                            price="10.000"
                            description="Intuitive, world-class support tools for growing teams"
                            features={[
                              "Employee Management",
                              "Leave Requests",
                              "Attendance Tracking",
                              "Payroll Integration",
                              "Support via Chat",
                              "Performance Reviews",
                            ]}
                            buttonText="Get Started"
                            //fungsi klik button ada di komponen tabs
                          />
                        </div>
                      </RevealOnScroll>

                      {/* card03 */}
                      <RevealOnScroll
                        animationType="slide-up"
                        threshold={0.5}
                        duration="duration-200"
                      >
                        <div className="flex justify-center items-center h-fit">
                          <PricingCard
                            title="Professional"
                            imageUrl="/images/price02.png"
                            currency="IDR"
                            price="15.000"
                            description="Intuitive, world-class support tools for growing teams"
                            features={[
                              "Employee Management",
                              "Leave Requests",
                              "Attendance Tracking",
                              "Payroll Integration",
                              "Support via Chat",
                              "Performance Reviews",
                              "Mobile Access",
                              "Custom Reports",
                              "Time Off Policies",
                              "Multi-user Access",
                            ]}
                            buttonText="Get Started"
                            //fungsi klik button ada di komponen tabs
                          />
                        </div>
                      </RevealOnScroll>

                      {/* card04 */}
                      <RevealOnScroll
                        animationType="slide-up"
                        threshold={0.5}
                        duration="duration-200"
                      >
                        <div className="flex justify-center items-center h-fit">
                          <PricingCard
                            title="Enterprise"
                            imageUrl="/images/price03.png"
                            currency="IDR"
                            price="20.000"
                            description="Intuitive, world-class support tools for growing teams"
                            features={[
                              "Employee Management",
                              "Leave Requests",
                              "Attendance Tracking",
                              "Payroll Integration",
                              "Support via Chat",
                              "Performance Reviews",
                              "Mobile Access",
                              "Custom Reports",
                              "Time Off Policies",
                              "Multi-user Access",
                            ]}
                            buttonText="Get Started"
                            //fungsi klik button ada di komponen tabs
                          />
                        </div>
                      </RevealOnScroll>

                      <div className=""></div>
                    </div>
                  </TabsContent>
                  <TabsContent value="lebih">
                    <div className="flex flex-row items-start justify-center gap-5 mt-10">
                      {/* free card */}
                      <RevealOnScroll
                        animationType="slide-up"
                        threshold={0.5}
                        duration="duration-200"
                      >
                        <div
                          id="freetrial"
                          className="flex justify-center items-center h-fit"
                        >
                          <PricingCard
                            title="Free Trial"
                            imageUrl="/images/free-price.png"
                            currency="Try Free"
                            price="IDR.0"
                            description="Free trial for 14 days"
                            features={[
                              "Employee Management",
                              "Leave Requests",
                              "Attendance Tracking",
                              "Payroll Integration",
                              "Support via Chat",
                              "Performance Reviews",
                            ]}
                            buttonText="Claim Now"
                            //fungsi klik button ada di komponen tabs
                          />
                        </div>
                      </RevealOnScroll>

                      {/* card02 */}
                      <RevealOnScroll
                        animationType="slide-up"
                        threshold={0.5}
                        duration="duration-200"
                      >
                        <div className="flex justify-center items-center h-fit">
                          <PricingCard
                            title="Essential"
                            imageUrl="/images/price01.png"
                            currency="IDR"
                            price="9.000"
                            description="Intuitive, world-class support tools for growing teams"
                            features={[
                              "Employee Management",
                              "Leave Requests",
                              "Attendance Tracking",
                              "Payroll Integration",
                              "Support via Chat",
                              "Performance Reviews",
                              "Mobile Access",
                              "Custom Reports",
                              "Time Off Policies",
                              "Multi-user Access",
                            ]}
                            buttonText="Get Started"
                            //fungsi klik button ada di komponen tabs
                          />
                        </div>
                      </RevealOnScroll>

                      {/* card03 */}
                      <RevealOnScroll
                        animationType="slide-up"
                        threshold={0.5}
                        duration="duration-200"
                      >
                        <div className="flex justify-center items-center h-fit">
                          <PricingCard
                            title="Professional"
                            imageUrl="/images/price02.png"
                            currency="IDR"
                            price="14.000"
                            description="Intuitive, world-class support tools for growing teams"
                            features={[
                              "Employee Management",
                              "Leave Requests",
                              "Attendance Tracking",
                              "Payroll Integration",
                              "Support via Chat",
                              "Performance Reviews",
                              "Mobile Access",
                              "Custom Reports",
                              "Time Off Policies",
                              "Multi-user Access",
                            ]}
                            buttonText="Get Started"
                            //fungsi klik button ada di komponen tabs
                          />
                        </div>
                      </RevealOnScroll>

                      {/* card04 */}
                      <RevealOnScroll
                        animationType="slide-up"
                        threshold={0.5}
                        duration="duration-200"
                      >
                        <div className="flex justify-center items-center h-fit">
                          <PricingCard
                            title="Enterprise"
                            imageUrl="/images/price03.png"
                            currency="IDR"
                            price="18.000"
                            description="Intuitive, world-class support tools for growing teams"
                            features={[
                              "Employee Management",
                              "Leave Requests",
                              "Attendance Tracking",
                              "Payroll Integration",
                              "Support via Chat",
                              "Performance Reviews",
                              "Mobile Access",
                              "Custom Reports",
                              "Time Off Policies",
                              "Multi-user Access",
                            ]}
                            buttonText="Get Started"
                            //fungsi klik button ada di komponen tabs
                          />
                        </div>
                      </RevealOnScroll>

                      <div className=""></div>
                    </div>
                  </TabsContent>
                </Tabs>
              </RevealOnScroll>
            </div>
          </div>
        </div>
      </div>

      {/* Footer Section */}
      <div className="bg-blue-900 text-white flex flex-col h-20 px-px-5 py-5 justify-center items-center">
        © 2025 HRIS. All rights reserved.
      </div>
    </div>
  );
}
