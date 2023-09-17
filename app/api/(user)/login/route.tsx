import { NextResponse } from 'next/server'
import dbConnection from '@/connection';
import UserModel from '@/models/users';
import jwt from 'jsonwebtoken'
export async function GET(request: Request) {
  await dbConnection()
  const users = await UserModel.find();
  return NextResponse.json(users)
}

/// post 
export async function POST(request: Request) {
  const { username, password } = await request.json()
  await dbConnection()
  const user = await UserModel.findOne({
    username: username,
    password: password
  });

  if (user) {
    const token = jwt.sign({ sub: user.id }, process.env.JWT_SECRET!, { expiresIn: '7d' });
    return NextResponse.json({
      'accessToken': token
    })
  }
  return NextResponse.json({
    message:404,
    error: 'bad request'
  })
}
