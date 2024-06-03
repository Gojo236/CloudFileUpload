'use client';
import { Inter } from "next/font/google";
import { SessionProvider } from "next-auth/react";
import './globals.css'
import { CssBaseline, StyledEngineProvider } from "@mui/material";
import {
  QueryClient,
  QueryClientProvider,
  useQuery,
} from '@tanstack/react-query'
import SideBar from "@/components/SideBar";

const queryClient = new QueryClient()
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
        <html lang="en" id="_next">
          <body className={inter.className}>
              {children}
          </body>
        </html>
      </SessionProvider>
    </QueryClientProvider>
  );
}
