'use client'

import { signIn, signOut, useSession } from "next-auth/react";
import { MouseEventHandler } from 'react';

export default function LoginButton() {
  const handleSignin: MouseEventHandler<HTMLButtonElement> = (e) => {
    e.preventDefault();
    signIn();
  };
  return (
    <div>
      <button onClick={handleSignin}>Connect To Facebook</button>
    </div>
  );
};