"use client"

import { ColumnDef } from "@tanstack/react-table"
import { ArrowUpDown } from "lucide-react"

import { MoreHorizontal } from "lucide-react"
 
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type CheckclockOverview = {
  id: string
  employeeName: String
  position: "CEO" | "Manager" | "Head of HR" | "HRD" | "CPO" | "Supervisor" | "OB"
  date: string
  clockIn: string
  clockOut: string
  workType: "WFO" | "WFH"
  status: "On Time" | "Late" | "Anual Leave" | "fSick Leave" | "Absent"
  approvalStatus: "Approved" | "Pending" | "Rejected"

}

export const columns: ColumnDef<CheckclockOverview>[] = [
  {
    accessorKey: "id",
    header: "employee ID",
    
  },
  {
    accessorKey: "employeeName",
    header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            <div className="w-full flex items-start justify-start">employeeName
            <ArrowUpDown className="ml-2 h-4 w-4" />
            </div>
          </Button>
        )
      },
    
  },
  {
  accessorKey: "position",
  header: "Position",
  
},
{
    accessorKey: "date",
    header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Date
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        )
      },
},
  
  {
    accessorKey: "clockIn",
    header: "Clock In",
  },
  {
    accessorKey: "clockOut",
    header: "Clock Out",

  },
  {
    accessorKey: "workType",
    header: "Work Type",
  },
  {
    accessorKey: "status",
    header: "Status",
  },
  {
    accessorKey: "approvalStatus",
    header: "Approval Status",
  },
  {
    accessorKey: "Details",
    id: "actions",
    cell: ({ row }) => {
      const payment = row.original
 
      return (
       <Button variant={"outline"} size={"sm"}>View</Button>
      )
    },
  },
];
