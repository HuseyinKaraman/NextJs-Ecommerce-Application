import { CredentialsProvider } from "next-auth/providers/credentials";
import User from "@/models/user";
import bcrypt from "bcrypt";
import dbConnect from "./dbConnect";


export const authOptions = {
     session:{
        strategy: "jwt"
     },
     providers:[
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                email: { label: "Email", type: "email", placeholder: "email" },
                password: {  label: "Password", type: "password", placeholder: "password" },
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
            }

        })  
     ],
     secret: process.env.NEXTAUTH_SECRET,
     pages: {
        signIn: "/login",
     }
}
