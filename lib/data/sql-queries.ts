import db from "@/scripts/db";
import "server-only";
import { modulo, usuario } from "../types/@prisma/client";

interface UserCredentials {
  username: string;
  password: string;
}

export async function findUserByUsernameAndPassword(
  credentials: UserCredentials
): Promise<usuario | null> {
  try {
    const { username, password } = credentials;

    const user = await db.$queryRaw<usuario[]>`
      SELECT TOP 1 * FROM usuario
      WHERE Usu_Correo = ${username} AND Usu_Clave = ${password}
    `;

    return user.length > 0 ? user[0] : null;
  } catch (error) {
    console.error("Error al buscar usuario:", error);
    throw error;
  }
}

export async function getModulosByUserId(userId: number): Promise<modulo[]> {
  try {
    const modulos = await db.$queryRaw<modulo[]>`
      SELECT m.*
      FROM usuario u
      JOIN rol r ON u.Rol_Id = r.Rol_Id
      JOIN detalle_rol_modulo drm ON r.Rol_Id = drm.Rol_Id
      JOIN modulo m ON drm.Mod_Id = m.Mod_Id
      WHERE u.Usu_Id = ${userId} AND drm.DetRolMod_Estado = 1 AND m.Mod_Estado = 1;
    `;

    return modulos;
  } catch (error) {
    console.error("Error al obtener módulos del usuario:", error);
    throw error;
  }
}

interface PresupuestosPaginados {
  totalElementos: number;
  elementosPorPagina: number;
  paginaActual: number;
  data: Presupuesto[];
}

export interface Presupuesto {
  Pre_Id: number;
  Pre_Codigo: string;
  Usu_NomApellidos: string;
  Pre_Nombre: string;
  Cli_NomApeRazSocial: string;
  Ubi_Departamento: string;
  Ubi_Provincia: string;
  Ubi_Distrito: string;
  Pre_Jornal: number;
  Pre_FecHorRegistro: string;
}

export async function obtenerPresupuestosPaginados(
  elementosPorPagina: number,
  paginaActual: number,
  usuarioId: number,
  busqueda: string
): Promise<PresupuestosPaginados> {
  try {
    const offset = (paginaActual - 1) * elementosPorPagina;

    const totalElementosResult = await db.$queryRaw<{ count: number }[]>`
      SELECT COUNT(*) AS count
      FROM presupuesto p
      JOIN usuario u ON p.Usu_Id = u.Usu_Id
      JOIN cliente c ON p.Cli_Id = c.Cli_Id
      JOIN ubicacion ub ON p.Ubi_Id = ub.Ubi_Id
      WHERE p.Usu_Id = ${usuarioId} AND p.Pre_Nombre LIKE '%' + ${busqueda} + '%';
    `;
    const totalElementos =
      totalElementosResult.length > 0 ? totalElementosResult[0].count : 0;

    const data = await db.$queryRaw<Presupuesto[]>`
      SELECT
        p.Pre_Id AS Pre_Id,
        p.Pre_Codigo AS Pre_Codigo,
        u.Usu_NomApellidos AS Usu_NomApellidos,
        p.Pre_Nombre AS Pre_Nombre,
        c.Cli_NomApeRazSocial AS Cli_NomApeRazSocial,
        ub.Ubi_Departamento AS Ubi_Departamento,
        ub.Ubi_Provincia AS Ubi_Provincia,
        ub.Ubi_Distrito AS Ubi_Distrito,
        CAST(p.Pre_Jornal AS FLOAT) AS Pre_Jornal,
        CONVERT(VARCHAR, p.Pre_FecHorRegistro, 120) AS Pre_FecHorRegistro
      FROM presupuesto p
      JOIN usuario u ON p.Usu_Id = u.Usu_Id
      JOIN cliente c ON p.Cli_Id = c.Cli_Id
      JOIN ubicacion ub ON p.Ubi_Id = ub.Ubi_Id
      WHERE p.Usu_Id = ${usuarioId} AND p.Pre_Nombre LIKE '%' + ${busqueda} + '%'
      ORDER BY p.Pre_Id
      OFFSET ${offset} ROWS
      FETCH NEXT ${elementosPorPagina} ROWS ONLY;
    `;

    return {
      totalElementos: totalElementos,
      elementosPorPagina,
      paginaActual,
      data,
    };
  } catch (error) {
    console.error("Error al obtener presupuestos paginados:", error);
    throw error;
  }
}
