"use client"

import { Button } from "@/components/ui/button"
import { ColumnDef } from "@tanstack/react-table"
import Link from "next/link"

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type Employees = {
  id: string
  name: String
  gender: "Male" | "Female"
  phone: string
  position: string
  type: "Permanent" | "Contract" | "Internship"
  workType: "WFO" | "WFH" | "Hybrid"
  status: "Active" | "Inactive"
}

export const columns: ColumnDef<Employees>[] = [
  {
    accessorKey: "id",
    header: () => <div className="text-left">ID</div>,
    cell: ({ row }) => <div className="text-left">{row.getValue("id")}</div>,
  },

  {
    accessorKey: "name",
    header: () => <div className="text-left">Employee Name</div>,
    cell: ({ row }) => <div className="text-left">{row.getValue("name")}</div>,
  },
  
  {
     accessorKey: "gender",
    header: ({ column }) => {
      return <div className="text-center">Gender</div>;
    },
    cell: ({ row }) => (
      <div className="text-center">{row.getValue("gender")}</div>
    ),
    filterFn: (row, columnId, filterValue) => {
      return filterValue.includes(row.getValue(columnId));
    },
  },
   {
    accessorKey: "phone",
    header: () => <div className="text-center">Phone</div>,
    cell: ({ row }) => <div className="text-center">{row.getValue("phone")}</div>,
  },
    {
    accessorKey: "position",
    header: ({ column }) => {
      return <div className="text-center">Position</div>;
    },
    // header: "Position",
    cell: ({ row }) => (
      <div className="text-center">{row.getValue("position")}</div>
    ),
    filterFn: (row, columnId, filterValue) => {
      return filterValue.includes(row.getValue(columnId));
    },
  },
  {
   accessorKey: "contract_type",
    header: ({ column }) => {
      return <div className="text-center">Contract Type</div>;
    },
    cell: ({ row }) => (
      <div className="text-center">{row.getValue("contract_type")}</div>
    ),
    filterFn: (row, columnId, filterValue) => {
      return filterValue.includes(row.getValue(columnId));
    },
  },
  {
    accessorKey: "workType",
    header: ({ column }) => {
      return <div className="text-center">Work Type</div>;
    },
    cell: ({ row }) => (
      <div className="text-center">{row.getValue("workType")}</div>
    ),
    filterFn: (row, columnId, filterValue) => {
      return filterValue.includes(row.getValue(columnId));
    },
  },
  {
    accessorKey: "status",
    header: ({ column }) => {
      return <div className="text-center">Status</div>;
    },
    cell: ({ row }) => (
      <div className="text-center">{row.getValue("status")}</div>
    ),
    filterFn: (row, columnId, filterValue) => {
      return filterValue.includes(row.getValue(columnId));
    },
  },
  {
    id: "actions",
    header: () => <div className="text-center">Actions</div>,
    cell: ({ row }) => {
      const employee = row.original

      return (
        <div className="text-center">
          <Link href={`/employee/${employee.id}`} prefetch={false}>
            <Button variant="outline" size="sm">
              View
            </Button>
          </Link>
        </div>
      )
    },
  },
]
