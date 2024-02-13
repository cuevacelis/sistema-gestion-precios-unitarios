import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { z } from "zod";

declare module "next-auth" {
  interface User {
    token: string;
    refreshToken: string;
    usu_Correo: string;
    usu_NomApellidos: string;
    rol_Nombre: string;
    usu_FecHoraRegistro: string;
    usu_Estado: string;
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
    async jwt({ token, user }) {
      if (user) {
        token.token = user.token;
        token.refreshToken = user.refreshToken;
        token.usu_Correo = user.usu_Correo;
        token.usu_NomApellidos = user.usu_NomApellidos;
        token.rol_Nombre = user.rol_Nombre;
        token.usu_FecHoraRegistro = user.usu_FecHoraRegistro;
        token.usu_Estado = user.usu_Estado;
      }
      return token;
    },
    async session({ session, token }) {
      session.user.token = String(token?.token);
      session.user.refreshToken = String(token?.refreshToken);
      session.user.usu_Correo = String(token?.usu_Correo);
      session.user.usu_NomApellidos = String(token?.usu_NomApellidos);
      session.user.rol_Nombre = String(token?.rol_Nombre);
      session.user.usu_FecHoraRegistro = String(token?.usu_FecHoraRegistro);
      session.user.usu_Estado = String(token?.usu_Estado);
      return session;
    },
    async authorized({ auth, request }) {
      // console.log("request :::>", request.url);
      // console.log("auth?.user :::>", auth?.user);
      const isThereIsSessionInformation = !!auth?.user;
      if (request.nextUrl.pathname.startsWith("/dashboard")) {
        return isThereIsSessionInformation ? true : false;
      } else if (isThereIsSessionInformation) {
        return Response.redirect(new URL("/dashboard", request.nextUrl));
      } else {
        return false;
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

        if (verifiedTypeCredentials.success) {
          const responseLogin = await fetch(
            `${process.env.NEXT_PUBLIC_URL_API}/Accounts/Login`,
            {
              headers: {
                Accept: "*/*",
                "Content-Type": "application/json",
              },
              method: "POST",
              body: JSON.stringify({
                usu_Correo: verifiedTypeCredentials.data.user,
                usu_Clave: verifiedTypeCredentials.data.password,
              }),
            }
          );
          const dataLogin = await responseLogin.json();

          if (dataLogin.isAuthSuccessful) {
            const responseInfoUser = await fetch(
              `${process.env.NEXT_PUBLIC_URL_API}/Usuario/Obten_Usuario_Logeado`,
              {
                headers: {
                  Accept: "*/*",
                  "Content-Type": "application/json",
                  Authorization: `Bearer ${dataLogin.token}`,
                },
                method: "GET",
              }
            );
            const dataInfoUser = await responseInfoUser.json();

            return {
              name: dataInfoUser.data.rol_Nombre,
              email: dataInfoUser.data.usu_Correo,
              token: dataLogin.token,
              refreshToken: dataLogin.refreshToken,
              usu_Correo: dataInfoUser.data.usu_Correo,
              usu_NomApellidos: dataInfoUser.data.usu_NomApellidos,
              rol_Nombre: dataInfoUser.data.rol_Nombre,
              usu_FecHoraRegistro: dataInfoUser.data.usu_FecHoraRegistro,
              usu_Estado: dataInfoUser.data.usu_Estado,
            };
          }
        }
        return null;
      },
    }),
  ],
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60,
    updateAge: 24 * 60 * 60,
  },
});
