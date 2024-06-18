import connectDB from "@/lib/connectDb";
import Folder, { IFolder } from "@/model/Folder";
import mongoose from "mongoose";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  await connectDB();
  const session = await getServerSession();
  if (!session?.user?.email) return;

  const searchParams = new URLSearchParams(
    req.url.split("?").length != 0 ? req.url.split("?")[1] : "",
  );
  const folderIdCheck = searchParams.get("folderId");
  const folderId = folderIdCheck
    ? mongoose.Types.ObjectId.isValid(folderIdCheck)
      ? folderIdCheck
      : null
    : null;

  let folder;
  if (folderId) {
    folder = await Folder.find({
      userEmail: session?.user?.email,
      parentFolder: folderId,
    });
  } else {
    folder = await Folder.find({
      userEmail: session?.user?.email,
    });
  }
  if (!folderId) return NextResponse.json([{ name: "home", id: "" }]);
  const pathToRoot = await getParentFolders(folderId);
  return NextResponse.json(pathToRoot);
}

type PathToRoot = Array<{ name: string; id: string }>;

async function getParentFolders(
  folderId: string | undefined | null,
): Promise<PathToRoot> {
  let list: PathToRoot = [];
  while (folderId) {
    const folder = await Folder.find({ _id: folderId });
    list.push({ name: folder[0].name, id: folder[0]._id });
    folderId = folder[0].parentFolder;
  }
  list.push({ name: "home", id: "" });
  return list.reverse();
}
