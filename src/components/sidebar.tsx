"use client";
import { usePathname } from "next/navigation";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";

type NavItemProps = {
  url: string;
  isSelected: boolean;
  svgIcon: React.ReactNode;
};

function NavItem({ url, isSelected, svgIcon }: NavItemProps) {
  return (
    <ul className="flex gap-[5px] hover:group-[]:">
      <li className="flex">
        <a
          href={url}
          className={`pr-[7px]  text-white rounded-r-lg 
            ${isSelected ? "bg-primary-900 text-white" : "bg-white "}
          `}
        ></a>
      </li>

      <li className="flex">
        <a
          href={url}
          className={`flex items-center gap-2 p-[21px] rounded-lg transition-all text-neutral-900
            ${
              isSelected
                ? "bg-primary-900 text-white"
                : "bg-white text-neutral-900 hover:bg-primary-950 hover:text-white"
            }
          `}
        >
          {svgIcon}
        </a>
      </li>
    </ul>
  );
}

export default function Sidebar() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  return (
    <div className="">
      {/* Sidebar */}
      <div
        className={`fixed top-0 left-0 h-full bg-white text-neutral-900 w-64 p-6 transform ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } transition-transform duration-300 ease-in-out z-50`}
      >
        <h2 className="text-2xl font-bold mb-8">My Sidebar</h2>
        <nav className="flex flex-col gap-4">
          <Link href="/" className="hover:bg-blue-600 p-2 rounded">
            Home
          </Link>
          <Link href="/about" className="hover:bg-blue-600 p-2 rounded">
            About
          </Link>
          <Link href="/services" className="hover:bg-blue-600 p-2 rounded">
            Services
          </Link>
          <Link href="/contact" className="hover:bg-blue-600 p-2 rounded">
            Contact
          </Link>
        </nav>
      </div>

      {/* Toggle Button */}

      <div className="w-[77px] bg-white min-h-full py-4">
        <div className="w-full flex items-center justify-center mb-[30px]">
          <Image
            src="/images/logo hris.png" // Path dari public
            alt="Menu Icon"
            width={40}
            height={66}
            className="object-contain "
          />
        </div>
        <div className="pr-[10px]">
          <NavItem
            url="/"
            isSelected={pathname === "/"}
            svgIcon={
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="none"
              >
                <path
                  d="M1.14258 12.75H5.71387C5.85307 12.75 5.96217 12.7996 6.02832 12.8574C6.09298 12.914 6.10742 12.9661 6.10742 13V15C6.10742 15.0339 6.09298 15.086 6.02832 15.1426C5.96217 15.2004 5.85307 15.25 5.71387 15.25H1.14258C1.00362 15.2499 0.895222 15.2003 0.829102 15.1426C0.76444 15.086 0.75 15.0339 0.75 15V13C0.75 12.9661 0.76444 12.914 0.829102 12.8574C0.895222 12.7997 1.00362 12.7501 1.14258 12.75ZM10.2861 6.75H14.8574C14.9964 6.75007 15.1048 6.79967 15.1709 6.85742C15.2356 6.914 15.25 6.96608 15.25 7V15C15.25 15.0339 15.2356 15.086 15.1709 15.1426C15.1048 15.2003 14.9964 15.2499 14.8574 15.25H10.2861C10.1469 15.25 10.0378 15.2004 9.97168 15.1426C9.90702 15.086 9.89258 15.0339 9.89258 15V7C9.89258 6.96608 9.90702 6.914 9.97168 6.85742C10.0378 6.79957 10.1469 6.75 10.2861 6.75ZM1.14258 0.75H5.71387C5.85307 0.75 5.96217 0.799574 6.02832 0.857422C6.09298 0.914001 6.10742 0.966083 6.10742 1V9C6.10742 9.03392 6.09298 9.086 6.02832 9.14258C5.96217 9.20043 5.85307 9.25 5.71387 9.25H1.14258C1.00362 9.24993 0.895222 9.20033 0.829102 9.14258C0.76444 9.086 0.75 9.03392 0.75 9V1C0.75 0.966083 0.76444 0.914001 0.829102 0.857422C0.895222 0.799672 1.00362 0.750066 1.14258 0.75ZM10.2861 0.75H14.8574C14.9964 0.750066 15.1048 0.799672 15.1709 0.857422C15.2356 0.914001 15.25 0.966083 15.25 1V3C15.25 3.03392 15.2356 3.086 15.1709 3.14258C15.1048 3.20033 14.9964 3.24993 14.8574 3.25H10.2861C10.1469 3.25 10.0378 3.20043 9.97168 3.14258C9.90702 3.086 9.89258 3.03392 9.89258 3V1C9.89258 0.966083 9.90702 0.914001 9.97168 0.857422C10.0378 0.799574 10.1469 0.75 10.2861 0.75Z"
                  stroke="currentColor"
                  strokeWidth="1.5"
                />
              </svg>
            }
          />
          <NavItem
            url="/employee"
            isSelected={pathname === "/employee"}
            svgIcon={
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="18"
                height="18"
                viewBox="0 0 18 18"
                fill="none"
              >
                <path
                  d="M9.80015 4.83333C9.80015 6.67428 8.36746 8.16667 6.60015 8.16667C4.83284 8.16667 3.40015 6.67428 3.40015 4.83333C3.40015 2.99238 4.83284 1.5 6.60015 1.5C8.36746 1.5 9.80015 2.99238 9.80015 4.83333Z"
                  stroke="currentColor"
                  strokeWidth="1.5"
                />
                <path
                  d="M11.4001 8.16667C13.1675 8.16667 14.6001 6.67428 14.6001 4.83333C14.6001 2.99238 13.1675 1.5 11.4001 1.5"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M8.2 10.6667H5C2.79086 10.6667 1 12.5322 1 14.8334C1 15.7539 1.71634 16.5001 2.6 16.5001H10.6C11.4837 16.5001 12.2 15.7539 12.2 14.8334C12.2 12.5322 10.4091 10.6667 8.2 10.6667Z"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinejoin="round"
                />
                <path
                  d="M13 10.6667C15.2091 10.6667 17 12.5322 17 14.8334C17 15.7539 16.2837 16.5001 15.4 16.5001H14.2"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            }
          />
          <NavItem
            url="/checkclock"
            isSelected={pathname === "/checkclock"}
            svgIcon={
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="18"
                height="18"
                viewBox="0 0 18 18"
                fill="none"
              >
                <path
                  d="M8.40632 16.1579H2.68421C2.23753 16.1579 1.80914 15.9805 1.49329 15.6646C1.17744 15.3487 1 14.9204 1 14.4737V4.36842C1 3.92174 1.17744 3.49336 1.49329 3.1775C1.80914 2.86165 2.23753 2.68421 2.68421 2.68421H12.7895C13.2362 2.68421 13.6645 2.86165 13.9804 3.1775C14.2962 3.49336 14.4737 3.92174 14.4737 4.36842V7.73684H1M11.1053 1V4.36842M4.36842 1V4.36842M13.6316 12.3651V13.6316L14.4737 14.4737M10.2632 13.6316C10.2632 14.5249 10.618 15.3817 11.2497 16.0134C11.8814 16.6451 12.7382 17 13.6316 17C14.5249 17 15.3817 16.6451 16.0134 16.0134C16.6451 15.3817 17 14.5249 17 13.6316C17 12.7382 16.6451 11.8814 16.0134 11.2497C15.3817 10.618 14.5249 10.2632 13.6316 10.2632C12.7382 10.2632 11.8814 10.618 11.2497 11.2497C10.618 11.8814 10.2632 12.7382 10.2632 13.6316Z"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            }
          />
          <NavItem
            url="/overtime"
            isSelected={pathname === "/overtime"}
            svgIcon={
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="none"
              >
                <g clipPath="url(#clip0_377_700)">
                  <path
                    d="M8 0C6.41775 0 4.87104 0.469192 3.55544 1.34824C2.23985 2.22729 1.21447 3.47672 0.608967 4.93853C0.00346629 6.40034 -0.15496 8.00887 0.153721 9.56072C0.462403 11.1126 1.22433 12.538 2.34315 13.6569C3.46197 14.7757 4.88743 15.5376 6.43928 15.8463C7.99113 16.155 9.59966 15.9965 11.0615 15.391C12.5233 14.7855 13.7727 13.7602 14.6518 12.4446C15.5308 11.129 16 9.58225 16 8C15.9977 5.87897 15.1541 3.84547 13.6543 2.34568C12.1545 0.845886 10.121 0.00229405 8 0V0ZM8 14.6667C6.68146 14.6667 5.39253 14.2757 4.2962 13.5431C3.19987 12.8106 2.34539 11.7694 1.84081 10.5512C1.33622 9.33305 1.2042 7.99261 1.46144 6.6994C1.71867 5.40619 2.35361 4.21831 3.28596 3.28596C4.21831 2.35361 5.4062 1.71867 6.6994 1.46143C7.99261 1.2042 9.33305 1.33622 10.5512 1.8408C11.7694 2.34539 12.8106 3.19987 13.5431 4.2962C14.2757 5.39253 14.6667 6.68146 14.6667 8C14.6647 9.76752 13.9617 11.4621 12.7119 12.7119C11.4621 13.9617 9.76752 14.6647 8 14.6667Z"
                    fill="currentColor"
                  />
                  <path
                    d="M7.99988 4C7.82307 4 7.6535 4.07024 7.52848 4.19526C7.40345 4.32029 7.33322 4.48985 7.33322 4.66667V7.54999L5.08588 8.95799C4.93559 9.05188 4.82876 9.20162 4.78887 9.37428C4.74899 9.54694 4.77933 9.72837 4.87322 9.87866C4.9671 10.0289 5.11685 10.1358 5.2895 10.1757C5.46216 10.2155 5.64359 10.1852 5.79388 10.0913L8.35388 8.49133C8.45061 8.43072 8.53015 8.3463 8.5849 8.24615C8.63964 8.14599 8.66776 8.03346 8.66655 7.91933V4.66667C8.66655 4.48985 8.59631 4.32029 8.47129 4.19526C8.34626 4.07024 8.17669 4 7.99988 4Z"
                    fill="currentColor"
                  />
                </g>
                <defs>
                  <clipPath id="clip0_377_700">
                    <rect width="16" height="16" fill="white" />
                  </clipPath>
                </defs>
              </svg>
            }
          />
          
        </div>
      </div>

      <button
        onClick={() => setIsOpen(!isOpen)}
        className="m-4 p-3 bg-blue-900 text-white rounded-lg flex items-center justify-center shadow-md fixed top-4 left-4 z-50"
      >
        {/* Icon */}
        <div className="w-6 h-6 relative">
          <div className="absolute w-4 h-0.5 bg-white top-0 left-0"></div>
          <div className="absolute w-2 h-0.5 bg-white top-2 left-0"></div>
          <div className="absolute w-4 h-0.5 bg-white top-2 left-3"></div>
          <div className="absolute w-2 h-0.5 bg-white top-4 left-0"></div>
          <div className="absolute w-4 h-0.5 bg-white top-4 left-3"></div>
        </div>
      </button>

      {/* Content */}
      {/* <div className="flex-1 w-[256px]">
        <h1 className="text-3xl font-bold">Welcome to the Page</h1>
        <p className="mt-4 text-gray-600">
          This is your main content area.
        </p>
      </div> */}
    </div>
  );
}
