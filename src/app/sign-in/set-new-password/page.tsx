"use client";
import SetNewPassForm from "@/components/custom/setNewPassword";
import { Spinner } from "@/components/ui/spinner";
import { useFormContext } from "@/context/FormContext";
import {
  ResetPassProvider,
  useResetPassContext,
} from "@/context/ResetTokenContext";
import { Suspense } from "react";

function SetNewPasswordContent() {
  const { isLoading } = useResetPassContext();
  const { errors } = useFormContext();

  console.log("errors", errors);

  return (
    <div className="relative w-1/2 flex flex-col items-center justify-center px-[80px] py-[10px] gap-[25px] overflow-y-auto">
      {isLoading && (
        <div className="absolute inset-0 z-10 flex items-center justify-center bg-white/80">
          <Spinner size="small" />
        </div>
      )}

      <h4 className="text-[34px] font-medium text-neutral-900">
        Set New Password
      </h4>
      <p className="text-base text-neutral-500 text-center">
        Enter your new password below to complete the reset process. Ensure it’s
        strong and secure.
      </p>

      {/* error message when fail validation from backend */}
      {Object.entries(errors).map(([field, messages]) => (
        <div key={field} className="w-full justify-start text-danger-700">
          {Array.isArray(messages) ? (
            messages.map((message, idx) => <div key={idx}>{message}</div>)
          ) : (
            <div>{messages}</div>
          )}
        </div>
      ))}

      <SetNewPassForm />

      <div className="flex items-center justify-center w-full text-sm gap-[10px]">
        <img src="/arrow-left.svg" alt="left arrow Icon" />
        <a href="/sign-in" className="text-info-500 hover:underline">
          Back to Sign In
        </a>
      </div>
    </div>
  );
}

export default function SetNewPassword() {
  return (
    <Suspense fallback={<Spinner size="small" />}>
      <ResetPassProvider>
        <div className="flex h-screen w-screen bg-white p-[23px]">
          <SetNewPasswordContent />

          {/* image */}
          <div className="w-1/2">
            <img
              className="h-full w-full object-cover rounded-[10px]"
              src="/images/signin signup.png"
              alt="cover.png"
            />
          </div>
        </div>
      </ResetPassProvider>
    </Suspense>
  );
}
