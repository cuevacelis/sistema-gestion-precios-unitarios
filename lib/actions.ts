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
  crearGrupoPartida,
  crearPresupuesto,
  editarPresupuesto,
  obtenerCountries,
  obtenerDepartments,
  obtenerDistricts,
  obtenerProvinces,
} from "./services/sql-queries";
import {
  crearGrupoPartidaSchema,
  creatPresupuestoSchema,
  deletePresupuestoSchema,
  editPresupuestoSchema,
} from "./validations-zod";
import { IBrowserInfo } from "./types";
import { headers } from "next/headers";

export async function actionsSignInCredentials(
  userAgent: string,
  _prevState: any,
  formData: FormData
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
        message: errors?.messages || "Algo salió mal.",
      };
    }
  }
}

export async function actionsSignOut() {
  try {
    await signOut({ redirectTo: "/" });
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
  // redirect("/dashboard/proyectos");
  try {
    const {
      nameUser,
      namePresupuesto,
      pais,
      departamento,
      provincia,
      distrito,
      client,
      jornal,
    } = await creatPresupuestoSchema.parseAsync({
      nameUser: formData.get("name-user"),
      namePresupuesto: formData.get("name-presupuesto"),
      pais: Number(formData.get("country")),
      departamento: Number(formData.get("department")),
      provincia: Number(formData.get("province")),
      distrito: Number(formData.get("district")),
      client: formData.get("client"),
      jornal: Number(formData.get("jornal")),
    });

    await crearPresupuesto(
      nameUser,
      namePresupuesto,
      client,
      pais,
      departamento,
      provincia,
      distrito,
      jornal
    );

    revalidatePath("/dashboard/proyectos");
    redirect("/dashboard/proyectos");
  } catch (error) {
    if (isRedirectError(error)) {
      throw error;
    }
    if (error instanceof ZodError) {
      return {
        message: error.errors.map((err) => err.message),
        isError: true,
      };
    }
    if (error instanceof Error) {
      return {
        message: error?.message,
        isError: true,
      };
    }
    return {
      message: "Algo salió mal.",
      isError: true,
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
      idPrespuesto,
      nameUser,
      namePresupuesto,
      pais,
      departamento,
      provincia,
      distrito,
      client,
      jornal,
    } = await editPresupuestoSchema.parseAsync({
      idPrespuesto: Number(id),
      nameUser: formData.get("name-user"),
      namePresupuesto: formData.get("name-presupuesto"),
      pais: Number(formData.get("country")),
      departamento: Number(formData.get("department")),
      provincia: Number(formData.get("province")),
      distrito: Number(formData.get("district")),
      client: formData.get("client"),
      jornal: Number(formData.get("jornal")),
    });

    await editarPresupuesto(
      idPrespuesto,
      nameUser,
      namePresupuesto,
      client,
      pais,
      departamento,
      provincia,
      distrito,
      jornal
    );
    revalidateTag("proyectosPaginados");
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
        isError: true,
      };
    }
    if (error instanceof Error) {
      return {
        message: error?.message,
        isError: true,
      };
    }
    return {
      message: "Algo salió mal.",
      isError: true,
    };
  }
}

export async function actionsDeletePresupuesto(Pre_Id: number) {
  try {
    // revalidateTag("proyectosPaginados");
    const { id } = await deletePresupuestoSchema.parseAsync({
      id: Pre_Id,
    });
    await cambioEstadoPresupuesto(id, 0);
    revalidatePath("/dashboard/proyectos");
    redirect("/dashboard/proyectos");
    // revalidateTag("proyectosPaginados");
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

export async function actionsObtenerCountries() {
  try {
    revalidateTag("countries");
    return obtenerCountries();
  } catch (error) {
    if (error instanceof ZodError) {
      const errorMessages = error.errors.map((err) => err.message).join(", ");
      return {
        message: `Error de validación: ${errorMessages}`,
        isError: true,
      };
    }
    if (error instanceof Error) {
      return {
        message: error?.message,
        isError: true,
      };
    }
    return {
      message: "Algo salió mal.",
      isError: true,
    };
  }
}

// Acción para obtener los departamentos según el país seleccionado
export async function actionsObtenerDepartments(idCountry: number) {
  try {
    revalidateTag("departments");
    return obtenerDepartments(idCountry);
  } catch (error) {
    if (error instanceof ZodError) {
      const errorMessages = error.errors.map((err) => err.message).join(", ");
      return {
        message: `Error de validación: ${errorMessages}`,
        isError: true,
      };
    }
    if (error instanceof Error) {
      return {
        message: error?.message,
        isError: true,
      };
    }
    return {
      message: "Algo salió mal.",
      isError: true,
    };
  }
}

// Acción para obtener las provincias según el país y departamento seleccionados
export async function actionsObtenerProvinces(
  idCountry: number,
  idDepartment: number
) {
  try {
    revalidateTag("provinces");
    return obtenerProvinces(idCountry, idDepartment);
  } catch (error) {
    if (error instanceof ZodError) {
      const errorMessages = error.errors.map((err) => err.message).join(", ");
      return {
        message: `Error de validación: ${errorMessages}`,
        isError: true,
      };
    }
    if (error instanceof Error) {
      return {
        message: error?.message,
        isError: true,
      };
    }
    return {
      message: "Algo salió mal.",
      isError: true,
    };
  }
}

// Acción para obtener los distritos según el país, departamento y provincia seleccionados
export async function actionsObtenerDistricts(
  idCountry: number,
  idDepartment: number,
  idProvince: number
) {
  try {
    revalidateTag("districts");
    return obtenerDistricts(idCountry, idDepartment, idProvince);
  } catch (error) {
    if (error instanceof ZodError) {
      const errorMessages = error.errors.map((err) => err.message).join(", ");
      return {
        message: `Error de validación: ${errorMessages}`,
        isError: true,
      };
    }
    if (error instanceof Error) {
      return {
        message: error?.message,
        isError: true,
      };
    }
    return {
      message: "Algo salió mal.",
      isError: true,
    };
  }
}

export async function actionsCrearGrupoPartida(
  _prevState: any,
  formData: FormData
) {
  try {
    const headersList = headers();
    const referer = headersList.get("referer") || "/dashboard/proyectos";
    const { nombreGrupoPartida, idProyecto, idLastGroupPartida } =
      await crearGrupoPartidaSchema.parseAsync({
        nombreGrupoPartida: formData.get("nombreGrupoPartida"),
        idProyecto: formData.get("idProyecto"),
        idLastGroupPartida: formData.get("idLastGroupPartida"),
      });

    await crearGrupoPartida(nombreGrupoPartida, idProyecto, idLastGroupPartida);

    // Parsear y modificar la URL del referer
    const url = new URL(referer);
    const pathSegments = url.pathname
      .split("/")
      .filter((segment) => segment !== "crear");
    url.pathname = pathSegments.join("/");

    // Usar la nueva URL para revalidación y redirección
    const newPath = url.pathname;
    revalidatePath(newPath);

    return redirect(url.toString());
  } catch (error) {
    if (isRedirectError(error)) {
      throw error;
    }
    if (error instanceof ZodError) {
      return {
        message: error.errors.map((err) => err.message),
        isError: true,
      };
    }
    if (error instanceof Error) {
      return {
        message: error?.message,
        isError: true,
      };
    }
    return {
      message: "Algo salió mal.",
      isError: true,
    };
  }
}
