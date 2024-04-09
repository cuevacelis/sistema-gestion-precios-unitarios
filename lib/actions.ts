"use server";
//Estas acciones se pueden llamar desde el servidor o el cliente
//Las acciones se ejecutan siempre en el servidor

import { signIn, signOut } from "@/auth";
import { AuthError } from "next-auth";
import { isRedirectError } from "next/dist/client/components/redirect";

export async function actionsSignInCredentials(
  prevState: any,
  formData: FormData
) {
  try {
    await signIn("credentials", {
      redirect: true,
      redirectTo: "/dashboard",
      user: formData.get("user"),
      password: formData.get("password"),
    });
  } catch (error) {
    if (isRedirectError(error)) {
      throw error;
    } else if (error instanceof AuthError) {
      switch (error.type) {
        case "CredentialsSignin":
          return {
            isError: true,
            message: error.message,
          };
        default:
          return {
            isError: true,
            message: "La autenticación presenta un error no controlado.",
          };
      }
    } else {
      return {
        isError: true,
        message: "Algo salió mal.",
      };
    }
  }
}

export async function actionsSignOut() {
  try {
    await signOut({ redirect: true });
  } catch (error) {
    throw error;
  }
}

export async function actionsSignInGoogle() {
  try {
    await signIn("google");
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case "CredentialsSignin":
          return "Credenciales inválidas.";
        default:
          return "Algo salió mal.";
      }
    }
    throw error;
  }
}
