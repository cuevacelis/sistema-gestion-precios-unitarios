import "server-only";
import { unstable_noStore } from "next/cache";
import { sql } from "kysely";
import {
  IDataDBObtenerAsignacionesRecursoToPartida,
  IDataDBObtenerClientesId,
  IDataDBObtenerGruposDePartidasId,
  IDataDBObtenerHojaDePresupuestoId,
  IDataDBObtenerPartidasPaginados,
  IDataDBObtenerProyectosId,
  IDataDBObtenerRecursosPaginados,
  IDataDBObtenerUsuariosId,
  IDataSPPrecioRecursoRecomendadoObtenXNombreXDepartamento,
  ISpClienteObtenPaginado,
  ISpDepartamentoObten,
  ISpDistritoObten,
  ISpHojaDePresupuesto,
  ISpModuloObtenerModulosXPusuario,
  ISpObtenerClientes,
  ISpPaisObten,
  ISpPresupuestoObtenPaginado,
  ISpProvinciaObten,
  ISpRecursosObtenPaginado,
  ISpUsuarioObtenLoginV2,
  ISpUsuarioObtenPaginado,
} from "../types/types";
import { getDbPostgres } from "@/db/db-postgres";
import cache from "../utils";

// #region LOGIN
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
          sql<ISpUsuarioObtenLoginV2>`sp_usuario_obten_login_v2(${username}, ${password})`.as(
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

export const validateUserId = cache(
  async (userId: number) => {
    try {
      return getDbPostgres()
        .selectFrom("usuario")
        .where("usu_id", "=", userId)
        .executeTakeFirst();
    } catch (error) {
      throw error;
    }
  },
  ["credentials"],
  { tags: ["credentials"] }
);

export const obtenerUsuarioLogeado = cache(
  async (userId: number) => {
    try {
      return getDbPostgres()
        .selectFrom("usuario")
        .selectAll()
        .where("usu_id", "=", userId)
        .where("usu_estado", "=", 1)
        .executeTakeFirst();
    } catch (error) {
      throw error;
    }
  },
  ["usuarioLogeado"],
  { tags: ["usuarioLogeado"] }
);

// #region SIDEBAR
export const getModulosByUserId = cache(
  async (userId: number) => {
    try {
      return getDbPostgres()
        .selectFrom(
          sql<ISpModuloObtenerModulosXPusuario>`sp_modulo_obtener_modulos_x_usuario(${userId})`.as(
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

// #region USUARIOS
export const obtenerUsuariosPaginados = cache(
  async (
    elementosPorPagina: number,
    paginaActual: number,
    busqueda: string
  ) => {
    try {
      return getDbPostgres()
        .selectFrom(
          sql<ISpUsuarioObtenPaginado>`sp_usuario_obten_paginadov2(${elementosPorPagina}, ${paginaActual}, ${busqueda === "" ? null : busqueda})`.as(
            "result"
          )
        )
        .selectAll()
        .execute();
    } catch (error) {
      throw error;
    }
  },
  ["usuarios"],
  { tags: ["usuarios"] }
);

export const obtenerUsuarios = cache(
  async () => {
    try {
      return getDbPostgres()
        .selectFrom("usuario")
        .where("usu_estado", "=", 1)
        .selectAll()
        .execute();
    } catch (error) {
      throw error;
    }
  },
  ["usuarios"],
  { tags: ["usuarios"], revalidate: 60 * 60 * 24 }
);

export const obtenerUsuariosById = cache(
  async (id: number) => {
    try {
      return getDbPostgres()
        .selectFrom(
          sql<IDataDBObtenerUsuariosId>`sp_usuario_obten_x_id(${id})`.as(
            "result"
          )
        )
        .selectAll()
        .execute();
    } catch (error) {
      throw error;
    }
  },
  ["usuariosById"],
  { tags: ["usuariosById"] }
);

export const crearUsuario = cache(
  async (
    p_usu_correo: string,
    p_usu_clave: string,
    p_usu_nomapellidos: string,
    p_rol_id: number
  ) => {
    try {
      return getDbPostgres()
        .selectFrom(
          sql<any>`sp_usuario_crea(${p_usu_correo}, ${p_usu_clave}, ${p_usu_nomapellidos}, ${p_rol_id})`.as(
            "result"
          )
        )
        .selectAll()
        .execute();
    } catch (error) {
      throw error;
    }
  },
  ["usuarios"],
  { tags: ["usuarios"] }
);

export const editarUsuario = cache(
  async (
    p_usu_id: number,
    p_usu_correo: string,
    p_usu_clave: string,
    p_usu_nomapellidos: string,
    p_rol_id: number,
    p_usu_observacion: string
  ) => {
    try {
      return getDbPostgres()
        .selectFrom(
          sql<any>`sp_usuario_actualiza(${p_usu_id}, ${p_usu_correo}, ${p_usu_clave}, ${p_usu_nomapellidos}, ${p_rol_id}, ${p_usu_observacion})`.as(
            "result"
          )
        )
        .selectAll()
        .execute();
    } catch (error) {
      throw error;
    }
  },
  ["usuarios"],
  { tags: ["usuarios"] }
);

export const cambioEstadoUsuario = cache(
  async (p_usu_id: number, p_usu_estado: number) => {
    try {
      return getDbPostgres()
        .selectFrom(
          sql<any>`sp_usuario_actualiza_estado(${p_usu_id}, ${p_usu_estado})`.as(
            "result"
          )
        )
        .selectAll()
        .execute();
    } catch (error) {
      throw error;
    }
  },
  ["usuarios"],
  { tags: ["usuarios"] }
);

export const obtenerRoles = cache(
  async () => {
    try {
      return getDbPostgres()
        .selectFrom("rol")
        .where("rol_estado", "=", 1)
        .selectAll()
        .execute();
    } catch (error) {
      throw error;
    }
  },
  ["roles"],
  { tags: ["roles"] }
);

// #region CLIENTES
export const obtenerClientesPaginados = cache(
  async (
    elementosPorPagina: number,
    paginaActual: number,
    busqueda: string
  ) => {
    try {
      return getDbPostgres()
        .selectFrom(
          sql<ISpClienteObtenPaginado>`sp_cliente_obten_paginadov2(${elementosPorPagina}, ${paginaActual}, ${busqueda === "" ? null : busqueda})`.as(
            "result"
          )
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

export const obtenerClientes = cache(
  async () => {
    try {
      return getDbPostgres()
        .selectFrom("cliente")
        .selectAll()
        .where("cli_estado", "=", 1)
        .execute();
    } catch (error) {
      throw error;
    }
  },
  ["clientes"],
  { tags: ["clientes"] }
);

export const obtenerClientesById = cache(
  async (id: number) => {
    try {
      return getDbPostgres()
        .selectFrom(
          sql<IDataDBObtenerClientesId>`sp_cliente_obten_x_id(${id})`.as(
            "result"
          )
        )
        .selectAll()
        .execute();
    } catch (error) {
      throw error;
    }
  },
  ["clientesById"],
  { tags: ["clientesById"] }
);

export const crearCliente = cache(
  async (
    p_cli_nomaperazsocial: string,
    p_cli_abreviatura: string,
    p_tipdoc_id: number,
    p_cli_numdocumento: string
  ) => {
    try {
      return getDbPostgres()
        .selectFrom(
          sql<any>`sp_cliente_crea(${p_cli_nomaperazsocial}, ${p_cli_abreviatura}, ${p_tipdoc_id}, ${p_cli_numdocumento})`.as(
            "result"
          )
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

export const editarCliente = cache(
  async (
    p_cli_id: number,
    p_cli_nomaperazsocial: string,
    p_cli_abreviatura: string,
    p_tipdoc_id: number,
    p_cli_numdocumento: string
  ) => {
    try {
      return getDbPostgres()
        .selectFrom(
          sql<any>`sp_cliente_actualiza(${p_cli_id}, ${p_cli_nomaperazsocial}, ${p_cli_abreviatura}, ${p_tipdoc_id}, ${p_cli_numdocumento})`.as(
            "result"
          )
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

export const cambioEstadoCliente = cache(
  async (p_cli_id: number, p_cli_estado: number) => {
    try {
      return getDbPostgres()
        .selectFrom(
          sql<any>`sp_cliente_actualiza_estado(${p_cli_id}, ${p_cli_estado})`.as(
            "result"
          )
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

export const obtenerTipoDocumento = cache(
  async () => {
    try {
      return getDbPostgres().selectFrom("tipo_documento").selectAll().execute();
    } catch (error) {
      throw error;
    }
  },
  ["tipoDocumento"],
  { tags: ["tipoDocumento"] }
);

// #region UBICACION
export const obtenerCountries = cache(
  async () => {
    try {
      return getDbPostgres()
        .selectFrom(sql<ISpPaisObten>`sp_pais_obten()`.as("result"))
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
          sql<ISpDepartamentoObten>`sp_departamento_obten_x_pais(${idCountry})`.as(
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
          sql<ISpProvinciaObten>`sp_provincia_obten_x_pais_x_departamento(${idCountry}, ${idDepartment})`.as(
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
          sql<ISpDistritoObten>`sp_distrito_obten_x_pais_x_departamento_x_provincia(${idCountry}, ${idDepartment}, ${idProvince})`.as(
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

// #region PROYECTOS
export const obtenerProyectosPaginados = cache(
  async (
    idUsuario: string,
    elementosPorPagina: number,
    paginaActual: number,
    busqueda: string
  ) => {
    try {
      return getDbPostgres()
        .selectFrom(
          sql<ISpPresupuestoObtenPaginado>`sp_presupuesto_obten_paginadov3_vusuario(${idUsuario}, ${elementosPorPagina}, ${paginaActual}, ${busqueda === "" ? null : busqueda})`.as(
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

export const obtenerProyectoDetalle = cache(
  async (Pre_Id: number) => {
    try {
      return (
        getDbPostgres()
          .selectFrom("presupuesto")
          .innerJoin("cliente", "presupuesto.cli_id", "cliente.cli_id")
          .innerJoin("usuario", "presupuesto.usu_id", "usuario.usu_id")
          .innerJoin(
            "ubicacion_presupuesto",
            "presupuesto.ubipre_id",
            "ubicacion_presupuesto.ubipre_id"
          )
          .innerJoin("pais", "ubicacion_presupuesto.pai_id", "pais.pai_id")
          .innerJoin(
            "departamento",
            "ubicacion_presupuesto.dep_id",
            "departamento.dep_id"
          )
          .innerJoin(
            "provincia",
            "ubicacion_presupuesto.prov_id",
            "provincia.prov_id"
          )
          .innerJoin(
            "distrito",
            "ubicacion_presupuesto.dist_id",
            "distrito.dist_id"
          )
          .leftJoin(
            "precio_recurso_presupuesto",
            "presupuesto.pre_id",
            "precio_recurso_presupuesto.pre_id"
          )
          .select(({ fn, val, ref }) => [
            "presupuesto.pre_id",
            "presupuesto.pre_codigo",
            "presupuesto.pre_nombre",
            "cliente.cli_id",
            "cliente.cli_nomaperazsocial",
            "usuario.usu_nomapellidos",
            "pais.pai_nombre",
            "departamento.dep_nombre",
            "provincia.prov_nombre",
            "distrito.dist_nombre",
            sql<string>`TO_CHAR(presupuesto.pre_fechorregistro, 'YYYY-MM-DD"T"HH24:MI:SS.MS')`.as(
              "pre_fechorregistro"
            ),
            "presupuesto.pre_jornal",
            "presupuesto.pre_estado",
            fn
              .sum("precio_recurso_presupuesto.rec_precio")
              .as("total_precio_recurso"),
          ])
          .where("presupuesto.pre_id", "=", Pre_Id)
          .groupBy([
            "presupuesto.pre_id",
            "cliente.cli_id",
            "usuario.usu_id",
            "pais.pai_id",
            "departamento.dep_id",
            "provincia.prov_id",
            "distrito.dist_id",
          ])
          .limit(1)
          // .execute();
          .executeTakeFirst()
      );
    } catch (error) {
      throw error;
    }
  },
  ["detalleProyecto"],
  { tags: ["detalleProyecto"], revalidate: 60 * 60 * 24 }
);

export const obtenerProyectosId = async (Pre_Id: number) => {
  try {
    return getDbPostgres()
      .selectFrom(
        sql<IDataDBObtenerProyectosId>`sp_presupuesto_obten_x_id(${Pre_Id})`.as(
          "result"
        )
      )
      .selectAll()
      .execute();
  } catch (error) {
    throw error;
  }
};

export const obtenerProyectos = async () => {
  try {
    return getDbPostgres()
      .selectFrom("presupuesto")
      .where("pre_estado", "=", 1)
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
        sql<any>`sp_presupuesto_crea_v2(${usuNomApellidosUsuario}, ${nombrePresupuesto}, ${cliNomApeRazSocial}, ${idCountry}, ${idDepartment}, ${idProvince}, ${idDistrict}, ${idJournal})`.as(
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
        sql<any>`sp_presupuesto_actualiza_v2(${p_pre_id}, ${usuNomApellidosUsuario}, ${nombrePresupuesto}, ${cliNomApeRazSocial}, ${idCountry}, ${idDepartment}, ${idProvince}, ${idDistrict}, ${idJournal})`.as(
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
        sql<any>`sp_presupuesto_actualiza_estado(${pre_Id}, ${pre_Estado})`.as(
          "result"
        )
      )
      .selectAll()
      .execute();
  } catch (error) {
    throw error;
  }
};

export const cambioEstadoPresupuestoRecursivo = cache(
  async (id: number, newState: number) => {
    try {
      return getDbPostgres()
        .selectFrom(
          sql<any>`sp_presupuesto_actualiza_estado_general(${id}, ${newState})`.as(
            "result"
          )
        )
        .selectAll()
        .execute();
    } catch (error) {
      throw error;
    }
  },
  ["presupuesto"],
  { tags: ["presupuesto"], revalidate: 60 * 60 * 24 }
);

export const obtenerNombrePresupuestosById = cache(
  async (id: string) => {
    try {
      return getDbPostgres()
        .selectFrom("presupuesto")
        .selectAll()
        .where("pre_id", "=", Number(id))
        .executeTakeFirst();
    } catch (error) {
      throw error;
    }
  },
  ["presupuestosNombre"],
  { tags: ["presupuestosNombre"], revalidate: 60 * 60 * 24 }
);

// #region GRUPOS DE PARTIDAS
export const obtenerGruposDePartidasIdProyecto = async (
  Proyecto_Id: string | null
) => {
  try {
    return getDbPostgres()
      .selectFrom(
        sql<IDataDBObtenerGruposDePartidasId>`sp_grupo_partida_obten_x_presupuesto(${Proyecto_Id})`.as(
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
  Proyecto_Id: string | null,
  Grupo_Partida_Id: string
) => {
  try {
    return getDbPostgres()
      .selectFrom(
        sql<IDataDBObtenerGruposDePartidasId>`sp_grupo_partida_obten_x_presupuesto_x_grupo_partida_v4(${Grupo_Partida_Id},${Proyecto_Id})`.as(
          "result"
        )
      )
      .selectAll()
      .execute();
  } catch (error) {
    throw error;
  }
};

export const obtenerGruposDePartidas = cache(
  async () => {
    try {
      return getDbPostgres()
        .selectFrom("grupo_partida")
        .selectAll()
        .where("grupar_estado", "=", 1)
        .execute();
    } catch (error) {
      throw error;
    }
  },
  ["gruposDePartidas"],
  { tags: ["gruposDePartidas"], revalidate: 60 * 60 * 24 }
);

export const obtenerNombreGruposDePartidasById = cache(
  async (id: string) => {
    try {
      return getDbPostgres()
        .selectFrom("grupo_partida")
        .selectAll()
        .where("grupar_id", "=", Number(id))
        .executeTakeFirst();
    } catch (error) {
      throw error;
    }
  },
  ["gruposDePartidasNombre"],
  { tags: ["gruposDePartidasNombre"], revalidate: 60 * 60 * 24 }
);

export const crearGrupoPartida = async (
  idProyecto: string,
  idLastGroupPartida: string | null,
  nombreGrupoPartida: string
) => {
  try {
    return getDbPostgres()
      .selectFrom(
        sql<any>`sp_grupo_partida_crea_v2(${idProyecto},${idLastGroupPartida || null},${nombreGrupoPartida || null})`.as(
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
  idGrupoPartida: string,
  nombreGrupoPartida: string
) => {
  try {
    return getDbPostgres()
      .selectFrom(
        sql<any>`sp_grupo_partida_actualiza(${idGrupoPartida},${nombreGrupoPartida})`.as(
          "result"
        )
      )
      .selectAll()
      .execute();
  } catch (error) {
    throw error;
  }
};

export const cambioEstadoGrupoPartida = cache(
  async (idGrupoPartida: number, newState: number) => {
    try {
      return getDbPostgres()
        .selectFrom(
          sql<any>`sp_grupo_partida_actualiza_estado(${idGrupoPartida}, ${newState})`.as(
            "result"
          )
        )
        .selectAll()
        .execute();
    } catch (error) {
      throw error;
    }
  },
  ["gruposDePartidasId"],
  { tags: ["gruposDePartidasId"], revalidate: 60 * 60 * 24 }
);

export const obtenerIsPartidasDeGrupoPartidaId = cache(
  async (idGrupoPartida: string) => {
    try {
      const result = await getDbPostgres()
        .selectFrom("partida")
        .innerJoin(
          "detalle_partida_grupo_partida",
          "partida.par_id",
          "detalle_partida_grupo_partida.par_id"
        )
        .select((eb) =>
          eb.fn.count("detalle_partida_grupo_partida.par_id").as("count")
        )
        .where(
          "detalle_partida_grupo_partida.grupar_id",
          "=",
          Number(idGrupoPartida)
        )
        .executeTakeFirst();
      return Number(result?.count) > 0;
    } catch (error) {
      throw error;
    }
  },
  ["isPartidasDeGrupoPartidaId"],
  { tags: ["isPartidasDeGrupoPartidaId"], revalidate: 60 * 60 * 24 }
);

// #region PARTIDAS
export const obtenerPartidasByGrupoPartidaId = cache(
  async (idGrupoPartida: string | null) => {
    try {
      return getDbPostgres()
        .selectFrom(
          sql<IDataDBObtenerPartidasPaginados>`sp_partida_obten_x_grupo(${idGrupoPartida || null})`.as(
            "result"
          )
        )
        .selectAll()
        .execute();
    } catch (error) {
      throw error;
    }
  },
  ["partidasByGrupoPartidaId"],
  { tags: ["partidasByGrupoPartidaId"], revalidate: 60 * 60 * 24 }
);

export const obtenerNombrePartidasByGrupoPartidaId = cache(
  async (grupoPartidaId: number) => {
    try {
      return getDbPostgres()
        .selectFrom(
          sql<any>`sp_partida_obten_nombre_x_grupo(${grupoPartidaId})`.as(
            "result"
          )
        )
        .selectAll()
        .execute();
    } catch (error) {
      throw error;
    }
  },
  ["partida"],
  { tags: ["partida"], revalidate: 60 * 60 * 24 }
);

export const obtenerPartidaById = cache(
  async (p_par_id: number) => {
    try {
      return getDbPostgres()
        .selectFrom(
          sql<IDataDBObtenerPartidasPaginados>`sp_partida_obten_x_id(${p_par_id})`.as(
            "result"
          )
        )
        .selectAll()
        .execute();
    } catch (error) {
      throw error;
    }
  },
  ["partida"],
  { tags: ["partida"], revalidate: 60 * 60 * 24 }
);

export const crearPartida = cache(
  async (
    p_par_nombre: string,
    p_par_renmanobra: number,
    p_par_renequipo: number,
    unimed_id: number,
    p_grupoPartida_id: number
  ) => {
    try {
      return getDbPostgres()
        .selectFrom(
          sql<any>`sp_partida_crea(${p_par_nombre},${p_par_renmanobra},${p_par_renequipo},${unimed_id},${p_grupoPartida_id})`.as(
            "result"
          )
        )
        .selectAll()
        .execute();
    } catch (error) {
      throw error;
    }
  },
  ["partida"],
  { tags: ["partida"], revalidate: 60 * 60 * 24 }
);

export const editarPartida = cache(
  async (
    p_par_id: number,
    p_par_nombre: string,
    p_par_renmanobra: number,
    p_par_renequipo: number,
    unimed_id: number
  ) => {
    try {
      return getDbPostgres()
        .selectFrom(
          sql<any>`sp_partida_actualiza(${p_par_id},${p_par_nombre},${p_par_renmanobra},${p_par_renequipo},${unimed_id})`.as(
            "result"
          )
        )
        .selectAll()
        .execute();
    } catch (error) {
      throw error;
    }
  },
  ["partida"],
  { tags: ["partida"], revalidate: 60 * 60 * 24 }
);

export const cambioEstadoPartida = cache(
  async (p_par_id: number, newState: number) => {
    try {
      return getDbPostgres()
        .selectFrom(
          sql<any>`sp_partida_actualiza_estado(${p_par_id}, ${newState})`.as(
            "result"
          )
        )
        .selectAll()
        .execute();
    } catch (error) {
      throw error;
    }
  },
  ["partida"],
  { tags: ["partida"], revalidate: 60 * 60 * 24 }
);

//#region UNIDADES_DE_MEDIDA
export const obtenerUnidadesDeMedida = cache(
  async () => {
    try {
      return getDbPostgres()
        .selectFrom("unidad_medida")
        .selectAll()
        .where("unimed_estado", "=", 1)
        .execute();
    } catch (error) {
      throw error;
    }
  },
  ["unidadesDeMedida"],
  { tags: ["unidadesDeMedida"], revalidate: 60 * 60 * 24 }
);

// #region RECURSOS
export const obtenerRecursosPaginados = cache(
  async (rowsPerPage: number, paginaActual: number, busqueda: string) => {
    try {
      return getDbPostgres()
        .selectFrom(
          sql<ISpRecursosObtenPaginado>`sp_recurso_obten_paginado(${rowsPerPage}, ${paginaActual}, ${busqueda})`.as(
            "result"
          )
        )
        .selectAll()
        .execute();
    } catch (error) {
      throw error;
    }
  },
  ["recursosPaginados"],
  { tags: ["recursosPaginados"] }
);

export const obtenerRecursos = cache(
  async () => {
    try {
      return getDbPostgres()
        .selectFrom("recurso")
        .innerJoin(
          "tipo_recurso",
          "recurso.tiprec_id",
          "tipo_recurso.tiprec_id"
        )
        .selectAll()
        .where("rec_estado", "=", 1)
        .execute();
    } catch (error) {
      throw error;
    }
  },
  ["recursos"],
  { tags: ["recursos"], revalidate: 60 * 60 * 24 }
);

export const obtenerAsignacionesRecursoToPartida = cache(
  async (p_par_id: number) => {
    try {
      return getDbPostgres()
        .selectFrom(
          sql<IDataDBObtenerAsignacionesRecursoToPartida>`sp_calculo_precio_unitario_obten(${p_par_id})`.as(
            "result"
          )
        )
        .selectAll()
        .execute();
    } catch (error) {
      throw error;
    }
  },
  ["asignacionesRecursoToPartida"],
  { tags: ["asignacionesRecursoToPartida"], revalidate: 60 * 60 * 24 }
);

export const obtenerAsignacionesRecursoToPartidaByRecurso = cache(
  async (p_part_id: number, rec_id: number) => {
    try {
      return getDbPostgres()
        .selectFrom(
          sql<IDataDBObtenerAsignacionesRecursoToPartida>`sp_calculo_precio_unitario_obten_x_id(${p_part_id},${rec_id})`.as(
            "result"
          )
        )
        .selectAll()
        .execute();
    } catch (error) {
      throw error;
    }
  },
  ["asignacionesRecursoToPartida"],
  { tags: ["asignacionesRecursoToPartida"], revalidate: 60 * 60 * 24 }
);

export const crearAsignacionRecursoToPartida = cache(
  async (
    p_par_id: number,
    p_rec_id: number,
    p_rec_cantidad: number | null,
    p_rec_cuadrilla: number | null,
    p_rec_precio: number | null
  ) => {
    try {
      return getDbPostgres()
        .selectFrom(
          sql<any>`sp_calculo_precio_unitario_crea(${p_par_id}, ${p_rec_id}, ${p_rec_cantidad}, ${p_rec_cuadrilla}, ${p_rec_precio})`.as(
            "result"
          )
        )
        .selectAll()
        .execute();
    } catch (error) {
      throw error;
    }
  },
  ["recurso"],
  { tags: ["recurso"], revalidate: 60 * 60 * 24 }
);

export const editarAsignacionRecursoToPartida = cache(
  async (
    p_par_id: number,
    p_rec_id: number,
    p_pre_id: number,
    p_rec_cantidad: number,
    p_rec_cuadrilla: number,
    p_rec_precio: number
  ) => {
    try {
      return getDbPostgres()
        .selectFrom(
          sql<any>`sp_calculo_precio_unitario_actualiza_v2
(${p_par_id}, ${p_rec_id}, ${p_pre_id}, ${p_rec_cantidad}, ${p_rec_cuadrilla}, ${p_rec_precio})`.as(
            "result"
          )
        )
        .selectAll()
        .execute();
    } catch (error) {
      throw error;
    }
  },
  ["recurso"],
  { tags: ["recurso"], revalidate: 60 * 60 * 24 }
);

export const obtenerRecursoById = cache(
  async (p_rec_id: number) => {
    try {
      return getDbPostgres()
        .selectFrom("recurso")
        .innerJoin(
          "tipo_recurso",
          "recurso.tiprec_id",
          "tipo_recurso.tiprec_id"
        )
        .innerJoin(
          "unidad_medida",
          "recurso.unimed_id",
          "unidad_medida.unimed_id"
        )
        .where("recurso.rec_id", "=", p_rec_id)
        .selectAll()
        .execute();
    } catch (error) {
      throw error;
    }
  },
  ["recurso"],
  { tags: ["recurso"], revalidate: 60 * 60 * 24 }
);

export const obtenerRecursosByNombre = cache(
  async (p_rec_nombre: string) => {
    try {
      return getDbPostgres()
        .selectFrom(
          sql<IDataDBObtenerRecursosPaginados>`sp_recurso_obten_x_nombre(${p_rec_nombre})`.as(
            "result"
          )
        )
        .selectAll()
        .execute();
    } catch (error) {
      throw error;
    }
  },
  ["recurso"],
  { tags: ["recurso"], revalidate: 60 * 60 * 24 }
);

export const obtenerTipoRecurso = cache(
  async () => {
    try {
      return getDbPostgres().selectFrom("tipo_recurso").selectAll().execute();
    } catch (error) {
      throw error;
    }
  },
  ["tipoRecurso"],
  { tags: ["tipoRecurso"], revalidate: 60 * 60 * 24 }
);

export const crearRecurso = cache(
  async (
    p_rec_nombre: string,
    p_tiprec_id: number,
    p_unimed_id: number,
    p_rec_indunificado: string
  ) => {
    try {
      return getDbPostgres()
        .selectFrom(
          sql<any>`sp_recurso_crea(${p_rec_nombre}, ${p_tiprec_id}, ${p_unimed_id}, ${p_rec_indunificado})`.as(
            "result"
          )
        )
        .selectAll()
        .execute();
    } catch (error) {
      throw error;
    }
  },
  ["recurso"],
  { tags: ["recurso"], revalidate: 60 * 60 * 24 }
);

export const editarRecurso = cache(
  async (
    p_rec_id: number,
    p_rec_nombre: string,
    p_tiprec_id: number,
    p_unimed_id: number,
    p_indunificado: string
  ) => {
    try {
      return getDbPostgres()
        .selectFrom(
          sql<any>`sp_recurso_actualiza(${p_rec_id}, ${p_rec_nombre}, ${p_tiprec_id}, ${p_unimed_id}, ${p_indunificado})`.as(
            "result"
          )
        )
        .selectAll()
        .execute();
    } catch (error) {
      throw error;
    }
  },
  ["recurso"],
  { tags: ["recurso"], revalidate: 60 * 60 * 24 }
);

export const cambioEstadoRecurso = cache(
  async (p_rec_id: number, newState: number) => {
    try {
      return getDbPostgres()
        .selectFrom(
          sql<any>`sp_recurso_actualiza_estado(${p_rec_id}, ${newState})`.as(
            "result"
          )
        )
        .selectAll()
        .execute();
    } catch (error) {
      throw error;
    }
  },
  ["recurso"],
  { tags: ["recurso"], revalidate: 60 * 60 * 24 }
);

// #region HOJA_DE_PRESUPUESTO
export const obtenerHojaDePresupuesto = cache(
  async () => {
    try {
      return getDbPostgres()
        .selectFrom(
          sql<ISpHojaDePresupuesto>`sp_presupuesto_obten_exportar_json_todo()`.as(
            "result"
          )
        )
        .selectAll()
        .execute();
    } catch (error) {
      throw error;
    }
  },
  ["hojaPresupuesto"],
  { tags: ["hojaPresupuesto"], revalidate: 60 * 60 * 24 }
);

export const obtenerHojaDePresupuestoByProyectoId = cache(
  async (proyectoId: string) => {
    try {
      return getDbPostgres()
        .selectFrom(
          sql<IDataDBObtenerHojaDePresupuestoId>`sp_presupuesto_obten_exportar_json(${proyectoId})`.as(
            "result"
          )
        )
        .selectAll()
        .execute();
    } catch (error) {
      throw error;
    }
  },
  ["hojaPresupuesto"],
  { tags: ["hojaPresupuesto"], revalidate: 60 * 60 * 24 }
);

// #region INDICES DE PRECIOS UNIFICADOS
export const obtenerPreciosRecomendados = cache(
  async () => {
    try {
      return getDbPostgres()
        .selectFrom("precio_recurso_recomendado")
        .innerJoin(
          "departamento",
          "precio_recurso_recomendado.dep_id",
          "departamento.dep_id"
        )
        .selectAll()
        .execute();
    } catch (error) {
      throw error;
    }
  },
  ["preciosRecomendados"],
  { tags: ["preciosRecomendados"], revalidate: 60 * 60 * 24 }
);

export const obtenerPreciosRecomendadosByNombreAndDepartamento = cache(
  async (nombreRecurso: string, dep_id: number) => {
    try {
      return getDbPostgres()
        .selectFrom(
          sql<IDataSPPrecioRecursoRecomendadoObtenXNombreXDepartamento>`sp_precio_recurso_recomendado_obten_x_nombre_x_departamento(${nombreRecurso}, ${dep_id})`.as(
            "result"
          )
        )
        .selectAll()
        .execute();
    } catch (error) {
      throw error;
    }
  },
  ["preciosRecomendados"],
  { tags: ["preciosRecomendados"], revalidate: 60 * 60 * 24 }
);

export const obtenerUltimaFechaPreciosRecomendados = cache(
  async () => {
    try {
      return getDbPostgres()
        .selectFrom("precio_recurso_recomendado")
        .select([
          sql<string>`TO_CHAR(precio_recurso_recomendado.fecha_publicacion, 'YYYY-MM-DD"T"HH24:MI:SS.MS')`.as(
            "fecha_publicacion"
          ),
        ])
        .orderBy("precio_recurso_recomendado.fecha_publicacion", "desc")
        .limit(1)
        .executeTakeFirst();
    } catch (error) {
      throw error;
    }
  },
  ["ultimaFechaPreciosRecomendados"],
  { tags: ["ultimaFechaPreciosRecomendados"], revalidate: 60 * 60 * 24 }
);
