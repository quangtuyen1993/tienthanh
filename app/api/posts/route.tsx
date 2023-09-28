import prisma from "@/lib/db/prisma";
import type { Post } from '@prisma/client'
import { getToken } from "next-auth/jwt";
import { NextResponse, NextRequest } from "next/server";

export async function GET(request: NextRequest) {
    const data = await prisma.post.findFirst()
    return NextResponse.json(data);
}

export async function POST(request: NextRequest) {
    const token = await getToken({ req: request });
    const data: Post = await prisma.post.create({
        data: {
            content: "sample_post",
            title: "sample_post",
            published: true
        }
    });
    return NextResponse.json(data);
}