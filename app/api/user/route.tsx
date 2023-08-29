import type { NextApiRequest, NextApiResponse } from 'next'
import { db } from '../../_helper/server'

type User = {
  username: string,
  password: string,
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<User[]>
) {
  const { method } = req
  const users = await db.userDb.find()
  switch (method) {
    case 'GET':
      res.status(200).json(users)
      break
  }
}