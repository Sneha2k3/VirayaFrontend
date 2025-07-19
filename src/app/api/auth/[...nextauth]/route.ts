import { AuthResponse } from "@/types/types";
import axios from "axios";
import NextAuth, { User } from "next-auth";
import { JWT } from "next-auth/jwt";
import CredentialsProvider from "next-auth/providers/credentials";

const handler = NextAuth({
    providers: [
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                email: { label: "Email", type: "text" },
                password: { label: "Password", type: "password" },
            },
            authorize: async (credentials) => {
                if (!credentials) {
                    return null;
                }

                try {
                    const res = await axios.post<AuthResponse>(`${process.env.NEXT_PUBLIC_BASE2_URL}/auth/login`, {
                        email: credentials.email,
                        password: credentials.password,
                    });

                    const user = res.data;

                    if (user) {
                        return {
                            jwt: user.jwt,
                            name: user.user.name,
                            id: user.user.id,
                            email: user.user.email,
                        };
                    }
                    return null;
                } catch (error: any) { //eslint-disable-line @typescript-eslint/no-explicit-any
                    if (
                        error.response &&
                        error.response.data &&
                        error.response.data.error
                    ) {
                        throw new Error(error.response.data.error.message);
                    }
                    return null;
                }
            },
        }),
    ],
    callbacks: {
        jwt: async ({ token, user }: { token: JWT; user?: User }) => {
            if (user) {
                token.id = user.id;
                token.email = user.email;
                token.name = user.name;
                token.jwt = (user as any).jwt; //eslint-disable-line @typescript-eslint/no-explicit-any
            }
            return token;
        },
        session: async ({ session, token }: { session: any; token: JWT }) => { //eslint-disable-line @typescript-eslint/no-explicit-any
            session.user = {
                id: token.id,
                email: token.email,
                name: token.name,
            };
            session.jwt = token.jwt;
            return session;
        },
    },
    pages: {
        signIn: "/",
        signOut: "/",
    },
    debug: true,
});

export { handler as GET, handler as POST };

