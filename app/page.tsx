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

  const folderId = search.get("folderId");
  const sideBarActionsDataFetchURLs = [
    `/api/folder?folderId=${folderId}`,
    `/api/file`,
    `/api/file/trash`
  ];
  return (
    <main >
      <div className="tw-flex tw-gap-8 tw-bg-slate-200 tw-h-screen">
        <SideBar selectedIndex={selectedIndex} setSelectedIndex={setSelectedIndex} sideBarActions={sideBarActions} />
        <div className="tw-w-full tw-flex">
          <div className="tw-flex tw-flex-col tw-m-4">
            <SearchBar />
            <BreadCrumbs />
            <DocExplorer fetchDataURL={sideBarActionsDataFetchURLs[selectedIndex]} key={selectedIndex.toString() + folderId} />
          </div>
        </div>
      </div>
    </main>
  );
}
