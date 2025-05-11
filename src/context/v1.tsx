"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import Cookies from "js-cookie";
import { permanentRedirect, redirect, useRouter } from "next/navigation";

type AuthContextType = {
  // signInWithGoogle: () => Promise<void>
  signOut: () => Promise<void>;
  isLoading: boolean;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  // const [user, setUser] = useState(null)
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  const publicPaths = ["/sign-in", "/sign-up", "/oauth-redirect", "/sign-in/as-empoyee", "/sign-in/check-mail", "/sign-in/forgot-password", "/sign-in/link-expired", "/sign-in/set-new-password", "/sign-in/success-set-password", "/sign-up/complete-registration", "/" ];

  useEffect(() => {
    // Initialize auth from cookies
    const initializeAuth = async () => {
      try {
        const userCookie = Cookies.get("token"); // Read user data from cookie
        if (userCookie) {
          const response = await fetch(
            `${process.env.NEXT_PUBLIC_API_URL}/api/verify-token`,
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${userCookie}`,
              },
            }
          );

          if (!response.ok) {
            Cookies.remove("token");
            permanentRedirect("/sign-in"); // Redirect to sign-in page
            return;
          }
        } else {
          // Allow access to sign-up page if not authenticated
          if (!publicPaths.includes(window.location.pathname)) {
            permanentRedirect("/sign-in");
          }
        }
      } catch (error) {
        console.error("Error initializing auth:", error);
        redirect("/sign-in"); // Redirect to sign-in page on error
      } finally {
        setIsLoading(false);
      }
    };

    initializeAuth();
  }, [router]);

  const signOut = async () => {
    try {
      const userCookie = Cookies.get("token");
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/logout`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${userCookie}`,
          },
        }
      );
      if (!response.ok) {
        Cookies.remove("token");
        redirect("/sign-in"); // Redirect to sign-in page
        return;
      }
      router.push("/");
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };

  return (
    <AuthContext.Provider value={{ signOut, isLoading }}>
      { children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
