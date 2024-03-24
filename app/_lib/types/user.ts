//https://apusoft.online/api/v1/Usuario/1
//OBTEN X ID
export interface IFetchUserById {
  isSuccessful?: boolean;
  errorMessage?: any;
  data?: IDataUserById;
}

export interface IDataUserById {
  usu_Id: string;
  usu_Correo: string;
  usu_NomApellidos: string;
  rol_Nombre: string;
  usu_FecHoraRegistro: string;
  usu_Estado: string;
}

//https://apusoft.online/api/v1/Usuario/Obten_Paginado/100/1/%20
//OBTEN_PAGINADO
export interface IFetchUsersPagination {
  paginaActual?: number;
  totalDePagina?: number;
  elementosPorPagina?: number;
  totalDeElementos?: number;
  isSuccessful?: boolean;
  errorMessage?: any;
  data?: IDataUsersPagination[];
}

export interface IDataUsersPagination {
  usu_Id: string;
  usu_Correo: string;
  usu_NomApellidos: string;
  rol_Nombre: string;
  usu_FecHoraRegistro: string;
  usu_Observacion: string;
}

//https://apusoft.online/api/v1/Usuario/Crea
//Create
export interface IBodyUserCreate {
  usu_Correo: string;
  usu_Clave: string;
  usu_NomApellidos: string;
  rol_Nombre: string;
}

//https://apusoft.online/api/v1/Usuario/Actualiza/1016
//Update
export interface IBodyUserUpdate {
  usu_Correo: string;
  usu_Clave: string;
  usu_NomApellidos: string;
  rol_Nombre: string;
  usu_Observacion: string;
}

export interface IFetchUserUpdate {
  isSuccessful?: boolean;
  errorMessage?: string;
  data?: any;
}

//https://apusoft.online/api/v1/Usuario/Actualiza_Condicion/1016
//Update State
export interface IBodyUserUpdateState {
  usu_Estado: string;
}

export interface IFetchUserUpdate {
  isSuccessful?: boolean;
  errorMessage?: string;
  data?: any;
}

//https://apusoft.online/api/v1/Usuario/Obten_Usuario_Logeado
//USER LOGGED
export interface IFetchUserLogged {
  isSuccessful?: boolean;
  errorMessage?: any;
  data?: IDataUserLogged;
}

export interface IDataUserLogged {
  usu_Correo: string;
  usu_NomApellidos: string;
  rol_Nombre: string;
  usu_FecHoraRegistro: string;
  usu_Estado: string;
}
