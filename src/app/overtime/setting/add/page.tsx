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
import Cookies from "js-cookie";
import { toast, Toaster } from "sonner";
import { Spinner } from "@/components/ui/spinner";

export default function AddOvertimeSetting() {
  
  const router = useRouter();
  const [overtimeName, setOvertimeName] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [calculation, setCalculation] = useState<number | null>(null); 
  const [rate, setRate] = useState<number | null>(null); 
  const [loading, setLoading] = useState(false);
  
  const handleSubmit = async () => {
    setLoading(true);
    // setError(false);
    // setSuccess(false);

    console.log(overtimeName)
    console.log(selectedCategory)
    console.log(calculation)
    console.log(rate)
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/overtime-settings`, {
          method: "POST",
          headers: {
            "Authorization": `Bearer ${Cookies.get("token")}`,
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            name: overtimeName,
            category: selectedCategory,
            interval_hours: calculation,
            rate: rate

      })
    });


    const responseData = await response.json();
    if (!response.ok) {
        throw responseData; 
    }
    toast.success('Overtime created successfully')
    // setSuccess(true);
    router.push("/overtime/setting")
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
  
  return (
    <Sidebar title="Overtime Setting">
      <Toaster position="bottom-right" expand={true} richColors closeButton></Toaster>
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
                value={overtimeName}
                onChange={(e) => setOvertimeName(e.target.value)}
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
                  calculation && rate ? `Employees must work at least 2 hours of overtime, and will receive Rp.${rate} for every ${calculation} hours of overtime worked` : ""
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
            disabled={loading}
          >
            {!loading ? (
              <>
              <span>Cancel</span>
              </>
            ) : (
              <Spinner size="small" />
          )}
          </Button>
          {/* <Button
            type="submit"
            variant="default"
            className="w-[98px]"
            onClick={handleSubmit}
          >
            Save
          </Button> */}
          <Button className="w-[80px] h-[40px]" variant="default"  onClick={handleSubmit} disabled={loading}>
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
        </div>
      </Card>
    </Sidebar>
  );
}