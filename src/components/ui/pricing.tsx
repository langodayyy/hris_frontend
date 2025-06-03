import React from "react";
import { Button } from "./button";

interface PriceCardProps {
  title: string;
  currency: string;
  price: string;
  description: string;
  imageUrl: string;
  features: string[];
  buttonText: string;
}

const PriceCard: React.FC<PriceCardProps> = ({
  title,
  currency,
  price,
  description,
  imageUrl,
  features,
  buttonText
}) => {
  return (
    <div className="flex flex-col px-8 py-5 outline-2 outline-gray-200 w-full h-full gap-2.5 text-center rounded-2xl">
      <span className="text-[25px] font-sans font-bold">{title}</span>
      <div
        className="flex w-full h-full bg-cover bg-center items-center py-4 px-10 gap-3.5 flex-col text-center justify-center text-white rounded-2xl"
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
        {features.map((feature, index) => (
          <span key={index} className="flex flex-row items-center gap-3">
            <svg
              width="15"
              height="13"
              viewBox="0 0 15 13"
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
            {feature}
          </span>
        ))}
      </div>

      <div className="border-b border-gray-200" />
      <a href="/sign-up">
        <Button className="text-white px-6 py-3">{buttonText}</Button>
      </a>
    </div>
  );
};

export default PriceCard;
