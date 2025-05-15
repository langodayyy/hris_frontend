"use client";
import {
  overtimecategory,
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
import { useState } from "react";
import { useRouter } from "next/navigation";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

export default function AddOvertimeSetting() {
  const router = useRouter();
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedType, setSelectedType] = useState("");
  // const [customFormula, setCustomFormula] = useState("");
  const [selectedFormula, setSelectedFormula] = useState("");

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

            {/* overtime type */}
            <div className="flex flex-col w-full gap-[15px]">
              <Label>Overtime Setting Type</Label>
              <RadioGroup
                defaultValue="default"
                className="flex flex-col gap-5"
                onValueChange={(val) => setSelectedType(val)}
              >
                {overtimeType.map((item) => (
                  <div key={item.id} className="flex items-center space-x-2">
                    <RadioGroupItem value={item.name} id={`radio-${item.id}`} />
                    <Label htmlFor={`radio-${item.id}`}>{item.name}</Label>
                  </div>
                ))}
              </RadioGroup>
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
          </div>

          {selectedType === "Company Regulation" && (
            <div className="flex flex-col gap-[30px]">
              <div className="flex flex-col gap-[15px]">
                <Label>Choose Formula Type</Label>
                <RadioGroup
                  value={selectedFormula}
                  onValueChange={(val) => setSelectedFormula(val)}
                  className="flex flex-col gap-5"
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="f1" id="default" />
                    <Label htmlFor="default">Formula 1</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="f2" id="default" />
                    <Label htmlFor="default">Formula 2</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="custom" id="custom" />
                    <Label htmlFor="custom">Custom Formula</Label>
                  </div>
                </RadioGroup>
              </div>
              {selectedFormula === "custom" && (
                <div className="flex flex-col w-full gap-2">
                  <Label>Custom Formula</Label>
                  <Input
                    type="text"
                    id="custom_formula"
                    name="custom_formula"
                    placeholder="Enter custom formula"
                    required
                  />
                </div>
              )}
            </div>
          )}

          {/* if ovettime type is flat, user can custom the overtime calculation and rate */}
          {selectedType === "Flat" && (
            <div className="gap-[30px] flex flex-col">
              {/* overtime calculation */}
              <div className="flex flex-col w-full gap-2">
                <Label>Overtime Calculation</Label>
                <div className="flex flex-row gap-2 ">
                  <Input
                    disabled
                    type="text"
                    value="per"
                    readOnly
                    className="bg-neutral-100 text-neutral-900 text-center"
                  />
                  <Input
                    type="number"
                    id="ovt_cal"
                    name="ovt_cal"
                    placeholder="Enter overtime calculation"
                    required
                  />
                  <Input
                    disabled
                    type="text"
                    value="hour"
                    readOnly
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
                  placeholder="Enter overtime rate. Ex:'200000'"
                  required
                />
              </div>
            </div>
          )}

          {/* if category goverment regulation is Holiday we must know in 5 days work or 6 */}
          {selectedCategory === "Holiday" &&
            selectedType === "Government Regulation" && (
              <div className="flex flex-col w-full gap-[15px]">
                <Label>Workweek Duration</Label>
                <RadioGroup
                  defaultValue="default"
                  className="flex flex-col gap-5"
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="5" id="5" />
                    <Label htmlFor="r1">5 days in a week</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="6" id="6" />
                    <Label htmlFor="r2">6 days in a week</Label>
                  </div>
                </RadioGroup>
              </div>
            )}
        </Card>

        {/* Action Buttons */}
        <div className="flex flex-row gap-[15px] justify-end items-center">
          <Button
            variant="outline"
            className="w-[98px]"
            onClick={() => router.push("/overtime/settings")}
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
