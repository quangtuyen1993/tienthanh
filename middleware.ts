import { NextResponse } from 'next/server';
import { NextRequest } from 'next/server';
import withAuth from 'next-auth/middleware';
import { verifyToken } from '@/lib/jwt';

// export async function middleware(req: NextRequest) {
//   const { pathname } = req.nextUrl;

//   if (pathname.startsWith("/api/")) {
//     console.log('tao gọi api nè')
//   } else {
//     NextResponse.next();
//   }
// }

export default withAuth((req, res) => {}, {
  callbacks: {
    authorized: ({ token, req }) => {
      const { pathname } = req.nextUrl;

      // nếu là login thì ko cần check token
      if (pathname == '/api/login') {
        return true;
      }

      if (pathname.startsWith('/api/')) {
        return true;
      }

      return !!token;
    }
  }
});

export const config = {
  matcher: ['/:path*']
};
