import { withMiddlewareAuthRequired } from '@auth0/nextjs-auth0/edge';
import { type NextRequest, NextFetchEvent } from 'next/server'

export default withMiddlewareAuthRequired();

// export default function middleware(request: NextRequest, event: NextFetchEvent) {
//   return withMiddlewareAuthRequired()(request, event)
// }


export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
}