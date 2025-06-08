import React, { useState } from "react";
import { Button } from "./button";
import { useRouter } from "next/navigation";
import {
  AlertDialog,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogAction,
  AlertDialogCancel,
} from "./alert-dialog";

interface PriceCardProps {
  title: string;
  currency: string;
  price: string;
  description: string;
  imageUrl: string;
  canAccess: string[];
  canNotAccess?: string[];
  buttonText: string;
  onClick?: boolean; // Jika true, navigate ke /sign-up
  alertDialog?: boolean; // Jika true, tampilkan alert dialog
  isCurrentPlan?: boolean; // Menandai plan aktif
}

const PriceCard: React.FC<PriceCardProps> = ({
  title,
  currency,
  price,
  description,
  imageUrl,
  canAccess,
  canNotAccess,
  buttonText,
  onClick = false,
  alertDialog = false,
  isCurrentPlan = false,
}) => {
  const router = useRouter();
  const [open, setOpen] = useState(false);

  const handleButtonClick = () => {
    if (onClick) {
      router.push("/sign-up");
    } else if (alertDialog) {
      setOpen(true);
    }
  };

  return (
    <div className="flex flex-col px-8 py-5 outline-2 outline-gray-200 w-full h-full gap-2.5 text-center rounded-2xl bg-white">
      <span className="text-[25px] font-sans font-bold">{title}</span>
      <div
        className="flex min-w-[255px] min-h-[214px] bg-cover bg-center items-center py-4 px-10 gap-3.5 flex-col text-center justify-center text-white rounded-2xl"
        style={{ backgroundImage: `url(${imageUrl})` }}
      >
        <div className="flex flex-col gap-0.5">
          <span className="text-2xl font-bold font-sans">{currency}</span>
          <span className="text-5xl font-bold font-sans">{price}</span>
          <span>per user /month</span>
        </div>
        <span className="text-sm">{description}</span>
      </div>

      <span>Get started with..</span>
      <div className="border-b border-gray-200" />
      <div className="flex flex-col gap-3">
        {canAccess.map((feature, index) => (
          <span key={index} className="flex flex-row items-center gap-3">
            <svg
              width="14"
              height="14"
              viewBox="0 0 14 14"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M14 1L4.9 12L1 7.875"
                stroke="#2FCF3F"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            <span className="text-start text-sm gap-2">{feature}</span>
          </span>
        ))}
        {(canNotAccess ?? []).map((feature, index) => (
          <span key={index} className="flex flex-row items-center gap-3">
            <svg
              width="14"
              height="14"
              viewBox="0 0 14 14"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M13 1.00005L1 13M0.999949 1L12.9999 13"
                stroke="#F51B0D"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            <span className="text-start text-sm gap-2">{feature}</span>
          </span>
        ))}
      </div>
      <div className="border-b border-gray-200" />
      {alertDialog ? (
        <AlertDialog open={open} onOpenChange={setOpen}>
          <AlertDialogTrigger asChild>
            <Button
              className="text-white px-6 py-3"
              onClick={handleButtonClick}
              disabled={isCurrentPlan}
            >
              {isCurrentPlan ? "Your current plan" : buttonText}
            </Button>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Are you sure you want to change your current plan? </AlertDialogTitle>
              <AlertDialogDescription>
               This change will take effect and will impact your bill next month.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel className="w-fit">No</AlertDialogCancel>
              <AlertDialogAction
              className="w-auto"
              onClick={() => window.history.back()}
            >Yes</AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      ) : (
        <Button
          className="text-white px-6 py-3"
          onClick={handleButtonClick}
          disabled={isCurrentPlan}
        >
          {isCurrentPlan ? "Your current plan" : buttonText}
        </Button>
      )}
    </div>
  );
};

export default PriceCard;
