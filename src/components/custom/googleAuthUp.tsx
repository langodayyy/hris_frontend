"use client";

import React, { useState } from "react";
import { GoogleLogin } from "@react-oauth/google";
import { useRouter } from "next/navigation";
import { useFormContext } from "@/context/FormContext";
import Cookies from "js-cookie";

export default function GoogleAuthUpButton() {
  const router = useRouter();
  const { setErrors } = useFormContext();
  const [isLoading, setLoading] = useState(false);

  return (
    <GoogleLogin
      text="signup_with"
      locale="en"
      onSuccess={async (credentialResponse) => {
        setLoading(true);

        const response = await signupGoogle(credentialResponse.credential!);
          if (response.success) {
            setLoading(false);
            if (Cookies.get("token")) {
              Cookies.remove("token");
            }
            Cookies.set("token", response.data.token, { expires:7, secure:true });

            router.push("sign-up/complete-registration");
          } else {
            setErrors(response.errors);
          }
      }}
      onError={() => {
        console.log("Login Failed");
      }}
    />
  );
}

export async function signupGoogle(id_token: string) {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/signup-with-google`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id_token }),
      }
    );

    if (!response.ok) {
      // If the response is not OK, parse the error response
      const errorData = await response.json();
      return { success: false, errors: errorData.errors };
    }

    // Parse and return the success response
    const data = await response.json();

    return { success: true, data };
  } catch (error: any) {
    // Handle network or other unexpected errors
    return {
      success: false,
      errors: { general: [error.message || "An unexpected error occurred"] },
    };
  }
}
