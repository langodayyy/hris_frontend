import { useState } from "react";
import PhoneInput from "react-phone-number-input";
import "react-phone-number-input/style.css";
import { Label } from "@/components/ui/label";

export default function FormPhoneInput({
  placeholder = "Enter your phone number",
  defaultValue,
}: {
  placeholder?: string;
  defaultValue?: string | null;
}) {
  const [value, setValue] = useState<string | undefined>(defaultValue ?? undefined);

  return (
    <div className="flex flex-col gap-2 w-full">
      <Label htmlFor="phone">Phone Number</Label>
      <PhoneInput
        id="phone"
        international
        countryCallingCodeEditable={false}
        placeholder={placeholder}
        value={value}
        onChange={setValue}
        defaultCountry="ID"
        className="file:text-neutral-900 border-neutral-300 placeholder:text-neutral-300 selection:bg-primary selection:text-primary-foreground dark:bg-input/30 flex w-full min-w-0 rounded-md border bg-transparent px-4 py-3 text-base shadow-xs transition-[color,box-shadow] outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm"
      />
      {/* Hidden input for form submission */}
      <input type="hidden" name="phone" value={value ?? ""} />
    </div>
  );
}
