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
      <div className="sticky top-0 z-50 shadow-md grid grid-cols-3 justify-start items-center h-fit px-20 py-3 bg-white outline-1 outline-offset-[-1px] outline-gray-200">
        <div className="justify-start items-center text-black text-4xl font-bold font-sans flex flex-row gap-2">
          <svg
            width="84"
            height="54"
            viewBox="0 0 84 54"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <g clipPath="url(#clip0_729_2588)">
              <path
                d="M10.6335 2.27056C11.0008 1.81033 11.7352 1.22738 12.3168 1.0126C12.8983 0.797831 13.6634 0.644423 14.0001 0.644423C14.3367 0.613741 15.1631 0.889877 15.8364 1.22738C16.5096 1.5342 17.3054 2.23988 17.5808 2.76147C17.8868 3.25238 18.1317 4.26488 18.1317 4.97056C18.1317 5.7376 17.8868 6.68874 17.5196 7.27169C17.183 7.824 16.4178 8.499 15.8364 8.74446C15.2548 8.98991 14.4285 9.20469 14.0001 9.20469C13.5716 9.20469 12.7453 8.95923 12.1332 8.68309C11.5211 8.37628 10.7253 7.63991 10.3887 7.05692C9.92961 6.2592 9.80714 5.61488 9.89905 4.54101C9.96017 3.77397 10.2969 2.73079 10.6335 2.27056Z"
                fill="#24375C"
              />
              <path
                d="M18.8354 10.8308C19.2945 10.5547 20.0596 10.2478 20.5187 10.0944C20.9777 9.9717 21.8347 9.84897 22.4162 9.84897C22.9976 9.81829 23.977 9.94102 24.5586 10.0944C25.14 10.2478 26.0888 10.8922 26.6397 11.4751C27.4048 12.3649 27.619 12.8558 27.619 13.899C27.619 14.8194 27.3742 15.6172 26.7008 16.6603C26.2112 17.4581 24.5891 19.391 23.1507 20.9251C21.7123 22.4899 19.7842 24.7603 18.8966 25.9262C18.0091 27.0922 16.8155 28.8103 16.2646 29.7001C15.6832 30.5899 15.0404 31.3262 14.8568 31.2956C14.5508 31.2956 14.459 29.9456 14.459 25.5581C14.4895 22.1831 14.6426 18.8387 14.8874 17.4887C15.1016 16.2308 15.5302 14.6967 15.8362 14.1137C16.1116 13.5308 16.7237 12.641 17.1828 12.1808C17.6113 11.6899 18.3764 11.0762 18.8354 10.8308Z"
                fill="#24375C"
              />
              <path
                d="M75.1484 21.7229C75.5157 21.5389 76.1584 21.2627 76.5869 21.14C77.0154 21.0173 77.6887 20.9252 78.1172 20.8945C78.5456 20.8945 79.4332 21.0786 80.1065 21.3548C80.7797 21.6002 81.5756 22.0298 81.8816 22.3366C82.1877 22.6127 82.4018 23.1036 82.3406 23.4411C82.2794 23.7479 81.9734 24.2082 81.6367 24.4536C81.1165 24.8218 80.9328 24.7911 80.2595 24.2695C79.831 23.932 79.0659 23.5639 78.5763 23.4411C77.9335 23.2877 77.4133 23.3798 76.8317 23.7173C76.2604 24.0649 75.9748 24.4945 75.9748 25.0059C75.9748 25.4661 76.2503 25.9264 76.6787 26.2025C77.046 26.4173 78.1172 26.8775 79.0353 27.1536C79.9535 27.4604 81.1776 28.0127 81.7286 28.4116C82.31 28.8718 82.8303 29.6082 83.0446 30.3139C83.2282 30.9275 83.2894 31.8479 83.1669 32.3695C83.0446 32.8911 82.7691 33.5968 82.5243 33.9957C82.2794 34.3639 81.5143 34.9468 80.8104 35.2843C80.0453 35.6218 78.8516 35.8979 77.9642 35.8979C76.944 35.8979 76.0258 35.6627 75.2097 35.1923C74.567 34.8241 73.8019 34.1491 73.5264 33.6889C73.1898 33.0445 73.1592 32.707 73.404 32.3082C73.5876 32.0014 73.9855 31.7252 74.261 31.6945C74.5363 31.6332 75.2404 32.0014 75.8218 32.5229C76.6482 33.2286 77.199 33.4434 78.209 33.4434C79.0047 33.4434 79.7086 33.2286 80.0453 32.8911C80.3513 32.615 80.5962 32.0014 80.5656 31.5411C80.5656 30.8048 80.3207 30.59 78.9741 29.9763C78.0865 29.5775 76.7399 28.9639 76.0054 28.657C75.2709 28.3502 74.414 27.7366 74.0773 27.307C73.7101 26.8161 73.4958 26.0491 73.5264 25.2514C73.5264 24.515 73.7407 23.5332 73.9855 23.0116C74.2303 22.49 74.7506 21.9377 75.1484 21.7229Z"
                fill="#24375C"
              />
              <path
                d="M35.8213 28.5954C35.7906 24.7295 35.8824 21.4772 36.0355 21.3852C36.1885 21.2625 36.5558 21.1704 36.8618 21.1704C37.1679 21.1704 37.627 21.2318 37.8718 21.3238C38.2391 21.4465 38.3309 22.0602 38.3309 27.3068H44.7578V25.0056C44.7578 23.7477 44.9109 22.367 45.0639 21.9375C45.2476 21.4465 45.6149 21.1704 46.0739 21.1704C46.4411 21.1704 46.9309 21.3238 47.145 21.5386C47.4205 21.8454 47.5123 23.625 47.5123 28.6261C47.5123 34.6397 47.4511 35.3147 46.992 35.5602C46.6859 35.7443 46.1657 35.8056 45.829 35.7136C45.4924 35.6522 45.1251 35.284 45.0028 34.8852C44.8803 34.517 44.7578 33.1363 44.7578 29.4545H38.3309V32.3693C38.3309 34.9772 38.2696 35.3147 37.7187 35.5909C37.3821 35.775 36.8313 35.8363 36.4945 35.7443C35.9131 35.5909 35.8824 35.3147 35.8213 28.5954Z"
                fill="#24375C"
              />
              <path
                d="M52.0418 28.5954C52.0111 24.7295 52.103 21.4772 52.256 21.3852C52.4091 21.2625 53.9086 21.1704 55.5919 21.1704C58.0097 21.1704 58.9585 21.3238 59.999 21.784C60.7029 22.1215 61.5598 22.8272 61.8966 23.4102C62.3046 24.0647 62.5087 24.934 62.5087 26.0181C62.5087 26.8772 62.325 27.9818 62.0801 28.4727C61.8353 28.9329 61.3762 29.5465 60.3663 30.375L61.5905 32.3079C62.2637 33.3511 62.8146 34.3943 62.8146 34.609C62.8146 34.7931 62.478 35.2227 62.0496 35.5295C61.5293 35.867 61.162 35.959 60.9784 35.7443C60.8254 35.5602 60.0296 34.4556 57.7343 31.142L54.5513 30.9886V33.1363C54.5513 34.8545 54.4595 35.3454 54.0311 35.5602C53.7251 35.7443 53.1742 35.8056 52.8069 35.7136C52.103 35.5909 52.103 35.5909 52.0418 28.5954Z"
                fill="#24375C"
              />
              <path
                d="M66.732 28.3501C66.7015 24.6376 66.8238 21.4773 66.9463 21.3546C67.0993 21.2319 67.6502 21.1705 69.0887 21.3239L69.2417 35.2841L68.4766 35.683C67.8645 35.9898 67.6502 35.9591 67.2524 35.591C66.8238 35.1921 66.7627 34.1182 66.732 28.3501Z"
                fill="#24375C"
              />
              <path
                d="M7.81786 39.027C8.79713 37.8918 10.4499 35.7441 11.4598 34.2713C12.4698 32.7986 13.4491 31.602 13.6327 31.6634C13.847 31.7248 13.9388 33.8418 13.9082 37.7384C13.9082 41.9111 13.7245 44.427 13.3879 46.0225C13.1431 47.2804 12.5615 48.9066 12.1637 49.6429C11.7352 50.3486 11.0313 51.2077 10.5722 51.5145C10.0826 51.852 9.10318 52.3429 8.33805 52.5884C7.57304 52.8645 6.47118 53.0793 5.88976 53.0793C5.30821 53.0793 4.29826 52.9259 3.68616 52.7725C3.04349 52.5884 2.18657 52.0668 1.75805 51.5452C1.32965 51.0236 0.901129 50.1645 0.809338 49.6429C0.656312 48.9373 0.809338 48.2009 1.23774 47.2498C1.60503 46.4827 2.82923 44.7952 3.96165 43.4759C5.09395 42.1566 6.83847 40.1623 7.81786 39.027Z"
                fill="#24375C"
              />
              <path
                d="M1.36023 11.9661C1.75819 11.3831 2.55388 10.6468 3.13531 10.3706C3.74741 10.0638 4.87983 9.81836 5.73675 9.81836C6.59367 9.84904 7.75665 10.0025 8.33819 10.2172C8.9503 10.432 9.92957 10.9536 10.5724 11.4445C11.1845 11.9047 12.0414 12.9786 12.4698 13.807C12.8983 14.6661 13.3879 16.3536 13.5716 17.5809C13.7552 18.7775 14.0307 20.0354 14.1837 20.3422C14.3368 20.6184 14.4591 23.0422 14.4591 25.7115C14.4591 29.0865 14.3673 30.6513 14.0918 30.9275C13.8777 31.1115 13.5716 31.2956 13.4186 31.2956C13.2349 31.2956 12.684 30.6513 12.1637 29.8229C11.6741 29.0252 10.4806 27.3377 9.53172 26.0797C8.58301 24.8218 6.59367 22.4593 5.12465 20.8638C3.65562 19.2684 2.03357 17.274 1.57449 16.4149C1.08486 15.5865 0.687012 14.482 0.687012 13.9604C0.687012 13.4695 0.993064 12.549 1.36023 11.9661Z"
                fill="#82A4BC"
              />
              <path
                d="M13.9388 37.2171C13.8777 33.7807 13.9388 32.4 14.2448 32.0625C14.4285 31.8171 14.7651 31.6023 14.9182 31.6023C15.0712 31.5716 15.8363 32.5227 16.6014 33.658C17.3666 34.7932 18.7438 36.6955 19.6925 37.8921C20.6107 39.058 22.3858 41.1136 23.5793 42.4023C24.8035 43.7216 26.2114 45.4398 26.701 46.2375C27.3132 47.2193 27.6192 48.1091 27.6192 48.8761C27.6192 49.4898 27.4355 50.3796 27.1907 50.8705C26.9764 51.3307 26.395 51.975 25.9054 52.2818C25.4156 52.5886 24.2526 52.9261 23.3345 53.0182C22.2633 53.1102 21.1003 52.9875 20.121 52.6807C19.1417 52.3739 18.1317 51.7296 17.2748 50.8705C16.5097 50.1034 15.7751 48.9989 15.4997 48.1705C15.2549 47.4034 14.8569 45.6852 14.5509 44.3352C14.2755 42.9239 14.0307 39.9171 13.9388 37.2171Z"
                fill="#82A4BC"
              />
              <path
                d="M54.5515 28.5339L54.5821 26.0487L54.6126 23.5635L56.755 23.6555C58.5913 23.7782 58.9586 23.8703 59.4788 24.5453C59.8155 24.9748 60.0909 25.6498 60.0909 26.0794C60.0909 26.5089 59.8155 27.2146 59.4482 27.6748C58.8974 28.4726 58.6831 28.5339 54.5515 28.5339Z"
                fill="white"
              />
            </g>
            <defs>
              <clipPath id="clip0_729_2588">
                <rect width="84" height="54" fill="white" />
              </clipPath>
            </defs>
          </svg>
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
            <Button className="text-lg px-8 py-2">Sign In</Button>
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
              <Button
                className="font-semibold w-fit px-[63px] py-[18px] text-lg shadow-2xl shadow-blue-500/70"
                onClick={() => {
                  const priceSection = document.getElementById("price");
                  if (priceSection) {
                    priceSection.scrollIntoView({ behavior: "smooth" });
                  }
                }}
              >
                Get Started Free
              </Button>
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
                <Tabs defaultValue="kurang" className="w-[400px] h-fit ">
                  <TabsList className="h-15">
                    <TabsTrigger
                      className="text-lg h-full w-full cursor-pointer "
                      value="kurang"
                    >
                      For employees{" < "}50
                    </TabsTrigger>
                    <TabsTrigger
                      className="text-lg h-full w-full cursor-pointer "
                      value="lebih"
                    >
                      For employees 50+
                    </TabsTrigger>
                  </TabsList>

                  {/* price for employee < 50 */}
                  <TabsContent value="kurang">
                    <div className="flex items-start justify-center gap-5 mt-10">
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
                            canAccess={[
                              "Access to employee page (HR)",
                              "Do check clock for their employee (HR)",
                            ]}
                            canNotAccess={[
                              "Export/Import employee data (HR)",
                              "Add employee documents (HR)",
                              "Overtime access (HR)",
                              "Edit profile (Employee)",
                              "Do check clock (Employee)",
                            ]}
                            buttonText="Claim Now"
                            onClick={true}
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
                            title="Standart"
                            imageUrl="/images/price01.png"
                            currency="IDR"
                            price="10.000"
                            description="Intuitive, world-class support tools for growing teams"
                            canAccess={[
                              "Access to employee page (HR)",
                              "Do check clock for their employee (HR)",
                            ]}
                            canNotAccess={[
                              "Export/Import employee data (HR)",
                              "Add employee documents (HR)",
                              "Overtime access (HR)",
                              "Edit profile (Employee)",
                              "Do check clock (Employee)",
                            ]}
                            buttonText="Get Started"
                            onClick={true}
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
                            title="Premium"
                            imageUrl="/images/price02.png"
                            currency="IDR"
                            price="15.000"
                            description="Intuitive, world-class support tools for growing teams"
                            canAccess={[
                              "Access to employee page (HR)",
                              "Export/Import employee data (HR)",
                              "Do check clock for their employee (HR)",
                              "Add employee documents (HR)",
                              "Edit profile (Employee)",
                            ]}
                            canNotAccess={[
                              "Overtime access (HR)",
                              "Do check clock (Employee)",
                            ]}
                            buttonText="Get Started"
                            onClick={true}
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
                            title="Ultra"
                            imageUrl="/images/price03.png"
                            currency="IDR"
                            price="20.000"
                            description="Intuitive, world-class support tools for growing teams"
                            canAccess={[
                              "Access to employee page (HR)",
                              "Export/Import employee data (HR)",
                              "Do check clock for their employee (HR)",
                              "Edit profile (Employee)",
                              "Add employee documents (HR)",
                              "Overtime access (HR)",
                              "Do check clock (Employee)",
                            ]}
                            buttonText="Get Started"
                            onClick={true}
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
                            canAccess={[
                              "Access to employee page (HR)",
                              "Do check clock for their employee (HR)",
                            ]}
                            canNotAccess={[
                              "Export/Import employee data (HR)",
                              "Add employee documents (HR)",
                              "Overtime access (HR)",
                              "Edit profile (Employee)",
                              "Do check clock (Employee)",
                            ]}
                            buttonText="Claim Now"
                            onClick={true}
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
                            title="Standart"
                            imageUrl="/images/price01.png"
                            currency="IDR"
                            price="9.000"
                            description="Intuitive, world-class support tools for growing teams"
                            canAccess={[
                              "Access to employee page (HR)",
                              "Do check clock for their employee (HR)",
                            ]}
                            canNotAccess={[
                              "Export/Import employee data (HR)",
                              "Add employee documents (HR)",
                              "Overtime access (HR)",
                              "Edit profile (Employee)",
                              "Do check clock (Employee)",
                            ]}
                            buttonText="Get Started"
                            onClick={true}
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
                            title="Premium"
                            imageUrl="/images/price02.png"
                            currency="IDR"
                            price="14.000"
                            description="Intuitive, world-class support tools for growing teams"
                            canAccess={[
                              "Access to employee page (HR)",
                              "Export/Import employee data (HR)",
                              "Do check clock for their employee (HR)",
                              "Add employee documents (HR)",
                              "Edit profile (Employee)",
                            ]}
                            canNotAccess={[
                              "Overtime access (HR)",
                              "Do check clock (Employee)",
                            ]}
                            buttonText="Get Started"
                            onClick={true}

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
                            title="Ultra"
                            imageUrl="/images/price03.png"
                            currency="IDR"
                            price="18.000"
                            description="Intuitive, world-class support tools for growing teams"
                            canAccess={[
                              "Access to employee page (HR)",
                              "Export/Import employee data (HR)",
                              "Do check clock for their employee (HR)",
                              "Edit profile (Employee)",
                              "Add employee documents (HR)",
                              "Overtime access (HR)",
                              "Do check clock (Employee)",
                            ]}
                            buttonText="Get Started"
                            onClick={true}
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
