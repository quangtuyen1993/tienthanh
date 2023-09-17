import { DefaultSession, DefaultUser } from "next-auth";

declare module "next-auth" {
    interface Session extends DefaultSession {
        refreshTokenExpires?: number;
        accessTokenExpires?: string;
        refreshToken?: string;
        token?: string;
        error?: string;
        user?: User;
    }
    interface User extends DefaultUser {
        firstName?: string;
        lastName?: string;
        email?: string | null;
        id?: string;
        token: string,
        contactAddress?: {
            id?: string;
        };
    }
}
declare module "next-auth/jwt" {
    interface JWT {
        refreshTokenExpires?: number;
        accessTokenExpires?: number;
        refreshToken?: string;
        token: string;
        exp?: number;
        iat?: number;
        jti?: string;
    }
}