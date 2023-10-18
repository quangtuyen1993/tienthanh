import { jwtVerify } from "jose";
import NextAuth, { NextAuthOptions, Session, User } from "next-auth";
import { JWT } from "next-auth/jwt";
import CredentialsProvider from "next-auth/providers/credentials";
import _logger from "next-auth/utils/logger";

export const authOptions: NextAuthOptions = {
    providers: [
        CredentialsProvider({
            name: "credentials",
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
            session.user = user
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

interface UserJwtPayload {
    jti: string
    iat: number
}

export const getJwtSecrectKey = () => {
    const secret = process.env.JWT_SECRET_KEY

    if (!secret && secret?.length == 0) {
        throw new Error('The enviroment variable JWT_SECRET_KEY is not set.')
    }

    return secret
}

export const verifyAuth = async (token: string) => {
    try {
        const verified = await jwtVerify(token, new TextEncoder().encode(getJwtSecrectKey()))
        return verified.payload as UserJwtPayload
    } catch (error) {
        throw new Error('Your token has expired')
    }
}
