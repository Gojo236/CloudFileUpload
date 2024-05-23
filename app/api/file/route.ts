import connectDB from "@/lib/connectDb";
import Folder, { IFolder } from "@/model/Folder";
import { NextApiRequest } from "next";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";

import { storage } from "@/config/firebaseConfig";
import { ref, uploadBytes } from "firebase/storage";
import { readFile, readFileSync } from "fs";

const filePath = process.cwd() + "/app/api/file/Hello.txt";
// 'file' comes from the Blob or File API

export async function POST(req: NextRequest) {
    const session = await getServerSession();
    if (!session) {
        return new Response("Login First", {
            status: 401
        });
    }
    const formData = await req.formData()
    if(! formData.get("file"))
    {
        return new Response(JSON.stringify({ msg: "UploadFile" }), {
            status: 400,
            headers: { 'Content-Type': 'application/json' }
        });
    
    }
    const file = formData.get("file") as File;
    console.log(file);

    const storageRef = ref(storage, file.name);
    console.log(filePath);
    const arrayBuffer = await file.arrayBuffer();
    uploadBytes(storageRef, arrayBuffer).then((snapshot) => {
        console.log('File Uploaded Successfully');
    });

    return new Response(JSON.stringify({ msg: "Hi" }), {
        status: 201,
        headers: { 'Content-Type': 'application/json' }
    });

}