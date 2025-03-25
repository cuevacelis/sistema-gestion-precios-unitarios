process.env.TZ = "America/Lima";
import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { ZodError } from "zod";
import { loginVerifyAction } from "./lib/actions/actions";
import { CredentialsError } from "./lib/custom-error/auth-error";
import { FetchError } from "./lib/custom-error/fetch-error";
import { credentialsSchema } from "./lib/validations/validations-zod";

export const { handlers, signIn, signOut, auth } = NextAuth({
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
			const isValidSession = Boolean(auth);

			if (pathname.startsWith("/api")) {
				return isValidSession;
			}
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
				email: {},
				password: {},
				userAgent: {},
			},
			authorize: async (credentials) => {
				try {
					const { email, password } =
						await credentialsSchema.parseAsync(credentials);

					const dataLogin = await loginVerifyAction({
						username: email,
						password: password,
						userAgent: String(credentials.userAgent),
					});

					if (!dataLogin?.data) {
						throw new CredentialsError({ message: "Credenciales inválidas." });
					}

					return {
						id: String(dataLogin.data?.usu_id),
						email: String(dataLogin.data?.usu_correo),
						name: String(dataLogin.data?.usu_nomapellidos),
					};
				} catch (error) {
					if (error instanceof FetchError) {
						throw new CredentialsError({
							message: "Error al conectar con la base de datos.",
						});
					}
					if (error instanceof ZodError) {
						throw new CredentialsError({
							message: error.issues.map((issue) => issue.message),
						});
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
