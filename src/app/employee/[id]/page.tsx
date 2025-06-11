'use client'
import Sidebar from "@/components/sidebar";
import PersonalInformation from "./personal-information";
import ContactInformation from "./contact-information";
import EmploymentOverview from "./employment-overview";
import EmployeeDocuments from "./document/document";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { useEffect, useRef, useState } from "react";
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useParams, useRouter } from "next/navigation";
import { EmployeeResponse } from "@/types/employee";
import { Spinner } from "@/components/ui/spinner";
import Cookies from "js-cookie";
import React from "react";
import { Toaster, toast } from "sonner";
import { Skeleton } from "@/components/ui/skeleton";

export default function EmployeeDetails(){
    const [employeeData, setEmployeeData] = useState<EmployeeResponse | undefined>(undefined);
    const [employeeStatus, setEmployeeStatus] = useState("");
    useEffect(() => {
    if (employeeData?.employee.employee_status) {
        if (employeeData.employee.employee_status) setEmployeeStatus(employeeData.employee.employee_status);
    }
    }, [employeeData?.employee.employee_status]);
    const [imageValid, setImageValid] = useState(true);
    const [avatarPreview, setAvatarPreview] = useState<string | null>(null);
    const inputFileRef = useRef<HTMLInputElement>(null);
    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
                setAvatarPreview(URL.createObjectURL(file));
            }
    };

    const handleEditPhotoClick = () => {
        inputFileRef.current?.click();
    };
    const handleCancelPhotoClick = () => {
        setAvatarPreview(null);           // reset preview foto
        if (inputFileRef.current) {
            inputFileRef.current.value = ""; // reset input file supaya kosong
        }
    };
    const [loadingPhoto, setLoadingPhoto] = useState(false);
    const [successPhoto, setSuccessPhoto] = useState(false);
    const [errorPhoto, setErrorPhoto] = useState(false);
    const handleSavePhotoCLick = async () => {
        setLoadingPhoto(true);
        setErrorPhoto(false);
        setSuccessPhoto(false);

        try {
            const formData = new FormData();

            const file = inputFileRef.current?.files?.[0];
            if (file) {
                formData.append("employee_photo", file);
            }

            const response = await fetch(
                `${process.env.NEXT_PUBLIC_API_URL}/employees/${employeeData?.employee.employee_id}?_method=PATCH`,
                {
                method: "POST",
                headers: {
                    Authorization: `Bearer ${Cookies.get("token")}`,
                    // Jangan tambahkan Content-Type manual di sini!
                },
                body: formData,
            
            }
        );

        const responseData = await response.json();

        if (!response.ok) {
            throw responseData; 
        }
        toast.success('Photo updated successfully')
        setSuccessPhoto(true);
        fetchData()
        setAvatarPreview(null);
        } catch (err) {
            setErrorPhoto(true);
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
        } finally {

        setLoadingPhoto(false);
        }
    };
  
    const params = useParams();
    const id = params.id;

    const [isLoading, setIsLoading] = useState(true);
    const fetchData = async () => {
        setIsLoading(true);
        setError(false);
        setSuccess(false);
        try {
            // setIsLoading(true);
            const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/employees/${id}`, {
                method: "GET",
            headers: {
                "Authorization": `Bearer ${Cookies.get("token")}`,
                // "Content-Type": "application/json"
                }
            });

           
            
            const data: EmployeeResponse = await res.json();

            if (!res.ok) {
                throw data; 
            }
            setEmployeeData(data);
        } catch (err: any) {
            setError(true);
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
            const baseUrl = `${process.env.NEXT_PUBLIC_API_URL}/employee/export-csv`;
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
            
                if (!response.ok) {
                    throw response; 
                }
                // if (!response.ok) throw new Error("Gagal mengunduh file");

                const blob = await response.blob();
                const downloadUrl = window.URL.createObjectURL(blob);

                const a = document.createElement("a");
                a.href = downloadUrl;
                a.download = "employees.csv";
                document.body.appendChild(a);
                a.click();
                a.remove();
                window.URL.revokeObjectURL(downloadUrl);
                toast.success('Export employee data successfully')
                // setSuccess(true);
            }
            
        } catch (err) {
             setError(true);
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
        } finally {
            setLoading(false);
        }
    };
    const handleSubmitStatusForm = async () => {
        setLoading(true);
        setError(false);
        setSuccess(false);

        try {
            const form = document.getElementById("employeeStatusForm") as HTMLFormElement;
            const formData = new FormData(form);

            const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/employees/${employeeData?.employee.employee_id}?_method=PATCH`, {
                    method: "POST",
                    headers: {
                        "Authorization": `Bearer ${Cookies.get("token")}`,
                        // Jangan tambahkan Content-Type manual di sini!
                    },
                    body: formData,
            });

            const responseData = await response.json();
            console.log("Response:", responseData);
            
            if (!response.ok) {
                throw responseData; 
            }
            toast.success('Employee change status successfully')
        
            setSuccess(true);
            handleOkClickEmployeeStatus();
        } catch (err) {
           setError(true);
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
        } finally {
            setLoading(false);
        }
    };

    const resetEmployeePassword = async () => {
        setLoading(true);
        setError(false);
        setSuccess(false);
        try {

            const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/employees/${employeeData?.employee.employee_id}/reset-password`, {
                    method: "POST",
                    headers: {
                        "Authorization": `Bearer ${Cookies.get("token")}`,
                        // Jangan tambahkan Content-Type manual di sini!
                    },
            });

            const responseData = await response.json();
            console.log("Response:", responseData);

            if (!response.ok) {
            throw responseData; 
            }
            toast.success('Employee password reset successfully')
        
            setSuccess(true);
            handleOkClickResetPassword()
        } catch (err) {
            setError(true);
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

            const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/employees/${employeeData?.employee.employee_id}`, {
                    method: "DELETE",
                    headers: {
                        "Authorization": `Bearer ${Cookies.get("token")}`,
                        // Jangan tambahkan Content-Type manual di sini!
                    },
            });

            const responseData = await response.json();
            console.log("Response:", responseData);

            if (!response.ok) {
                throw responseData; 
            }
            
            setSuccess(true);
            handleOkClickDelete();
        } catch (err) {
            setError(true);
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
        } finally {
            setLoading(false);
        }
    };

    const [isDialogEmployeeStatusOpen, setDialogEmployeeStatusOpen] = useState(false);
    const [isDialogResetPasswordOpen, setDialogResetPasswordOpen] = useState(false);
    const [isDialogDeleteOpen, setDialogDeleteOpen] = useState(false);
    const [confirmationTextDelete, setConfirmationTextDelete] = useState("");
    const [confirmationTextStatus, setConfirmationTextStatus] = useState("");

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
        sessionStorage.setItem("toastdeleteemployee", "Employee deleted successfully");
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
            <Toaster position="bottom-right" expand={true} richColors closeButton></Toaster>
            <div className="flex flex-col gap-[15px]">
                    {isLoading ? ( 
                        <Skeleton className="min-h-[241px]"></Skeleton>

                    ) : (
                    <div>
                        <Card className="flex-1 gap-[15px] rounded-[15px] border border-black/15 bg-white shadow-[0px_2px_2px_0px_rgba(0,0,0,0.25)] overflow-hidden">
                       
                            <div className="flex mx-[20px] items-center">
                                <div className="relative w-[78px] h-[78px]">
                                    {(avatarPreview || (employeeData?.employee_photo_url && imageValid))  ? (
                                        <img
                                        src={avatarPreview ?? employeeData?.employee_photo_url ?? ""}
                                        alt="Employee Photo"
                                        className="w-[78px] h-[78px] rounded-full object-cover bg-gray-200"
                                        onError={() => setImageValid(false)}
                                        />
                                    ) : (
                                    <svg width="78" height="78" viewBox="0 0 78 78" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <rect width="78" height="78" rx="39" fill="#F3F4F6" />
                                        <mask id="mask0_462_2363" maskUnits="userSpaceOnUse" x="0" y="16" width="78" height="62" mask-type="alpha">
                                            <path d="M78 68.2272V78H0V68.263C4.53684 62.1999 10.4257 57.2791 17.1983 53.8916C23.9709 50.5042 31.4405 48.7436 39.013 48.75C54.951 48.75 69.108 56.4005 78 68.2272V68.2272ZM52.0065 29.2467C52.0065 32.6945 50.6369 36.0011 48.1989 38.4391C45.7609 40.8771 42.4543 42.2467 39.0065 42.2467C35.5587 42.2467 32.2521 40.8771 29.8141 38.4391C27.3761 36.0011 26.0065 32.6945 26.0065 29.2467C26.0065 25.7989 27.3761 22.4923 29.8141 20.0543C32.2521 17.6163 35.5587 16.2467 39.0065 16.2467C42.4543 16.2467 45.7609 17.6163 48.1989 20.0543C50.6369 22.4923 52.0065 25.7989 52.0065 29.2467V29.2467Z" fill="black"/>
                                        </mask>
                                        <g mask="url(#mask0_462_2363)">
                                            <rect width="78" height="78" rx="39" fill="#D1D5DB" />
                                        </g>
                                    </svg>
                                    )}
                                    {/* Tombol edit kecil di pojok kanan bawah */}
                                    {employeeData?.employee.employee_status === "Active" && (
                                    <button
                                        onClick={handleEditPhotoClick}
                                        type="button"
                                        className="absolute bottom-0 right-0 bg-white border border-gray-300 rounded-full p-1 hover:bg-gray-100 shadow-md"
                                        aria-label="Edit photo"
                                    >
                                        <svg
                                            className="!w-[12px] !h-[12px]"
                                            viewBox="0 0 24 24"
                                            fill="none"
                                            xmlns="http://www.w3.org/2000/svg"
                                            >
                                            <path
                                                d="M12 20H21"
                                                stroke="black"
                                                strokeWidth="2"
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                            />
                                            <path
                                                d="M16.5 3.49998C16.8978 3.10216 17.4374 2.87866 18 2.87866C18.2786 2.87866 18.5544 2.93353 18.8118 3.04014C19.0692 3.14674 19.303 3.303 19.5 3.49998C19.697 3.69697 19.8532 3.93082 19.9598 4.18819C20.0665 4.44556 20.1213 4.72141 20.1213 4.99998C20.1213 5.27856 20.0665 5.55441 19.9598 5.81178C19.8532 6.06915 19.697 6.303 19.5 6.49998L7 19L3 20L4 16L16.5 3.49998Z"
                                                stroke="black"
                                                strokeWidth="2"
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                            />
                                            </svg>
                                    </button>
                                    )}
                                </div>
                                

                                {/* Input file tersembunyi */}
                                <input
                                    type="file"
                                    name="employee_photo"
                                    accept="image/*"
                                    id="employee_photo"
                                    className="hidden"
                                    ref={inputFileRef}
                                    onChange={handleFileChange}
                                />
                                <div className="flex flex-col ml-[15px] gap-[10px]">
                                    {avatarPreview && (
                                        <>
                                        
                                        <Button disabled={loadingPhoto} onClick={handleSavePhotoCLick} variant={"default"} size={"sm"}>
                                            {!loadingPhoto ? (<span className="ml-1">Save</span>): (<Spinner size="small"/>)}
                                        </Button>
                                        <Button disabled={loadingPhoto} onClick={handleCancelPhotoClick} variant={"secondary"} size={"sm"}>
                                            {!loadingPhoto ? (<span className="ml-1">Cancel</span>): (<Spinner size="small"/>)}
                                        </Button>
                                        </>
                                    )}
                                </div>
                                
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
                                        <DropdownMenuContent className="mx-[50px]">
                                            <DropdownMenuItem onClick={handleExportButton}>Export</DropdownMenuItem>
                                            {employeeData?.employee.employee_status === "Active" && (
                                                <>
                                                <DropdownMenuItem onClick={handleChangeStatus}>Change Status</DropdownMenuItem>
                                                <DropdownMenuItem onClick={handleResetPassword}>Reset Password</DropdownMenuItem>
                                                </>
                                            )}
                                            
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
                                                <form id="employeeStatusForm" onSubmit={(e) => {
                                                    e.preventDefault(); // mencegah reload halaman
                                                    handleSubmitStatusForm();
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
                                                                        {employeeData?.employee.employee_status === "Active" && 
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
                                                        {employeeData?.employee.employee_status === "Active" && employeeStatus !=="Active" ? (
                                                            <>
                                                                <div className="flex flex-col flex-1 gap-[8px]">
                                                                    <Label htmlFor="exit date">Exit Date</Label>
                                                                    <Input
                                                                        type="date"
                                                                        id="exit_date"
                                                                        name="exit_date"
                                                                        placeholder="Enter employee exit date"
                                                                        defaultValue={employeeData?.employee.exit_date || undefined}
                                                                    />
                                                                </div>
                                                                
                                                                <span>Please type <strong>{employeeData?.employee.first_name} {employeeData?.employee.last_name}</strong> to confirm this action. This action cannot be undone.</span>
                                                                <input
                                                                type="text"
                                                                placeholder={`Type ${employeeData?.employee.first_name} ${employeeData?.employee.last_name} to confirm`}
                                                                className="border px-3 py-2 rounded-md"
                                                                value={confirmationTextStatus}
                                                                onChange={(e) => setConfirmationTextStatus(e.target.value)}
                                                                />
                                                            </>

                                                        ):("")}
                                                        
                                                        <div className="flex gap-[10px] justify-end">
                                                            <div>
                                                                <DialogClose asChild>
                                                                    <Button className="w-[80px]" variant="outline" size="lg">
                                                                        Cancel
                                                                    </Button>
                                                                </DialogClose>
                                                            </div>
                                                            
                                                                <Button className="w-[80px] h-[40px]" variant={employeeData?.employee.employee_status === "Active" && employeeStatus !== "Active" ? "destructive" : "default"}  type="submit" disabled={loading || (confirmationTextStatus !== `${employeeData?.employee.first_name} ${employeeData?.employee.last_name}` && employeeData?.employee.employee_status === "Active" && employeeStatus !== "Active")}>
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
                                                <span>Please type <strong>`{employeeData?.employee.first_name} {employeeData?.employee.last_name}`</strong> to confirm this action. This action cannot be undone.</span>
                                                <input
                                                type="text"
                                                placeholder={`Type ${employeeData?.employee.first_name} ${employeeData?.employee.last_name} to confirm`}
                                                className="border px-3 py-2 rounded-md"
                                                value={confirmationTextDelete}
                                                onChange={(e) => setConfirmationTextDelete(e.target.value)}
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
                                                    disabled={loading || confirmationTextDelete !== `${employeeData?.employee.first_name} ${employeeData?.employee.last_name}`}
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
                  {isLoading ? ( 
                        <Skeleton className="min-h-[141px]"></Skeleton>

                    ) : (
                        <>
                            {employeeData?.employee && (
                            <EmployeeDocuments isActive={employeeData?.employee.employee_status !== "Active"}></EmployeeDocuments>
                            )}
                        </>
                    )}
              
             </div>
        </Sidebar>
    );
}