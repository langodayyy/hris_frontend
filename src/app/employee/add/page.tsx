'use client';
import { Metadata } from "next";
import Link from 'next/link';
import  Sidebar  from "../../../components/sidebar";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import PhoneInput from "@/components/ui/phoneInput";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
  } from "@/components/ui/select"
import {
  Command,
  CommandEmpty,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import PasswordInput from "@/components/ui/passwordInput";
import { Button } from "@/components/ui/button";
import React, { useEffect, useRef, useState } from 'react';
import { Dialog, DialogClose, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { useRouter } from "next/navigation";
import { Spinner } from "@/components/ui/spinner";

export default function AddEmployee() {
    const [avatarPreview, setAvatarPreview] = useState<string | null>(null);
    const [contractType, setContractType] = useState("");
    const [gender, setGender] = useState("");
    const [education, setEducation] = useState("");
    const [bloodType, setBloodType] = useState("");
    const [maritalStatus, setMaritalStatus] = useState("");
    const [religion, setReligion] = useState("");

    const router = useRouter();
    const formRef = useRef<HTMLFormElement>(null);
    const [preventRedirect, setPreventRedirect] = useState(false);
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState(false);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setAvatarPreview(URL.createObjectURL(file));
        }
    };

    
    const [openBank, setOpenBank] = useState(false)
    const [openDep, setOpenDep] = useState(false)
    const [openPos, setOpenPos] = useState(false)
    const [selectedBank, setSelectedBank] = useState<string | null>(null);

    const [bank, setBank] = useState<{ name: string; code: string }[] | null>(null);

    const [depPosData, setDepPosData] = useState<DepartmentPosition[]>([]);
    const [departments, setDepartments] = useState<{ id: string; name: string }[]>([]);
    const [selectedDepartment, setSelectedDepartment] = useState<string | null>(null);
    const [positions, setPositions] = useState<DepartmentPosition[]>([]);
    const [selectedPosition, setSelectedPosition] = useState<DepartmentPosition | null>(null);

    type DepartmentPosition = {
        id_department: string;
        Department: string;
        id_position: string;
        Position: string;
    };


    useEffect(() => {
        const fetchData = async () => {
          try {
            const token = "1|9p4rp7VWgX8z4umUP9l1fJj3eyXI20abvAAViakR32d8c87a" // pastikan token sudah disimpan di login
            const resBank = await fetch("http://127.0.0.1:8000/api/bank", {
              headers: {
                "Authorization": `Bearer ${token}`,
                "Content-Type": "application/json"
              }
            })
            const resDepPos = await fetch("http://127.0.0.1:8000/api/department-position", {
              headers: {
                "Authorization": `Bearer ${token}`,
                "Content-Type": "application/json"
              }
            })
    
            if (!resBank.ok) throw new Error("Failed to fetch bank")
            const dataBank = await resBank.json()
            setBank(dataBank)

            if (!resDepPos.ok) throw new Error("Failed to fetch Department & Position")
            const dataDepPos: DepartmentPosition[] = await resDepPos.json();

            setDepPosData(dataDepPos);
            setDepPosData(dataDepPos);
            const uniqueDepartments = Array.from(
                new Map(
                    dataDepPos.map(item => [item.id_department, { id: item.id_department, name: item.Department }])
                ).values()
            );
            setDepartments(uniqueDepartments);

          } catch (error) {
            console.error("Error fetching data:", error)
          }
        }
    
        fetchData()
      }, []
    )

    const handleSelectDepartment = (dep: string) => {
        setSelectedDepartment(dep);
        setPositions(depPosData.filter(d => d.id_department === dep));
        setSelectedPosition(null); // reset position
    };

    const handleSubmitForm = async () => {
        setLoading(true);
        setError(false);
        setSuccess(false);

        try {
            const form = document.getElementById("employeeForm") as HTMLFormElement;
            const formData = new FormData(form);

            if (selectedBank) formData.append("bank_code", selectedBank);
            if (selectedPosition?.id_position)
            formData.append("position_id", selectedPosition.id_position.toString());
            
        
            console.log("Submitting data:", Object.fromEntries(formData.entries()));   

            const response = await fetch("http://127.0.0.1:8000/api/employee", {
                    method: "POST",
                    headers: {
                        "Authorization": "Bearer 1|9p4rp7VWgX8z4umUP9l1fJj3eyXI20abvAAViakR32d8c87a",
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
    React.useEffect(() => {
        if (error) {
            setPreventRedirect(true);
        }
    }, [error]);




  return (
    <Sidebar title="Employee Database">
        <div className="w-full">
            {/* <form action="https://httpbin.org/post" method="POST" target="_blank" encType="multipart/form-data"> */}
            <form id="employeeForm" ref={formRef} onSubmit={(e) => {
                e.preventDefault(); // mencegah reload halaman
                handleSubmitForm();
            }}>
            <Card className="flex-1 rounded-[15px] border border-black/15 bg-white shadow-[0px_2px_2px_0px_rgba(0,0,0,0.25)] overflow-hidden">
                <div className="w-full mx-[20px] mb-[-10px]">
                    <h2 className="justify-center w-full text-base font-medium whitespace-nowrap mx-[10px]">Add New Employee</h2>
                </div>
                <div>
                    <Card className="flex-1 mx-[20px] gap-[15px] rounded-[15px] border border-black/15 bg-white shadow-[0px_2px_2px_0px_rgba(0,0,0,0.25)] overflow-hidden">
                        <div className="flex mx-[20px] gap-[15px] items-center">
                            <div>
                                {avatarPreview ? (
                                    <img
                                        src={avatarPreview}
                                        alt="Avatar Preview"
                                        className="w-[78px] h-[78px] rounded-full object-cover border border-gray-300"
                                    />
                                    ) : (
                                    // Avatar Placeholder SVG
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
                            </div>
                            <div>
                                {/* File Input Hidden */}
                                <input
                                type="file"
                                name="employee_photo"
                                accept="image/*"
                                id="employee_photo"
                                className="hidden"
                                onChange={handleFileChange}
                                />
                                {/* Label triggers file input */}
                                <Button type="button" variant="default">
                                    <label htmlFor="employee_photo" className="cursor-pointer">Upload Avatar</label>
                                </Button>

                            </div>
                        </div>
                        <div className="flex mx-[20px] gap-[10px]">
                            <div className="flex flex-col flex-1 gap-[8px]">
                                <Label htmlFor="First Name">First Name</Label>
                                <Input
                                    type="text"
                                    id="first_name"
                                    name="first_name"
                                    placeholder="Enter employee first name"
                                />
                            </div>
                            <div className="flex flex-col flex-1 gap-[8px]">
                                <Label htmlFor="Last Name">Last Name</Label>
                                <Input
                                    type="text"
                                    id="last_name"
                                    name="last_name"
                                    placeholder="Enter employee last name"
                                />
                            </div>
                        </div>
                        <div className="flex mx-[20px] gap-[10px]">
                           
                            <div className="flex flex-col flex-1 gap-[8px]">
                                <Label htmlFor="NIK">NIK</Label>
                                <Input
                                    type="number"
                                    id="nik"
                                    name="nik"
                                    placeholder="Enter employee NIK"
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
                        
                        <div className="flex mx-[20px] gap-[10px]">
                            <div className="flex flex-col flex-1 gap-[8px]">
                                <Label htmlFor="birth place">Birth Place</Label>
                                <Input
                                    type="text"
                                    id="birth_place"
                                    name="birth_place"
                                    placeholder="Enter employee birth place"
                                />
                            </div>
                            <div className="flex flex-col flex-1 gap-[8px]">
                                <Label htmlFor="birth darte">Birth Date</Label>
                                <Input
                                    type="date"
                                    id="birth_date"
                                    name="birth_date"
                                    placeholder="Enter employee birth date"
                                />
                            </div>
                        </div>
                        <div className="flex mx-[20px] gap-[10px]">
                            
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
                        <div className="flex mx-[20px] gap-[10px]">
                            <div className="flex flex-col flex-1 gap-[8px]">
                                <Label htmlFor="address">Address</Label>
                                <Input
                                    type="text"
                                    id="address"
                                    name="address"
                                    placeholder="Enter employee address"
                                />
                            </div>
                            <div className="flex flex-col flex-1 gap-[8px]">
                                <Label htmlFor="citizenship">Citizenship</Label>
                                <Input
                                    type="text"
                                    id="citizenship"
                                    name="citizenship"
                                    placeholder="Enter employee citizenship"
                                />
                            </div>
                        </div>
                        <div className="flex mx-[20px] gap-[10px]">
                             <div className="flex flex-col flex-1 gap-[8px]">
                                <Label htmlFor="maritial-status">Maritial Status</Label>
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
                      
                        <div className="flex mx-[20px] py-[12px]">
                            <Label htmlFor="contract">Contract Type</Label>
                            <RadioGroup defaultValue="permanent" className="flex ml-[50px]" value={contractType} onValueChange={setContractType}>
                                <div className="flex items-center space-x-2">
                                    <RadioGroupItem value="Permanent" id="permanent" />
                                    <Label htmlFor="permanent">Permanent</Label>
                                </div> 
                                <div className="flex items-center space-x-2">
                                    <RadioGroupItem value="Contract" id="contract" />
                                    <Label htmlFor="contract">Contract</Label>
                                </div>
                                <div className="flex items-center space-x-2">
                                    <RadioGroupItem value="Intern" id="intern" />
                                    <Label htmlFor="intern">Intern</Label>
                                </div>
                                <div className="flex items-center space-x-2">
                                    <RadioGroupItem value="Part-time" id="part-time" />
                                    <Label htmlFor="part-time">Part-time</Label>
                                </div>
                                <div className="flex items-center space-x-2">
                                    <RadioGroupItem value="Outsource" id="outsource" />
                                    <Label htmlFor="outsource">Outsource</Label>
                                </div>
                            </RadioGroup>
                            <input type="hidden" name="contract_type" value={contractType} />
                        </div>
                        <div className="flex mx-[20px] gap-[10px]">
                            <div className="flex flex-col flex-1 gap-[8px]">
                                <Label htmlFor="department">Department</Label>
                                <Popover open={openDep} onOpenChange={setOpenDep}>
                                <PopoverTrigger asChild>
                                    <button className="file:text-neutral-900 border-neutral-300 placeholder:text-neutral-300 selection:bg-primary selection:text-primary-foreground dark:bg-input/30 flex w-full min-w-0 rounded-md border bg-transparent px-4 py-3 text-base shadow-xs transition-[color,box-shadow] outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm">
                                    {departments.find(dep => dep.id === selectedDepartment)?.name ?? "Select department"}
                                    </button>
                                </PopoverTrigger>
                                <PopoverContent className="w-full p-0">
                                    <Command>
                                    <CommandInput placeholder="Search department..." />
                                    <CommandList>
                                        <CommandEmpty>No department found.</CommandEmpty>
                                        {departments.map(dep => (
                                        <CommandItem
                                            key={dep.id}
                                            onSelect={() => {
                                            handleSelectDepartment(dep.id);
                                            setOpenDep(false);
                                            }}
                                        >
                                            {dep.name}
                                        </CommandItem>
                                        ))}
                                    </CommandList>
                                    </Command>
                                </PopoverContent>
                                </Popover>
                            </div>
                            
                            <div className="flex flex-col flex-1 gap-[8px]">
                                <Label htmlFor="position">Position</Label>
                                <Popover open={openPos} onOpenChange={setOpenPos}>

                                <PopoverTrigger asChild>
                                    <button
                                    className={`file:text-neutral-900 border-neutral-300 placeholder:text-neutral-300 selection:bg-primary selection:text-primary-foreground dark:bg-input/30 flex w-full min-w-0 rounded-md border bg-transparent px-4 py-3 text-base shadow-xs transition-[color,box-shadow] outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm`}
                                    disabled={!selectedDepartment}
                                    >
                                    {selectedPosition?.Position ?? "Select position"}
                                    </button>
                                </PopoverTrigger>

                                <PopoverContent className="w-full p-0">
                                    <Command>
                                    <CommandInput
                                        placeholder="Search position..."
                                        disabled={!selectedDepartment}
                                        className={!selectedDepartment ? "opacity-50 pointer-events-none" : ""}
                                    />
                                    <CommandList>
                                        <CommandEmpty>No position found.</CommandEmpty>
                                        {positions.map((pos) => (
                                        <CommandItem
                                            key={pos.id_position}
                                            onSelect={() => {
                                            if (!selectedDepartment) return; // safety guard
                                            setSelectedPosition(pos);
                                            setOpenPos(false);
                                            }}
                                            className={!selectedDepartment ? "opacity-50 pointer-events-none" : ""}
                                        >
                                            {pos.Position}
                                        </CommandItem>
                                        ))}
                                    </CommandList>
                                    </Command>
                                </PopoverContent>
                                </Popover>
                            </div>
                            


                        </div>
                        <div className="flex mx-[20px] gap-[10px]">
                            <div className="flex flex-col flex-1 gap-[8px]">
                                <PhoneInput 
                                    placeholder="Enter employee phone number"
                                />
                            </div>
                            <div className="flex flex-col flex-1 gap-[8px]">
                                <Label htmlFor="email">Email</Label>
                                <Input
                                    type="email"
                                    id="email"
                                    name="email"
                                    placeholder="Enter employee email"
                                />
                            </div>
                        </div>
                        <div className="flex mx-[20px] gap-[10px]">
                            <div className="flex flex-col flex-1 gap-[8px]">
                                <Label htmlFor="bank">Bank</Label>
                                <Popover open={openBank} onOpenChange={setOpenBank}>
                                    <PopoverTrigger asChild>
                                    <button
                                        className="file:text-neutral-900 border-neutral-300 placeholder:text-neutral-300 selection:bg-primary selection:text-primary-foreground dark:bg-input/30 flex w-full min-w-0 rounded-md border bg-transparent px-4 py-3 text-base shadow-xs transition-[color,box-shadow] outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm"
                                    >
                                        {selectedBank
                                        ? bank?.find((b) => b.code === selectedBank)?.name
                                        : "Select employee bank"}
                                    </button>
                                    </PopoverTrigger>
                                    <PopoverContent className="w-full p-0">
                                    <Command>
                                        <CommandInput placeholder="Search bank..." />
                                        <CommandList>
                                        <CommandEmpty>No bank found.</CommandEmpty>
                                        {bank?.map((b) => (
                                            <CommandItem
                                            key={b.code}
                                            onSelect={() => {
                                                setSelectedBank(b.code)
                                                setOpenBank(false)
                                            }}
                                            >
                                            {b.name}
                                            </CommandItem>
                                        ))}
                                        </CommandList>
                                    </Command>
                                    </PopoverContent>
                                </Popover>
                                </div>
                            {/* <div className="flex flex-col flex-1 gap-[8px]">
                                <Label htmlFor="bank">Bank</Label>
                                <Select onValueChange={(value) => setSelectedBank(value)}>
                                    <SelectTrigger className="w-full !h-[46px] !border !border-neutral-300 !text-neutral-300">
                                    <SelectValue placeholder="Select employee bank" />
                                    </SelectTrigger>
                                    <SelectContent>
                                    {bank?.map((b) => (
                                        <SelectItem key={b.code} value={b.code}>
                                            {b.name}
                                        </SelectItem>
                                    ))}
                                    </SelectContent>
                                </Select>
                            </div> */}

                            {/* <div className="flex flex-col flex-1 gap-[8px]">
                                <Label htmlFor="bank">Bank</Label>
                                <Input
                                    type="text"
                                    id="bank"
                                    name="bank"
                                    placeholder="Enter employee bank"
                                />
                            </div> */}
                            <div className="flex flex-col flex-1 gap-[8px]">
                                <Label htmlFor="Account_Number">Account Number</Label>
                                <Input
                                    type="number"
                                    id="account_number"
                                    name="account_number"
                                    placeholder="Enter employee Account Number"
                                />
                            </div>
                        </div>
                        <div className="flex mx-[20px] gap-[10px]">
                            
                            <PasswordInput id="password" name="password" placeholder="Enter employee password or leave blank for default"></PasswordInput>
                            
                        </div>
                    </Card>
                </div>
                <div className="flex mx-[20px] gap-[10px] justify-end">
                    <Link href="/employee">
                        <Button className="w-[80px]" variant="outline" size="lg">
                            Cancel
                        </Button>
                    </Link>
                    
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
                        if (!preventRedirect) {
                                // Jika bukan karena tombol Add Another, redirect
                                router.push(`/employee`);
                            } else {
                                // reset flag supaya dialog bisa redirect normal di lain waktu
                                setPreventRedirect(false);
                            }
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
                            <Button
                                variant="outline"
                                className="max-w-[180px] whitespace-nowrap"
                                onClick={() => {
                                // Reset form & close popup
                                formRef.current?.reset();
                                setSuccess(false);
                                setAvatarPreview("");
                                setContractType("");
                                setGender("");
                                setEducation("");
                                setBloodType("");
                                setMaritalStatus("");
                                setReligion("");
                                setSelectedBank(null);
                                setSelectedDepartment(null);
                                setSelectedPosition(null);
                                setPreventRedirect(true); // cegah redirect saat dialog close
                                }}
                            >
                                Add Another Employee
                            </Button>
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
            </Card>
            </form>
        </div>

    </Sidebar>
  );
}
