import connectDB from "@/lib/connectDb";
import Folder, { IFolder } from "@/model/Folder";
import { NextApiRequest } from "next";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";

export async function GET() {
    await connectDB();
    const session = await getServerSession();
    if (!session?.user?.email)
        return;
    const folders = await Folder.find({
        userEmail: session?.user?.email
    });

    const res = folders.map((folder: IFolder) => {
        return {
            id: folder._id,
            name: folder.name
        }
    })
    return NextResponse.json(res)
}

export async function POST(req: NextRequest) {
    const session = await getServerSession();
    if(!session)
    {
        return new Response("Login First",{
            status: 401
        });
    }
    
    try {
        await connectDB();

        const data = await req.json();
        const { name, parentFolder } = data;

        if (!name) {
            return new Response("Missing required fields", {
                status: 400
            });
        }

        const newFolder: IFolder = new Folder({
            name,
            parentFolder: parentFolder || null,
            userEmail: session?.user?.email
        });

        await newFolder.save();

        return new Response(JSON.stringify({ msg: "Folder created successfully", folder: newFolder }), {
            status: 201,
            headers: { 'Content-Type': 'application/json' }
        });

    } catch (error) {
        console.error("Error creating folder:", error);
        return new Response("Internal Server Error", {
            status: 500
        });
    }
}