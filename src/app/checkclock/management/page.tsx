"use client";
import { useState, useEffect } from "react";
import Sidebar from "../../../components/sidebar";
import * as React from "react";
import { CheckclockOverview, columns } from "./columns";
import { DataTable } from "./data-table";
import Cookies from "js-cookie";
import { CheckclockResponse } from "@/types/checkclock";
import Joyride, { Step } from "react-joyride";

export default function CheckclockOverviewPage() {
  const [data, setData] = useState<CheckclockOverview[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

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
        const response = await getCheckClock();

        if (response.success && response.data) {
          // Transform API data to match your table structure
          const transformedData: CheckclockOverview[] = response.data.map(
            (item: CheckclockResponse) => ({
              id: item.employee_id,
              data_id: item.data_id,
              employeeName: item.employee_name,
              position: item.position,
              date: item.date,
              clockIn: item.clock_in || "--:--",
              clockOut: item.clock_out || "--:--",
              workType: item.work_type,
              status: item.status,
              approvalStatus: item.approval_status,
              latitude: item.latitude || "-",
              longitude: item.longitude || "-",
              startDate: item.absent_start_date || "-",
              endDate: item.absent_end_date || "-",
            })
          );

          setData(transformedData);
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

  if (loading) {
    return (
      <Sidebar title="Checkclock">
        <div>Loading...</div>
      </Sidebar>
    );
  }

  if (error) {
    return (
      <Sidebar title="Checkclock">
        <div>Error: {error}</div>
      </Sidebar>
    );
  }

  return (
    <Sidebar title="Checkclock">
      <div
        className="bg-white rounded-[15px] p-5 flex flex-col gap-[10px]"
        id="checkclock"
      >
        <div className="container mx-auto">
          <DataTable columns={columns} data={data} />
        </div>
      </div>
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
      />
    </Sidebar>
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
