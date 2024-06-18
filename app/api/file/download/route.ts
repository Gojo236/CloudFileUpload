import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { getDownloadURL, ref } from "firebase/storage";
import connectDB from "@/lib/connectDb";
import Doc from "@/model/Doc";
import { storage } from "@/config/firebaseConfig";

export async function GET(req: NextRequest) {
  const session = await getServerSession();
  if (!session) {
    return new Response("Login First", {
      status: 401,
    });
  }

  const searchParams = new URLSearchParams(req.url.split("?")[1]);
  const docId = searchParams.get("docId");
  if (!docId) {
    return new Response(JSON.stringify({ msg: "Document ID is required" }), {
      status: 400,
      headers: { "Content-Type": "application/json" },
    });
  }

  await connectDB();

  try {
    const document = await Doc.findById(docId);
    if (!document) {
      return new Response(JSON.stringify({ msg: "Document not found" }), {
        status: 404,
        headers: { "Content-Type": "application/json" },
      });
    }

    const storageRef = ref(storage, document._id.toString());
    const downloadURL = await getDownloadURL(storageRef);

    const response = await fetch(downloadURL);
    if (!response.ok) {
      return new Response(
        JSON.stringify({ msg: "Failed to fetch file from storage" }),
        {
          status: 500,
          headers: { "Content-Type": "application/json" },
        },
      );
    }

    const blob = await response.blob();
    const buffer = await blob.arrayBuffer();

    return new Response(buffer, {
      status: 200,
      headers: {
        "Content-Type": blob.type,
        "Content-Disposition": `attachment; filename="${document.name}"`,
      },
    });
  } catch (error) {
    console.error(error);
    return new Response(JSON.stringify({ msg: "Internal Server Error" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
