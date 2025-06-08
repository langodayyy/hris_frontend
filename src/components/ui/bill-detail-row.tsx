import React from "react";

interface BillDetailRowProps {
  label: string;
  value: React.ReactNode;
  className?: string;
  labelClassName?: string;
}

export const BillDetailRow: React.FC<BillDetailRowProps> = ({
  label,
  value,
  className,
  labelClassName,
}) => (
  <div
    className={`flex w-full justify-between items-center${
      className ? ` ${className}` : ""
    }`}
  >
    <span
      className={`text-neutral-400 text-sm${
        labelClassName ? ` ${labelClassName}` : ""
      }`}
    >
      {label}
    </span>
    <span className=" text-sm">{value}</span>
  </div>
);
