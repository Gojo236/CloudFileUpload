"use client";
import React from "react";
import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { Button } from "@mui/material";

function Login() {
  const router = useRouter();
  const handleGoogleSignIn = () => {
    signIn("google");
    router.push("/");
  };

  const { data: session, status } = useSession();
  if (status === "authenticated") {
    router.push("/");
  }
  if (status === "loading") {
    return;
  }

  return (
    <div className="tw-flex tw-items-center tw-justify-items-center tw-justify-center tw-min-h-screen tw-min-w-screen">
      <Button
        onClick={() => handleGoogleSignIn()}
        color="success"
        variant="contained"
      >
        Sign in with Google
      </Button>
    </div>
  );
}

export default Login;
