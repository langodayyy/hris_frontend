
"use client";

import { useEffect, useState } from "react";
import { Button } from "./ui/button";
import SearchBar from "./ui/search";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
import { toast } from "sonner";

interface NavbarProps {
  title: string; 
  avatarImage?: string;
  userName: string;
  role: string;
  plan: string;
  period: string;
  deadline?: string | null;
  
}

export default function Navbar({ title, avatarImage, userName, role, plan, period, deadline }: NavbarProps) {
  
  // Fungsi untuk mengambil inisial dari nama pengguna
  const getInitials = (name: string) => {
    const nameParts = name.split(" ");
    return nameParts.length > 1 
      ? `${nameParts[0][0]}${nameParts[1][0]}`.toUpperCase() 
      : nameParts[0].substring(0, 2).toUpperCase();
  };

  //sugestion searchbar
const result = [
  { label: 'Dashboard', path: '/dashboard' },
  { label: 'Employee', path: '/employee' },
  { label: 'Add Employee', path: '/employee/add' },
  { label: 'Checkclock', path: '/checkclock/management' },
  { label: 'Add Checkclock', path: '/checkclock/management/add' },
  { label: 'Checkclock Setting', path: '/checkclock/setting' },
  { label: 'Overtime', path: '/overtime/management' },
  { label: 'Add Overtime', path: '/overtime/management/add' },
  { label: 'Overtime Setting', path: '/overtime/setting' },
  { label: 'Bills', path: '/bills' },
  { label: 'Profile', path: '/settings/profile' },
  { label: 'Plan', path: '/settings/plan' },
];

  // array notification sample
  const notifications = [
    { user: "Silfi Nazarina", message: "Has sent a checkclock request", type: "checkclock", time: "1 minute ago" },
    { user: "Silfi Nazarina", message: "Has sent a checkclock request", type: "checkclock", time: "1 minute ago" },
    { user: "Silfi Nazarina", message: "Has sent a checkclock request", type: "checkclock", time: "1 minute ago" },
    { user: "Silfi Nazarina", message: "Has sent a checkclock request", type: "checkclock", time: "1 minute ago" },
    { user: "Silfi Nazarina", message: "Has sent a checkclock request", type: "checkclock", time: "1 minute ago" },
  ];
  
  const notificationCount = notifications.length;
  const router = useRouter();
  const handleLogout = async () => {
    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/logout`, {
                method: "POST",
                headers: {
                    "Authorization": `Bearer ${Cookies.get("token")}`,
                    // Jangan tambahkan Content-Type manual di sini!
                },
        });

        const responseData = await response.json();

        if (!response.ok) {
            throw responseData; 
        }
        Cookies.remove("token");
        router.replace("/sign-in");
    } catch (err) {
        let message = "Unknown error occurred";
        let messagesToShow: string[] = [];

        if (
        err &&
        typeof err === "object" &&
        "message" in err &&
        typeof (err as any).message === "string"
        ) {
        const backendError = err as { message: string; errors?: Record<string, string[]> };

        if (backendError.message.toLowerCase().includes("failed to fetch")) {
            message = "Unknown error occurred";
        } else {
            message = backendError.message;
        }

        messagesToShow = backendError.errors
            ? Object.values(backendError.errors).flat()
            : [message];
        } else {
        messagesToShow = [message]
        }

        toast.error(
            <>
                <p className="text-red-700 font-bold">Error</p>
                {messagesToShow.map((msg, idx) => (
                <div key={idx} className="text-red-700">• {msg}</div>
                ))}
            </>,
            { duration: 30000 }
        );
    } finally {

    }
  };
  return (
    <nav id="navbar" className="sticky z-10 top-0 flex-row items-center h-auto bg-white px-6 py-[16px] justify-between shadow-[0px_2px_4px_#B0B0B0] grid grid-cols-3">
      <div className="flex w-full justify-start h-[29px]">
        <a href="#" className="text-2xl font-medium focus:outline-nonext-left">
          {title}
        </a>
      </div>
      <div className="flex flex-row items-center justify-center w-full h-[36px] gap-[12px] relative" id="nav-search-bar">
        <SearchBar results={result} />
      </div>

    {/* notification */}
      <div className="flex flex-row gap-[24px] max-w-[450px] min-w-[300px] h-auto justify-end "  >
        <DropdownMenu>
        <DropdownMenuTrigger>
        <div className="relative flex items-center" id="notification">
          <div className="relative ">
            <a href="#">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="23"
                height="24"
                viewBox="0 0 23 24"
                fill="none"
              >
                <path
                  d="M11.5189 2.823C7.99228 2.823 5.13645 5.67883 5.13645 9.2055V11.218C5.13645 11.8697 4.86811 12.8472 4.5327 13.403L3.31561 15.4347C2.56811 16.6901 3.08561 18.0892 4.46561 18.5492C9.04645 20.073 14.001 20.073 18.5819 18.5492C19.8756 18.118 20.4314 16.6038 19.7319 15.4347L18.5148 13.403C18.1794 12.8472 17.911 11.8601 17.911 11.218V9.2055C17.9014 5.698 15.0264 2.823 11.5189 2.823Z"
                  stroke="#444750"
                  strokeWidth="2"
                  strokeMiterlimit="10"
                  strokeLinecap="round"
                />
                <path
                  d="M14.6916 18.942C14.6916 20.6958 13.2541 22.1333 11.5003 22.1333C10.6282 22.1333 9.82325 21.7691 9.24825 21.1941C8.67325 20.6191 8.30908 19.8141 8.30908 18.942"
                  stroke="#444750"
                  strokeWidth="2"
                  strokeMiterlimit="10"
                />
              </svg>
            </a>
            {notificationCount > 0 && (
              <span className="absolute top-0 right-0 transform translate-x-1/2 -translate-y-1/2 inline-flex items-center justify-center w-[16px] h-[16px] bg-red-600 text-white text-xs rounded-full">
                {notificationCount}
              </span>
            )}
          </div>
        </div>
        {/* notification dropdown */}
        <DropdownMenuContent className="absolute w-[300px] p-0 top-3 right-0">
        <DropdownMenuLabel className="bg-neutral-50 text-neutral-900 h-[42px] px-4 py-[10px] text-base items-center">Notification</DropdownMenuLabel>
          <DropdownMenuSeparator className="m-0"/>
          <DropdownMenuItem className="h-[91px]">
            <div className="flex items-center flex-row gap-[10px] w-auto h-[91px] py-3">
              {/* weight avatarnya gj ding */}
              <div className="w-13">
              <div className="relative flex items-center justify-center w-full h-10 bg-gray-400 rounded-full">
                {avatarImage ? (
                  <img src={avatarImage} alt="Avatar" className="w-full h-full object-cover rounded-full" />
                ) : (
                  <span className="text-white text-sm font-medium">{getInitials(userName)}</span>
                )}
              </div>
              </div>
              <div className="flex flex-col gap-[2px] h-auto w-full">
                <div className="flex flex-col">
                  <span className="text-base font-medium text-neutral-950">
                    {userName}
                  </span>
                  <span className="text-sm text-neutral-500">Has sent a checkclock request</span>
                </div>
                <span className="text-sm text-info-500">1 minute ago</span>
              </div>
            </div>
          </DropdownMenuItem>
          <DropdownMenuItem className="h-[91px]">
            <div className="flex items-center flex-row gap-2.5 w-auto h-[91px] py-3">
              {/* weight avatarnya gj ding */}
              <div className="flex -space-x-7 overflow-hidden">
              <div className="relative flex items-center justify-center w-13 h-10 bg-gray-400 rounded-full ring-2 ring-white">
                {avatarImage ? (
                  <img src={avatarImage} alt="Avatar" className="w-full h-full object-cover rounded-full" />
                ) : (
                  <span className="text-white text-sm font-medium">{getInitials(userName)}</span>
                )}
              </div>
              <div className="relative flex items-center justify-center w-13 h-10 bg-gray-400 rounded-full ring-2 ring-white">
                {avatarImage ? (
                  <img src={avatarImage} alt="Avatar" className="w-full h-full object-cover rounded-full" />
                ) : (
                  <span className="text-white text-sm font-medium">{getInitials(userName)}</span>
                )}
              </div>
              </div>
              <div className="flex flex-col gap-[2px] h-auto w-full">
                <div className="flex flex-col">
                  <span className="text-base font-medium text-neutral-950">
                    {userName} + 10 others
                  </span>
                  <span className="text-sm text-neutral-500">Has sent a checkclock request</span>
                </div>
                <span className="text-sm text-info-500">1 minute ago</span>
              </div>
            </div>
          </DropdownMenuItem>
          <DropdownMenuItem className="h-[91px]">
            <div className="flex items-center flex-row gap-2.5 w-auto h-[91px] py-3">
              {/* weight avatarnya gj ding */}
              <div className="w-13">
              <div className="relative flex items-center justify-center w-full h-10 bg-gray-400 rounded-full">
                {avatarImage ? (
                  <img src={avatarImage} alt="Avatar" className="w-full h-full object-cover rounded-full" />
                ) : (
                  <span className="text-white text-sm font-medium">{getInitials(userName)}</span>
                )}
              </div>
              </div>
              <div className="flex flex-col gap-[2px] h-auto w-full">
                <div className="flex flex-col">
                  <span className="text-base font-medium text-neutral-950">
                    {userName}
                  </span>
                  <span className="text-sm text-neutral-500">Has sent a overtime request</span>
                </div>
                <span className="text-sm text-info-500">1 minute ago</span>
              </div>
            </div>
          </DropdownMenuItem>
          <DropdownMenuItem className="h-[91px]">
            <div className="flex items-center flex-row gap-2.5 w-auto h-[91px] py-3">
              {/* weight avatarnya gj ding */}
              <div className="flex -space-x-6 overflow-hidden">
              <div className="relative flex items-center justify-center w-13 h-10 bg-gray-400 rounded-full ring-2 ring-white">
                {avatarImage ? (
                  <img src={avatarImage} alt="Avatar" className="w-full h-full object-cover rounded-full" />
                ) : (
                  <span className="text-white text-sm font-medium">{getInitials(userName)}</span>
                )}
              </div>
              <div className="relative flex items-center justify-center w-13 h-10 bg-gray-400 rounded-full ring-2 ring-white">
                {avatarImage ? (
                  <img src={avatarImage} alt="Avatar" className="w-full h-full object-cover rounded-full" />
                ) : (
                  <span className="text-white text-sm font-medium">{getInitials(userName)}</span>
                )}
              </div>
              </div>
              <div className="flex flex-col gap-[2px] h-auto w-full">
                <div className="flex flex-col">
                  <span className="text-base font-medium text-neutral-950">
                    {userName} + 10 others
                  </span>
                  <span className="text-sm text-neutral-500">Has sent a overtime request</span>
                </div>
                <span className="text-sm text-info-500">1 minute ago</span>
              </div>
            </div>
          </DropdownMenuItem>
          <DropdownMenuLabel className="bg-neutral-50 text-neutral-900 h-[42px] px-[10px] py-[10px] text-base items-center">
            <div className="flex justify-center gap-[10px]">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
              <g clipPath="url(#clip0_609_3815)">
                <path d="M23.2709 9.41885C21.7199 6.89285 18.1919 2.65485 11.9999 2.65485C5.80787 2.65485 2.27987 6.89285 0.728868 9.41885C0.249396 10.1944 -0.00457764 11.0881 -0.00457764 11.9998C-0.00457764 12.9116 0.249396 13.8053 0.728868 14.5808C2.27987 17.1068 5.80787 21.3448 11.9999 21.3448C18.1919 21.3448 21.7199 17.1068 23.2709 14.5808C23.7503 13.8053 24.0043 12.9116 24.0043 11.9998C24.0043 11.0881 23.7503 10.1944 23.2709 9.41885ZM21.5659 13.5338C20.2339 15.6998 17.2189 19.3448 11.9999 19.3448C6.78087 19.3448 3.76587 15.6998 2.43387 13.5338C2.149 13.0729 1.99812 12.5417 1.99812 11.9998C1.99812 11.458 2.149 10.9268 2.43387 10.4658C3.76587 8.29985 6.78087 4.65485 11.9999 4.65485C17.2189 4.65485 20.2339 8.29585 21.5659 10.4658C21.8507 10.9268 22.0016 11.458 22.0016 11.9998C22.0016 12.5417 21.8507 13.0729 21.5659 13.5338Z" fill="#3D3D3D"/>
                <path d="M11.9998 6.99982C11.0109 6.99982 10.0442 7.29306 9.22197 7.84247C8.39972 8.39188 7.75886 9.17277 7.38042 10.0864C7.00198 11 6.90297 12.0054 7.09589 12.9753C7.28882 13.9452 7.76502 14.8361 8.46429 15.5354C9.16355 16.2346 10.0545 16.7108 11.0244 16.9037C11.9943 17.0967 12.9996 16.9977 13.9132 16.6192C14.8269 16.2408 15.6078 15.5999 16.1572 14.7777C16.7066 13.9554 16.9998 12.9887 16.9998 11.9998C16.9982 10.6742 16.4709 9.40337 15.5336 8.46604C14.5963 7.5287 13.3254 7.0014 11.9998 6.99982ZM11.9998 14.9998C11.4065 14.9998 10.8265 14.8239 10.3331 14.4942C9.83976 14.1646 9.45524 13.696 9.22818 13.1479C9.00112 12.5997 8.94171 11.9965 9.05746 11.4145C9.17322 10.8326 9.45894 10.2981 9.8785 9.8785C10.2981 9.45894 10.8326 9.17322 11.4145 9.05746C11.9965 8.94171 12.5997 9.00112 13.1479 9.22818C13.696 9.45524 14.1646 9.83976 14.4942 10.3331C14.8239 10.8265 14.9998 11.4065 14.9998 11.9998C14.9998 12.7955 14.6837 13.5585 14.1211 14.1211C13.5585 14.6837 12.7955 14.9998 11.9998 14.9998Z" fill="#3D3D3D"/>
              </g>
              <defs>
                <clipPath id="clip0_609_3815">
                  <rect width="24" height="24" fill="white"/>
                </clipPath>
              </defs>
            </svg>
            <a href="#">View All</a>
            </div>
          </DropdownMenuLabel>
        </DropdownMenuContent>
        </DropdownMenuTrigger>
        </DropdownMenu>

        {/* user info */}
        {/* <div className="flex flex-row gap-3 w-auto h-auto">
          <div className="relative flex items-center justify-center w-10 h-10 bg-gray-400 rounded-full">
            {avatarImage ? (
              <img src={avatarImage} alt="Avatar" className="w-full h-full object-cover rounded-full" />
            ) : (
              <span className="text-white text-sm font-medium">{getInitials(userName)}</span>
            )}
          </div>
          <div className="flex flex-col h-auto w-auto">
            <span className="text-base font-medium text-neutral-950">
              {userName}
            </span>
            <span className="text-sm text-neutral-500">Roles User</span>
          </div>
        </div> */}

          {/* user dropdown */}
          <DropdownMenu>
            <DropdownMenuTrigger>
              <div className="flex flex-row gap-3 w-full h-full rounded-full cursor-pointer transition duration-15 hover:bg-gray-100" id="profile">
                <div className="relative flex items-center justify-center w-10 h-10 bg-gray-400 rounded-full">
                  {avatarImage ? (
                    <img src={avatarImage} alt="Avatar" className="w-full h-full object-cover rounded-full" />
                  ) : (
                    <span className="text-white text-sm font-medium">{getInitials(userName)}</span>
                  )}
                </div>
                <div className="flex flex-col h-auto w-auto">
                  <span className="text-base font-medium text-neutral-950">
                    {userName.length > 20
                    ? `${userName.slice(0, 20)}...`
                    : userName}
                  </span>
                  <span className="text-sm text-start ext-neutral-500">{role}</span>
                </div>
              </div>
            </DropdownMenuTrigger>
              <DropdownMenuContent className="w-[270px] absolute top-3 -right-20 p-3">
                <DropdownMenuLabel>
                  <div className="flex justify-center items-center flex-col w-auto gap-2">
                  <div className="relative flex items-center justify-center w-15 h-15 bg-gray-400 rounded-full">
                    {avatarImage ? (
                      <img src={avatarImage} alt="Avatar" className="w-full h-full object-cover rounded-full" />
                    ) : (
                      <span className="text-white text-sm font-medium">{getInitials(userName)}</span>
                    )}
                  </div>
                  <div className="flex flex-col items-center">
                      <span className="text-base font-medium text-neutral-900 text-center">
                        Hello, {userName}
                      </span>
                      <span className="text-sm text-neutral-500">{role}</span>
                  </div>
                  <div className="flex flex-col justify-start items-start w-full gap-1">
                    <div className="flex flex-row">
                      <span className="font-medium text-neutral-900">Plan:&nbsp;</span>{" "}
                      <span className="text-neutral-500"> {plan}</span>
                    </div>
                    <div className="flex flex-row w-auto">
                      <span className="font-medium text-neutral-900">Active Until:&nbsp;</span>
                      <span className="text-neutral-500"> {period}</span>
                    </div>
                   {deadline && deadline !== "null" && deadline !== "undefined" && (
                      <div className="flex flex-row w-auto">
                        <span className="font-extrabold text-danger-600">Pay Bill Before:&nbsp;</span>
                        <span className="text-danger-600 font-extralight">{deadline}</span>
                      </div>
                    )}

                  
                    <Button className="mt-2">Pay Bill</Button>
                  </div>
                </div>  
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => (window.location.href = "/settings/profile")}
              className="cursor-pointer">Profile</DropdownMenuItem>
                <DropdownMenuItem onClick={() => (window.location.href = "/settings/plan")}
              className="cursor-pointer">Change Plan</DropdownMenuItem>
                <DropdownMenuItem onClick={handleLogout}>Logout</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
        </div>
    </nav>
  );
}
