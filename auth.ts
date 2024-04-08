process.env.TZ = "America/Lima";
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { fetchLogged, fetchTokenRefresh } from "./lib/data/fetch";
import { findUserByUsernameAndPassword } from "./lib/data/sql-queries";
import { credentialsSchema } from "./lib/validations/validations-zod";

declare module "next-auth" {
  interface User {
    token?: string | null;
    refreshToken?: string | null;
    expires?: string | null;
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

      if (pathname.startsWith("/dashboard")) {
        return isValidSession;
      }
      if (!pathname.startsWith("/dashboard") && isValidSession) {
        return Response.redirect(new URL("/dashboard", request.nextUrl));
      }
      if (!pathname.startsWith("/dashboard") && !isValidSession) {
        return true;
      }

      return isValidSession;
    },
  },
  providers: [
    CredentialsProvider({
      name: "Credentials",
      async authorize(credentials) {
        console.log(credentials);

        const credentialsValidate = credentialsSchema.safeParse({
          user: credentials.user,
          password: credentials.password,
        });

        try {
          if (credentialsValidate.success) {
            const [dataLogin, dataUser] = await Promise.all([
              fetchLogged({
                usu_Correo: credentialsValidate.data.user,
                usu_Clave: credentialsValidate.data.password,
              }),
              findUserByUsernameAndPassword({
                username: credentialsValidate.data.user,
                password: credentialsValidate.data.password,
              }),
            ]);

            if (dataLogin?.isAuthSuccessful) {
              return {
                id: String(dataUser?.Usu_Id),
                name: dataUser?.Usu_NomApellidos,
                email: dataUser?.Usu_Correo,
                token: dataLogin?.token,
                refreshToken: dataLogin?.refreshToken,
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
