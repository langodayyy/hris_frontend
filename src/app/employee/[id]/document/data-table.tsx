"use client"
import * as React from "react";
import { useRef, useState, useEffect } from "react";
import {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table"

import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import {
    Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

import { Input } from "@/components/ui/input";
import { Spinner } from "@/components/ui/spinner";

import { useParams, useRouter } from 'next/navigation';
import Cookies from "js-cookie";
import Link from "next/link";

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[]
  data: TData[]
  isLoading?: boolean
}

export function DataTable<TData, TValue>({
  columns,
  data,
  isLoading,
}: DataTableProps<TData, TValue>) {
    console.log("Data struktur:", data);

    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [currentPage, setCurrentPage] = useState(1);
    const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);

    const table = useReactTable({
        data,
        columns,
        state: {
            columnFilters,
        },
        onColumnFiltersChange: setColumnFilters,
        getCoreRowModel: getCoreRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        getSortedRowModel: getSortedRowModel(),
        onPaginationChange: (updater) => {
        const newPagination =
            typeof updater === "function"
            ? updater(table.getState().pagination)
            : updater;
        setCurrentPage(newPagination.pageIndex + 1); // Perbarui halaman (1-based index)
        setRowsPerPage(newPagination.pageSize); // Perbarui jumlah baris per halaman
        },
    })
    const handleRowsChange = (value: string) => {
        setRowsPerPage(Number(value));
        setCurrentPage(1); // reset ke halaman 1
    };

    const handlePageChange = (page: number) => {
        setCurrentPage(page);
    };

    // const totalPages = Math.ceil(data.length / rowsPerPage);
    const totalPages = Math.ceil(table.getFilteredRowModel().rows.length / rowsPerPage);
 

    const maxVisiblePages = 5;
    let startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2));
    let endPage = startPage + maxVisiblePages - 1;

    if (endPage > totalPages) {
        endPage = totalPages;
        startPage = Math.max(1, endPage - maxVisiblePages + 1);
    }

    const formRef = useRef<HTMLFormElement>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);
    const [uploadedFile, setUploadedFile] = useState<File | null>(null);

    const handleFileDrop = (files: File[]) => {
        const file = files[0];
        setUploadedFile(file);
        // Saat file di-drop, masukkan ke input file manual (untuk FormData)
        const dataTransfer = new DataTransfer();
        dataTransfer.items.add(file);
        if (fileInputRef.current) {
            fileInputRef.current.files = dataTransfer.files;
        }
    };

    useEffect(() => {
        const fetchData = async () => {
        try {
           
            const resDepPos = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/department-position`, {
            headers: {
                "Authorization": `Bearer ${Cookies.get("token")}`,
                "Content-Type": "application/json"
            }
            })
    


            if (!resDepPos.ok) throw new Error("Failed to fetch Department & Position")
        


        } catch (error) {
            console.error("Error fetching data:", error)
        }
        }
    
        fetchData()
    }, []
    )

    const params = useParams<{ id: string }>();
    const employeeId = params.id;
  return (
    <>
    <div className="flex items-center py-4 gap-[10px]">
    <span className="w-[187px] text-lg flex-none">Employee Document</span>
    <Input
        placeholder="Search Document Name"
        icon={<svg
            width="20"
            height="21"
            viewBox="0 0 20 21"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
        >
            <path
                d="M17.5 18L13.875 14.375M15.8333 9.66667C15.8333 13.3486 12.8486 16.3333 9.16667 16.3333C5.48477 16.3333 2.5 13.3486 2.5 9.66667C2.5 5.98477 5.48477 3 9.16667 3C12.8486 3 15.8333 5.98477 15.8333 9.66667Z"
                stroke="currentColor"
                strokeWidth="1.66667"
                strokeLinecap="round"
                strokeLinejoin="round" />
        </svg>}
        value={(table.getColumn("document_name")?.getFilterValue() as string) ?? ""}
        onChange={(event) => table.getColumn("document_name")?.setFilterValue(event.target.value)}
        className="w-full min-w-[200px]" />
        
   
                  
    <div className="w-fit">
        <Link href={`/employee/${employeeId}/document/add`}>
            <Button className="w-full" variant="default" >
            <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M7.5 3.125V11.875" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M3.125 7.5H11.875" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>

            Add Documents
            </Button>
        </Link>
    </div>
    </div>
    {isLoading ? (
        <Spinner size="large" />
    ) : (
    <div className="rounded-md border min-w-[815px]">
        
        <Table>
            <TableHeader>
                {table.getHeaderGroups().map((headerGroup) => (
                    <TableRow key={headerGroup.id}>
                        {headerGroup.headers.map((header) => {
                            return (
                                <TableHead key={header.id}>
                                    {header.isPlaceholder
                                        ? null
                                        : flexRender(
                                            header.column.columnDef.header,
                                            header.getContext()
                                        )}
                                </TableHead>
                            );
                        })}
                    </TableRow>
                ))}
            </TableHeader>
            <TableBody>
                {table.getRowModel().rows?.length ? (
                    table.getRowModel().rows.map((row) => (
                        <TableRow
                            key={row.id}
                            data-state={row.getIsSelected() && "selected"}
                        >
                            {row.getVisibleCells().map((cell) => (
                                <TableCell key={cell.id}>
                                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                </TableCell>
                            ))}
                        </TableRow>
                    ))
                ) : (
                    <TableRow>
                        <TableCell colSpan={columns.length} className="h-24 text-center">
                            No results.
                        </TableCell>
                    </TableRow>
                )}
            </TableBody>
        </Table>
    </div>)}
    <div className="w-full flex justify-between mt-[10px]">
        {/* Select Rows */}
        <div className="flex items-center gap-[10px]">
            <p className="text-base font-medium">Showing</p>
            <Select
                onValueChange={handleRowsChange}
                defaultValue={rowsPerPage.toString()}
                >
                <SelectTrigger className="w-[72px]">
                    <SelectValue placeholder="" />
                </SelectTrigger>
                <SelectContent>
                    <SelectItem value="10">10</SelectItem>
                    {table.getFilteredRowModel().rows.length > 10 && (
                    <SelectItem value="25">25</SelectItem>
                    )}
                    {table.getFilteredRowModel().rows.length > 25 && (
                    <SelectItem value="50">50</SelectItem>
                    )}
                    {table.getFilteredRowModel().rows.length > 50 && (
                    <SelectItem value="100">100</SelectItem>
                    )}
                </SelectContent>
            </Select>

        </div>

        {/* Pagination */}
        <div className="flex">
          <Pagination>
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious
                  href="#"
                  onClick={() => handlePageChange(Math.max(currentPage - 1, 1))}
                  className="mx-[4px] w-[24px] h-[26px] !py-[6px] !px-[6px] border text-primary-900 bg-[#F5F5F5] shadow-xs hover:bg-primary-950 hover:text-white dark:bg-input/30 dark:border-input dark:hover:bg-input/50"
                />
              </PaginationItem>
              {startPage > 1 && (
                <>
                  <PaginationItem>
                    <PaginationLink
                      href="#"
                      onClick={() => handlePageChange(1)}
                    >
                      1
                    </PaginationLink>
                  </PaginationItem>
                  {startPage > 2 && (
                    <PaginationItem>
                      <PaginationEllipsis />
                    </PaginationItem>
                  )}
                </>
              )}

              {Array.from({ length: endPage - startPage + 1 }).map((_, i) => {
                const page = startPage + i;
                return (
                  <PaginationItem key={page}>
                    <PaginationLink
                      href="#"
                      isActive={page === currentPage}
                      onClick={() => handlePageChange(page)}
                      className={`inline-flex items-center justify-center mx-[4px] w-[24px] h-[26px] !py-[6px] !px-[6px] border text-primary-900 bg-[#F5F5F5] shadow-xs 
                        ${
                        page === currentPage
                            ? "bg-primary-950 text-white"
                            : "hover:bg-primary-950 hover:text-white"
                        }
                        dark:bg-input/30 dark:border-input dark:hover:bg-input/50`}
                    >
                      {page}
                    </PaginationLink>
                  </PaginationItem>
                );
              })}

              {endPage < totalPages && (
                <>
                  {endPage < totalPages - 1 && (
                    <PaginationItem>
                      <PaginationEllipsis />
                    </PaginationItem>
                  )}
                  <PaginationItem>
                    <PaginationLink
                      href="#"
                      onClick={() => handlePageChange(totalPages)}
                    >
                      {totalPages}
                    </PaginationLink>
                  </PaginationItem>
                </>
              )}

              <PaginationItem>
                <PaginationNext
                  href="#"
                  onClick={() =>
                    handlePageChange(Math.min(currentPage + 1, totalPages))
                  }
                  className="mx-[4px] w-[24px] h-[26px] !py-[6px] !px-[6px] border text-primary-900 bg-[#F5F5F5] shadow-xs hover:bg-primary-950 hover:text-white dark:bg-input/30 dark:border-input dark:hover:bg-input/50"
                />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </div>
      </div>
    </>
  )
}
