import prisma from "@/lib/db/prisma";
import ASWService from "@/lib/storage/aws3";
import { NextResponse, NextRequest } from "next/server";

export async function GET(request: NextRequest) {
    const data = await prisma.post.findFirst()
    return NextResponse.json(data);
}

export async function POST(req: Request) {
    const data = await req.formData();
    const file = data.get('file') as File
    const response= await ASWService.putFile(file);
    return NextResponse.json(response);
}