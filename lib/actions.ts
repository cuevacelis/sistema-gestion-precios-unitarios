"use server";
import { signIn, signOut } from "@/auth";
import { AuthError } from "next-auth";
import { revalidatePath } from "next/cache";
import { isRedirectError } from "next/dist/client/components/redirect";
import { redirect } from "next/navigation";
import { ZodError } from "zod";
import { crearPresupuesto } from "./services/sql-queries";
import { creatPresupuestoSchema } from "./validations-zod";

export async function actionsSignInCredentials(
  _prevState: any,
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
    } else {
      const errors = error as any;
      return {
        isError: true,
        message: errors?.message || "Algo salió mal.",
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

export async function actionsCrearPresupuesto(
  _prevState: any,
  formData: FormData
) {
  try {
    const {
      nameUser,
      name,
      departamento,
      provincia,
      distrito,
      client,
      jornal,
    } = await creatPresupuestoSchema.parseAsync({
      nameUser: formData.get("name-user"),
      name: formData.get("name"),
      departamento: formData.get("departamento"),
      provincia: formData.get("provincia"),
      distrito: formData.get("distrito"),
      client: formData.get("client"),
      jornal: formData.get("jornal"),
    });

    await crearPresupuesto(
      nameUser,
      name,
      client,
      departamento,
      provincia,
      distrito,
      Number(jornal)
    );

    revalidatePath("/dashboard/proyectos");
    redirect("/dashboard/proyectos");
  } catch (error) {
    if (isRedirectError(error)) {
      throw error;
    }
    if (error instanceof ZodError) {
      const errorMessages = error.errors.map((err) => err.message).join(", ");
      return {
        message: `Error de validación: ${errorMessages}`,
        errors: error.errors,
      };
    }
    if (error instanceof Error) {
      return {
        message: error?.message,
        errors: {},
      };
    }
    return {
      message: "Algo salió mal.",
      errors: {},
    };
  }
}