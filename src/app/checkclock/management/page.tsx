"use client";
import { useState, useEffect } from "react";
import Sidebar from "../../../components/sidebar";
import * as React from "react";
import { CheckclockOverview, columns } from "./columns";
import { DataTable } from "./data-table";
import Cookies from "js-cookie";
import { CheckclockResponse } from "@/types/checkclock";
import { Skeleton } from "@/components/ui/skeleton";
import { useEdit } from "@/context/EditFormContext";
import { Toaster, toast } from "sonner";
import Joyride, { Step } from "react-joyride";

export default function CheckclockOverviewPage() {
  const [date, setDate] = useState<Date | undefined>();
  const [allData, setAllData] = useState<CheckclockOverview[]>([]);
  const [data, setData] = useState<CheckclockOverview[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // const { errors, setErrors, success, setSuccess } = useEdit();

  const handleCalendarChange = (selectedDate: Date | undefined) => {
    setDate(selectedDate);

    if (!selectedDate) {
      setData(allData);
      return;
    }

    const selected = new Date(selectedDate);

    const filtered = allData.filter((item) => {
      if (!item.date || typeof item.date !== "string") return false;

      const itemDate = new Date(item.date);

      // Compare only date parts (ignore time)
      return (
        itemDate.getFullYear() === selected.getFullYear() &&
        itemDate.getMonth() === selected.getMonth() &&
        itemDate.getDate() === selected.getDate()
      );
    });

    console.log("data now", filtered);
    setData(filtered);
  };

  const [steps, setSteps] = useState<Step[]>([]);
  const [joyrideKey, setJoyrideKey] = useState(0);

  const checklockSteps = {
    "checkclock/management": [
      {
        target: "#checkclock",
        content:
          "This is the Checkclock Management table. You can manage employee checkclock data here.",
        disableBeacon: true,
      },
      {
        target: "#date-checkclock",
        content: "You can filter checkclock data by date.",
        disableBeacon: true,
      },
      {
        target: "#filter-checkclock",
        content: "You can filter checkclock data by position, or work type.",
        disableBeacon: true,
      },
      {
        target: "#add-checkclock",
        content:
          "You can add new checkclock for employee who you choose here manually.",
        disableBeacon: true,
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

  // useEffect(() => {
  //   if (!loading) {
  //     const checkclockEl = document.querySelector("#checkclock");
  //     if (checkclockEl && checkJoyride("checkclock/management")) {
  //       setSteps(checklockSteps["checkclock/management"]);
  //       setJoyrideKey((prev) => prev + 1);
  //     }
  //   }
  // }, [loading]);
  useEffect(() => {
    if (!loading) {
      const checkclockEl = document.querySelector("#checkclock");
      if (checkclockEl && checkJoyride("checkclock/management")) {
        setSteps(checklockSteps["checkclock/management"]);
        setJoyrideKey((prev) => prev + 1);
      }
    }
  }, [loading]);

  useEffect(() => {
    async function fetchData() {
      try {
        setLoading(true);
        const response = await getCheckClock();

        if (response.success && response.data) {
          const transformedData: CheckclockOverview[] = response.data.map(
            (item: CheckclockResponse) => {
              const shouldClearStatus =
                item.approval_status !== "Rejected" &&
                (item.status === "Late" ||
                  item.status === "On Time" ||
                  item.status === "Absent");

              return {
                id: item.employee_id,
                data_id: item.data_id,
                submitter: item.submitter_name,
                employeeNumber: item.employee_number,
                employeeName: item.employee_name,
                position: item.position,
                date: item.date,
                clockIn: item.clock_in || "--:--",
                clockOut: item.clock_out || "--:--",
                workType: item.work_type,
                status: item.status,
                approvalStatus: shouldClearStatus ? "" : item.approval_status,
                latitude: item.latitude || null,
                longitude: item.longitude || null,
                startDate: item.absent_start_date || "-",
                endDate: item.absent_end_date || "-",
                rejectReason: item.reject_reason,
                presentEvidence: item.present_evidence,
                presentEvidenceUrl: item.present_evidence_url,
                absentEvidence: item.absent_evidence,
                absentEvidenceUrl: item.absent_evidence_url,
                employeePhoto: item.employee_photo_url,
              };
            }
          );

          setAllData(transformedData); // sets for calendar filter use
          setData(transformedData);

          // Filter by today's date directly using transformedData
          // const today = new Date();
          // const todayStr = today.toISOString().slice(0, 10);

          // const filtered = transformedData.filter((item) => {
          //   if (!item.date || typeof item.date !== "string") return false;

          //   const itemDateStr = new Date(item.date).toISOString().slice(0, 10);
          //   return itemDateStr === todayStr;
          // });

          // console.log("Filtered today data", filtered);
          // setDate(today); // update calendar
          // setData(filtered); // show today's data
        } else {
          setError(response.errors?.general?.[0] || "Failed to fetch data");
        }
      } catch (err) {
        setError("An error occurred while fetching data");
        console.error(err);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, []);

  // useEffect(() => {
  //   handleCalendarChange(new Date());
  // }, [allData]);

  // if (loading) {
  //   return (
  //     <Sidebar title="Checkclock">
  //       <Skeleton className="w-full h-[400px]"></Skeleton>
  //     </Sidebar>
  //   );
  // }

  // React.useEffect(() => {
  //   if (errors && Object.keys(errors).length > 0) {
  //     Object.entries(errors).forEach(([field, messages]) => {
  //       if (Array.isArray(messages)) {
  //         messages.forEach((message) => toast.error(`${message}`));
  //       } else {
  //         toast.error(`${messages}`);
  //       }
  //     });
  //     setErrors({});
  //   }
  // }, [errors]);

  // React.useEffect(() => {
  //   if (success && Object.keys(success).length > 0) {
  //     toast.success(`${success.message}`);
  //     setSuccess({});
  //   }
  // }, [success]);

  if (loading) {
    return (
      <Sidebar title="Checkclock">
        <Skeleton className="w-full h-screen"></Skeleton>
      </Sidebar>
    );
  }

  return (
    <>
      {/* <Joyride
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
      /> */}
      <Sidebar title="Checkclock">
        <Toaster
          position="bottom-right"
          expand={true}
          richColors
          closeButton
        ></Toaster>
        <div className="bg-white rounded-[15px] p-5 flex flex-col gap-[10px]">
          <div className="container mx-auto" id="checkclock">
            <DataTable
              columns={columns}
              data={data}
              date={date}
              onDateChange={handleCalendarChange}
            />
          </div>
        </div>
      </Sidebar>
    </>
  );
}

export async function getCheckClock() {
  try {
    const userCookie = Cookies.get("token");
    if (userCookie) {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/check-clocks`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${userCookie}`,
          },
        }
      );

      if (!response.ok) {
        // If the response is not OK, parse the error response
        const errorData = await response.json();
        return { success: false, errors: errorData.errors };
      }

      // Parse and return the success response
      const responseData = await response.json();
      return { success: true, data: responseData };
    } else {
      return {
        success: false,
        errors: { general: ["User token not found"] },
      };
    }
  } catch (error: any) {
    // Handle network or other unexpected errors
    return {
      success: false,
      errors: { general: [error.message || "An unexpected error occurred"] },
    };
  }
}
