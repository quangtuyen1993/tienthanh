import { NextResponse } from 'next/server'
import dbConnection from '@/connection';
import UserModel from '@/models/users';

export async function GET(request: Request) {
  await dbConnection()
  const users = await UserModel.find();
  return NextResponse.json(users)
}
