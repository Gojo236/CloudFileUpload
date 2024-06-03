import SideBar from "../components/SideBar";
import SearchBar from "../components/SearchBar";
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
