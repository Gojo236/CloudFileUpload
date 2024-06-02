import connectDB from "@/lib/connectDb";
import Doc from "@/model/Doc";
import Folder, { IFolder } from "@/model/Folder";
import mongoose from "mongoose";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
    await connectDB();
    const session = await getServerSession();
    if (!session) {
        return new Response("Login First", {
            status: 401
        });
    }

    const searchParams = new URLSearchParams(req.url.split("?")[1])

    const folderIdCheck = searchParams.get("folderId");
    const folderId = folderIdCheck ? (mongoose.Types.ObjectId.isValid(folderIdCheck) ? folderIdCheck : null) : null;

    const folders = await Folder.find({
        userEmail: session?.user?.email,
        parentFolder: (folderId == "null") ? null : folderId
    });

    const docs = await Doc.find({
        userEmail: session?.user?.email,
        parentFolder: (folderId == "null") ? null : folderId,
        deletedAt: null
    });

    const userFolders = folders?.map((folder) => {
        return {
            id: folder._id,
            name: folder.name,
            updatedAt: folder.updatedAt,
            size: folder.size
        }
    })

    const userDocs = docs?.map((doc) => {
        return {
            id: doc._id,
            name: doc.name,
            downloadURL: doc.downloadURL,
            docSize: doc.docSize,
            updatedAt: doc.updatedAt,
        }
    })

    return NextResponse.json({ userFolders, userDocs });
}

export async function POST(req: NextRequest) {
    const session = await getServerSession();
    if (!session) {
        return new Response("Login First", {
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