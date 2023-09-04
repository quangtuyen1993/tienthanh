import { NextResponse } from 'next/server'
import UserModel from '../../_helper/server/models/users';
import dbConnection from '../../lib/dbConnect';

export async function GET(request: Request) {
  await dbConnection()
  const users = await UserModel.find();
  return NextResponse.json(users)
}
