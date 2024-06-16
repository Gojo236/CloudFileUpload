import SideBar from "../components/SideBar";
import SearchBar from "../components/SearchBar";
import DocExplorer from "@/components/DocExplorer";
import BreadCrumbs from "@/components/BreadCrumbs";

export default async function Home() {
  return (
    <main >
      <div className="tw-flex tw-gap-8 tw-bg-slate-200 tw-h-screen">
        <SideBar />
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
