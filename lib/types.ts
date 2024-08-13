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
  Pre_Id: number;
  Pre_Codigo: any;
  Usu_NomApellidos: string;
  Pre_Nombre: string;
  Cli_NomApeRazSocial: string;
  Ubi_Departamento: string;
  Ubi_Provincia: string;
  Ubi_Distrito: string;
  Pre_Jornal: number;
  Pre_FecHorRegistro: string;
  Pre_Estado: number;
}

export interface IDataDBObtenerPresupuestosId {
  Pre_Id: number;
  Pre_Codigo: any;
  Usu_NomApellidos: string;
  Pre_Nombre: string;
  Cli_NomApeRazSocial: string;
  Ubi_Departamento: string;
  Ubi_Provincia: string;
  Ubi_Distrito: string;
  Pre_Jornal: number;
  Pre_FecHorRegistro: string;
  Pre_Estado: number;
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

export interface IDataDBUbicacion {
  Ubi_Id: number;
  Ubi_Departamento: string;
  Ubi_Provincia: string;
  Ubi_Distrito: string;
}

export interface IDataDBCliente {
  Cli_NomApeRazSocial: string;
}

// #region GrupoDePartidas
export interface IDataDBGrupoDePartidas {
  NomGruPar_Nombre: string;
}
