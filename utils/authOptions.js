import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import User from "@/models/user";
import bcrypt from "bcrypt";
import { dbConnect } from "./dbConnect";

export const authOptions = {
    session: {
        strategy: "jwt",
        maxAge: 1 * 24 * 60 * 60, // 1 days
    },
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        }),
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                email: { label: "Email", type: "email", placeholder: "email" },
                password: { label: "Password", type: "password", placeholder: "password" },
            },
            async authorize(credentials, req) {
                await dbConnect();
                const user = await User.findOne({ email: credentials.email });
                if (!user) {
                    throw new Error("User not registered with this email");
                }
                const isMatch = await bcrypt.compare(credentials.password, user.password);
                if (!isMatch) {
                    throw new Error("Invalid credentials");
                }
                return user;
            },
        }),
    ],
    callbacks: {
        async signIn({ user }) {
            dbConnect();
            const { email } = user;
            let dbUser = await User.findOne({ email });

            if (!dbUser) {
                dbUser = await User.create({ email, name: user?.name, image: user?.image });
            }
            return true;
        },

        jwt: async ({ token, user }) => {
            const userByEmail = await User.findOne({ email: token.email });
            userByEmail.password = undefined;
            userByEmail.resetCode = undefined;
            token.user = userByEmail;
            return token;
        },
        session: async ({ session, token }) => {
            session.user = token.user;
            return session;
        },
    },
    secret: process.env.NEXTAUTH_SECRET,
    pages: {
        signIn: "/login",
    },
};
