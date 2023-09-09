
import NextAuth, { NextAuthOptions } from "next-auth"
import FacebookProvider from "next-auth/providers/facebook";
export const authOptions: NextAuthOptions = {
    session: {
        strategy: "jwt",
    },
    providers: [
        FacebookProvider({
            clientId: process.env.FACEBOOK_ID ?? '',
            clientSecret: process.env.FACEBOOK_SECRET ?? ''
        }),
    ],
}
export default NextAuth(authOptions)
