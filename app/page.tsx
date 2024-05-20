"use client";
import { useSession } from "next-auth/react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import SideBar from "./components/SideBar";
import { Box, CssBaseline, Slider, TextField } from "@mui/material";
import SearchBar from "./components/SearchBar";
import FolderIcon from '@mui/icons-material/Folder';
import FolderCopyTwoToneIcon from '@mui/icons-material/FolderCopyTwoTone';
import RecentFolders from "./components/RecentFolders";
import RecentFiles from "./components/RecentFiles";
export default function Home() {
  const router = useRouter();
  const { data: session, status } = useSession();
  if (status === "unauthenticated") {
    router.push("/login")
    return
  }
  if (status === "loading") {
    return;
  }

  console.log("data ", session?.user)

 
  return (
    <main className="tw-flex tw-flex-row tw-gap-4 tw-bg-slate-200 tw-h-screen">
      <SideBar />
      <div className="tw-w-full tw-flex tw-justify-center">
        <div className="tw-flex tw-flex-col tw-items-center tw-w-9/12 tw-m-4">
          <SearchBar />
          <RecentFolders/>
          <RecentFiles/>
        </div>
      </div>
    </main>
  );
}
