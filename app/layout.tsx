"use client";
import { Inter } from "next/font/google";
import { SessionProvider } from "next-auth/react";
import "./globals.css";
import { CssBaseline } from "@mui/material";
import {
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";
import { Suspense } from "react";

const queryClient = new QueryClient();
const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <QueryClientProvider client={queryClient}>
      <SessionProvider>
        <CssBaseline />
        <Suspense>
          <html lang="en" id="_next">
            <body className={inter.className}>{children}</body>
          </html>
        </Suspense>
      </SessionProvider>
    </QueryClientProvider>
  );
}
