'use client';
import { Metadata } from "next";
import Sidebar from "../../components/sidebar";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogClose,
  } from "@/components/ui/dialog"
  import { Label } from "@/components/ui/label";
import React, { useState } from "react";
import Link from "next/link";

const dummyEmployees = Array.from({ length: 1000 }, (_, i) => ({
  no: i + 1,
  name: `Employee ${i + 1}`,
  gender: i % 2 === 0 ? "Male" : "Female",
  phone: `6287822742996`,
  branch: ["Jakarta", "Bandung", "Surabaya", "Medan", "Bali"][i % 5],
  position: ["CEO", "Manager", "Staff", "Supervisor", "Assistant"][i % 5],
  type: ["Permanent", "Contract", "Intern", "Probationary"][i % 4],
  status: i % 3 === 0 ? "Inactive" : "Active",
}));


export default function Employee() {
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);

  const handleRowsChange = (value: string) => {
    setRowsPerPage(Number(value));
    setCurrentPage(1); // reset ke halaman 1
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const [searchTerm, setSearchTerm] = useState("");

  const filteredData = dummyEmployees.filter((employee) =>
    employee.name.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  // Gunakan filteredData untuk pagination
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



  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const handleFile = (files: FileList | null) => {
    if (!files || files.length === 0) return;

    const file = files[0];
    if (file.type !== "text/csv" && !file.name.endsWith(".csv")) {
      alert("Only CSV files are allowed.");
      return;
    }

    setSelectedFile(file);
  };
  return (
    <Sidebar title="Employee Database">
      <div className="w-full">
        <div className="flex flex-wrap justify-center gap-[30px] min-h-[141px] w-full mx-auto">
          <Card className="flex-1 min-w-[250px] max-w-[500px] rounded-[15px] border border-black/15 bg-white shadow-[0px_2px_2px_0px_rgba(0,0,0,0.25)] overflow-hidden">

            <div className="flex-col mt-[-5px] mx-[10px]">
              <div className="flex w-full h-[44px] items-center gap-[10px] mx-[20px]">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M19 4H5C3.89543 4 3 4.89543 3 6V20C3 21.1046 3.89543 22 5 22H19C20.1046 22 21 21.1046 21 20V6C21 4.89543 20.1046 4 19 4Z" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M16 2V6" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M8 2V6" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M3 10H21" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                <p className="justify-center w-full text-base font-medium whitespace-nowrap">Periode</p>
              </div>
              <p className="justify-center w-full text-4xl font-bold mx-[20px] my-[10px]">May 2025</p>
            </div>
          </Card>
          <Card className="flex-1 min-w-[250px] max-w-[500px] rounded-[15px] border border-black/15 bg-white shadow-[0px_2px_2px_0px_rgba(0,0,0,0.25)] overflow-hidden">
          <div className="flex-col mt-[-5px] mx-[10px]">
              <div className="flex w-full h-[44px] items-center gap-[10px] mx-[20px]">
                <svg width="30" height="30" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M3.75 26.25V23.75C3.75 22.4239 4.27678 21.1521 5.21447 20.2145C6.15215 19.2768 7.42392 18.75 8.75 18.75H13.75C15.0761 18.75 16.3479 19.2768 17.2855 20.2145C18.2232 21.1521 18.75 22.4239 18.75 23.75V26.25M20 3.91251C21.0755 4.18788 22.0288 4.81338 22.7095 5.69039C23.3903 6.56741 23.7598 7.64604 23.7598 8.75626C23.7598 9.86647 23.3903 10.9451 22.7095 11.8221C22.0288 12.6991 21.0755 13.3246 20 13.6M26.25 26.25V23.75C26.2437 22.6464 25.8724 21.576 25.1941 20.7055C24.5158 19.835 23.5685 19.2134 22.5 18.9375M6.25 8.75C6.25 10.0761 6.77678 11.3479 7.71447 12.2855C8.65215 13.2232 9.92392 13.75 11.25 13.75C12.5761 13.75 13.8479 13.2232 14.7855 12.2855C15.7232 11.3479 16.25 10.0761 16.25 8.75C16.25 7.42392 15.7232 6.15215 14.7855 5.21447C13.8479 4.27678 12.5761 3.75 11.25 3.75C9.92392 3.75 8.65215 4.27678 7.71447 5.21447C6.77678 6.15215 6.25 7.42392 6.25 8.75Z" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                <p className="justify-center w-full text-base font-medium whitespace-nowrap">Total Employee</p>
              </div>
              <p className="justify-center w-full text-4xl font-bold mx-[20px] my-[10px]">{dummyEmployees.length}</p>
            </div>
          </Card>
          <Card className="flex-1 min-w-[250px] max-w-[500px] rounded-[15px] border border-black/15 bg-white shadow-[0px_2px_2px_0px_rgba(0,0,0,0.25)] overflow-hidden">
          <div className="flex-col mt-[-5px] mx-[10px]">
              <div className="flex w-full h-[44px] items-center gap-[10px] mx-[20px]">
                <svg width="31" height="30" viewBox="0 0 31 30" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <g id="tabler-icon-user-plus">
                  <path id="Vector" d="M20.25 23.75H27.75M24 20V27.5M7.75 26.25V23.75C7.75 22.4239 8.27678 21.1521 9.21447 20.2145C10.1521 19.2768 11.4239 18.75 12.75 18.75H17.75M10.25 8.75C10.25 10.0761 10.7768 11.3479 11.7145 12.2855C12.6521 13.2232 13.9239 13.75 15.25 13.75C16.5761 13.75 17.8479 13.2232 18.7855 12.2855C19.7232 11.3479 20.25 10.0761 20.25 8.75C20.25 7.42392 19.7232 6.15215 18.7855 5.21447C17.8479 4.27678 16.5761 3.75 15.25 3.75C13.9239 3.75 12.6521 4.27678 11.7145 5.21447C10.7768 6.15215 10.25 7.42392 10.25 8.75Z" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </g>
                </svg>
                <p className="justify-center w-full text-base font-medium whitespace-nowrap">Total New Hire</p>
              </div>
              <p className="justify-center w-full text-4xl font-bold mx-[20px] my-[10px]">200</p>
            </div>
          </Card>
          <Card className="flex-1 min-w-[250px] max-w-[500px] rounded-[15px] border border-black/15 bg-white shadow-[0px_2px_2px_0px_rgba(0,0,0,0.25)] overflow-hidden">
          <div className="flex-col mt-[-5px] mx-[10px]">
              <div className="flex w-full h-[44px] items-center gap-[10px] mx-[20px]">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M20 7H4C2.89543 7 2 7.89543 2 9V19C2 20.1046 2.89543 21 4 21H20C21.1046 21 22 20.1046 22 19V9C22 7.89543 21.1046 7 20 7Z" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M16 21V5C16 4.46957 15.7893 3.96086 15.4142 3.58579C15.0391 3.21071 14.5304 3 14 3H10C9.46957 3 8.96086 3.21071 8.58579 3.58579C8.21071 3.96086 8 4.46957 8 5V21" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>

                <p className="justify-center w-full text-base font-medium whitespace-nowrap">Full Time Employee</p>
              </div>
              <p className="justify-center w-full text-4xl font-bold mx-[20px] my-[10px]">30</p>
            </div>
          </Card>
        </div>
        <div className="mt-[30px] w-full overflow-x-auto">
          <Card className="flex-1 rounded-[15px] border border-black/15 bg-white shadow-[0px_2px_2px_0px_rgba(0,0,0,0.25)] overflow-hidden">
            <CardContent className="overflow-x-auto">
              {/* Header: Title - Search - Button */}
              <div className="flex items-center justify-between mb-6 gap-4 min-w-[1000px]">
                {/* Judul dan Search bar di satu sisi */}
                <div className="flex items-center gap-4 flex-1">
                  <h2 className="text-lg font-medium">All Employee Information</h2>
                  {/* Search input melar */}
                  <div className="flex-1 relative">
                    <svg className="absolute left-3 top-1/2 transform -translate-y-1/2" width="20" height="21" viewBox="0 0 20 21" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M17.5 18L13.875 14.375M15.8333 9.66667C15.8333 13.3486 12.8486 16.3333 9.16667 16.3333C5.48477 16.3333 2.5 13.3486 2.5 9.66667C2.5 5.98477 5.48477 3 9.16667 3C12.8486 3 15.8333 5.98477 15.8333 9.66667Z" stroke="#667085" strokeWidth="1.66667" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>

                    <Input
                      type="text"
                      placeholder="Search employee"
                      value={searchTerm}
                      onChange={(e) => {
                        setSearchTerm(e.target.value);
                        setCurrentPage(1);
                      }}
                      className="pl-10 rounded-[8px] bg-[#ff] flex-1 min-w-[300px]"
                    />
                  </div>
                </div>

                {/* Tombol-tombol */}
                <div className="flex gap-2 min-w-[400px] w-max">
                  <Button className="w-[100px]" variant="outline">
                    <svg width="20" height="21" viewBox="0 0 20 21" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M2.5 6.3335H17.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                    <path d="M5 10.5H15" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                    <path d="M8.33301 14.6665H11.6663" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                    </svg>

                    Filters
                  </Button>
        
                  <Dialog>
                      <DialogTrigger asChild>
                        <Button className="w-[100px]" variant="outline" size="lg">
                          <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <g clipPath="url(#clip0_462_2148)">
                          <path d="M6.17401 11.3263C6.34814 11.5005 6.55489 11.6387 6.78245 11.733C7.01002 11.8273 7.25393 11.8759 7.50026 11.8759C7.74659 11.8759 7.99051 11.8273 8.21807 11.733C8.44564 11.6387 8.65239 11.5005 8.82651 11.3263L10.8334 9.31938C10.941 9.20037 10.9987 9.04455 10.9946 8.88416C10.9905 8.72378 10.9248 8.57112 10.8113 8.45779C10.6977 8.34447 10.5449 8.27916 10.3845 8.27538C10.2241 8.2716 10.0684 8.32965 9.94964 8.4375L8.12089 10.2669L8.12526 0.625C8.12526 0.45924 8.05941 0.300269 7.9422 0.183058C7.82499 0.065848 7.66602 0 7.50026 0V0C7.3345 0 7.17553 0.065848 7.05832 0.183058C6.94111 0.300269 6.87526 0.45924 6.87526 0.625L6.86964 10.255L5.05089 8.4375C4.93361 8.32031 4.77459 8.2545 4.60879 8.25456C4.443 8.25462 4.28402 8.32054 4.16683 8.43781C4.04963 8.55509 3.98383 8.71412 3.98389 8.87991C3.98395 9.0457 4.04986 9.20468 4.16714 9.32188L6.17401 11.3263Z" fill="currentColor"/>
                          <path d="M14.375 9.99991C14.2092 9.99991 14.0503 10.0658 13.9331 10.183C13.8158 10.3002 13.75 10.4591 13.75 10.6249V13.1249C13.75 13.2907 13.6842 13.4496 13.5669 13.5668C13.4497 13.6841 13.2908 13.7499 13.125 13.7499H1.875C1.70924 13.7499 1.55027 13.6841 1.43306 13.5668C1.31585 13.4496 1.25 13.2907 1.25 13.1249V10.6249C1.25 10.4591 1.18415 10.3002 1.06694 10.183C0.949732 10.0658 0.79076 9.99991 0.625 9.99991C0.45924 9.99991 0.300269 10.0658 0.183058 10.183C0.065848 10.3002 0 10.4591 0 10.6249L0 13.1249C0 13.6222 0.197544 14.0991 0.549175 14.4507C0.900805 14.8024 1.37772 14.9999 1.875 14.9999H13.125C13.6223 14.9999 14.0992 14.8024 14.4508 14.4507C14.8025 14.0991 15 13.6222 15 13.1249V10.6249C15 10.4591 14.9342 10.3002 14.8169 10.183C14.6997 10.0658 14.5408 9.99991 14.375 9.99991Z" fill="currentColor"/>
                          </g>
                          <defs>
                          <clipPath id="clip0_462_2148">
                          <rect width="15" height="15" fill="white"/>
                          </clipPath>
                          </defs>
                          </svg>

                          Export
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="bg-white !max-w-[726px]">
                          <DialogHeader>
                              <DialogTitle>Export Employee</DialogTitle>
                              <DialogDescription>
                                  
                                  
                              </DialogDescription>
                          </DialogHeader>
                          <div>
                              <form action="https://httpbin.org/post" method="POST" target="_blank" encType="multipart/form-data">
                                  <div className="flex flex-col gap-[15px] mt-[15px]">
                                      <div className="flex gap-[15px]">
                                        <div className="flex flex-col flex-1 gap-[8px]">
                                          <Label htmlFor="department">Department</Label>
                                          <Select defaultValue="semua">
                                              <SelectTrigger className="w-full !h-[46px] !border !border-neutral-300 !text-neutral-300">
                                                  <SelectValue placeholder="Select department" />
                                              </SelectTrigger>
                                              <SelectContent>
                                                  <SelectItem value="semua">Semua</SelectItem>
                                                  <SelectItem value="department_a">Department A</SelectItem>
                                                  <SelectItem value="department_b">Department B</SelectItem>
                                                  <SelectItem value="department_c">Department C</SelectItem>
                                                  <SelectItem value="department_d">Department D</SelectItem>
                                              </SelectContent>
                                          </Select>
                                        </div>
                                        <div className="flex flex-col flex-1 gap-[8px]">
                                          <Label htmlFor="position">Position</Label>
                                          <Select defaultValue="semua">
                                              <SelectTrigger className="w-full !h-[46px] !border !border-neutral-300 !text-neutral-300">
                                                  <SelectValue placeholder="Select position" />
                                              </SelectTrigger>
                                              <SelectContent>
                                                <SelectItem value="semua">Semua</SelectItem>
                                                  <SelectItem value="position_a">Position A</SelectItem>
                                                  <SelectItem value="position_b">Position B</SelectItem>
                                                  <SelectItem value="position_c">Position C</SelectItem>
                                                  <SelectItem value="position_d">Position D</SelectItem>
                                              </SelectContent>
                                          </Select>
                                        </div>
                                      </div>
                                      <div className="flex gap-[15px]">
                                         <div className="flex flex-col flex-1 gap-[8px]">
                                          <Label htmlFor="type">Type</Label>
                                          <Select defaultValue="semua">
                                              <SelectTrigger className="w-full !h-[46px] !border !border-neutral-300 !text-neutral-300">
                                                  <SelectValue placeholder="Select Type" />
                                              </SelectTrigger>
                                              <SelectContent>
                                                <SelectItem value="semua">Semua</SelectItem>
                                                  <SelectItem value="type_a">Type A</SelectItem>
                                                  <SelectItem value="type_b">Type B</SelectItem>
                                                  <SelectItem value="type_c">Type C</SelectItem>
                                                  <SelectItem value="type_d">Type D</SelectItem>
                                              </SelectContent>
                                          </Select>
                                        </div>
                                        <div className="flex flex-col flex-1 gap-[8px]">
                                          <Label htmlFor="status">Status</Label>
                                          <Select defaultValue="semua">
                                              <SelectTrigger className="w-full !h-[46px] !border !border-neutral-300 !text-neutral-300">
                                                  <SelectValue placeholder="Select Status" />
                                              </SelectTrigger>
                                              <SelectContent>
                                                  <SelectItem value="semua">Semua</SelectItem>
                                                  <SelectItem value="status_a">Status A</SelectItem>
                                                  <SelectItem value="status_b">Status B</SelectItem>
                                                  <SelectItem value="status_c">Status C</SelectItem>
                                                  <SelectItem value="status_d">Status D</SelectItem>
                                              </SelectContent>
                                          </Select>
                                        </div>
                                       
                                      </div>
                                        
                                      <div className="flex gap-[10px] justify-end">
                                          <div>
                                              <DialogClose asChild>
                                                  <Button className="w-[80px]" variant="outline" size="lg" type="button">
                                                      Cancel
                                                  </Button>
                                              </DialogClose>
                                          </div>
                                          
                                          <Button className="w-[100px]" variant="default" type="submit">
                                            <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <g clipPath="url(#clip0_462_2148)">
                                            <path d="M6.17401 11.3263C6.34814 11.5005 6.55489 11.6387 6.78245 11.733C7.01002 11.8273 7.25393 11.8759 7.50026 11.8759C7.74659 11.8759 7.99051 11.8273 8.21807 11.733C8.44564 11.6387 8.65239 11.5005 8.82651 11.3263L10.8334 9.31938C10.941 9.20037 10.9987 9.04455 10.9946 8.88416C10.9905 8.72378 10.9248 8.57112 10.8113 8.45779C10.6977 8.34447 10.5449 8.27916 10.3845 8.27538C10.2241 8.2716 10.0684 8.32965 9.94964 8.4375L8.12089 10.2669L8.12526 0.625C8.12526 0.45924 8.05941 0.300269 7.9422 0.183058C7.82499 0.065848 7.66602 0 7.50026 0V0C7.3345 0 7.17553 0.065848 7.05832 0.183058C6.94111 0.300269 6.87526 0.45924 6.87526 0.625L6.86964 10.255L5.05089 8.4375C4.93361 8.32031 4.77459 8.2545 4.60879 8.25456C4.443 8.25462 4.28402 8.32054 4.16683 8.43781C4.04963 8.55509 3.98383 8.71412 3.98389 8.87991C3.98395 9.0457 4.04986 9.20468 4.16714 9.32188L6.17401 11.3263Z" fill="currentColor"/>
                                            <path d="M14.375 9.99991C14.2092 9.99991 14.0503 10.0658 13.9331 10.183C13.8158 10.3002 13.75 10.4591 13.75 10.6249V13.1249C13.75 13.2907 13.6842 13.4496 13.5669 13.5668C13.4497 13.6841 13.2908 13.7499 13.125 13.7499H1.875C1.70924 13.7499 1.55027 13.6841 1.43306 13.5668C1.31585 13.4496 1.25 13.2907 1.25 13.1249V10.6249C1.25 10.4591 1.18415 10.3002 1.06694 10.183C0.949732 10.0658 0.79076 9.99991 0.625 9.99991C0.45924 9.99991 0.300269 10.0658 0.183058 10.183C0.065848 10.3002 0 10.4591 0 10.6249L0 13.1249C0 13.6222 0.197544 14.0991 0.549175 14.4507C0.900805 14.8024 1.37772 14.9999 1.875 14.9999H13.125C13.6223 14.9999 14.0992 14.8024 14.4508 14.4507C14.8025 14.0991 15 13.6222 15 13.1249V10.6249C15 10.4591 14.9342 10.3002 14.8169 10.183C14.6997 10.0658 14.5408 9.99991 14.375 9.99991Z" fill="currentColor"/>
                                            </g>
                                            <defs>
                                            <clipPath id="clip0_462_2148">
                                            <rect width="15" height="15" fill="white"/>
                                            </clipPath>
                                            </defs>
                                            </svg>
                                              Export
                                          </Button>
                                      </div>
                                  </div>
                              </form>
                          </div>
                      </DialogContent>
                  </Dialog>
                  <Dialog>
                        <DialogTrigger asChild>
                          <Button className="w-[100px]" variant="outline" size="lg">
                            <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <g clipPath="url(#clip0_462_2152)">
                            <path d="M13.75 9.99963V13.1246C13.75 13.2904 13.6842 13.4494 13.5669 13.5666C13.4497 13.6838 13.2908 13.7496 13.125 13.7496H1.875C1.70924 13.7496 1.55027 13.6838 1.43306 13.5666C1.31585 13.4494 1.25 13.2904 1.25 13.1246V9.99963H0V13.1246C0 13.6219 0.197544 14.0988 0.549175 14.4505C0.900805 14.8021 1.37772 14.9996 1.875 14.9996H13.125C13.6223 14.9996 14.0992 14.8021 14.4508 14.4505C14.8025 14.0988 15 13.6219 15 13.1246V9.99963H13.75Z" fill="currentColor"/>
                            <path d="M7.47924 -0.00014548C7.23311 -0.000823982 6.98926 0.0470776 6.76168 0.140814C6.53409 0.23455 6.32725 0.372278 6.15299 0.546105L3.70361 2.99548L4.58736 3.87923L6.85861 1.6086L6.87486 11.8749H8.12486L8.10861 1.61735L10.3705 3.87923L11.2542 2.99548L8.80486 0.546105C8.63072 0.372297 8.42398 0.234576 8.1965 0.140838C7.96902 0.0471004 7.72527 -0.000809992 7.47924 -0.00014548Z" fill="currentColor"/>
                            </g>
                            <defs>
                            <clipPath id="clip0_462_2152">
                            <rect width="15" height="15" fill="white"/>
                            </clipPath>
                            </defs>
                            </svg>

                            Import
                          </Button>
                        </DialogTrigger>
                        <DialogContent className="bg-white !max-w-[726px]">
                            <DialogHeader>
                                <DialogTitle>Import Employee</DialogTitle>
                                <DialogDescription>
                                    
                                    
                                </DialogDescription>
                            </DialogHeader>
                            <div>
                                <form action="https://httpbin.org/post" method="POST" target="_blank" encType="multipart/form-data">
                                    <div className="flex flex-col gap-[15px] mt-[15px]">
                                         {/* Input file CSV */}
                                        
                                          <Label
                                            htmlFor="csvFile"
                                            className="w-full h-40 border-2 border-dashed border-gray-400 rounded-lg flex items-center justify-center text-gray-500 cursor-pointer hover:border-gray-600"
                                            onDragOver={(e) => e.preventDefault()}
                                            onDrop={(e) => {
                                              e.preventDefault();
                                              const files = e.dataTransfer.files;
                                              if (files.length > 1) {
                                                alert("Only one file can be uploaded.");
                                                return;
                                              }
                                              handleFile(files);
                                            }}
                                          >
                                            <div className="text-center">
                                              <p className="text-sm">Drag & drop your CSV file here</p>
                                              <p className="text-sm">or click to browse</p>
                                              <input
                                                type="file"
                                                name="file"
                                                id="csvFile"
                                                accept=".csv"
                                                className="hidden"
                                                onChange={(e) => {
                                                  const files = e.target.files;
                                                  if (files && files.length > 1) {
                                                    alert("Only one file can be uploaded.");
                                                    e.target.value = "";
                                                    return;
                                                  }
                                                  handleFile(files);
                                                }}
                                                required
                                              />
                                            </div>
                                          </Label>

                                          {/* File Preview */}
                                          {selectedFile && (
                                            <div className="mt-4 text-sm text-gray-700">
                                              <strong>Selected File:</strong> {selectedFile.name}
                                            </div>
                                          )}
                                    
                                        
                                        <div className="flex gap-[10px] justify-end">
                                            <div>
                                                <DialogClose asChild>
                                                    <Button className="w-[80px]" variant="outline" size="lg" type="button">
                                                        Cancel
                                                    </Button>
                                                </DialogClose>
                                            </div>
                                            
                                            <Button className="w-[80px]" variant="default" type="submit">
                                               
                                                Next
                                            </Button>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </DialogContent>
                    </Dialog>
                  
                  <Link href="/employee/add">
                    <Button className="w-[80px]" variant="default" >
                      <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M7.5 3.125V11.875" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      <path d="M3.125 7.5H11.875" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>

                      Add
                    </Button>
                  </Link>
                  
                </div>
              </div>
              <div className="min-w-[1000px]">
                <Table className="border-separate border-spacing-0 rounded-t-lg table-fixed">
                  <TableHeader className="bg-neutral-50 [&_th]:font-medium [&_th]:text-center [&_th]:p-4 [&_th]:border-b [&_th]:border-r">
                    <TableRow>
                      <TableHead className="rounded-tl-lg w-[5%] min-w-[60px]">No</TableHead>
                      <TableHead className="w-[20%] min-w-[200px] !text-left">Employee Name</TableHead>
                      <TableHead className="w-[10%] min-w-[100px]">Gender</TableHead>
                      <TableHead className="w-[15%] min-w-[150px]">Mobile Number</TableHead>
                      <TableHead className="w-[15%] min-w-[150px]">Branch</TableHead>
                      <TableHead className="w-[15%] min-w-[150px]">Position</TableHead>
                      <TableHead className="w-[10%] min-w-[120px]">Type</TableHead>
                      <TableHead className="w-[10%] min-w-[120px]">Status</TableHead>
                      <TableHead className="rounded-tr-lg w-[10%] min-w-[120px]">Details</TableHead>
                    </TableRow>
                  </TableHeader>

                  <TableBody className="[&_td]:text-center">
                    {currentData.map((employee, index) => (
                      <TableRow key={index}>
                        <TableCell>{employee.no}</TableCell>
                        <TableCell className="!text-left">{employee.name}</TableCell>
                        <TableCell>{employee.gender}</TableCell>
                        <TableCell>{employee.phone}</TableCell>
                        <TableCell>{employee.branch}</TableCell>
                        <TableCell>{employee.position}</TableCell>
                        <TableCell>{employee.type}</TableCell>
                        <TableCell>{employee.status}</TableCell>
                        <TableCell>
                          <Link href="/employee/details">
                            <Button variant="outline" size="sm">
                              View
                            </Button>
                          </Link>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>

              <div className="w-full flex flex-wrap justify-between mt-[10px]">
                {/* Select Rows */}
                <div className="flex items-center gap-[10px]">
                  <p className="text-base font-medium">Showing</p>
                  <Select onValueChange={handleRowsChange} defaultValue={rowsPerPage.toString()}>
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
                        <PaginationPrevious href="#" onClick={() => handlePageChange(Math.max(currentPage - 1, 1))} className="mx-[4px] w-[24px] h-[26px] !py-[6px] !px-[6px] border text-primary-900 bg-[#F5F5F5] shadow-xs hover:bg-primary-950 hover:text-white dark:bg-input/30 dark:border-input dark:hover:bg-input/50"/>
                      </PaginationItem>
                      {startPage > 1 && (
                        <>
                          <PaginationItem>
                            <PaginationLink href="#" onClick={() => handlePageChange(1)}>1</PaginationLink>
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
                                ${page === currentPage ? 'bg-primary-950 text-white' : 'hover:bg-primary-950 hover:text-white'}
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
                            <PaginationLink href="#" onClick={() => handlePageChange(totalPages)}>
                              {totalPages}
                            </PaginationLink>
                          </PaginationItem>
                        </>
                      )}
  
                      <PaginationItem>
                        <PaginationNext href="#" onClick={() => handlePageChange(Math.min(currentPage + 1, totalPages))} className="mx-[4px] w-[24px] h-[26px] !py-[6px] !px-[6px] border text-primary-900 bg-[#F5F5F5] shadow-xs hover:bg-primary-950 hover:text-white dark:bg-input/30 dark:border-input dark:hover:bg-input/50"/>
                      </PaginationItem>
                    </PaginationContent>
                  </Pagination>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
      
    </Sidebar>
  );
}
