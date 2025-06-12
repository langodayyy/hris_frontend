"use client";
// import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

import { FormProvider } from "@/context/FormContext";
import { EditProvider } from "@/context/EditFormContext";
import React, { useEffect, useState } from "react";
import { AuthProvider } from "@/context/AuthContext";
import Joyride from "react-joyride";

import Cookies from "js-cookie";
import { string } from "zod";
import { toast } from "sonner";
import { usePathname, useRouter } from "next/navigation";
import { useRef } from "react";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const menuSteps = {
  dashboard: [
    {
      target: "#sidebar",
      content:
        "This is your main navigation sidebar. You can access different menu of HRIS here.",
      disableBeacon: true,
      placement: "right" as const,
    },
    {
      target: "#nav-search-bar",
      content: "Here you can search for anything you need in the HRIS system.",
      disableBeacon: true,
      placement: "bottom" as const,
    },
    {
      target: "#notification",
      content:
        "This section shows important notifications for you. Such as leave and sick requests or overtime requests from employees .",
      disableBeacon: true,
      placement: "bottom" as const,
    },
    {
      target: "#profile",
      content:
        "Click here to access your profile, subscription plan, and billing information.",
      disableBeacon: true,
      placement: "bottom" as const,
    },
    {
      target: "#latest-employee-data",
      content:
        "This section shows the recent updates made to employee data in the HRIS system.",
      disableBeacon: true,
      placement: "bottom" as const,
    },
    {
      target: "#chart",
      content:
        "This section shows the recent updates made to employee data in the HRIS system.",
      disableBeacon: true,
      placement: "top" as const,
    },
  ],
  profile: [
    {
      target: "#profile-user",
      content:
        "This is your profile page. You can update your personal information, change your password, and manage your company settings.",
      disableBeacon: true,
      placement: "top" as const,
    },
  ],

  // "checkclock/setting": [
  //   {
  //     target: "#checkclock-setting",
  //     content: "This is the Checkclock Management table. You can manage employee checkclock data here.",
  //     disableBeacon: true,
  //   },
  //   {
  //     target: "#date-checkclock",
  //     content: "You can filter checkclock data by date.",
  //     disableBeacon: true,
  //   },
  //   {
  //     target: "#filter-checkclock",
  //     content: "You can filter checkclock data by position, or work type.",
  //     disableBeacon: true,
  //   },
  //   {
  //     target: "#add-checkclock",
  //     content: "You can add new checkclock for employee who you choose here manually.",
  //     disableBeacon: true,
  //   },
  // ],
  "overtime/management": [
    {
      target: "#overtime",
      content:
        "This is the Overtime Management table. You can manage employee overtime data here. You can also approve or reject overtime requests submitted by employees.",
      disableBeacon: true,
      placement: "bottom" as const,
    },
    {
      target: "#date-overtime",
      content: "You can filter overtime data by date.",
      disableBeacon: true,
      placement: "bottom" as const,
    },
    {
      target: "#filter-overtime",
      content: "You can filter overtime data by overtime type, and status.",
      disableBeacon: true,
      placement: "bottom" as const,
    },
    {
      target: "#add-overtime",
      content:
        "You can add new overtime for employee who you choose here manually.",
      disableBeacon: true,
      placement: "bottom" as const,
    },
  ],
  // contoh selain path luar
  "overtime/setting": [
    {
      target: "#overtime-setting",
      content:
        "This is the Overtime Setting table. You can manage overtime settings here.",
      disableBeacon: true,
      placement: "top" as const,
    },
    {
      target: "#add-overtime-setting",
      content:
        "This is the Overtime Setting table. You can manage overtime settings here.",
      disableBeacon: true,
      placement: "bottom" as const,
    },
  ],
  // "checkclock/add": [
  //   {
  //     target: "#checkclock-add",
  //     content: "Welcome!! Please spare a minute to learn about our page",
  //     disableBeacon: true,
  //   },
  // ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [steps, setSteps] = useState(menuSteps.dashboard); // State to manage steps
  const [joyrideKey, setJoyrideKey] = useState(0); // Key to force Joyride re-render
  const [showJoyride, setShowJoyride] = useState(false); // State to control Joyride visibility
  const pathname = usePathname();
  const mounted = useRef(false);

  const checkJoyride = (pageKey: string) => {
    const hasSeenJoyride = localStorage.getItem(`hasSeenJoyride_${pageKey}`);
    if (!hasSeenJoyride) {
      // Show Joyride for the first-time user on this page
      setShowJoyride(true);
      localStorage.setItem(`hasSeenJoyride_${pageKey}`, "true"); // Set the flag for this page
    } else {
      // Skip Joyride for subsequent visits to this page
      setShowJoyride(false);
    }
  };

  useEffect(() => {
    mounted.current = true; // Set mounted to true when component mounts

    const pageKey = pathname.replace("/", "");
    const selectedSteps = menuSteps[pageKey as keyof typeof menuSteps] || [];

    // Only update state if component is still mounted
    if (mounted.current) {
      setSteps(selectedSteps);
      checkJoyride(pageKey);
      setJoyrideKey((prevKey) => prevKey + 1);
    }

    return () => {
      mounted.current = false; // Set mounted to false when component unmounts
    };
  }, [pathname]);

  return (
    <AuthProvider>
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {/* {showJoyride && (
          <Joyride
            key={joyrideKey} // Force re-render when key changes
            steps={steps}
            continuous={true}
            styles={{
              options: {
                arrowColor: "#fff",
                backgroundColor: "#fff",
                primaryColor: "#1E3A5F",
                zIndex: 10000,
              },
              tooltip: {
                borderRadius: "12px",
                padding: "16px",
                fontSize: "16px",
                boxShadow: "0 4px 5px rgba(0,0,0,0.2)",
                height: "fit-content",
              },

              buttonBack: {
                marginRight: 5,
                color: "#1E3A5F",
                border: "1px solid #1E3A5F",
                backgroundColor: "#fff",
                borderRadius: "5px",
              },
              buttonClose: {
                display: "none",
              },
            }}
            showProgress={true}
            showSkipButton
            disableScrolling
          />
        )} */}
        {/* <AuthProvider> */}
        {/* <AuthGate> */}
        <React.StrictMode>
          <FormProvider>
            <EditProvider>{children}</EditProvider>
          </FormProvider>
        </React.StrictMode>
        {/* </AuthGate> */}
       
      </body>
    </html>
    </AuthProvider>
  );
}
