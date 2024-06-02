import connectDB from "@/lib/connectDb";

import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";

import { storage } from "@/config/firebaseConfig";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import Doc, { IDoc } from "@/model/Doc";
import mongoose from "mongoose";

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


    const uri = await getDownloadURL(storageRef)
    const newDoc: IDoc = new Doc({
        _id: fileId,
        name: file.name,
        parentFolder: formData.get("parentFolder"),
        userEmail: session?.user?.email,
        downloadURL: uri.toString(),
        docSize: file.size
    });


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
        userEmail: session?.user?.email
    });

    return NextResponse.json(docs.map((doc) => {
        return {
            id: doc._id,
            name: doc.name,
            downloadURL: doc.downloadURL,
            docSize: doc.docSize,
            updatedAt: doc.updatedAt,
        }
    }))
}