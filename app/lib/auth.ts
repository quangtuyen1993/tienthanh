import NextAuth, { NextAuthOptions, Session, User } from "next-auth";
import { JWT } from "next-auth/jwt";
import CredentialsProvider from "next-auth/providers/credentials";
import _logger from "next-auth/utils/logger";

export const authOptions: NextAuthOptions = {

    providers: [
        CredentialsProvider({
            id: "domain-login",
            name: "Domain Account",
            credentials: {
                email: {
                    label: "Email",
                    type: "email",
                    placeholder: "example@example.com",
                },
                password: { label: "Password", type: "password" },
            },
            async authorize(credentials) {
                const user = { id: "1", name: "J Smith", email: "jsmith@example.com", token: "access_token" }
                return user
            },

        }),
    ],
    secret: process.env.NEXTAUTH_SECRET,
    session: {
        strategy: "jwt",
        maxAge: 30 * 24 * 60 * 60,
        updateAge: 24 * 60 * 60,
    },
    callbacks: {
        async signIn({ user }: { user: User }) {
            return true
        },
        async session({ session, token, user }: { session: Session, token: JWT, user: User }) {
            session.token = token.token
            session.user = undefined
            return session;
        },
        async jwt({ token, user, account }) {
            if (user) {
                token.id = user.id;
                token.token = user.token;
            }
            if (account) {
                token.accessToken = account.access_token;
            }
            return token;
        },

    }

}
export default NextAuth(authOptions)
