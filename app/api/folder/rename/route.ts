import connectDB from "@/lib/connectDb";
import Doc from "@/model/Doc";
import Folder, { IFolder } from "@/model/Folder";
import mongoose from "mongoose";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";

export async function PUT(req: NextRequest) {
    const session = await getServerSession();
    if (!session) {
        return new NextResponse("Login First", {
            status: 401
        });
    }

    try {
        await connectDB();

        const data = await req.json();
        const { id, name } = data;

        if (!name || !id) {
            return new NextResponse("Missing required fields", {
                status: 400
            });
        }

        const result = await Folder.findByIdAndUpdate(id, { name: name }, { new: true });

        if (!result) {
            return new NextResponse("Folder not found", {
                status: 404
            });
        }

        return new NextResponse(JSON.stringify(result), {
            status: 200,
            headers: {
                'Content-Type': 'application/json'
            }
        });

    } catch (error) {
        console.error("Error updating folder:", error);
        return new NextResponse("Internal Server Error", {
            status: 500
        });
    }
}