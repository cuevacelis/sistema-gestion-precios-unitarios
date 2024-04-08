"use server";

import { signIn, signOut } from "@/auth";
import { AuthError } from "next-auth";

export async function actionsSignInCredentials(
  prevState: { isError: boolean; message: string } | undefined,
  formData: FormData
) {
  try {
    await signIn("credentials", {
      user: formData.get("user"),
      password: formData.get("password"),
    });
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case "CredentialsSignin":
          return {
            isError: true,
            message: "Credenciales inválidas.",
          };
        default:
          return { isError: true, message: "Algo salió mal." };
      }
    }
    throw error;
  }
}

export async function actionsSignOut() {
  try {
    await signOut();
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
