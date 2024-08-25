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
  usu_tokenactualizado: any;
  usu_fechoratokenactualizado: any;
}

// #region SIDEBAR
export interface ISpModuloObtenerModulosXPusuario {
  mod_nombre: string;
}

// #region Usuarios
export interface IDataDBObtenerUsuariosPaginados {
  Usu_Id: number;
  Usu_Correo: string;
  Usu_NomApellidos: string;
  Rol_Nombre: string;
  Pre_FecHorRegistro: string;
  Usu_Observacion: string;
  Pre_Estado: number;
}

// #region Presupuestos
export interface IDataDBObtenerPresupuestosPaginados {
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
}

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

export interface ISpPresupuestoCrea {
  pg_catalog: number;
}

export interface IDataDBObtenerPresupuestosId {
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

// #region Partidas
export interface IDataDBObtenerPartidasPaginados {}

// #region Clientes
export interface IDataDBObtenerClientesPaginados {
  Cli_Id: number;
  Cli_NomApeRazSocial: string;
  Cli_Abreviatura: string;
  TipDoc_Nombre: string;
  Cli_NumDocumento: string;
  Pre_Estado: number;
}

export interface ISpObtenerClientes {
  cli_nomaperazsocial: string;
}

// #region GrupoDePartidas
export interface IDataDBGrupoDePartidas {
  NomGruPar_Nombre: string;
}

// #region Ubicacion
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
