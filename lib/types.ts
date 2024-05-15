export type TMultipleSelect = Array<{ key: string; name: string }>;

// #region LOGIN
export interface IBodyLogin {
  username: string;
  password: string;
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

// #region SIDEBAR
export interface IDataDBSidebar {
  Mod_Id: number;
  Mod_Nombre: string;
  Mod_Estado: number;
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
