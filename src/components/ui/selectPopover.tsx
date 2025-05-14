import React from "react";
import { Button } from "./button";
import { Popover, PopoverContent, PopoverTrigger } from "./popover";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "./command";
import { Check, ChevronsUpDown } from "lucide-react";
import { cn } from "@/lib/utils";

type Option = {
  label: string;
  value: string;
};

type SelectPopoverProps = {
  options: Option[];
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
};

export const SelectPopover: React.FC<SelectPopoverProps> = ({
  options,
  value,
  onChange,
  placeholder = "Select an option",
}) => {
  const [open, setOpen] = React.useState(false);
  const inputRef = React.useRef<HTMLButtonElement>(null);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <div className="relative">
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            role="combobox"
            aria-expanded={open}
            className={cn(
              "justify-between border-neutral-300 w-full hover:bg-primary-900 h-[45px]",
              !value ? "text-neutral-300" : "text-neutral-900"
            )}
            ref={inputRef}
          >
            {value || placeholder}
            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
          </Button>
        </PopoverTrigger>
        <div className="w-full relative z-50 mt-2 p-0">
          <PopoverContent
            className="absolute left-0 top-full mt-2 z-50 text-neutral-600"
            style={{
              width: inputRef.current
                ? `${inputRef.current.offsetWidth}px`
                : "200px",
            }}
            align="start"
          >
            <Command className="w-full">
              <CommandInput placeholder="Search..." />
              <CommandList className="w-full">
                <CommandEmpty>No options found.</CommandEmpty>
                <CommandGroup>
                  {options.map((option) => (
                    <CommandItem
                      key={option.value}
                      value={option.value}
                      onSelect={(currentValue) => {
                        onChange(currentValue === value ? "" : currentValue);
                        setOpen(false);
                      }}
                    >
                      <Check
                        className={cn(
                          "mr-2 h-4 w-4",
                          value === option.value ? "opacity-100" : "opacity-0"
                        )}
                      />
                      {option.label}
                    </CommandItem>
                  ))}
                </CommandGroup>
              </CommandList>
            </Command>
          </PopoverContent>
        </div>
      </div>
    </Popover>
  );
};
