import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

import { User } from "@/lib/models/UserModel";
import axios from "axios";

const authOptions = {
  pages: {
    signIn: "/signin",
    newUser: "/register",
    error: "/signin",
  },
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { type: "email" },
        password: { type: "password" },
      },
      async authorize(credentials): Promise<any> {
        try {
          const response = await axios.post(
            `${process.env.NEXT_PUBLIC_AUTH_API_URL}/login`,
            JSON.stringify({
              email: (credentials as any).email,
              password: (credentials as any).password,
            }),
            {
              headers: {
                "Content-Type": "application/json",
              },
            }
          );
          const user = response.data;
          console.log("User:", user);
          console.log("User:", user);
          if (user) {
            // Jika login berhasil, kembalikan objek pengguna
            return {
              id: user._id,
              email: user.email,
              name: user.username,
            };
          } else {
            // Jika login gagal, kembalikan null
            return null;
          }
        } catch (error) {
          console.log("Gagal autorisasi:", error);
          return null;
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }: { token: any; user: any }) {
      if (user) {
        token.id = user.id;
        token.email = user.email;
        token.name = user.name;
      }
      return token;
    },
    async session({ session, token }: { session: any; token: any }) {
      if (token) {
        session.user.id = token.id;
        session.user.email = token.email;
        session.user.name = token.name;
      }
      return session;
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
