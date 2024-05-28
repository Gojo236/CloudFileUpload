import SideBar from "../components/SideBar";
import SearchBar from "../components/SearchBar";
import RecentFolders from "../components/RecentFolders";
import RecentFiles from "../components/RecentFiles";
import { getServerSession } from "next-auth";
import Login from "./login/page";
import { authOptions } from "@/authOptions";
import DocExplorer from "@/components/DocExplorer";
import BreadCrumbs from "@/components/BreadCrumbs";

export default async function Home() {
  const session = await getServerSession(authOptions);

  if (!session) {
    console.log("LOGIN");
    return <Login />;
  }

  return (
    <main >
      <div className="tw-w-full tw-flex tw-justify-center">
        <div className="tw-flex tw-flex-col tw-m-4">
          <SearchBar />
          {/* <BreadCrumbs/> */}
          <DocExplorer />
          {/* <RecentFolders />
          <RecentFiles /> */}
        </div>
      </div>
    </main>
  );
}
