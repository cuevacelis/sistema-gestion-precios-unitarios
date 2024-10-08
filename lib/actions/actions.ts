"use server";
import { signIn, signOut } from "@/auth";
import { AuthError } from "next-auth";
import { revalidatePath, revalidateTag } from "next/cache";
import { isRedirectError } from "next/dist/client/components/redirect";
import { redirect } from "next/navigation";
import { ZodError } from "zod";
import {
  cambioEstadoPresupuesto,
  crearGrupoPartida,
  crearPartida,
  crearPresupuesto,
  editarGrupoPartida,
  editarPartida,
  editarPresupuesto,
  findUserByUsernameAndPassword,
  obtenerProyectosPaginados,
} from "../services/sql-queries";
import {
  crearGrupoPartidaSchema,
  crearPartidaSchema,
  creatPresupuestoSchema,
  deletePartidaSchema,
  deletePresupuestoSchema,
  editarGrupoPartidaSchema,
  editarPartidaSchema,
  editPresupuestoSchema,
} from "../validations/validations-zod";
import { IBodyLogin, IBrowserInfo } from "../types/types";
import { headers } from "next/headers";
import { queueS3 } from "../queue/s3Queue";
import { replaceSegmentInPath } from "../utils";
import { DateTime } from "luxon";
import { queueEmail } from "../queue/emailQueue";

// #region LOGIN
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

export async function loginVerifyAction({
  username,
  password,
  userAgent,
}: IBodyLogin) {
  const browserInfo = await getBrowserInfoBackend(userAgent);
  const browserName = browserInfo.browserName;
  const fullVersion = browserInfo.fullVersion;
  const os = browserInfo.os;
  const nowUTC = DateTime.utc();
  const nowPeru = nowUTC
    .setZone("America/Lima")
    .toFormat("yyyy-MM-dd HH:mm:ss");

  try {
    const res = await findUserByUsernameAndPassword({
      username: username,
      password: password,
    });

    if (res.length === 0) {
      return { data: null, status: 400 };
    }

    await queueEmail({
      to: res[0]?.usu_correo,
      subject: "Iniciaste sesión en SGPU",
      text: `Hola, te has iniciado sesión en SGPU desde una nueva ubicación.
             Navegador: ${userAgent}
             Hora UTC: ${nowUTC}
             Hora Perú: ${nowPeru}
             Navegador: ${browserName}
             Versión: ${fullVersion}
             Sistema Operativo: ${os}`,
      html: `
             <div style="font-family: Arial, sans-serif; color: #333; line-height: 1.6;">
               <h2 style="color: #0056b3;">Nuevo inicio de sesión detectado en SGPU</h2>
               <p>Hola,</p>
               <p>Te has iniciado sesión en SGPU desde una nueva ubicación.</p>
               <p><strong>Detalles de la sesión:</strong></p>
               <ul style="list-style-type: none; padding-left: 0;">
                 <li><strong>Hora UTC:</strong> ${nowUTC}</li>
                 <li><strong>Hora Perú:</strong> ${nowPeru}</li>
                 <li><strong>Navegador:</strong> ${browserName}</li>
                 <li><strong>Versión:</strong> ${fullVersion}</li>
                 <li><strong>Sistema Operativo:</strong> ${os}</li>
               </ul>
               <p>Si no fuiste tú, por favor contacta con el soporte inmediatamente.</p>
               <p style="margin-top: 20px;">Gracias,</p>
               <p>El equipo de SGPU</p>
               <hr style="border: 0; border-top: 1px solid #ccc;" />
               <p style="font-size: 12px; color: #999;">Este es un correo electrónico automático, por favor no respondas a este mensaje.</p>
             </div>
           `,
    });

    return {
      data: {
        usu_id: res[0]?.usu_id,
        usu_correo: res[0]?.usu_correo,
        usu_nomapellidos: res[0]?.usu_nomapellidos,
      },
      status: 200,
    };
  } catch (error) {
    console.error("Error en el proceso de inicio de sesión:", error);
    return {
      data: null,
      status: 500,
      error: "Error interno del servidor",
    };
  }
}

