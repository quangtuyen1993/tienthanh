'use client'

import { useSession } from 'next-auth/react';
import Navbar from './navbar';

export default async function Nav() {
  const session = await useSession();
  const user = session.data?.user
  return <Navbar user={user} />;
}
