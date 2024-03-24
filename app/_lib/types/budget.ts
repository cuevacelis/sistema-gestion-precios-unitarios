//(GET)https://apusoft.online/api/v1/Presupuesto/1
//ObtenXid
export interface IFetchBudgetId {
  isSuccessful?: boolean;
  errorMessage?: any;
  data?: IDataBudgetId;
}

export interface IDataBudgetId {
  pre_Id: string;
  pre_Codigo: string;
  usu_NomApellidos: string;
  pre_Nombre: string;
  cli_NomApeRazSocial: string;
  ubi_Departamento: string;
  ubi_Provincia: string;
  ubi_Distrito: string;
  pre_Jornal: string;
  pre_Estado: string;
}

//(GET)https://apusoft.online/api/v1/Presupuesto/Obten_Paginado/10/1/%20
//ObtenPaginado
export interface IFetchBudgetPagination {
  paginaActual?: number;
  totalDePagina?: number;
  elementosPorPagina?: number;
  totalDeElementos?: number;
  isSuccessful?: boolean;
  errorMessage?: any;
  data?: IDataBudgetPagination[];
}

export interface IDataBudgetPagination {
  pre_Id: string;
  pre_Codigo: string;
  usu_NomApellidos: string;
  pre_Nombre: string;
  cli_NomApeRazSocial: string;
  ubi_Departamento: string;
  ubi_Provincia: string;
  ubi_Distrito: string;
  pre_Jornal: string;
  pre_FecHorRegistro: string;
}

//(POST)https://apusoft.online/api/v1/Presupuesto/Crea
//Crea
export interface IBodyBudgetCreate {
  usu_NomApellidos: string;
  pre_Nombre: string;
  cli_NomApeRazSocial: string;
  ubi_Departamento: string;
  ubi_Provincia: string;
  ubi_Distrito: string;
  pre_Jornal: string;
}

export interface IFetchBudgetCreate {}

//(PUT)https://apusoft.online/api/v1/Presupuesto/Actualiza/4
//Update
export interface IBodyBudgetUpdate {
  usu_NomApellidos: string;
  pre_Nombre: string;
  cli_NomApeRazSocial: string;
  ubi_Departamento: string;
  ubi_Provincia: string;
  ubi_Distrito: string;
  pre_Jornal: string;
}

export interface IFetchBudgetUpdate {}

//(PUT)https://apusoft.online/api/v1/Presupuesto/1
//UpdateEstado
export interface IBodyBudgetStatusUpdate {
  pre_Estado: string;
}

export interface IFetchBudgetStatusupdate {}
