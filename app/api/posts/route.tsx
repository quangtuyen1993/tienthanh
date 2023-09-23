import prisma from "@/lib/db/prisma";
import type { Post } from '@prisma/client'
import { NextResponse } from "next/server";

export async function GET(request: Request) {
    const data = await prisma.post.findFirst()
    return NextResponse.json(data);
}

export async function POST(request: Request) {
    const data: Post = await prisma.post.create({
        data: {
            content: "sample_post",
            title: "sample_post",
            published: true
        }
    });
    return NextResponse.json(data);
}