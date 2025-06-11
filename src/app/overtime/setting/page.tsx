"use client";

import React, { useEffect, useMemo } from "react";
import Sidebar from "@/components/sidebar";
import { Card } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { useState } from "react";
// import { useRouter } from "next/navigation";
// import { overtimeSettingSample } from "@/components/dummy/overtimeData";
import { OvertimeSettingsColumn } from "./column";
import { DataTable } from "./data-table";
import { toast } from "sonner";
import Cookies from "js-cookie";
import { Skeleton } from "@/components/ui/skeleton";

export default function OvertimeSettingsManagement() {
  const [overtimeSettingData, setOvertimeSettingData] = useState([]);
  // const overtimeDisplay = useMemo(() => overtimeSettingSample, []);
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const totalPages = Math.ceil(overtimeSettingData.length / rowsPerPage);
  // const router = useRouter();

  // const handleEdit = (id: string) => {
  //   router.push(`/overtime/setting/edit/${id}`);
  // };

  const column = OvertimeSettingsColumn();

  // Fungsi untuk menangani perubahan halaman
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  // Fungsi untuk menangani perubahan jumlah baris per halaman
  const handleRowsChange = (value: string) => {
    setRowsPerPage(Number(value));
    setCurrentPage(1); // Reset to page 1 when rows per page change
  };

  // Hitung data yang akan ditampilkan pada halaman ini
  const startIndex = (currentPage - 1) * rowsPerPage;
  const endIndex = startIndex + rowsPerPage;
  const data = overtimeSettingData.slice(startIndex, endIndex);

  // Perhitungan start dan end page untuk pagination
  const maxVisiblePages = 5;
  const startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2));
  const endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);


  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const fetchOvertime = async () => {
      setLoading(true);
      try {
        const token = Cookies.get('token');

        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/overtime-settings`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const data = await res.json();
        if (!res.ok) {
          throw data;
        }
        setOvertimeSettingData(data);
        console.log(data)
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
          messagesToShow = [message];
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
      } finally {
        setLoading(false);
      }
    }
   fetchOvertime()
  }, [])

  return (
    <Sidebar title="Overtime Settings">
      {loading ? (
          <Skeleton className="min-h-svh"></Skeleton>
        ):(
      <Card className="p-[20px] flex flex-col">
        <div className="flex flex-col gap-[10px]">
          <div>
            {/* Table */}
            <DataTable columns={column} data={data} />
          </div>
          {/* pagination */}
          <div className="w-full flex justify-between">
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

                  {Array.from({ length: endPage - startPage + 1 }).map(
                    (_, i) => {
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
                    }
                  )}

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
        </div>
      </Card>
        )}
    </Sidebar>
  );
}
