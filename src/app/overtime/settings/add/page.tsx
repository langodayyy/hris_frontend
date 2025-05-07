"use client";
import Sidebar from "@/components/sidebar";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useState } from "react";

const overtimeRegulationType = [
  {
    id : "OVTR001",
    name: "Company Regulation",
  },
  {
    id: "OVTR002",
    name: "Goverment Regulation"
  }
]


export default function AddOvertimeSetting() {

  const [selectedRegulationType, setSelectedRegulationType] = useState("");

    return (
      <Sidebar title="Overtime Setting">
        <Card className="flex flex-col gap-[15px] px-[20px] py-[26px]">
          <div className="px-[10px]">
            <p className="font-medium text-lg text-neutral-900">
              Add Overtime Employee
            </p>
          </div>
          <Card className="p-[20px] gap-[30px] flex flex-col">
            <div className="flex flex-col w-full gap-2">
              <Label>Overtime Name</Label>
              <Input
                type="text"
                id="ovt_name"
                name="ovt_name"
                placeholder="Enter overtime name"
                required
              />
            </div>
            {/* Overtime Type */}
            <div className="flex flex-col w-full gap-2">
              <Label>Type</Label>
              <Select
                value={selectedRegulationType}
                onValueChange={(val) => setSelectedRegulationType(val)}
              >
                <SelectTrigger className="h-[45px] w-full p-4 border-neutral-300 text-neutral-900">
                  <SelectValue placeholder="Choose overtime type" />
                </SelectTrigger>
                <SelectContent>
                  {overtimeRegulationType.map((Item) => (
                    <SelectItem
                      key={Item.id}
                      value={Item.id}
                      className="text-neutral-900"
                    >
                      {Item.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="flex flex-col w-full gap-2">
              <Label>Calculation Overtime</Label>
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
            <div className="flex flex-col w-full gap-2">
              <Label>Calculation Overtime</Label>
              <Input
                type="number"
                id="ovt_rate"
                name="ovt_rate"
                placeholder="Enter overtime rate. Ex:'200000'"
                required
              />
            </div>
          </Card>
          {/* Action Buttons */}
          <div className="flex flex-row gap-[15px] justify-end items-center">
            <Button type="button" variant="outline" className="w-[98px]">
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