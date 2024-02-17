"use server";

import { auth, signIn, signOut } from "@/auth";
import { AuthError } from "next-auth";
// import "server-only";

export async function authenticateCredentialsOnlyServer(
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

export async function authenticateGoogleOnlyServer() {
  try {
    await signIn("google");
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case "CredentialsSignin":
          return "Invalid credentials.";
        default:
          return "Something went wrong.";
      }
    }
    throw error;
  }
}

export async function getSessionActionServer() {
  try {
    const session = await auth();
    return session;
  } catch (error) {
    throw error;
  }
}

export async function signOutActionServer() {
  try {
    await signOut();
  } catch (error) {
    throw error;
  }
}
