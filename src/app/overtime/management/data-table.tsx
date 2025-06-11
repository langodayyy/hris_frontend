"use client";

import {
  ColumnDef,
  ColumnFiltersState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import React, { useMemo, useState, useRef } from "react"; 
import { Button } from "@/components/ui/button";
import { DateRange } from "react-day-picker";
import { cn } from "@/lib/utils";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { format } from "date-fns";
import { useRouter } from "next/navigation";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
}

export function DataTable<TData, TValue>({
  columns,
  data,
}: DataTableProps<TData, TValue>) {
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [globalFilter, setGlobalFilter] = useState("");
  const [date, setDate] = useState<DateRange | undefined>(undefined);
  const [open, setOpen] = useState(false);

  const router = useRouter();

  // State baru untuk filter dropdown
  const [filters, setFilters] = useState({
    overtimeType: [] as string[],
    status: [] as string[],
  });
  const [tempFilters, setTempFilters] = useState(filters); // State sementara untuk dropdown
  const applyClickedRef = useRef(false); // Ref untuk melacak klik tombol apply

  const filteredData = useMemo(() => {
    // Menggunakan state 'date' untuk filter tabel utama
    if (!date?.from || !date?.to) {
      return data;
    }

    return data.filter((item: any) => {
      const itemDate = new Date(item.date);
      return (
        itemDate instanceof Date &&
        !isNaN(itemDate.getTime()) &&
        itemDate >= date.from! &&
        itemDate <= date.to!
      );
    });
  }, [data, date]);

  const table = useReactTable({
    data: filteredData,
    columns,
    getCoreRowModel: getCoreRowModel(),
    onColumnFiltersChange: setColumnFilters,
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    state: {
      columnFilters,
      globalFilter,
    },
    onGlobalFilterChange: setGlobalFilter,
    globalFilterFn: (row, columnId, filterValue) => {
      const name = row.getValue("name")?.toString().toLowerCase() || "";
      const id = row.getValue("id_emp")?.toString().toLowerCase() || "";
      return (
        name.includes(filterValue.toLowerCase()) ||
        id.includes(filterValue.toLowerCase())
      );
    },
  });

  // Fungsi untuk menerapkan filter dari tempFilters ke table.setColumnFilters
  const applyFiltersToTable = () => {
    const newColumnFilters: ColumnFiltersState = [];
    if (tempFilters.overtimeType.length > 0) {
      newColumnFilters.push({
        id: "overtime_type", 
        value: tempFilters.overtimeType,
      });
    }
    if (tempFilters.status.length > 0) {
      newColumnFilters.push({
        id: "approval_status", 
        value: tempFilters.status,
      });
    }
    table.setColumnFilters(newColumnFilters);
    setFilters(tempFilters); 
  };

  const clearAllFilters = () => {
    setTempFilters({
      overtimeType: [],
      status: [],
    });
    table.setColumnFilters([]);
    setFilters({
      overtimeType: [],
      status: [],
    });
  };

  return (
    <div className="flex flex-col gap-[10px]">
      <div className="flex flex-row justify-start items-center py-[10px] px-6 gap-4 w-full">
        <span className="w-auto text-lg flex-none">Overtime Employees</span>
        <div className="relative w-full">
          <img
            src="/search.svg"
            alt="search"
            className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-300 w-4 h-4"
          />
          <Input
            placeholder="Search overtime employee"
            value={globalFilter}
            onChange={(e) => setGlobalFilter(e.target.value)}
            className="pl-10"
          />
        </div>

        <div className="flex gap-2">
          <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild id="date-overtime">
              <Button
                id="date"
                variant={"calendar"}
                icon={
                  <svg
                    width="25"
                    height="25"
                    viewBox="0 0 25 25"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M16.6663 2.08333V6.25"
                      stroke="#B0B0B0"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M8.33333 2.08333V6.25"
                      stroke="#B0B0B0"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M3.125 9.375H21.875"
                      stroke="#B0B0B0"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M19.7917 4.16667H5.20833C4.05729 4.16667 3.125 5.09896 3.125 6.25001V19.7917C3.125 20.9427 4.05729 21.875 5.20833 21.875H19.7917C20.9427 21.875 21.875 20.9427 21.875 19.7917V6.25001C21.875 5.09896 20.9427 4.16667 19.7917 4.16667Z"
                      stroke="#B0B0B0"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M7.30495 13.2594C7.1612 13.2594 7.04453 13.376 7.04558 13.5198C7.04558 13.6635 7.16224 13.7802 7.30599 13.7802C7.44974 13.7802 7.56641 13.6635 7.56641 13.5198C7.56641 13.376 7.44974 13.2594 7.30495 13.2594"
                      stroke="#B0B0B0"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M12.5139 13.2594C12.3702 13.2594 12.2535 13.376 12.2546 13.5198C12.2546 13.6635 12.3712 13.7802 12.515 13.7802C12.6587 13.7802 12.7754 13.6635 12.7754 13.5198C12.7754 13.376 12.6587 13.2594 12.5139 13.2594"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M17.7219 13.2594C17.5782 13.2594 17.4615 13.376 17.4626 13.5198C17.4626 13.6635 17.5792 13.7802 17.723 13.7802C17.8667 13.7802 17.9834 13.6635 17.9834 13.5198C17.9834 13.376 17.8667 13.2594 17.7219 13.2594"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M7.30495 17.426C7.1612 17.426 7.04453 17.5427 7.04558 17.6865C7.04558 17.8302 7.16224 17.9469 7.30599 17.9469C7.44974 17.9469 7.56641 17.8302 7.56641 17.6865C7.56641 17.5427 7.44974 17.426 7.30495 17.426"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M12.5139 17.426C12.3702 17.426 12.2535 17.5427 12.2546 17.6865C12.2546 17.8302 12.3712 17.9469 12.515 17.9469C12.6587 17.9469 12.7754 17.8302 12.7754 17.6865C12.7754 17.5427 12.6587 17.426 12.5139 17.426"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                }
                className={cn(
                  "w-auto justify-start text-left font-normal",
                  !date?.from && "text-muted-foreground"
                )}
              >
                {date?.from && date?.to ? (
                  `${format(date.from, "yyyy-MM-dd")} - ${format(
                    date.to,
                    "yyyy-MM-dd"
                  )}`
                ) : (
                  <span className="text-neutral-300">Pick a date range</span>
                )}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <Calendar
                initialFocus
                mode="range"
                defaultMonth={date?.from}
                selected={date}
                onSelect={setDate}
                numberOfMonths={1}
              />
            </PopoverContent>
          </Popover>

          <div className="w-fit ">
            <DropdownMenu
              onOpenChange={(open) => {
                if (!open && !applyClickedRef.current) {
                  // Jika ditutup tanpa apply, reset tempFilters ke filters yang terakhir diterapkan
                  setTempFilters(filters);
                  // Atau jika ingin filter langsung hilang saat ditutup tanpa apply:
                  // table.setColumnFilters([]);
                }
                if (!open) {
                  applyClickedRef.current = false; // Reset ref
                }
              }}
            >
              <DropdownMenuTrigger asChild id="filter-overtime">
                <Button
                  variant="outline"
                  icon={
                    <svg
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
                        strokeLinejoin="round"
                      />
                    </svg>
                  }
                >
                  Filters
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-64 p-3">
                <DropdownMenuLabel>Overtime Type</DropdownMenuLabel>
                {[
                  "Government Regulation", 
                  "Flat",
                ].map((type) => (
                  <DropdownMenuCheckboxItem
                    key={type}
                    checked={tempFilters.overtimeType.includes(type)}
                    onSelect={(e) => e.preventDefault()}
                    onCheckedChange={() => {
                      setTempFilters((prev) => {
                        const exists = prev.overtimeType.includes(type);
                        return {
                          ...prev,
                          overtimeType: exists
                            ? prev.overtimeType.filter((item) => item !== type)
                            : [...prev.overtimeType, type],
                        };
                      });
                    }}
                  >
                    {type}
                  </DropdownMenuCheckboxItem>
                ))}

                <DropdownMenuSeparator />
                <DropdownMenuLabel>Status</DropdownMenuLabel>
                {["Approved", "Pending", "Rejected"].map((status) => (
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

                <div className="flex flex-col px-2 py-1 gap-[10px]">
                  <Button
                    variant="default"
                    className="w-full"
                    onClick={() => {
                      applyClickedRef.current = true; // Set ref to true
                      applyFiltersToTable(); // Terapkan filter ke tabel
                    }}
                  >
                    Apply Filters
                  </Button>
                  <Button
                    variant="ghost"
                    className="w-full"
                    onClick={() => {
                      applyClickedRef.current = true; // Set ref to true
                      clearAllFilters(); // Hapus semua filter
                    }}
                  >
                    Clear Filters
                  </Button>
                </div>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          <Button
            className="w-[80px] cursor-pointer" id="add-overtime"
            variant="default"
            onClick={() => router.push("/overtime/management/add")}
          >
            <svg
              width="15"
              height="15"
              viewBox="0 0 15 15"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M7.5 3.125V11.875"
                stroke="white"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M3.125 7.5H11.875"
                stroke="white"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            Add
          </Button>
        </div>
      </div>
      <div className="rounded-md border overflow-y-none">
        <Table>
          <TableHeader className="bg-neutral-50">
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead
                      key={header.id}
                      className="text-center text-neutral-300"
                    >
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
                    <TableCell key={cell.id} className="text-center">
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
