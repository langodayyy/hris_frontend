"use client"
import * as React from "react";
import { useRef, useState, useEffect } from "react";
import {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuCheckboxItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import {
    Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
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
import { Input } from "@/components/ui/input";
import { FileUploader } from "@/components/ui/fileUploader";
import { Spinner } from "@/components/ui/spinner";
import {
  Command,
  CommandEmpty,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[]
  data: TData[]
  isLoading?: boolean
}

export function DataTable<TData, TValue>({
  columns,
  data,
  isLoading,
}: DataTableProps<TData, TValue>) {
    console.log("Data struktur:", data);

    const [sorting, setSorting] = React.useState<SortingState>([]);
    const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
    );
    const [filters, setFilters] = useState({
        position: [] as string[],
        workType: [] as string[],
        type: [] as string[],
        gender: [] as string[],
        status: [] as string[],
    });
    const [tempFilters, setTempFilters] = useState(filters);
    const applyClickedRef = useRef(false);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [currentPage, setCurrentPage] = useState(1);
    const table = useReactTable({
        data,
        columns,
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        getSortedRowModel: getSortedRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        state: {
        sorting,
        columnFilters,
        pagination: {
            pageIndex: currentPage - 1, // React Table menggunakan 0-based index
            pageSize: rowsPerPage,
        },
        },
        onSortingChange: setSorting,
        onColumnFiltersChange: setColumnFilters,
        onPaginationChange: (updater) => {
        const newPagination =
            typeof updater === "function"
            ? updater(table.getState().pagination)
            : updater;
        setCurrentPage(newPagination.pageIndex + 1); // Perbarui halaman (1-based index)
        setRowsPerPage(newPagination.pageSize); // Perbarui jumlah baris per halaman
        },
    })
    const handleRowsChange = (value: string) => {
        setRowsPerPage(Number(value));
        setCurrentPage(1); // reset ke halaman 1
    };

    const handlePageChange = (page: number) => {
        setCurrentPage(page);
    };

    // const totalPages = Math.ceil(data.length / rowsPerPage);
    const totalPages = Math.ceil(table.getFilteredRowModel().rows.length / rowsPerPage);
 

    const maxVisiblePages = 5;
    let startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2));
    let endPage = startPage + maxVisiblePages - 1;

    if (endPage > totalPages) {
        endPage = totalPages;
        startPage = Math.max(1, endPage - maxVisiblePages + 1);
    }

    const formRef = useRef<HTMLFormElement>(null);
      const fileInputRef = useRef<HTMLInputElement>(null);
    
      const handleFileDrop = (files: File[]) => {
        // Saat file di-drop, masukkan ke input file manual (untuk FormData)
        const dataTransfer = new DataTransfer();
        dataTransfer.items.add(files[0]);
        if (fileInputRef.current) {
          fileInputRef.current.files = dataTransfer.files;
        }
      };

    const [openDep, setOpenDep] = useState(false)
    const [openPos, setOpenPos] = useState(false)

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
           
            const resDepPos = await fetch("http://127.0.0.1:8000/api/department-position", {
            headers: {
                "Authorization": `Bearer ${token}`,
                "Content-Type": "application/json"
            }
            })
    


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
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState(false);
    const [employeeStatus, setEmployeeStatus] = useState("");
    const [contractType, setContractType] = useState("");
    const handleExportButton = async () => {
        setLoading(true);
        setError(false);
        setSuccess(false);

        try {
            const baseUrl = "http://127.0.0.1:8000/api/employees/export-csv";
            const params = new URLSearchParams();

            if (selectedPosition?.id_position) {
                params.append("position_id", selectedPosition.id_position.toString());
            }
            if (selectedDepartment) {
                params.append("department_id", selectedDepartment.toString());
            }

            if (employeeStatus && employeeStatus !== "All") {
                params.append("employee_status", employeeStatus);
            }
            if (contractType && contractType !== "All") {
                params.append("work_type", contractType);
            }

            

            const url = params.toString() ? `${baseUrl}?${params.toString()}` : baseUrl;
            
            console.log(departments);
            console.log(url);
            const response = await fetch(url, {
            method: "GET",
            headers: {
                "Authorization": "Bearer 1|9p4rp7VWgX8z4umUP9l1fJj3eyXI20abvAAViakR32d8c87a",
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

            setSuccess(true);
        } catch (err) {
            console.error("Submit error:", err);
            setError(true);
        } finally {
            setLoading(false);
        }
        };


      
  return (
    <>
    <div className="flex items-center py-4 gap-[10px]">
    <span className="w-[187px] text-lg flex-none">Employee Overview</span>
    <Input
        placeholder="Search Employee Name"
        icon={<svg
            width="20"
            height="21"
            viewBox="0 0 20 21"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
        >
            <path
                d="M17.5 18L13.875 14.375M15.8333 9.66667C15.8333 13.3486 12.8486 16.3333 9.16667 16.3333C5.48477 16.3333 2.5 13.3486 2.5 9.66667C2.5 5.98477 5.48477 3 9.16667 3C12.8486 3 15.8333 5.98477 15.8333 9.66667Z"
                stroke="currentColor"
                strokeWidth="1.66667"
                strokeLinecap="round"
                strokeLinejoin="round" />
        </svg>}
        value={(table.getColumn("name")?.getFilterValue() as string) ?? ""}
        onChange={(event) => table.getColumn("name")?.setFilterValue(event.target.value)}
        className="w-full min-w-[200px]" />
    <div className="w-fit">
        <DropdownMenu
            onOpenChange={(open) => {
            if (!open && !applyClickedRef.current) {
                setFilters(tempFilters);
                table.setColumnFilters(
                    Object.entries(tempFilters)
                    .filter(([_, value]) => value.length > 0)
                    .map(([key, value]) => ({
                        id: key,
                        value,
                    }))
                );
            }
            if (!open) {
            applyClickedRef.current = false; // reset
            }
        }}
        >
            <DropdownMenuTrigger asChild>
                <Button
                    variant="outline"
                    icon={<svg
                        width="20"
                        height="21"
                        viewBox="0 0 20 21"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            d="M5 10.5H15M2.5 5.5H17.5M7.5 15.5H12.5"
                            stroke="currentColor"
                            strokeWidth="1.67"
                            strokeLinecap="round"
                            strokeLinejoin="round" />
                    </svg>}
                >
                    Filters
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-64">
                <DropdownMenuLabel>Position</DropdownMenuLabel>
                {["CEO", "Manager", "Staff", "Supervisor", "Assistant"].map((position) => (
                    <DropdownMenuCheckboxItem
                        key={position}
                        checked={tempFilters.position.includes(position)}
                        onSelect={(e) => e.preventDefault()}
                        onCheckedChange={() => {
                            setTempFilters((prev) => {
                                const exists = prev.position.includes(position);
                                return {
                                ...prev,
                                position: exists
                                    ? prev.position.filter((item) => item !== position)
                                    : [...prev.position, position],
                                };
                            });
                        }}

                    >
                        {position}
                    </DropdownMenuCheckboxItem>
                ))}
                <DropdownMenuSeparator />
                <DropdownMenuLabel>Work Type</DropdownMenuLabel>
                {["WFO", "WFH"].map((workType) => (
                    <DropdownMenuCheckboxItem
                        key={workType}
                        checked={tempFilters.workType.includes(workType)}
                        onSelect={(e) => e.preventDefault()}
                        onCheckedChange={() => {
                            setTempFilters((prev) => {
                                const exists = prev.workType.includes(workType);
                                return {
                                ...prev,
                                workType: exists
                                    ? prev.workType.filter((item) => item !== workType)
                                    : [...prev.workType, workType],
                                };
                            });
                        }}

                    >
                        {workType}
                    </DropdownMenuCheckboxItem>
                ))}
                <DropdownMenuSeparator />
                <DropdownMenuLabel>Type</DropdownMenuLabel>
                {["Permanent", "Contract", "Intern", "Part-time", "Outsource"].map((type) => (
                    <DropdownMenuCheckboxItem
                        key={type}
                        checked={tempFilters.type.includes(type)}
                        onSelect={(e) => e.preventDefault()}
                        onCheckedChange={() => {
                            setTempFilters((prev) => {
                                const exists = prev.type.includes(type);
                                return {
                                ...prev,
                                type: exists
                                    ? prev.type.filter((item) => item !== type)
                                    : [...prev.type, type],
                                };
                            });
                        }}

                    >
                        {type}
                    </DropdownMenuCheckboxItem>
                ))}
        
                <DropdownMenuSeparator />
                <DropdownMenuLabel>Gender</DropdownMenuLabel>
                    {["Male", "Female"].map((gender) => (
                        <DropdownMenuCheckboxItem
                            key={gender}
                            checked={tempFilters.gender.includes(gender)}
                            onSelect={(e) => e.preventDefault()}
                            onCheckedChange={() => {
                                setTempFilters((prev) => {
                                    const exists = prev.gender.includes(gender);
                                    return {
                                    ...prev,
                                    gender: exists
                                        ? prev.gender.filter((item) => item !== gender)
                                        : [...prev.gender, gender],
                                    };
                                });
                            }}

                        >
                        {gender}
                    </DropdownMenuCheckboxItem>
                ))}
                <DropdownMenuSeparator />
                <DropdownMenuLabel>Employee Status</DropdownMenuLabel>
                    {['Active', 'Retire', 'Resign', 'Fired'].map((status) => (
                        <DropdownMenuCheckboxItem
                            key={status}
                            checked={tempFilters.status.includes(status)}
                            onSelect={(e) => e.preventDefault()}
                            onCheckedChange={() => {
                                setTempFilters((prev) => {
                                    const exists = prev.status.includes(status);
                                    return {
                                    ...prev,
                                    status: exists
                                        ? prev.status.filter((item) => item !== status)
                                        : [...prev.status, status],
                                    };
                                });
                            }}

                        >
                        {status}
                    </DropdownMenuCheckboxItem>
                ))}
                <DropdownMenuSeparator />
                {/* Clear Filters Button */}
                <div className="flex flex-col px-2 py-1 gap-[10px]">
                    <Button
                        variant="default"
                        className="w-full"
                        onClick={() => {
                        setFilters(tempFilters);
                        table.setColumnFilters(
                            Object.entries(tempFilters)
                            .filter(([_, value]) => value.length > 0)
                            .map(([key, value]) => ({
                                id: key,
                                value,
                            }))
                        );
                        }}
                    >
                        Apply Filters
                    </Button>
                    <Button
                        variant="ghost"
                        className="w-full"
                        onClick={() => {
                            setTempFilters({
                                position: [],
                                workType: [],
                                type: [],
                                gender: [],
                                status: [],
                            });
                            table.setColumnFilters([]); // Clear all filters in the table
                        } }
                    >
                        Clear Filters
                    </Button>
                </div>
            </DropdownMenuContent>
        </DropdownMenu>
    </div>
    <div className="w-fit">
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
                    {/* <form id="exportForm" onSubmit={(e) => {
                                    e.preventDefault(); // mencegah reload halaman
                                    handleSubmitForm();
                        }}> */}
                        <div className="flex flex-col gap-[15px] mt-[15px]">
                            <div className="flex gap-[15px]">
                            {/* <div className="flex flex-col flex-1 gap-[8px]">
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
                            </div> */}
                            <div className="flex flex-col flex-1 gap-[8px]">
                                <Label htmlFor="department">Department</Label>
                                <Popover open={openDep} onOpenChange={setOpenDep}>
                                <PopoverTrigger asChild>
                                    <button className="file:text-neutral-900 border-neutral-300 placeholder:text-neutral-300 selection:bg-primary selection:text-primary-foreground dark:bg-input/30 flex w-full min-w-0 rounded-md border bg-transparent px-4 py-3 text-base shadow-xs transition-[color,box-shadow] outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm">
                                    {departments.find(dep => dep.id === selectedDepartment)?.name ?? "All Department"}
                                    </button>
                                </PopoverTrigger>
                                <PopoverContent className="w-full p-0">
                                    <Command>
                                    <CommandInput placeholder="Search department..." />
                                    <CommandList>
                                        <CommandEmpty>No department found.</CommandEmpty>
                                        <CommandItem
                                            key="all"
                                            onSelect={() => {
                                                handleSelectDepartment(""); // Atau "" kalau kamu simpan sebagai string kosong
                                                setOpenDep(false);
                                            }}
                                            >
                                            All Departments
                                        </CommandItem>
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
                                    {selectedPosition?.Position ?? "All Position"}
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
                                        <CommandItem
                                            key="all"
                                            onSelect={() => {
                                                setSelectedPosition(null); // Atau "" kalau kamu simpan sebagai string kosong
                                                setOpenPos(false);
                                            }}
                                            >
                                            All Position
                                        </CommandItem>
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
                            <div className="flex gap-[15px]">
                                <div className="flex flex-col flex-1 gap-[8px]">
                                <Label htmlFor="contract type">Contract Type</Label>
                                <Select value={contractType} onValueChange={setContractType}>
                                    <SelectTrigger className="w-full !h-[46px] !border !border-neutral-300 !text-neutral-300">
                                        <SelectValue placeholder="All Contract Type" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="All">All Contarct Type</SelectItem>
                                        <SelectItem value="Permanent">Permanent</SelectItem>
                                        <SelectItem value="Contract">Contract</SelectItem>
                                        <SelectItem value="intern">Intern</SelectItem>
                                        <SelectItem value="Part-time">Part Time</SelectItem>
                                        <SelectItem value="Outsource">Outsource</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                            <div className="flex flex-col flex-1 gap-[8px]">
                                <Label htmlFor="status">Employee Status</Label>
                                <Select value={employeeStatus} onValueChange={setEmployeeStatus}>
                                    <SelectTrigger className="w-full !h-[46px] !border !border-neutral-300 !text-neutral-300">
                                        <SelectValue placeholder="All Employee Status" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="All">All Employee Status</SelectItem>
                                        <SelectItem value="Active">Active</SelectItem>
                                        <SelectItem value="Retire">Retire</SelectItem>
                                        <SelectItem value="Resign">Resign</SelectItem>
                                        <SelectItem value="Fired">Fired</SelectItem>
                                    
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
                                
                                <Button className="w-[100px]" variant="default" onClick={handleExportButton} disabled={loading}>
                                    {!loading ? (
                                    <>
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
                                    </>
                                    ) : (
                                        <Spinner size="small" />
                                    )}
                                </Button>
                                {/* <Button className="w-[80px] h-[40px]" variant="default" type="submit" disabled={loading}>
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
                                </Button> */}
                            </div>
                        </div>
                    {/* </form> */}
                </div>
            </DialogContent>
        </Dialog>
    </div>
                    
    <div className="w-fit">
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
                <form
                    ref={formRef}
                    action="https://httpbin.org/post"
                    method="POST"
                    target="_blank"
                    encType="multipart/form-data"
                    className="space-y-4"
                >
                    {/* FileUploader tetap digunakan untuk UI, tapi file dimasukkan ke input tersembunyi */}
                    <FileUploader
                    onDrop={handleFileDrop}
                    accept={{ "text/csv": [".csv"] }}
                    type="Only support .csv file"
                    label="Drag your CSV file or"
                    description="Max 5 MB CSV file is allowed"
                    />

                    {/* Input file tersembunyi, tetap dibutuhkan untuk form submit */}
                    <input
                    type="file"
                    name="employee_csv"
                    accept=".csv"
                    ref={fileInputRef}
                    hidden
                    />
                    <div className="flex gap-[10px] justify-end">
                        <div>
                            <DialogClose asChild>
                                <Button className="w-[80px]" variant="outline" size="lg" type="button">
                                    Cancel
                                </Button>
                            </DialogClose>
                        </div>
                        <Button className="w-[80px]" variant="default" type="submit">Submit</Button>
                    </div>
                </form>

            </DialogContent>
        </Dialog>
    </div>
                  
    <div className="w-fit">
        <Button
            icon={<svg
                width="15"
                height="15"
                viewBox="0 0 15 15"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
            >
                <path
                    d="M7.5 3.125V11.875"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round" />
                <path
                    d="M3.125 7.5H11.875"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round" />
            </svg>}
            onClick={() => (window.location.href = "/employee/add")}
        >
            Add
        </Button>
    </div>
    </div>
    {isLoading ? (
        <Spinner size="large" />
    ) : (
    <div className="rounded-md border min-w-[815px]">
        
        <Table>
            <TableHeader>
                {table.getHeaderGroups().map((headerGroup) => (
                    <TableRow key={headerGroup.id}>
                        {headerGroup.headers.map((header) => {
                            return (
                                <TableHead key={header.id}>
                                    {header.isPlaceholder
                                        ? null
                                        : flexRender(
                                            header.column.columnDef.header,
                                            header.getContext()
                                        )}
                                </TableHead>
                            );
                        })}
                    </TableRow>
                ))}
            </TableHeader>
            <TableBody>
                {table.getRowModel().rows?.length ? (
                    table.getRowModel().rows.map((row) => (
                        <TableRow
                            key={row.id}
                            data-state={row.getIsSelected() && "selected"}
                        >
                            {row.getVisibleCells().map((cell) => (
                                <TableCell key={cell.id}>
                                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                </TableCell>
                            ))}
                        </TableRow>
                    ))
                ) : (
                    <TableRow>
                        <TableCell colSpan={columns.length} className="h-24 text-center">
                            No results.
                        </TableCell>
                    </TableRow>
                )}
            </TableBody>
        </Table>
    </div>)}
    <div className="w-full flex justify-between mt-[10px]">
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
                    {table.getFilteredRowModel().rows.length > 10 && (
                    <SelectItem value="25">25</SelectItem>
                    )}
                    {table.getFilteredRowModel().rows.length > 25 && (
                    <SelectItem value="50">50</SelectItem>
                    )}
                    {table.getFilteredRowModel().rows.length > 50 && (
                    <SelectItem value="100">100</SelectItem>
                    )}
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
                  onClick={() => handlePageChange(Math.max(currentPage - 1, 1))}
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

              {Array.from({ length: endPage - startPage + 1 }).map((_, i) => {
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
              })}

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
    </>
  )
}
