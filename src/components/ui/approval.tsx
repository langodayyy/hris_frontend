interface ApprovalStatusBadgeProps {
  status: "Approved" | "Pending" | "Rejected" | "On Time" | "Late";
}

export function ApprovalStatusBadge({ status }: ApprovalStatusBadgeProps) {
  const statusStyles = {
    Approved: {
      bgColor: "bg-green-100",
      textColor: "text-sm text-success-700",
      iconColor: "bg-green-600",
    },
    Pending: {
      bgColor: "bg-warning-50",
      textColor: "text-sm text-warning-500",
      iconColor: "bg-warning-500",
    },
    Rejected: {
      bgColor: "bg-red-100",
      textColor: "text-sm text-danger-700",
      iconColor: "bg-red-600",
    },
    "On Time": {
      bgColor: "bg-green-100",
      textColor: "text-xs text-success-700",
      iconColor: "bg-green-600",
    },
    Late: {
      bgColor: "bg-red-100",
      textColor: "text-xs text-danger-700",
      iconColor: "bg-red-600",
    },
  };

  const style = statusStyles[status];

  if (!style) {
    console.error(`Invalid status: ${status}`);
    return null; // Return null if the status is invalid
  }

  const { bgColor, textColor, iconColor } = style;

  return (
    <div className="w-full flex items-center justify-center">
      <div
        className={`flex items-center gap-2 px-3 py-1 w-fit rounded-2xl ${bgColor}`}
      >
        <span className={`w-2 h-2 rounded-full ${iconColor}`}></span>
        <span className={`${textColor} font-medium`}>{status}</span>
      </div>
    </div>
  );
}
