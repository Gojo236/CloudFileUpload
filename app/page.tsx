'use client';
import SideBar from "../components/SideBar";
import SearchBar from "../components/SearchBar";
import DocExplorer from "@/components/DocExplorer";
import BreadCrumbs from "@/components/BreadCrumbs";
import { useState } from "react";

export default function Home() {
  const sideBarActions = ['Home', 'My Files', 'Trash', 'Starred'];
  const [selectedIndex, setSelectedIndex] = useState(0);
  
  return (
    <main >
      <div className="tw-flex tw-gap-8 tw-bg-slate-200 tw-h-screen">
        <SideBar selectedIndex={selectedIndex} setSelectedIndex={setSelectedIndex} sideBarActions={sideBarActions}/>
        <div className="tw-w-full tw-flex">
          <div className="tw-flex tw-flex-col tw-m-4">
            <SearchBar />
            <BreadCrumbs />
            <DocExplorer />
          </div>
        </div>
      </div>
    </main>
  );
}
