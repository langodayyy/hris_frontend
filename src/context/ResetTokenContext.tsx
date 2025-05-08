"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

type ResetPassContextType = {
  token?: string | null;
  isLoading: boolean;
};

const ResetPassContext = createContext<ResetPassContextType | undefined>(
  undefined
);

export function ResetPassProvider({ children }: { children: React.ReactNode }) {
  const [token, setToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    // Initialize auth from cookies
    const initializeAuth = async () => {
      const tokenFromURL = searchParams.get("token");
      setToken(tokenFromURL);

      try {
        if (tokenFromURL) {
          const response = await fetch(
            `${process.env.NEXT_PUBLIC_API_URL}/token-checker`,
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({ token: tokenFromURL }),
            }
          );

          if (!response.ok) {
            router.push("/sign-in/link-expired"); // Redirect to sign-in page
            return;
          }
        } else {
          router.push("/sign-in/link-expired"); // Redirect to sign-in page if no token
        }
      } catch (error) {
        console.error("Error initializing token checker:", error);
        router.push("/sign-in"); // Redirect to sign-in page on error
      } finally {
        setIsLoading(false);
      }
    };

    initializeAuth();
  }, [router]);

  return (
    <ResetPassContext.Provider
      value={{ token, isLoading }}
    >
      {children}
    </ResetPassContext.Provider>
  );
}

export function useResetPassContext() {
  const context = useContext(ResetPassContext);
  if (context === undefined) {
    throw new Error(
      "useResetPassContext must be used within an ResetPassProvider"
    );
  }
  return context;
}
