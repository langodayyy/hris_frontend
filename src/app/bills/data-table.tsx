"use client";
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
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Card } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { checkclockSetting } from "./column";
import { TimeInput } from "@/components/ui/timeInput";
import { useCKSettingData } from "@/hooks/useCKSettingData";
import { Spinner } from "@/components/ui/spinner";

import { useEdit } from "@/context/EditFormContext";
import EditWfoForm from "@/components/custom/ck-setting-form/EditWfoForm";
import MapboxMap from "@/components/custom/mapbox/MapboxMap";
import EditWfaForm from "@/components/custom/ck-setting-form/EditWfaFrom";
import { Skeleton } from "@/components/ui/skeleton";
import { usePaymentData } from "@/hooks/usePaymentData";
import { useEffect } from "react";
import Joyride, { Step } from "react-joyride";
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
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  selectedYear: string;
  setSelectedYear: (value: string) => void;
}

export function DataTable<TData extends { [key: string]: any }, TValue>({
  columns,
  data,
  selectedYear,
  setSelectedYear,
}: DataTableProps<TData, TValue>) {
  // const [selectedRow, setSelectedRow] = useState<TData | null>(null);
  // const [open, setOpen] = useState(false);

  const { paymentRule, loading, payData } = usePaymentData();
  // const paymentRule = usePaymentData();

  const [filters, setFilters] = useState({
    position: [] as string[],
    workType: [] as string[],
    status: [] as string[],
    approvalStatus: [] as string[],
  });
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);

  // Add missing state for sorting and column filters
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);

  const table = useReactTable({
    data,
    columns, // gunakan langsung columns dari props
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),

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
  });

  const handleRowsChange = (value: string) => {
    setRowsPerPage(Number(value));
    setCurrentPage(1); // reset ke halaman 1
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  // Filter data berdasarkan tahun pada kolom period (format 'YYYY-MM' atau 'MM-YYYY')
  const filteredData = !selectedYear
    ? data // tampilkan semua data jika selectedYear kosong
    : data.filter((item) => {
        if (!item.period) return false;
        const parts = String(item.period).split("-");
        let year = "";
        if (parts.length === 2 && parts[1].length === 4) {
          year = parts[1]; // format MM-YYYY
        } else if (parts[0].length === 4) {
          year = parts[0]; // format YYYY-MM
        }
        return year === selectedYear;
      });

  // Pagination logic pakai filteredData
  const totalPages = Math.ceil(filteredData.length / rowsPerPage);
  const startIndex = (currentPage - 1) * rowsPerPage;
  const endIndex = startIndex + rowsPerPage;
  const currentData = filteredData.slice(startIndex, endIndex);

  const maxVisiblePages = 5;
  let startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2));
  let endPage = startPage + maxVisiblePages - 1;

  if (endPage > totalPages) {
    endPage = totalPages;
    startPage = Math.max(1, endPage - maxVisiblePages + 1);
  }

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

  const currentYear = new Date().getFullYear();
  // Generate list tahun dari tahun terkecil di data.period sampai tahun sekarang
  const periodYears = data
    .map((item) => {
      if (!item.period) return null;
      const parts = String(item.period).split("-");
      if (parts.length === 2 && parts[1].length === 4) {
        return Number(parts[1]); // format MM-YYYY
      } else if (parts[0].length === 4) {
        return Number(parts[0]); // format YYYY-MM
      }
      return null;
    })
    .filter((y) => !!y) as number[];
  const minYear =
    periodYears.length > 0 ? Math.min(...periodYears) : currentYear;
  const years = [];
  for (let y = currentYear; y >= minYear; y--) {
    years.push(y.toString());
  }

  const [error, setError] = useState<string | null>(null);

  const [steps, setSteps] = useState<Step[]>([]);
  const [joyrideKey, setJoyrideKey] = useState(0);

  const billsSteps = {
    bills: [
      {
        target: "#bills",
        content:
          "This is the Payment History table of your company. A new invoice will be generated on the 28th of each month based on the selected plan and the number of employees.",
        disableBeacon: true,
        placement: "bottom" as const,
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
      const checkclockEl = document.querySelector("#bills");
      if (checkclockEl && checkJoyride("bills")) {
        setSteps(billsSteps["bills"]);
        setJoyrideKey((prev) => prev + 1);
      }
    }
  }, [loading]);

  // console.log("loading fetch", loading);
  if (loading) {
    return <Skeleton className="w-full h-[550px]"></Skeleton>;
  }

  return (
    <>
      {/* <Joyride
        key={joyrideKey} // Force re-render when key changes
        steps={steps}
        continuous={true}
        disableScrolling
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
      /> */}
      <Card className="flex items-center p-5 gap-4 w-full" id="bills">
        <div className="flex justify-between w-full">
          <span className="w-[187px] text-lg flex-none flex items-center">
            Payment History
          </span>
          <div className="flex gap-2 w-auto items-center">
            <div className="">
              <Select
                value={selectedYear}
                onValueChange={(value: string) => setSelectedYear(value)}
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select year" />
                </SelectTrigger>
                <SelectContent className="max-h-[230px]">
                  {/* Hapus opsi All/value kosong karena Select.Item tidak boleh value kosong */}
                  {years.map((year) => (
                    <SelectItem key={year} value={year}>
                      {year}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>
        <Table className="h-fit">
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
            {currentData.length > 0 ? (
              currentData.map((row, idx) => {
                const rowModel = table
                  .getRowModel()
                  .rows.find((r) => r.original === row);
                if (!rowModel) return null;
                return (
                  <TableRow key={rowModel.id}>
                    {rowModel.getVisibleCells().map((cell) => (
                      <TableCell key={cell.id} className="text-center">
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext()
                        )}
                      </TableCell>
                    ))}
                  </TableRow>
                );
              })
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
                <SelectItem value="25">25</SelectItem>
                <SelectItem value="50">50</SelectItem>
                <SelectItem value="100">100</SelectItem>
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
                    onClick={() =>
                      handlePageChange(Math.max(currentPage - 1, 1))
                    }
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
      </Card>
    </>
  );
}
