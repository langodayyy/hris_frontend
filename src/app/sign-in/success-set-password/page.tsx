import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function SuccessSetPassword() {
  return (
    <div className="flex h-screen w-screen bg-white p-[23px]">
      {/* form  */}
      <div className="w-1/2 flex flex-col items-center justify-center px-[80px] py-[10px] gap-[25px] overflow-y-auto">
        <img src="/ep_success-filled.svg" alt="success_icon" />
        <h4 className="text-[34px] font-medium text-neutral-900 text-center">
          Your password has been succesfully reset
        </h4>
        <p className="text-base text-neutral-500 text-center">
          You can log in with yournew password. If you encounter any issues,
          please contact support!
        </p>
        <Link className="w-full" href="/sign-in">
          <Button>Sign In</Button>
        </Link>
      </div>
      {/* image */}
      <div className="w-1/2">
        <img
          className=" h-full w-full object-cover rounded-[10px]"
          src="/images/signin signup.png"
          alt="cover.png"
        />
      </div>
    </div>
  );
}
