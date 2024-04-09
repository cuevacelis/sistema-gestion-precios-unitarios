//Estas funciones por temas de seguridad siempre se ejecutan en el servidor
import "server-only";
import { FetchError } from "../custom-error/fetch-error";
import {
  IBodyLogin,
  IBodyTokenRefresh,
  IFetchLogin,
  IFetchTokenRefresh,
} from "../types";

const BASE_URL = process.env.URL_API;

export async function fetchLogged(params: IBodyLogin) {
  try {
    const res = await fetch(`${BASE_URL}/Accounts/Login`, {
      headers: {
        "Content-Type": "application/json",
      },
      method: "POST",
      body: JSON.stringify({
        usu_Correo: params.usu_Correo,
        usu_Clave: params.usu_Clave,
      }),
      cache: "no-store",
      next: { tags: ["token"] },
    });
    if (!res.ok) {
      throw new FetchError({
        message: `Logged: Respuesta de red OK pero respuesta HTTP no OK: ${res.status}`,
        type: res.statusText,
        options: { cause: res },
      });
    }
    return res.json() as IFetchLogin;
  } catch (error) {
    throw error;
  }
}

export async function fetchTokenRefresh(params: IBodyTokenRefresh) {
  try {
    const res = await fetch(`${BASE_URL}/Token/refresh`, {
      headers: {
        "Content-Type": "application/json",
      },
      method: "POST",
      body: JSON.stringify({
        token: params.token,
        refreshToken: params.refreshToken,
      }),
      cache: "no-store",
      next: { tags: ["token", "refresh"] },
    });
    if (!res.ok) {
      throw new FetchError({
        message: `TokenRefresh: Respuesta de red OK pero respuesta HTTP no OK: ${res.status}`,
        type: res.statusText,
        options: { cause: res },
      });
    }
    return res.json() as IFetchTokenRefresh;
  } catch (error) {
    throw error;
  }
}
