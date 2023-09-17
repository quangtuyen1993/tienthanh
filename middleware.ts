import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
 
import withAuth from "next-auth/middleware"
import { authOptions } from "@/lib/auth"

// This function can be marked `async` if using `await` inside
export function middleware(request: NextRequest) {
  // console.log('middleware')
}
 
export default withAuth({
  callbacks: {
    authorized: ({ token }) => !!token,
  },
})

export const config = {
  matcher: '/api/:path*',
}