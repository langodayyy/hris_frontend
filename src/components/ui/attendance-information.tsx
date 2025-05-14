import { number } from "zod";

interface InformationProps {
  label: string;
  value?: string | number;
}

const Information: React.FC<InformationProps> = ({ label, value }) => {
  const displayValue =
    typeof value === "string" && value.length > 25
      ? `${value.slice(0, 25)}...`
      : value;

  return (
    <div className="flex flex-col gap-2">
      <div className="border-2 border-neutral-900 w-12"></div>
      <span className="text-neutral-400 text-xs">{label}</span>
      <span
        className="text-xs font-semibold"
        title={typeof value === "string" ? value : undefined}
      >
        {displayValue}
      </span>
    </div>
  );
};

export default Information;
