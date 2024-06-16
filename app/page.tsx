'use client';
import SideBar from "../components/SideBar";
import SearchBar from "../components/SearchBar";
import DocExplorer from "@/components/DocExplorer";
import BreadCrumbs from "@/components/BreadCrumbs";
import { useState } from "react";
import { useSearchParams } from "next/navigation";

export default function Home() {
  const search = useSearchParams()
  const sideBarActions = ['Home', 'My Files', 'Trash', 'Starred'];
  const [selectedIndex, setSelectedIndex] = useState(0);

  const getFiles = async () => {
    const response = await fetch(`/api/folder?folderId=${search.get("folderId")}`);
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    const result = await response.json();
    console.log(result)
    return result
  };

  return (
    <main >
      <div className="tw-flex tw-gap-8 tw-bg-slate-200 tw-h-screen">
        <SideBar selectedIndex={selectedIndex} setSelectedIndex={setSelectedIndex} sideBarActions={sideBarActions} />
        <div className="tw-w-full tw-flex">
          <div className="tw-flex tw-flex-col tw-m-4">
            <SearchBar />
            <BreadCrumbs />
            <DocExplorer fetchData ={getFiles} key={search.get("folderId")}/>
          </div>
        </div>
      </div>
    </main>
  );
}
