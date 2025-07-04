"use client";

import { Button } from "@/components/ui/button";
import { CheckclockSettingForm } from "@/types/cksettingForm";
import { ColumnDef } from "@tanstack/react-table";
import React from "react";


// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type checkclockSetting = {
  id: string;
  workType: string;
  clockIn?: string;
  clockOut?: string;
  day: string;
  latidude?: number;
  longitude?: number;
  radius?: number;
};

export const wfoColumns: ColumnDef<CheckclockSettingForm>[] = [
  { accessorKey: "no", header: ({ column }) => {
      return <div className="text-center">No.</div>;
    }, cell: ({ row }) =>  {return <div className="text-center">{row.index + 1}</div>;} },
  { accessorKey: "day",header: ({ column }) => {
      return <div className="">Day</div>;
    },
    cell: ({ row }) => {
      return <div className="text-left">{row.getValue("day")}</div>;
    }, },
  {
    accessorKey: "minClockIn",
    header: ({ column }) => {
      return <div className="text-center">Min Clock In</div>;
    },
    cell: ({ row }) => {
      return <div className="text-center">{row.getValue("minClockIn")}</div>;
    },
  },
  {
    accessorKey: "clockIn",
    header: ({ column }) => {
      return <div className="text-center">Clock In</div>;
    },
    cell: ({ row }) => {
      return <div className="text-center">{row.getValue("clockIn")}</div>;
    },
  },
  {
    accessorKey: "maxClockIn",
    header: ({ column }) => {
      return <div className="text-center">Max Clock In</div>;
    },
    cell: ({ row }) => {
      return <div className="text-center">{row.getValue("maxClockIn")}</div>;
    },
  },
  {
    accessorKey: "clockOut",
    header: ({ column }) => {
      return <div className="text-center">Clock Out</div>;
    },
    cell: ({ row }) => {
      return <div className="text-center">{row.getValue("clockOut")}</div>;
    },
  },
  {
    accessorKey: "maxClockOut",
    header: ({ column }) => {
      return <div className="text-center">Max Clock Out</div>;
    },
    cell: ({ row }) => {
      return <div className="text-center">{row.getValue("maxClockOut")}</div>;
    },
  },
  {
    accessorKey: "action",
    header: ({ column }) => {
      return <div className="text-center">Action</div>;
    },
    cell: ({ row }) => {
     
      return (
        <div className="flex justify-center w-full items-center">
          <div className="w-full flex items-center justify-center" id="edit-coci">
                <Button variant={"outline"} size={"sm"}>
                  Edit
                </Button>
            
          </div>
        </div>
      );
    },
  },
];

export const wfaColumns: ColumnDef<CheckclockSettingForm>[] = [
  { accessorKey: "no", header: ({ column }) => {
      return <div className="text-center">No.</div>;
    }, cell: ({ row }) =>  {return <div className="text-center">{row.index + 1}</div>;} },
  { accessorKey: "day",header: ({ column }) => {
      return <div className="">Day</div>;
    },
    cell: ({ row }) => {
      return <div className="text-left">{row.getValue("day")}</div>;
    }, },
  {
    accessorKey: "minClockIn",
    header: ({ column }) => {
      return <div className="text-center">Min Clock In</div>;
    },
    cell: ({ row }) => {
      return <div className="text-center">{row.getValue("minClockIn")}</div>;
    },
  },
  {
    accessorKey: "clockIn",
    header: ({ column }) => {
      return <div className="text-center">Clock In</div>;
    },
    cell: ({ row }) => {
      return <div className="text-center">{row.getValue("clockIn")}</div>;
    },
  },
  {
    accessorKey: "maxClockIn",
    header: ({ column }) => {
      return <div className="text-center">Max Clock In</div>;
    },
    cell: ({ row }) => {
      return <div className="text-center">{row.getValue("maxClockIn")}</div>;
    },
  },
  {
    accessorKey: "action",
    header: ({ column }) => {
      return <div className="text-center">Action</div>;
    },
    cell: ({ row }) => {
     
      return (
        <div className="flex justify-center w-full items-center">
          <div className="w-full flex items-center justify-center">
                <Button variant={"outline"} size={"sm"}>
                  Edit
                </Button>
            
          </div>
        </div>
      );
    },
  },
];
