import prisma from '@/lib/db/prisma';
import { checkAccessToken, checkHasRole } from '@/lib/jwt';
import type { Post } from '@prisma/client';
import { getToken } from 'next-auth/jwt';
import { NextResponse, NextRequest } from 'next/server';

export async function GET(request: NextRequest) {
  var checkResult = checkHasRole(request, 'Admin');
  if (checkResult) {
    return checkResult;
  }

  try {
    const data = await prisma.post.findFirst();
    return NextResponse.json(data);
  } catch (error: any) {
    return NextResponse.json({ message: error.toString() }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  const token = await getToken({ req: request });
  const data: Post = await prisma.post.create({
    data: {
      content: 'sample_post',
      title: 'sample_post',
      published: true
    }
  });
  return NextResponse.json(data);
}
