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
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuCheckboxItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
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
import Cookies from "js-cookie";
import { toast, Toaster } from "sonner";

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[]
  data: TData[]
  isLoading?: boolean
  tableTitle?: string
}

export function DataTable<TData, TValue>({
  columns,
  data,
  isLoading,
  tableTitle
}: DataTableProps<TData, TValue>) {
    // console.log("Data struktur:", data);

    const [sorting, setSorting] = React.useState<SortingState>([]);
    const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
    );
    const [filters, setFilters] = useState({
        department: [] as string[],
        position: [] as string[],
        workType: [] as string[],
        contract_type: [] as string[],
        gender: [] as string[],
        status: [] as string[],
    });
    const [tempFilters, setTempFilters] = useState(filters);
    const applyClickedRef = useRef(false);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [currentPage, setCurrentPage] = useState(1);
    const table = useReactTable({
        data,
        columns,
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        getSortedRowModel: getSortedRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        state: {
        sorting,
        columnFilters,
        pagination: {
            pageIndex: currentPage - 1, // React Table menggunakan 0-based index
            pageSize: rowsPerPage,
        },
        },
        onSortingChange: setSorting,
        onColumnFiltersChange: setColumnFilters,
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
    const [departments, setDepartments] = useState<{ id: string; name: string }[]>([]);
    const [uniquPositions, setUniquePositions] = useState<string[]>([]);
    type DepartmentPosition = {
        id_department: string;
        Department: string;
        id_position: string;
        Position: string;
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
    


            // if (!resDepPos.ok) throw new Error("Failed to fetch Department & Position")
            const dataDepPos: DepartmentPosition[] = await resDepPos.json();
            if (!resDepPos.ok) {
                throw dataDepPos; 
            }
            // setDepPosData(dataDepPos);


            const uniqPositions = Array.from(new Set(dataDepPos.map(item => item.Position)));
            setUniquePositions(uniqPositions);

            const uniqueDepartments = Array.from(
                new Map(
                    dataDepPos.map(item => [item.id_department, { id: item.id_department, name: item.Department }])
                ).values()
                );
            setDepartments(uniqueDepartments);


        } catch (err) {
            let message = "Unknown error occurred";
            let messagesToShow: string[] = [];

            if (
            err &&
            typeof err === "object" &&
            "message" in err &&
            typeof (err as any).message === "string"
            ) {
            const backendError = err as { message: string; errors?: Record<string, string[]> };

            if (backendError.message.toLowerCase().includes("failed to fetch")) {
                message = "Unknown error occurred";
            } else {
                message = backendError.message;
            }

            messagesToShow = backendError.errors
                ? Object.values(backendError.errors).flat()
                : [message];
            } else {
            messagesToShow = [message]
            }

            toast.error(
            <>
                <p className="text-red-700 font-bold">Error</p>
                {messagesToShow.map((msg, idx) => (
                <div key={idx} className="text-red-700">• {msg}</div>
                ))}
            </>,
            { duration: 30000 }
            );

        }
    }
    
        fetchData()
    }, []
    )
  
  return (
    <>
    <Toaster position="bottom-right" expand={true} richColors closeButton></Toaster>
    <div className="flex items-center py-4 gap-[10px]">
    <span className="text-lg flex-none">{tableTitle}</span>
    <Input
        placeholder="Search Employee Name"
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
        value={(table.getColumn("name")?.getFilterValue() as string) ?? ""}
        onChange={(event) => table.getColumn("name")?.setFilterValue(event.target.value)}
        className="w-full min-w-[200px]" />
    <div className="w-fit">
        <DropdownMenu
            onOpenChange={(open) => {
            if (!open && !applyClickedRef.current) {
                setFilters(tempFilters);
                table.setColumnFilters(
                    Object.entries(tempFilters)
                    .filter(([_, value]) => value.length > 0)
                    .map(([key, value]) => ({
                        id: key,
                        value,
                    }))
                );
            }
            if (!open) {
            applyClickedRef.current = false; // reset
            }
        }}
        >
            <DropdownMenuTrigger asChild>
                <Button
                    variant="outline"
                    icon={<svg
                        width="20"
                        height="21"
                        viewBox="0 0 20 21"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            d="M5 10.5H15M2.5 5.5H17.5M7.5 15.5H12.5"
                            stroke="currentColor"
                            strokeWidth="1.67"
                            strokeLinecap="round"
                            strokeLinejoin="round" />
                    </svg>}
                >
                    Filters
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-64">
                <DropdownMenuLabel>Department</DropdownMenuLabel>
                    {departments.map((dept) => (
                    <DropdownMenuCheckboxItem
                        key={dept.id}
                        checked={tempFilters.department.includes(dept.name)}
                        onSelect={(e) => e.preventDefault()}
                        onCheckedChange={() => {
                        setTempFilters((prev) => {
                            const exists = prev.department.includes(dept.name);
                            return {
                            ...prev,
                            department: exists
                                ? prev.department.filter((item) => item !== dept.name)
                                : [...prev.department, dept.name],
                            };
                        });
                        }}
                    >
                        {dept.name}
                    </DropdownMenuCheckboxItem>
                    ))}
                    <DropdownMenuSeparator />

                <DropdownMenuLabel>Position</DropdownMenuLabel>
                {uniquPositions.map((position) => (
                    <DropdownMenuCheckboxItem
                        key={position}
                        checked={tempFilters.position.includes(position)}
                        onSelect={(e) => e.preventDefault()}
                        onCheckedChange={() => {
                            setTempFilters((prev) => {
                                const exists = prev.position.includes(position);
                                return {
                                ...prev,
                                position: exists
                                    ? prev.position.filter((item) => item !== position)
                                    : [...prev.position, position],
                                };
                            });
                        }}

                    >
                        {position}
                    </DropdownMenuCheckboxItem>
                ))}
                <DropdownMenuSeparator />
                <DropdownMenuLabel>Contract Type</DropdownMenuLabel>
                {["Permanent", "Contract", "Internship"].map((contract_type) => (
                    <DropdownMenuCheckboxItem
                        key={contract_type}
                        checked={tempFilters.contract_type.includes(contract_type)}
                        onSelect={(e) => e.preventDefault()}
                        onCheckedChange={() => {
                            setTempFilters((prev) => {
                                const exists = prev.contract_type.includes(contract_type);
                                return {
                                ...prev,
                                contract_type: exists
                                    ? prev.contract_type.filter((item) => item !== contract_type)
                                    : [...prev.contract_type, contract_type],
                                };
                            });
                        }}

                    >
                        {contract_type}
                    </DropdownMenuCheckboxItem>
                ))}
        
                <DropdownMenuSeparator />
                <DropdownMenuLabel>Gender</DropdownMenuLabel>
                    {["Male", "Female"].map((gender) => (
                        <DropdownMenuCheckboxItem
                            key={gender}
                            checked={tempFilters.gender.includes(gender)}
                            onSelect={(e) => e.preventDefault()}
                            onCheckedChange={() => {
                                setTempFilters((prev) => {
                                    const exists = prev.gender.includes(gender);
                                    return {
                                    ...prev,
                                    gender: exists
                                        ? prev.gender.filter((item) => item !== gender)
                                        : [...prev.gender, gender],
                                    };
                                });
                            }}

                        >
                        {gender}
                    </DropdownMenuCheckboxItem>
                ))}
                <DropdownMenuSeparator />
                <DropdownMenuLabel>Employee Status</DropdownMenuLabel>
                    {['Active', 'Retire', 'Resign', 'Fired'].map((status) => (
                        <DropdownMenuCheckboxItem
                            key={status}
                            checked={tempFilters.status.includes(status)}
                            onSelect={(e) => e.preventDefault()}
                            onCheckedChange={() => {
                                setTempFilters((prev) => {
                                    const exists = prev.status.includes(status);
                                    return {
                                    ...prev,
                                    status: exists
                                        ? prev.status.filter((item) => item !== status)
                                        : [...prev.status, status],
                                    };
                                });
                            }}

                        >
                        {status}
                    </DropdownMenuCheckboxItem>
                ))}
                <DropdownMenuSeparator />
                {/* Clear Filters Button */}
                <div className="flex flex-col px-2 py-1 gap-[10px]">
                    <Button
                        variant="default"
                        className="w-full"
                        onClick={() => {
                        setFilters(tempFilters);
                        table.setColumnFilters(
                            Object.entries(tempFilters)
                            .filter(([_, value]) => value.length > 0)
                            .map(([key, value]) => ({
                                id: key,
                                value,
                            }))
                        );
                        }}
                    >
                        Apply Filters
                    </Button>
                    <Button
                        variant="ghost"
                        className="w-full"
                        onClick={() => {
                            setTempFilters({
                                department: [],
                                position: [],
                                workType: [],
                                contract_type: [],
                                gender: [],
                                status: [],
                            });
                            table.setColumnFilters([]); // Clear all filters in the table
                        } }
                    >
                        Clear Filters
                    </Button>
                </div>
            </DropdownMenuContent>
        </DropdownMenu>
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
