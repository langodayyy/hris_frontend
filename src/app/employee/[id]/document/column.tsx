
"use client"

import { Button } from "@/components/ui/button"
import { ColumnDef } from "@tanstack/react-table"
import Link from "next/link"

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type Documents = {
  id: string
  document_name: String
  document_type: String
  issue_date: string
  expiry_date: string
}

export const columns = (onDownload: (id: string) => void) : ColumnDef<Documents>[] => [
  {
    id: "rowNumber",
    header: () => <div className="text-left">No</div>,
    cell: ({ row }) => <div className="text-left">{row.index + 1}</div>,
  },
  {
    accessorKey: "document_name",
    header: () => <div className="text-left">Document Name</div>,
    cell: ({ row }) => <div className="text-left">{row.getValue("document_name")}</div>,
  },
  {
    accessorKey: "document_type",
    header: () => <div className="text-left">Document Type</div>,
    cell: ({ row }) => <div className="text-left">{row.getValue("document_type")}</div>,
  },
  {
    accessorKey: "issue_date",
    header: () => <div className="text-left">Issue Date</div>,
    cell: ({ row }) => <div className="text-left">{row.getValue("issue_date")}</div>,
  },
  {
    accessorKey: "expiry_date",
    header: () => <div className="text-left">Expiry Date</div>,
    cell: ({ row }) => <div className="text-left">{row.getValue("expiry_date")}</div>,
  },
  
  {
    id: "actions",
    header: () => <div className="text-center">Actions</div>,
    cell: ({ row }) => {
      const document = row.original

      return (
        <div className="text-center">
            <Button variant="outline" size="sm" onClick={() => onDownload(document.id)}>
              Download
            </Button>
        </div>
      )
    },
  },
]
