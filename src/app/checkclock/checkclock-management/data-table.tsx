"use client";

import * as React from "react";
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
} from "@tanstack/react-table";

import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { useState } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuCheckboxItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import path from "path";

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
}

export function DataTable<TData, TValue>({
  columns,
  data,
}: DataTableProps<TData, TValue>) {
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  );
  const [filters, setFilters] = useState({
    position: [] as string[],
    workType: [] as string[],
    status: [] as string[],
    approvalStatus: [] as string[],
  });
  const [date, setDate] = React.useState<Date>();
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    onColumnFiltersChange: setColumnFilters,
    getFilteredRowModel: getFilteredRowModel(),
    state: {
      sorting,
      columnFilters,
    },
  });

  const handleFilterChange = (key: keyof typeof filters, value: string) => {
    setFilters((prev) => {
      const isSelected = prev[key].includes(value);
      const updatedValues = isSelected
        ? prev[key].filter((item) => item !== value) // Remove if already selected
        : [...prev[key], value]; // Add if not selected

      // Update column filters
      table.setColumnFilters([
        ...columnFilters.filter((filter) => filter.id !== key), // Remove existing filter for the column
        ...(updatedValues.length > 0
          ? [{ id: key, value: updatedValues }] // Pass array of values
          : []), // Clear filter if no values
      ]);

      return {
        ...prev,
        [key]: updatedValues,
      };
    });
  };

  return (
    <div className="">
      <div className="flex items-center py-4 gap-6">
        <span className="w-[187px] text-lg flex-none">Checkclock Overview</span>
        <Input
          placeholder="Search Employee"
          icon={
            <svg
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
                strokeLinejoin="round"
              />
            </svg>
          }
          value={
            (table.getColumn("employeeName")?.getFilterValue() as string) ?? ""
          }
          onChange={(event) =>
            table.getColumn("employeeName")?.setFilterValue(event.target.value)
          }
          className="w-full"
        />
        <div className="w-fit">
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant={"calendar"}
                className={cn(
                  "w-[280px] justify-start text-left font-normal",
                  !date && "text-neutral-300"
                )}
              >
                <CalendarIcon />
                {date ? format(date, "PPP") : <span>Today</span>}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="">
              <Calendar
                mode="single"
                selected={date}
                onSelect={setDate}
                initialFocus
              />
            </PopoverContent>
          </Popover>
        </div>
        <div className="w-fit">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
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
            <DropdownMenuContent className="w-64">
              <DropdownMenuLabel>Position</DropdownMenuLabel>
              {["CEO", "Manager", "HRD", "Supervisor", "OB"].map((position) => (
                <DropdownMenuCheckboxItem
                  key={position}
                  checked={filters.position.includes(position)}
                  onCheckedChange={() =>
                    handleFilterChange("position", position)
                  }
                >
                  {position}
                </DropdownMenuCheckboxItem>
              ))}
              <DropdownMenuSeparator />
              <DropdownMenuLabel>Work Type</DropdownMenuLabel>
              {["WFO", "WFH"].map((workType) => (
                <DropdownMenuCheckboxItem
                  key={workType}
                  checked={filters.workType.includes(workType)}
                  onCheckedChange={() =>
                    handleFilterChange("workType", workType)
                  }
                >
                  {workType}
                </DropdownMenuCheckboxItem>
              ))}
              <DropdownMenuSeparator />
              <DropdownMenuLabel>Status</DropdownMenuLabel>
              {["On Time", "Late", "Anual Leave", "Sick Leave", "Absent"].map(
                (status) => (
                  <DropdownMenuCheckboxItem
                    key={status}
                    checked={filters.status.includes(status)}
                    onCheckedChange={() => handleFilterChange("status", status)}
                  >
                    {status}
                  </DropdownMenuCheckboxItem>
                )
              )}
              <DropdownMenuSeparator />
              <DropdownMenuLabel>Approval Status</DropdownMenuLabel>
              {["Approved", "Pending", "Rejected"].map((approvalStatus) => (
                <DropdownMenuCheckboxItem
                  key={approvalStatus}
                  checked={filters.approvalStatus.includes(approvalStatus)}
                  onCheckedChange={() =>
                    handleFilterChange("approvalStatus", approvalStatus)
                  }
                >
                  {approvalStatus}
                </DropdownMenuCheckboxItem>
              ))}
              <DropdownMenuSeparator />
              {/* Clear Filters Button */}
              <div className="px-2 py-1">
                <Button
                  variant="ghost"
                  className="w-full"
                  onClick={() => {
                    setFilters({
                      position: [],
                      workType: [],
                      status: [],
                      approvalStatus: [],
                    });
                    table.setColumnFilters([]); // Clear all filters in the table
                  }}
                >
                  Clear Filters
                </Button>
              </div>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
        <div className="w-fit">
          <Button
            icon={
              <svg
                width="15"
                height="15"
                viewBox="0 0 15 15"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M7.5 3.125V11.875"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M3.125 7.5H11.875"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            }
          >
            Add
          </Button>
        </div>
      </div>
      <div className="rounded-md border">
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
      <div className="flex items-center justify-end space-x-2 py-4">
        <Button
          variant="outline"
          size="sm"
          onClick={() => table.previousPage()}
          disabled={!table.getCanPreviousPage()}
        >
          Previous
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={() => table.nextPage()}
          disabled={!table.getCanNextPage()}
        >
          Next
        </Button>
      </div>
    </div>
  );
}
