export type TMultipleSelect = Array<{ key: string; name: string }>;

export interface ISearchParams {
  [key: string]: string | string[] | undefined;
}

export type TStatusResponseActions = "idle" | "pending" | "success" | "error";

export interface IBrowserInfo {
  browserName: string;
  fullVersion: string;
  majorVersion: number;
  userAgent: string;
  os: string;
}

export interface DynamicObject {
  [key: string]: string | number | undefined;
}

// #region LOGIN
export interface IBodyLogin {
  username: string;
  password: string;
  userAgent: string;
}

export interface IDataDBLogin {
  Usu_Id: number;
  Usu_Correo: string;
  Usu_Clave: string;
  Usu_NomApellidos: string;
  Rol_Id: number;
  Usu_FecHoraRegistro: string;
  Usu_Observacion: string;
  Usu_Estado: number;
  Usu_TokenActualizado: string;
  Usu_FecHoraTokenActualizado: string;
}

export interface ISpUsuarioObtenLoginV2 {
  usu_id: number;
  usu_correo: string;
  usu_clave: string;
  usu_nomapellidos: string;
  rol_id: number;
  usu_fechoraregistro: string;
  usu_observacion: any;
  usu_estado: number;
}

// #region SIDEBAR
export interface ISpModuloObtenerModulosXPusuario {
  mod_nombre: string;
}

// #region USUARIOS
export interface ISpUsuarioObtenPaginado {
  result: {
    data: Array<{
      usu_id: number;
      usu_correo: string;
      usu_nomapellidos: string;
      rol_nombre: string;
      usu_fechoraregistro: string;
      usu_observacion?: string;
      usu_estado: number;
    }>;
    meta: {
      total_pagina: number;
      total_registro: number;
      tiene_pagina_anterior: boolean;
      tiene_pagina_proximo: boolean;
    };
  };
}

export type TDataDBObtenerUsuariosPaginados =
  ISpUsuarioObtenPaginado["result"]["data"][0];

export interface IDataDBObtenerUsuariosId {
  usu_id: number;
  usu_correo: string;
  usu_clave: string;
  usu_nomapellidos: string;
  rol_id: number;
  rol_nombre: string;
  usu_fechoraregistro: string;
  usu_observacion: string;
  usu_estado: number;
}

// #region CLIENTES
export interface ISpClienteObtenPaginado {
  result: {
    data: Array<{
      cli_id: number;
      cli_nomaperazsocial: string;
      cli_abreviatura: string;
      tipdoc_nombre: string;
      cli_numdocumento: string;
      cli_estado: number;
    }>;
    meta: {
      total_pagina: number;
      total_registro: number;
      tiene_pagina_anterior: boolean;
      tiene_pagina_proximo: boolean;
    };
  };
}

export type TDataDBObtenerClientesPaginados =
  ISpClienteObtenPaginado["result"]["data"][0];

export interface IDataDBObtenerClientesId {
  cli_id: number;
  cli_nomaperazsocial: string;
  cli_abreviatura: string;
  tipdoc_id: number;
  cli_numdocumento: string;
  cli_estado: number;
}

// #region UBICACION
export interface ISpPaisObten {
  pai_id: number;
  pai_nombre: string;
}

export interface ISpDepartamentoObten {
  dep_id: number;
  dep_nombre: string;
}

export interface ISpProvinciaObten {
  prov_id: number;
  prov_nombre: string;
}

export interface ISpDistritoObten {
  dist_id: number;
  dist_nombre: string;
}

export interface ISpObtenerClientes {
  cli_nomaperazsocial: string;
}

// #region PROYECTOS

export interface ISpPresupuestoObtenPaginado {
  result: {
    data: Array<{
      pre_id: number;
      pre_codigo?: string;
      usu_nomapellidos: string;
      pre_nombre: string;
      cli_nomaperazsocial: string;
      pai_nombre: string;
      dep_nombre: string;
      prov_nombre: string;
      dist_nombre: string;
      pre_jornal: number;
      pre_fechorregistro: string;
      pre_estado: number;
    }>;
    meta: {
      total_pagina: number;
      total_registro: number;
      tiene_pagina_anterior: boolean;
      tiene_pagina_proximo: boolean;
    };
  };
}

export type TDataDBObtenerProyectosPaginados =
  ISpPresupuestoObtenPaginado["result"]["data"][0];

export interface ISpPresupuestoCrea {
  pg_catalog: number;
}

export interface IDataDBObtenerProyectosId {
  pre_id: number;
  pre_codigo: any;
  usu_nomapellidos: string;
  pre_nombre: string;
  cli_nomaperazsocial: string;
  pai_id: number;
  dep_id: number;
  prov_id: number;
  dist_id: number;
  pre_jornal: string;
  pre_fechorregistro: string;
  pre_estado: number;
}

// #region GRUPOS DE PARTIDAS
export interface IDataDBObtenerGruposDePartidasId {
  grupar_id: number;
  grupar_nombre: string;
  pre_id: number;
  pre_nombre: string;
  grupar_total: number;
  tiene_hijos: boolean;
  tiene_partidas: boolean;
}

export interface IDataDBGrupoDePartidas {
  NomGruPar_Nombre: string;
}

// #region PARTIDAS
export interface IDataDBObtenerPartidasPaginados {
  par_id: number;
  par_nombre: string;
  par_renmanobra: string;
  par_renequipo: string;
  unimed_nombre: string;
  unimed_id: number;
  par_preunitario: string;
  grupar_id: number;
  grupar_nombre: string;
}

// #region RECURSOS
export interface ISpRecursosObtenPaginado {
  result: {
    data: Array<{
      rec_indunificado: string;
      rec_nombre: string;
      tiprec_nombre: string;
      unimed_nombre: string;
    }>;
    meta: {
      total_pagina: number;
      total_registro: number;
      tiene_pagina_anterior: boolean;
      tiene_pagina_proximo: boolean;
    };
  };
}

export type TDataDBObtenerRecursosPaginados =
  ISpRecursosObtenPaginado["result"]["data"][0];

export interface IDataDBObtenerRecursosPaginados {
  rec_id: number;
  rec_nombre: string;
  par_id: number;
  par_nombre: string;
  tiprec_nombre: string;
  unimed_nombre: string;
  rec_cantidad: number;
  rec_cuadrilla: number;
  detrec_precio: number;
}

// #region HOJA_DEL_PRESUPUESTO
export interface ISpHojaDePresupuesto {
  result: {
    data: Array<{
      pre_id: number;
      pre_codigo: string;
      usu_nomapellidos: string;
      pre_nombre: string;
      cli_nomaperazsocial: string;
      pai_nombre: string;
      dep_nombre: string;
      prov_nombre: string;
      dist_nombre: string;
      pre_jornal: number;
      pre_fechorregistro: string;
      pre_estado: number;
      grupos_partida: Array<{
        grupar_id: number;
        grupar_nombre: string;
        grupar_total: any;
        grupos_hijos?: Array<{
          grupar_id: number;
          grupar_nombre: string;
          grupar_total: any;
        }>;
      }>;
    }>;
  };
}
