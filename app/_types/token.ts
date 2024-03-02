export interface IGetTokenParams {
  user: string;
  password: string;
}

export interface IGetTokenResp {
  isAuthSuccessful: boolean;
  errorMessage: any;
  token: string;
  refreshToken: string;
  expires: Date;
}

export interface IGetTokenRefreshParams {
  token: string;
  refreshToken: string;
}
