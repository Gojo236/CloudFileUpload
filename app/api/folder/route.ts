import connectDB from "@/lib/connectDb";
import Folder, { IFolder } from "@/model/Folder";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";

export async function GET() {
    await connectDB();
    const session = await getServerSession();
    if(!session?.user?.email)
        return;
    const folders = await Folder.find({
        userEmail: session?.user?.email
    });

    const res = folders.map((folder: IFolder)=>{
        return {
            id: folder._id,
            name: folder.name
        }
    })
    return NextResponse.json(res)
}

export async function POST(req: NextRequest) {
    console.log("HII2");
    return NextResponse.json({msg:"Hi222"});
  }