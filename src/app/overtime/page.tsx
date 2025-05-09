"use client";

import Sidebar from "@/components/sidebar";
import { Card } from "@/components/ui/card";
import { DataTable } from "@/app/overtime/data-table";
import { OvertimeColumn } from "./column";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Pagination, PaginationContent, PaginationEllipsis, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from "@/components/ui/pagination";
import { useState } from "react";
// import { DateRange } from "react-day-picker";

function generateDummyOvertimeData(count: number) {
  const names = ["Mumtaz", "Kemal", "Lucky", "Silfi"];
  const position = ["Manager", "Staff", "Supervisor", "Admin"];
  const overtimeTypes = [
    { name: "Weekday Overtime", rate: 400000 },
    { name: "Weekend Overtime", rate: 150000 },
    { name: "Holiday Overtime", rate: 230000 },
  ];
  const approvalStatus = ["Pending", "Approved", "Rejected"];

  const data = [];

  for (let i = 1; i <= count; i++) {
    const randomNameIndex = Math.floor(Math.random() * names.length);
    const randomPositionIndex = Math.floor(Math.random() * position.length);
    const randomOT =
      overtimeTypes[Math.floor(Math.random() * overtimeTypes.length)];
    const randomHour = (Math.floor(Math.random() * 3) + 1) * 2;
    const date = new Date(2025, 4, (i % 31) + 1).toLocaleDateString("en-GB");
    const randomStatus =
      approvalStatus[Math.floor(Math.random() * approvalStatus.length)];

    data.push({
      id: `OVT${i.toString().padStart(4, "0")}`,
      name: names[randomNameIndex],
      position: position[randomPositionIndex],
      overtimeName: randomOT.name,
      date: date,
      hour: randomHour,
      ovt_payroll: randomHour * randomOT.rate,
      approvalStatus: randomStatus
    });
  }

  return data;
}


export default function OvertimeManagement(){
  const overtimeDisplay = generateDummyOvertimeData(50);

  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10); // Default to 10 rows per page
  const totalPages = Math.ceil(overtimeDisplay.length / rowsPerPage);

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
  const data = overtimeDisplay.slice(startIndex, endIndex);

  // Perhitungan start dan end page untuk pagination
  const maxVisiblePages = 5; 
  const startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2));
  const endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);
  
  return (
    <Sidebar title="Overtime Management">
      <Card className="p-[20px] flex flex-col">
        <div className="flex flex-col gap-[10px]">
          <div>
            {/* Table */}
            <DataTable columns={OvertimeColumn} data={data} />
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
    </Sidebar>
  );  
}
