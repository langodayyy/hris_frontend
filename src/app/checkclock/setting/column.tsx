"use client";

import { Button } from "@/components/ui/button";
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

export const wfoColumns: ColumnDef<checkclockSetting>[] = [
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
    accessorKey: "clockIn",
    header: ({ column }) => {
      return <div className="text-center">Clock In</div>;
    },
    cell: ({ row }) => {
      return <div className="text-center">{row.getValue("clockIn")}</div>;
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
  // {
  //   accessorKey: "latidude",
  //   header: ({ column }) => {
  //     return <div className="text-center">Latitude</div>;
  //   },
  //   cell: ({ row }) => {
  //     return <div className="text-center">{row.getValue("latidude")}</div>;
  //   },
  // },
  // {
  //   accessorKey: "longitude",
  //   header: ({ column }) => {
  //     return <div className="text-center">Longitude</div>;
  //   },
  //   cell: ({ row }) => {
  //     return <div className="text-center">{row.getValue("longitude")}</div>;
  //   },
  // },
  // {
  //   accessorKey: "radius",
  //   header: ({ column }) => {
  //     return <div className="text-center">Radius (m)</div>;
  //   },
  //   cell: ({ row }) => {
  //     return <div className="text-center">{row.getValue("radius")}</div>;
  //   },
  // },
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

export const wfaColumns: ColumnDef<checkclockSetting>[] = [
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
    accessorKey: "clockIn",
    header: ({ column }) => {
      return <div className="text-center">Clock In</div>;
    },
    cell: ({ row }) => {
      return <div className="text-center">{row.getValue("clockIn")}</div>;
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
