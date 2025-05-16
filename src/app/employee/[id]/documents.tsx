'user client'

import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
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
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"; 

import React, { useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";


  
const dummyDocuments = Array.from({ length: 1000 }, (_, i) => ({
    no: i + 1,
    id: `doc-${i + 1}`,
    name: `Document ${i + 1}`,
    type: i % 2 === 0 ? "Information" : "Identity",
    number: i,
    issue_date: "4 May 2025",
    expiry_date: "4 May 2040",
    status: i % 3 === 0 ? "Inactive" : "Active",
  }));
  

const EmployeeDocuments = () => {
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

    const filteredData = dummyDocuments.filter((employee) =>
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

    const params = useParams();

    return (
        
        <Card className="flex-1 rounded-[15px] border border-black/15 bg-white shadow-[0px_2px_2px_0px_rgba(0,0,0,0.25)] overflow-hidden">
            <CardContent>
            {/* Header: Title - Search - Button */}
            <div className="flex items-center justify-between mb-6 gap-4">
                {/* Judul dan Search bar di satu sisi */}
                <div className="flex items-center gap-4 flex-1">
                    <h2 className="text-lg font-medium whitespace-nowrap">Documents</h2>
                    {/* Search input melar */}
                    <div className="flex-1 relative">
                        <svg className="absolute left-3 top-1/2 transform -translate-y-1/2" width="20" height="21" viewBox="0 0 20 21" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M17.5 18L13.875 14.375M15.8333 9.66667C15.8333 13.3486 12.8486 16.3333 9.16667 16.3333C5.48477 16.3333 2.5 13.3486 2.5 9.66667C2.5 5.98477 5.48477 3 9.16667 3C12.8486 3 15.8333 5.98477 15.8333 9.66667Z" stroke="#667085" strokeWidth="1.66667" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>

                        <Input
                        type="text"
                        placeholder="Search documents"
                        value={searchTerm}
                        onChange={(e) => {
                            setSearchTerm(e.target.value);
                            setCurrentPage(1);
                        }}
                        className="pl-10 rounded-[8px] bg-[#ff] flex-1"
                        />
                    </div>
                </div>
                <Link href="/documents/add">
                    <Button className="w-full" variant="default" >
                    <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M7.5 3.125V11.875" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M3.125 7.5H11.875" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>

                    Add Documents
                    </Button>
                </Link>
                
                
            </div>
            <div>
                {/* Table */}
                <Table className="border-separate border-spacing-0 rounded-t-lg table-fixed w-full">
                {/* <TableCaption>A list of your recent invoices.</TableCaption> */}
                <TableHeader className="bg-neutral-50 [&_th]:font-medium [&_th]:text-center [&_th]:p-4 [&_th]:border-b [&_th]:border-r">
                    <TableRow>
                    <TableHead className="rounded-tl-lg w-[60px]">No</TableHead>
                    <TableHead className="w-[250px] !text-left">Document Name</TableHead>
                    <TableHead className="w-[120px]">Document Type</TableHead>
                    <TableHead className="w-[150px]">Document Number</TableHead>
                    <TableHead className="w-[150px]">Issue Date</TableHead>
                    <TableHead className="w-[150px]">Expiry Date</TableHead>
                    <TableHead className="w-[100px]">Status</TableHead>
                    <TableHead className="rounded-tr-lg w-[100px]">Details</TableHead>
                    </TableRow>
                </TableHeader>

                <TableBody className="[&_td]:text-center">
                    {currentData.map((document, index) => (
                    <TableRow key={index}>
                        <TableCell>{document.no}</TableCell>
                        <TableCell className="!text-left">{document.name}</TableCell>
                        <TableCell>{document.type}</TableCell>
                        <TableCell>{document.number}</TableCell>
                        <TableCell>{document.issue_date}</TableCell>
                        <TableCell>{document.expiry_date}</TableCell>
                        <TableCell>{document.status}</TableCell>
                        <TableCell>
                        <Link href={params.id+"/document/"+document.id}>
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
            <div className="w-full flex justify-between mt-[10px]">
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

    );
}

export default EmployeeDocuments;