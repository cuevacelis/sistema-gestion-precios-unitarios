process.env.TZ = "America/Lima";
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { z } from "zod";
import {
  fetchApiLogin,
  fetchApiTokenRefresh,
} from "./app/_lib/fetch-api/token";

declare module "next-auth" {
  interface User {
    token: string;
    refreshToken: string;
    isValidToken: boolean;
    expires: Date;
  }
}

export const {
  auth,
  signIn,
  signOut,
  handlers: { GET, POST },
} = NextAuth({
  pages: {
    signIn: "/login",
  },
  callbacks: {
    async jwt({ token, user, trigger, session }) {
      try {
        if (trigger === "signIn") {
          token.token = user.token;
          token.refreshToken = user.refreshToken;
          token.isValidToken = user.isValidToken;
          token.expires = user.expires;
          return token;
        }

        if (
          new Date().getTime() <
          new Date(
            String(token.expires).replace(/(-\d{2}:\d{2})$/, "-05:00")
          ).getTime()
        ) {
          return token;
        }

        const dataRefreshToken = await fetchApiTokenRefresh({
          token: String(token.token),
          refreshToken: String(token.refreshToken),
        });
        token.token = String(dataRefreshToken.token);
        token.refreshToken = String(dataRefreshToken.refreshToken);
        token.isValidToken = true;

        return token;
      } catch (error) {
        token.isValidToken = false;
        return token;
      }
    },
    async session({ session, token }) {
      session.user.token = String(token?.token);
      session.user.refreshToken = String(token?.refreshToken);
      session.user.expires = new Date(String(token?.expires));
      session.user.isValidToken = !!token?.isValidToken;
      return session;
    },
    async authorized({ auth, request }) {
      const isValidSession = !!auth?.user && auth.user.isValidToken;
      if (request.nextUrl.pathname.startsWith("/dashboard")) {
        return isValidSession ? true : false;
      } else if (isValidSession) {
        return Response.redirect(new URL("/dashboard", request.nextUrl));
      } else {
        return true;
      }
    },
  },
  providers: [
    CredentialsProvider({
      name: "Credentials",
      async authorize(credentials) {
        const verifiedTypeCredentials = z
          .object({ user: z.string(), password: z.string().min(1) })
          .safeParse(credentials);

        try {
          if (verifiedTypeCredentials.success) {
            const dataLogin = await fetchApiLogin({
              user: verifiedTypeCredentials.data.user,
              password: verifiedTypeCredentials.data.password,
            });
            if (dataLogin.isAuthSuccessful) {
              return {
                name: "",
                email: "",
                token: dataLogin.token,
                refreshToken: dataLogin.refreshToken,
                expires: dataLogin.expires,
                isValidToken: true,
              };
            }
          }
          return null;
        } catch (error) {
          return null;
        }
      },
    }),
  ],
  session: {
    strategy: "jwt",
    maxAge: 1 * 24 * 60 * 60, //1 día
  },
});
