"use client";
import {
  governmentFormula,
  overtimecategory,
  overtimeSettingSample,
  overtimeType,
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
import { useState, useEffect } from "react";
import {  useParams, useRouter } from "next/navigation";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Textarea } from "@/components/ui/textarea";

export default function EditOvertimeSetting() {
  const { id } = useParams();
  const router = useRouter();

  const [selectedType, setSelectedType] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [calculation, setCalculation] = useState<number | null>(null);
  const [rate, setRate] = useState<number | null>(null);
  const [workWeekDuration, setWorkWeekDuration] = useState<number | null>(
    null
  );
  const [formulaText, setFormulaText] = useState("");
  const [name, setName] = useState("");

  const handleSave = () => {
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

  // Ambil data overtime berdasarkan id dari database/API 
  useEffect(() => {
    const dummyData = overtimeSettingSample.find(
      (item) => item.id.toString() === id
    );

    if (!dummyData) return;

    const typeChoosen = overtimeType.find(
      (item) => item.name === dummyData.type
    );

    const categoryChoosen = overtimecategory.find(
      (item) => item.name === dummyData.category
    );

    setSelectedType(typeChoosen?.name ?? "");
    setSelectedCategory(categoryChoosen?.name ?? "");
    setCalculation(dummyData.calculation);
    setRate(dummyData.rate);
    setName(dummyData.name ?? "");
    if (dummyData.work_day) {
      setWorkWeekDuration(dummyData.work_day);
    }
  }, [id]);

  // Hitung formula jika perlu
  useEffect(() => {
    if (!selectedCategory) {
      setFormulaText("");
      return;
    }

  const filteredFormula = governmentFormula.filter(
    (item) =>
      item.category === selectedCategory &&
      (item.work_week_duration === null ||
        item.work_week_duration === workWeekDuration)
  );

  const result = filteredFormula
    .map((item) => {
      const hourRange =
        item.from_hour === item.to_hour
          ? `${item.from_hour} hour`
          : `${item.from_hour}–${item.to_hour} hour`;
      return `${hourRange} = ${item.multiplier} x ( monthly salary / 173))`;
    })
    .join("\n");

    setFormulaText(result);
  }, [selectedCategory, workWeekDuration]);

  return (
    <Sidebar title="Edit Overtime Setting">
      <Card className="flex flex-col gap-[15px] px-[20px] py-[26px]">
        <div className="px-[10px]">
          <p className="font-medium text-lg text-neutral-900">
            Edit Overtime Settings
          </p>
        </div>

        <Card className="p-[20px] gap-[30px] flex flex-col">
          {/* Name */}
          <div className="flex flex-col w-full gap-2">
            <Label>Overtime Setting Name</Label>
            <Input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>

          {/* Type */}
          <div className="flex flex-col w-full gap-[15px]">
            <Label>Overtime Setting Type</Label>
            <RadioGroup
              value={selectedType}
              onValueChange={(val) => setSelectedType(val)}
              className="flex flex-col gap-5"
            >
              {overtimeType.map((item) => (
                <div key={item.id} className="flex items-center space-x-2">
                  <RadioGroupItem value={item.name} id={`radio-${item.id}`} />
                  <Label htmlFor={`radio-${item.id}`}>{item.name}</Label>
                </div>
              ))}
            </RadioGroup>
          </div>

          {/* Category */}
          <div className="flex flex-col w-full gap-2">
            <Label>Category</Label>
            <Select
              value={selectedCategory}
              onValueChange={(val) => setSelectedCategory(val)}
            >
              <SelectTrigger className="h-[45px] w-full p-4 border-neutral-300 text-neutral-900">
                <SelectValue placeholder="Choose category" />
              </SelectTrigger>
              <SelectContent>
                {overtimecategory.map((Item) => (
                  <SelectItem key={Item.id} value={Item.name}>
                    {Item.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Flat Type Inputs */}
          {selectedType === "Flat" && (
            <div className="gap-[30px] flex flex-col">
              <div className="flex flex-col w-full gap-2">
                <Label>Overtime Calculation</Label>
                <div className="flex flex-row gap-2">
                  <Input
                    disabled
                    value="per"
                    className="bg-neutral-100 text-center"
                  />
                  <Input
                    type="number"
                    value={calculation || ""}
                    onChange={(e) => setCalculation(Number(e.target.value))}
                    required
                  />
                  <Input
                    disabled
                    value="hour"
                    className="bg-neutral-100 text-center"
                  />
                </div>
              </div>

              <div className="flex flex-col w-full gap-2">
                <Label>Overtime Rate</Label>
                <Input
                  type="number"
                  value={rate || ""}
                  onChange={(e) => setRate(Number(e.target.value))}
                  required
                />
              </div>

              <div className="flex flex-col w-full gap-2">
                <Label>Formula</Label>
                <Input
                  type="text"
                  value={
                    calculation && rate
                      ? `${calculation} hour x IDR ${rate}`
                      : ""
                  }
                  readOnly
                  disabled
                  className="bg-neutral-100"
                />
              </div>
            </div>
          )}

          {/* Government Regulation Inputs */}
          {selectedType === "Government Regulation" &&
            selectedCategory === "Holiday" && (
              <div className="flex flex-col w-full gap-[15px]">
                {/* weekly work days */}
                <Label>Weekly Work Days</Label>
                <RadioGroup
                  value={workWeekDuration?.toString() || ""}
                  onValueChange={(val) => setWorkWeekDuration(Number(val))}
                  className="flex flex-col gap-5"
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="5" id="5" />
                    <Label htmlFor="5">5 days in a week</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="6" id="6" />
                    <Label htmlFor="6">6 days in a week</Label>
                  </div>
                </RadioGroup>
              </div>
            )}

          {selectedType === "Government Regulation" && (
            <div className="gap-[30px] flex flex-col">
              <div className="flex flex-col w-full gap-2">
                <Label>Formula</Label>
                <Textarea
                  value={formulaText}
                  readOnly
                  disabled
                  className="bg-neutral-100 text-neutral-900 whitespace-pre-line"
                />
              </div>
            </div>
          )}
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
          <Button type="submit" variant="default" className="w-[98px]" onClick={handleSave}>
            Update
          </Button>
        </div>
      </Card>
    </Sidebar>
  );
}
