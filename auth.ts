process.env.TZ = "America/Lima";
import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { CredentialsError } from "./lib/custom-error/auth-error";
import { FetchError } from "./lib/custom-error/fetch-error";
import { fetchLogged } from "./lib/data/fetch-api";
import { credentialsSchema } from "./lib/validations-zod";

export const { auth, signIn, signOut, handlers } = NextAuth({
  pages: {
    signIn: "/login",
  },
  callbacks: {
    async jwt({ token, user, trigger }) {
      try {
        if (trigger === "signIn") {
          token.id = user.id;
          return token;
        }
        return token;
      } catch (error) {
        return null;
      }
    },
    async session({ session, token }) {
      session.user.id = String(token?.id);
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
    Credentials({
      credentials: {
        user: {},
        password: {},
      },
      authorize: async (credentials) => {
        try {
          const { user, password } =
            await credentialsSchema.parseAsync(credentials);

          const dataLogin = await fetchLogged({
            username: user,
            password: password,
          });

          if (!dataLogin?.data) {
            throw new CredentialsError({ message: "Credenciales inválidas." });
          }

          return {
            id: String(dataLogin?.data.Usu_Id),
            name: dataLogin?.data.Usu_NomApellidos,
            email: dataLogin?.data.Usu_Correo,
          };
        } catch (error) {
          if (error instanceof FetchError) {
            throw new CredentialsError({ message: "Credenciales inválidas." });
          }
          throw error;
        }
      },
    }),
  ],
  session: {
    strategy: "jwt",
    maxAge: 1 * 24 * 60 * 60, //1 día
  },
  secret: process.env.AUTH_SECRET,
});
