import connectDB from "@/lib/connectDb";

import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";

import Doc, { IDoc } from "@/model/Doc";
import mongoose from "mongoose";

export async function GET() {
  await connectDB();
  const session = await getServerSession();
  if (!session?.user?.email) return;
  await connectDB();
  const docs = await Doc.find({
    userEmail: session?.user?.email,
    deletedAt: { $ne: null },
  });

  const userDocs = docs.map((doc) => {
    return {
      id: doc._id,
      name: doc.name,
      downloadURL: doc.downloadURL,
      docSize: doc.docSize,
      updatedAt: doc.updatedAt,
    };
  });
  return NextResponse.json({ userDocs });
}

// export async function DELETE(req: NextRequest) {
//     const session = await getServerSession();
//     if (!session) {
//         return new Response("Login First", {
//             status: 401
//         });
//     }

//     const searchParams = new URLSearchParams(req.url.split('?')[1]);
//     const id = searchParams.get('id');
//     if (!id) {
//         return new Response(JSON.stringify({ msg: "Document ID is required" }), {
//             status: 400,
//             headers: { 'Content-Type': 'application/json' }
//         });
//     }

//     await connectDB();

//     try {
//         const document = await Doc.findById(id);
//         if (!document) {
//             return new Response(JSON.stringify({ msg: "Document not found" }), {
//                 status: 404,
//                 headers: { 'Content-Type': 'application/json' }
//             });
//         }

//         const storageRef = ref(storage, document._id.toString());
//         await deleteObject(storageRef);

//         await Doc.findByIdAndDelete(id);

//         return new Response(JSON.stringify({ msg: "File deleted successfully" }), {
//             status: 200,
//             headers: { 'Content-Type': 'application/json' }
//         });
//     } catch (error) {
//         console.error(error);
//         return new Response(JSON.stringify({ msg: "Internal Server Error" }), {
//             status: 500,
//             headers: { 'Content-Type': 'application/json' }
//         });
//     }
// }
