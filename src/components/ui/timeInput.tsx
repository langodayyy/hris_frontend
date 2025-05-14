import * as React from "react";
import { ClockIcon } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

type TimeInputProps = {
  label: string;
  name: string;
  defaultToNow?: boolean;
  readOnly?:boolean; 
  defaultValue?: string;
  disabled?: boolean;
};

export function TimeInput({
  label,
  name,
  defaultToNow = false,
  readOnly = false,
  defaultValue = "",
  disabled = false,
}: TimeInputProps) {
  const inputRef = React.useRef<HTMLInputElement>(null);

  React.useEffect(() => {
    if (inputRef.current) {
      if (defaultValue) {
        // Jika defaultValue ada, gunakan defaultValue
        inputRef.current.value = defaultValue;
      } else if (defaultToNow) {
        // Jika defaultValue kosong dan defaultToNow aktif, gunakan jam sekarang
        const now = new Date();
        const hours = String(now.getHours()).padStart(2, "0");
        const minutes = String(now.getMinutes()).padStart(2, "0");
        inputRef.current.value = `${hours}:${minutes}`;
      } else {
        // Jika tidak ada defaultValue dan defaultToNow tidak aktif, kosongkan
        inputRef.current.value = "";
      }
    }
  }, [defaultToNow, defaultValue]);
  

  return (
    <div className="flex-col flex gap-2">
      <Label htmlFor={name} className="h-6">{label}</Label>
      <div className="relative w-full flex justify-center items-center gap-2">
        <div
          className="cursor-pointer"
          onClick={() => inputRef.current?.showPicker?.()}
        >
          <svg
            width="20"
            height="20"
            viewBox="0 0 20 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <g clipPath="url(#clip0_461_4251)">
              <path
                d="M11.6666 10.8333C11.668 11.1262 11.5921 11.4143 11.4467 11.6685C11.3012 11.9227 11.0914 12.1341 10.8382 12.2814C10.5851 12.4287 10.2976 12.5067 10.0047 12.5075C9.71183 12.5084 9.4239 12.432 9.16993 12.2861C8.91596 12.1403 8.70491 11.93 8.55804 11.6767C8.41116 11.4233 8.33366 11.1356 8.33333 10.8428C8.33299 10.5499 8.40984 10.2621 8.55614 10.0084C8.70243 9.75464 8.913 9.54394 9.16664 9.3975V5H10.8333V9.3975C11.0859 9.54275 11.2959 9.75187 11.4421 10.0039C11.5884 10.2559 11.6658 10.542 11.6666 10.8333ZM16.7166 4.61583C17.9308 5.92315 18.7371 7.55638 19.0366 9.31525C19.3361 11.0741 19.1158 12.8821 18.4027 14.5176C17.6896 16.1531 16.5147 17.5449 15.0221 18.5224C13.5296 19.4999 11.7842 20.0206 9.99997 20.0206C8.21579 20.0206 6.4704 19.4999 4.97782 18.5224C3.48524 17.5449 2.31037 16.1531 1.59728 14.5176C0.88419 12.8821 0.663882 11.0741 0.963373 9.31525C1.26286 7.55638 2.06913 5.92315 3.28331 4.61583L2.46831 3.71L1.73497 4.44333L0.556641 3.265L3.26497 0.556667L4.44331 1.735L3.64831 2.53L4.52164 3.5C5.87348 2.48303 7.48198 1.86289 9.16664 1.70917V0H10.8333V1.70917C12.518 1.86289 14.1265 2.48303 15.4783 3.5L16.3516 2.52917L15.6083 1.78667L16.7875 0.608333L19.4433 3.265L18.265 4.44333L17.5316 3.71L16.7166 4.61583ZM17.5 10.8333C17.5 9.34997 17.0601 7.89993 16.236 6.66656C15.4119 5.43319 14.2405 4.47189 12.8701 3.90424C11.4997 3.33658 9.99165 3.18805 8.5368 3.47744C7.08194 3.76683 5.74557 4.48114 4.69667 5.53003C3.64778 6.57893 2.93347 7.9153 2.64408 9.37016C2.3547 10.825 2.50322 12.333 3.07088 13.7035C3.63853 15.0739 4.59983 16.2452 5.8332 17.0694C7.06657 17.8935 8.51661 18.3333 9.99997 18.3333C11.9884 18.3311 13.8948 17.5402 15.3008 16.1342C16.7069 14.7282 17.4978 12.8218 17.5 10.8333Z"
                fill="currentColor"
              />
            </g>
            <defs>
              <clipPath id="clip0_461_4251">
                <rect width="20" height="20" fill="white" />
              </clipPath>
            </defs>
          </svg>
        </div>
        <Input
          id={name}
          name={name}
          ref={inputRef}
          type="time"
          readOnly={readOnly}
          disabled={disabled}
          defaultValue={defaultValue || ""}
          className="pr-10 appearance-none [&::-webkit-calendar-picker-indicator]:opacity-0 [&::-webkit-calendar-picker-indicator]:absolute"
        />
        {/* <ClockIcon
          className="absolute right-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground cursor-pointer"
          onClick={() => inputRef.current?.showPicker?.()}
        /> */}
      </div>
    </div>
  );
}
