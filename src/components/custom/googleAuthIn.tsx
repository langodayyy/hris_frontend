"use client";

import React, { useState } from "react";
import { Button } from "../ui/button";
import { GoogleLogin, useGoogleLogin } from "@react-oauth/google";
import { useRouter } from "next/navigation";
import { useFormContext } from "@/context/FormContext";
import Cookies from "js-cookie";

export default function GoogleAuthInButton() {
  const router = useRouter();
  const { setErrors } = useFormContext();
  const [isLoading, setLoading] = useState(false);

  // const login = useGoogleLogin({
  //     onSuccess: async credentialResponse => {
  //         setLoading(true);
  //         console.log(credentialResponse);
  //         console.log(credentialResponse.access_token);

  //         const response = await signupGoogle(credentialResponse.access_token)

  //         if (response.success) {
  //             setLoading(false);

  //             router.push("sign-up/complete-registration");
  //           } else {
  //             console.log("Error:", response.errors);
  //             setErrors(response.errors);
  //           }
  //     },
  //     onError: (error) => console.log('Login Failed:', error)
  //   });
  return (
    <GoogleLogin
      text="signin_with"
      locale="en"
      onSuccess={async (credentialResponse) => {
        setLoading(true);

        const response = await signinGoogle(credentialResponse.credential!);
          if (response.success) {
            setLoading(false);
            if (Cookies.get("token")) {
              Cookies.remove("token");
            }
            Cookies.set("token", response.data.token, { expires:7, secure:true});
            if (response.data.is_profile_complete) {
              router.push("dashboard");
            } else {
              router.push("sign-up/complete-registration");
            }
          } else {
            setErrors(response.errors);
          }
      }}
      onError={() => {
        console.log("Login Failed");
      }}
    />

    // <Button variant={"outline"} onClick={() => login()}>
    //   <svg
    //     width="21"
    //     height="20"
    //     viewBox="0 0 21 20"
    //     fill="none"
    //     xmlns="http://www.w3.org/2000/svg"
    //   >
    //     <path
    //       d="M20.5 10.2273C20.5 9.51818 20.4351 8.83636 20.3145 8.18182H10.7041V12.0545H16.1957C15.9545 13.3 15.231 14.3545 14.1456 15.0636V17.5818H17.4573C19.3868 15.8364 20.5 13.2727 20.5 10.2273Z"
    //       fill="#4285F4"
    //     />
    //     <path
    //       d="M10.7041 20C13.4592 20 15.769 19.1091 17.4573 17.5818L14.1456 15.0636C13.2365 15.6636 12.077 16.0273 10.7041 16.0273C8.05102 16.0273 5.79685 14.2727 4.9898 11.9091H1.59462V14.4909C3.27365 17.7545 6.71521 20 10.7041 20Z"
    //       fill="#34A853"
    //     />
    //     <path
    //       d="M4.9898 11.9C4.78571 11.3 4.66512 10.6636 4.66512 10C4.66512 9.33636 4.78571 8.7 4.9898 8.1V5.51818H1.59462C0.898887 6.86364 0.5 8.38182 0.5 10C0.5 11.6182 0.898887 13.1364 1.59462 14.4818L4.2384 12.4636L4.9898 11.9Z"
    //       fill="#FBBC05"
    //     />
    //     <path
    //       d="M10.7041 3.98182C12.2069 3.98182 13.5427 4.49091 14.6095 5.47273L17.5315 2.60909C15.7597 0.990909 13.4592 0 10.7041 0C6.71521 0 3.27365 2.24546 1.59462 5.51818L4.9898 8.1C5.79685 5.73636 8.05102 3.98182 10.7041 3.98182Z"
    //       fill="#EA4335"
    //     />
    //   </svg>
    //   Sign Up with Google
    // </Button>
  );
}

export async function signinGoogle(id_token: string) {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/signin-with-google`,
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
