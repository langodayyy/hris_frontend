import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function PhoneInput() {
  return (
    <div className="flex flex-col gap-2 w-full">
      <Label htmlFor="phone">Phone Number</Label>
      <div className="flex border border-neutral-300 rounded-md overflow-hidden">
        <div className="px-4 py-3 text-base text-neutral-700 bg-white border-r border-neutral-300">
          +62
        </div>
        <Input
          id="phone"
          type="number"
          name="phone"
          placeholder="Enter your phone number"
          className="border-0 focus-visible:ring-0 focus-visible:border-transparent [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
          inputMode="numeric"
        />
      </div>
    </div>
  );
}
