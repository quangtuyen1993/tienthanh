import prisma from "@/lib/db/prisma";
import type { Info, Image } from '@prisma/client'
import { getToken } from "next-auth/jwt";
import { NextResponse, NextRequest } from "next/server";

export async function GET(request: NextRequest) {
    const data = await prisma.post.findFirst()
    return NextResponse.json(data);
}

export async function POST(request: NextRequest) {
    const token = await getToken({ req: request });
    const image = await prisma.image.create({ data: { url: "", }, })

    const data: Info = await prisma.info.create({
        data: {
            thumbnail: {
                connect: { id: image.id }
            },
        },
        include: {
            thumbnail: true
        }
    });
    return NextResponse.json(data);
}