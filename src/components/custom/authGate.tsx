'use client'

import { useAuth } from "@/context/v1";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

export default function AuthGate({ children }: { children: React.ReactNode }) {
  const { isLoading } = useAuth();
  const [isClient, setIsClient] = useState(false)
  const pathname = usePathname();

  const publicPaths = ["/sign-in", "/sign-up", "/oauth-redirect", "/sign-in/as-empoyee", "/sign-in/check-mail", "/sign-in/forgot-password", "/sign-in/link-expired", "/sign-in/set-new-password", "/sign-in/success-set-password", "/sign-up/complete-registration", "/" ];

  useEffect(() => {
    setIsClient(true) // This ensures rendering happens only on the client
  }, [])

  if (!isClient || isLoading || !publicPaths.includes(pathname)) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-accent-400">
        <p className="text-gray-500 text-xl">Loading...</p>
      </div>
    );
  }

  if (publicPaths.includes(pathname)) {
    return <>{children}</>
  }

  return <>{children}</>;
}
