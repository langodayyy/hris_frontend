import React from "react";

interface BillDetailColumnProps {
  label: string;
  value: React.ReactNode;
  className?: string;
  labelClassName?: string;
  valueClassName?: string;
}

export const BillDetailColumn: React.FC<BillDetailColumnProps> = ({
  label,
  value,
  className,
  labelClassName,
  valueClassName,
}) => (
  <div className={`flex flex-col w-full justify-start${className ? ` ${className}` : ""}`}>
    <span
      className={`text-neutral-400 text-sm${
        labelClassName ? ` ${labelClassName}` : ""
      }`}
    >
      {label}
    </span>
    <span
      className={`text-sm font-medium w-full mt-1${
        valueClassName ? ` ${valueClassName}` : ""
      }`}
    >
      {value}
    </span>
  </div>
);
