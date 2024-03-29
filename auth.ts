process.env.TZ = "America/Lima";
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { z } from "zod";
import { fetchLogged, fetchTokenRefresh } from "./app/_lib/data/fetch";

declare module "next-auth" {
  interface User {
    token: string;
    refreshToken: string;
    expires: string;
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
    async jwt({ token, user, trigger }) {
      try {
        if (trigger === "signIn") {
          token.token = user.token;
          token.refreshToken = user.refreshToken;
          token.expires = user.expires;
          token.isSuccess = true;
          return token;
        }

        if (new Date().getTime() < new Date(String(token.expires)).getTime()) {
          return token;
        }

        const dataRefreshToken = await fetchTokenRefresh({
          token: String(token.token),
          refreshToken: String(token.refreshToken),
        });

        token.token = String(dataRefreshToken.token);
        token.refreshToken = String(dataRefreshToken.refreshToken);
        token.expires = String(dataRefreshToken?.expires).replace(
          /(-\d{2}:\d{2})$/,
          "-05:00"
        );
        return token;
      } catch (error) {
        return null;
      }
    },
    async session({ session, token }) {
      session.user.token = String(token?.token);
      session.user.refreshToken = String(token?.refreshToken);
      session.user.expires = String(token?.expires);
      return session;
    },
    async authorized({ auth, request }) {
      const pathname = request.nextUrl.pathname;
      const isValidSession = Boolean(auth?.user);

      if (pathname === "/") {
        return true;
      }
      if (pathname.startsWith("/dashboard")) {
        return isValidSession;
      }
      if (!pathname.startsWith("/dashboard") && isValidSession) {
        return Response.redirect(new URL("/dashboard", request.nextUrl));
      }

      return isValidSession;
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
            const dataLogin = await fetchLogged({
              usu_Correo: verifiedTypeCredentials.data.user,
              usu_Clave: verifiedTypeCredentials.data.password,
            });

            if (dataLogin?.isAuthSuccessful) {
              return {
                isSuccess: true,
                name: "",
                email: "",
                token: String(dataLogin?.token),
                refreshToken: String(dataLogin?.refreshToken),
                expires: String(dataLogin?.expires).replace(
                  /(-\d{2}:\d{2})$/,
                  "-05:00"
                ),
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
