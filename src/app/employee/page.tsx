"use client";
import { Metadata } from "next";
import Sidebar from "../../components/sidebar";
import { Employees, columns } from "./column";
import { DataTable } from "./data-table";
import { Card, CardContent } from "@/components/ui/card";
import React, { useRef, useState, useEffect } from "react";
import { Spinner } from "@/components/ui/spinner";
import Cookies from "js-cookie";
import { Toaster, toast } from "sonner";
import { Skeleton } from "@/components/ui/skeleton";
import Joyride, { Step } from "react-joyride-react-19";

export default function Employee() {
  const [employees, setEmployees] = useState<Employees[]>([]);
  const [summary, setSummary] = useState<{
    "Total Employee": number;
    "Total New Hire": number;
    "Active Employee": number;
  } | null>(null);
  const [periode, setPeriode] = useState<string>("");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/employees`,
          {
            headers: {
              Authorization: `Bearer ${Cookies.get("token")}`,
              "Content-Type": "application/json",
            },
          }
        );

        const data = await res.json();
        if (!res.ok) {
          throw data;
        }
        setEmployees(data.employees);
        setSummary(data.summary);
        setPeriode(data.periode);
      } catch (err) {
        let message = "Unknown error occurred";
        let messagesToShow: string[] = [];

        if (
          err &&
          typeof err === "object" &&
          "message" in err &&
          typeof (err as any).message === "string"
        ) {
          const backendError = err as {
            message: string;
            errors?: Record<string, string[]>;
          };

          if (backendError.message.toLowerCase().includes("failed to fetch")) {
            message = "Unknown error occurred";
          } else {
            message = backendError.message;
          }

          messagesToShow = backendError.errors
            ? Object.values(backendError.errors).flat()
            : [message];
        } else {
          messagesToShow = [message];
        }

        toast.error(
          <>
            <p className="text-red-700 font-bold">Error</p>
            {messagesToShow.map((msg, idx) => (
              <div key={idx} className="text-red-700">
                • {msg}
              </div>
            ))}
          </>,
          { duration: 30000 }
        );
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const msgdelete = sessionStorage.getItem("toastdeleteemployee");
    if (msgdelete) {
      toast.success(msgdelete);
      sessionStorage.removeItem("toastdeleteemployee");
    }
    const msgimport = sessionStorage.getItem("toastimportemployee");
    if (msgimport) {
      toast.success(msgimport);
      sessionStorage.removeItem("toastimportemployee");
    }
  }, []);

    const [steps, setSteps] = useState<Step[]>([]);
    const [joyrideKey, setJoyrideKey] = useState(0);
  
    const employeeSteps = {
     employee: [
    {
      target: "#employee-data-this-month",
      content: "This section shows the employee data for this month.",
      disableBeacon: true,
      placement: "bottom" as const,
    },
    {
      target: "#table-employee",
      content: "This table displays employee data. You can add, edit, or delete employee data here.",
      disableBeacon: true,
      placement: "top" as const,
    },
    {
      target: "#filter-employee",
      content: "You can filter employee data by position, department, or many more.",
      disableBeacon: true,
      placement: "top" as const,
    },
    {
      target: "#export-employee",
      content: "You can export employee data to CSV format.",
      disableBeacon: true,
      placement: "top" as const,
    },
    {
      target: "#import-employee",
      content: "You can import employee data from CSV format.", 
      disableBeacon: true,
      placement: "top" as const,
    },
    {
      target: "#add-employee",
      content: "You can add new employee data here manually.", 
      disableBeacon: true,
      placement: "top" as const,
    },
  ],
    };
  
    function checkJoyride(key: string) {
      const hasRun = localStorage.getItem(`joyride_shown_${key}`);
      if (!hasRun) {
        localStorage.setItem(`joyride_shown_${key}`, "true");
        return true;
      }
      return false;
    }
  
    useEffect(() => {
      if (!isLoading) {
        const checkclockEl = document.querySelector("#employee-data-this-month");
        if (checkclockEl && checkJoyride("employee")) {
          setSteps(employeeSteps["employee"]);
          setJoyrideKey((prev) => prev + 1);
        }
      }
    }, [isLoading]);

  if (!isLoading) {
    return (
      <>
      <Joyride
        key={joyrideKey} // Force re-render when key changes
        steps={steps}
        continuous={true}
        disableScrolling
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
      />
      <Sidebar title="Employee Database">
        <Toaster
          position="bottom-right"
          expand={true}
          richColors
          closeButton
        ></Toaster>
        <div className="w-full">
          <div id="employee-data-this-month" className="flex flex-wrap justify-center gap-[30px] min-h-[141px] w-full mx-auto">
            <Card className="flex-1 min-w-[250px] max-w-[500px] rounded-[15px] border border-black/15 bg-white shadow-[0px_2px_2px_0px_rgba(0,0,0,0.25)] overflow-hidden">
              <div className="flex-col mt-[-5px] mx-[10px]">
                <div className="flex w-full h-[44px] items-center gap-[10px] mx-[20px]">
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M19 4H5C3.89543 4 3 4.89543 3 6V20C3 21.1046 3.89543 22 5 22H19C20.1046 22 21 21.1046 21 20V6C21 4.89543 20.1046 4 19 4Z"
                      stroke="black"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M16 2V6"
                      stroke="black"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M8 2V6"
                      stroke="black"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M3 10H21"
                      stroke="black"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                  <p className="justify-center w-full text-base font-medium whitespace-nowrap">
                    Periode
                  </p>
                </div>
                <p className="justify-center w-full text-4xl font-bold mx-[20px] my-[10px]">
                  {periode}
                </p>
              </div>
            </Card>
            <Card className="flex-1 min-w-[250px] max-w-[500px] rounded-[15px] border border-black/15 bg-white shadow-[0px_2px_2px_0px_rgba(0,0,0,0.25)] overflow-hidden">
              <div className="flex-col mt-[-5px] mx-[10px]">
                <div className="flex w-full h-[44px] items-center gap-[10px] mx-[20px]">
                  <svg
                    width="30"
                    height="30"
                    viewBox="0 0 30 30"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M3.75 26.25V23.75C3.75 22.4239 4.27678 21.1521 5.21447 20.2145C6.15215 19.2768 7.42392 18.75 8.75 18.75H13.75C15.0761 18.75 16.3479 19.2768 17.2855 20.2145C18.2232 21.1521 18.75 22.4239 18.75 23.75V26.25M20 3.91251C21.0755 4.18788 22.0288 4.81338 22.7095 5.69039C23.3903 6.56741 23.7598 7.64604 23.7598 8.75626C23.7598 9.86647 23.3903 10.9451 22.7095 11.8221C22.0288 12.6991 21.0755 13.3246 20 13.6M26.25 26.25V23.75C26.2437 22.6464 25.8724 21.576 25.1941 20.7055C24.5158 19.835 23.5685 19.2134 22.5 18.9375M6.25 8.75C6.25 10.0761 6.77678 11.3479 7.71447 12.2855C8.65215 13.2232 9.92392 13.75 11.25 13.75C12.5761 13.75 13.8479 13.2232 14.7855 12.2855C15.7232 11.3479 16.25 10.0761 16.25 8.75C16.25 7.42392 15.7232 6.15215 14.7855 5.21447C13.8479 4.27678 12.5761 3.75 11.25 3.75C9.92392 3.75 8.65215 4.27678 7.71447 5.21447C6.77678 6.15215 6.25 7.42392 6.25 8.75Z"
                      stroke="black"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                  <p className="justify-center w-full text-base font-medium whitespace-nowrap">
                    Total Employee
                  </p>
                </div>
                <p className="justify-center w-full text-4xl font-bold mx-[20px] my-[10px]">
                  {summary?.["Total Employee"]}
                </p>
              </div>
            </Card>
            <Card className="flex-1 min-w-[250px] max-w-[500px] rounded-[15px] border border-black/15 bg-white shadow-[0px_2px_2px_0px_rgba(0,0,0,0.25)] overflow-hidden">
              <div className="flex-col mt-[-5px] mx-[10px]">
                <div className="flex w-full h-[44px] items-center gap-[10px] mx-[20px]">
                  <svg
                    width="31"
                    height="30"
                    viewBox="0 0 31 30"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <g id="tabler-icon-user-plus">
                      <path
                        id="Vector"
                        d="M20.25 23.75H27.75M24 20V27.5M7.75 26.25V23.75C7.75 22.4239 8.27678 21.1521 9.21447 20.2145C10.1521 19.2768 11.4239 18.75 12.75 18.75H17.75M10.25 8.75C10.25 10.0761 10.7768 11.3479 11.7145 12.2855C12.6521 13.2232 13.9239 13.75 15.25 13.75C16.5761 13.75 17.8479 13.2232 18.7855 12.2855C19.7232 11.3479 20.25 10.0761 20.25 8.75C20.25 7.42392 19.7232 6.15215 18.7855 5.21447C17.8479 4.27678 16.5761 3.75 15.25 3.75C13.9239 3.75 12.6521 4.27678 11.7145 5.21447C10.7768 6.15215 10.25 7.42392 10.25 8.75Z"
                        stroke="black"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </g>
                  </svg>
                  <p className="justify-center w-full text-base font-medium whitespace-nowrap">
                    Total New Hire
                  </p>
                </div>

                <p className="justify-center w-full text-4xl font-bold mx-[20px] my-[10px]">
                  {summary?.["Total New Hire"]}
                </p>
              </div>
            </Card>
            <Card className="flex-1 min-w-[250px] max-w-[500px] rounded-[15px] border border-black/15 bg-white shadow-[0px_2px_2px_0px_rgba(0,0,0,0.25)] overflow-hidden">
              <div className="flex-col mt-[-5px] mx-[10px]">
                <div className="flex w-full h-[44px] items-center gap-[10px] mx-[20px]">
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M20 7H4C2.89543 7 2 7.89543 2 9V19C2 20.1046 2.89543 21 4 21H20C21.1046 21 22 20.1046 22 19V9C22 7.89543 21.1046 7 20 7Z"
                      stroke="black"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M16 21V5C16 4.46957 15.7893 3.96086 15.4142 3.58579C15.0391 3.21071 14.5304 3 14 3H10C9.46957 3 8.96086 3.21071 8.58579 3.58579C8.21071 3.96086 8 4.46957 8 5V21"
                      stroke="black"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>

                  <p className="justify-center w-full text-base font-medium whitespace-nowrap">
                    Active Employee
                  </p>
                </div>
                <p className="justify-center w-full text-4xl font-bold mx-[20px] my-[10px]">
                  {summary?.["Active Employee"]}
                </p>
              </div>
            </Card>
          </div>
          {/* {isLoading ? (
          <div className="flex flex-wrap justify-center gap-[30px] min-h-[141px] w-full mx-auto">
            <Skeleton className="flex-1 min-w-[250px] max-w-[500px] "></Skeleton>
            <Skeleton className="flex-1 min-w-[250px] max-w-[500px] "></Skeleton>
            <Skeleton className="flex-1 min-w-[250px] max-w-[500px] "></Skeleton>
            <Skeleton className="flex-1 min-w-[250px] max-w-[500px] "></Skeleton>
          </div>
        ) : (
        )} */}

          {/* <div className="flex flex-wrap justify-center gap-[30px] min-h-[141px] w-full mx-auto" id="employee-data-this-month">
          {isLoading ? (
            <Skeleton className="flex-1 min-w-[250px] max-w-[500px] "></Skeleton>
          ):(
            <Card className="flex-1 min-w-[250px] max-w-[500px] rounded-[15px] border border-black/15 bg-white shadow-[0px_2px_2px_0px_rgba(0,0,0,0.25)] overflow-hidden">
            
            <div className="flex-col mt-[-5px] mx-[10px]">
              <div className="flex w-full h-[44px] items-center gap-[10px] mx-[20px]">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M19 4H5C3.89543 4 3 4.89543 3 6V20C3 21.1046 3.89543 22 5 22H19C20.1046 22 21 21.1046 21 20V6C21 4.89543 20.1046 4 19 4Z" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M16 2V6" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M8 2V6" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M3 10H21" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                <p className="justify-center w-full text-base font-medium whitespace-nowrap">Periode</p>
              </div>
                <p className="justify-center w-full text-4xl font-bold mx-[20px] my-[10px]">{periode}</p>
            </div>
          </Card>
          )}
          
           {isLoading ? (
                <Skeleton className="flex-1 min-w-[250px] max-w-[500px] "></Skeleton>
          ):(
          <Card className="flex-1 min-w-[250px] max-w-[500px] rounded-[15px] border border-black/15 bg-white shadow-[0px_2px_2px_0px_rgba(0,0,0,0.25)] overflow-hidden">
          <div className="flex-col mt-[-5px] mx-[10px]">
              <div className="flex w-full h-[44px] items-center gap-[10px] mx-[20px]">
                <svg width="30" height="30" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M3.75 26.25V23.75C3.75 22.4239 4.27678 21.1521 5.21447 20.2145C6.15215 19.2768 7.42392 18.75 8.75 18.75H13.75C15.0761 18.75 16.3479 19.2768 17.2855 20.2145C18.2232 21.1521 18.75 22.4239 18.75 23.75V26.25M20 3.91251C21.0755 4.18788 22.0288 4.81338 22.7095 5.69039C23.3903 6.56741 23.7598 7.64604 23.7598 8.75626C23.7598 9.86647 23.3903 10.9451 22.7095 11.8221C22.0288 12.6991 21.0755 13.3246 20 13.6M26.25 26.25V23.75C26.2437 22.6464 25.8724 21.576 25.1941 20.7055C24.5158 19.835 23.5685 19.2134 22.5 18.9375M6.25 8.75C6.25 10.0761 6.77678 11.3479 7.71447 12.2855C8.65215 13.2232 9.92392 13.75 11.25 13.75C12.5761 13.75 13.8479 13.2232 14.7855 12.2855C15.7232 11.3479 16.25 10.0761 16.25 8.75C16.25 7.42392 15.7232 6.15215 14.7855 5.21447C13.8479 4.27678 12.5761 3.75 11.25 3.75C9.92392 3.75 8.65215 4.27678 7.71447 5.21447C6.77678 6.15215 6.25 7.42392 6.25 8.75Z" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                <p className="justify-center w-full text-base font-medium whitespace-nowrap">Total Employee</p>
              </div>
              <p className="justify-center w-full text-4xl font-bold mx-[20px] my-[10px]">{summary?.["Total Employee"]}</p>
            </div>
          </Card>
          )}
           {isLoading ? (
                  <Skeleton className="flex-1 min-w-[250px] max-w-[500px] "></Skeleton>
          ):(
          <Card className="flex-1 min-w-[250px] max-w-[500px] rounded-[15px] border border-black/15 bg-white shadow-[0px_2px_2px_0px_rgba(0,0,0,0.25)] overflow-hidden">
          <div className="flex-col mt-[-5px] mx-[10px]">
              <div className="flex w-full h-[44px] items-center gap-[10px] mx-[20px]">
                <svg width="31" height="30" viewBox="0 0 31 30" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <g id="tabler-icon-user-plus">
                  <path id="Vector" d="M20.25 23.75H27.75M24 20V27.5M7.75 26.25V23.75C7.75 22.4239 8.27678 21.1521 9.21447 20.2145C10.1521 19.2768 11.4239 18.75 12.75 18.75H17.75M10.25 8.75C10.25 10.0761 10.7768 11.3479 11.7145 12.2855C12.6521 13.2232 13.9239 13.75 15.25 13.75C16.5761 13.75 17.8479 13.2232 18.7855 12.2855C19.7232 11.3479 20.25 10.0761 20.25 8.75C20.25 7.42392 19.7232 6.15215 18.7855 5.21447C17.8479 4.27678 16.5761 3.75 15.25 3.75C13.9239 3.75 12.6521 4.27678 11.7145 5.21447C10.7768 6.15215 10.25 7.42392 10.25 8.75Z" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </g>
                </svg>
                <p className="justify-center w-full text-base font-medium whitespace-nowrap">Total New Hire</p>
              </div>
              
              <p className="justify-center w-full text-4xl font-bold mx-[20px] my-[10px]">{summary?.["Total New Hire"]}</p>
            </div>
          </Card>
          )}
           {isLoading ? (
                 <Skeleton className="flex-1 min-w-[250px] max-w-[500px] "></Skeleton>
          ):(
          <Card className="flex-1 min-w-[250px] max-w-[500px] rounded-[15px] border border-black/15 bg-white shadow-[0px_2px_2px_0px_rgba(0,0,0,0.25)] overflow-hidden">
          <div className="flex-col mt-[-5px] mx-[10px]">
              <div className="flex w-full h-[44px] items-center gap-[10px] mx-[20px]">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M20 7H4C2.89543 7 2 7.89543 2 9V19C2 20.1046 2.89543 21 4 21H20C21.1046 21 22 20.1046 22 19V9C22 7.89543 21.1046 7 20 7Z" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M16 21V5C16 4.46957 15.7893 3.96086 15.4142 3.58579C15.0391 3.21071 14.5304 3 14 3H10C9.46957 3 8.96086 3.21071 8.58579 3.58579C8.21071 3.96086 8 4.46957 8 5V21" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>

                <p className="justify-center w-full text-base font-medium whitespace-nowrap">Active Employee</p>
              </div>
              <p className="justify-center w-full text-4xl font-bold mx-[20px] my-[10px]">{summary?.["Active Employee"]}</p>
            </div>
          </Card>
          )}
        </div> */}
          <div className="mt-[30px] w-full overflow-x-auto">
            <Card className="flex-1 rounded-[15px] border border-black/15 bg-white shadow-[0px_2px_2px_0px_rgba(0,0,0,0.25)] overflow-hidden" >
              <CardContent className="overflow-x-auto">
                <DataTable
                  columns={columns}
                  data={employees}
                  isLoading={isLoading}
                />
              </CardContent>
            </Card>
            {/* {isLoading ? (
            <Skeleton className="min-h-[141px]"></Skeleton>
          ) : (
          )} */}
          </div>
        </div>
      </Sidebar>
      </>
    );
  }
  return (
    <Sidebar title="Employee Database">
      <div
        
        className="flex flex-wrap justify-center gap-[30px] min-h-[141px] w-full mx-auto"
      >
        <Skeleton className="flex-1 min-w-[250px] max-w-[500px] "></Skeleton>
        <Skeleton className="flex-1 min-w-[250px] max-w-[500px] "></Skeleton>
        <Skeleton className="flex-1 min-w-[250px] max-w-[500px] "></Skeleton>
        <Skeleton className="flex-1 min-w-[250px] max-w-[500px] "></Skeleton>
      </div>
      <div className="mt-[30px] w-full overflow-x-auto" >
        <Skeleton className="h-[500px]"></Skeleton>
      </div>
    </Sidebar>
  );
}
