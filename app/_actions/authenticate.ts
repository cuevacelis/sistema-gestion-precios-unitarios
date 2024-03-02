"use server";

import { signIn, signOut } from "@/auth";
import { AuthError } from "next-auth";

export async function actionsSignInCredentials(
  prevState: string | undefined,
  formData: FormData
) {
  try {
    await signIn("credentials", formData);
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case "CredentialsSignin":
          return "Credenciales invalidas.";
        default:
          return "Algo salió mal.";
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
          return "Credenciales invalidas.";
        default:
          return "Algo salió mal.";
      }
    }
    throw error;
  }
}
