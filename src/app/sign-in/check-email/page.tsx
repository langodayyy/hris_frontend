import { Suspense } from "react";
import CheckEmail from "@/components/custom/checkEmail";
import { Spinner } from "@/components/ui/spinner";

export default function CheckEmailPage() {
  return (
    <Suspense fallback={<Spinner size="small" />}>
      <CheckEmail />
    </Suspense>
  );
}