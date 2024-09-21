import { unstable_noStore } from "next/cache";
import { sql as sqlKysely } from "kysely";
import "server-only";
import cache from "../cache";
import {
  IDataDBObtenerGruposDePartidasId,
  IDataDBObtenerProyectosId,
  ISpDepartamentoObten,
  ISpDistritoObten,
  ISpModuloObtenerModulosXPusuario,
  ISpObtenerClientes,
  ISpPaisObten,
  ISpPresupuestoObtenPaginado,
  ISpProvinciaObten,
  ISpUsuarioObtenLoginV2,
} from "../types";
import { getDbPostgres } from "@/db/db-postgres";

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
      return [];
    } catch (error) {
      throw error;
    }
  },
  ["usuariosPaginados"],
  { tags: ["usuariosPaginados"], revalidate: 60 * 60 * 24 }
);

// #region PROYECTOS
export const obtenerProyectosPaginados = cache(
  async (
    elementosPorPagina: number,
    paginaActual: number,
    busqueda: string
  ) => {
    try {
      return getDbPostgres()
        .selectFrom(
          sqlKysely<ISpPresupuestoObtenPaginado>`sp_presupuesto_obten_paginadov3(${elementosPorPagina}, ${paginaActual}, ${busqueda === "" ? null : busqueda})`.as(
            "result"
          )
        )
        .selectAll()
        .execute();
    } catch (error) {
      throw error;
    }
  },
  ["proyectosPaginados"],
  { tags: ["proyectosPaginados"] }
);

export const obtenerProyectosId = async (Pre_Id: number) => {
  try {
    return getDbPostgres()
      .selectFrom(
        sqlKysely<IDataDBObtenerProyectosId>`sp_presupuesto_obten_x_id(${Pre_Id})`.as(
          "result"
        )
      )
      .selectAll()
      .execute();
  } catch (error) {
    throw error;
  }
};

export const crearPresupuesto = async (
  usuNomApellidosUsuario: string,
  nombrePresupuesto: string,
  cliNomApeRazSocial: string,
  idCountry: number,
  idDepartment: number,
  idProvince: number,
  idDistrict: number,
  idJournal: number
) => {
  try {
    return getDbPostgres()
      .selectFrom(
        sqlKysely<any>`sp_presupuesto_crea_v2(${usuNomApellidosUsuario}, ${nombrePresupuesto}, ${cliNomApeRazSocial}, ${idCountry}, ${idDepartment}, ${idProvince}, ${idDistrict}, ${idJournal})`.as(
          "result"
        )
      )
      .selectAll()
      .execute();
  } catch (error) {
    throw error;
  }
};

export const editarPresupuesto = async (
  p_pre_id: number,
  usuNomApellidosUsuario: string,
  nombrePresupuesto: string,
  cliNomApeRazSocial: string,
  idCountry: number,
  idDepartment: number,
  idProvince: number,
  idDistrict: number,
  idJournal: number
) => {
  try {
    unstable_noStore();
    return getDbPostgres()
      .selectFrom(
        sqlKysely<any>`sp_presupuesto_actualiza_v2(${p_pre_id}, ${usuNomApellidosUsuario}, ${nombrePresupuesto}, ${cliNomApeRazSocial}, ${idCountry}, ${idDepartment}, ${idProvince}, ${idDistrict}, ${idJournal})`.as(
          "result"
        )
      )
      .selectAll()
      .execute();
  } catch (error) {
    throw error;
  }
};

export const cambioEstadoPresupuesto = async (
  pre_Id: number,
  pre_Estado: number
) => {
  try {
    unstable_noStore();
    return getDbPostgres()
      .selectFrom(
        sqlKysely<any>`sp_presupuesto_actualiza_estado(${pre_Id}, ${pre_Estado})`.as(
          "result"
        )
      )
      .selectAll()
      .execute();
  } catch (error) {
    throw error;
  }
};

export const obtenerNombrePresupuestosById = cache(
  async (id: number) => {
    try {
      return getDbPostgres()
        .selectFrom("presupuesto")
        .select("pre_nombre")
        .where("pre_id", "=", id)
        .executeTakeFirst();
    } catch (error) {
      throw error;
    }
  },
  ["presupuestosNombre"],
  { tags: ["presupuestosNombre"], revalidate: 60 * 60 * 24 }
);

// #region Grupos de Partidas
export const obtenerGruposDePartidasIdProyecto = async (
  Proyecto_Id: number
) => {
  try {
    return getDbPostgres()
      .selectFrom(
        sqlKysely<IDataDBObtenerGruposDePartidasId>`sp_grupo_partida_obten_x_presupuesto(${Proyecto_Id})`.as(
          "result"
        )
      )
      .selectAll()
      .execute();
  } catch (error) {
    throw error;
  }
};