// #region UBICACION
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

// #region PROYECTOS
export async function actionsCrearPresupuesto(
  _prevState: any,
  formData: FormData
) {
  try {
    const headersList = headers();
    const referer = headersList.get("referer") || "/dashboard/proyectos";
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

    const url = new URL(referer);
    let newUrl = "/dashboard/proyectos" + url.search;

    revalidatePath(newUrl);
    redirect(newUrl);
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
    const headersList = headers();
    const referer = headersList.get("referer") || "/dashboard/proyectos";
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

    const url = new URL(referer);
    let newUrl = "/dashboard/proyectos" + url.search;

    revalidatePath(newUrl);
    redirect(newUrl);
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

export async function actionsDeletePresupuesto(
  Pre_Id: number,
  newState?: number
) {
  try {
    const headersList = headers();
    const referer = headersList.get("referer") || "/dashboard/proyectos";
    const { id } = await deletePresupuestoSchema.parseAsync({
      id: Pre_Id,
    });
    await cambioEstadoPresupuesto(id, newState || 0);

    const url = new URL(referer);
    let newUrl = "/dashboard/proyectos" + url.search;

    revalidatePath(newUrl);
    redirect(newUrl);
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

export async function actionsQueueExportS3Presupuestos({
  userId,
  prefixNameFile,
  email,
}: {
  userId: string;
  prefixNameFile: string;
  email?: string;
}) {
  try {
    const dataProyectos = await obtenerProyectosPaginados(userId, 50, 1, "");
    await queueS3({
      data: dataProyectos[0].result.data.map((object) => ({
        Código: object.pre_codigo || "",
        Usuario: object.usu_nomapellidos,
        Nombre: object.pre_nombre,
        "Razón social": object.cli_nomaperazsocial,
        Jornal: object.pre_jornal,
        Fecha: object.pre_fechorregistro,
      })),
      userId: userId,
      prefixNameFile: prefixNameFile,
      email: email,
    });
  } catch (error) {
    throw error;
  }
}

// #region GRUPOS DE PARTIDAS
export async function actionsCrearGrupoPartida(
  _prevState: any,
  formData: FormData
) {
  try {
    const headersList = headers();
    const referer =
      headersList.get("referer") || "/dashboard/grupos_de_partida/subgrupos";
    const { nombreGrupoPartida, idProyecto, idLastGroupPartida } =
      await crearGrupoPartidaSchema.parseAsync({
        nombreGrupoPartida: formData.get("nombreGrupoPartida"),
        idProyecto: formData.get("idProyecto"),
        idLastGroupPartida: formData.get("idLastGroupPartida"),
      });

    await crearGrupoPartida(nombreGrupoPartida, idProyecto, idLastGroupPartida);

    const url = new URL(referer);
    let newUrl = replaceSegmentInPath(
      url.pathname + url.search,
      "crear",
      "subgrupos"
    );
    // newUrl.searchParams.set("proyectoId", idProyecto.toString());

    revalidatePath(newUrl);
    return redirect(newUrl);
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

export async function actionsEditarGrupoPartida(
  idGrupoPartida: number,
  _prevState: any,
  formData: FormData
) {
  try {
    const headersList = headers();
    const referer =
      headersList.get("referer") || "/dashboard/grupos_de_partida/subgrupos";
    const { nombreGrupoPartida } = await editarGrupoPartidaSchema.parseAsync({
      idGrupoPartida: idGrupoPartida,
      nombreGrupoPartida: formData.get("nombreGrupoPartida"),
    });

    await editarGrupoPartida(idGrupoPartida, nombreGrupoPartida);

    const url = new URL(referer);
    let newUrl = "";

    let segments = url.pathname.split("/");
    let lastSegment = segments[segments.length - 1];

    // Verificar si se navega a un subgrupo
    if (!isNaN(Number(lastSegment))) {
      newUrl = replaceSegmentInPath(
        url.pathname + url.search,
        "editar",
        "subgrupos",
        1
      );
    } else {
      newUrl = replaceSegmentInPath(
        url.pathname + url.search,
        "editar",
        "subgrupos"
      );
    }

    revalidatePath(newUrl);
    return redirect(newUrl);
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

// #region PARTIDAS
export async function actionsCrearPartida(_prevState: any, formData: FormData) {
  try {
    const headersList = headers();
    const referer = headersList.get("referer") || "/dashboard/partidas";
    const {
      idGrupoPartida,
      nombrePartida,
      rendimientoManoDeObra,
      rendimientoEquipo,
      unidadMedida,
    } = await crearPartidaSchema.parseAsync({
      idGrupoPartida: formData.get("idGrupoPartida"),
      nombrePartida: formData.get("nombrePartida"),
      rendimientoManoDeObra: Number(formData.get("rendimientoManoDeObra")),
      rendimientoEquipo: Number(formData.get("rendimientoEquipo")),
      unidadMedida: formData.get("unidadMedida"),
    });

    await crearPartida(
      Number(idGrupoPartida),
      nombrePartida,
      rendimientoManoDeObra,
      rendimientoEquipo,
      unidadMedida
    );

    const url = new URL(referer);
    let newUrl = "/dashboard/partidas" + url.search;

    newUrl = replaceSegmentInPath(newUrl, "crear", "subgrupos");
    newUrl = replaceSegmentInPath(newUrl, "subgrupos", "editar");

    revalidatePath(newUrl);
    redirect(newUrl);
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

export async function actionsEditarPartida(
  p_par_id: number,
  _prevState: any,
  formData: FormData
) {
  try {
    const headersList = headers();
    const referer = headersList.get("referer") || "/dashboard/partidas";
    const {
      idPartida,
      nombrePartida,
      rendimientoManoDeObra,
      rendimientoEquipo,
      unidadMedida,
    } = await editarPartidaSchema.parseAsync({
      idPartida: p_par_id,
      nombrePartida: formData.get("nombrePartida"),
      rendimientoManoDeObra: Number(formData.get("rendimientoManoDeObra")),
      rendimientoEquipo: Number(formData.get("rendimientoEquipo")),
      unidadMedida: formData.get("unidadMedida"),
    });

    await editarPartida(
      Number(idPartida),
      nombrePartida,
      rendimientoManoDeObra,
      rendimientoEquipo,
      unidadMedida
    );

    const url = new URL(referer);
    let newUrl = "/dashboard/partidas" + url.search;

    newUrl = replaceSegmentInPath(newUrl, "crear", "subgrupos");
    newUrl = replaceSegmentInPath(newUrl, "subgrupos", "editar");

    revalidatePath(newUrl);
    redirect(newUrl);
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

// export async function actionsDeletePartida(
//   p_par_id: number,
//   newState?: number
// ) {
//   try {
//     const headersList = headers();
//     const referer = headersList.get("referer") || "/dashboard/partidas";
//     const { idPartida } = await deletePartidaSchema.parseAsync({
//       id: p_par_id,
//     });
//     await cambioEstadoPartida(idPartida, newState || 0);

//     const url = new URL(referer);
//     let newUrl = "/dashboard/partidas" + url.search;

//     newUrl = replaceSegmentInPath(newUrl, "crear", "subgrupos");
//     newUrl = replaceSegmentInPath(newUrl, "subgrupos", "editar");

//     revalidatePath(newUrl);
//     redirect(newUrl);
//   } catch (error) {
//     if (isRedirectError(error)) {
//       throw error;
//     }
//     if (error instanceof ZodError) {
//       return {
//         message: error.errors.map((err) => err.message),
//         isError: true,
//       };
//     }
//     if (error instanceof Error) {
//       return {
//         message: error?.message,
//         isError: true,
//       };
//     }
//     return {
//       message: "Algo salió mal.",
//       isError: true,
//     };
//   }
// }

// #region RECURSOS
