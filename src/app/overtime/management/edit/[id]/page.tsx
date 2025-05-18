"use client";
import Sidebar from "@/components/sidebar";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";
import { CalendarIcon } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { format } from "date-fns";
import {
  overtimeSettingSample,
  overtimeDummy,
  employeesSample,
} from "@/components/dummy/overtimeData";

export default function EditOvertime() {
  const { id } = useParams() ;
  const router = useRouter();
  const [selectedEmployee, setSelectedEmployee] = useState("");
  const [selectedOvertimeName, setSelectedOvertimeName] = useState("");
  const [date, setDate] = useState<Date | undefined>(undefined);
  const [inputTotalHour, setInputTotalHour] = useState("");


  useEffect(() => {
    const dummyData = overtimeDummy.find((item) => item.id.toString() === id);

    if (!dummyData) return;

    const employeeChoosen = employeesSample.find(
      (item) => item.id_emp === dummyData.id_emp
    );

    const overtimeChoosen = overtimeSettingSample.find(
      (item) => item.name === dummyData.overtime_name
    );

    setSelectedEmployee(employeeChoosen?.name ?? "");
    setSelectedOvertimeName(overtimeChoosen?.id ?? "");
    setDate(new Date(dummyData.date));
    setInputTotalHour(dummyData.hour.toString());
  }, [id]);
  

  const selectedOvertime = overtimeSettingSample.find(
    (ot) => ot.id === selectedOvertimeName
  );

  const handleHourChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputVal = e.target.value;

    if (inputVal === "") {
      setInputTotalHour("");
      return;
    }

    const val = parseInt(inputVal);
    if (isNaN(val)) return;

    if (
      selectedOvertime &&
      selectedOvertime.type === "Flat" &&
      selectedOvertime.calculation !== null
    ) {
      const calc = selectedOvertime.calculation;
      if (val % calc === 0) {
        setInputTotalHour(inputVal);
      }
    } else {
      setInputTotalHour(inputVal);
    }
  };

  return (
    <Sidebar title="Overtime Management">
      
      <Card className="flex flex-col gap-[15px] px-[20px] py-[26px]">
        <div className="px-[10px]">
          <p className="font-medium text-lg text-neutral-900">
            Edit Overtime Employee
          </p>
        </div>
        <Card className="p-[20px] gap-[30px] flex flex-col">
          {/* Employee Selection */}
          <div className="flex flex-row gap-[30px]">
            <div className="flex flex-col w-full gap-2">
              <Label>Employee Name</Label>
              <Input
                className="w-full bg-neutral-100"
                value={selectedEmployee|| ""}
                disabled
                readOnly
              ></Input>
            </div>
          </div>

          {/* Overtime Name */}
          <div className="flex flex-col w-full gap-2">
            <Label>Overtime Name</Label>
            <Select
              value={selectedOvertimeName}
              onValueChange={(val) => setSelectedOvertimeName(val)}
            >
              <SelectTrigger className="h-[45px] w-full p-4 border-neutral-300 text-neutral-900">
                <SelectValue placeholder="Choose overtime name" />
              </SelectTrigger>
              <SelectContent>
                {overtimeSettingSample.map((Item) => (
                  <SelectItem key={Item.id} value={Item.id}>
                    {Item.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Date */}
          <div className="flex flex-col w-full gap-2">
            <Label>Overtime Date</Label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant={"outline"}
                  className={cn(
                    "w-full justify-start text-left font-normal text-neutral-900 border-neutral-300",
                    !date && "text-muted-foreground"
                  )}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {date ? (
                    format(date, "yyyy/MM/dd")
                  ) : (
                    <span className="text-neutral-300">Pick a date</span>
                  )}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                  mode="single"
                  selected={date}
                  onSelect={setDate}
                  initialFocus
                />
              </PopoverContent>
            </Popover>
          </div>

          {/* Total Hour */}
          <div className="flex flex-col w-full gap-2">
            <Label>Total Hour</Label>
            <div className="flex flex-row gap-2 items-center">
              <Input
                type="number"
                placeholder="Enter overtime duration"
                value={inputTotalHour}
                onChange={handleHourChange}
                required
              />
              <span>Hour</span>
            </div>
            {selectedOvertime?.type === "Flat" && (
              <p className="text-neutral-400 text-sm pl-1">
                Overtime hours must be a multiple of{" "}
                {selectedOvertime?.calculation}
              </p>
            )}
          </div>

          {/* Overtime Pay */}
          <div className="flex flex-col w-full gap-2">
            <Label>Overtime Pay</Label>
            <Input
              disabled
              type="text"
              value="IDR 000000"
              readOnly
              className="bg-neutral-100"
            />
          </div>
        </Card>

        {/* Action Buttons */}
        <div className="flex flex-row gap-[15px] justify-end items-center">
          <Button
            variant="outline"
            className="w-[98px]"
            onClick={() => router.push("/overtime/management")}
          >
            Cancel
          </Button>
          <Button type="submit" variant="default" className="w-[98px]">
            Save
          </Button>
        </div>
      </Card>
    </Sidebar>
  );
}

// "use client";
// import Sidebar from "@/components/sidebar";
// import { Button } from "@/components/ui/button";
// import { Calendar } from "@/components/ui/calendar";
// import { Card } from "@/components/ui/card";
// import { Input } from "@/components/ui/input";
// import { Label } from "@/components/ui/label";
// import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
// import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
// import { cn } from "@/lib/utils";
// import { CalendarIcon } from "lucide-react";
// import { useParams } from "next/navigation";
// import React, { useEffect, useState } from "react";
// import { format } from "date-fns";
// import { useRouter } from "next/navigation";
// import {
//   overtimeSettingSample,
//   generateDummyOvertimeData,
// } from "@/components/dummy/overtimeData";

// export default function EditOvertime(){
//   const { id } = useParams() as { id: string }
//   const [selectedName, setName] = useState("");
//   const [date, setDate] = useState<Date | undefined>(undefined);
//   const [selectedOvertimeType, setSelectedOvertimeType] = useState("");
//   const [totalHour, setTotalHour] = useState("");
//   const [data, setData] = useState<any[]>([]);

//   const handleHourChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const inputVal = e.target.value;

//     // Selalu izinkan kosong (biar bisa dihapus manual)
//     if (inputVal === "") {
//       setTotalHour("");
//       return;
//     }

//     const selected = overtimeSettingSample.find(
//       (item) => item.id_ovt_setting === selectedOvertimeType
//     );

//     // Kalau belum pilih jenis lembur, simpan aja
//     if (!selected) {
//       setTotalHour(inputVal);
//       return;
//     }

//     const calc = parseInt(selected.calculation);
//     const val = Number(inputVal);

//     // Kalau bukan angka, jangan update
//     if (isNaN(val)) return;

//     // Cek apakah kelipatan
//     if (val % calc === 0) {
//       setTotalHour(inputVal);
//     }
//   };

//   const selectedOvertime = overtimeSettingSample.find(
//     (ot) => ot.id_ovt_setting  === selectedOvertimeType
//   );

//   const calculatedPay =
//     selectedOvertime && totalHour
//       ? `IDR ${
//           (parseInt(totalHour) / parseInt(selectedOvertime.calculation)) * parseInt(selectedOvertime.rate)
//         }`
//       : "";

//   useEffect(() => {
//     const dummyData = generateDummyOvertimeData(25);
//     setData(dummyData);

//     const existingData = dummyData.find((item) => item.id === id);
//     if (existingData) {
//       const matchingOvertimeType = overtimeSettingSample.find(
//         (type) => type.name === existingData.overtimeName
//       );
//       if (matchingOvertimeType) {
//         setSelectedOvertimeType(matchingOvertimeType.id_ovt_setting);
//       }

//       // Cek apakah 'existingData.date' valid atau tidak
//       const validDate = new Date(existingData.date);

//       // Periksa apakah 'validDate' adalah tanggal yang valid
//       if (!isNaN(validDate.getTime())) {
//         setDate(validDate); // Set tanggal jika valid
//       } else {
//         setDate(undefined); // Jika tidak valid, set ke undefined
//       }

//       setTotalHour(existingData.hour.toString());
//       setName(existingData.name);
//     }
//   }, []);

//   const router = useRouter();
//   return (
//     <Sidebar title="Overtime Management">
//       <Card className="flex flex-col gap-[15px] px-[20px] py-[26px]">
        // <div className="px-[10px]">
        //   <p className="font-medium text-lg text-neutral-900">
        //     Edit Overtime Employee
        //   </p>
        // </div>
        // <Card className="p-[20px] gap-[30px] flex flex-col">
        //   {/* Employee Selection */}
        //   <div className="flex flex-row gap-[30px]">
        //     <div className="flex flex-col w-full gap-2">
        //       <Label>Employee Name</Label>
        //       <Input
        //         className="w-full bg-neutral-100"
        //         value={selectedName || ""}
        //         disabled
        //         readOnly
        //       ></Input>
        //     </div>

//             {/* Overtime Type */}
//             <div className="flex flex-col w-full gap-2">
//               <Label>Overtime Type</Label>
//               <Select
//                 onValueChange={(val) => setSelectedOvertimeType(val)}
//                 value={selectedOvertimeType}
//               >
//                 <SelectTrigger className="h-[45px] w-full p-4 border-neutral-300 text-neutral-900">
//                   <SelectValue placeholder="Choose overtime type" />
//                 </SelectTrigger>
//                 <SelectContent>
//                   {overtimeSettingSample.map((Item) => (
//                     <SelectItem
//                       key={Item.id_ovt_setting}
//                       value={Item.id_ovt_setting}
//                     >
//                       {Item.name}
//                     </SelectItem>
//                   ))}
//                 </SelectContent>
//               </Select>
//             </div>
//           </div>

//           <div className="flex flex-row gap-[30px]">
//             {/* Overtime Date */}
//             <div className="flex flex-col w-full gap-2">
//               <Label>Overtime Date</Label>
//               <Popover>
//                 <PopoverTrigger asChild>
//                   <Button
//                     variant={"outline"}
//                     className={cn(
//                       "w-full justify-start text-left font-normal text-neutral-900 border-neutral-300",
//                       !date && "text-muted-foreground"
//                     )}
//                   >
//                     <CalendarIcon className="mr-2 h-4 w-4" />
//                     {date ? (
//                       format(date, "dd/MM/yyyy")
//                     ) : (
//                       <span className="text-neutral-900">Pick a date</span>
//                     )}
//                   </Button>
//                 </PopoverTrigger>
//                 <PopoverContent className="w-auto p-0" align="start">
//                   <Calendar
//                     mode="single"
//                     selected={date}
//                     onSelect={setDate}
//                     initialFocus
//                     classNames={{
//                       day_selected:
//                         "bg-secondary-600 text-primary-foreground hover:bg-primary hover:text-primary-foreground focus:bg-secondary-600 focus:text-primary-foreground  ",
//                     }}
//                   />
//                 </PopoverContent>
//               </Popover>
//             </div>

//             {/* Total Hour */}
//             <div className="flex flex-col w-full gap-2">
//               <Label className="text-neutral-900">Total Hour</Label>
//               <div className="flex flex-row gap-2 items-center">
//                 <Input
//                   type="number"
//                   placeholder="Enter overtime duration"
//                   value={totalHour}
//                   onChange={handleHourChange}
//                   required
//                 />
//                 <span>Hour</span>
//               </div>
//               {selectedOvertimeType && (
//                 <p className="text-neutral-400 text-sm pl-1">
//                   Overtime hours must be a multiple of{" "}
//                   {selectedOvertime?.calculation}
//                 </p>
//               )}
//             </div>
//           </div>

//           {/* Overtime Pay */}
//           <div className="flex flex-col w-full gap-2">
//             <Label>Overtime Pay</Label>
//             <Input
//               disabled
//               type="text"
//               value={calculatedPay}
//               readOnly
//               className="bg-neutral-100"
//             />
//           </div>
//         </Card>

//         {/* Action Buttons */}
//         <div className="flex flex-row gap-[15px] justify-end items-center">
//           <Button
//             variant="outline"
//             className="w-[98px]"
//             onClick={() => router.push("/overtime/management")}
//           >
//             Cancel
//           </Button>
//           <Button type="submit" variant="default" className="w-[98px]">
//             Save
//           </Button>
//         </div>
//       </Card>
//     </Sidebar>
//   );
// }