export const obtenerGruposDePartidasIdRecursive = async (
  Proyecto_Id: number,
  Grupo_Partida_Id: number
) => {
  try {
    return getDbPostgres()
      .selectFrom(
        sqlKysely<IDataDBObtenerGruposDePartidasId>`sp_grupo_partida_obten_x_presupuesto_x_grupo_partida_v2(${Proyecto_Id}, ${Grupo_Partida_Id})`.as(
          "result"
        )
      )
      .selectAll()
      .execute();
  } catch (error) {
    throw error;
  }
};

export const crearGrupoPartida = async (
  nombreGrupoPartida: string,
  idProyecto: string,
  idLastGroupPartida: string | null
) => {
  try {
    return getDbPostgres()
      .selectFrom(
        sqlKysely<any>`sp_grupo_partida_crea_v2(${idProyecto},${idLastGroupPartida},${nombreGrupoPartida})`.as(
          "result"
        )
      )
      .selectAll()
      .execute();
  } catch (error) {
    throw error;
  }
};

export const editarGrupoPartida = async (
  idGrupoPartida: number,
  nombreGrupoPartida: string
) => {
  try {
    return getDbPostgres()
      .selectFrom(
        sqlKysely<any>`sp_grupo_partida_actualiza(${idGrupoPartida},${nombreGrupoPartida})`.as(
          "result"
        )
      )
      .selectAll()
      .execute();
  } catch (error) {
    throw error;
  }
};

// #region Partidas
export const obtenerGruposDePartidasPaginados = cache(
  async (elementosPorPagina: number, paginaActual: number, nombre: string) => {
    try {
      return [];
    } catch (error) {
      throw error;
    }
  },
  ["gruposDePartidasPaginados"],
  { tags: ["gruposDePartidasPaginados"] }
);

export const obtenerNombreGruposDePartidasById = cache(
  async (id: number) => {
    try {
      return getDbPostgres()
        .selectFrom("grupo_partida")
        .select("grupar_nombre")
        .where("grupar_id", "=", id)
        .executeTakeFirst();
    } catch (error) {
      throw error;
    }
  },
  ["gruposDePartidasNombre"],
  { tags: ["gruposDePartidasNombre"], revalidate: 60 * 60 * 24 }
);

// #region Clientes
export const obtenerClientesPaginados = cache(
  async (elementosPorPagina: number, paginaActual: number, nombre: string) => {
    try {
      // return sql`SELECT sp_cliente_obten_paginadov2(${elementosPorPagina},${paginaActual},${nombre})`;
      return [];
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
      return getDbPostgres()
        .selectFrom(
          sqlKysely<ISpObtenerClientes>`sp_cliente_obten_nombre()`.as("result")
        )
        .selectAll()
        .execute();
    } catch (error) {
      throw error;
    }
  },
  ["clientes"],
  { tags: ["clientes"] }
);

// #region UBICACION

export const obtenerCountries = cache(
  async () => {
    try {
      return getDbPostgres()
        .selectFrom(sqlKysely<ISpPaisObten>`sp_pais_obten()`.as("result"))
        .selectAll()
        .execute();
    } catch (error) {
      throw error;
    }
  },
  ["countries"],
  { tags: ["countries"], revalidate: 60 * 60 * 24 * 30 }
);

export const obtenerDepartments = cache(
  async (idCountry: number) => {
    try {
      return getDbPostgres()
        .selectFrom(
          sqlKysely<ISpDepartamentoObten>`sp_departamento_obten_x_pais(${idCountry})`.as(
            "result"
          )
        )
        .selectAll()
        .execute();
    } catch (error) {
      throw error;
    }
  },
  ["departments"],
  { tags: ["departments"], revalidate: 60 * 60 * 24 * 30 }
);

export const obtenerProvinces = cache(
  async (idCountry: number, idDepartment: number) => {
    try {
      return getDbPostgres()
        .selectFrom(
          sqlKysely<ISpProvinciaObten>`sp_provincia_obten_x_pais_x_departamento(${idCountry}, ${idDepartment})`.as(
            "result"
          )
        )
        .selectAll()
        .execute();
    } catch (error) {
      throw error;
    }
  },
  ["provinces"],
  { tags: ["provinces"], revalidate: 60 * 60 * 24 * 30 }
);

export const obtenerDistricts = cache(
  async (idCountry: number, idDepartment: number, idProvince: number) => {
    try {
      return getDbPostgres()
        .selectFrom(
          sqlKysely<ISpDistritoObten>`sp_distrito_obten_x_pais_x_departamento_x_provincia(${idCountry}, ${idDepartment}, ${idProvince})`.as(
            "result"
          )
        )
        .selectAll()
        .execute();
    } catch (error) {
      throw error;
    }
  },
  ["districts"],
  { tags: ["districts"], revalidate: 60 * 60 * 24 * 30 }
);
