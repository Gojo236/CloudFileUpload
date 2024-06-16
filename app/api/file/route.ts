import connectDB from "@/lib/connectDb";

import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";

import { storage } from "@/config/firebaseConfig";
import { ref, uploadBytes, getDownloadURL, deleteObject } from "firebase/storage";
import Doc, { IDoc } from "@/model/Doc";
import mongoose from "mongoose";
import Folder, { IFolder } from "@/model/Folder";

export async function POST(req: NextRequest) {
    const session = await getServerSession();
    if (!session) {
        return new Response("Login First", {
            status: 401
        });
    }
    await connectDB();
    const formData = await req.formData()
    if (!formData.get("file")) {
        return new Response(JSON.stringify({ msg: "UploadFile" }), {
            status: 400,
            headers: { 'Content-Type': 'application/json' }
        });
    }
    const file = formData.get("file") as File;

    const fileId = new mongoose.Types.ObjectId()
    const storageRef = ref(storage, fileId.toString());
    const arrayBuffer = await file.arrayBuffer();

    await uploadBytes(storageRef, arrayBuffer);
    const uri = await getDownloadURL(storageRef)
    const newDoc: IDoc = new Doc({
        _id: fileId,
        name: file.name,
        parentFolder: formData.get("parentFolder"),
        userEmail: session?.user?.email,
        downloadURL: uri.toString(),
        docSize: file.size
    });

    await updateParentFoldersSize(formData.get("parentFolder")?.toString(), file.size);
    await newDoc.save()
    return new Response(JSON.stringify(newDoc), {
        status: 201,
        headers: { 'Content-Type': 'application/json' }
    });

}

export async function GET() {
    await connectDB();
    const session = await getServerSession();
    if (!session?.user?.email)
        return;
    await connectDB();
    const docs = await Doc.find({
        userEmail: session?.user?.email,
        deletedAt: null
    });

    return NextResponse.json({
        userDocs:
            docs.map((doc) => {
                return {
                    id: doc._id,
                    name: doc.name,
                    downloadURL: doc.downloadURL,
                    docSize: doc.size,
                    updatedAt: doc.updatedAt,
                }
            }
            )
    })
}

export async function DELETE(req: NextRequest) {
    const session = await getServerSession();
    if (!session) {
        return new Response("Login First", {
            status: 401
        });
    }

    const searchParams = new URLSearchParams(req.url.split('?')[1]);
    const id = searchParams.get('id');
    if (!id) {
        return new Response(JSON.stringify({ msg: "Document ID is required" }), {
            status: 400,
            headers: { 'Content-Type': 'application/json' }
        });
    }

    await connectDB();

    try {
        const document = await Doc.findById(id);
        if (!document) {
            return new Response(JSON.stringify({ msg: "Document not found" }), {
                status: 404,
                headers: { 'Content-Type': 'application/json' }
            });
        }

        if (document.deletedAt != null) {
            const storageRef = ref(storage, document._id.toString());
            await deleteObject(storageRef);
            await Doc.findByIdAndDelete(id);
        }
        else {
            document.deletedAt = Date.now();
            updateParentFoldersSize(document.parentFolder, -1 * document.docSize)
            await document.save();
        }
        return new Response(JSON.stringify({ msg: "File deleted successfully" }), {
            status: 200,
            headers: { 'Content-Type': 'application/json' }
        });
    } catch (error) {
        console.error(error);
        return new Response(JSON.stringify({ msg: "Internal Server Error" }), {
            status: 500,
            headers: { 'Content-Type': 'application/json' }
        });
    }
}

export async function updateParentFoldersSize(folderId: String | null | undefined, size: number) {
    if (!folderId)
        return;
    const folder = await Folder.findById(folderId);
    if(!folder)
        return;
    folder.size += size;
    folder.save();
    updateParentFoldersSize(folder.parentFolder, size);
}