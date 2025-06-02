'use client'
import Sidebar from "@/components/sidebar";
import PersonalInformation from "./personal-information";
import ContactInformation from "./contact-information";
import EmploymentOverview from "./employment-overview";
import EmployeeDocuments from "./documents";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { useEffect, useState } from "react";
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useParams, useRouter } from "next/navigation";
import { EmployeeResponse } from "@/types/employee";
import { Spinner } from "@/components/ui/spinner";
import Cookies from "js-cookie";
import React from "react";

export default function EmployeeDetails(){
    const [employeeStatus, setEmployeeStatus] = useState("");
    // const [isDialogOpen, setIsDialogOpen] = useState(false);
    
    // const handleChangeStatus = () => {
    //     setIsDialogOpen(true);
    // };
    const params = useParams();
    const id = params.id;
    const [employeeData, setEmployeeData] = useState<EmployeeResponse | undefined>(undefined);
    const [isLoading, setIsLoading] = useState(true);
    const fetchData = async () => {
        try {
            setIsLoading(true);
            const res = await fetch(`http://127.0.0.1:8000/api/employees/${id}`, {
            headers: {
                "Authorization": `Bearer ${Cookies.get("token")}`,
                "Content-Type": "application/json"
            }
            });

            if (!res.ok) throw new Error("Failed to fetch employee");

            const data: EmployeeResponse = await res.json();
            setEmployeeData(data);
        } catch (error) {
            console.error("Error fetching data:", error);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
    fetchData();
    }, []);

    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState(false);

    const handleExportButton = async () => {
        setLoading(true);
        setError(false);
        setSuccess(false);

        try {
            const baseUrl = "http://127.0.0.1:8000/api/employee/export-csv";
            const params = new URLSearchParams();

            if (employeeData?.employee.employee_id) {
                params.append("employee_id", employeeData?.employee.employee_id);
                const url = params.toString() ? `${baseUrl}?${params.toString()}` : baseUrl;
    
                const response = await fetch(url, {
                method: "GET",
                headers: {
                    "Authorization": `Bearer ${Cookies.get("token")}`,
                },
                });

                if (!response.ok) throw new Error("Gagal mengunduh file");

                const blob = await response.blob();
                const downloadUrl = window.URL.createObjectURL(blob);

                const a = document.createElement("a");
                a.href = downloadUrl;
                a.download = "employees.csv";
                document.body.appendChild(a);
                a.click();
                a.remove();
                window.URL.revokeObjectURL(downloadUrl);

                // setSuccess(true);
            }
            
        } catch (err) {
            console.error("Submit error:", err);
            setError(true);
        } finally {
            setLoading(false);
        }
    };
    const handleSubmitForm = async () => {
        setLoading(true);
        setError(false);
        setSuccess(false);

        try {
            const form = document.getElementById("employeeForm") as HTMLFormElement;
            const formData = new FormData(form);

            const response = await fetch(`http://127.0.0.1:8000/api/employees/${employeeData?.employee.employee_id}?_method=PATCH`, {
                    method: "POST",
                    headers: {
                        "Authorization": `Bearer ${Cookies.get("token")}`,
                        // Jangan tambahkan Content-Type manual di sini!
                    },
                    body: formData,
            });

            const responseData = await response.json();
            console.log("Response:", responseData);

            if (!response.ok) throw new Error("Gagal submit");

            setSuccess(true);
        } catch (err) {
            console.error("Submit error:", err);
            setError(true);
        } finally {
            setLoading(false);
        }
    };

    const resetEmployeePassword = async () => {
        setLoading(true);
        setError(false);
        setSuccess(false);
        try {

            const response = await fetch(`http://127.0.0.1:8000/api/employees/${employeeData?.employee.employee_id}/reset-password`, {
                    method: "POST",
                    headers: {
                        "Authorization": `Bearer ${Cookies.get("token")}`,
                        // Jangan tambahkan Content-Type manual di sini!
                    },
            });

            const responseData = await response.json();
            console.log("Response:", responseData);

            if (!response.ok) throw new Error("Gagal submit");

            setSuccess(true);
        } catch (err) {
            console.error("Submit error:", err);
            setError(true);
        } finally {
            setLoading(false);
        }
    };

    const router = useRouter();
    const deleteEmployee = async () => {
        setLoading(true);
        setError(false);
        setSuccess(false);
        try {

            const response = await fetch(`http://127.0.0.1:8000/api/employees/${employeeData?.employee.employee_id}`, {
                    method: "DELETE",
                    headers: {
                        "Authorization": `Bearer ${Cookies.get("token")}`,
                        // Jangan tambahkan Content-Type manual di sini!
                    },
            });

            const responseData = await response.json();
            console.log("Response:", responseData);

            if (!response.ok) throw new Error("Gagal submit");
            
            setSuccess(true);
        } catch (err) {
            console.error("Submit error:", err);
            setError(true);
        } finally {
            setLoading(false);
        }
    };

    const [isDialogEmployeeStatusOpen, setDialogEmployeeStatusOpen] = useState(false);
    const [isDialogResetPasswordOpen, setDialogResetPasswordOpen] = useState(false);
    const [isDialogDeleteOpen, setDialogDeleteOpen] = useState(false);
    const [confirmationText, setConfirmationText] = useState("");

    const handleOkClickEmployeeStatus = async () => {
        fetchData()
        setDialogEmployeeStatusOpen(false)
        setSuccess(false);

    };
    const handleOkClickResetPassword = async () => {
        setDialogResetPasswordOpen(false)
        setSuccess(false);

    };
    const handleOkClickDelete = async () => {
        setDialogDeleteOpen(false)
        setSuccess(false);
        router.push("/employee");

    };
    const handleChangeStatus = () => {
        setDialogEmployeeStatusOpen(true);
    };

    const handleResetPassword = () => {
        setDialogResetPasswordOpen(true)
    }
    const handleDelete = () => {
        setDialogDeleteOpen(true)
    }

    return (
        <Sidebar title="Employee Details">
            <div className="flex flex-col gap-[30px]">
                {/* <Card className="flex-1 rounded-[15px] border border-black/15 bg-white shadow-[0px_2px_2px_0px_rgba(0,0,0,0.25)] overflow-hidden">
                    <div className="w-full mx-[20px] mb-[-10px]">
                            <h2 className="justify-center w-full text-lg font-medium whitespace-nowrap mx-[10px]">Employee Details</h2>
                    </div> */}
                    {isLoading ? ( 
                        <Card className="flex-1 gap-[15px] rounded-[15px] border border-black/15 bg-white shadow-[0px_2px_2px_0px_rgba(0,0,0,0.25)] overflow-hidden">
                                    <Spinner className="w-full mx-[20px] my-[10px]" size="medium" />
                                    </Card>
                                  ) : (
                    <div>
                        <Card className="flex-1 gap-[15px] rounded-[15px] border border-black/15 bg-white shadow-[0px_2px_2px_0px_rgba(0,0,0,0.25)] overflow-hidden">
                       
                            <div className="flex mx-[20px] items-center">
                                <svg width="78" height="78" viewBox="0 0 78 78" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <rect width="78" height="78" rx="39" fill="#F3F4F6" />
                                    <mask id="mask0_462_2363" maskUnits="userSpaceOnUse" x="0" y="16" width="78" height="62" mask-type="alpha">
                                        <path d="M78 68.2272V78H0V68.263C4.53684 62.1999 10.4257 57.2791 17.1983 53.8916C23.9709 50.5042 31.4405 48.7436 39.013 48.75C54.951 48.75 69.108 56.4005 78 68.2272V68.2272ZM52.0065 29.2467C52.0065 32.6945 50.6369 36.0011 48.1989 38.4391C45.7609 40.8771 42.4543 42.2467 39.0065 42.2467C35.5587 42.2467 32.2521 40.8771 29.8141 38.4391C27.3761 36.0011 26.0065 32.6945 26.0065 29.2467C26.0065 25.7989 27.3761 22.4923 29.8141 20.0543C32.2521 17.6163 35.5587 16.2467 39.0065 16.2467C42.4543 16.2467 45.7609 17.6163 48.1989 20.0543C50.6369 22.4923 52.0065 25.7989 52.0065 29.2467V29.2467Z" fill="black"/>
                                    </mask>
                                    <g mask="url(#mask0_462_2363)">
                                        <rect width="78" height="78" rx="39" fill="#D1D5DB" />
                                    </g>
                                </svg>
                             
                                <div className="flex flex-col ml-[15px] gap-[10px]">
                                    <p className="font-medium text-base text-black">{employeeData?.employee.first_name} {employeeData?.employee.last_name}</p>
                                    <p className="font-normal text-base text-black/52">{employeeData?.employee.employee_id}</p>
                                </div>
                                <div className="flex gap-[20px] ml-auto items-center">
                                    
                                    
                                        <div
                                            className={`flex items-center gap-2 px-3 py-1 w-fit rounded-2xl text-sm font-medium ${
                                            employeeData?.employee.employee_status === 'Active'
                                                ? 'bg-green-100 text-success-700'
                                                : 'bg-red-100 text-danger-700'
                                            }`}
                                        >
                                            <span
                                            className={`w-2 h-2 rounded-full ${
                                                employeeData?.employee.employee_status === 'Active'
                                                ? 'bg-success-700'
                                                : 'bg-danger-700'
                                            }`}
                                            ></span>
                                            <span>{employeeData?.employee.employee_status}</span>
                                        </div>
                                   


                                    <DropdownMenu>
                                        <DropdownMenuTrigger asChild>
                                            <Button className="w-fit" size="icon" variant="link">
                                            <svg xmlns="http://www.w3.org/2000/svg" className="!w-[24px] !h-[24px]" viewBox="0 0 24 24" fill="none">
                                                <path d="M12 13C12.5523 13 13 12.5523 13 12C13 11.4477 12.5523 11 12 11C11.4477 11 11 11.4477 11 12C11 12.5523 11.4477 13 12 13Z" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                                <path d="M12 6C12.5523 6 13 5.55228 13 5C13 4.44772 12.5523 4 12 4C11.4477 4 11 4.44772 11 5C11 5.55228 11.4477 6 12 6Z" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                                <path d="M12 20C12.5523 20 13 19.5523 13 19C13 18.4477 12.5523 18 12 18C11.4477 18 11 18.4477 11 19C11 19.5523 11.4477 20 12 20Z" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                            </svg>
                                            </Button>
                                        </DropdownMenuTrigger>
                                        <DropdownMenuContent>
                                            <DropdownMenuItem onClick={handleExportButton}>Export</DropdownMenuItem>
                                            <DropdownMenuItem onClick={handleChangeStatus}>Change Status</DropdownMenuItem>
                                            <DropdownMenuItem onClick={handleResetPassword}>Reset Password</DropdownMenuItem>
                                            <DropdownMenuItem onClick={handleDelete}>Delete</DropdownMenuItem>
                                        </DropdownMenuContent>
                                    </DropdownMenu>
                                    <Dialog open={isDialogEmployeeStatusOpen} onOpenChange={setDialogEmployeeStatusOpen}>
                                        <DialogContent className="bg-white">
                                            <DialogHeader>
                                                <DialogTitle>Change Employee Status</DialogTitle>
                                                <DialogDescription>
                                                    
                                                    
                                                </DialogDescription>
                                            </DialogHeader>
                                            <div>
                                                <form id="employeeForm" onSubmit={(e) => {
                                                    e.preventDefault(); // mencegah reload halaman
                                                    handleSubmitForm();
                                                }}>
                                                    <div className="flex flex-col gap-[15px] mt-[15px]">
                                                        <div className="flex gap-[10px]">
                                                            
                                                            <div className="flex flex-col flex-1 gap-[8px]">
                                                                <Label htmlFor="status">Employee Status</Label>
                                                                <Select value={employeeStatus} onValueChange={setEmployeeStatus}>
                                                                    <SelectTrigger className="w-full !h-[46px] !border !border-neutral-300 !text-neutral-300">
                                                                        <SelectValue placeholder="Select employee status" />
                                                                    </SelectTrigger>
                                                                    <SelectContent>
                                                                        {employeeStatus === "Active" && 
                                                                            <SelectItem value="Active">Active</SelectItem>
                                                                        }
                                                                        
                                                                        <SelectItem value="Retire">Retire</SelectItem>
                                                                        <SelectItem value="Resign">Resign</SelectItem>
                                                                        <SelectItem value="Fired">Fired</SelectItem>
                                                                    
                                                                    </SelectContent>
                                                                </Select>
                                                                <input type="hidden" name="employee_status" value={employeeStatus}/>
                                                            </div>
                                                        </div>
                                                        
                                                        <div className="flex gap-[10px] justify-end">
                                                            <div>
                                                                <DialogClose asChild>
                                                                    <Button className="w-[80px]" variant="outline" size="lg">
                                                                        Cancel
                                                                    </Button>
                                                                </DialogClose>
                                                            </div>
                                                            
                                                             <Button className="w-[80px] h-[40px]" variant="default" type="submit" disabled={loading}>
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
                                                                    handleOkClickEmployeeStatus();

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
                                                                            <Button onClick={handleOkClickEmployeeStatus} variant="default" className="max-w-[180px] whitespace-nowrap">Ok</Button>
                                                                        </DialogClose>
                                                                        </div>
                                                                    )}
                                                                    {error && (
                                                                        <DialogClose asChild>
                                                                            <Button onClick={handleOkClickEmployeeStatus} variant="default" className="max-w-[180px] whitespace-nowrap">OK</Button>
                                                                        </DialogClose>
                                                                    )}
                                                                    </DialogFooter>
                                                                </DialogContent>
                                                                </Dialog>
                                                        </div>
                                                    </div>
                                                </form>
                                            </div>
                                        </DialogContent>
                                    </Dialog>
                                    <Dialog open={isDialogResetPasswordOpen} onOpenChange={setDialogResetPasswordOpen}>
                                        <DialogContent className="bg-white">
                                            <DialogHeader>
                                                <DialogTitle>Reset Employee Password</DialogTitle>
                                                <DialogDescription>
                                                    
                                                    
                                                </DialogDescription>
                                            </DialogHeader>
                                            <div>
                                                    <div className="flex flex-col gap-[15px] mt-[15px]">
                                                        
                                                        <div className="flex gap-[10px] justify-end">
                                                            <div>
                                                                <DialogClose asChild>
                                                                    <Button className="w-[80px]" variant="outline" size="lg">
                                                                        Cancel
                                                                    </Button>
                                                                </DialogClose>
                                                            </div>
                                                            
                                                             <Button className="w-[80px] h-[40px]" variant="default" disabled={loading} onClick={resetEmployeePassword}>
                                                                {!loading ? (
                                                                    <span className="ml-1">Reset</span>
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
                                                                    handleOkClickResetPassword();

                                                                    }
                                                                }}
                                                                >
                                                                <DialogContent className="bg-white max-w-sm mx-auto">
                                                                    <DialogHeader>
                                                                    <DialogTitle>{success ? "Success!" : "Error"}</DialogTitle>
                                                                    </DialogHeader>
                                                                    <div className="mt-2">
                                                                    {success && <p className="text-green-700">Successfully!</p>}
                                                                    {error && <p className="text-red-600">There was an error.</p>}
                                                                    </div>
                                                                    <DialogFooter className="mt-4 flex gap-2 justify-end">
                                                                    {success && (
                                                                        <div className="flex gap-2 justify-end w-full">
                                                                        <DialogClose asChild>
                                                                            <Button onClick={handleOkClickResetPassword} variant="default" className="max-w-[180px] whitespace-nowrap">Ok</Button>
                                                                        </DialogClose>
                                                                        </div>
                                                                    )}
                                                                    {error && (
                                                                        <DialogClose asChild>
                                                                            <Button onClick={handleOkClickResetPassword} variant="default" className="max-w-[180px] whitespace-nowrap">OK</Button>
                                                                        </DialogClose>
                                                                    )}
                                                                    </DialogFooter>
                                                                </DialogContent>
                                                                </Dialog>
                                                        </div>
                                                    </div>
                                       
                                            </div>
                                        </DialogContent>
                                    </Dialog>
                                    <Dialog open={isDialogDeleteOpen} onOpenChange={setDialogDeleteOpen}>
                                        <DialogContent className="bg-white">
                                            <DialogHeader>
                                            <DialogTitle>Delete Employee</DialogTitle>
                                            <DialogDescription>
                                                
                                            </DialogDescription>
                                            </DialogHeader>
                                            <div>
                                                
                                            <div className="flex flex-col gap-[15px]">
                                                <span>Please type <strong>DELETE</strong> to confirm this action. This action cannot be undone.</span>
                                                <input
                                                type="text"
                                                placeholder="Type DELETE to confirm"
                                                className="border px-3 py-2 rounded-md"
                                                value={confirmationText}
                                                onChange={(e) => setConfirmationText(e.target.value)}
                                                />
                                                <div className="flex gap-[10px] justify-end">
                                                <div>
                                                    <DialogClose asChild>
                                                    <Button className="w-[80px]" variant="outline" size="lg">
                                                        Cancel
                                                    </Button>
                                                    </DialogClose>
                                                </div>
                                                <Button
                                                    className="w-[80px] h-[40px]"
                                                    variant="destructive"
                                                    disabled={loading || confirmationText !== "DELETE"}
                                                    onClick={deleteEmployee}
                                                >
                                                    {!loading ? (
                                                    <span className="ml-1">Delete</span>
                                                    ) : (
                                                    <Spinner size="small" />
                                                    )}
                                                </Button>
                                                </div>
                                            </div>
                                            </div>

                                            {/* Success/Error Dialog */}
                                            <Dialog open={success || error} onOpenChange={(open) => {
                                            if (!open) {
                                                setSuccess(false);
                                                setError(false);
                                                handleOkClickDelete();
                                            }
                                            }}>
                                            <DialogContent className="bg-white max-w-sm mx-auto">
                                                <DialogHeader>
                                                <DialogTitle>{success ? "Success!" : "Error"}</DialogTitle>
                                                </DialogHeader>
                                                <div className="mt-2">
                                                {success && <p className="text-green-700">Successfully!</p>}
                                                {error && <p className="text-red-600">There was an error.</p>}
                                                </div>
                                                <DialogFooter className="mt-4 flex gap-2 justify-end">
                                                <DialogClose asChild>
                                                    <Button onClick={handleOkClickDelete} variant="default" className="max-w-[180px] whitespace-nowrap">
                                                    OK
                                                    </Button>
                                                </DialogClose>
                                                </DialogFooter>
                                            </DialogContent>
                                            </Dialog>
                                        </DialogContent>
                                        </Dialog>
                                </div>
                            </div>
                            <div className="flex gap-[15px]">
                                <div className="w-6/10">
                                    <PersonalInformation employeeData={employeeData} onUpdate={fetchData}></PersonalInformation>
                                </div>
                                <div className="flex flex-col w-4/10 gap-[15px]">
                                    <ContactInformation employeeData={employeeData} onUpdate={fetchData}></ContactInformation>
                                    <EmploymentOverview employeeData={employeeData} onUpdate={fetchData}></EmploymentOverview>
                                </div>
                            
                            </div>

                        </Card>
                    </div>   )}  
                {/* </Card> */}
                <EmployeeDocuments></EmployeeDocuments>
             </div>
        </Sidebar>
    );
}