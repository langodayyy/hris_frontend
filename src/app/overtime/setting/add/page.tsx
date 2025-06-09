"use client";
import {
  overtimecategory,
} from "@/components/dummy/overtimeData";
import Sidebar from "@/components/sidebar";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function AddOvertimeSetting() {
  
  const router = useRouter();
  const [selectedCategory, setSelectedCategory] = useState("");
  const [calculation, setCalculation] = useState<number | null>(null); 
  const [rate, setRate] = useState<number | null>(null); 

  const handleSubmit = () => {
    //idonow
    // const payload = {
    //   overtimeName,
    //   type: selectedType,
    //   category: selectedCategory,
    //   calculation,
    //   rate,
    //   workWeekDuration,
    //   formulaText,
    //   employeeId: selectedEmployeeId,
    //   overtimeId: selectedOvertimeName,
    //   date: selectedDate,
    //   totalHours: inputTotalHour,
    //   overtimePay: calculatedPay,
    // };

    // console.log("Data yang dikirim:", payload);

    // Contoh fetch untuk POST data
    // fetch('/api/overtime', {
    //   method: 'POST',
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify(payload),
    // }).then(() => {
    //   router.push("/overtime/setting");
    // });

    // Untuk sementara redirect setelah submit:
    router.push("/overtime/setting");
  };
  
  return (
    <Sidebar title="Overtime Setting">
      <Card className="flex flex-col gap-[15px] px-[20px] py-[26px]">
        <div className="px-[10px]">
          <p className="font-medium text-lg text-neutral-900">
            Add Overtime Settings
          </p>
        </div>

        <Card className="p-[20px] gap-[30px] flex flex-col">
          {/* kebawah */}
          <div className="flex flex-col gap-[30px]">
            {/* overtime name */}
            <div className="flex flex-col w-full gap-2">
              <Label>Overtime Setting Name</Label>
              <Input
                type="text"
                id="ovt_name"
                name="ovt_name"
                placeholder="Enter overtime name"
                required
              />
            </div>

            {/* overtime category */}
            <div className="flex flex-col w-full gap-2">
              <Label>Category</Label>
              <Select
                value={selectedCategory}
                onValueChange={(val) => setSelectedCategory(val)}
              >
                <SelectTrigger className="h-[45px] w-full p-4 border-neutral-300 text-neutral-900">
                  <SelectValue placeholder="Choose overtime type" />
                </SelectTrigger>
                <SelectContent>
                  {overtimecategory.map((Item) => (
                    <SelectItem
                      key={Item.id}
                      value={Item.name}
                      className="text-neutral-900"
                    >
                      {Item.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* overtime calculation */}
            <div className="flex flex-col w-full gap-2">
              <Label>Overtime Calculation</Label>
              <div className="flex flex-row gap-2 ">
                <Input
                  disabled
                  type="text"
                  value="per"
                  className="bg-neutral-100 text-neutral-900 text-center"
                />
                <Input
                  type="number"
                  id="ovt_cal"
                  name="ovt_cal"
                  value={calculation || ""}
                  onChange={(e) => setCalculation(Number(e.target.value))}
                  placeholder="Ex: '1' or '0.5'"
                  required
                />
                <Input
                  disabled
                  type="text"
                  value="hour"
                  className="bg-neutral-100 text-neutral-900 text-center"
                />
              </div>
            </div>

            {/* overtime rate */}
            <div className="flex flex-col w-full gap-2">
              <Label>Overtime Rate</Label>
              <Input
                type="number"
                id="ovt_rate"
                name="ovt_rate"
                value={rate || ""}
                onChange={(e) => setRate(Number(e.target.value))}
                placeholder="Ex: '200000'"
                required
              />
            </div>

            {/* overtime formula */}
            <div className="flex flex-col w-full gap-2">
              <Label>Formula</Label>
              <Input
                type="text"
                id="ovt_formula"
                name="ovt_formula"
                value={
                  calculation && rate ? `${calculation} hour x IDR ${rate}` : ""
                }
                disabled
                className="bg-neutral-100 text-neutral-900"
              />
            </div>
          </div>
        </Card>

        {/* Action Buttons */}
        <div className="flex flex-row gap-[15px] justify-end items-center">
          <Button
            variant="outline"
            className="w-[98px]"
            onClick={() => router.push("/overtime/setting")}
          >
            Cancel
          </Button>
          <Button
            type="submit"
            variant="default"
            className="w-[98px]"
            onClick={handleSubmit}
          >
            Save
          </Button>
        </div>
      </Card>
    </Sidebar>
  );
}