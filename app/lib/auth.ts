import NextAuth, { NextAuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import _logger from 'next-auth/utils/logger';

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: 'credentials',
      credentials: {
        email: {
          label: 'Email',
          type: 'email',
          placeholder: 'example@example.com'
        },
        password: { label: 'Password', type: 'password' }
      },
      async authorize(credentials) {
        console.log(`http://localhost:3000/api/login`);
        const res = await fetch(`http://localhost:3000/api/login`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            username: credentials?.email,
            password: credentials?.password
          })
        });

        if (res.status === 401) return null;
        const user = await res.json();

        if (user) {
          // Any object returned will be saved in `user` property of the JWT
          return user;
        } else {
          // If you return null then an error will be displayed advising the user to check their details.
          return null;
          // You can also Reject this callback with an Error thus the user will be sent to the error page with the error message as a query parameter
        }
      }
    })
  ],
  // secret: process.env.NEXTAUTH_SECRET,
  // session: {
  //   strategy: 'jwt',
  // },
  callbacks: {
    async jwt({ token, user, trigger, session }) {
      if (trigger === 'update') {
        return { ...token, ...session.user };
      }
      return { ...token, ...user };
    },

    async session({ session, token }) {
      session.user = token as any;
      return session;
    }
  }
};
export default NextAuth(authOptions);
