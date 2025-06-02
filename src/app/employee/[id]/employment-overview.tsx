'user client'

import { Card, CardContent } from "@/components/ui/card";
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
    DialogFooter,
    DialogClose,
    } from "@/components/ui/dialog"
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
import { EmployeeResponse } from "@/types/employee";
import { useEffect, useState } from "react";
import { Spinner } from "@/components/ui/spinner";
import Cookies from "js-cookie";

type Props = {
  employeeData?: EmployeeResponse;
    onUpdate: () => void;
};
const EmploymentOverview = ({ employeeData, onUpdate }: Props) => {
    const [contractType, setContractType] = useState("");
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
    if (employeeData?.employee) {
        if (employeeData.employee.contract_type) setContractType(employeeData.employee.contract_type);
    }
    }, [employeeData?.employee]);




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
            setIsLoading(true);
            const token = "1|9p4rp7VWgX8z4umUP9l1fJj3eyXI20abvAAViakR32d8c87a" // pastikan token sudah disimpan di login
            const resBank = await fetch("http://127.0.0.1:8000/api/bank", {
                headers: {
                "Authorization": `Bearer ${Cookies.get("token")}`,
                "Content-Type": "application/json"
                }
            })
            const resDepPos = await fetch("http://127.0.0.1:8000/api/department-position", {
                headers: {
                "Authorization": `Bearer ${Cookies.get("token")}`,
                "Content-Type": "application/json"
                }
            })
    
            if (!resBank.ok) throw new Error("Failed to fetch bank")
            const dataBank = await resBank.json()
            setBank(dataBank)

            if (!resDepPos.ok) throw new Error("Failed to fetch Department & Position")
            const dataDepPos: DepartmentPosition[] = await resDepPos.json();

            setDepPosData(dataDepPos);
            const uniqueDepartments = Array.from(
                new Map(
                    dataDepPos.map(item => [item.id_department, { id: item.id_department, name: item.Department }])
                ).values()
                );
            setDepartments(uniqueDepartments);
            } catch (error) {
            console.error("Error fetching data:", error)
            } finally {
                setIsLoading(false);
            }
        }
    
        fetchData()
        }, []
    )
    const [selectedDepartmentId, setSelectedDepartmentId] = useState<string | null>(null);

    const handleSelectDepartment = (dep: string) => {
        setSelectedDepartment(dep);
        setPositions(depPosData.filter(d => d.id_department === dep));
        setSelectedPosition(null); // reset position
    };
    // const handleSelectDepartment = (depName: string) => {
    //     setSelectedDepartment(depName);
    //     // Filter posisi berdasarkan nama department
    //     const filteredPositions = depPosData.filter(d => d.Department === depName);
    //     setPositions(filteredPositions);
    //     setSelectedPosition(null); // reset posisi

    //     // Ambil id_department dari data depPosData yang pertama cocok dengan department name
    //     const dep = depPosData.find(d => d.Department === depName);
    //     setSelectedDepartmentId(dep ? dep.id_department : null);
    // };

    // const handleSelectDepartment = (dep: string) => {
    //     setSelectedDepartment(dep);
    //     setPositions(depPosData.filter(d => d.Department === dep));
    //     setSelectedPosition(null); // reset position
    // }; 
    useEffect(() => {
        if (employeeData && depPosData.length > 0 && bank) {
            // Set Department & Position
            const department = depPosData.find(dep => dep.id_department === employeeData.department_id);
            if (department) {
                setSelectedDepartment(department.id_department);
                const filteredPositions = depPosData.filter(d => d.Department === department.Department);
                setPositions(filteredPositions);

                const position = filteredPositions.find(pos => pos.id_position === employeeData.employee.position_id);
                if (position) {
                    setSelectedPosition(position);
                }
            }

            // Set Bank
            const foundBank = bank.find(b => b.code === employeeData.employee.bank_code); // assuming bank_id is the code
            if (foundBank) {
            setSelectedBank(foundBank.code);
            }
        }
    }, [employeeData, depPosData, bank]);

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
            if (selectedBank) formData.append("bank_code", selectedBank);
            if (selectedPosition?.id_position)
                formData.append("position_id", selectedPosition.id_position.toString());
            if (selectedDepartmentId)
                formData.append("department_id", selectedDepartmentId);
            console.log("Submitting data:", Object.fromEntries(formData.entries()));   
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
    const [isDialogAOpen, setDialogAOpen] = useState(false);
    const handleOkClick = async () => {
        onUpdate(); // panggil fetchData() di parent
        setDialogAOpen(false)
        setSuccess(false); // reset state jika perlu

    };
    return(
         <Card className="flex mr-[20px] gap-[15px] rounded-[15px] border border-black/15 bg-white shadow-[0px_2px_2px_0px_rgba(0,0,0,0.25)] overflow-hidden">
            <div className="flex mx-[20px] justify-between">
                
                <p className="justify-center text-lg font-medium whitespace-nowrap">Employment Overview</p>
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
                                <DialogTitle>Edit Employment Overview</DialogTitle>
                                <DialogDescription>
                                    
                                    
                                </DialogDescription>
                            </DialogHeader>
                            {isLoading ? ( 
                                <Card className="flex-1 gap-[15px] rounded-[15px] border border-black/15 bg-white shadow-[0px_2px_2px_0px_rgba(0,0,0,0.25)] overflow-hidden">
                                    <Spinner className="w-full mx-[20px] my-[10px]" size="medium" />
                                    </Card>
                                    ) : (
                            <div>
                                <form id="employeeForm" onSubmit={(e) => {
                                    e.preventDefault(); // mencegah reload halaman
                                    handleSubmitForm();
                                }}>
                                    <div className="flex flex-col gap-[15px] mt-[15px]">
                                        <div className="flex gap-[10px]">
                                            <div className="flex flex-col flex-1 gap-[8px]">
                                                <Label htmlFor="department">Department</Label>
                                                <Popover open={openDep} onOpenChange={setOpenDep}>
                                                <PopoverTrigger asChild>
                                                    <button className="file:text-neutral-900 border-neutral-300 placeholder:text-neutral-300 selection:bg-primary selection:text-primary-foreground dark:bg-input/30 flex w-full min-w-0 rounded-md border bg-transparent px-4 py-3 text-base shadow-xs transition-[color,box-shadow] outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm">
                                                    {departments.find(dep => dep.id === selectedDepartment)?.name ?? "Select department"}
                                                    </button>
                                                </PopoverTrigger>
                                                <PopoverContent className="w-full p-0" onWheel={(e) => {e.stopPropagation();}}>
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

                                                <PopoverContent className="w-full p-0" onWheel={(e) => {e.stopPropagation();}}>
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
                                        <div className="flex gap-[10px]">
                                            <div className="flex flex-col flex-1 gap-[8px]">
                                                <Label htmlFor="salary">Salary (IDR)</Label>
                                                <Input
                                                    type="number"
                                                    id="salary"
                                                    name="salary"
                                                    placeholder="Enter employee salary"
                                                    defaultValue={employeeData?.employee.salary??"0"}
                                                    className="no-spinner"
                                                />
                                            </div>
                                            <div className="flex flex-col flex-1 gap-[8px]">
                                                <Label htmlFor="contract type">Contract Type</Label>
                                                <Select value={contractType} onValueChange={setContractType}>
                                                    <SelectTrigger className="w-full !h-[46px] !border !border-neutral-300 !text-neutral-300">
                                                        <SelectValue placeholder="Select employee contract type" />
                                                    </SelectTrigger>
                                                    <SelectContent>
                                                        <SelectItem value="Permanent">Permanent</SelectItem>
                                                        <SelectItem value="Contract">Contract</SelectItem>
                                                        <SelectItem value="Internship">Internship</SelectItem>
                                               
                                                    </SelectContent>
                                                </Select>
                                            </div>
                                        </div>
                                        <div className="flex gap-[10px]">
                                            <div className="flex flex-col flex-1 gap-[8px]">
                                                <Label htmlFor="bank">Bank</Label>
                                                <Popover open={openBank} onOpenChange={setOpenBank}>
                                                    <PopoverTrigger asChild>
                                                    <button
                                                        className="file:text-neutral-900 border-neutral-300 placeholder:text-neutral-300 selection:bg-primary selection:text-primary-foreground dark:bg-input/30 flex w-full min-w-0 rounded-md border bg-transparent px-4 py-3 text-base shadow-xs transition-[color,box-shadow] outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm"
                                                    >
                                                        {bank?.find((b) => b.code === selectedBank)?.name ?? "Select employee bank"}

                                                    </button>
                                                    </PopoverTrigger>
                                                    <PopoverContent className="w-full p-0" onWheel={(e) => {e.stopPropagation();}}>
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
                                            <div className="flex flex-col flex-1 gap-[8px]">
                                                <Label htmlFor="Account_Number">Account Number</Label>
                                                <Input
                                                    type="number"
                                                    id="account_number"
                                                    name="account_number"
                                                    placeholder="Enter employee Account Number"
                                                    defaultValue={employeeData?.employee.account_number??""}
                                                    className="no-spinner"
                                                />
                                            </div>
                                        </div>
                                        {/* <input type="hidden" name="position_id" value={selectedPosition?.id_position.toString() ?? ""} />
                                        <input type="hidden" name="bank_code" value={selectedBank ?? ""} />
                                        <input type="hidden" name="contract_type" value={contractType} /> */}
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
                            )}
                        </DialogContent>
                    </Dialog>
                </div>
                
            </div>
            <div className="flex mx-[20px] gap-[10px]">
                
                <div className="flex flex-col flex-1 gap-[8px]">
                    <Label>Department</Label>
                    <span className="text-gray-600 border border-neutral-300 rounded-md px-4 py-3 overflow-hidden">{employeeData?.department_name ?? "-"}</span> 
                </div>
                <div className="flex flex-col flex-1 gap-[8px]">
                    <Label>Position</Label>
                    <span className="text-gray-600 border border-neutral-300 rounded-md px-4 py-3 overflow-hidden">{employeeData?.position_name ?? "-"}</span> 
                </div>
            </div>
            <div className="flex mx-[20px] gap-[10px]">
                <div className="flex flex-col flex-1 gap-[8px]">
                    <Label>Bank</Label>
                    <span className="text-gray-600 border border-neutral-300 rounded-md px-4 py-3 overflow-hidden">{employeeData?.bank_name ?? "-"}</span> 
                </div>
                <div className="flex flex-col flex-1 gap-[8px]">
                    <Label>Account Number</Label>
                    <span className="text-gray-600 border border-neutral-300 rounded-md px-4 py-3 overflow-hidden">{employeeData?.employee.account_number ?? "-"}</span> 
                </div>
            </div>
            <div className="flex mx-[20px] gap-[10px]">
                <div className="flex flex-col flex-1 gap-[8px]">
                    <Label>Salary</Label>
                    <span className="text-gray-600 border border-neutral-300 rounded-md px-4 py-3 overflow-hidden">IDR {employeeData?.employee.salary ?? "-"}</span> 
                </div>
                <div className="flex flex-col flex-1 gap-[8px]">
                    <Label>Contract Type</Label>
                    <span className="text-gray-600 border border-neutral-300 rounded-md px-4 py-3 overflow-hidden">{employeeData?.employee.contract_type ?? "-"}</span> 
                </div>
            </div>
            <div className="flex mx-[20px] gap-[10px]">
                <div className="flex flex-col flex-1 gap-[8px]">
                    <Label>Join Date</Label>
                    <span className="text-gray-600 border border-neutral-300 rounded-md px-4 py-3 overflow-hidden">{employeeData?.employee.join_date ?? "-"}</span> 
                </div>
                <div className="flex flex-col flex-1 gap-[8px]">
                    <Label>Exit Date</Label>
                    <span className="text-gray-600 border border-neutral-300 rounded-md px-4 py-3 overflow-hidden">{employeeData?.employee.exit_date ?? "-"}</span> 
                </div>
            </div>
        </Card>
    
    );
}

export default EmploymentOverview;