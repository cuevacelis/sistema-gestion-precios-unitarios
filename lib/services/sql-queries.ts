import { sql } from "@vercel/postgres";
import { unstable_noStore } from "next/cache";
import { sql as sqlKysely } from "kysely";
import "server-only";
import cache from "../cache";
import {
  IDataDBCliente,
  IDataDBGrupoDePartidas,
  IDataDBLogin,
  IDataDBObtenerClientesPaginados,
  IDataDBObtenerPresupuestosId,
  IDataDBObtenerPresupuestosPaginados,
  IDataDBObtenerUsuariosPaginados,
  // IDataDBSidebar,
  IDataDBUbicacion,
  ISpModuloObtenerModulosXPusuario,
  ISpUsuarioObtenLoginV2,
} from "../types";
import { getDbPostgres } from "@/db/db-postgres";
import { poolPromise, sql as sqlMssql } from "@/db/db-mssql";

// #region login
interface UserCredentials {
  username: string;
  password: string;
}

export const findUserByUsernameAndPassword = cache(
  async (credentials: UserCredentials) => {
    try {
      const { username, password } = credentials;

      return getDbPostgres()
        .selectFrom(
          sqlKysely<ISpUsuarioObtenLoginV2>`sp_usuario_obten_login_v2(${username}, ${password})`.as(
            "result"
          )
        )
        .selectAll()
        .execute();
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
      return getDbPostgres()
        .selectFrom(
          sqlKysely<ISpModuloObtenerModulosXPusuario>`sp_modulo_obtener_modulos_x_usuario(${userId})`.as(
            "result"
          )
        )
        .selectAll()
        .execute();
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
        .input("RegistroPagina", sqlMssql.Int, elementosPorPagina)
        .input("NumeroPagina", sqlMssql.Int, paginaActual)
        .input("PorNombre", sqlMssql.VarChar, busqueda)
        .output("TotalPagina", sqlMssql.Int)
        .output("TotalRegistro", sqlMssql.Int)
        .output("TienePaginaAnterior", sqlMssql.Bit)
        .output("TienePaginaProximo", sqlMssql.Bit)
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
        .input("RegistroPagina", sqlMssql.Int, elementosPorPagina)
        .input("NumeroPagina", sqlMssql.Int, paginaActual)
        .input("PorNombre", sqlMssql.VarChar, busqueda)
        .output("TotalPagina", sqlMssql.Int)
        .output("TotalRegistro", sqlMssql.Int)
        .output("TienePaginaAnterior", sqlMssql.Bit)
        .output("TienePaginaProximo", sqlMssql.Bit)
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

export const obtenerPresupuestosId = async (Pre_Id: number) => {
  try {
    unstable_noStore();
    const pool = await poolPromise;
    return pool
      .request()
      .input("Pre_Id", sqlMssql.Int, Pre_Id)
      .execute<IDataDBObtenerPresupuestosId>("SP_Presupuesto_Obten_x_Id");
  } catch (error) {
    throw error;
  }
};

export const crearPresupuesto = async (
  usuNomApellidos: string,
  preNombre: string,
  cliNomApeRazSocial: string,
  ubiDepartamento: string,
  ubiProvincia: string,
  ubiDistrito: string,
  preJornal: number
) => {
  try {
    unstable_noStore();
    const pool = await poolPromise;
    return pool
      .request()
      .input("Usu_NomApellidos", sqlMssql.VarChar, usuNomApellidos)
      .input("Pre_Nombre", sqlMssql.VarChar, preNombre)
      .input("Cli_NomApeRazSocial", sqlMssql.VarChar, cliNomApeRazSocial)
      .input("Ubi_Departamento", sqlMssql.VarChar, ubiDepartamento)
      .input("Ubi_Provincia", sqlMssql.VarChar, ubiProvincia)
      .input("Ubi_Distrito", sqlMssql.VarChar, ubiDistrito)
      .input("Pre_Jornal", sqlMssql.Decimal(18, 2), preJornal)
      .output("Pre_Id", sqlMssql.Int)
      .execute("SP_Presupuesto_Crea");
  } catch (error) {
    throw error;
  }
};

export const editarPresupuesto = async (
  Pre_Id: number,
  usuNomApellidos: string,
  preNombre: string,
  cliNomApeRazSocial: string,
  ubiDepartamento: string,
  ubiProvincia: string,
  ubiDistrito: string,
  preJornal: number
) => {
  try {
    unstable_noStore();
    const pool = await poolPromise;
    return pool
      .request()
      .input("Pre_Id", sqlMssql.Int, Pre_Id)
      .input("Usu_NomApellidos", sqlMssql.VarChar, usuNomApellidos)
      .input("Pre_Nombre", sqlMssql.VarChar, preNombre)
      .input("Cli_NomApeRazSocial", sqlMssql.VarChar, cliNomApeRazSocial)
      .input("Ubi_Departamento", sqlMssql.VarChar, ubiDepartamento)
      .input("Ubi_Provincia", sqlMssql.VarChar, ubiProvincia)
      .input("Ubi_Distrito", sqlMssql.VarChar, ubiDistrito)
      .input("Pre_Jornal", sqlMssql.Decimal(18, 2), preJornal)
      .execute("SP_Presupuesto_Actualiza");
  } catch (error) {
    throw error;
  }
};

export const cambioEstadoPresupuesto = async (
  Pre_Id: number,
  Pre_Estado: number
) => {
  try {
    unstable_noStore();
    const pool = await poolPromise;
    return pool
      .request()
      .input("Pre_Id", sqlMssql.Int, Pre_Id)
      .input("Pre_Estado", sqlMssql.Int, Pre_Estado)
      .execute("SP_Presupuesto_Actualiza_Estado");
  } catch (error) {
    throw error;
  }
};

export const getLastPresupuesto = async () => {
  try {
    unstable_noStore();
    const pool = await poolPromise;
    return pool
      .request()
      .query("SELECT TOP 1 Pre_Id FROM presupuesto ORDER BY Pre_Id DESC;");
  } catch (error) {
    throw error;
  }
};

// #region Partidas
export const obtenerGruposDePartidasPaginados = cache(
  async (elementosPorPagina: number, paginaActual: number, nombre: string) => {
    try {
      const pool = await poolPromise;
      return pool
        .request()
        .input("RegistroPagina", sqlMssql.Int, elementosPorPagina)
        .input("NumeroPagina", sqlMssql.Int, paginaActual)
        .input("PorNombre", sqlMssql.NVarChar, nombre)
        .output("TotalPagina", sqlMssql.Int)
        .output("TotalRegistro", sqlMssql.Int)
        .output("TienePaginaAnterior", sqlMssql.Bit)
        .output("TienePaginaProximo", sqlMssql.Bit)
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
      return sql`SELECT sp_cliente_obten_paginadov2(${elementosPorPagina},${paginaActual},${nombre})`;
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
