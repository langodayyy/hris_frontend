'use client';
import { Metadata } from "next";
import Sidebar from "@/components/sidebar";
import { columns } from "./column";
import { DataTable } from "./data-table"
import { Card, CardContent } from "@/components/ui/card";
import React, { useRef, useState, useEffect } from "react";
import { Spinner } from "@/components/ui/spinner";
import { Button } from "@/components/ui/button";
import { useLocation } from "react-router-dom";
import { EmployeeData, PreviewImport } from '@/types/peviewImport';
import { Employees } from "./column";
import Link from "next/link";
import { Dialog, DialogClose, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { useRouter } from 'next/navigation';
import Cookies from "js-cookie";

export default function Employee() {
  const [isLoading, setIsLoading] = useState(true);

    const [previewData, setPreviewData] = useState<PreviewImport | null>(null);


    useEffect(() => {
        const data = localStorage.getItem("previewImportData");
        if (data) {
            setIsLoading(false);
            setPreviewData(JSON.parse(data));
            localStorage.removeItem("previewImportData");
        }
    }, []);

    console.log("Data preview:", previewData)
    const mapEmployeeDataToEmployees = (data: EmployeeData[]): Employees[] => {
    return data.map((employeeData) => {
        // Handle potential nulls or different types if necessary
        const id = employeeData.employee_id?.toString() || employeeData.id?.toString() || '';
        const company_id = employeeData.company_id?.toString() || employeeData.company_id?.toString() || '';
        const employee_id = employeeData.employee_id?.toString() || employeeData.employee_id?.toString() || '';
        const name = `${employeeData.first_name || ''} ${employeeData.last_name || ''}`.trim();
        const gender: "Male" | "Female" = employeeData.gender === "Male" || employeeData.gender === "Female"
        ? employeeData.gender
        : "Male"; // Default or handle invalid gender
        const phone = employeeData.phone?.toString() || '';
        const position = employeeData.position_name || ''; // Or look up a display name based on position_id
        const department = employeeData.department_name || ''; // Or look up a display name based on position_id
        const contract_type: "Permanent" | "Contract" | "Internship" = (employeeData.contract_type as any) || "-"; // Cast or map if contract_type values don't directly match
        const workType: "WFO" | "WFH" | "Hybrid" = "WFO"; // You need to determine how to get this, or set a default
        const rawStatus = employeeData.employee_status;
        const status: "Active" | "Retire" | "Fired" | "Resign" =
        ["Active", "Retire", "Fired", "Resign"].includes(rawStatus as any)
            ? (rawStatus as "Active" | "Retire" | "Fired" | "Resign")
            : "Active";


        return {
        id,
        company_id,
        employee_id,
        name,
        gender,
        phone,
        position,
        department,
        contract_type,
        workType,
        status,
        };
    });
    };
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState(false);
    const handleSavetButton = async () => {
    setLoading(true);
    setError(false);
    setSuccess(false);

    try {
        if (!previewData) {
            console.error("previewData is null");
            setLoading(false);
            return;
        }

        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/employees/confirm-import`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${Cookies.get("token")}`,
            },
            body: JSON.stringify({
                employees: previewData.valid_rows,
            }),
        });

        if (!response.ok) {
            const errorData = await response.json();
            console.error("Server Error:", errorData);
            throw new Error("Server returned an error");
        }

        setSuccess(true);

    } catch (err) {
        console.error("Submit error:", err);
        setError(true);
    } finally {
        setLoading(false);
    }
};

