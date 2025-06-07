import React from "react";

interface BillDetailRowProps {
  label: string;
  value: React.ReactNode;
}

export const BillDetailRow: React.FC<BillDetailRowProps> = ({
  label,
  value,
}) => (
  <div className="flex w-full justify-between">
    <span className="text-neutral-400 text-sm">{label}</span>
    <span className=" text-sm">{value}</span>
  </div>
);
