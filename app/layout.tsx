'use client';
import { Inter } from "next/font/google";
import { SessionProvider } from "next-auth/react";
import './globals.css'
import { CssBaseline, StyledEngineProvider } from "@mui/material";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <SessionProvider>
        <CssBaseline />
        <html lang="en" id="_next">
          <body className={inter.className}>{children}</body>
        </html>
    </SessionProvider>
  );
}
