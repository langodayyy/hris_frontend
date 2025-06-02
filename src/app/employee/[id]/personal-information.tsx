'user client'

import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogTrigger,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogDescription,
    DialogClose,
    DialogFooter,
    } from "@/components/ui/dialog"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { EmployeeResponse } from "@/types/employee";
import { useEffect, useState } from "react";
import { Spinner } from "@/components/ui/spinner";
import Cookies from "js-cookie";

type Props = {
    employeeData?: EmployeeResponse;
    onUpdate: () => void;
};

const PersonalInformation = ({ employeeData, onUpdate }: Props) => {
    const [gender, setGender] = useState("");
    const [education, setEducation] = useState("");
    const [bloodType, setBloodType] = useState("");
    const [maritalStatus, setMaritalStatus] = useState("");
    const [religion, setReligion] = useState("");

    useEffect(() => {
    if (employeeData?.employee) {
        if (employeeData.employee.gender) setGender(employeeData.employee.gender);
        if (employeeData.employee.education) setEducation(employeeData.employee.education);
        if (employeeData.employee.blood_type) setBloodType(employeeData.employee.blood_type);
        if (employeeData.employee.marital_status) setMaritalStatus(employeeData.employee.marital_status);
        if (employeeData.employee.religion) setReligion(employeeData.employee.religion);
    }
    }, [employeeData?.employee]);
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState(false);

    
    const handleSubmitForm = async () => {
        setLoading(true);
        setError(false);
        setSuccess(false);

        try {
            const form = document.getElementById("employeeForm") as HTMLFormElement;
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

            if (!response.ok) throw new Error("Gagal submit");

            setSuccess(true);
        } catch (err) {
            console.error("Submit error:", err);
            setError(true);
        } finally {
            setLoading(false);
        }
    };

    const [isDialogAOpen, setDialogAOpen] = useState(false);
    const handleOkClick = async () => {
        onUpdate(); // panggil fetchData() di parent
        setDialogAOpen(false)
        setSuccess(false); // reset state jika perlu

    };
    return (
        <Card className="flex-1 h-full ml-[20px] gap-[15px] rounded-[15px] border border-black/15 bg-white shadow-[0px_2px_2px_0px_rgba(0,0,0,0.25)] overflow-hidden">
            <div className="flex mx-[20px] justify-between">
                <p className="justify-center text-lg font-medium whitespace-nowrap">Personal Information</p>
                <div>
                    <Dialog open={isDialogAOpen} onOpenChange={setDialogAOpen}>
                        <DialogTrigger asChild>
                            <Button variant="ghost" size="icon">
                                <svg className="!w-[24px] !h-[24px]" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M12 20H21" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                    <path d="M16.5 3.49998C16.8978 3.10216 17.4374 2.87866 18 2.87866C18.2786 2.87866 18.5544 2.93353 18.8118 3.04014C19.0692 3.14674 19.303 3.303 19.5 3.49998C19.697 3.69697 19.8532 3.93082 19.9598 4.18819C20.0665 4.44556 20.1213 4.72141 20.1213 4.99998C20.1213 5.27856 20.0665 5.55441 19.9598 5.81178C19.8532 6.06915 19.697 6.303 19.5 6.49998L7 19L3 20L4 16L16.5 3.49998Z" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                </svg>
                            </Button>
                        </DialogTrigger>
                        <DialogContent className="bg-white !max-w-[726px]">
                            <DialogHeader>
                                <DialogTitle>Edit Personal Information</DialogTitle>
                                <DialogDescription>
                                    
                                    
                                </DialogDescription>
                            </DialogHeader>
                            <div>
                                {/* <form action="https://httpbin.org/post" method="POST" target="_blank" encType="multipart/form-data"> */}
                                <form id="employeeForm" onSubmit={(e) => {
                                    e.preventDefault(); // mencegah reload halaman
                                    handleSubmitForm();
                                }}>
                                    <div className="flex flex-col gap-[15px] mt-[15px]">
                                        <div className="flex gap-[10px]">
                                            <div className="flex flex-col flex-1 gap-[8px]">
                                                <Label htmlFor="First Name">First Name</Label>
                                                <Input
                                                    type="text"
                                                    id="first_name"
                                                    name="first_name"
                                                    placeholder="Enter employee first name"
                                                    defaultValue={employeeData?.employee.first_name??""}
                                                />
                                            </div>
                                            <div className="flex flex-col flex-1 gap-[8px]">
                                                <Label htmlFor="Last Name">Last Name</Label>
                                                <Input
                                                    type="text"
                                                    id="last_name"
                                                    name="last_name"
                                                    placeholder="Enter employee last name"
                                                    defaultValue={employeeData?.employee.last_name??""}
                                                />
                                            </div>
                                        </div>
                                        <div className="flex gap-[10px]">
                                            <div className="flex flex-col flex-1 gap-[8px]">
                                                <Label htmlFor="First Name">NIK</Label>
                                                <Input
                                                    type="number"
                                                    id="nik"
                                                    name="nik"
                                                    placeholder="Enter employee NIK"
                                                    defaultValue={employeeData?.employee.nik??""}
                                                    className="no-spinner"
                                                />
                                            </div>
                                            <div className="flex flex-col flex-1 gap-[8px]">
                                                <Label htmlFor="gender">Gender</Label>
                                                <Select value={gender} onValueChange={setGender}>
                                                    <SelectTrigger className="w-full !h-[46px] !border !border-neutral-300 !text-neutral-300">
                                                        <SelectValue placeholder="Select employee gender" />
                                                    </SelectTrigger>
                                                    <SelectContent>
                                                        <SelectItem value="Male">Male</SelectItem>
                                                        <SelectItem value="Female">Female</SelectItem>
                                                    </SelectContent>
                                                </Select>
                                                <input type="hidden" name="gender" value={gender} />
                                            </div>
                                        </div>
                                        <div className="flex gap-[10px]">
                                            <div className="flex flex-col flex-1 gap-[8px]">
                                                <Label htmlFor="birth place">Birth Place</Label>
                                                <Input
                                                    type="text"
                                                    id="birth_place"
                                                    name="birth_place"
                                                    placeholder="Enter employee birth place"
                                                    defaultValue={employeeData?.employee.birth_place??""}
                                                />
                                            </div>
                                            <div className="flex flex-col flex-1 gap-[8px]">
                                                <Label htmlFor="birth darte">Birth Date</Label>
                                                <Input
                                                    type="date"
                                                    id="birth_date"
                                                    name="birth_date"
                                                    placeholder="Enter employee birth date"
                                                    defaultValue={employeeData?.employee.birth_date??""}
                                                />
                                            </div>
                                        
                                        </div>
                                        <div className="flex gap-[10px]">
                                                <div className="flex flex-col flex-1 gap-[8px]">
                                                <Label htmlFor="Education">Education</Label>
                                                <Select value={education} onValueChange={setEducation}>
                                                    <SelectTrigger className="w-full !h-[46px] !border !border-neutral-300 !text-neutral-300">
                                                        <SelectValue placeholder="Select employee education" />
                                                    </SelectTrigger>
                                                    <SelectContent>
                                                        <SelectItem value="SD">SD</SelectItem>
                                                        <SelectItem value="SMP">SMP</SelectItem>
                                                        <SelectItem value="SMA">SMA</SelectItem>
                                                        <SelectItem value="D3">D3</SelectItem>
                                                        <SelectItem value="S1">S1</SelectItem>
                                                        <SelectItem value="S2">S2</SelectItem>
                                                        <SelectItem value="S3">S3</SelectItem>
                                                    </SelectContent>
                                                </Select>
                                                <input type="hidden" name="education" value={education} />
                                            </div>
                                            <div className="flex flex-col flex-1 gap-[8px]">
                                                <Label htmlFor="blood-type">Blood Type</Label>
                                                <Select value={bloodType} onValueChange={setBloodType}>
                                                    <SelectTrigger className="w-full !h-[46px] !border !border-neutral-300 !text-neutral-300">
                                                    <SelectValue placeholder="Select employee blood type" />
                                                    </SelectTrigger>
                                                    <SelectContent>
                                                        <SelectItem value="A">A</SelectItem>
                                                        <SelectItem value="B">B</SelectItem>
                                                        <SelectItem value="AB">AB</SelectItem>
                                                        <SelectItem value="O">O</SelectItem>
                                                        <SelectItem value="unknown">Unknown</SelectItem>
                                                    </SelectContent>
                                                </Select>
                                                <input type="hidden" name="blood_type" value={bloodType}/>
                                            </div>
                                        </div>
                                        <div className="flex gap-[10px]">
                                            <div className="flex flex-col flex-1 gap-[8px]">
                                                <Label htmlFor="maritial-_status">Maritial Status</Label>
                                                <Select value={maritalStatus} onValueChange={setMaritalStatus}>
                                                    <SelectTrigger className="w-full !h-[46px] !border !border-neutral-300 !text-neutral-300">
                                                        <SelectValue placeholder="Select employee maritial status" />
                                                    </SelectTrigger>
                                                    <SelectContent>
                                                        <SelectItem value="Single">Single</SelectItem>
                                                        <SelectItem value="Married">Married</SelectItem>
                                                        <SelectItem value="Divorced">Divorced</SelectItem>
                                                        <SelectItem value="Widowed">Widowed</SelectItem>
                                                    </SelectContent>
                                                </Select>
                                                <input type="hidden" name="marital_status" value={maritalStatus} />
                                            </div>
                                            <div className="flex flex-col flex-1 gap-[8px]">
                                                <Label htmlFor="religion">Religion</Label>
                                                <Select value={religion} onValueChange={setReligion}>
                                                    <SelectTrigger className="w-full !h-[46px] !border !border-neutral-300 !text-neutral-300">
                                                    <SelectValue placeholder="Select employee religion" />
                                                    </SelectTrigger>
                                                    <SelectContent>
                                                    <SelectItem value="Islam">Islam</SelectItem>
                                                    <SelectItem value="Protestant">Christian Protestant</SelectItem>
                                                    <SelectItem value="Catholic">Catholic</SelectItem>
                                                    <SelectItem value="Hindu">Hindu</SelectItem>
                                                    <SelectItem value="Buddha">Buddha</SelectItem>
                                                    <SelectItem value="Confucianism">Confucianism</SelectItem>
                                                    <SelectItem value="Other">Other</SelectItem>
                                                    </SelectContent>
                                                </Select>
                                                <input type="hidden" name="religion" value={religion} />
                                            </div>
                                        </div>
                                        <div className="flex gap-[10px]">
                                            <div className="flex flex-col flex-1 gap-[8px]">
                                                <Label htmlFor="citizenship">Citizenship</Label>
                                                <Input
                                                    type="text"
                                                    id="citizenship"
                                                    name="citizenship"
                                                    placeholder="Enter employee citizenship"
                                                    defaultValue={employeeData?.employee.citizenship??""}
                                                />
                                            </div>
                                            <div className="flex flex-col flex-1 gap-[8px]">
                                                <Label htmlFor="address">Address</Label>
                                                <Input
                                                    type="text"
                                                    id="address"
                                                    name="address"
                                                    placeholder="Enter employee address"
                                                    defaultValue={employeeData?.employee.address??""}
                                                />
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
                                                handleOkClick();
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
                                                        <Button onClick={handleOkClick} variant="default" className="max-w-[180px] whitespace-nowrap">Ok</Button>
                                                    </DialogClose>
                                                    </div>
                                                )}
                                                {error && (
                                                    <DialogClose asChild>
                                                        <Button onClick={handleOkClick} variant="default" className="max-w-[180px] whitespace-nowrap">OK</Button>
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
                </div>
                
            </div>
            <div className="flex mx-[20px] gap-[10px]">
                <div className="flex flex-col flex-1 gap-[8px] overflow-hidden">
                    <Label>Full Name</Label>
                    <span className="text-gray-600 border border-neutral-300 rounded-md px-4 py-3">{[employeeData?.employee.first_name, employeeData?.employee.last_name].filter(Boolean).join(" ") || "-"}</span>
                </div>
                <div className="flex flex-col flex-1 gap-[8px] overflow-hidden">
                    <Label>NIK</Label>
                    <span className="text-gray-600 border border-neutral-300 rounded-md px-4 py-3">{employeeData?.employee.nik ?? "-"}</span> 
                </div>
            </div>
            <div className="flex mx-[20px] gap-[10px]">
                <div className="flex flex-col flex-1 gap-[8px] overflow-hidden">
                    <Label>Gender</Label>
                    <span className="text-gray-600 border border-neutral-300 rounded-md px-4 py-3">{employeeData?.employee.gender ?? "-"}</span> 
                </div>
                <div className="flex flex-col flex-1 gap-[8px] overflow-hidden">
                    <Label>Education</Label>
                    <span className="text-gray-600 border border-neutral-300 rounded-md px-4 py-3">{employeeData?.employee.education ?? "-"}</span> 
                </div>
            </div>
            <div className="flex mx-[20px] gap-[10px]">
                <div className="flex flex-col flex-1 gap-[8px] overflow-hidden">
                    <Label>Birth Place</Label>
                    <span className="text-gray-600 border border-neutral-300 rounded-md px-4 py-3">{employeeData?.employee.birth_place ?? "-"}</span> 
                </div>
                <div className="flex flex-col flex-1 gap-[8px] overflow-hidden">
                    <Label>Birth Date</Label>
                    <span className="text-gray-600 border border-neutral-300 rounded-md px-4 py-3">{employeeData?.employee.birth_date ?? "-"}</span> 
                </div>
            </div>
            <div className="flex mx-[20px] gap-[10px]">
                <div className="flex flex-col flex-1 gap-[8px] overflow-hidden">
                    <Label>Citizenship</Label>
                    <span className="text-gray-600 border border-neutral-300 rounded-md px-4 py-3">{employeeData?.employee.citizenship ?? "-"}</span> 
                </div>
                <div className="flex flex-col flex-1 gap-[8px] overflow-hidden">
                    <Label>Marital Status</Label>
                    <span className="text-gray-600 border border-neutral-300 rounded-md px-4 py-3">{employeeData?.employee.marital_status ?? "-"}</span> 
                </div>
            </div>
            <div className="flex mx-[20px] gap-[10px]">
                <div className="flex flex-col flex-1 gap-[8px] overflow-hidden">
                    <Label>Religion</Label>
                    <span className="text-gray-600 border border-neutral-300 rounded-md px-4 py-3">{employeeData?.employee.religion ?? "-"}</span> 
                </div>
                <div className="flex flex-col flex-1 gap-[8px] overflow-hidden">
                    <Label>Blood Type</Label>
                    <span className="text-gray-600 border border-neutral-300 rounded-md px-4 py-3">{employeeData?.employee.blood_type ?? "-"}</span> 
                </div>
            </div>
            <div className="flex mx-[20px] gap-[10px]">
                <div className="flex flex-col flex-1 gap-[8px] overflow-hidden">
                    <Label>Address</Label>
                    <span className="text-gray-600 border border-neutral-300 rounded-md px-4 py-3">{employeeData?.employee.address ?? "-"}</span> 
                </div>
            </div>

        </Card>
    );
    
}

export default PersonalInformation;