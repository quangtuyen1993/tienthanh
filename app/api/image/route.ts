import prisma from "@/lib/db/prisma";
import { NextResponse, NextRequest } from "next/server";
import storage from "@/lib/storage/gcloud";

export async function GET(request: NextRequest) {
    const data = await prisma.post.findFirst()
    return NextResponse.json(data);
}

export async function POST(req: Request) {
    const data = await req.formData();
    const file = data.get('file') as File
    const bucket = storage.bucket("bell");
    const blob = await bucket.file(file.name);
    const blobStream = blob.createWriteStream();

    blobStream.on('error',(error)=>{
        return NextResponse.error()
    })
    blobStream.on('finish', () => {
        const publicUrl = `https://storage.googleapis.com/${bucket.name}/${blob.name}`
        return NextResponse.json(publicUrl)
    });
    const bytes = await file.arrayBuffer()
    const buffer = Buffer.from(bytes)
    blobStream.end(buffer);
}