export type TUserLogin = {
  user: string;
  password: string;
};

export type TUser = {
  id: string;
  name: string;
  email: string;
  password?: string;
};

export interface IfetchUserLoggedParams {
  token: string;
}

export interface IfetchUserLoggedResp {
  isSuccessful: boolean;
  errorMessage: any;
  data: {
    usu_Correo: string;
    usu_NomApellidos: string;
    rol_Nombre: string;
    usu_FecHoraRegistro: string;
    usu_Estado: string;
  };
}
