"use client";

import Cookies from "js-cookie";
import {
  ColumnDef,
  ColumnFiltersState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { toast, Toaster } from "sonner";

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
}
interface HasIdName {
  id: string;
  name: string;
}

export function DataTable<TData extends HasIdName,  TValue>({
  columns,
  data,
}: DataTableProps<TData, TValue>) {
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  );
  const [globalFilter, setGlobalFilter] = React.useState("");
  const [activeOvertimeType, setActiveOvertimeType] = React.useState(
    "Government Regulation"
  ); // Ini menyimpan jenis lembur aktif yang ditampilkan
  const [tempOvertimeType, setTempOvertimeType] = React.useState(
    "Government Regulation"
  ); // Ini menyimpan jenis yang dipilih di dalam dialog

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    onColumnFiltersChange: setColumnFilters,
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    state: {
      columnFilters,
      globalFilter,
    },
    onGlobalFilterChange: setGlobalFilter,
    globalFilterFn: (row, columnId, filterValue) => {
      const name = row.getValue("name")?.toString().toLowerCase() || "";
      const type = row.getValue("type")?.toString().toLowerCase() || "";
      return (
        name.includes(filterValue.toLowerCase()) ||
        type.includes(filterValue.toLowerCase())
      );
    },
  });

  const router = useRouter();

  // Fungsi untuk menangani penerapan jenis lembur yang dipilih
  const handleApplyOvertimeType = () => {
    
    editStatusSetting()
    console.log(tempOvertimeType)
  };

  const [loading, setLoading] = useState(true);
  const editStatusSetting = async () => {
    setLoading(true);
    // setError(false);
    // setSuccess(false);

    try {
      console.log(tempOvertimeType)
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/overtime-settings/status?_method=PATCH`, {
          method: "POST",
          headers: {
            "Authorization": `Bearer ${Cookies.get("token")}`,
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            overtime_setting_id: tempOvertimeType
      })
    });


    const responseData = await response.json();
    if (!response.ok) {
        throw responseData; 
    }
    toast.success('Company updated successfully')
    setActiveOvertimeType(tempOvertimeType);
    // setSuccess(true);
    } catch (err) {
    // setError(true);
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
  }

  useEffect(() => {
    const activeItem = data.find((item: any) => item.status === "Active");
    if (activeItem) {
      setTempOvertimeType(activeItem.id);
      setActiveOvertimeType(activeItem.id); // Jika kamu juga ingin default `activeOvertimeType`
    }
  }, [data]);

  return (
    
    <div className="flex flex-col gap-[10px] w-full">
      <Toaster position="bottom-right" expand={true} richColors closeButton></Toaster>
      <div className="flex flex-row items-center justify-between gap-5 w-full px-6 py-[10px]">
        <div className="flex-1 flex gap-2 items-center max-w-[50%]">
          <span className="text-lg flex-none">Overtime Settings</span>
          {/* Filter input + icon */}
          <div className="w-full flex relative items-center">
            <svg
              width="18"
              height="17"
              viewBox="0 0 18 17"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-300 w-4 h-4"
            >
              <path
                d="M16.5 16L12.875 12.375M14.8333 7.66667C14.8333 11.3486 11.8486 14.3333 8.16667 14.3333C4.48477 14.3333 1.5 11.3486 1.5 7.66667C1.5 3.98477 4.48477 1 8.16667 1C11.8486 1 14.8333 3.98477 14.8333 7.66667Z"
                stroke="#667085"
                strokeWidth="1.66667"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            <Input
              placeholder="Serch overtime setting"
              value={globalFilter}
              onChange={(e) => setGlobalFilter(e.target.value)}
              className="pl-10 w-full"
            />
          </div>
        </div>
        <div className="flex items-center gap-3 justify-end flex-none">
          <div className="w-fit flex gap-2 items-center">
            <span className="">Active type</span>
            <div className=" text-success-700 bg-green-100 rounded-2xl w-fit h-fit py-1 px-3 flex flex-row gap-1 items-center">
              <svg
                width="10"
                height="10"
                viewBox="0 0 8 8"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M7.875 4C7.875 5.933 6.308 7.5 4.375 7.5C2.442 7.5 0.875 5.933 0.875 4C0.875 2.067 2.442 0.5 4.375 0.5C6.308 0.5 7.875 2.067 7.875 4Z"
                  fill="#25703F"
                />
              </svg>
              {/* {activeOvertimeType} */}
              {data.find((item: any) => item.id === activeOvertimeType)?.name ?? "Unknown"}

            </div>
          </div>

          <AlertDialog
            onOpenChange={(open) => {
              // Reset tempOvertimeType ke activeOvertimeType saat dialog dibuka
              if (open) {
                setTempOvertimeType(activeOvertimeType);
              }
            }}
          >
            <AlertDialogTrigger asChild>
              <Button
                // className="bg-zinc-100 hover:bg-zinc-200"
                variant="secondary"
                size="icon"
                icon={
                  <svg
                    width="18"
                    height="19"
                    viewBox="0 0 18 19"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M9 3.5C9 4.03043 9.21071 4.53914 9.58579 4.91421C9.96086 5.28929 10.4696 5.5 11 5.5C11.5304 5.5 12.0391 5.28929 12.4142 4.91421C12.7893 4.53914 13 4.03043 13 3.5M9 3.5C9 2.96957 9.21071 2.46086 9.58579 2.08579C9.96086 1.71071 10.4696 1.5 11 1.5C11.5304 1.5 12.0391 1.71071 12.4142 2.08579C12.7893 2.46086 13 2.96957 13 3.5M9 3.5H1M13 3.5H17M3 9.5C3 10.0304 3.21071 10.5391 3.58579 10.9142C3.96086 11.2893 4.46957 11.5 5 11.5C5.53043 11.5 6.03914 11.2893 6.41421 10.9142C6.78929 10.5391 7 10.0304 7 9.5M3 9.5C3 8.96957 3.21071 8.46086 3.58579 8.08579C3.96086 7.71071 4.46957 7.5 5 7.5C5.53043 7.5 6.03914 7.71071 6.41421 8.08579C6.78929 8.46086 7 8.96957 7 9.5M3 9.5H1M7 9.5H17M12 15.5C12 16.0304 12.2107 16.5391 12.5858 16.9142C12.9609 17.2893 13.4696 17.5 14 17.5C14.5304 17.5 15.0391 17.2893 15.4142 16.9142C15.7893 16.5391 16 16.0304 16 15.5M12 15.5C12 14.9696 12.2107 14.4609 12.5858 14.0858C12.9609 13.7107 13.4696 13.5 14 13.5C14.5304 13.5 15.0391 13.7107 15.4142 14.0858C15.7893 14.4609 16 14.9696 16 15.5M12 15.5H1M16 15.5H17"
                      stroke="black"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                }
              ></Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Overtime Setting Controller</AlertDialogTitle>
                <AlertDialogDescription
                  className="flex flex-col w-full gap-[15px]"
                  asChild
                >
                  <div className="">
                    <Label>Active Overtime</Label>
                    {/* <RadioGroup
                      value={tempOvertimeType} // Gunakan state sementara untuk pilihan dialog
                      onValueChange={(value) => setTempOvertimeType(value)} // Perbarui state sementara saat berubah
                      className="flex flex-col gap-5"
                    >
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="Government Regulation" id="r1" />
                        <Label htmlFor="r1">Government Regulation</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="Flat 01" id="r2" />
                        <Label htmlFor="r2">Flat 01</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="Flat 02" id="r3" />
                        <Label htmlFor="r3">Flat 02</Label>
                      </div>
                    </RadioGroup> */}
                    <RadioGroup
                      value={tempOvertimeType}
                      onValueChange={(value) => setTempOvertimeType(value)}
                      className="flex flex-col gap-5"
                    >
                      {data.map((item: any, index) => {
                        const id = `radio-${index}`;
                        return (
                          <div key={id} className="flex items-center space-x-2">
                            <RadioGroupItem value={item.id} id={id} />
                            <Label htmlFor={id}>{item.name}</Label>
                          </div>
                        );
                      })}
                    </RadioGroup>

                  </div>
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel className="w-fit h-fit">
                  Cancel
                </AlertDialogCancel>
                <AlertDialogAction
                  className="w-fit h-fit"
                  onClick={handleApplyOvertimeType}
                >
                  Apply
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
          <Button
            className="w-fit cursor-pointer"
            variant="default"
            onClick={() => router.push("/overtime/setting/add")}
          >
            <svg
              width="15"
              height="15"
              viewBox="0 0 15 15"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M7.5 3.125V11.875"
                stroke="white"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M3.125 7.5H11.875"
                stroke="white"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            Add Custom
          </Button>
        </div>
      </div>
      <div className="rounded-md border">
        <Table>
          <TableHeader className="bg-neutral-50">
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead
                      key={header.id}
                      className="text-center text-neutral-300"
                    >
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
                    <TableCell key={cell.id} className="text-center">
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
