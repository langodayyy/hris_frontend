"use client";
import  Sidebar  from "../../../components/sidebar";
import { Metadata } from "next";
import Link from 'next/link';
import { Card, CardContent } from "@/components/ui/card";
import FormPhoneInput from "@/components/ui/phoneInput";

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

import React, { useEffect, useRef, useState } from 'react';
import { Dialog, DialogClose, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";

import { Spinner } from "@/components/ui/spinner";


import { useForm } from "@felte/react";
import { validator } from "@felte/validator-zod";
import { z } from "zod";
import { reporter } from "@felte/reporter-react";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";


import { useRouter } from "next/navigation";

import { useFormContext } from "@/context/FormContext";
import Cookies from "js-cookie";
import { Toaster, toast } from "sonner";
import imageCompression from "browser-image-compression";

const employeeSchema = z.object({
    employee_photo: z.any().optional(),
    first_name: z.string().min(1, { message: 'First name is required' }),
    last_name: z.string().min(1, { message: 'Last name is required' }),
    nik: z.string().length(16, { message: 'NIK must be 16 digits' }),
    gender: z.string().nonempty({ message: 'Gender is required' }).refine(val => ['Male', 'Female'].includes(val), {message: 'gender must be Male or Female'}),
    birth_place: z.string().min(1, { message: 'Birth place is required' }),
    birth_date: z.string().min(1, { message: 'Birth date is required' }),
    education: z.string()
                .nonempty({ message: 'Education is required' })
                .refine(val => ['SD', 'SMP', 'SMA', 'D1', 'D2', 'D3', 'D4', 'S1', 'S2', 'S3', 'Other'].includes(val), {
                message: 'Education must be one of SD, SMP, SMA, D1, D2, D3, D4, S1, S2, S3 or Other',
                }),
    blood_type: z.string()
                .nonempty({ message: 'Blood type is required' })
                .refine(val => ['A', 'B', 'AB', 'O', 'Unknown'].includes(val), {
                message: 'Blood type must be one of A, B, AB, O or Unknown',
                }),
    address: z.string().min(1, { message: 'Address is required' }),
    citizenship: z.string().min(1, { message: 'Citizenship is required' }),
    marital_status: z.string()
                .nonempty({ message: 'Marital status is required' })
                .refine(val => ['Single', 'Married', 'Divorced', 'Widowed'].includes(val), {
                message: 'Marital status must be one of Single, Married, Divorced or Widowed',
                }),
    religion: z.string()
                .nonempty({ message: 'Religion is required' })
                .refine(val => ['Islam', 'Christian', 'Catholic', 'Hindu', 'Buddha', 'Confucianism', 'Other'].includes(val), {
                message: 'Religion must be one of Islam, Christian, Catholic, Hindu, Buddha, Confucianism or Other',
                }),
    contract_type: z.string()
                .nonempty({ message: 'Contract type is required' })
                .refine(val => ['Permanent', 'Contract', 'Internship'].includes(val), {
                message: 'Contract type must be one of Permanent, Contract, Internship',
                }),
    join_date: z.string().min(1, { message: 'Join date is required' }),
    contract_end: z.string().optional(),
    department_id: z.number().min(0, { message: 'Department is required' }),
    position_id: z.number().min(0, { message: 'Position is required' }),
    phone: z.string().min(10, { message: 'Phone number is invalid' }),
    email: z.string().email({ message: 'Invalid email address' }),
    }).superRefine((data, ctx) => {
    if (data.contract_type !== 'Permanent' && data.contract_end ==='') {
        ctx.addIssue({
            code: z.ZodIssueCode.custom,
            path: ['contract_end'],
            message: 'Contract end date is required',
        });
    }
});

// type EmployeeFormValues = z.infer<typeof employeeSchema>;

export default function AddEmployeeForm() {
    const [selectedPhoto, setSelectedPhoto] = useState<File | null>(null);
    const selectedPhotoRef = useRef<File | null>(null);
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
            setSelectedPhoto(file);
            selectedPhotoRef.current = file;
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
            const resBank = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/bank`, {
              headers: {
                "Authorization": `Bearer ${Cookies.get("token")}`,
                "Content-Type": "application/json"
              }
            })
            const resDepPos = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/department-position`, {
              headers: {
                "Authorization": `Bearer ${Cookies.get("token")}`,
                "Content-Type": "application/json"
              }
            })
    
            const dataBank = await resBank.json()
            if (!resBank.ok) {
                throw dataBank; 
            }
            setBank(dataBank)

            const dataDepPos: DepartmentPosition[] = await resDepPos.json();
            if (!resDepPos.ok) {
                throw dataDepPos; 
            }
            setDepPosData(dataDepPos);
            const uniqueDepartments = Array.from(
                new Map(
                    dataDepPos.map(item => [item.id_department, { id: item.id_department, name: item.Department }])
                ).values()
            );
            setDepartments(uniqueDepartments);

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

    const { setErrors } = useFormContext();

    const [phone, setPhone] = useState<string | undefined>(undefined);
    const MAX_FILE_SIZE = 100 * 1024;
    const { form, errors, setFields } = useForm({
    extend: [validator({ schema: employeeSchema }), reporter()],
    onSubmit: async (values) => {
        setLoading(true);
        setError(false);
        setSuccess(false);

        try {
        const formData = new FormData();

        for (const [key, value] of Object.entries(values)) {
            if (value !== undefined && value !== null) {
                formData.append(key, String(value));
            }
        }
        let avatarToUpload = selectedPhotoRef.current;
        if (selectedPhotoRef.current && selectedPhotoRef.current.size > MAX_FILE_SIZE) {
            try {
                const options = {
                maxSizeMB: 0.1,
                maxWidthOrHeight: 224,
                useWebWorker: true,
                fileType: 'image/jpeg',
                initialQuality: 0.6,
                };

                const compressedFile = await imageCompression(selectedPhotoRef.current, options);
                avatarToUpload = compressedFile;
            } catch (compressErr) {
                console.error("Gagal kompres gambar:", compressErr);
            }
        }
        
        if (avatarToUpload) {
            formData.append("employee_photo", avatarToUpload);
        }
        // Tambahkan manual dari state (jika tidak ada di Felte field)
        if (selectedBank) formData.append("bank_code", selectedBank);
        if (selectedPosition?.id_position)
            formData.append("position_id", selectedPosition.id_position);


        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/employees`, {
            method: "POST",
            headers: {
            Authorization: `Bearer ${Cookies.get("token")}`,
            },
            body: formData,
        });


        const responseData = await response.json();
        if (!response.ok) {
            throw responseData; 
        }
        toast.success('Employee created successfully')
        setSuccess(true);
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
    },
    });


  return (
    <Sidebar title="Employee Database">
    <Toaster position="bottom-right" expand={true} richColors closeButton></Toaster>
    <form ref={form} 
          method="post"
    >
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
                        // name="employee_photo"
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
                        {errors().first_name && <p className="text-red-500">{errors().first_name[0]}</p>}
                    </div>
                    <div className="flex flex-col flex-1 gap-[8px]">
                        <Label htmlFor="Last Name">Last Name</Label>
                        <Input
                            type="text"
                            id="last_name"
                            name="last_name"
                            placeholder="Enter employee last name"
                        />
                        {errors().last_name && <p className="text-red-500">{errors().last_name[0]}</p>}
                    </div>
                </div>
                <div className="flex mx-[20px] gap-[10px]">
                    
                    <div className="flex flex-col flex-1 gap-[8px]">
                        <Label htmlFor="NIK">NIK</Label>
                        <Input
                            type="text"
                            id="nik"
                            name="nik"
                            inputMode="numeric"     // mobile keyboard angka
                            pattern="\d*"
                            placeholder="Enter employee NIK"
                            onInput={(e) => {
    
                                e.currentTarget.value = e.currentTarget.value.replace(/\D/g, '');
                            }}
                        />
                        {errors().nik && <p className="text-red-500">{errors().nik[0]}</p>}
                    </div>
                    <div className="flex flex-col flex-1 gap-[8px]">
                        <Label htmlFor="gender">Gender</Label>
                        <Select value={gender}  
                        onValueChange={(value) => {
                            setGender(value);
                            setFields("gender", value); // sinkron ke Felte
                        }}>
                            <SelectTrigger className="w-full !h-[46px] !border !border-neutral-300 !text-neutral-300">
                                <SelectValue placeholder="Select employee gender" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="Male">Male</SelectItem>
                                <SelectItem value="Female">Female</SelectItem>
                            </SelectContent>
                        </Select>
                        {errors().gender && <p className="text-red-500">{errors().gender[0]}</p>}

                        <input type="hidden" id="gender" name="gender" value={gender} />
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
                        {errors().birth_place && <p className="text-red-500">{errors().birth_place[0]}</p>}
                    </div>
                    <div className="flex flex-col flex-1 gap-[8px]">
                        <Label htmlFor="birth darte">Birth Date</Label>
                        <Input
                            type="date"
                            id="birth_date"
                            name="birth_date"
                            placeholder="Enter employee birth date"
                        />
                        {errors().birth_date && <p className="text-red-500">{errors().birth_date[0]}</p>}
                    </div>
                </div>
                <div className="flex mx-[20px] gap-[10px]">
                    
                    <div className="flex flex-col flex-1 gap-[8px]">
                        <Label htmlFor="Education">Education</Label>
                        <Select value={education}
                            onValueChange={(value) => {
                            setEducation(value);
                            setFields("education", value); // sinkron ke Felte
                        }}>
                            <SelectTrigger className="w-full !h-[46px] !border !border-neutral-300 !text-neutral-300">
                                <SelectValue placeholder="Select employee education" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="SD">SD</SelectItem>
                                <SelectItem value="SMP">SMP</SelectItem>
                                <SelectItem value="SMA">SMA</SelectItem>
                                <SelectItem value="D1">D1</SelectItem>
                                <SelectItem value="D2">D2</SelectItem>
                                <SelectItem value="D3">D3</SelectItem>
                                <SelectItem value="D4">D4</SelectItem>
                                <SelectItem value="S1">S1</SelectItem>
                                <SelectItem value="S2">S2</SelectItem>
                                <SelectItem value="S3">S3</SelectItem>
                                <SelectItem value="Other">Other</SelectItem>
                            </SelectContent>
                        </Select>
                        {errors().education && <p className="text-red-500">{errors().education[0]}</p>}
                            <input type="hidden" name="education" value={education} />
                    </div>
                    <div className="flex flex-col flex-1 gap-[8px]">
                        <Label htmlFor="blood-type">Blood Type</Label>
                        <Select value={bloodType}
                            onValueChange={(value) => {
                            setBloodType(value);
                            setFields("blood_type", value); // sinkron ke Felte
                            }}
                        >
                            <SelectTrigger className="w-full !h-[46px] !border !border-neutral-300 !text-neutral-300">
                            <SelectValue placeholder="Select employee blood type" />
                            </SelectTrigger>
                            <SelectContent>
                            <SelectItem value="A">A</SelectItem>
                            <SelectItem value="B">B</SelectItem>
                            <SelectItem value="AB">AB</SelectItem>
                            <SelectItem value="O">O</SelectItem>
                            <SelectItem value="Unknown">Unknown</SelectItem>
                            </SelectContent>
                        </Select>
                        {errors().blood_type && <p className="text-red-500">{errors().blood_type[0]}</p>}
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
                        {errors().address && <p className="text-red-500">{errors().address[0]}</p>}
                    </div>
                    <div className="flex flex-col flex-1 gap-[8px]">
                        <Label htmlFor="citizenship">Citizenship</Label>
                        <Input
                            type="text"
                            id="citizenship"
                            name="citizenship"
                            placeholder="Enter employee citizenship"
                        />
                        {errors().citizenship && <p className="text-red-500">{errors().citizenship[0]}</p>}
                    </div>
                </div>
                <div className="flex mx-[20px] gap-[10px]">
                    <div className="flex flex-col flex-1 gap-[8px]">
                        <Label htmlFor="maritial-status">Maritial Status</Label>
                        <Select value={maritalStatus}
                            onValueChange={(value) => {
                            setMaritalStatus(value);
                            setFields("marital_status", value); // sinkron ke Felte
                            }}
                        >
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
                        {errors().marital_status && <p className="text-red-500">{errors().marital_status[0]}</p>}
                        <input type="hidden" name="marital_status" value={maritalStatus} />
                    </div>
                    <div className="flex flex-col flex-1 gap-[8px]">
                        <Label htmlFor="religion">Religion</Label>
                        <Select value={religion}
                            onValueChange={(value) => {
                            setReligion(value);
                            setFields("religion", value); // sinkron ke Felte
                            }}
                        >
                            <SelectTrigger className="w-full !h-[46px] !border !border-neutral-300 !text-neutral-300">
                            <SelectValue placeholder="Select employee religion" />
                            </SelectTrigger>
                            <SelectContent>
                            <SelectItem value="Islam">Islam</SelectItem>
                            <SelectItem value="Christian">Christian</SelectItem>
                            <SelectItem value="Catholic">Catholic</SelectItem>
                            <SelectItem value="Hindu">Hindu</SelectItem>
                            <SelectItem value="Buddha">Buddha</SelectItem>
                            <SelectItem value="Confucianism">Confucianism</SelectItem>
                            <SelectItem value="Other">Other</SelectItem>
                            </SelectContent>
                        </Select>
                        {errors().religion && <p className="text-red-500">{errors().religion[0]}</p>}
                        <input type="hidden" name="religion" value={religion} />
                    </div>
                </div>
                <div className="mx-[20px]">
                    <hr className="border-t border-neutral-200 my-[16px]" />
                </div>

                <div className="flex mx-[20px] gap-[10px]">
                    <div className="flex flex-col flex-1 gap-[8px]">
                        <Label htmlFor="contract_type">Contract Type</Label>
                        <Select value={contractType}
                            onValueChange={(value) => {
                            setContractType(value);
                            setFields("contract_type", value); // sinkron ke Felte
                            }}
                        >
                            <SelectTrigger className="w-full !h-[46px] !border !border-neutral-300 !text-neutral-300">
                                <SelectValue placeholder="Select employee contract type" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="Permanent">Permanent</SelectItem>
                                <SelectItem value="Contract">Contract</SelectItem>
                                <SelectItem value="Internship">Internship</SelectItem>
                            </SelectContent>
                        </Select>
                        {errors().contract_type && <p className="text-red-500">{errors().contract_type[0]}</p>}
                        <input type="hidden" name="contract_type" value={contractType} />
                    </div>
                </div>
                <div className="flex mx-[20px] gap-[10px]">
                        <div className="flex flex-col flex-1 gap-[8px]">
                            <Label htmlFor="join_date">Join Date</Label>
                            <Input
                                type="date"
                                id="join_date"
                                name="join_date"
                                placeholder="Enter employee join date" />
                            {errors().join_date && <p className="text-red-500">{errors().join_date[0]}</p>}
                        </div>
                    { contractType!=="Permanent" && contractType!=="" && (
                        <>
                            <div className="flex flex-col flex-1 gap-[8px]">
                                <Label htmlFor="contract_end">Contract End</Label>
                                <Input
                                    type="date"
                                    id="contract_end"
                                    name="contract_end"
                                    placeholder="Enter employee contract end"/>
                                {errors().contract_end && <p className="text-red-500">{errors().contract_end[0]}</p>}
                            </div>
                            
                        </>
                    )}
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
                                    setFields('department_id', dep.id)
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
                        {errors().department_id && <p className="text-red-500">{errors().department_id[0]}</p>}
                        
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
                                    setFields("position_id", pos.id_position);
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
                        {errors().position_id && <p className="text-red-500">{errors().position_id[0]}</p>}
                    </div>
                </div>
                  <div className="mx-[20px]">
                    <hr className="border-t border-neutral-200 my-[16px]" />
                </div>
                <div className="flex mx-[20px] gap-[10px]">
                    <div className="flex flex-col flex-1 gap-[8px]">
                        <FormPhoneInput placeholder="Enter employee phone number" value={phone} onValueChange={(value) => {
                        setPhone(value);
                        setFields("phone", value); // sinkronisasi ke Felte
                        }} />
                        <input type="hidden" name="phone" value={phone ?? ""} />
                        {errors().phone && <p className="text-red-500">{errors().phone[0]}</p>}
                    </div>
                    <div className="flex flex-col flex-1 gap-[8px]">
                        <Label htmlFor="email">Email</Label>
                        <Input
                            type="email"
                            id="email"
                            name="email"
                            placeholder="Enter employee email"
                        />
                        {errors().email && <p className="text-red-500">{errors().email[0]}</p>}
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
                                        setFields('bank_code', b.code)
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
                    <div className="flex flex-col flex-1 gap-[8px]">
                        <Label htmlFor="salary">Salary</Label>
                        <Input
                        type="number"
                        id="salary"
                        name="salary"
                        placeholder="Enter Salary"
                        className="no-spinner"
                        />
                    </div>
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
            open={success}
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
                <DialogTitle>{"Success!"}</DialogTitle>
                </DialogHeader>
                <div className="mt-2">
                {success && <p>Add another employee?</p>}
                </div>
                <DialogFooter className="mt-4 flex gap-2 justify-end">
                {success && (
                    <div className="flex gap-2 justify-end w-full">
                    <Button
                        variant="outline"
                        className="max-w-[180px] whitespace-nowrap"
                        onClick={() => {
                        // Reset form & close popup
                        // form.current?.reset(); // Reset elemen DOM form
                        // setFields({}); 
                        // setSuccess(false);
                        // setAvatarPreview("");
                        // setContractType("");
                        // setGender("");
                        // setEducation("");
                        // setBloodType("");
                        // setMaritalStatus("");
                        // setReligion("");
                        // setPhone(undefined);
                        // setSelectedBank(null);
                        // setSelectedDepartment(null);
                        // setSelectedPosition(null);
                          window.location.reload();
                            setPreventRedirect(true); 
                       
                        }}
                    >
                        Add Another Employee
                    </Button>
                    <DialogClose asChild>
                        <Button variant="default" className="max-w-[180px] whitespace-nowrap">Close</Button>
                    </DialogClose>
                    </div>
                )}
                </DialogFooter>
            </DialogContent>
            </Dialog>
        </div>
    </Card>
    </form>
    </Sidebar>
  );
}