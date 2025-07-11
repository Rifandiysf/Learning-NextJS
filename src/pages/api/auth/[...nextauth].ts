import { signIn, signInGoogle } from "@/utils/database/service";
import bcrypt from "bcrypt";
import NextAuth, { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google"

const authOptions: NextAuthOptions = {
    session: {
        strategy: 'jwt',
    },
    secret: process.env.NEXTAUTH_SECRET,
    providers: [
        CredentialsProvider({
            type: "credentials",
            name: "credentials",
            credentials: {
                email: { label: "Email", type: "email" },
                password: { label: "Password", type: "password" }
            },
            async authorize(credentials) {
                const { email, password } = credentials as {
                    email: string,
                    password: string
                }
                const user: any = await signIn({ email })
                if (user) {
                    const passwordConfirm = await bcrypt.compare(password, user.password)
                    console.log(passwordConfirm)
                    if (passwordConfirm) {
                        return user
                    }
                    return null
                } else {
                    return null
                }
            }
        }),
        GoogleProvider({
            clientId: process.env.GOOGLE_OAUTH_CLIENT_ID || "",
            clientSecret: process.env.GOOGLE_OAUTH_CLIENT_SECRET || ""
        })
    ],
    callbacks: {
        async jwt({ token, account, profile, user }: any) {
            if (account?.provider === "credentials") {
                token.email = user.email
                token.fullname = user.fullname
                token.role = user.role
            }
            if (account?.provider === "google") {
                const data = {
                    fullname: user.name,
                    email: user.email,
                    image: user.image,
                    type: "google",
                }
                await signInGoogle(data, (result: { status: boolean, message: string, data: any }) => {
                    if (result.status) {
                        token.email = result.data.email
                        token.fullname = result.data.fullname
                        token.image = result.data.image
                        token.type = result.data.type,
                        token.role = result.data.role
                    }
                })
            }
            return token
        },
        async session({ session, token }: any) {
            if ("email" in token) {
                session.user.email = token.email
            }
            if ("fullname" in token) {
                session.user.fullname = token.fullname
            }
            if ("image" in token) {
                session.user.image = token.image
            }
            if ("role" in token) {
                session.user.role = token.role
            }
            return session
        }
    },
    pages: {
        signIn: "/auth/login",
    }
}

export default NextAuth(authOptions)