// In your component:
const mappedValidRows = previewData?.valid_rows ? mapEmployeeDataToEmployees(previewData.valid_rows) : [];
const mappedInValidRows = previewData?.invalid_rows ? mapEmployeeDataToEmployees(previewData.invalid_rows) : [];
  return (
    <Sidebar title="Import Employee Data">
      <div className="w-full">
        <div className="w-full overflow-x-auto flex flex-col gap-[20px]">
            <Card className="flex-1 rounded-[15px] border border-black/15 bg-white shadow-md overflow-hidden">
                <CardContent className="flex flex-col gap-4">
                <div className="text-lg font-semibold">Summary</div>
                
                <div className="grid grid-cols-3 gap-4">
                    <div className="p-4 bg-gray-100 rounded-xl text-center">
                    <div className="text-sm text-gray-500">Total Rows</div>
                    <div className="text-xl font-bold">{previewData?.total_rows}</div>
                    </div>
                    <div className="p-4 bg-green-100 rounded-xl text-center">
                    <div className="text-sm text-gray-600">Valid Rows</div>
                    <div className="text-xl font-bold text-green-700">{previewData?.valid_rows_count}</div>
                    </div>
                    <div className="p-4 bg-red-100 rounded-xl text-center">
                    <div className="text-sm text-gray-600">Invalid Rows</div>
                    <div className="text-xl font-bold text-red-700">{previewData?.invalid_rows_count}</div>
                    </div>
                </div>

                <div className="flex justify-end gap-2 mt-4">
                    <Link href="/employee">
                        <Button className="w-[80px]" variant="outline" size="lg">
                            Cancel
                        </Button>
                    </Link>
                    {/* <Button className="w-[100px] h-[40px]" variant="default" disabled={previewData?.invalid_rows_count !== undefined && previewData.invalid_rows_count > 0} onClick={handleSavetButton}>
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M19 21H5C4.46957 21 3.96086 20.7893 3.58579 20.4142C3.21071 20.0391 3 19.5304 3 19V5C3 4.46957 3.21071 3.96086 3.58579 3.58579C3.96086 3.21071 4.46957 3 5 3H16L21 8V19C21 19.5304 20.7893 20.0391 20.4142 20.4142C20.0391 20.7893 19.5304 21 19 21Z" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        <path d="M17 21V13H7V21" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        <path d="M7 3V8H15" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                        Save
                    </Button> */}
                    <Button className="w-[100px] h-[40px]" variant="default" disabled={previewData?.invalid_rows_count !== undefined && previewData.invalid_rows_count > 0} onClick={handleSavetButton}>
                    {!loading ? (
                        <>
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M19 21H5C4.46957 21 3.96086 20.7893 3.58579 20.4142C3.21071 20.0391 3 19.5304 3 19V5C3 4.46957 3.21071 3.96086 3.58579 3.58579C3.96086 3.21071 4.46957 3 5 3H16L21 8V19C21 19.5304 20.7893 20.0391 20.4142 20.4142C20.0391 20.7893 19.5304 21 19 21Z" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                            <path d="M17 21V13H7V21" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                            <path d="M7 3V8H15" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                        <span className="ml-1">Save</span>
                        </>
                    ) : (
                        <Spinner size="small" />
                    )}
                    </Button>
                    <Dialog
                    open={success || error}
                    onOpenChange={(open) => {
                        if (!open) {
                        setSuccess(false);
                        setError(false);
                        // if (!preventRedirect) {
                                // Jika bukan karena tombol Add Another, redirect
                        router.push(`/employee`);
            
                            //     // reset flag supaya dialog bisa redirect normal di lain waktu
                            //     setPreventRedirect(false);
                            // }
                        }
                    }}
                    >
                    <DialogContent className="bg-white max-w-sm mx-auto">
                        <DialogHeader>
                        <DialogTitle>{success ? "Success!" : "Error"}</DialogTitle>
                        </DialogHeader>
                        <div className="mt-2">
                        {success && <p className="text-green-700">Successfully!</p>}
                        {error && <p className="text-red-600">There was an error submitting the form.</p>}
                        </div>
                        <DialogFooter className="mt-4 flex gap-2 justify-end">
                        {success && (
                            <div className="flex gap-2 justify-end w-full">
                            <DialogClose asChild>
                                <Button variant="default" className="max-w-[180px] whitespace-nowrap">Close</Button>
                            </DialogClose>
                            </div>
                        )}
                        {error && (
                            
                            <DialogClose asChild>
                                <Button variant="default" className="max-w-[180px] whitespace-nowrap">Close</Button>
                            </DialogClose>
                            
                        )}
                        </DialogFooter>
                    </DialogContent>
                    </Dialog>
                </div>
                </CardContent>
            </Card>
            <Card className="flex-1 rounded-[15px] border border-black/15 bg-white shadow-[0px_2px_2px_0px_rgba(0,0,0,0.25)] overflow-hidden">
                <CardContent className="overflow-x-auto">
                
                    <DataTable columns={columns} data={mappedValidRows}  isLoading={isLoading} tableTitle="Valid Employee Data"/>
                
              
                </CardContent>
            </Card>
            <Card className="flex-1 rounded-[15px] border border-black/15 bg-white shadow-[0px_2px_2px_0px_rgba(0,0,0,0.25)] overflow-hidden">
                <CardContent className="overflow-x-auto">
                
                    <DataTable columns={columns} data={mappedInValidRows} isLoading={isLoading} tableTitle="Invalid Employee Data"/>
                
              
                </CardContent>
            </Card>
            
        </div>
      </div>
      
    </Sidebar>
  );
}
