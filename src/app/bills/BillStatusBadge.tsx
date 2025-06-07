import React from "react";

interface BillStatusBadgeProps {
  status: "paid" | "pending" | "overdue";
}

export function BillStatusBadge({ status }: BillStatusBadgeProps) {
  const statusMap = {
    paid: {
      bgColor: "bg-green-100",
      textColor: "text-sm text-success-700",
      iconColor: "bg-green-600",
      label: "Paid",
    },
    pending: {
      bgColor: "bg-warning-50",
      textColor: "text-sm text-warning-500",
      iconColor: "bg-warning-500",
      label: "Waiting payment",
    },
    overdue: {
      bgColor: "bg-red-100",
      textColor: "text-sm text-danger-700",
      iconColor: "bg-red-600",
      label: "Overdue",
    },
  };
  const style = statusMap[status];
  if (!style) return null;
  const { bgColor, textColor, iconColor, label } = style;
  return (
    <div className="w-full flex items-center justify-center">
      <div
        className={`flex items-center gap-2 px-3 py-1 w-fit rounded-2xl ${bgColor}`}
      >
        <span className={`w-2 h-2 rounded-full ${iconColor}`}></span>
        <span className={`${textColor} font-medium`}>{label}</span>
      </div>
    </div>
  );
}
