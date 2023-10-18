import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

import withAuth from "next-auth/middleware"
import { authOptions, verifyAuth } from "@/lib/auth"

// This function can be marked `async` if using `await` inside
export function middleware(request: NextRequest) {
  // console.log('start middleware ')

  // const token = request.cookies.get('user-token')?.value

  // const verifiedToken = token && verifyAuth(token).catch(err => {
  //   console.log(err)
  // })


  // // Nếu vào trang login thì ko cần check token verified
  // if (request.nextUrl.pathname.startsWith('/login') && !verifiedToken) {
  //   return
  // }

  // // Nếu user redirect qua login mà đã verified token thì vào thẳng trang chính luôn
  // if (request.nextUrl.pathname.includes('/login') && verifiedToken) {
  //   return NextResponse.redirect(new URL('/', request.url))
  // }

  // // Nếu token chưa được verified thì redirect qua trang login
  // if (!verifiedToken) {
  //   return NextResponse.redirect(new URL('/login', request.url))
  // }
}

export default withAuth({
  callbacks: {
    authorized: ({ token }) => !!token,
  },
})

export const config = {
  matcher: [
    '/api/:path*', 
    '/:path*'
  ],
}