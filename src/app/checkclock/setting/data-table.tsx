"use client";
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
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
import { Card } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { checkclockSetting } from "./column";
import { TimeInput } from "@/components/ui/timeInput";
import { useCKSettingData } from "@/hooks/useCKSettingData";
import { Spinner } from "@/components/ui/spinner";

import { useEdit } from "@/context/EditFormContext";
import EditWfoForm from "@/components/custom/ck-setting-form/EditWfoForm";
import MapboxMap from "@/components/custom/mapbox/MapboxMap";

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  selectedWorkType: "WFO" | "WFA";
  setSelectedWorkType: (value: "WFO" | "WFA") => void;
}

export function DataTable<TData extends { [key: string]: any }, TValue>({
  columns,
  data,
  selectedWorkType,
  setSelectedWorkType,
}: DataTableProps<TData, TValue>) {
  // const [selectedRow, setSelectedRow] = useState<TData | null>(null);
  // const [open, setOpen] = useState(false);

  // context edit form
  const { setSelectedRow, setIsOpen, setWorkType, isOpen } = useEdit();

  const {locationRule, loading, refetch} = useCKSettingData();

  // Patch columns to override action cell
  const columnsWithAction = columns.map((col) => {
    if ((col as any).accessorKey === "action") {
      return {
        ...col,
        cell: ({ row }: { row: any }) => (
          <Button
            variant="outline"
            size="sm"
            onClick={() => {
              setSelectedRow(row.original);
              setWorkType(selectedWorkType);
              setIsOpen(true);
            }}
          >
            Edit
          </Button>
        ),
      } as ColumnDef<TData, TValue>;
    }
    return col;
  });

  const table = useReactTable({
    data,
    columns: columnsWithAction,
    getCoreRowModel: getCoreRowModel(),
  });
  const workType = [
    { label: "WFO", value: "WFO" },
    { label: "WFA", value: "WFA" },
  ];

  // console.log("loading fetch", loading);
  if (loading) {
    return (
      <Card className="flex items-center p-5 gap-6 w-full">
        <div className="flex justify-between w-full">
          <span className="w-[187px] text-lg flex-none flex items-center">
            Checkclock Setting
          </span>
          <div className="flex gap-2 w-auto items-center">
            <Label className="w-full">Work Type</Label>
            <div className="">
              <Select
                value={selectedWorkType}
                onValueChange={(value: "WFO" | "WFA") =>
                  setSelectedWorkType(value)
                }
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select work type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="WFO">WFO</SelectItem>
                  <SelectItem value="WFA">WFA</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>
        <div className="w-full">
          <Spinner></Spinner>
        </div>
      </Card>
    );
  }

  return (
    <Card className="flex items-center p-5 gap-4 w-full">
      <div className="flex justify-between w-full">
        <span className="w-[187px] text-lg flex-none flex items-center">
          Checkclock Setting
        </span>
        <div className="flex gap-2 w-auto items-center">
          <Label className="w-full">Work Type</Label>
          <div className="">
            <Select
              value={selectedWorkType}
              onValueChange={(value: "WFO" | "WFA") =>
                setSelectedWorkType(value)
              }
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select work type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="WFO">WFO</SelectItem>
                <SelectItem value="WFA">WFA</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>

      {selectedWorkType === "WFO" && (
      <div className="grid grid-cols-3 gap-10 w-full">
        <div className="flex flex-col gap-2">
          <Label className="h-6">Latitude</Label>
          <Input defaultValue={locationRule?.latitude} readOnly />
        </div>
        <div className="flex flex-col gap-2">
          <Label className="h-6">Longitude</Label>
          <Input defaultValue={locationRule?.longitude} readOnly />
        </div>
        <div className="flex flex-col gap-2">
          <Label className="h-6">Radius</Label>
          <Input defaultValue={locationRule?.radius} readOnly />
        </div>
      </div>
      )}

      <div className={`gap-2 w-full ${selectedWorkType === "WFO" ? "grid grid-cols-5" : "flex"}`}>

        {selectedWorkType === "WFO" && (
        <div className="col-span-2 rounded-md h-fit">
          <MapboxMap></MapboxMap>
        </div>
        )}
        
        <div className={`rounded-md border ${selectedWorkType === "WFO" ? "col-span-3" : "w-full"}`}>
          <Table className="h-fit">
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
              {table.getPaginationRowModel().rows.length > 0 ? (
                table.getPaginationRowModel().rows.map((row) => (
                  <TableRow key={row.id}>
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
      <AlertDialog open={isOpen} onOpenChange={setIsOpen}>
        <AlertDialogContent className="min-w-2xl min-h-2xl">
          <AlertDialogTitle className="font-medium">
            Edit Checkclock Setting
          </AlertDialogTitle>
          <EditWfoForm onUpdate={() => {
            console.log("refetech triggered")
            refetch();
          } }></EditWfoForm>
          
        </AlertDialogContent>
      </AlertDialog>
    </Card>
  );
}
