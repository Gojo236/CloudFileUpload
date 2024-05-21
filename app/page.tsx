import SideBar from "../components/SideBar";
import SearchBar from "../components/SearchBar";
import RecentFolders from "../components/RecentFolders";
import RecentFiles from "../components/RecentFiles";
import { getServerSession } from "next-auth";
import Login from "./login/page";
import { authOptions } from "@/authOptions";

export default async function Home() {
  const session = await getServerSession(authOptions);

  if (!session) {
    console.log("LOGIN");
    return <Login />;
  }
 
  return (
    <main className="tw-flex tw-flex-row tw-gap-4 tw-bg-slate-200 tw-h-screen">
      <SideBar />
      <div className="tw-w-full tw-flex tw-justify-center">
        <div className="tw-flex tw-flex-col tw-items-center tw-w-9/12 tw-m-4">
          <SearchBar />
          <RecentFolders />
          <RecentFiles />
        </div>
      </div>
    </main>
  );
}
