"use server";
import { signIn, signOut } from "@/auth";
import { AuthError } from "next-auth";

export async function authenticateCredentials(
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

export async function authenticateGoogle() {
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

export async function signOutServer() {
  try {
    await signOut();
  } catch (error) {
    throw error;
  }
}
