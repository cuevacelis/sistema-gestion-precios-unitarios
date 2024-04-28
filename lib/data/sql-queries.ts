import { poolPromise, sql } from "@/db/db-mssql";
import "server-only";
import cache from "../cache";
import {
  IDataDBLogin,
  IDataDBObtenerPresupuestosPaginados,
  IDataDBSidebar,
} from "../types";

// #region login
interface UserCredentials {
  username: string;
  password: string;
}

export const findUserByUsernameAndPassword = cache(
  async (credentials: UserCredentials) => {
    try {
      const { username, password } = credentials;
      const pool = await poolPromise;
      return pool
        .request()
        .input("input_parameter1", sql.VarChar, username)
        .input("input_parameter2", sql.VarChar, password)
        .output("input_parameter3", sql.VarChar, password)
        .query<IDataDBLogin>(
          "SELECT TOP 1 * FROM usuario WHERE Usu_Correo = @input_parameter1 AND Usu_Clave =  @input_parameter2"
        );
    } catch (error) {
      throw error;
    }
  },
  ["credentials"],
  { tags: ["credentials"], revalidate: 60 * 60 * 24 }
);

// #region SIDEBAR
export const getModulosByUserId = cache(
  async (userId: number) => {
    try {
      const pool = await poolPromise;
      return pool
        .request()
        .input("input_parameter1", sql.Int, userId)
        .query<IDataDBSidebar>(
          `SELECT
          m.* 
          FROM
            usuario u
            JOIN rol r ON u.Rol_Id = r.Rol_Id
            JOIN detalle_rol_modulo drm ON r.Rol_Id = drm.Rol_Id
            JOIN modulo m ON drm.Mod_Id = m.Mod_Id 
          WHERE
            u.Usu_Id = @input_parameter1
            AND drm.DetRolMod_Estado = 1 
            AND m.Mod_Estado = 1`
        );
    } catch (error) {
      throw error;
    }
  },
  ["modulesByUserId"],
  { tags: ["modulesByUserId"], revalidate: 60 * 60 * 24 }
);

// #region Presupuestos
export const obtenerPresupuestosPaginados = cache(
  async (
    elementosPorPagina: number,
    paginaActual: number,
    busqueda: string
  ) => {
    try {
      const pool = await poolPromise;
      return pool
        .request()
        .input("RegistroPagina", sql.Int, elementosPorPagina)
        .input("NumeroPagina", sql.Int, paginaActual)
        .input("PorNombre", sql.NVarChar, busqueda)
        .output("TotalPagina", sql.Int)
        .output("TotalRegistro", sql.Int)
        .output("TienePaginaAnterior", sql.Bit)
        .output("TienePaginaProximo", sql.Bit)
        .execute<IDataDBObtenerPresupuestosPaginados>(
          "SP_Presupuesto_Obten_Paginado"
        );
    } catch (error) {
      throw error;
    }
  },
  ["presupuestosPaginados"],
  { tags: ["presupuestosPaginados"], revalidate: 60 * 60 * 24 }
);

// #region PROYECTOS
