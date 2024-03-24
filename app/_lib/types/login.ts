//https://apusoft.online/api/v1/Accounts/Login
//LOGIN
export interface IBodyLogin {
  usu_Correo: string;
  usu_Clave: string;
}

export interface IFetchLogin {
  isAuthSuccessful?: boolean;
  errorMessage?: any;
  token?: string;
  refreshToken?: string;
  expires?: string;
}

//https://apusoft.online/api/v1/Token/refresh
//REFRESH
export interface IBodyTokenRefresh {
  token: string;
  refreshToken: string;
}

export interface IFetchTokenRefresh {
  isAuthSuccessful?: boolean
  errorMessage?: string
  token?: string
  refreshToken?: string
  expires?: string
}

