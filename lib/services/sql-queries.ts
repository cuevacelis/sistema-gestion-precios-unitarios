import { poolPromise, sql } from "@/db/db-mssql";
import "server-only";
import cache from "../cache";
import {
    IDataDBCliente,
    IDataDBGrupoDePartidas,
    IDataDBLogin,
    IDataDBObtenerClientesPaginados,
    IDataDBObtenerPresupuestosPaginados,
    IDataDBObtenerUsuariosPaginados,
    IDataDBSidebar,
    IDataDBUbicacion,
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
  { tags: ["credentials"] }
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

// #region Usuarios
export const obtenerUsuariosPaginados = cache(
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
        .execute<IDataDBObtenerUsuariosPaginados>("SP_Usuario_Obten_Paginado");
    } catch (error) {
      throw error;
    }
  },
  ["usuariosPaginados"],
  { tags: ["usuariosPaginados"], revalidate: 60 * 60 * 24 }
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
  { tags: ["presupuestosPaginados"] }
);

export const crearPresupuesto = cache(
  async (
    usuNomApellidos: string,
    preNombre: string,
    cliNomApeRazSocial: string,
    ubiDepartamento: string,
    ubiProvincia: string,
    ubiDistrito: string,
    preJornal: number
  ) => {
    try {
      const pool = await poolPromise;
      return pool
        .request()
        .input("Usu_NomApellidos", sql.VarChar, usuNomApellidos)
        .input("Pre_Nombre", sql.VarChar, preNombre)
        .input("Cli_NomApeRazSocial", sql.VarChar, cliNomApeRazSocial)
        .input("Ubi_Departamento", sql.VarChar, ubiDepartamento)
        .input("Ubi_Provincia", sql.VarChar, ubiProvincia)
        .input("Ubi_Distrito", sql.VarChar, ubiDistrito)
        .input("Pre_Jornal", sql.Decimal(18, 2), preJornal)
        .output("Pre_Id", sql.Int)
        .execute("SP_Presupuesto_Crea");
    } catch (error) {
      throw error;
    }
  },
  ["crearPresupuesto"],
  { tags: ["crearPresupuesto"] }
);

export const getLastPresupuesto = cache(
  async () => {
    try {
      const pool = await poolPromise;
      return pool
        .request()
        .query("SELECT TOP 1 Pre_Id FROM presupuesto ORDER BY Pre_Id DESC;");
    } catch (error) {
      throw error;
    }
  },
  ["lastPresupuesto"],
  { tags: ["lastPresupuesto"] }
);

// #region Partidas
export const obtenerGruposDePartidasPaginados = cache(
  async (elementosPorPagina: number, paginaActual: number, nombre: string) => {
    try {
      const pool = await poolPromise;
      return pool
        .request()
        .input("RegistroPagina", sql.Int, elementosPorPagina)
        .input("NumeroPagina", sql.Int, paginaActual)
        .input("PorNombre", sql.NVarChar, nombre)
        .output("TotalPagina", sql.Int)
        .output("TotalRegistro", sql.Int)
        .output("TienePaginaAnterior", sql.Bit)
        .output("TienePaginaProximo", sql.Bit)
        .execute<IDataDBGrupoDePartidas>(
          "SP_Grupo_Partida_Obten_Paginado_x_Presupuesto"
        );
    } catch (error) {
      throw error;
    }
  },
  ["gruposDePartidasPaginados"],
  { tags: ["gruposDePartidasPaginados"] }
);

// #region Clientes
export const obtenerClientesPaginados = cache(
  async (elementosPorPagina: number, paginaActual: number, nombre: string) => {
    try {
      const pool = await poolPromise;
      return pool
        .request()
        .input("RegistroPagina", sql.Int, elementosPorPagina)
        .input("NumeroPagina", sql.Int, paginaActual)
        .input("PorNombre", sql.NVarChar, nombre)
        .output("TotalPagina", sql.Int)
        .output("TotalRegistro", sql.Int)
        .output("TienePaginaAnterior", sql.Bit)
        .output("TienePaginaProximo", sql.Bit)
        .execute<IDataDBObtenerClientesPaginados>("SP_Cliente_Obten_Paginado");
    } catch (error) {
      throw error;
    }
  },
  ["clientesPaginados"],
  { tags: ["clientesPaginados"] }
);

export const obtenerClientes = cache(
  async () => {
    try {
      const pool = await poolPromise;
      return pool.request().execute<IDataDBCliente>("SP_Cliente_Obten_Nombre");
    } catch (error) {
      throw error;
    }
  },
  ["clientes"],
  { tags: ["clientes"] }
);

export const obtenerUbicacion = cache(
  async () => {
    try {
      const pool = await poolPromise;
      return pool.request().execute<IDataDBUbicacion>("SP_Ubicacion_Obten");
    } catch (error) {
      throw error;
    }
  },
  ["ubicacion"],
  { tags: ["ubicacion"], revalidate: 60 * 60 * 24 * 30 }
);
