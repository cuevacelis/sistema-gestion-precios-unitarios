"use server";
import { signIn, signOut } from "@/auth";
import { AuthError } from "next-auth";
import { revalidatePath, revalidateTag } from "next/cache";
import { isRedirectError } from "next/dist/client/components/redirect";
import { redirect } from "next/navigation";
import { ZodError } from "zod";
import { changeSidebarState } from "./services/kv";
import {
  cambioEstadoPresupuesto,
  crearPresupuesto,
  editarPresupuesto,
} from "./services/sql-queries";
import {
  creatPresupuestoSchema,
  deletePresupuestoSchema,
  editPresupuestoSchema,
} from "./validations-zod";
import { getBrowserInfo } from "./utils";
import { IBrowserInfo } from "./types";

export async function actionsSignInCredentials(
  _prevState: any,
  formData: FormData,
  userAgent: string
) {
  try {
    await signIn("credentials", {
      redirect: true,
      redirectTo: "/dashboard",
      email: formData.get("email"),
      password: formData.get("password"),
      userAgent: userAgent,
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

    revalidatePath("/dashboard/presupuestos");
    redirect("/dashboard/presupuestos");
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

export async function actionsEditarPresupuesto(
  id: string,
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
    } = await editPresupuestoSchema.parseAsync({
      nameUser: formData.get("name-user"),
      name: formData.get("name"),
      departamento: formData.get("departamento"),
      provincia: formData.get("provincia"),
      distrito: formData.get("distrito"),
      client: formData.get("client"),
      jornal: formData.get("jornal"),
    });

    await editarPresupuesto(
      Number(id),
      nameUser,
      name,
      client,
      departamento,
      provincia,
      distrito,
      Number(jornal)
    );
    revalidateTag("presupuestosPaginados");
    revalidatePath("/dashboard/presupuestos");
    redirect("/dashboard/presupuestos");
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

export async function actionsDeletePresupuesto(Pre_Id: number) {
  try {
    revalidateTag("presupuestosPaginados");
    const { id } = await deletePresupuestoSchema.parseAsync({
      id: Pre_Id,
    });
    await cambioEstadoPresupuesto(id, 0);
    revalidatePath("/dashboard/presupuestos");
    redirect("/dashboard/presupuestos");
    // revalidateTag("presupuestosPaginados");
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

export async function actionsAddConfigurationNavbar(
  sidebarState: boolean,
  userId: number
) {
  try {
    await changeSidebarState({
      sidebarState: sidebarState,
      userId: userId,
    });
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

export async function sendEmail({
  to,
  subject,
  text,
  html,
}: {
  to: string;
  subject: string;
  text: string;
  html: string;
}) {
  try {
    const USER = process.env.USER_SMTP;
    const PASSWORD = process.env.PASSWORD_SMTP;
    // Dynamically load
    const nodemailer = await import("nodemailer");

    const transport = nodemailer.createTransport({
      host: "email-smtp.us-east-1.amazonaws.com",
      port: 587,
      secure: false,
      auth: {
        user: USER,
        pass: PASSWORD,
      },
    });

    const result = await transport.sendMail({
      from: '"SGPU" <no-reply@mail.calculopreciosunitarios.com>',
      to: to,
      subject: subject,
      text: text,
      html: html,
    });
    return { success: true, result };
  } catch (error) {
    // throw error;
    return { success: false, error: error };
  }
}

export async function getBrowserInfoBackend(
  userAgent: string
): Promise<IBrowserInfo> {
  let browserName = "Unknown Browser";
  let fullVersion = "Unknown Version";
  let majorVersion = 0;
  let os = "Unknown OS";

  // Detectar el sistema operativo
  if (/Windows/.test(userAgent)) os = "Windows";
  if (/Mac/.test(userAgent)) os = "MacOS";
  if (/X11/.test(userAgent)) os = "UNIX";
  if (/Linux/.test(userAgent)) os = "Linux";

  // Detectar el nombre y la versión del navegador
  if (/OPR|Opera/.test(userAgent)) {
    browserName = "Opera";
    fullVersion = userAgent.split("OPR/")[1] || userAgent.split("Opera/")[1];
  } else if (/Edg/.test(userAgent)) {
    browserName = "Microsoft Edge";
    fullVersion = userAgent.split("Edg/")[1];
  } else if (/Chrome/.test(userAgent)) {
    browserName = "Google Chrome";
    fullVersion = userAgent.split("Chrome/")[1];
  } else if (/Safari/.test(userAgent) && !/Chrome/.test(userAgent)) {
    browserName = "Safari";
    fullVersion = userAgent.split("Version/")[1];
  } else if (/Firefox/.test(userAgent)) {
    browserName = "Mozilla Firefox";
    fullVersion = userAgent.split("Firefox/")[1];
  } else if (/MSIE/.test(userAgent) || /Trident/.test(userAgent)) {
    // Para versiones antiguas de IE
    browserName = "Internet Explorer";
    fullVersion = userAgent.split("MSIE ")[1] || userAgent.split("rv:")[1];
  }

  // Obtener la versión principal
  if (fullVersion) {
    majorVersion = parseInt(fullVersion.split(".")[0], 10);
  }

  return {
    browserName,
    fullVersion,
    majorVersion,
    userAgent,
    os,
  };
}
