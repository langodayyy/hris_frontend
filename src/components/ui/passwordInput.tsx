// components/PasswordInput.tsx
'use client';

import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface PasswordInputProps {
  id: string;
  label?: string;
  placeholder?: string;
}

export default function PasswordInput({
  id,
  label = "Password",
  placeholder = "Enter your password",
}: PasswordInputProps) {
  const [show, setShow] = useState(false);

  return (
    <div className="flex flex-col gap-2 w-full relative">
      <Label htmlFor={id}>{label}</Label>
      <Input
        id={id}
        type={show ? "text" : "password"}
        placeholder={placeholder}
        className="pr-10"
      />
      <button
        type="button"
        onClick={() => setShow(!show)}
        className="absolute right-3 top-[38px] text-muted-foreground"
      >
        {show ? <EyeOff size={18} /> : <Eye size={18} />}
      </button>
    </div>
  );
}
